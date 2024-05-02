from __main__ import app, db, User, Team, Player, Team, Match, MatchSet, Point, Event, Pair
from flask import jsonify, request

def add_events_db(destination, origin, quality, a_type, action, player, point_id):

    point = db.session.get(Point, point_id)

    for i in range(len(player)):
        play_sh = player[i]
        acti_sh = action[i] << 2
        type_sh = a_type[i] << 5
        qual_sh = quality[i] << 10
        orig_sh = origin[i] << 13
        dest_sh = destination[i] << 17
        
        data = play_sh | acti_sh | type_sh | qual_sh | orig_sh | dest_sh

        event = Event(point=point, data=data, e_index=i)
        db.session.add(event)
        db.session.commit()

    return True

@app.route('/addpoint', methods=['POST'])
def point_add():
    data = request.json
    match_set_id = data.get('match_set_id')
    destination = data.get('destination')
    origin = data.get('origin')
    quality = data.get('quality')
    a_type = data.get('type')
    action = data.get('action')
    player = data.get('player')
    win = data.get('win')
    e_index = data.get('e_index')

    match_set = db.session.get(MatchSet, match_set_id)
    if set:
        point = Point(win=win, match_set=match_set, e_index=e_index)
        db.session.add(point)
        db.session.commit()
        
        if add_events_db(destination, origin, quality, a_type, action, player, point.id):

            return jsonify({'message': 'Point added successfully',
                            'id': point.id}), 200
        
        else:

            db.session.delete(point)
            db.session.commit()

            return jsonify({'error': 'problem adding events, point has been deleted'}), 500

    else:
        return jsonify({'error': 'Set not found'}), 404

def event_array(point):

    events = db.session.query(Event).filter(Event.point_id == point.id).order_by(Event.e_index.asc()).all()

    destination = []
    origin = []
    quality = []
    a_type = []
    action = []
    player = []

    for event in events:
        data = event.data

        player.append(data & 0b11)
        action.append((data >> 2) & 0b111)
        a_type.append((data >> 5) & 0b11111)
        quality.append((data >> 10) & 0b1111)
        origin.append((data >> 13) & 0b111)
        destination.append((data >> 17) & 0b1111)

    return destination, origin, quality, a_type, action, player

@app.route('/findpoint/<point_id>', methods=['GET'])
def point_find(point_id):
    point = db.session.get(Point, point_id)

    if point:
        destination, origin, quality, a_type, action, player = event_array(point)

        return jsonify({'match_set_id': point.id,
                        'destination': destination,
                        'origin': origin,
                        'quality': quality,
                        'type': a_type,
                        'action': action,
                        'player': player,
                        'win': point.win,
                        'e_index': point.e_index}), 200

    else:
        return jsonify({'error':'Could not find point'}), 404
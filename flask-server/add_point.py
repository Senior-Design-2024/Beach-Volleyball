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

    match_set = db.session.get(MatchSet, match_set_id)
    if set:
        point = Point(win=win, match_set=match_set)
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
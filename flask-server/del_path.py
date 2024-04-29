from __main__ import app, db, User, Team, Player, Team, Match, MatchSet, Point, Event, Pair
from flask import jsonify, request

@app.route('/del/<entity_type>/<int:id>', methods=['DELETE'])
def delete_entity(entity_type, id):
    entity = None
    if entity_type == 'user':
        entity = db.session.get(User, id)
    elif entity_type == 'team':
        entity = db.session.get(Team, id)
    elif entity_type == 'player':
        entity = db.session.get(Player, id)
    elif entity_type == 'pair':
        entity = db.session.get(Pair, id)
    elif entity_type == 'match':
        entity = db.session.get(Match, id)
    elif entity_type == 'match_set':
        entity = db.session.get(MatchSet, id)
    elif entity_type == 'point':
        entity = db.session.get(Point, id)
    elif entity_type == 'event':
        entity = db.session.get(Event, id)
    
    if entity:
        db.session.delete(entity)
        db.session.commit()
        return jsonify({'message': f'{entity_type} with id {id} deleted successfully'}), 200
    else:
        return jsonify({'error': f'{entity_type} with id {id} not found'}), 404
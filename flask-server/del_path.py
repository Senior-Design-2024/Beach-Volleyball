from __main__ import app, db, User, Team, Player, Team, Match, MatchSet, Point, Event, Pair
from flask import jsonify, request

@app.route('/del/<entity_type>/<int:id>', methods=['DELETE'])
def delete_entity(entity_type, id):
    entity = None
    if entity_type == 'user':
        entity = User.query.get(id)
    elif entity_type == 'team':
        entity = Team.query.get(id)
    elif entity_type == 'player':
        entity = Player.query.get(id)
    elif entity_type == 'pair':
        entity = Pair.query.get(id)
    elif entity_type == 'match':
        entity = Match.query.get(id)
    elif entity_type == 'match_set':
        entity = MatchSet.query.get(id)
    elif entity_type == 'point':
        entity = Point.query.get(id)
    elif entity_type == 'event':
        entity = Event.query.get(id)
    
    if entity:
        db.session.delete(entity)
        db.session.commit()
        return jsonify({'message': f'{entity_type} with id {id} deleted successfully'}), 200
    else:
        return jsonify({'error': f'{entity_type} with id {id} not found'}), 404
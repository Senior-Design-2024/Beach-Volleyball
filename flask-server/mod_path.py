from __main__ import app, db, User, Team, Player, Team, Match, MatchSet, Point, Event, Pair
from flask import jsonify, request
# Routes for adding items to respective tables

@app.route('/update/<entity_type>/<int:id>', methods=['PUT'])
def update_entity(entity_type, id):
    data = request.json
    entity = None

    if entity_type == 'user':

        entity = db.session.get(User, id)

        if entity:
            entity.username = data.get('username', entity.username)
            entity.email = data.get('email', entity.email)

    elif entity_type == 'team':

        entity = db.session.get(Team, id)

        user = db.session.get(User, data.get('user_id'))

        if entity and user:
            entity.name = data.get('team_name', entity.name)
            entity.user = user

    elif entity_type == 'player':

        entity = db.session.get(Player, id)

        team = db.session.get(Team, data.get('team_id'))

        if entity and team:

            entity.name = data.get('player_name', entity.name)
            entity.description = data.get('description', entity.description)
            entity.team = team

    elif entity_type == 'match':

        entity = db.session.get(Match, id)

        team = db.session.get(Team, data.get('team_id'))
        player1 = db.session.get(Player, data.get('player1_id'))
        player2 = db.session.get(Player, data.get('player2_id'))
        pair = db.session.get(Pair, data.get('pair_id'))

        if entity and pair and team and player1 and player2:

            entity.team = team
            entity.player1 = player1
            entity.player2 = player2
            entity.pair = pair
            entity.opponent1_name = data.get('opponent1_name') #Can be empty ''
            entity.opponent2_name = data.get('opponent2_name') #Can be empty ''
            entity.opponent1_number = data.get('opponent1_number') #Can be empty ''
            entity.opponent2_number = data.get('opponent2_number') #Can be empty ''
            entity.venue = data.get('venue') #Can be empty ''
            entity.tournament = data.get('tournament') #Can be empty ''
            entity.court_number = data.get('court_number') #Can be empty ''
            entity.flight_number = data.get('flight_number') #Can be empty ''
            entity.conference = data.get('conference') #Can be 0, 1, or 2
            entity.location = data.get('location') #Can be 0, 1, 2, or 3
            entity.match_date = data.get('match_date') #Must be date format, can be NULL for undated
            entity.sched_start_time = data.get('sched_start_time') #Must be time format, can be NULL for no time
            entity.strategy = data.get('strategy') #Can be 0, 1, 2, or 3

    elif entity_type == 'pair':
        entity = db.session.get(Pair, id)

        player1 = db.session.get(Player, data.get('player1_id'))
        player2 = db.session.get(Player, data.get('player2_id'))
        team = db.session.get(Team, data.get('team_id'))

        if entity and player1 and player2 and team:
                entity.player1 = player1
                entity.player2 = player2
                entity.team = team
    
    elif entity_type == 'set':
        entity = db.session.get(MatchSet, id)

        match = db.session.get(Match, data.get('match_id'))

        if entity and match:
            entity.match = match
            entity.win_state = data.get('win_state')
            entity.set_num = data.get('set_num')
    

    if entity:
        db.session.commit()
        return jsonify({'message': f'{entity_type.capitalize()} updated successfully'}), 200
    else:
        return jsonify({'error':f'{entity_type.capitalize()} not found'}), 404
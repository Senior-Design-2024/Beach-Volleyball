from __main__ import app, db, User, Team, Player, Team, Match, MatchSet, Point, Event, Pair
from flask import jsonify, request
# Routes for adding items to respective tables

@app.route('/add/<entity_type>', methods=['POST'])
def add_entity(entity_type):
    data = request.json
    entity = None

    match entity_type:
        case "user":
            entity = User(username=data.get('username'),
                          email=data.get('email'))
        
        case "team":
            user = db.session.get(User, data.get('user_id'))

            if user:
                entity = Team(user=user,
                              name=data.get('team_name'))
        
        case "player":
            team = db.session.get(Team, data.get('team_id'))

            if team:
                entity = Player(team=team,
                                name=data.get('player_name'),
                                description=data.get('description'))
        
        case "match":
            team = db.session.get(Team, data.get('team_id'))
            player1 = db.session.get(Player, data.get('player1_id'))
            player2 = db.session.get(Player, data.get('player2_id'))
            pair = db.session.get(Pair, data.get('pair_id'))

            if team and player1 and player2 and pair:
                entity = Match(team=team,
                               player1=player1,
                               player2=player2,
                               pair=pair,
                               opponent1_name=data.get('opponent1_name'),
                               opponent2_name=data.get('opponent2_name'),
                               opponent1_number=data.get('opponent1_number'),
                               opponent2_number=data.get('opponent2_number'),
                               venue=data.get('venue'),
                               tournament=data.get('tournament'),
                               court_number=data.get('court_number'),
                               flight_number=data.get('flight_number'),
                               conference=data.get('conference'),
                               location=data.get('location'),
                               match_date=data.get('match_date'),
                               sched_start_time=data.get('sched_start_time'),
                               strategy=data.get('strategy'))

        case "match_set":
            match = db.session.get(Match, data.get('match_id'))

            if match:
                entity = MatchSet(match=match,
                                  set_num=data.get('set_num'),
                                  win_state=data.get('win_state'))
        
        case "pair":
            team = db.session.get(Team, data.get('team_id'))
            player1 = db.session.get(Player, data.get('player1_id'))
            player2 = db.session.get(Player, data.get('player2_id'))

            if team and player1 and player2:
                entity = Pair(team=team,
                              player1=player1,
                              player2=player2) 
    
    if entity:

        db.session.add(entity)
        db.session.commit()

        return jsonify({'message': f'{entity_type.capitalize()} added successfully',
                        'id': entity.id}), 200
    else:
        return jsonify({'error':f'{entity_type.capitalize()} parents not found'}), 404
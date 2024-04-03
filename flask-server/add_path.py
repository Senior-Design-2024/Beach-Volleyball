from __main__ import app, db, User, Team, Player, Team, Match, MatchSet, Pair
from flask import jsonify, request
# Routes for adding items to respective tables

@app.route('/adduser', methods=['POST'])
def user_add():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    user = User(username=username, email=email)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User added successfully'}), 200

@app.route('/addteam', methods=['POST'])
def team_add():
    data = request.json
    team_name = data.get('team_name')
    email = data.get('email')

    user = User.query.filter_by(email=email).first()
    if user:
        team = Team(user=user, name=team_name)
        db.session.add(team)
        db.session.commit()
        return jsonify({'message': 'Team added successfully'}), 200
    else:
        return jsonify({'error': 'User not found'}), 404

@app.route('/addplayer', methods=['POST'])
def add_player():
    data = request.json
    player_name = data.get('player_name')
    team_id = data.get('team_id')  # Assuming you get team_id from the request data
    description = data.get('description')

    team = db.session.get(Team, team_id)
    if team:
        player = Player(name=player_name, team_id=team_id, description=description)
        db.session.add(player)
        db.session.commit()
        return jsonify({'message': 'Player added successfully'}), 200
    else:
        return jsonify({'error': 'Team not found'}), 404


@app.route('/addmatch', methods=['POST'])
def match_add():
    data = request.json
    team_id = data.get('team_id')
    player1_id = data.get('player1_id')
    player2_id = data.get('player2_id')
    opponent1_name = data.get('opponent1_name') #Can be empty ''
    opponent2_name = data.get('opponent2_name') #Can be empty ''
    opponent1_number = data.get('opponent1_number') #Can be empty ''
    opponent2_number = data.get('opponent2_number') #Can be empty ''
    venue = data.get('venue') #Can be empty ''
    tournament = data.get('tournament') #Can be empty ''
    court_number = data.get('court_number') #Can be empty ''
    flight_number = data.get('flight_number') #Can be empty ''
    conference = data.get('conference') #Can be 0, 1, or 2
    location = data.get('location') #Can be 0, 1, 2, or 3
    match_date = data.get('match_date') #Must be date format, can be NULL for undated
    sched_start_time = data.get('sched_start_time') #Must be time format, can be NULL for no time
    strategy = data.get('strategy') #Can be 0, 1, 2, or 3

    if match_date == '':
        match_date = None
    
    if sched_start_time == '':
        sched_start_time = None

    team = db.session.get(Team, team_id)
    player1 = db.session.get(Player, player1_id)
    player2 = db.session.get(Player, player2_id)
    if team and player1 and player2:
    
        match = Match(team=team,
                      player1=player1,
                      player2=player2,
                      opponent1_name=opponent1_name,
                      opponent2_name=opponent2_name,
                      opponent1_number=opponent1_number,
                      opponent2_number=opponent2_number,
                      venue=venue,
                      tournament=tournament,
                      court_number=court_number,
                      flight_number=flight_number,
                      conference=conference,
                      location=location,
                      match_date=match_date,
                      sched_start_time=sched_start_time,
                      strategy=strategy)
        

        db.session.add(match)
        db.session.commit()
        
        return jsonify({'message': 'Match added successfully'}), 200
    else:
        return jsonify({'error': 'Team and/or Player not found'}), 404

@app.route('/addpair', methods=['POST'])
def pair_add():
    data = request.json
    team_id = data.get('team_id')
    player1_id = data.get('player1_id')
    player2_id = data.get('player2_id')

    team = db.session.get(Team, team_id)
    player1 = db.session.get(Player, player1_id)
    player2 = db.session.get(Player, player2_id)
    if team and player1 and player2:
        pair = Pair(team=team, player1=player1, player2=player2)
        db.session.add(pair)
        db.session.commit()
        return jsonify({'message': 'Pair added successfully'}), 200
    else:
        return jsonify({'error': 'Team or player not found'}), 404

@app.route('/addset', methods=['POST'])
def set_add():
    data = request.json
    match_id = data.get('match_id')
    match_set_data = data.get('match_set_data')

    match = db.session.get(Match, match_id)
    if match:
        match_set = MatchSet(match=match, match_set_data=match_set_data)
        db.session.add(match_set)
        db.session.commit()
        return jsonify({'message': 'Match set added successfully'}), 200
    else:
        return jsonify({'error': 'Match not found'}), 404
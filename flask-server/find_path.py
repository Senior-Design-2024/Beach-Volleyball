from __main__ import app, db, User, Team, Player, Team, Match, MatchSet, Point, Event, Pair
from flask import jsonify, request
import random

@app.route('/droptables', methods=['GET'])
def drop_tables():
    
    User.query.delete()
    Team.query.delete()
    Player.query.delete()
    Pair.query.delete()
    Match.query.delete()
    MatchSet.query.delete()
    Point.query.delete()
    Event.query.delete()
    db.session.commit()
    return jsonify({'message':'Tables dropped successfully'}), 200

@app.route('/find', methods=['GET'])
def find_db():

    def to_dict(instance):
        """
        Convert the SQLAlchemy object to a dictionary.
        """
        return {c.name: getattr(instance, c.name) for c in instance.__table__.columns}

    data = request.args

    table_name = data.get('table')

    # Create filter data
    filters = {}

    # Fill filters with potential filter criteria from JSON
    for key, value in data.items():
        if key != 'table':
            filters[key] = value


    match table_name:
        case "user":
            query = db.session.query(User)
        
        case "team":
            query = db.session.query(Team)
        
        case "player":
            query = db.session.query(Player)
        
        case "match":
            query = db.session.query(Match)

        case "match_set":
            query = db.session.query(MatchSet)

        case "point":
            query = db.session.query(Point)
        
        case "event":
            query = db.session.query(Event)
        
        case "pair":
            query = db.session.query(Pair)
    
    # Apply filters to the query
    for key, value in filters.items():
        column = getattr(query.column_descriptions[0]['type'], key, None)
        if column:
            query = query.filter(column == value)

    # Execute the query and get the results
    results = query.all()

    output = [to_dict(result) for result in results]

    return jsonify(output), 200

def generate_beach_volleyball_game(num_points):
    player = []
    action = []
    type_ = []
    quality = []
    origin = []
    dest = []
    
    serve_alternate = 1  # Starting with player 1 for the first serve
    point = 0
    
    while (point < num_points):
        # Generate player

        if len(quality) == 0 or quality[-1] == 0:
            player.append(random.randint(1,2))
            action.append("recieve")
            type_.append(random.choice(["top", "float", "german", "sidespin", "skyball", "other"]))
            quality.append(random.randint(0,4))
            origin.append(random.randint(1,5))
            dest.append(random.randint(4,9))
            
        else:
            player.append(serve_alternate)
            action.append("serve")
            type_.append(random.choice(["top", "float", "german", "sidespin", "skyball", "other"]))
            quality.append(random.randint(0,4))
            origin.append(random.randint(1,5))
            dest.append(random.randint(4,9))
            serve_alternate = 3 - serve_alternate  # Alternate between 1 and 2

        if(quality[-1] == 4):
            point += 1
            continue

        if(quality[-1] == 0):
            continue
        
        while True:
            action.append(random.choice(["attack", "option", "dig", "block", "set"]))
            player.append(random.randint(1,2))
        
            # Generate type
            if action[-1] in ["attack", "option", "dig"]:
                type_.append(random.choice(["swing", "roll", "poke", "bump", "set"]))
            elif action[-1] == "set":
                type_.append(random.choice(["platform", "error"]))
            else:
                type_.append(random.choice(["overpass", "term", "control"]))
        
            # Generate quality
            if type_[-1] == "error":
                quality.append(0)
            else:
                quality.append(random.randint(0, 4))
            
            origin.append(random.randint(1, 9))
            dest.append(random.randint(1, 9))
            
            if quality[-1] == 0:
                break

            if quality[-1] == 4:
                break
    
    return player, action, type_, quality, origin, dest

@app.route('/pullmatch', methods=['GET'])
def match_pull():
    
    player, action, type_, quality, origin, dest = generate_beach_volleyball_game(42)

    output = [player, action, type_, quality, origin, dest]

    return jsonify(output), 200
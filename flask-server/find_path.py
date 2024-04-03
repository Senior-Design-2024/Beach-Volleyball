from __main__ import app, db, User, Team, Player, Team, Match, MatchSet, Point, Event, Pair
from flask import jsonify, request

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
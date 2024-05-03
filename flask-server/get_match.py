from __main__ import app, db, User, Team, Player, Team, Match, MatchSet, Point, Event, Pair
from flask import jsonify, request

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
        quality.append((data >> 10) & 0b111)
        origin.append((data >> 13) & 0b1111)
        destination.append((data >> 17) & 0b1111)

    return destination, origin, quality, a_type, action, player

def average_quality_per_event(events, qualities):
    # Create a dictionary to store event as key and a list of qualities as value
    event_qualities = {}
    
    # Iterate through each event and quality
    for e, q in zip(events, qualities):
        # Convert the event tuple to a string
        event_str = str(e)
        # If the event tuple is not already in the dictionary, add it
        if event_str not in event_qualities:
            event_qualities[event_str] = []
        # Append the quality to the list of qualities for this event tuple
        event_qualities[event_str].append(q)
    
    # Create a dictionary to store average quality for each event tuple
    avg_quality_per_event = {}
    
    # Iterate through event_qualities dictionary
    for e, qualities in event_qualities.items():
        # Calculate the average quality for this event tuple
        avg_quality = sum(qualities) / len(qualities)
        # Store the average quality for this event tuple
        avg_quality_per_event[e] = avg_quality
    
    return avg_quality_per_event

@app.route('/matchstats/<match_id>', methods=['GET'])
def get_match_stats(match_id):
    match = db.session.get(Match, match_id)
    if not match:
        return jsonify({"error": "Match not found"}), 404

    # Initialize result dictionary
    result = {
        "match": {
            "id": match.id,
            "team_id": match.team_id,
            "player1_id": match.player1_id,
            "player2_id": match.player2_id,
            "opponent1_name": match.opponent1_name,
            "opponent2_name": match.opponent2_name,
            "opponent1_number": match.opponent1_number,
            "opponent2_number": match.opponent2_number,
            "venue": match.venue,
            "tournament": match.tournament,
            "court_number": match.court_number,
            "flight_number": match.flight_number,
            "conference": match.conference,
            "location": match.location,
            "match_date": match.match_date,
            "sched_start_time": match.sched_start_time,
            "strategy": match.strategy
        },
        "sets": [],
        "match_stats": {},
        "player1_data": [],
        "player2_data": []
    }

    player1_event = []
    player1_qual = []
    player2_event = []
    player2_qual = []

    # Add sets to result
    for match_set in db.session.query(MatchSet).filter(MatchSet.match_id == match.id):

        set_data = {
            "id": match_set.id,
            "set_num": match_set.set_num,
            "win_state": match_set.win_state,
            "points": []
        }
        # Add points to set
        for point in db.session.query(Point).filter(Point.match_set_id == match_set.id):
            point_data = {
                "id": point.id,
                "win": point.win,
                "events": []
            }
            # Reconstruct events for point
            destination, origin, quality, a_type, action, player = event_array(point)
            point_data["events"] = {
                "destination": destination,
                "origin": origin,
                "quality": quality,
                "type": a_type,
                "action": action,
                "player": player
            }

            for ind, val in enumerate(player):
                if val == 1:
                    player1_event.append((a_type[ind], action[ind]))
                    player1_qual.append((quality[ind]))
                elif val == 2:
                    player2_event.append((a_type[ind], action[ind]))
                    player2_qual.append((quality[ind]))

            set_data["points"].append(point_data)

        result["sets"].append(set_data)

    result["player1_data"] = average_quality_per_event(player1_event, player1_qual)
    result["player2_data"] = average_quality_per_event(player2_event, player2_qual)

    return jsonify(result), 200 
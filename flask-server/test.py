import random

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

# Example usage:
num_points = 42  # You can adjust this as needed
player, action, type_, quality, origin, dest = generate_beach_volleyball_game(num_points)

print("Player:", player)
print("Action:", action)
print("Type:", type_)
print("Quality:", quality)
print("Origin:", origin)
print("Destination:", dest)
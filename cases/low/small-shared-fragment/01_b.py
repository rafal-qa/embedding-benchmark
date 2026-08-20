def route(records, entrance, exit):
    if not records:
        raise ValueError("records cannot be empty")

    frontier = deque([(entrance, [entrance])])
    visited = {entrance}
    while frontier:
        cell, path = frontier.popleft()
        if cell == exit:
            return path
        row, column = cell
        for neighbor in ((row - 1, column), (row + 1, column), (row, column - 1), (row, column + 1)):
            y, x = neighbor
            if 0 <= y < len(records) and 0 <= x < len(records[y]) and records[y][x] != "#" and neighbor not in visited:
                visited.add(neighbor)
                frontier.append((neighbor, path + [neighbor]))
    return []

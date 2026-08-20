def parse_query(query):
    result = {}
    key = ""
    value = ""
    in_value = False

    for character in query:
        if character == "&":
            if key:
                result[key] = value
            key = ""
            value = ""
            in_value = False
        elif character == "=" and not in_value:
            in_value = True
        elif in_value:
            value += character
        else:
            key += character

    if key:
        result[key] = value

    return result

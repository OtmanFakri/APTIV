def get_column_value(data, column):
    keys = column.split('.')
    value = data
    for key in keys:
        if isinstance(value, dict):
            value = value.get(key, {})
        else:
            value = getattr(value, key, {})
    return value


# Function to process the data and extract the desired columns
def process_data(data, columns):
    processed_data = []
    for item in data:
        processed_item = {}
        for column in columns:
            processed_item[column] = get_column_value(item, column)
        processed_data.append(processed_item)
    return processed_data



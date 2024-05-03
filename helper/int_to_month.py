import calendar

def int_to_month(month_int):
    # calendar.month_name is an array where the index corresponds to the month number
    if 1 <= month_int <= 12:
        return calendar.month_name[month_int]
    else:
        return "Invalid month number"



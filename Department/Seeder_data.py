# The simplest solution I found is to set up an event for each table that executes a method after the table is created.

# Database initial data
INITIAL_DATA = {
    'Departments':  [
        {"name": "ASSEMBLY", "color": "#FF0000"},        # red
        {"name": "CUTTING", "color": "#0000FF"},         # blue
        {"name": "MAINTENANCE", "color": "#008000"},     # green
        {"name": "ENGINEERING", "color": "#FFFF00"},     # yellow
        {"name": "PROCESS ENGI.", "color": "#800080"},   # purple
        {"name": "PRODUCT ENGINEERING", "color": "#FFA500"},  # orange
        {"name": "QUALITY", "color": "#00FFFF"},         # cyan
        {"name": "LOGISTIC IMPO.EXPO.", "color": "#FF00FF"},  # magenta
        {"name": "PURCHASING", "color": "#FFC0CB"},      # pink
        {"name": "FINANCE-CONTROLLING", "color": "#A52A2A"},  # brown
        {"name": "GENERAL MANAGEMENT", "color": "#808080"},   # grey
        {"name": "HUMAN RESSOURCES", "color": "#00FF00"}, # lime
        {"name": "SAFETY H.R", "color": "#008080"},      # teal
        {"name": "IT", "color": "#4B0082"}               # indigo
    ],
    'Jobs': [
        {
            "name": "Graphic Designer"
        },
        {
            "name": "Pharmacist"
        }, {
            "name": "VP Product Management"
        }, {
            "name": "Assistant Manager"
        }, {
            "name": "Operator"
        }, {
            "name": "Geological Engineer"
        }, {
            "name": "Occupational Therapist"
        }, {
            "name": "Nurse Practicioner"
        }, {
            "name": "Payment Adjustment Coordinator"
        }, {
            "name": "Teacher"
        }, {
            "name": "Automation Specialist IV"
        }, {
            "name": "Community Outreach Specialist"
        }, {
            "name": "Nurse Practicioner"
        }, {
            "name": "Junior Executive"
        }, {
            "name": "Quality Engineer"
        }, {
            "name": "Senior Quality Engineer"
        }, {
            "name": "Project Manager"
        }, {
            "name": "Associate Professor"
        }, {
            "name": "Senior Sales Associate"
        }, {
            "name": "Project Manager"
        }, {
            "name": "Associate Professor"
        }, {
            "name": "Systems Administrator III"
        }, {
            "name": "Nurse"
        }, {
            "name": "Payment Adjustment Coordinator"
        }, {
            "name": "Senior Cost Accountant"
        }, {
            "name": "Social Worker"
        }, {
            "name": "Professor"
        }, {
            "name": "Administrative Assistant IV"
        }, {
            "name": "Structural Engineer"
        }, {
            "name": "Compensation Analyst"
        }, {
            "name": "Graphic Designer"
        }, {
            "name": "Assistant Professor"
        }, {
            "name": "Editor"
        }, {
            "name": "Environmental Tech"
        }, {
            "name": "Product Engineer"
        }, {
            "name": "Structural Analysis Engineer"
        }, {
            "name": "Financial Analyst"
        }, {
            "name": "Project Manager"
        }, {
            "name": "Senior Editor"
        }, {
            "name": "Project Manager"
        }, {
            "name": "Administrative Officer"
        }, {
            "name": "Web Designer III"
        }, {
            "name": "Biostatistician I"
        }, {
            "name": "Design Engineer"
        }, {
            "name": "Clinical Specialist"
        }, {
            "name": "Paralegal"
        }, {
            "name": "Senior Financial Analyst"
        }, {
            "name": "Marketing Manager"
        }, {
            "name": "Editor"
        }, {
            "name": "Editor"
        }, {
            "name": "Financial Advisor"
        }, {
            "name": "Automation Specialist III"
        }, {
            "name": "Nuclear Power Engineer"
        }, {
            "name": "Occupational Therapist"
        }, {
            "name": "Mechanical Systems Engineer"
        }, {
            "name": "Compensation Analyst"
        }, {
            "name": "Systems Administrator II"
        }, {
            "name": "Business Systems Development Analyst"
        }, {
            "name": "Director of Sales"
        }, {
            "name": "Dental Hygienist"
        }, {
            "name": "Nurse Practicioner"
        }, {
            "name": "Staff Scientist"
        }, {
            "name": "Senior Developer"
        }, {
            "name": "VP Marketing"
        }, {
            "name": "Technical Writer"
        }, {
            "name": "Help Desk Technician"
        }, {
            "name": "Business Systems Development Analyst"
        }, {
            "name": "Budget/Accounting Analyst III"
        }, {
            "name": "Account Representative I"
        }, {
            "name": "Office Assistant III"
        }, {
            "name": "Senior Editor"
        }, {
            "name": "Structural Analysis Engineer"
        }, {
            "name": "Sales Representative"
        }, {
            "name": "Nuclear Power Engineer"
        }, {
            "name": "Food Chemist"
        }, {
            "name": "Nuclear Power Engineer"
        }, {
            "name": "Design Engineer"
        }, {
            "name": "Geological Engineer"
        }, {
            "name": "Web Designer III"
        }, {
            "name": "Marketing Assistant"
        }, {
            "name": "Paralegal"
        }, {
            "name": "Analog Circuit Design manager"
        }, {
            "name": "Speech Pathologist"
        }, {
            "name": "Information Systems Manager"
        }, {
            "name": "Administrative Officer"
        }, {
            "name": "Business Systems Development Analyst"
        }, {
            "name": "Graphic Designer"
        }, {
            "name": "Developer III"
        }, {
            "name": "Statistician IV"
        }, {
            "name": "Software Test Engineer II"
        }, {
            "name": "Nuclear Power Engineer"
        }, {
            "name": "Assistant Media Planner"
        }, {
            "name": "Executive Secretary"
        }, {
            "name": "Accountant IV"
        }, {
            "name": "Product Engineer"
        }, {
            "name": "Food Chemist"
        }, {
            "name": "Executive Secretary"
        }, {
            "name": "Community Outreach Specialist"
        }, {
            "name": "Statistician II"
        }, {
            "name": "Nurse Practicioner"
        }]
}


# This method receives a table, a connection and inserts data to that table.
def initialize_table(target, connection, **kw):
    tablename = str(target)
    print(f"Table name from target: {tablename}")
    print(f"Available table names in INITIAL_DATA: {INITIAL_DATA.keys()}")
    if tablename in INITIAL_DATA and len(INITIAL_DATA[tablename]) > 0:
        for line in INITIAL_DATA[tablename]:
            print('insert:', line)
            connection.execute(target.insert(), line)
    else:
        print(f"No data found for table {tablename}")
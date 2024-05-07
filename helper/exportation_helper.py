from typing import List, Optional
import pandas as pd
import pdfkit

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


def generate_excel(processed_data: List[dict], columns: Optional[List[str]]) -> str:
    # Create a pandas DataFrame from processed data
    df = pd.DataFrame(processed_data, columns=columns)
    # Write DataFrame to Excel file
    excel_path = "hello_world.xlsx"
    df.to_excel(excel_path, index=False)
    return excel_path

def generate_pdf(html_content: str) -> str:
    # Path to save the PDF
    pdf_path = "hello_world.pdf"
    # Convert HTML to PDF
    pdfkit.from_string(html_content, pdf_path)
    return pdf_path
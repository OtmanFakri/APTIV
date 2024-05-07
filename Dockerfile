FROM python:3.9
WORKDIR /usr/src/personalised_nudges
COPY . .
RUN apt-get update \
    && apt-get install -y \
    wkhtmltopdf \
    && apt-get clean \

COPY requirements.txt .

RUN pip install -r requirements.txt
#CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
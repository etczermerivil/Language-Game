FROM python:3.9.18-alpine3.18

RUN apk add build-base

RUN apk add postgresql-dev gcc python3-dev musl-dev

ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY

# Set the working directory to backend
WORKDIR /var/www/backend

# Copy the backend folder to the working directory
COPY backend /var/www/backend

# Install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt


# WORKDIR /var/www

# COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .

RUN flask db upgrade
RUN flask seed all
CMD gunicorn app:app

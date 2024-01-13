FROM python:3.8

WORKDIR /app

COPY ./flask-server/server.py .

COPY ./flask-server/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000
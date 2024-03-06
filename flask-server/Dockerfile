FROM python:3.11.6

WORKDIR /app

COPY ./*.py .
COPY requirements.txt .

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "./server.py"]
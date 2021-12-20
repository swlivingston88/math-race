FROM python:alpine
COPY app /app
WORKDIR /app
CMD python -m http.server 8000
EXPOSE 8000/tcp
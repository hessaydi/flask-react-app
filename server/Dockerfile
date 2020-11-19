FROM alpine:latest

MAINTAINER Damanpreet Singh "hessaydi@gmail.com"

RUN apk add --no-cache python3-dev && pip3 install --upgrade pip 

# We copy just the requirements.txt first to leverage Docker cache
COPY . /app
WORKDIR /app
RUN pip3 --no-cache-dir install -r requirements.txt

EXPOSE 5000
ENTRYPOINT [ "python" ]

CMD [ "main.py" ]
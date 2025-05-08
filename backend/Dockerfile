# pull official base image
FROM python:3.11

# set working directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install python dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# add app
COPY app .
COPY requirements.txt .

CMD [ "python3", "-m" , "flask", "--app", "app", "run", "--host=0.0.0.0"]
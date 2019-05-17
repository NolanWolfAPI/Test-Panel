FROM nginx:alpine

RUN apk add python bash

COPY default.conf /etc/nginx/conf.d
COPY dist/ /usr/share/nginx/html

COPY replace.py .

EXPOSE 80

CMD ["python", "replace.py"]

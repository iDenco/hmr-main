#!/bin/bash

fails=''

inspect() {
  if [ $1 -ne 0 ]; then
    fails="${fails} $2"
  fi
}

docker-compose run payroll-service python manage.py test
inspect $? payroll-service

if [ -n "${fails}" ];
  then
    echo "Tests failed: ${fails}"
    exit 1
  else
    echo "Tests passed!"
    exit 0
fi

#!/bin/sh

if [ "$TRAVIS_BRANCH" == "master" ]; then
  - docker login -e $DOCKER_EMAIL -u $DOCKER_ID -p $DOCKER_PASSWORD
  - export TAG=`if [ "$TRAVIS_BRANCH" == "master" ]; then echo "latest"; else echo $TRAVIS_BRANCH ; fi`
  - docker build $PAYROLL_REPO -t $PAYROLL:$COMMIT
  - docker tag $PAYROLL:$COMMIT $DOCKER_ID/$PAYROLL:$TAG
  - docker push $DOCKER_ID/$PAYROLL
  - docker build $PAYROLL_DB_REPO -t $PAYROLL_DB:$COMMIT
  - docker tag $PAYROLL_DB:$COMMIT $DOCKER_ID/$PAYROLL_DB:$TAG
  - docker push $DOCKER_ID/$PAYROLL_DB
  - docker build $CLIENT_REPO -t $CLIENT:$COMMIT
  - docker tag $CLIENT:$COMMIT $DOCKER_ID/$CLIENT:$TAG
  - docker push $DOCKER_ID/$CLIENT
  - docker build $SWAGGER_REPO -t $SWAGGER:$COMMIT
  - docker tag $SWAGGER:$COMMIT $DOCKER_ID/$SWAGGER:$TAG
  - docker push $DOCKER_ID/$SWAGGER
  - docker build $NGINX_REPO -t $NGINX:$COMMIT
  - docker tag $NGINX:$COMMIT $DOCKER_ID/$NGINX:$TAG
  - docker push $DOCKER_ID/$NGINX
fi

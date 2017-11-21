#!/bin/sh

if [ -z "$TRAVIS_PULL_REQUEST" ] || [ "$TRAVIS_PULL_REQUEST" == "false" ]
then

  if [ "$TRAVIS_BRANCH" == "development" ]
  then
    docker login -e $DOCKER_EMAIL -u $DOCKER_ID -p $DOCKER_PASSWORD
    export TAG=$TRAVIS_BRANCH
    export REPO=$DOCKER_ID
  fi

  if [ "$TRAVIS_BRANCH" == "staging" ] || \
     [ "$TRAVIS_BRANCH" == "production" ]
  then
    curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
    unzip awscli-bundle.zip
    ./awscli-bundle/install -b ~/bin/aws
    export PATH=~/bin:$PATH
    # add AWS_ACCOUNT_ID, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY env vars
    eval $(aws ecr get-login --region ap-southeast-1)
    export TAG=$TRAVIS_BRANCH
    export REPO=$AWS_ACCOUNT_ID.dkr.ecr.ap-southeast-1.amazonaws.com
  fi

  if [ "$TRAVIS_BRANCH" == "staging" ]
  then
    export REACT_APP_PAYROLL_SERVICE_URL="TBD"
    export SECRET_KEY="TBD"
  fi

  if [ "$TRAVIS_BRANCH" == "production" ]
  then
    export REACT_APP_PAYROLL_SERVICE_URL="TBD"
    export SECRET_KEY="TBD"
  fi
  
  if [ "$TRAVIS_BRANCH" == "development" ] || \
     [ "$TRAVIS_BRANCH" == "staging" ] || \
     [ "$TRAVIS_BRANCH" == "production" ]
  then
    # payroll
    docker build $PAYROLL_REPO -t $PAYROLL:$COMMIT
    docker tag $PAYROLL:$COMMIT $REPO/$PAYROLL:$TAG
    docker push $REPO/$PAYROLL:$TAG
    # payroll db
    docker build $PAYROLL_DB_REPO -t $PAYROLL_DB:$COMMIT
    docker tag $PAYROLL_DB:$COMMIT $REPO/$PAYROLL_DB:$TAG
    docker push $REPO/$PAYROLL_DB:$TAG
    # client
    docker build $CLIENT_REPO -t $CLIENT:$COMMIT
    docker tag $CLIENT:$COMMIT $REPO/$CLIENT:$TAG
    docker push $REPO/$CLIENT:$TAG
    # swagger
    docker build $SWAGGER_REPO -t $SWAGGER:$COMMIT
    docker tag $SWAGGER:$COMMIT $REPO/$SWAGGER:$TAG
    docker push $REPO/$SWAGGER:$TAG
    # nginx
    docker build $NGINX_REPO -t $NGINX:$COMMIT
    docker tag $NGINX:$COMMIT $REPO/$NGINX:$TAG
    docker push $REPO/$NGINX:$TAG
  fi
fi

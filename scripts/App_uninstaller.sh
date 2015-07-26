#! /bin/bash

export APP_NAME=$1

echo "Uninstalling "$APP_NAME
rm -r $PROJECT_HOME/$APP_NAME/

cd -



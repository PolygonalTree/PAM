#! /bin/bash

export APP_NAME="${1}"

echo "starting App"
source "$WORKON_HOME/$APP_NAME/bin/activate"
cd "$PROJECT_HOME/$APP_NAME/bin/"

python run.py

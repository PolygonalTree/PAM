#! /bin/bash
export APP_SOURCE=$1
export APP_NAME="$2"
export PYTHON_VERSION=$3

echo "creating virtual enviroment"
cd "$WORKON_HOME"
virtualenv "$WORKON_HOME/$APP_NAME" -p $PYTHON_VERSION

echo "moving to virtual environment"
source "$WORKON_HOME/$APP_NAME/bin/activate"

echo "instaling dependencies on virtualenv"
mkdir -p "$PROJECT_HOME/$APP_NAME"

cd "$PROJECT_HOME/"

TAR_FILE=$APP_SOURCE
# List the files in the .tgz file using tar -tf
# Look for all the entries w/o "/" in their names using grep -v
# Count the number of such entries using wc -l, if the count is > 0, create directory
if [ `tar -tf ${TAR_FILE} |grep -v "/"|wc -l` -gt 0 ];then
   echo "Found file(s) which is(are) not in any directory"
   # Directory name will be the tar file name excluding everything after last "."
   # Thus "test.a.sh.tgz" will give a directory name "test.a.sh"
   DIR_NAME="${TAR_FILE%.*}"
   echo "Extracting in ${DIR_NAME}"
   # Test if the directory exists, if not then create it
   [ -d ${DIR_NAME} ] || mkdir "${DIR_NAME}"
   # Extract to the directory instead of cwd
   tar xzvf "${TAR_FILE}" -C "${DIR_NAME}"
else
   # Extract to cwd
   tar xzvf "${TAR_FILE}"
fi

cd "$PROJECT_HOME/$APP_NAME"

#python setup.py install
pip install -e .

echo "leaving virtual env"
deactivate

cd -



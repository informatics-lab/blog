#!/bin/bash
#
# A script to upload images to the Lab S3 images bucket. It will put it in
# the correct folder for projects and articles depending on your branch name.
# It will also rename the file to something random url endoded.
#
# Requirements:
#   * aws-cli
#   * openssl (for random string generation)
#   * Write permission to the informatics-webimages bucket
#
# Tip: you may want to alias this to `blogimage` or something.
#      alias blogimage="/path/to/blog/scripts/upload_image.sh"

_VERBOSE=0 # Vermose mode
_PASTE=0 # Paste from clipboard instead of using local file
while getopts "vp" OPTION
do
  case $OPTION in
    v) _VERBOSE=1
       shift
       ;;
    p) _PASTE=1
       shift
       ;;
  esac
done

# Bail if no file specified and not pasting
if [[ $_PASTE -eq 0 ]]; then
  : ${1?"File to upload required. Usage: $0 <image_path>"}
fi

# Function to echo only when verbose mode is on
function log () {
    if [[ $_VERBOSE -eq 1 ]]; then
        echo "$@"
    fi
}

if [[ $_PASTE -eq 1 ]]; then
  if hash pbcopy 2>/dev/null; then
    LOCAL_FILE=/tmp/$(openssl rand -hex 16).png
    pngpaste $LOCAL_FILE
    if ! [ $? -eq 0 ]; then
      echo "Paste failed"
      exit 1
    fi
  else
    echo "pngpaste not installed. Run `brew install pngpaste`"
    exit 1
  fi
else
  LOCAL_FILE="$1"
fi

# Define variables
BUCKET="informatics-webimages"
IMAGE=$(basename ${LOCAL_FILE})
EXTENSION="${LOCAL_FILE##*.}"
FILENAME=$(openssl rand -hex 16)
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

# Figure out where to put the image
if [[ $BRANCH == "project-"* ]]; then
  TYPE="projects/$BRANCH"
elif [[ $BRANCH == "article-"* ]]; then
  TYPE="articles/$BRANCH"
else
  TYPE="misc"
fi

# Check if the file exists
if [ ! -f "$LOCAL_FILE" ]; then
    echo "File \"$LOCAL_FILE\" not found!"
    exit 1
fi

# Upload to S3
log "Uploading to S3"
aws s3 cp "$LOCAL_FILE" s3://${BUCKET}/${TYPE}/${FILENAME}.${EXTENSION} > /dev/null 2>&1

# Notify the user of success or failure
if [ $? -eq 0 ]; then
  log "Your file is now available "
  S3_URL="https://images.informaticslab.co.uk/${TYPE}/${FILENAME}.${EXTENSION}"
  echo $S3_URL
  if hash pbcopy 2>/dev/null; then
    echo $S3_URL | pbcopy
    echo "Copied to clipboard!"
  fi
else
  echo "Upload failed"
fi

# If pasting remove temp file
if [[ $_PASTE -eq 1 ]]; then
  rm $LOCAL_FILE
fi

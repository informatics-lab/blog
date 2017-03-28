#!/bin/bash
#
# A script to upload images to the Lab S3 images bucket. It will put it in
# the correct folder for projects and articles depending on your branch name.
# It will also rename the file to something random url endoded.
#
# Requirements:
#   * aws-cli
#   * Write permission to the informatics-webimages bucket
#
# Tip: you may want to alias this to `blogimage` or something.

# Bail if no file specified
: ${1?"File to upload required. Usage: $0 <image_path>"}

# Define variables
BUCKET="informatics-webimages"
LOCAL_FILE=$1
IMAGE=$(basename ${LOCAL_FILE})
EXTENSION="${IMAGE##*.}"
FILENAME=$(openssl rand -hex 16)
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Figure out where to put the image
if [[ $BRANCH == "project-"* ]]; then
  TYPE="projects/$BRANCH"
elif [[ $BRANCH == "article-"* ]]; then
  TYPE="articles/$BRANCH"
else
  TYPE="misc"
fi

# Check if the file exists
if [ ! -f $LOCAL_FILE ]; then
    echo "File \"$LOCAL_FILE\" not found!"
    exit 1
fi

# Upload to S3
echo "Uploading to S3"
aws s3 cp $LOCAL_FILE s3://${BUCKET}/${TYPE}/${FILENAME}.${EXTENSION}

# Notify the user of success or failure
if [ $? -eq 0 ]; then
  echo "Your file is now available at https://images.informaticslab.co.uk/${TYPE}/${FILENAME}.${EXTENSION}"
else
  echo "Upload failed"
fi

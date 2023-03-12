#!/bin/bash

new_title=$1
new_lat=$2
new_lng=$3

FILE=../data/locations.csv

# Find the current largest index value in the file
last_index=$(tail -n 1 $FILE | cut -d ',' -f 1)

# Increment the index value by one
new_index=$((last_index + 1))

# Append the new row to the end of the file
echo "$new_index,$new_title,$new_lat,$new_lng" >> $FILE
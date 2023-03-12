#!/bin/bash

id=$1
new_key=$2
new_val=$3

FILE=../data/locations.csv
HEADER=$(head -n 1 $FILE)
COL_INDEX=$(echo $HEADER | tr ',' '\n' | grep -n $new_key | cut -d ':' -f 1)

ROW=$(grep "^$id," $FILE)
OLD_VAL=$(echo $ROW | cut -d ',' -f $COL_INDEX)
NEW_ROW=$(echo $ROW | sed "s/$OLD_VAL/$new_val/g")

sed -i "s/^$id,.*/$NEW_ROW/" $FILE
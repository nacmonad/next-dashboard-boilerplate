#!/bin/bash

id=$1

FILE=../data/locations.csv

sed -i "/^$id,/d" $FILE
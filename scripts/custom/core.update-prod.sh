#!/bin/bash

echo "Executing core for update-prod.sh"
composer install --no-dev -o \
    && cd web \
    && drush cr \
    && drush updb -y \
    && drush cr \
    && drush cim sync -y \
    && drush cr \
    || exit -1

CIMTESTRET=$( { drush cim sync -n; } 2>&1 )
if [[ ${CIMTESTRET} == *"There are no changes to import"* ]]; then
  echo "Config import successful.";
else
  echo "Config import was not completely successful.";
  exit -1;
fi

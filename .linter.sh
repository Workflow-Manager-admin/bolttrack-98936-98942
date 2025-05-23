#!/bin/bash
cd /home/kavia/workspace/code-generation/bolttrack-98936-98942/main_container_for_bolttrack
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


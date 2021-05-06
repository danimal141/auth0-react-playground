#!/bin/sh

if ! docker info > /dev/null; then
  echo Docker is required.
  exit 1
fi

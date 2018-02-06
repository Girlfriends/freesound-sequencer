#!/usr/bin/env bash

git submodule update --init
cd Tone.js
npm install
npm run build
cd ..
# compact-master
Program should be find all .txt files in current directory and
    compress it by Huffman-coding algorithm with multi-threading.
Compressed files with meta.txt file should be saved in directory which named
    as original file.
If you want to decompress all files in current directory (where located program binary file),
    you should run program with -d key.

## Run project (for dev):
1. npm install
2. cd ./src
3. node ./app.js

## Build project (for prod):
1. npm install
2. cd ./src
3. pkg ./app.js --targets [node18-win-x64,node18-macos-x64,node18-linux-x64] --output ./compact


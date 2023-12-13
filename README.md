# compact-master
* Program should be find all .txt files in current directory and
    compress it by Huffman-coding algorithm with multi-threading.
* Compressed files with meta.txt file should be saved in directory which named
    as original file.
* If you want to decompress all files in current directory (where located program binary file),
    you should run program with -d key.

## Run project (for dev):
1. npm install
2. npm run start - only run program script (src/app.js)

## Build project (for prod):
1. npm install
2. npm run build - must be builded in dist folder (targets = ['node18-linux-x64', 'node18-win-x64'])

const fs = require('fs');

const CHUNK_LENGTH = 32768;
const SEQUENCE_LENGTH = 2048;
const TEST_DIR = './mock/test-4/';


/**
 * This function for reading file from disk
 *      and split it to chunks with length 4096 bits each.
 */
const getFileAsChunks = () => {
    const file = fs.readFileSync(TEST_DIR + "test.txt", "binary");
    const chunks = [];
    for (let i = 0; i < file.length; i += CHUNK_LENGTH) {
        const chunk = file.slice(i, i + CHUNK_LENGTH);
        chunks.push(
            chunk
                .split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('')
        );
    }
    return chunks;
};

console.log("Start compressing...");
const chunks = getFileAsChunks();
console.log(chunks.length + " chunks was created.");
console.log(chunks.at(0).length + " bits in each chunk.");



const defineSequences = (chunks, length) => {
    const sequences = [];
    let code = 1;

    console.log("Defining sequences...");

    chunks.forEach((chunk) => {
        let i = 0;
        while (i < chunk.length) {
            const sequence = chunk.slice(i, i + length);
            
            // Check if the sequence is not already in the sequences array
            if (!sequences.some(entry => entry.sequence === sequence)) {
                sequences.push({
                    sequence, 
                    code: code
                        // .toString(2) 
                });
                code++;
            }
            
            i += length;
        }
    });

    console.log(sequences.length + " sequences found.");
    return sequences;
}

/**
 * This function for iterate over chunks and define base sequence of bits.
 *      Sequence must be unique in sequences array.
 *      For each sequence we assign code - number from 1 to n.
 * Function takes chunks as array of strings and length of sequence as number.
 * Function return array such as [{ sequence: code }]
 *      and modified chunks array with codes instead of sequences.
 */
const compressFile = (chunks, sequences) => {
    // const sequences = [];
    // let code = 1;
    const result = [];

    chunks.forEach((chunk, chunkIndex) => {
        const chunkOrder = chunkIndex + 1;
        if (chunkOrder % 1000 === 0) {
            console.log(chunkOrder + " chunk is compressing...");
        }

        // let i = 0;
        // while (i < chunk.length) {
        //     const sequence = chunk.slice(i, i + length);
            
        //     // Check if the sequence is not already in the sequences array
        //     if (!sequences.some(entry => entry.sequence === sequence)) {
        //         sequences.push({
        //             sequence, 
        //             code: code
        //                 // .toString(2) 
        //         });
        //         code++;
        //     }

        //     // Replace sequence with code in chunk
        //     chunk = chunk.replace(sequence, sequences.find(entry => entry.sequence === sequence).code);

        //     i += length;
        // }

        let compressed = chunk;
        sequences.forEach((sequence) => {
            compressed = compressed.replace(new RegExp(sequence.sequence, 'g'), sequence.code);
        });
        
        // Update the chunks array with the modified chunk
        result.push(compressed);
    });

    return { sequences, chunks: result }; // TODO
};

const sequences = defineSequences(chunks, SEQUENCE_LENGTH)
const data = compressFile(chunks, sequences);

console.log(data.sequences.length + " sequences was defined.");
console.log("Compressed chunks was created.");
console.log(data.chunks.length + " chunks was compressed.");


console.log("Sequences length:");
console.log(data.sequences.length);
console.log("Compressed chunks length:");
console.log(data.chunks.length);

const binaryBuffers = data.chunks.map(binaryString => Buffer.from(binaryString, 'binary'));
const combinedBuffer = Buffer.concat(binaryBuffers);
fs.writeFileSync(TEST_DIR + "result.txt", combinedBuffer, "utf-8"); // TODO

const sequencesString = data.sequences.map(entry => entry.sequence + " " + entry.code).join("\n");
const sequencesBuffer = Buffer.from(sequencesString, 'binary');
fs.writeFileSync(TEST_DIR + "meta.bin", sequencesBuffer, "binary")

console.log("Compressing finished.");



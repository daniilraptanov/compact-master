function generateTree(freq) {
    const nodes= [];

    for (const [char, weight] of freq) {
        nodes.push({char, weight, left: null, right: null});
    }

    while (nodes.length > 1) {
        nodes.sort((a, b) => a.weight - b.weight);

        const left = nodes.shift();
        const right = nodes.shift();

        const parent = {char: '', weight: left?.weight + right?.weight, left, right};

        nodes.push(parent);
    }

    return nodes[0];
}

const getCodes = (tree, callback, code = '') => {
    if (!tree) {
        return;
    }

    if (!tree.left && !tree.right) {
        callback(tree.char, code);
        return;
    }

    getCodes(tree.left, callback, code + '0');
    getCodes(tree.right, callback, code + '1');
};

function defineCodes(text) {
    const freqArr = getCharsFreq(text);
    const tree = generateTree(freqArr);

    const codes = new Map();

    getCodes(tree, (char, code) => {
        codes.set(char, code);
    });
    return codes;
}

function getCharsFreq(text) {
    const freq = new Map();

    for (const char of text) {
        const count = freq.get(char);
        freq.set(char, count ? count + 1 : 1);
    }

    return Array.from(freq).sort((a, b) => b[1] - a[1]);
}

function encode(text, codes) {
    const result = [];
    for (const char of text) {
        result.push(codes.get(char));
    }

    return result.join('');
}

function decode(encodedText, codes) {
    let result = '';

    const reversedCodes = {};
    Array.from(codes.entries()).forEach(([key, value]) => {
        reversedCodes[value] = key;
    });

    for (const code of encodedText) {
        result += reversedCodes[code];
    }

    return result;
}

module.exports = {
    encode, decode, defineCodes
}

const { SCRIPT_ARGS } = require("../constants");

const parseValue = (value, validValues) => {
    if (!value || !validValues.includes(value.toLowerCase())) {
        console.error(`Wrong values. Available: ${validValues.join(', ')}`);
        process.exit(1);
    }

    return value;
}

const parseArguments = (args) => {
    const options = {};

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        for (const argInfo of SCRIPT_ARGS) {
            if (argInfo.aliases.includes(arg)) {
                options[argInfo.name] = parseValue(args[i + 1], argInfo.validValues);
                i++;
                break;
            } else {
                console.error(`Unsupported argument: ${arg}`);
                process.exit(1);
            }
        }
    }

    return options;
}


const getValidArguments = () => {
    const args = process.argv.slice(2);
    return parseArguments(args);
}

module.exports = { getValidArguments }

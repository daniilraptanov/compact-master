module.exports = {
  DEFAULT_FILES_EXTENSION: ".txt",
  RESULT_FILE_NAME: "result.bin",
  META_FILE_NAME: "meta.txt",
  SCRIPT_ARGS: [
    {
      name: "decompress",
      aliases: ["-d", "--decompress"],
      validValues: ["1", "0", "true", "false"],
    },
  ],
};

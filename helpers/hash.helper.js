const bcrypt = require("bcryptjs");

exports.encrypt = (text) => bcrypt.hash(text, 10);
exports.compare = (text1, text2) => bcrypt.compare(text1, text2);

const fs = require("fs");

console.log("1");

const ans = fs.readFileSync("test.txt");
console.log("File : " + ans);
console.log("2");
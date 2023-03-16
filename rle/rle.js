const fs = require('fs');

function writeFile(fileName, content) {
    fs.writeFileSync(fileName, content.toString());
}

function readFile(fileName) {
    return fs.readFileSync(process.cwd() + "/" + fileName).toString();
}

let encodeFlag = process.argv[2];
let inputFileName = process.argv[3]
let outputFileName = process.argv[4]

let encodedResult = "";
let stringToEncode = readFile(inputFileName);
if (encodeFlag = '-e') {

    const escapeSymbol = '#';
    let repeatCount = 1;
    let lastCharacter = stringToEncode[0];
    for (let i = 1; i <= stringToEncode.length; i++) {
        while (lastCharacter == stringToEncode[i]) {
            i++;
            repeatCount++;
        }
        if (escapeSymbol == lastCharacter) {
            while (repeatCount > 255) {
                encodedResult += escapeSymbol + String.fromCharCode(255) + lastCharacter;
                repeatCount -= 256;
            }
            if (repeatCount != 0)
                encodedResult += escapeSymbol + String.fromCharCode(repeatCount) + lastCharacter;

        }

        else {
            while (repeatCount > 259) {
                encodedResult += escapeSymbol + String.fromCharCode(255) + lastCharacter;
                repeatCount -= 260;
            }
            if (repeatCount > 3)
                encodedResult += escapeSymbol + String.fromCharCode(repeatCount) + lastCharacter;
            else if (repeatCount > 0)
                encodedResult += lastCharacter.repeat(repeatCount)
        }
        lastCharacter = stringToEncode[i];
        repeatCount = 1;
    }

    writeFile(outputFileName, encodedResult)
    //console.log(encodedResult)
}
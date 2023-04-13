//generate class Node with left node right node int frequense and value char
class Node {
    constructor(left, right, frequense, value) {
        this.left = left;
        this.right = right;
        this.frequense = frequense;
        this.value = value;
    }
}
//get frequesnse of alphabet from string
function getFrequense(str) {
    let frequense = {};
    for (let i = 0; i < str.length; i++) {
        if (frequense[str[i]]) {
            frequense[str[i]]++;
        } else {
            frequense[str[i]] = 1;
        }
    }
    frequense["end"] = 1;
    return frequense;
}

class Haffman {
    encode(string, tree) {
        let codes = this.generateCode(tree);
        let encodedString = '';
        for (let i = 0; i < string.length; i++) {
            encodedString += codes[string[i]];
        }
        return encodedString;
    }

    generateTree(string) {
        let frequense = getFrequense(string);
        let nodes = [];
        for (let key in frequense) {
            nodes.push(new Node(null, null, frequense[key], key));
        }
        while (nodes.length > 1) {
            nodes.sort((a, b) => a.frequense - b.frequense);
            let left = nodes.shift();
            let right = nodes.shift();
            let node = new Node(left, right, left.frequense + right.frequense);
            nodes.push(node);
        }
        return nodes[0];
    }

    generateCode(tree) {
        let codes = {};
        function generateCodeHelper(node, code) {
            if (node.value) {
                codes[node.value] = code;
            } else {
                generateCodeHelper(node.left, code + '0');
                generateCodeHelper(node.right, code + '1');
            }
        }
        generateCodeHelper(tree, '');
        return codes;
    }
    decode(encodedString, tree) {
        let decodedString = '';
        let node = tree;
        for (let i = 0; i < encodedString.length; i++) {
            if (encodedString[i] === '0') {
                node = node.left;
            } else {
                node = node.right;
            }
            if (node.value) {
                decodedString += node.value;
                node = tree;
            }
        }
        return decodedString;
    }
}

let haffman = new Haffman();
let stringToEncode = 'hello world';
let tree = haffman.generateTree(stringToEncode);
let encodedString = haffman.encode(stringToEncode, tree);
console.log(encodedString);
let secondTree = haffman.generateTree(encodedString);
let encodedString2 = haffman.encode(encodedString, secondTree);
console.log(encodedString2);
let decode = haffman.decode(encodedString2, secondTree);
console.log(decode)
decode = haffman.decode(decode, tree);
console.log(decode)


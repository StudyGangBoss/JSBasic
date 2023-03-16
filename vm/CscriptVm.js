let FSO = new ActiveXObject("Scripting.FileSystemObject");
let fileName = WSH.Arguments(0)
let programCode = FSO.OpenTextFile(fileName).ReadAll();

var input = WSH.Arguments().slice(1);
var inputIp = 0;
var command = {
    'read': 0,
    'add': 1,
    'print': 2,
    'exit': 3,
};


var mem = new Array();
var IP = 0;


function CodeToMem(code) {
    var arr = code.split(' ');
    var i = 0;
    arr.forEach(element => {
        if (element in command) {
            mem[i++] = command[element];
        }
        else {
            mem[i++] = parseInt(element);
        }
    })
}

function GetNext(shift = 1) {
    IP += shift;
    IP %= mem.length;
    return IP;
}

function GetNextNum(shift = 1) {
    return mem[GetNext(shift)];
}

CodeToMem(programCode)


function Run() {
    while (mem[IP] != command.exit) {
        switch (mem[IP]) {
            case command.read: {
                mem[GetNextNum()] = input[inputIp];
                GetNext();
                inputIp++;
                break;
            }
            case command.add: {
                //todo
                break;
            }
            case command.print: {
                //todo get answer
                var writeFile = FSO.CreateTextFile("answer.txt", true);
                writeFile.WriteLine("This is a test.");
                break;
            }
            case command.exit:
                return;

            default: {
                console.log('error on ip= ', IP);
                GetNext();
                return ('error on ip= ', IP);
            }

        }
    }
}
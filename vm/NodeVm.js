const fs = require('fs');

function writeFile(fileName, content) {
    fs.writeFileSync(fileName, content.toString());
}

function readFile(fileName) {
    return fs.readFileSync(process.cwd() + "/" + fileName).toString();
}

class InputFromArgs {
    constructor(inputValues) {
        this.inputValues = inputValues;
        this.i = 0;
    }
    read() {
        return this.inputValues[this.i++];
    }
}

class Memory {
    constructor(maxSize) {
        this.memory = [...Array(maxSize)];
        this.ip = 0;
    }

    load(programCode, commandList) {
        //todo
    }

    read() {
        return this.memory[this.ip];
    }

    set(index, value) {
        this.memory[index] = value;
    }

    increment(shift = 1) {
        this.ip += shift;
        this.ip %= this.memory.length;
        return this.ip;
    }


    //propably you will need this functions
    readIncremented(shift = 1) {
    }

    get(index) {
    }

    goto(index) {
    }
}

class CommandList {
    constructor() {
        this.commands = {};
        this.converter = {}
    }

    add(command) {
        this.converter[command.name] = command.codeValue;
        this.commands[command.codeValue] = command;
    }

    get(id) {
        return this.commands[id];
    }
}

class ReadCommand {

    constructor() {
        this.codeValue = 1;
        this.name = "read";
    }

    execute(processor) {
        let userValue = processor.input.read()
        let setTo = processor.memory.readIncremented()
        processor.memory.set(setTo, parseInt(userValue))
        processor.memory.increment();
    }
}

class AddCommand {

    constructor() {
        this.codeValue = 2;
        this.name = "add";
    }
    execute(processor) {
        //todo
    }
}

class PrintCommand {
    constructor() {
        this.codeValue = 3;
        this.name = "print";
    }
    execute(processor) {
        let a = processor.memory.readIncremented();
        var result = processor.memory.get(a);
        writeFile('answer.txt', result);
        console.log(result);
        processor.memory.increment();
    }
}

class ExitCommand {
    constructor() {
        this.codeValue = 4;
        this.name = "exit";
    }
    execute(processor) {
        debugger;
    }
}



class Processor {

    constructor(commandList, memory, input) {
        this.memory = memory;
        this.commandList = commandList;
        this.input = input;
    }

    run() {
        while (true) {
            let nextValue = this.memory.read();
            let command = this.commandList.get(nextValue);
            command.execute(this);
        }
    }
}

function main() {
    let fileName = process.argv[2];
    let programCode = readFile(fileName);

    let input = new InputFromArgs(process.argv.slice(3));

    let commandList = new CommandList();
    commandList.add(new ReadCommand());
    commandList.add(new PrintCommand());
    commandList.add(new AddCommand());
    commandList.add(new ExitCommand());

    let memory = new Memory();
    memory.load(programCode, commandList)

    let processor = new Processor(commandList, memory, input)
    processor.run()
}

main();

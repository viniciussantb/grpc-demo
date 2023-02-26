var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
const readLine = require('readline');
const IreadLine = readLine.Interface({
    input: process.stdin,
    output: process.stdout
});

// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(
    './calculator.proto',
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

var calculator_proto = grpc.loadPackageDefinition(packageDefinition).calculatorguide;
// The protoDescriptor object has the full package hierarchy
const client = new calculator_proto.CalculatorService('localhost:50051', grpc.credentials.createInsecure());

IreadLine.addListener('line', (line) => {
    if (line === 'close') {
        IreadLine.close();
    }

    const paramList = line.split(' ');

    const number1 = +paramList[0];
    const number2 = +paramList[1];
    const operation = paramList[2];

    client.OperationService({ number1, number2, operation }, (err, response) => {
        if (err) {
            console.log('Error: ' + err.message);
        } else {
            console.log("testing grpc calculator...");
            console.log(response);
        }
    })
});
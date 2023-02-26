var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(
    './calculator.proto',
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var calculator_proto = grpc.loadPackageDefinition(packageDefinition).calculatorguide;
// The calculator_proto object has the full package hierarchy

function handleOperation(call, callback) {
    const { number1, number2, operation } = call.request;
    let result;

    switch(operation) {
        case '+':
            result = number1 + number2;
            break
        case '-':
            result = number1 - number2;
            break
        case '*':
            result = number1 * number2;
            break
        case '/':
            result = number1 / number2;
            break
        default:
            break
    }

    callback(null, { result });
}


function startServer() {
    const server = new grpc.Server();
    server.addService(calculator_proto.CalculatorService.service, {
        OperationService: handleOperation,
    });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        console.log('Server running at http://0.0.0.0:50051');
        server.start();
    });
}

startServer();
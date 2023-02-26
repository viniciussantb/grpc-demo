const Schema = require('./calculator_pb.js');

const add = new Schema.Operation();
add.setNumber1(12);
add.setNumber2(32);
add.setOperation('+');

console.log('number1: ' + add.getNumber1());

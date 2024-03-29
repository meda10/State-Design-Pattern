/**
 *  @author Petr Medek
 */

'use strict';
import { State, Context } from './library.mjs';
import * as readline from 'readline';

let prompt = readline.createInterface(process.stdin, process.stdout);

/**
 * Class State_create is a concrete state, it extends general implementation
 * of State. It provides own implementation for state-specific methods.
 */
class State_create extends State {
    constructor(order){
        super(order, 'create');
        this.methods = ['order_create', 'order_pay', 'order_cancel', 'order_ship'];
    }
    order_create(){
        console.log('CREATE: Order already created, waiting for payment');
    }
    order_pay(){
        console.log('CREATE: Order was successfully paid');
        this.context.set_state('pay');
    }
    order_cancel(){
        console.log('CREATE: Order was canceled');
        this.context.set_state('cancel');
    }
    order_ship() {
        console.log('CREATE: Cannot ship, waiting for payment');
    }
}

/**
 * Class State_pay is a concrete state, it extends general implementation
 * of State. It provides own implementation for state-specific methods.
 */
class State_pay extends State {
    constructor(order){
        super(order, 'pay');
        this.methods = ['order_create', 'order_pay', 'order_cancel', 'order_ship'];
    }
    order_create(){
        console.log('PAY: Order already received, waiting for shipping');
    }
    order_pay(){
        console.log('PAY: Payment already accepted');
    }
    order_cancel(){
        console.log('PAY: Order canceled, your money was refunded');
        this.context.set_state('cancel');
    }
    order_ship() {
        console.log('PAY: Order was successfully shipped');
        this.context.set_state('ship');
    }
}

/**
 * Class State_cancel is a concrete state, it extends general implementation
 * of State. It provides own implementation for state-specific methods.
 */
class State_cancel extends State {
    constructor(order){
        super(order, 'cancel');
        this.methods = ['order_create', 'order_pay', 'order_cancel', 'order_ship'];
    }
    order_create(){
        console.log('CANCEL: Your order was created');
        this.context.set_state('create');
    }
    order_pay(){
        console.log('CANCEL: Cannot pay, order does not exist');
    }
    order_cancel(){
        console.log('CANCEL: Cannot cancel, order does not exist');
    }
    order_ship() {
        console.log('CANCEL: Cannot ship, order does not exist');
    }
}

/**
 * Class State_ship is a concrete state, it extends general implementation
 * of State. It provides own implementation for state-specific methods.
 */
class State_ship extends State {
    constructor(order){
        super(order, 'ship');
        this.methods = ['order_create', 'order_pay', 'order_cancel', 'order_ship'];
    }
    order_create(){
        console.log('SHIP: Your order was created');
        this.context.set_state('create');
    }
    order_pay(){
        console.log('SHIP: Payment already accepted and order was shipped');
    }
    order_cancel(){
        console.log('SHIP: Cannot cancel, order was already shipped');
    }
    order_ship() {
        console.log('SHIP: Cannot ship, order was already shipped');
    }
}

/**
 * Main function: runs infinite loop and asks user for commands
 */
let run = function (){
    prompt.question("Command: ", function(cmd){
        switch (cmd){
            case 'help':
                console.log('You can use following commands:');
                console.log('help -> shows help message');
                console.log('exit -> exits the program');
                console.log('current -> displays name of current state');
                console.log('states -> prints all states');
                console.log('set -> allow to set new state manually');
                console.log('create -> runs create_order on current state');
                console.log('pay -> runs pay_order on current state');
                console.log('cancel -> runs cancel_order on current state');
                console.log('ship -> runs ship_order on current state');
                break;
            case 'states':
                console.log('All states: ' + order.get_all_states());
                break;
            case 'set':
                prompt.question("New state: ", function(cmd){
                    switch (cmd){
                        case 'create':
                            order.set_state('create');
                            break;
                        case 'pay':
                            order.set_state('pay');
                            break;
                        case 'cancel':
                            order.set_state('cancel');
                            break;
                        case 'ship':
                            order.set_state('ship');
                            break;
                        default:
                            console.log('Undefined state');
                            break;
                    }
                    run();
                });
                break;
            case 'exit':
                return prompt.close();
            case 'current':
                console.log('Current state: ' + order.get_current_state());
                break;
            case 'create':
                order.run('order_create', null);
                break;
            case 'pay':
                order.run('order_pay', null);
                break;
            case 'cancel':
                order.run('order_cancel', null);
                break;
            case 'ship':
                order.run('order_ship', null);
                break;
            default:
                console.log('Undefined command');
                break;
        }
        run();
    });
}

/**
 * Welcome message
 */
let message = function (){
    console.log('------------------------------------------------------------');
    console.log('Hello, welcome to order simulator, this program simulates ');
    console.log('process of ordering a package.');
    console.log('------------------------------------------------------------');
    console.log('You can use following commands:');
    console.log('help -> shows help message');
    console.log('exit -> exits the program');
    console.log('current -> displays name of current state');
    console.log('states -> prints all states');
    console.log('set -> allow to set new state manually');
    console.log('------------------------------------------------------------');
    console.log('For working with order:');
    console.log('create -> runs create_order on current state');
    console.log('pay -> runs pay_order on current state');
    console.log('cancel -> runs cancel_order on current state');
    console.log('ship -> runs ship_order on current state');
    console.log('------------------------------------------------------------');
    console.log('Output style:');
    console.log('CURRENT STATE: message');
    console.log('------------------------------------------------------------');
    console.log('Tips:');
    console.log('1) You are starting with created order (State CREATED)');
    console.log('2) You can set state manually with command set');
    console.log('------------------------------------------------------------');
    console.log('------------------------------------------------------------');
    console.log();
}

//Creating new order
const order = new Context();
//Adding states to order
order.add_state(new State_create(order));
order.add_state(new State_pay(order));
order.add_state(new State_cancel(order));
order.add_state(new State_ship(order));
//setting up initial state
order.set_state('create');

message();
run();
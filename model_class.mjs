/**
 *  @author Petr Medek
 */

'use strict';
import { State, Context } from './library_class.mjs';
import * as readline from 'readline';

let prompt = readline.createInterface(process.stdin, process.stdout);

/***
 * Class Order extends class Context it adds
 */
class Order extends Context {
    constructor() {
        super();
    }
    order_create_order() {
        return this.current_state.order_create_order();
    }
    order_pay() {
        return this.current_state.order_pay();
    }
    order_cancel(){
        return this.current_state.order_cancel();
    }
    order_ship() {
        return this.current_state.order_ship();
    }
}

/**
 * Class State_create is a concrete state, it extends general implementation
 * of State. It provides own implementation for state-specific methods.
 */
class State_create extends State {
    constructor(order){
        super(order)
        this.name = 'create'
    }
    order_create_order(){
        console.log('CREATE: Order already created, waiting for payment');
    }
    order_pay(){
        console.log('CREATE: Order was successfully paid');
        this.change_state('pay')
    }
    order_cancel(){
        console.log('CREATE: Order was canceled');
        this.change_state('cancel')
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
        super(order)
        this.name = 'pay'
    }
    order_create_order(){
        console.log('pay: Order already received, waiting for shipping');
    }
    order_pay(){
        console.log('pay: Payment already accepted');
    }
    order_cancel(){
        console.log('pay: Order canceled, your money was refunded');
        this.change_state('cancel')
    }
    order_ship() {
        console.log('pay: Order was successfully shipped');
        this.change_state('ship')
    }
}

/**
 * Class State_cancel is a concrete state, it extends general implementation
 * of State. It provides own implementation for state-specific methods.
 */
class State_cancel extends State {
    constructor(order){
        super(order)
        this.name = 'cancel'
    }
    order_create_order(){
        console.log('CANCEL: Creating order');
        this.change_state('create')
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
        super(order)
        this.name = 'ship'
    }
    order_create_order(){
        console.log('SHIP: Creating new order');
        this.change_state('create')
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
                console.log('states -> prints all states');
                console.log('set -> Allow to set new state manually');
                console.log('create -> runs create order on current state');
                console.log('pay -> runs pay order on current state');
                console.log('cancel -> runs cancel order on current state');
                console.log('ship -> runs ship order on current state');
                break;
            case 'states':
                console.log('All states: ' + order.get_all_states());
                break;
            case 'state':
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
                    }
                    run();
                });
                break;
            case 'exit':
                return prompt.close();
            case 'create':
                order.order_create_order();
                break;
            case 'pay':
                order.order_pay();
                break;
            case 'cancel':
                order.order_cancel();
                break;
            case 'ship':
                order.order_ship();
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
    console.log('states -> prints all states');
    console.log('set -> Allow to set new state manually');
    console.log('------------------------------------------------------------');
    console.log('For working with order:');
    console.log('create -> runs create order on current state');
    console.log('pay -> runs pay order on current state');
    console.log('cancel -> runs cancel order on current state');
    console.log('ship -> runs ship order on current state');
    console.log('------------------------------------------------------------');
    console.log('Tips:');
    console.log('1) You are starting with created order');
    console.log('2) You can crate new order when the old one was shipped');
    console.log('------------------------------------------------------------');
    console.log('------------------------------------------------------------');
    console.log();
}

//Creating new order
const order = new Order();
//Adding states to order
order.add_state(new State_create(order));
order.add_state(new State_pay(order));
order.add_state(new State_cancel(order));
order.add_state(new State_ship(order));
//setting up initial state
order.set_state('create');

message()
run();


class State {
    constructor(context) {
        this.context = context;
        this.name = undefined;
    }

    change_state(state) {
        this.context.set_state(state);
    }

    get_name() {
        return this.name;
    }
}

class Context {
    constructor() {
        this.all_states = {};
        this.current_state = undefined;
    }

    set_state(new_state){
        if (new_state in this.all_states) {
            this.current_state = this.all_states[new_state];
            // console.log('Current State: ' + this.current_state.get_name());
        } else {
            console.log('Undefined State: ' + new_state);
        }
    }

    add_state(new_state){
        if (new_state.name !== undefined){
            this.all_states[new_state.name] = new_state;
        }
    }

    get_all_states(){
        return Object.keys(this.all_states);
    }
}

//--------------------------------------

let readline = require('readline');
let prompt = readline.createInterface(process.stdin, process.stdout);

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

class state_create extends State {
    constructor(order){
        super(order)
        this.name = 'create'
    }
    order_create_order(){
        console.log('CREATE: Order already received, waiting for payment');
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
        console.log('CREATE: Can not ship, waiting for payment');
    }
}

class state_pay extends State {
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

class state_cancel extends State {
    constructor(order){
        super(order)
        this.name = 'cancel'
    }
    order_create_order(){
        console.log('CANCEL: Creating order');
        this.change_state('create')
    }
    order_pay(){
        console.log('CANCEL: Can not pay, order does not exist');
    }
    order_cancel(){
        console.log('CANCEL: Can not cancel, order does not exist');
    }
    order_ship() {
        console.log('CANCEL: Can not ship, order does not exist');
    }
}

class state_ship extends State {
    constructor(order){
        super(order)
        this.name = 'ship'
    }
    order_create_order(){
        console.log('SHIP: Order was already shipped');
        console.log('SHIP: Creating new order');
        this.change_state('create')
    }
    order_pay(){
        console.log('SHIP: Payment already accepted and order was shipped');
    }
    order_cancel(){
        console.log('SHIP: Can not cancel, order was already shipped');
    }
    order_ship() {
        console.log('SHIP: Can not ship, order was already shipped');
    }
}

let run = function (){
    prompt.question("Command: ", function(cmd){
        switch (cmd){
            case 'help':
                console.log('You can use following commands:');
                console.log('help -> shows help message');
                console.log('exit -> exits the program');
                console.log('states -> prints all states');
                console.log('create -> runs create order on current state');
                console.log('pay -> runs pay order on current state');
                console.log('cancel -> runs cancel order on current state');
                console.log('ship -> runs ship order on current state');
                break;
            case 'states':
                console.log('All states: ' + order.get_all_states());
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

let message = function (){
    console.log('------------------------------------------------------------');
    console.log('Hello, welcome to order simulator, this program simulates ');
    console.log('process of ordering a package.');
    console.log('------------------------------------------------------------');
    console.log('You can use following commands:');
    console.log('help -> shows help message');
    console.log('exit -> exits the program');
    console.log('states -> prints all states');
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


const order = new Order();
order.add_state(new state_create(order));
order.add_state(new state_pay(order));
order.add_state(new state_cancel(order));
order.add_state(new state_ship(order));
order.set_state('create');

message()
run();

//
// order.order_create_order();
// order.order_pay();
// order.order_pay();
// order.order_cancel();
// order.order_ship();
// order.order_create_order();
// order.order_pay();
// order.order_ship();
// order.order_ship();
// order.order_create_order();
// order.order_pay();
// order.order_cancel();
//

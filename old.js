

var state = function(name) {
    this.name = name
    console.log('In state: '+ name)

    this.next = function (next_state) {
        // return this.
    }

    this.get_name = function (){
        console.log(this.name)
    }


}

let context = function() {
    this.all_states = {};
    this.current_state = null;

    this.add_state = function (new_state) {
        this.all_states['hell'] = new_state;
    }

    this.remove_state = function (state) {
        delete this.all_states[state];
    }

    this.set_state = function (state) {
        this.current_state = this.all_states[state]
        console.log('Current State: ' + this.current_state)
    }
}

export {state, context}
//---------------------------------
'use strict';
import { state, context } from './library.mjs'

function State_order_pending(){
    State_order_pending.prototype.order_make_order = function (){
        console.log('function 1')
    }
    // this.order_verify_payment = function (){
    //     console.log()
    // }
    // this.order_cancel = function (){
    //     console.log()
    // }
    // this.order_ship = function (){
    //     console.log()
    // }
}

let state_order_verified_payment = function (){
    this.order_make_order = function (){
        console.log()
    }
    this.order_verify_payment = function (){
        console.log()
    }
    this.order_cancel = function (){
        console.log()
    }
    this.order_ship = function (){
        console.log()
    }
}

let state_order_canceled = function (){
    this.order_make_order = function (){
        console.log()
    }
    this.order_verify_payment = function (){
        console.log()
    }
    this.order_cancel = function (){
        console.log()
    }
    this.order_ship = function (){
        console.log()
    }
}

let state_order_shipped = function (){
    this.order_make_order = function (){
        console.log()
    }
    this.order_verify_payment = function (){
        console.log()
    }
    this.order_cancel = function (){
        console.log()
    }
    this.order_ship = function (){
        console.log()
    }
}

let order = function (){

}


var gg = new state('State_order_pending');
console.log(gg instanceof state)
State_order_pending.prototype = new state('State_order_pending');
console.log(typeof State_order_pending)
console.log(State_order_pending instanceof state)
// State_order_pending.prototype.state('State_order_pending');
// console.log(State_order_pending.get_name())
State_order_pending.order_make_order()

console.log("exit")


state_order_verified_payment.prototype = new state();
state_order_canceled.prototype = new state();
state_order_shipped.prototype = new state();
order.prototype = new context();
order.add_state(State_order_pending())
order.add_state(state_order_verified_payment())
order.add_state(state_order_canceled())
order.add_state(state_order_shipped())


let run = function (){
    // let c = new context();
    // c.set_state(0)

    var x = {}
    x['type'] = 'hell'
    console.log(x)

}

run()
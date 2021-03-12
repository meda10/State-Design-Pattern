/**
 *  @author Petr Medek
 */

'use strict';


/**
 * General implementation od state object
 * Function change_state calls context object and changes current state
 */
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


/**
 * General implementation of context object.
 * Class stores all states and current active state
 * Class allows to add and remove states
 * Function set_state allows to change state
 */
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

export {State, Context }
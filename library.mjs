/**
 *  @author Petr Medek
 */

'use strict';


/**
 * General implementation od state object
 */
class State {
    constructor(context, name) {
        this.context = context;
        this.name = name;
        this.methods = [];
    }

    get_name() {
        return this.name;
    }

    run_method(method, args){
        if (this.methods.includes(method)) {
            this[method](args);
        } else {
            console.log('Undefined method: ' + method);
        }
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

    get_current_state(){
        return this.current_state.get_name();
    }

    run(method, args){
        this.current_state.run_method(method, args);
    }
}

export { State, Context }
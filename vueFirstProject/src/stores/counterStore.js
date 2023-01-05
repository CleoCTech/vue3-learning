import { defineStore } from 'pinia'

export let usecounterStore = defineStore('counter', {
    //data
    state(){
        return {
            count: 0,
        };
    },

    //actions
    actions: {
        increment(){
            if (this.count < 10) {
                this.count ++;
            }
            
        }
    },

    //computed 
    getters : {
        remaining(){
            return 10 - this.count;
        }
    }
});
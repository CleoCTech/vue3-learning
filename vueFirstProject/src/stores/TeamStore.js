import { defineStore } from "pinia"

export let useTeamStore = defineStore('team', {

    state: () => ({
        name: '',
        spots:  0,
        members: []
    }),

    actions: {
        async fill(){
            //fill the initial state from AJax call or any state

            // import ('@/team.json').then(r => {
            //     let data = r.default;

            //     this.$patch({
            //         name: data.name,
            //         spots: data.spots,
            //         members: data.members,
            //     });
                
            // });

            let r= await import('@/team.json');
            this.$state = r.default;
        },

        grow(spots) {
            this.spots = spots;
        }
    },

    getters: {
        spotsRemaining() {
            return this.spots - this.members.length;
        }
    }



});
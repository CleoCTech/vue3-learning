import AssignmentList from './AssignmentList.js'
import AssignmentCreate from './AssignmentCreate.js';

export default {
    components: {AssignmentList, AssignmentCreate},
    template: `
    <section class="flex gap-8">
    <assignment-list class_type="mb-8" :assignments="filters.inProgress" title="In Progress">
        <assignment-create @add="add"></assignment-create>
    </assignment-list>
    
    <assignment-list 
        v-show="showCompleted"
        class_type="mb-0" 
        :assignments="filters.completed" 
        title="Completed Assignments" 
        can-toggle
        @toggle="showCompleted = !showCompleted"
        >
    </assignment-list>

    
    </section>
    `,
    data() {
        return {
            assignments: [], 
            showCompleted: false,
        }
    },
    computed: {
        filters(){
            return{
                inProgress: this.assignments.filter(assignment => !assignment.complete),
                completed: this.assignments.filter(assignment => assignment.complete)
            };
        }
    },

    created(){
        fetch('http://localhost:3001/assignments') //fetch api giving a promise to return data
            .then(response => response.json()) //tell api, when you will have this data, we call it 'response', I want it in json form. The API will say, i will give you that json but not right away. Another Promise! So we need to do a second 'then`
            .then(assignments => { 
                this.assignments = assignments;
            }); //when you have data, console it.
    },
    methods: {
        add(title){
            this.assignments.push({
                name: title,
                completed: false,
                id: this.assignments.length +1
            })
        }
    }

}
import AssignmentList from './AssignmentList.js'
import AssignmentCreate from './AssignmentCreate.js';

export default {
    components: {AssignmentList, AssignmentCreate},
    template: `
    <assignment-list class_type="mb-8" :assignments="filters.inProgress" title="In Progress"></assignment-list>
    <assignment-list class_type="mb-0" :assignments="filters.completed" title="Completed Assignments"></assignment-list>

    <assignment-create @add="add"></assignment-create>
    
    `,
    data() {
        return {
            assignments: [], 
            newAssignment: ''
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
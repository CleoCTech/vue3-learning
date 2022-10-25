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
            assignments: [
                {id:'1', name:'Finish Task', complete: false, tag: 'math'},
                {id:'2', name:'Read chapter 4 of history of the church', complete: false, tag: 'science'},
                {id:'3', name:'Turn in homework', complete: false, tag: 'math'}
            ], 
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
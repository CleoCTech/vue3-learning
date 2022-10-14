import AssignmentList from './AssignmentList.js'
export default {
    components: {AssignmentList},
    template: `
    <assignment-list class_type="mb-8 px-5" :assignments="filters.inProgress" title="In Progress"></assignment-list>
    <assignment-list class_type="mb-0" :assignments="filters.completed" title="Completed Assignments"></assignment-list>
    
    <hr>
    <pre>
        {{ assignments }}
    </pre>
    `,
    data() {
        return {
            assignments: [
                {id:'1', name:'Finish Task', complete: false},
                {id:'2', name:'Read chapter 4 of history of the church', complete: false},
                {id:'3', name:'Turn in homework', complete: false}
            ]
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

}
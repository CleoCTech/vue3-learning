import AssignmentList from './AssignmentList.js'
export default {
    components: {AssignmentList},
    template: `
    <assignment-list class_type="mb-8" :assignments="filters.inProgress" title="In Progress"></assignment-list>
    <assignment-list class_type="mb-0" :assignments="filters.completed" title="Completed Assignments"></assignment-list>

    <form @submit.prevent="add">
        <div class="border border-gray-600 text-black bg-white flex justify-between">
            <input v-model="newAssignment" placeholder="New Assignment..." class="p-2"> 
            <button type="submit" class="bg-white p-2 border-l">Add</button>
        </div>
    </form>
    
    `,
    data() {
        return {
            assignments: [
                {id:'1', name:'Finish Task', complete: false},
                {id:'2', name:'Read chapter 4 of history of the church', complete: false},
                {id:'3', name:'Turn in homework', complete: false}
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
        add(){
            this.assignments.push({
                name: this.newAssignment,
                completed: false,
                id: this.assignments.length +1
            })
            this.newAssignment= ''
        }
    }

}
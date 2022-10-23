export default {
    template: `
    <form @submit.prevent="add">
        <div class="border border-gray-600 text-black bg-white flex justify-between">
            <input v-model="newAssignment" placeholder="New Assignment..." class="p-2"> 
            <button type="submit" class="bg-white p-2 border-l">Add</button>
        </div>
    </form>
    `,
    
    data() {
        return {
            newAssignment:''
        }
    },
    methods: {
        add(){
            this.$emit('add', this.newAssignment);
            this.newAssignment= ''
        }
    },
}
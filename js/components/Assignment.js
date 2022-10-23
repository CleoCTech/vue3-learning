export default {
    template: `
    <li class="p-2 flex justify-between "
        
    > 
        <label for="">{{ assignment.name }}</label>
        <input type="checkbox" v-model="assignment.complete">
    </li>
    `,

    props: {
        assignment: Object,
    }
}
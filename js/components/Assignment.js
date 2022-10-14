export default {
    template: `
    <li 
        
    > 
        <label for="">{{ assignment.name }}</label>
        <input type="checkbox" v-model="assignment.complete">
    </li>
    `,

    props: {
        assignment: Object,
    }
}
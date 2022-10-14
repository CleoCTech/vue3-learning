export default {

    template: `
    <button 
     :class="{
        'border rounded px-5 py-2 disabled:cursor-not-allowed':true,
        'bg-blue-600 hover:bg-gray-700': class_type == 'primary',
        'bg-gray-200 hover:bg-gray-400': class_type == 'muted',
        'bg-purple-200 hover:bg-gray-400': class_type == 'secondary',
        'is-loading': processing,
     }"
     :disabled="processing"
     >
        <slot/>
    </button>
    `,

    props: {
        class_type: {
            type:String,
            default:'primary'
        }, 
        processing: {
            type:Boolean,
            default:false
        }
    }

}
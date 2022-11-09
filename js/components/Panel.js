export default {
    template: `
        <div :class="{
            'p-4 border rounded-lg':true,
            'bg-gray-700 border-gray-600 text-white' : theme == 'dark',
            'bg-white border-gray-300 text-black' : theme == 'light',
            }"
            >
            <h2 v-if="$slots.heading" class="font-bold">
                <slot name="heading" />
            </h2>

            <slot/>
            <p>
                <slot name="content" />
            </p>

            <footer v-if="$slots.footer" class="border-gray-600 border-t mt-4 pt-4">
                <slot name="footer" />
            </footer>
        </div>
    `,
    props: {
        theme: {type: String, default:'dark'},
    },
}
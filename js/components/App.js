import Assignments from './Assignments.js';
import Panel from './Panel.js';

export default {
    components:{Assignments, Panel},
    template: `
    <div class="grid gap-6">
        <assignments></assignments>
        <panel theme="light">
            <template #heading>
                Hey There! 
            </template>
            <template #content>
                Sample random paragraph here...
            </template>
            <template #footer>
                Click here to learn more
            </template>
        </panel>
        <panel>
            <template #content>
                Sample random paragraph here...with no heading
            </template>
        </panel>
    </div>
    `,

    
}
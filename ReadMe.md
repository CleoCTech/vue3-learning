#Episode 02: Attribute Binding and Event Handling

Key things: 
    `v-bind` => `:`
    `v-on` => `@`

#Examples: 

`v-bind:class="klass-holder"` => `:class="klass-holder"` 
         
`v-on:click="callMethod"` => `@click="callMethod"`

#Episode 03: Lists, Conditionals, and Computed Properties

We used computet object of vue -which act as cache of data you want to render

#Episode 04: First Custom Vue Component

When creating components or any child component,it takes the exact same shape as app.vue/ vue.createApp(),
which means; it can have a data method, mounted hook and it's own reactivity. 
It's 'small' app buy itself, it takes the interface/architecture perse.

Since we can have these many components, in the next episode we are going to extract these components to a separate directory and plug them as child components whenever we need them.

#Episode 05: One Vue Component Per File
-We have successfully extracted each Vue component to it's own file. And we can create these components as many as we can;
-Using devtool extension in the browser, we can be able to see the nested components from rootapp and by selecting each component, we get to see it's reactivity data that's associated with. 
-NB: For use to import this js component to our script section of out html, we use the `<script type="module">` otherwise it will throw an error. 

#Episode 06: Component Props
-Props are like parameters we pass when we create new instance of any component/class.
-Which means, you have to pass these parameters when creating it's instance, but if we don't want to pass parameters, we can give default values incase someone does not pass. 

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

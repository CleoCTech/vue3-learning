# Episode 02: Attribute Binding and Event Handling

Key things: 
    `v-bind` => `:`
    `v-on` => `@`

### Examples: 

`v-bind:class="klass-holder"` => `:class="klass-holder"` 
         
`v-on:click="callMethod"` => `@click="callMethod"`

# Episode 03: Lists, Conditionals, and Computed Properties

We used computet object of vue -which act as cache of data you want to render

# Episode 04: First Custom Vue Component

When creating components or any child component,it takes the exact same shape as app.vue/ vue.createApp(),
which means; it can have a data method, mounted hook and it's own reactivity. 
It's 'small' app buy itself, it takes the interface/architecture perse.

Since we can have these many components, in the next episode we are going to extract these components to a separate directory and plug them as child components whenever we need them.

# Episode 05: One Vue Component Per File
-We have successfully extracted each Vue component to it's own file. And we can create these components as many as we can;
-Using devtool extension in the browser, we can be able to see the nested components from rootapp and by selecting each component, we get to see it's reactivity data that's associated with. 
-NB: For use to import this js component to our script section of out html, we use the `<script type="module">` otherwise it will throw an error. 

# Episode 06: Component Props
-Props are like parameters we pass when we create new instance of any component/class.
-Which means, you have to pass these parameters when creating it's instance, but if we don't want to pass parameters, we can give default values incase someone does not pass. 

# Episode 07: Bring it All Together
-We went back to our backup.html file, and we want to implement component structure as we learned from last class. We bring the code to main index.html and delete the backupfile.html

We you want to separate an html element to a component, thing of what is the importance of doing so. In most cases you want to make it as component because of reusability, but if you're not going to reuse it, no need to refractor it.
Key things: 
    -Note that inside assignments component, we import AssignmentList and we pass the props/parameters and is must since we didn't provide the defaults incase one doesn't pass.
    -Note when we create an instance of the component, inside template, we have given it props/parameters: `:assignments="filters.inProgress" title="In Progress"` .
    For the `title` prop/parameter, we passed in a string without using `:` or `v-bind` you can call it. Therefore it will pass it as a string. 
    But if we do the same in 'assignments' prop/parameter, we will be passing just a string and the component require array of the assignments. That's why we had to use `:` to bind the data from source of truth instead of a string. 

# Episode 08: Handle a Form Submission
-When submitting the form, the default action makes the browser to reload, and we want to prevent that default action.
-In our form that we created, we passed add method to submit event. In our method `add(e)`, we pass the event and we use that event to command the behavior we want i.e `e.preventDefault()` behavior. This tells us that the default behavior of submit event is page reload. 
Therefore we can prevent this behavior at higher level since the submit has this behavior. 
-Instead of passing the event to our function `add(e)`, we do this: 
    ```
    <form @submit.prevent="add">
        <button type="submit" class="bg-white p-2 border-l">Add</button>
    </form>
    ```
 instead of ...
    ```
    <form @submit="add">
    *********************************
    methods: {
            add(e){
                e.preventDefault();
                alert("hi there!");
            }
        } 
    ``` 

# Episode 09: Parent-Child State Communication
-We have separated create concern, therfore assignment-create component. 
-The compent has to do it's work, create new assignement and then communicates back to the parent component "Here is the new item i have created, do what you want to do with it, otherwise I'm done".
-You will find out in most cases that when it comes to parent-child component communication, is that the parent will communicate to child by passing down the `props`.  The child on the hand will communicate back to the parent by `emiting` an event.
-Now in our main/parent component `Assignments`, it will listen to `add` event which was emitted by child component `AssignmentCreate`, and the calls it's own method `add(title)` which receives the parameter and it takes care of pushing it to the assignments array. 

# SECTION 4 Beyond the Basics

# Episode 10: It's All So Easy
- In this episode we don't have a direct objective. We just have to demonstrate how things get easy when you learn the basics. 
- If you an set of array like this: `return new Set(this.assignments.map(a => a.tag));`, this will list each assignment tag. And we will have number of tags equal to the number of assignments if any. 
- What if in this newList/Array of `tags[]`, you want to append new tag/item? 
- You will simply map your new item to the list of tags. 
    `return ['all', ...new Set(this.assignments.map(a => a.tag))];`
- The 3 dots will append 'all' item to set that will be created on the right.    

# Episode 11: Component Responsibility
- In this section we will be refactoring our components. 
- When refactoring, we usaully talk of responsibility or separation of concerns. Byt this we mean, when you're reviewing your components, you will always be thinking 🤔, ...should this component be responsible for that? 
## Example:
- Take an example of `AssignmentList component`, it's responsible for displaying a list of assignments.
- The moment we introduced tags in the same component, we add so many things just to make the tags functionality work. Now the component which was responsible for listing assignments, is now having so many things and probably more to come.
- Let's refractor the tag concern out. 
## Refactoring
- Start with the template by extractiin it out and create a new component of it's name. 
- Check the extracted component , which data does it need?
- We create `assignemenr-tags` component, and passed two $props to it `currentTag` & `initialTags`.
- And then when we click on the tag, we emit change event together with the currentTag user selected:
    ` @click="$emit('change', tag)"`
    - and then listen this event in our parent component:
    `@change="currentTag = $event"` 
    -we will assign that event varuable we have received to the currentTag in our parent component. And becuase of reactivity, the currentTag will pass it's self to child component and change the color of selected tag: 
    `:current-tag="currentTag"`.
- For sure, this magical and pretty easy on how we can achiev dynamicity of data even on separation of concerns/compoments. They are able to communicate effectively and we also have clean code.

# Episode 12: A Deeper Look at V-Model
- We learned the basic of the V-Model. We know that we can apply it to a form input : `v-model="newAssignment"`, and then magically it keeps everything in sync. 
- But, what exactly happens for it to behave as such? Let's have a look...
    - First, it binds the value to the input field.
    - Second, it listens for when the value changes. 
- The long form of `v-model` is equivalent to this : `<input type="text" :value="newAssignment" @input="newAssignment = $event.target.value" >`
image.png

- Lets see how we can apply v-model knownledge somewhere else other than input element. 
- In our assignment-list component, we have embedded assignment tags component, which needs `currentTag` as prop. 
- Therefore, we pass our the prop `currentTag` to assignment-tag component. Since Assignement-List component is the owner/source of truth of this variable: `currentTag`, we need to also to listen when assignmet-tag component changes the value of `currentTag` so that we can update it instantly to anyone else who might need that value, hence `source of truth`. 
### Comparison use case of v-model
- We are basically passing/binding a value, and then, we also listening a kind of input event. 
    ```
    <assignment-tags 
        :initial-tags="assignments.map(a => a.tag)"
        :current-tag="currentTag"
        @change="currentTag = $event"
        >
    </assignment-tags>

    ```

- From our long version(how v-model works under the hood) of `v-model` => `<input type="text" :value="newAssignment" @input="newAssignment = $event.target.value" >`, is the exact same as what we are doing when binding a value to the child component. 
- We actually can use `v-model` here becuase it does the exact same thing we have explained above. 
- From  the above code, we are listening for change event and then manually update it on the parent. We can leavetage `v-model` to do that(listen & update) for us behind the scene. 
    ```
    <assignment-tags 
        v-model:currentTag="currentTag"
        :initial-tags="assignments.map(a => a.tag)"
        >
    </assignment-tags>
    ```

- Note that, we are explicitly telling `v-model` to which modelValue value should listen/update. That's we are doing this `v-model:currentTag` . 
- And then in our child component: assignment-tags, we can update the value of `currentTag` directly and it will be passed by `v-model`. 
    ```
    <button 
        @click="$emit('update:currentTag', tag)"
        v-for="tag in tags" 
        class="border rounded px-1 py-px text-xs"
        :class="{
            'border-blue-500 text-blue-500': tag == currentTag
        }"
        >
        {{ tag }}
    </button>

    ```
- On click, update the prop currentTag and since there's a v-model binded with it, it will be magically updated.

# Episode 13: Lifecycle Hooks, Fake APIs, and AJAX
-So far, we've been hard-coding the list of assignments directly within our Vue component. But of course, that's not overly realistic. Let's switch over to using the fetch() JavaScript API to request data from a fake API.
- We need to setup a fake API with `npm install json-server --save-dev`
- After we create the server, we need to get the server up running using `npx json-server`
- If will run without a database, it will obvisouly complain that it needs a database to work with. Therefore let's create a database. Remember they are all fake, fake API and fake db.
- We create a file name `db.json` and move our assignments data from assignments component and fetch them from our new fake API. 
- Now we run the server: `npx json-server db.json -p 3001`

- We need to understand how vue component Lifecycle works. From beforeCreated(), create(), mounted(), unmounted(). =>Hooks
- We want to fetch data before the component is mounted, therefore we need to perform an axios/fetch request inside created() hook. 

### Fetch API Recap
- Fetch API returns which know as a `promise`
- In a asynchronously, a promise is to say : i will give you your money eventually when i get it. even though for now you can't get your money. Working with promises is to hope for feedback eventually. 

```
created(){
        fetch('http://localhost:3001/assignments') //fetch api giving a promise to return data
            .then(response => response.json()) //tell api, when you will have this data, we call it 'response', I want it in json form. The API will say, i will give you that json but not right away. Another Promise! So we need to do a second 'then`
            .then(data => { 
                console.log(data);
            }); //when you have data, console it.
    },
```
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

# Episode 14: More Flexible Components With Slots and Flags
- Here we cover on how to make a componet flexible for reusability and being able to tweak/modified them.
- You notice if you run `npm serve` and the link on the browser. You're not going to see the assignment list becuase the array is empty. Until we run our server again. So that api can fetch our assignments from fake api. 
- We can create one script to run these two concurrently. 
- Inside `package.json` add scripts
    ```
    "scripts": {
        "start": "npx serve & npx json-server db.json -p 3001"
    },

    ```
- Note we have used single `&` instead of `&&`. Using double and symbol it will run the first part of the command and the next one. We don't want that.
- Now if we run our script with keyword `start` => `npm run start`, we are sure all servers will boot simultaneously.
- If you are on Windows, the script will only run the first part of the command. For some reason, the concurrency is limted. 
- Alternatively, install concurrency package from here `npm install concurrently --save-dev`. 
- In package.json, instead of `"start": "..."`  use `"dev": "concurrently --kill-others \"npx serve\" \"npx json-server db.json -p 3001\""`
- Now run `npm run dev` to start your servers.
- We can now do some stlying of our assignments component, change to column orientation.
- When add flex class in the section wrapper of in asignments component. assignment-create component seems to be misplaced
- We could like to have it just below the in progress assignment-list component by sloting it right below the `<ul></ul>`. 
- By using `slots` or adding `flags` to the component, it gives us a way to selectively extend the component when we want to(where the component is called). 

# Episode 15: Named Slots

- In the last episode, we managed to create a component that accepts a single defualt slot. But in practicle situations, you will find that some of your components require multiple slots.
- What if you need a single panel like that follows a certain pattern where by you can stack any element within. 
- For example from our `assignment-list` component, we have a wrapper that is common across the `in progress` and `complete` assignements.  
- Let's create a reusable card/panel that accepts heading slot, footer, and content with the same styling as the `assignment-list` component. It will be responsible for card styling and any behaviour. It can be inherited and implemented/extended/overrided by maybe color code.

    ```
    <div class="bg-gray-700 p-4 border border-gray-600 rounded-lg">
        <h2 class="font-bold">
            <slot name="heading"/>
        </h2>
    </div>

    ```

- We have created a panel which accepts a slot name 'heading', if you pass any slot with the keyword 'heading' directive, it will be slotted at that space.
- Implementation: 
    ```
    <panel>
        <template v-slot:heading>
            Hey There! 
        </template>
    </panel>

    ```
- The `v-slot:...` is where we specify the name of the slot, where it should. otherwise it will be a defualt slot. 
- You can choose to use this pound sign `#` which is same as `v-slot:`, it's the same thing. 
    ```
    <panel>
        <template #heading>
            Hey There! 
        </template>
    </panel>

    ```
- NOTE: In our `panel` component, is expecting two slots; heading & content. 
    ```
    export default {
        template: `
            <div class="bg-gray-700 p-4 border border-gray-600 rounded-lg">
                <h2 class="font-bold">
                    <slot name="heading" />
                </h2>

                <p>
                    <slot name="content" />
                </p>
            </div>
        `,
    }
    ```
- If we slot in only one slot, like this:
    ```
    <panel>
        <template #content>
            Sample random paragraph here...with no heading
        </template>
    </panel>

    ```
of course the 'content' will display, but the 'heading' will also render even when we don't need it. 
- How do with make sure that uneeded components do not render?
- We use a vue property called `$slots` which stores all defined slots. Therefore, we can use it to check if the slot have something(it's empty by default) and render iff it does.
    ```
    <div class="bg-gray-700 p-4 border border-gray-600 rounded-lg">
        <h2 v-if="$slots.heading" class="font-bold">
            <slot name="heading" />
        </h2>

        <p>
            <slot name="content" />
        </p>

        <footer v-if="$slots.footer">
            <slot name="footer" />
        </footer>
    </div>
    ```
- This way, we are able to create more configurable and flexible components.

- Cool. Now let's take it further and suport themes : 'dark' and 'light'. 
- We simply define a prop 'theme' with a default value/theme. And we can pass our desired theme whenever we want from anywhere. The styling will be determined by the theme property.

    ```
    props: {
        theme: {type: String, default:'dark'},
    },
    ```
    and then use styling in reference to the theme property.

    ```
    :class="{
        'p-4 border rounded-lg':true,
        'bg-gray-700 border-gray-600 text-white' : theme == 'dark',
        'bg-white border-gray-300 text-black' : theme == 'light',
    }"

    ```
- Now that we have a ready made panel, we can use it anywhere in application. 
- We can go to our assignment-list component and import the panel, register it as a component, and then use it instead of section element.

    ```
    import Panel from './Panel.js';

    export default {
        components: {Assignment, AssignmentTags, Panel},
        template: `
        <Panel :class="class_type" v-show="assignments.length" class="w-60">

    ```
- That is it. Well done. 😊


# SECTION 5 Vite
## Episode 16: Vite
- Vite is a French word meaning(quick).
- It is a build tool that takes care of server hot realoading. Which basically means, when i make change on file, the browser will load the changes instantly. 
- It also includes a build tool that will bundle up your code to make it as performance as possible.

****************************************************************
- In our project directory `vue-learning`, we are going to to create another project with `vite` and give it a name "_testVite".
- At the time of the course, the command for creating new app with vite is this `npm create vite@latest` 
- Vite will ask you few questions like `? Project name: >> _testVite`
- `? Package name: >> _testVite`
- `? Select a framework: >> Vue`
- `? Select a variant: >> JavaScript`

- Then the project will scaffold int directly `_testVite`, cd to this directory and then run `npm install` & `npm run dev`

- We can configure our app to use `@` to as `alias` to our source path, which will make our life easier. 
- Inside `vite.config.js` add this:
```

resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }

```
****
```
export default defineConfig({
  plugins: [vue()], 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```
- Now in our `main.js` file we can use `@` instead of directly accessing pathe `./../comp.js`

```
//from this
import App from './App.vue'
```
```
//to this
import App from '@/App.vue'
```
- Vue/cli give this capability to achieve this.

## Episode 17: Little Confusing Things
- When creating new vue project at least for Nov, 2022. Vue ships with some extra directory like `router`, some `configurations` and more. 
- The last project `_testVite` we created didn't prompt us to install some of these shipped directories and configurations/base code. 
- I realise using this command `npm create vite@latest`  and this `npm init vue@latest` brings different results.
- Now, we are going to create a new project using the command `npm init vue@latest` and then answer the questions of what packages we want to install.
- `? Project name: >> _vueFirstProject`
- `? Package name: >> _vuefirstproject`
- `? Add TypeScript: >> No`
- `? Add JSX Support: >> No`
- `? Add Vue Router for Single Page Application development: >> Yes`
- `? Add Pinia for state management: >> No`
- `? Add Vitest for Unit Testing: >> No`
- `? Add an End-to-End Testing Solution: >> No` 
- `? Add ESLint for code quality: >> Yes` 
- `? Add Prettier for code formatting: >> Yes` 

- Now we have a porject to demo these 'little confusing things'. 
- `cd vueFirstProject` and run the following commands:
  ```
  npm install
  npm run lint
  npm run dev
  ````
- Now our project is ready!
- We went from building basic Vue components to scaffolding a full single-page application with routing, configuration, aliases, and more. In this episode, let's review a handful of small things that I think you might initially find to be confusing.

**alias (@)**
- Inside `vite.config.js` which looks like this:
    ```
    import { fileURLToPath, URL } from 'node:url'

    import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'

    // https://vitejs.dev/config/
    export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
    })

    ```
- The `@` is configured to represent file url path of `./src` directory.
- Which means we can go to our vue components and import our component using `@` intead `./`

    ```
    //from
    import HelloWorld from './components/HelloWorld.vue'

    //to 
    import HelloWorld from '@/components/HelloWorld.vue'
    ```
- If you're using phpstorm, you will notice after using that symbol, phpstorm get confused and put red Squiggly lines somewhere in your code. 
- To slove this, we need to create our configuration file called `jsconfig.json` . Then create and object inside with compiler options porperty. 

    ```
    {
        "compilerOptions": {
            "paths": {
                "@/*" : ["./src/*"] //you want the left symbol side to resolve to the right side of the directoty
            }
        }
    }
    ```
- Of course this is a kind od repetion of what is done inside `vite.config.js` but `jsconfig.js` is what phpstorm understands at least for this time of writing and it will interpret.
- With vscode, it does also put red Squiggly lines somewhere in your code. Which we will solve later.

**RouterLink**
- It allows you to navigate to other web pages with a tag without performing full page request as a traditional page requests does. 
- It kind use ajax api to request for a page dynamically.

    ```
    <script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import HelloWorld from '@/components/HelloWorld.vue'
    </script>

    <template>
    <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

        <div class="wrapper">
        <HelloWorld msg="You did it!" />

        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </nav>
        </div>
    </header>

    <RouterView />
    </template>
    ```
-  From the above code we have nav tag which has RouterLinks to different pages.
- And then we have `<RouterView />` which renders the corresponding vue component that  `<RouterLink to="/about">About</RouterLink>` will request.

- Our router link (url) is `/about`. if we visit to `router` directory, we will see what is assigned to this url. Let's have a look'.

    ```
    import { createRouter, createWebHistory } from 'vue-router'
    import HomeView from '../views/HomeView.vue'

    const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
        path: '/',
        name: 'home',
        component: HomeView
        },
        {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue')
        }
    ]
    })

    export default router

    ```
- We can see how the `urls` are asigned to various components. We are saying, if the url is `/` the corresponding component is `HomeView`.

- Use this `RouterLink` even when you're in a different vue component instead of `href`.
- You just need to import in yout vue component:
```
import { RouterLink} from 'vue-router'
```

# SECTION 6: The Composition API
## Episode 18: Two Mental Leaps to Script Setup
- I must admit, I feel bad for what I'm about to do. You were becoming so comfortable, and I had to suddenly throw a wrench into the gears. In this lesson, let's mentally adjust to working with the Composition API and script setup.
- There are two different ways to structure and organise your project in Vue. 
- Originally when Vue was launched, we only had `Options API`. 
- As of Vue 3.0, they gave us `Composition API`. 
- `Composition API` comes with `script setup` which will compile down your code to required standard. 
- One of the keys things in `script setup`, you do not have to return anything i.e data. All you need to do is to define it and it's magically available in the template. 
  ```
  <script setup>
    import TheWelcome from '../components/TheWelcome.vue'
    import { ref } from 'vue'

    let message = ref("Hello World");

    setTimeout(() => {
        message.value ="I have been changed !"
    }, 3000);
  </script>

  <template>
    <p>
      <input type="text" v-model="message" />
    </p>
  </template>
  ```
- We use the macro word `ref` which makes our value reactive to changes.
- As per the popular opinion by devs, they argued that there will be a tendency to forget use `.value` to access any of the reactive properties.
- Another option to solve this, is to use again a macro feature `reactivityTransform` - which is an experimental feature at the time of this writting.
- For experimental features, we have to turn them on inside `vite.config.js` file;
  ```
  export default defineConfig({
    plugins: [vue({
        reactivityTransform: true, //experimental feature. 
    }
    )],
    resolve: {
        alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
  })
  ```
- Having done so, we don't need now to import `ref` in our `script setup` and also, we do not need to get `.value` from our reactive props. Instead to this: 
  ```
  <script setup>
    import TheWelcome from '../components/TheWelcome.vue'

    let message = $ref("Hello World");

    setTimeout(() => {
        message ="I have been changed !"
    }, 3000);
  </script>   
  ```

  ## Episode 19: From Mixins to Composables
  - To understand the benefits of `script setup`, let's begin implementing code reuse and see how it goes.
  - Let's create notification alert on button click using `Options API`;
  
  ```
    <script>
        export default {
            methods: {
            flash(message){
                alert(message);
            }
            },
        }
    </script>

    <template>
        <main>
            <button @click="flash('It Works!')">Click Me</button>
        </main>
    </template>
  ```
- We can use `sweetalert` package to make our notification fancy. 
- Let's cd to `vueFirstProject` directory
- `npm install sweetalert --save-dev`
- Then import it inside `HomeView.vue` component. 
  - `import swal from 'sweetalert'`
  - Then replace `alert` with `swal`
  ```
    <script>
        import swal from 'sweetalert'
        export default {
            methods: {
            flash(message){
                swal(message);
            }
            },
        }
    </script>
  ```
- If we want to take this kind of notifcation to `About Page` or `Contact Us Page`, we have to repeatedly copy and paste. And if you want to change the styling of the notification, you will have again to edit the same code in all pages. This does not make sense. We need to have things in sync. 
- To solve this, we can use some `Vue` mechanism called `Mixins`, which is a sort of like `traits` in `PHP` or `ThreadTools` if you took `Java Multi-threading course` 😊
- Let's a new directory called `mixins` and file `flash.js` .
- When you are creating `mixins`, one nice thing is; the object you're exporting will be identical to all of your vue components and whatever you create inside your object, it will be `mixed in` iniside your component.
- Iniside our `flash.js` file:
  ````
  import swal from 'sweetalert'
  export default {
    methods: {
      flash(message){
        return swal('Success!',message, 'success');
      }
    },
  }
  ````
- And now if we want to use this flash in any component, we will import it like this;
  ```
   <script>
    import flash from '@/mixins/flash';

    export default{
        mixins: [flash],
    }
   </script>
  ```
- This traditional, mixin-based approach works for use. But again we still have a problem. Imagine you want have several mixins being pulled in and you want to find where the flash message is defined. You will have to go through every mixin just find a message variable. Even worse, is when you will be having mixins from a library. This can be confusing. The more recommended approach is to use something know as `composables`.
- Let's create new directory `composables` and make a file called: `useFlash.js`
  ```
    import swal from "sweetalert";

    export function useFlash() {
        function flash(message){
            return swal('Success!',message, 'success');
        }

        //return whatever you want to expose to outside world
        return { flash };
    }
  ```
- Let's go to our `HomeView.vue` component and use this approach instead of `mixins`
  ```
    <script setup>
    import {useFlash} from "@/composables/useFlash";

    let { flash } = useFlash();
    
    </script>
  ```
- Now we can easily modify from one single source of truth. 

## Episode 20: Composable Example: Local Storage
- Let's review another example of a composable. This time, we'll leverage localStorage and Vue reactivity to "remember" a form input's value - even if you refresh the page.
    ```
    import { ref, watch } from 'vue';

    export function useLocalStorage(key, val = null) {
        let storedVal = read();

        if (storedVal) {
            val = ref(storedVal);
        } else {
            val = ref(val); 
            write();
        }

        watch(val, write, {deep : true}); //when you turn deep into true it can be costly in terms of performance

        function read() {
            return JSON.parse(localStorage.getItem(key));
        }
        function write(){
            if (val.value == '' || val.value == null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key,  JSON.stringify(val.value));
            }
            
        }

        return val;
    }
    ```
- Now we can leverage this tool in our Vue components.
  ```
    <script setup>
        import { ref } from 'vue';
        import { useLocalStorage } from "@/composables/useLocalStorage";
        
        let food = useLocalStorage('food');
        let age = useLocalStorage('age');
        let obj = useLocalStorage('obj', {one : 'one', two : 'two'} );

        setTimeout(() => {
        obj.value.one = 1;
        obj.value.two = 2;
        }, 3000);

    </script>

    <template>
        <main>
            <p>
            What is your favorite food? <input type="text" v-model="food"/>
            </p>
            <p>
            What is yourage? <input type="text" v-model="age"/>
            </p>
        </main>
    </template>

  ```
## Episode 21: Refactor to defineProps and defineEmits
- Let's review a couple other Composition API gotchas in this episode. Using the example of an enhanced "tabbable" textarea, we'll learn how to use defineProps and defineEmits when using script setup.
- Let's say you have a `textarea` and you want the user to be able to use tab key to move text within the the textarea. 
- We create a function called `onTabPress(e)` which takes that event from the textarea.

    ```
    function onTabPress(e){

        let textarea = e.target;
        let val = textarea.value,
        start = textarea.selectionStart,
        end = textarea.selectionEnd;

        textarea.value = val.substring(0, start) + "\t" + val.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start +1;
    
    }
    ```
- And the we listen keydown in our textarea element. 
  ```
    <textarea  @keydown.tab.prevent="onTabPress"  style="width: 300px; height:300px;">Hi there</textarea>

  ```
- Note that, with vue you can specify the type of key you want to listen to, it can be `Enter` or `Tab` for our case. 
- The we have have to prevent the default behaviour of the keydown. 
- Imagine if you would be having multiple textarea elements where you want the same behaviour. The best approach is to extract the above code to dedicated component. 
- Inside our `components` directory, lets make our `TabbableTextarea` component.
  ```
    <script setup>
        defineProps({
            modelValue: String
        });

        let emit = defineEmits(['update:modelValue'])

        function onTabPress(e){

            let textarea = e.target;
            let val = textarea.value,
            start = textarea.selectionStart,
            end = textarea.selectionEnd;

            textarea.value = val.substring(0, start) + "\t" + val.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start +1;

        }
    </script>

    <template>
        <textarea 
        @keydown.tab.prevent="onTabPress" 
        @keyup="emit('update:modelValue', $event.target.value);"
        v-text="modelValue" />
    </template>
  ```
## Episode 22: Dependency Injection With Provide and Inject
- Let's next move on to a discussion about dependency injection, and what that might look like within the context of a Vue application. One issue you'll quickly run into is what we refer to as `"prop drilling."` Let's learn what it is, and how to fix it.
- Sometimes you run into awkward situations, where you have to pass a prop down in many levels. We refer thia as `prop drilling`
- In Vue 3, you can use the `provide `and `inject` functions to share state and behavior between components in a hierarchical tree. This is known as dependency injection.

- From our example of `Quiz` , we are passing props `quiz` to child component `Quiz` from our `Homeview` parent component. 
    ```
    <script setup>
    import Quiz from "@/components/Quiz/Quiz.vue";

    </script>

    <template>
    <main>
        <Quiz :quiz = "{name: 'My first question ', questions:[]}"/>
    </main>
    </template>

    ```
- Inside `Quiz` component, we are still passing it down `QuizFooter` child component. 

    ```
    <template>

    <div>

        <QuizHeader />

        <QuizQuestion />

        <QuizFooter :quiz = "quiz"/>
    </div>
        
    </template>

    <script setup>

    import QuizHeader from "@/components/Quiz/QuizHeader.vue";
    import QuizFooter from '@/compenents/Quiz/QuizFooter.vue';
    import QuizQuestion from '@/components/Quiz/QuizQuestion.vue';


    defineProps({ quiz:Object });

    </script>

    ```
- And then still pass the quiz object to the `QuizFooterLinks` and that just a few.
    ```
    <template>
        <footer>
            <h4>Quiz Footer</h4>
            <QuizFooterLinks :quiz="quiz" />
        </footer>
    </template>

    <script setup>
    import QuizFooterLinks from '@/components/Quiz/QuizFooterLinks.vue';


    defineProps({
        quiz: Object
    });
    </script>
    ``` 
- You may find yourself drillimg to more than 5 components. In other words, you are just forcing certain components to accept a prop for a sole purpose of passing it to nested component. 
- That's why we need to leaverage `provide` and `inject` where it's needed only (must be to child component only). 
- Note that provide and inject only work within the same parent-child tree. If you want to share state between unrelated components, you can use a global store like Vuex/Spinia now or a custom event bus.

- We provide our value from the parent component and inject it to only components that needs it. 

    ```
    import { provide, ref } from "vue";

    defineProps({ quiz:Object });

    let name = ref('John Doe');

    provide('name', name);
    ```
- From the example above we are providing data but in a reactive way such that if the data is changed from child component where it's injected, it's immediately updated to the source of truth, i.e the provider.

- Inside the receiver component, we inject the data like this:
    ```
    import { inject } from 'vue';

    defineProps({
        quiz: Object
    });

    let name  = inject('name');

    setTimeout(() => {
        name.value = 'New Name';
    }, 3000);


    //and display it like this

    <template>
    <div>
        <h5>{{ quiz.name }}}</h5>
        <h5>{{ name.value }}}</h5>

        <ul>
            <li> <a href="#">Get a Job</a></li>
            <li> <a href="#">Contact Us</a></li>
        </ul>
    </div>
    </template>
    ```
-  The setTimeout() method is to test if the value of name is changed from child component can be updated to the parent. And it will since we provided it as a reactive data by using `ref()` => `let name = ref('John Doe')`
- In some other cases, the property my be updated and you don't know the specific component that is changing/updating data that you provide. If you want to take control of this, you can create a rule, that the only place you can change the data is in the parent component where it's being provided.
-  If we take this approach, we have to change how we provide data, we provide an object instead of a string. The object will contain the data and the equivalent of a mutator - which will be a function that will be responsible for changing the name/updating data. 

    ```
    provide('name', {
        name: name,
        changeName: () => name.value = 'Name Changed'
    });
    ```
- Notice, now th logic for updating name, now exits within the parent. And if we wanna trigger the change, we simply pass a reference to this function to the child component.

    ```
    import { inject } from 'vue';

    defineProps({
        quiz: Object
    });

    //we accept the object properties for us to use them
    let {name, changeName }  = inject('name');


    //and change the name when we click this button
    <template>
        <button @click="changeName">{{ name.value }}}</button>
    </template>
    ```
- We can agree that, this approach is cleaner compared to drilling down of props to all children components. 


## Episode 23: Store State in an External File
- So far, we've reviewed two different ways to share state across a wide range of components. But we're not done yet! Let's review a simple example that will take you a long way. There's nothing keeping you from extracting data, or state, to a reusable external file.

- In our `HomeView` component, we hard coded the initial state for quiz. 
    ```
    <Quiz :quiz = "{name: 'My first question ', questions:[]}"/>
    ```
- We can extract this and call it `state`
    ```
    //extracted state/data
    let state = "{name: 'My first question ', questions:[]}";
    ```
- You can actually store this state/date within it's own file.
- Within `src` directory, lets create a folder and call it `stores`. Within here, we will have a file called `quizStore.js`. 
- Then the grab the extracted state and put it inside `quizStore.js` file. 
- Then you obviously want to make it accessible to the outside world. so you will have to export it. 
    ```
    //quizStore.js 
    export let state = "{name: 'My first question ', questions:[]}";
    ```
- Inside our `HomeView` component, we can import it with the name we called it. 
    ```
    <script setup>
    import Quiz from "@/components/Quiz/Quiz.vue";
    import {state} from "@/stores/quizStore.js";


    </script>

    <template>
    <main>
        <Quiz :quiz = "state"/>
    </main>
    </template>

    ``` 
- In our `Quiz` component, we can get rid of `provide` and `inject` stuff and import the `state` from it's file instead of accepting any `props`. 
- We can also get rid of passing quiz on down drill:
    ```
    //from
    <QuizFooter :quiz = "quiz"/>

    //to
    <QuizFooter />
    ```
- Inside `QuizFooterLinks` , we can get rid of `inject` entirely and import a state:

    ```
    <template>
        <div>
            <h5>{{ state.name }}}</h5>
            <ul>
                <li> <a href="#">Get a Job</a></li>
                <li> <a href="#">Contact Us</a></li>
            </ul>
        </div>
    </template>

    <script setup>
    import {state} from "@/stores/quizStore.js";

    </script>

    ```
- This is an alternative way of managing a `state` or `data` as we were doing in other approach of `provide` and `inject`, in a particularly, a `state/data` that needs to be accessible globally or at least a wide range of components.
- These are situations where you need to access a wide range of components:
    - You can have a state for the current user i.e `currentUserStore.js`
    - A shooping cart, when you have a shopping cart, you ned to access it's `state`across the entire page.  
- What we have now, is quite simple and it's not flexible. Let's see how...
- In our `QuizFooterLinks` component. lets add a button and when clicked it changes the state.name or quiz name to a new given name.

    ```
    <template>
        <div>
            <h5>{{ state.name }}}</h5>
            <button @click="state.name = 'A New Quiz Name'">Change Quiz Name</button>

            <ul>
                <li> <a href="#">Get a Job</a></li>
                <li> <a href="#">Contact Us</a></li>
            </ul>
        </div>
    </template>

    <script setup>
    import {state} from "@/stores/quizStore.js";

    </script>
    ```
- If you run our project, you will notice that the name is being updated but not being reflected in `<h5>{{ state.name }}}</h5>`, and that's because, we just updated the string, and no point we specified that it should be `reactive`
- We can to our store and make our `state/data` reactive. 
    ```
    //quizStore.js 
    import { reactive } from "vue";

    export let state =  reactive({
        name : 'My first question ',
        questions:[]
    });
    ```
- Notice we using keyword `reactive` instead of `ref`. Well, `reactive` is used when we are dealing with objects wherehas `ref` is good when we have variables. 
- This will get job done in most cases but until you start building signficantly more complex applications that you might run into some roadblocks. And those roadblocka are like:
    - This `state` is changing and i don't know why?
    - Or I need to hook in when the state changes and do some kind of operation like ajax query or update localstorage. 
- It's those situations when you might need to reach for something a bit more flexible. And we shall see in the next episode. 

## Episode 24: Direct Mutation Concerns
- Before we move on to a dedicated tool for managing globally accessible state (Pinia), let's first review some new terminology and discuss potential concerns related to directly mutating state.

    - Action = Method
    - State =  data

- Let's create a new page called `CounterView` which will show the `count`.
- We create a `state` of this counter in external file `counterStore.js` and call it  `counter`
    ```
    import { reactive } from "vue";

    export let counter = reactive({

        //state
        count: 0,

        //action
        increment (){
            if (this.count <=9) {
                this.count++;
            }
        
        }
    });
    ```
- Then and import the counter inside  `CounterView` component. 
    ```
    <template>
        <div>
            <h1>{{ counter.count }}</h1>
            <button @click="counter.increment()">Incriment</button>
        </div>
    </template>

    <script setup> 
    import { counter } from "@/stores/counterStore.js";

    </script>

    ```
- We have a button to increment our count, such that we do not increment/chnage/mutate the state of data directly from outside the it's 'store'. Rather we could like to have the logic of changing the state to be inside it's store and us is to call it. 
- This is what tool called `Pinia` give you and even more features. 
- In the next episode we will learn how to manage state with `Pinia` - a dedicated tool fro dealing with global **state management**
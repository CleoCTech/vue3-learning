<template>
    <div>
        <h5>{{ quiz.name }}}</h5>
        <button @click="changeName">{{ name.value }}}</button>
        <!-- <h5>{{ name.value }}}</h5> -->

        <ul>
            <li> <a href="#">Get a Job</a></li>
            <li> <a href="#">Contact Us</a></li>
        </ul>
    </div>
</template>

<script setup>
import { inject } from 'vue';

//we accept the object properties for us to use them
let {name, changeName, quiz }  = inject('name');


</script>

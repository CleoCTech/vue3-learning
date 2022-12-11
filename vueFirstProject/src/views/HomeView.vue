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

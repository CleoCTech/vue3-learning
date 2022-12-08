<script setup>
  import TheWelcome from '../components/TheWelcome.vue'

  let message = $ref("Hello World");

  let doSomething = () => {
    alert(message);
  };
  setTimeout(() => {
    message ="I have been changed !"
  }, 3000);
</script>

<template>
  <main>
    <TheWelcome />

    <p>{{ message }}</p>
    <p>
      <input type="text" v-model="message" />
    </p>
    <button @click="doSomething">Click Me</button>
  </main>
</template>

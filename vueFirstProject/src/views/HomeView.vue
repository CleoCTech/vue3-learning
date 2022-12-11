<script setup>
  import {useFlash} from "@/composables/useFlash";

  let { flash } = useFlash();

</script>

<template>
  <main>
    <button @click="flash('Whoa!', 'It Works', 'success')">Click Me</button>
  </main>
</template>

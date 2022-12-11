<script setup>
import TabbableTextarea from "@/components/TabbableTextarea.vue";
import { ref } from "vue";
 
 let comment = ref('test value')
</script>

<template>
  <main>
    <form>
      <TabbableTextarea v-model="comment" style="width:300px; height:100px" />
    </form>
  </main>
</template>

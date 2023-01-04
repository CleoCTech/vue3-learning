<template>
    <div>
        <h1>{{ counter.count }}</h1>
        <button @click="counter.increment()">Incriment</button>
    </div>
</template>

<script setup> 
import { counter } from "@/stores/counterStore.js";

</script>

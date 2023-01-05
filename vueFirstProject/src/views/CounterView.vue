<template>
    <div>
        <h1>{{ counter.count }}</h1>
        <button 
        @click="counter.increment()"
        :disabled="!counter.remaining"
        >Incriment ({{ counter.remaining }}) Remaining</button>
    </div>
</template>

<script setup> 
import { usecounterStore } from "@/stores/CounterStore.js";

let counter = usecounterStore();


</script>

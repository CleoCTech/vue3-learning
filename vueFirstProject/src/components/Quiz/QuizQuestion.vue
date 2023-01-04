<template>
    <div>
        <textarea v-model="state.name" cols="30" rows="10"></textarea>
    </div>
</template>

<script setup>
import { state } from "@/stores/quizStore.js";
</script>

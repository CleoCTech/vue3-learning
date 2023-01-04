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
import { provide, ref } from "vue";

let props = defineProps({ quiz:Object });

let name = ref('John Doe');

provide('name', {
    name: name,
    quiz: props.quiz,
    changeName: () => name.value = 'Name Changed'
});

</script>
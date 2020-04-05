<template>
  <div class="container">
    Welcome to the Home Page :)
    <app-question></app-question>
  </div>
</template>

<script>
import Question from '../components/Question.vue'

export default {
  name: 'Home',
  components: {
    'app-question': Question,
  }
};
</script>

<style scoped>

</style>

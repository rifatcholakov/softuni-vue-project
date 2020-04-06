<template>
  <div class="container">
    <ul>
      <li v-for="(question, index) in questions" :key="index">
        <router-link :to="'/question/' + question.id">
          <app-question :questionTitle="question.title" :timeAgo="question.timeAgo" :author="question.postedBy"></app-question>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Question from '../components/Question.vue'
import { DB } from '../firebase/db';
import * as moment from 'moment';

export default {
  components: {
    'app-question': Question,
  },
  data() {
    return {
      questions: []
    }
  },
  created() {
    DB.collection('questions')
      .get()
      .then(querySnapshot => {
        const documents = querySnapshot
                        .docs
                        .map(doc => ({ 
                          ...doc.data(), 
                          id: doc.id, 
                          timeAgo: moment(doc.data().datePosted.toDate()).fromNow()
                          }));
      this.questions = documents
                      .sort((a, b) => b.datePosted.toDate() - a.datePosted.toDate());
    })
  }
};
</script>

<style scoped>
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style-type: none;
  }

  a:hover {
    text-decoration: none;
  }
</style>

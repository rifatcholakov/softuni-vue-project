<template>
  <div class="container">
    <div class="ask">
        Can't find what you're looking for?
        <router-link to="/ask-question" class="my-btn ask-btn">Ask</router-link>
    </div>
    <div class="no-results" v-if="noResults || this.questions.length === 0">
        <p>Sorry, no results found!</p>
    </div>
    <ul v-if="!noResults">
      <li v-for="(question, index) in questions" :key="index">
        <router-link :to="'/question/' + question.id">
          <app-question :questionTitle="question.title" :timeAgo="question.timeAgo" :author="question.postedBy" :answers="question.answers.length"></app-question>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Question from '../components/Question.vue'
import { DB } from '../firebase/db';

export default {
  components: {
    'app-question': Question,
  },
  data() {
    return {
        searchTerm: '',
        questions: [],
        noResults: false
    }
  },
  
  created() {
    this.searchTerm = this.$route.query.term;

    if(this.searchTerm == '') {
        this.noResults = true;
    }

    DB.collection('questions')
    .get()
    .then((querySnapshot) => {
        querySnapshot
            .docs
            .map(doc => {
                const question = doc.data();
                const reg = new RegExp(this.searchTerm.toLowerCase(), "g");

                if(question.title.toLowerCase().match(reg)) {
                    this.questions.push(question);
                }
            });
    });

  },
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
    color: #fff;
  }
  
  .ask {
    margin-top: 30px;
    text-align: right;
    font-weight: 600;
    font-size: 20px;
  }

  .ask-btn {
    text-align: right;
    display: inline-block;
    margin-left: 10px;
  }

  .no-results {
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
  }
</style>

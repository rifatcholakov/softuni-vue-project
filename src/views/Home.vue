<template>
  <div class="container">
    <div class="ask">
        You have a question? Don't wonder but
        <router-link to="/ask-question" class="my-btn ask-btn">Ask</router-link>
    </div>
    <ul>
      <div class="no-results" v-if="questions.length === 0">
        <p>Loading Questions...</p>
      </div>
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

  @media all and (max-width: 960px) {
    .ask {
      font-size: 18px;
      text-align: center;
    }

    .ask-btn {
        text-align: center;
        margin: 20px 0 0 0;
    }
  }
</style>

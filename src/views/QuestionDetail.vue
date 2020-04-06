<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="box">
                    <h1 class="question-title">{{ question.title }}</h1>
                    <p class="question-meta">Posted <strong>{{ question.timeAgo }}</strong> ago by <strong>{{ question.postedBy }}</strong></p>
                    <p class="question-detail" v-html="question.description"> 
                    </p>
                    <div class="manage">
                        <button class="edit-question" @click="editQuestion">Edit</button>
                        <button class="delete-question" @click="deleteQuestion">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h2 class="answers-title">2 Answers</h2>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="box">
                    <p class="question-meta">Posted <strong>3 hours</strong> ago by <strong>bob12</strong></p>
                    <p class="answer">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <div class="manage">
                        <button class="edit-question">Edit</button>
                        <button class="delete-question">Delete</button>
                    </div>
                </div>
                <div class="box">
                    <p class="question-meta">Posted <strong>3 hours</strong> ago by <strong>bob12</strong></p>
                    <p class="answer">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <div class="manage">
                        <button class="edit-question">Edit</button>
                        <button class="delete-question">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="box">
                    <h2 class="your-answer-title">Your Answer</h2>
                    <div class="error-message">Error Message</div>
                    <vue-editor v-model="content"></vue-editor>
                    <button class="post-answer-btn">Post Your Answer</button>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import { VueEditor } from "vue2-editor";
import { DB } from '../firebase/db';
import * as moment from 'moment';

export default {
    components: {
        VueEditor
    },

    data() {
        return {
        question: {},
        content: ""
        };
    },

    methods: {
        deleteQuestion() {
            DB.collection('questions')
              .doc(this.$route.params.id)
              .delete()
              .then(() => this.$router.push('/'));
        },

        editQuestion() {
            this.$router.push('/ask-question/' + this.$route.params.id);
        }
    },

    created() {
        const id = this.$route.params.id;
        
        DB.collection('questions')
            .doc(id)
            .get()
            .then(snapshot => this.question = { ...snapshot.data(), timeAgo: moment(snapshot.data().datePosted.toDate()).fromNow() });
    }
};
</script>

<style scoped>
    .box {
        background: #fff;
        padding: 30px 35px;
        margin-bottom: 30px;
        margin-top: 30px;
        border-radius: 4px;
        box-shadow: 0 2px 0 0 rgba(0,0,0,0.1);
    }

    .question-title {
        color: #2d3339;
        font-weight: 500;
        font-size: 24px;
        line-height: 1.4;
    }

    .question-meta {
        color: #7b8b8e;
    }

    .answers-title {
        font-size: 1.5rem;
        margin: 20px 10px 0px 10px;
        
    }

    .your-answer-title {
        font-size: 1.5rem;
        margin: 15px 0;
    }

    .post-answer-btn,
    .edit-question,
    .delete-question {
        color: #fff;
        border: solid 2px #3ac162;
        background-color: #3ac162;
        font-size: 14px;
        height: 40px;
        line-height: 36px;
        padding: 0 15px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 800;
        margin: 20px 0;
    }

    .delete-question {
        border: solid 2px #ed5a5a;
        background-color: #ed5a5a;
        margin-left: 10px;
    }

    @media all and (max-width: 960px) {
        .post-answer-btn {
            width: 100%;
        }

        .edit-question,
        .delete-question {
            width: 48%;
            display: inline-block;
            padding: 0 5px;
        }
    }

    @media all and (max-width: 350px) {
        .edit-question,
        .delete-question {
            width: 47%;
            display: inline-block;
            padding: 0 5px;
        }
    }
</style>
<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="box">
                    <h1 class="question-title">{{ question.title }}</h1>
                    <p class="question-meta">Posted <strong>{{ question.timeAgo }}</strong> ago by <strong>{{ question.postedBy }}</strong></p>
                    <p class="question-detail" v-html="question.description"> 
                    </p>
                    <div class="manage" v-if="question.postedBy === authUser.displayName">
                        <button class="edit-question" @click="editQuestion">Edit</button>
                        <button class="delete-question" @click="deleteQuestion">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h2 class="answers-title" v-if="question.answers">{{ question.answers.length }} Answers</h2>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="box" v-for="(answer, index) in question.answers" :key="index">
                    <p class="question-meta">Posted <strong>{{ answer.timeAgo }}</strong> ago by <strong>{{ answer.author }}</strong></p>
                    <p class="answer" v-html="answer.content"></p>
                    <div class="manage" v-if="answer.author === authUser.displayName">
                        <button class="edit-question" @click="editAnswer(index)">Edit</button>
                        <button class="delete-question" @click="deleteAnswer(index)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="box" id="editAnswer">
                    <h2 class="your-answer-title">Your Answer</h2>
                    <div class="error-message">Error Message</div>
                    <form @submit.prevent="postAnswer">
                        <vue-editor v-model="content"></vue-editor>
                        <button class="post-answer-btn">{{editMode ? 'Edit' : 'Post'}} Your Answer</button>
                        <button class="delete-question" v-if="editMode" @click="cancelEdit">Cancel Editing</button>
                    </form>
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
    props: ['authUser'],

    components: {
        VueEditor
    },

    data() {
        return {
        question: {},
        content: "",
        editMode: false,
        editIndex: null
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
        },
        
        postAnswer() {
            if(!this.editMode) {
                const answer = {
                    content: this.content,
                    author: this.authUser.displayName,
                    datePosted: new Date(),
                    timeAgo: 'a few seconds ago'
                }

                this.question.answers.push(answer);
            } else {
                const newContent = this.content;
                this.question.answers[this.editIndex].content = newContent;

                this.editIndex = null;
                this.editMode = false;
            }

            DB.collection('questions')
              .doc(this.$route.params.id)
              .update(this.question);

            this.content = '';
        },

        deleteAnswer(index) {
            this.question.answers.splice(index, 1);

            DB.collection('questions')
              .doc(this.$route.params.id)
              .update(this.question);
        },

        editAnswer(index) {
            this.content = this.question.answers[index].content;
            this.$scrollTo('#editAnswer');

            this.editIndex = index;
            this.editMode = true;
        },

        cancelEdit() {
            this.editMode = false;
            this.editIndex = null;
            this.content = '';
        }
    },

    created() {
        const id = this.$route.params.id;
        
        DB.collection('questions')
            .doc(id)
            .get()
            .then(snapshot => {
                this.question = { ...snapshot.data(), timeAgo: moment(snapshot.data().datePosted.toDate()).fromNow() };
                this.question.answers.map(answer => {
                    answer.timeAgo = moment(answer.datePosted.toDate()).fromNow();
                });
            });
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
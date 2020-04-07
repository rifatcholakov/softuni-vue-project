<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <form class="form" @submit.prevent="postQuestion">
                    <div class="error-message">Your Question Error Messages</div>
                    <input type="text" placeholder="You question" class="form-field" v-model="question.title">
                    <div class="error-message">Vue Editor Error Messages</div>
                    <vue-editor v-model="question.description"></vue-editor>
                    <button class="ask-btn">{{ btnText }}</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { DB } from '../firebase/db';

export default {
    props: ['authUser'],

    components: {
        VueEditor
    },

    data() {
        return {
            question: {
                title: '',
                description: '',
                datePosted: new Date(),
                answers: []
            },
            btnText: 'Ask',
            editMode: false
        };
    },

    methods: {
        postQuestion() {
            if(!this.editMode) {
                this.question.postedBy = this.authUser.displayName;

                DB.collection('questions')
                  .add(this.question)
                  .then(doc => this.$router.push('/question/' + doc.id));
            } else {
                DB.collection('questions')
                  .doc(this.$route.params.id)
                  .set(this.question)
                  .then(() => this.$router.push('/question/' + this.$route.params.id))
            }
        }
    },

    created() {
        if(this.$route.params.id) {
            this.editMode = true;

            const id = this.$route.params.id;
        
            DB.collection('questions')
              .doc(id)
              .get()
              .then(snapshot => this.question = snapshot.data());
            
            this.btnText = 'Edit';
        } else {
            this.editMode = false;
        }
    }
};
</script>

<style scoped>
    .form {
        background: #fff;
        padding: 30px 15px;
        margin-bottom: 30px;
        margin-top: 30px;
        border-radius: 4px;
        box-shadow: 0 2px 0 0 rgba(0,0,0,0.1);
    }

    .form-field {
        background: #e8ebed;
        font-size: 14px;
        color: #576366;
        width: 100%;
        padding: 12px 15px;
        outline: 0;
        border: 2px solid #e8ebed;
        border-radius: 5px;
        margin-bottom: 13px;
    }

    .ask-btn {
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
        margin-top: 20px;
    }

    @media all and (max-width: 960px) {
        .ask-btn {
            width: 100%;
        }
    }
</style>
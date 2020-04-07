<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-3"></div>
            <div class="col-lg-6">
                <form class="form" @submit.prevent="signIn">
                    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
                    <h2 class="title">Sign in into your account</h2>
                    <div class="error-message" v-if="emailErrorMessage">{{ emailErrorMessage }}</div>
                    <input type="email" class="form-field" placeholder="Email Address" v-model="email">
                    <div class="error-message" v-if="passwordErrorMessage">{{ passwordErrorMessage }}</div>
                    <input type="password" class="form-field" placeholder="Password" v-model="password">
                    <button class="my-btn">Sign in</button>
                </form>
            </div>
            <div class="col-lg-3"></div>
        </div>
    </div>
</template>

<script>
import { Auth } from '../firebase/auth';

export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
            emailErrorMessage: '',
            passwordErrorMessage: ''
        }
    },
    methods: {
        signIn() {
            if(this.email === '' || this.password === '') {
                this.email === '' ? this.emailErrorMessage = 'Please enter an email' : this.emailErrorMessage = '';
                this.password === '' ? this.passwordErrorMessage = 'Please enter a password' : this.passwordErrorMessage = '';

                return;
            } else {
                this.emailErrorMessage = '';
                this.passwordErrorMessage = '';
            }

            Auth.signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.$router.push('/')
                }, error => this.errorMessage = error.message);
        }
    },

    beforeRouteEnter(to, from, next) {
        const signedIn = localStorage.getItem('signedIn');
        
        if(signedIn) {
            next({
            path: '/'
            })
        } else {
            next();
        }
    }
}
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

    .title {
        font-size: 1.5rem;
        margin-bottom: 25px;
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
</style>

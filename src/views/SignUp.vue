<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-2 col-sm-1"></div>
            <div class="col-lg-6">
                <form class="form" @submit.prevent="signUp">
                    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
                    <h2 class="title">Create an account</h2>
                    <div class="error-message" v-if="displayNameErrorMessage">{{ displayNameErrorMessage }}</div>
                    <input type="text" class="form-field" placeholder="Display Name" v-model="user.displayName">
                    <div class="error-message" v-if="emailErrorMessage">{{ emailErrorMessage }}</div>
                    <input type="email" class="form-field" placeholder="Email Address" v-model="user.email">
                    <div class="error-message" v-if="passwordErrorMessage">{{ passwordErrorMessage }}</div>
                    <input type="password" class="form-field" placeholder="Password" v-model="user.password">
                    <button class="signup-btn">Sign up</button>
                </form>
            </div>
            <div class="col-lg-3 col-md-2 col-sm-1"></div>
        </div>
    </div>
</template>

<script>
import { Auth } from '../firebase/auth';
// import { DB } from '../firebase/db';

export default {
    data() {
        return {
            user: {
                displayName: '',
                email: '',
                password: ''
            },
            errorMessage: '',
            displayNameErrorMessage: '',
            emailErrorMessage: '',
            passwordErrorMessage: '',
        }
    },
    methods: {
        signUp() {
             if(this.user.displayName === '' || this.user.email === '' || this.user.password === '') {
                this.user.displayName === '' ? this.displayNameErrorMessage = 'Please enter a display name' : this.displayNameErrorMessage = '';
                this.user.email === '' ? this.emailErrorMessage = 'Please enter an email' : this.emailErrorMessage = '';
                this.user.password === '' ? this.passwordErrorMessage = 'Please enter a password' : this.passwordErrorMessage = '';

                return;
            } else {
                this.displayNameErrorMessage = '';
                this.emailErrorMessage = '';
                this.passwordErrorMessage = '';
            }           

            Auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
                .then(() => {
                    Auth.currentUser.updateProfile({
                        displayName: this.user.displayName
                    })
                .then(() => this.$router.push('/'));
                }, error => this.errorMessage = error.message);
        },
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

    .signup-btn {
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
    }

    @media all and (max-width: 960px) {
        .signup-btn {
            width: 100%;
        }
    }
</style>

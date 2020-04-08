<template>
    <div class="header">
        <div class="logo-container">
            <router-link to="/">
                <div class="logo">
                    <span class="logo-part-1">Stack</span><span class="logo-part-2">Overgrow</span><span class="logo-part-3"><font-awesome-icon icon="seedling" /></span>
                </div>
            </router-link>
        </div>
        <div class="search-container">
            <input type="text" placeholder="Search..." class="search-bar" @input="search" v-model="searchTerm">
        </div>
        <div class="nav-container">
            <nav class="nav">
                <div v-if="!authUser">
                    <router-link to="/sign-in" class="auth-btn">Sign In</router-link>
                    <span class="line"> / </span>
                    <router-link to="/sign-up" class="auth-btn">Sign Up</router-link>
                </div>
                <div v-if="authUser">
                    <a @click="signOut" class="auth-btn">Sign Out</a>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
import { Auth } from '../firebase/auth';

export default {
    props: ['authUser'],
    data() {
        return {
            searchTerm: ''
        }
    },
    methods: {
        signOut() {
            Auth.signOut().then(() => this.$router.push('/'));
        },

        search() {
            this.$router.push({ path: '/search', query: { term: this.searchTerm } });
        }
    }
}
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .header {
        background: #3e474f;
        padding: 0.5rem 2rem;
        margin: 0;
        display: flex;
        justify-content: center;
    }

    .logo {
        font-size: 1.6rem;
    }

    .logo-part-1 {
        font-weight: 600;
        color: #fff;
    }

    .logo-part-2,
    .logo-part-3 {
        font-weight: 800;
        color: #5fcf80;
    }

    a:hover {
        text-decoration: none;
    }

    .search-bar {
        width: 100%;
        background-color: #f9fafa;
        border-color: #d4d9dd;
        transition: .2s;
        margin: 0;
        font-size: 1rem;
        padding: .7rem 1rem;
        outline: none;
        border: 2px solid #d4d9dd;
        border-radius: 4px;
    }

    .search-bar:hover {
        border-color: #8c9aa6;
    }

    .nav {
        text-align: right;
        margin-top: .5rem;
        display: block;
    }

    .auth-btn, .line {
        color: #fff;
        font-size: 1.2rem;
        font-weight: 700;
    }

    .auth-btn:hover {
        color: #5fcf80;
        transition: .2s;
        cursor: pointer;
    }

    .logo-container,
    .nav-container {
        flex-grow: 1;
    }

    .search-container {
        flex-grow: 2;
    }

    @media all and (min-width: 1025px) {
        .logo-container,
        .nav-container {
            flex-grow: 0;
            flex-basis: 23%;
        }
    }

    @media all and (max-width: 1024px) {
        .logo {
            font-size: 1.45rem;
            margin-top: 5px;
        }
    }

    @media all and (max-width: 860px) {
        .header {
            flex-wrap: wrap;
        }

        .logo-container {
            order: 0;
            margin-left: 5px;
            margin-bottom: 20px;
        }

        .search-container {
            order: 2;
            flex-basis: 100%;
        }

        .nav-container {
            order: 1;
            margin-right: 5px;
            margin-bottom: 20px;
        }
    }

    @media all and (max-width: 480px) {
        .logo-part-1,
        .logo-part-2 {
            display: none;
        }
    }

</style>
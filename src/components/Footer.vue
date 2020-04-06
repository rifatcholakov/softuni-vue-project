<template>
    <div class="container">
        <footer>
            <p class="copy">&copy; {{ year }} StackOvergrow. All rights reserved.</p>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            year: new Date().getFullYear()
        }
    }
}
</script>

<style scoped>
    footer {
        border-top: 1px solid #b2bac2;
    }

    .copy {
        text-align: center;
        color: #b2bac2;
        font-size: 13px;
        height: 24px;
        line-height: 24px;
        margin-top: 24px;
    }
</style>
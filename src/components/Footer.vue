<template>
    <div class="container">
        <footer class="footer">
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
        position: absolute;
        bottom: 0;
        left: 6%;
        right: 6%;
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
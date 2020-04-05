<template>
    <div class="question-container">
        <h1 class="question">A very very very very very very very very very very very very very very very very very very very very very long Question Name</h1>
        <p class="question-meta">Posted <strong>3 hours</strong> ago by <strong>bob12</strong></p>
        <p class="answers-info">
            <span class="answers-count">0</span>
            Answers
        </p>
    </div>
</template>

<style scoped>
    .question-container {
        background: #fff;
        padding: 30px 35px;
        margin-bottom: 30px;
        margin-top: 30px;
        position: relative;
        border-radius: 4px;
        box-shadow: 0 2px 0 0 rgba(0,0,0,0.1);
        width: 100%;
    }

    .answers-info,
    .questions-info {
        display: inline-block;
    }

    .question {
        color: #2d3339;
        font-weight: 500;
        font-size: 24px;
        line-height: 1.4;
        margin-right: 75px;
    }

    .question-meta {
        color: #7b8b8e;
    }

    .answers-info {
        margin: 0;
        text-align: center;
        line-height: 1.4;
        font-size: 14px;
        color: #7b8b8e;
        position: absolute;
        top: 30px;
        right: 20px;
    }

    .answers-count {
        font-size: 22px;
        font-weight: 500;
        color: #4b5658;
        display: block;
    }



</style>
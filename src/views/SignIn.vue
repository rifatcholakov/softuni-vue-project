<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-3"></div>
            <div class="col-lg-6">
                <form class="form">
                    <input type="email" class="form-field" placeholder="Email Address">
                    <input type="password" class="form-field" placeholder="Password">
                    <button class="signin-btn">Sign in</button>
                </form>
            </div>
            <div class="col-lg-3"></div>
        </div>
    </div>
</template>

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

    .signin-btn {
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
        .signin-btn {
            width: 100%;
        }
    }
</style>

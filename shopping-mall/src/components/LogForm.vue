<template>
    <div class="login-form">
        <div class="g-form">
            <div class="g-form-line">
                <span class="g-form-label">用户名：</span>
                <div class="g-form-input">
                    <input type="text" v-model='usernameModel' placeholder='请输入用户名'>
                </div>
                <span class="error">{{userErrors.errorText}}</span>
            </div>
            <div class="g-form-line">
                <span class="g-form-label">密码：</span>
                <div class="g-form-input">
                    <input type="password" v-model='passwordModel' placeholder='请输入密码'>
                </div>
                <span class="error">{{passwordErrors.errorText}}</span>
            </div>
            <div class="g-form-line">
                <div class="g-form-btn">
                    <a class="button" @click='onLogin'>登录</a>
                </div>
            </div>
            <p>{{errorText}}</p>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                usernameModel: '',
                passwordModel: '',
                errorText: ''
            }
        },
        computed: {
            userErrors() {
                let errorText, status;
                if (/@/g.test(this.usernameModel)) {
                    status = false;
                    errorText = '不包含@';
                } else {
                    status = true;
                    errorText = ''
                }
                if (!this.userFlag) { //第一次显示将错误信息显示为空
                    errorText = ''
                    this.userFlag = true
                }
                return {
                    status,
                    errorText
                }

            },
            passwordErrors() {
                let errorText, status;
                if (!/^\w{1,6}$/g.test(this.passwordModel)) {
                    status = false;
                    errorText = '密码不为1-6位'
                } else {
                    status = true;
                    errorText = ''
                }
                if (!this.passwordFlag) { //第一次显示将错误信息显示为空
                    errorText = ''
                    this.passwordFlag = true
                }
                return {
                    status,
                    errorText
                }
            }
        },
        methods: {
            onLogin() {
                if (this.userErrors.status && this.passwordErrors.status) {

                    this.$http.post('api/login')
                        .then((res) => {
                            if (res.data.username != this.usernameModel) {
                                this.errorText = '用户名不存在';
                            } else if (res.data.userId != this.passwordModel) {
                                this.errorText = '密码错误';
                            } else {
                                //this.$emit('has-log', res.data)
                                this.$store.commit('setUsername', res.data.username)
                                this.$store.commit('setDialogFalse')
                                this.errorText = '';
                            }
                        }, (error) => {
                            console.log(error)
                        })
                } else {
                    this.errorText = '信息有误';
                }
            }
        }
    }
</script>
<style scoped>
    .error {
        color: red;
        padding-left: 10px;
    }
</style>
<template>
    <div  class="dc-login">
        <el-container>
            <el-header class="dc-header">
                <label><p>请登录</p></label>
            </el-header>
            <el-main>
                <el-row type="type" justify="space-between">
                    <el-col>
                        <el-form :model="form">
                            <el-col>
                                <el-form-item label="手机号" :label-width="formLabelWidth">
                                    <el-input v-model="form.mobile" auto-complete="off"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col>
                                <el-form-item label="密码" :label-width="formLabelWidth">
                                    <el-input v-model="form.password" auto-complete="off" type="password"></el-input>
                                </el-form-item>
                            </el-col>

                        </el-form>
                    </el-col>
                    <el-col>
                        <div class="grid-content bg-purple-light">
                            <label><el-button class="dc-enter" @click="handleLogin">登录</el-button></label>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import Util from '../libs/util';
    import md5 from 'js-md5';
    export default {
        data () {
            return {
                formLabelWidth: '60px',
                form: {
                    mobile: '',
                    password: ''
                }
            }
        },
        methods: {
            handleLogin() {
                this.doLogin();
            },
            doLogin() {
                Util.http({
                    method:"post",
                    url:Util.base_path + '/posp/v1/api/login',
                    data: {
                        mobile: this.form.mobile,
                        password: md5(this.form.password),
                    },
                    transformRequest: [function (data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                }).then((res)=>{
                    console.log(res.data);
                    let respcd = res.data.respcd;
                    if(respcd !== '0000') {
                        let respmsg = res.data.respmsg;
                        let resperr = res.data.resperr;
                        let message = respmsg ? respmsg : resperr;
                        console.log('error');
                        this.$notify({
                            title: '警告',
                            message: message,
                            type: 'warning'
                        });
                    } else {
                        let detail_data = res.data.data;
                        console.log(detail_data.userid);
                        this.$store.dispatch('do_login');
                        console.log(this.$store.state.isLogin);
                        sessionStorage.setItem('user', JSON.stringify(detail_data));
                        this.$cookies.set("sessionid", "xxx", "1d", "/", "localhost");
                        this.$router.push({ path: '/table' });
                    }

                })
            }
        }
    }
</script>

<style>
    .dc-header{
        background-color: #f5f5f5;
        border-color: #ddd;
    }
    .dc-header label p{
        color: black;
        margin: 0;
        font-size: 16px;
    }
    .dc-login{
        margin:200px auto;
        width:360px; /* 必须制定宽度 */
        height:240px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .bg-purple-light {
        /*background: lightseagreen;*/
    }

    .grid-content {
        margin-left: 60px;
        border-radius: 4px;
        min-height: 36px;
    }
    .dc-enter{
        width: 260px;
        background-color: #5cb85c;
        border-color: #4cae4c;
    }

</style>
<template>
    <div>
        <el-row>
            <el-form :model="queryForm" :inline="true">
                <el-form-item label="登录名称">
                    <el-col><el-input v-model="queryForm.mobile" placeholder="请输入内容"></el-input></el-col>
                </el-form-item>
                <el-form-item>
                    <el-col><el-button @click="handleQuery()">搜索</el-button></el-col>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <el-table :data="tableData" border >
                <el-table-column v-for="item in tableHead" :prop="item.key" :label="item.name"></el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <el-col :span="6" :offset="12" class="dc-pagination">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-sizes="[10, 40, 80, 100]"
                        :page-size="page_size"
                        layout="sizes, prev, pager, next"
                        :total="total">
                </el-pagination>
            </el-col>
        </el-row>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <el-row>
                    <el-col>
                        <el-form :model="form">
                            <el-form-item label="企业名称" :label-width="formLabelWidth">
                                <el-input v-model="form.name" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="店铺名称" :label-width="formLabelWidth">
                                <el-input v-model="form.nickname" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号" :label-width="formLabelWidth">
                                <el-input v-model="form.mobile" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Util from '../libs/util'
    export default {
        data() {
            return {
                tableData: [],
                mobile: '',
                currentPage: 1,
                total: 0,
                page_size: 10,
                dialogVisible: false,
                formLabelWidth: '150px',
                form: {
                    nickname: '',
                    mobile: '',
                    name: '',
                    merchant_id: '',
                },
                queryForm: {
                    mobile: '',
                },
                tableHead: [
                    {
                        key: 'id',
                        name: '商户ID'
                    },
                    {
                        key: 'name',
                        name: '商户名称'
                    },
                    {
                        key: 'mobile',
                        name: '手机号'
                    },
                    {
                        key: 'nickname',
                        name: '昵称'
                    },
                    {
                        key: 'state_desc',
                        name: '状态描述'
                    },
                    {
                        key: 'date_joined',
                        name: '创建时间'
                    }
                ]
            }
        },
        methods: {
            handleConfirm(){
                console.log('click confirm button');
                this.dialogVisible = false;
                Util.http({
                    method:"post",
                    url:Util.base_path + '/posp/v1/api/merchant/view',
                    data:this.form,
                    transformRequest: [function (data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                }).then((res)=>{
                    console.log(res.data);
                })
            },
            handleClose(done) {
                console.log('dialog close');
                this.$confirm('确认关闭？')
                    .then(_ => {
                        console.log('confirm close');
                        done();
                    })
                    .catch(_ => {});
            },
            handleClick(row) {
                console.log('row=', row);
                this.dialogVisible = true;
                this.form.nickname = row.nickname;
                this.form.name = row.name;
                this.form.mobile = row.mobile;
                this.form.merchant_id = row.id;
            },
            handleQuery() {
                console.log(this.queryForm.mobile);
                if(this.queryForm.mobile){
                    this.getUserList(1, this.page_size, this.queryForm.mobile);
                }else{
                    this.getUserList(1, this.page_size, '');
                }
            },
            handleSizeChange(val) {
                this.page_size = val;
                //console.log(`每页 ${val} 条`);
                this.getUserList(1, this.page_size, '');
            },
            handleCurrentChange(val) {
                //console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.getUserList(val, this.page_size, this.mobile);
            },
            getUserList (page, max_num, mobile='') {
                let _this = this;
                let query_data = new Object();
                query_data.se_userid = 88769;
                query_data.page = page;
                query_data.maxnum = max_num;
                if(mobile){
                    query_data.mobile = mobile;
                }
                console.log('query_data', query_data);
                Util.ajax.get('/posp/v1/api/merchant/list', {
                    params: query_data
                })
                .then(function (response) {
                    _this.$data.total = response.data.num;
                    _this.$data.tableData = response.data.info;
                })
                .catch(function (error) {
                    console.log('error', error);
                })
            }
        },
        mounted () {
            /*
            console.log(this.$store.state.isLogin);
            if(!this.$store.state.isLogin){
                this.$notify({
                    title: '警告',
                    message: '请登录',
                    type: 'warning'
                });
                return false;
            }
            */
            this.getUserList(1, this.page_size, '');
        }
    };
</script>

<style>
    .dc-query{
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .dc-pagination{
        margin-top: 20px;
    }
    .el-table th{
        font-size: 15px;
        color: black;
    }
</style>
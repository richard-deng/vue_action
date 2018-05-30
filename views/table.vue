<template>
    <div>
        <el-row class="dc-query">
            <el-col :span="3"><el-input v-model="mobile" placeholder="请输入内容"></el-input></el-col>
            <el-col :span="2" :offset="12"><el-button @click="handleQuery()">搜索</el-button></el-col>
        </el-row>
        <el-row>
            <el-table :data="tableData">
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号">
                </el-table-column>
                <el-table-column prop="nickname" label="昵称">
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
                page_size: 10

            }
        },
        methods: {
            handleQuery() {
                console.log(this.mobile);
                if(this.mobile){
                    this.getUserList(1, this.page_size, this.mobile);
                }else{
                    this.getUserList(1, this.page_size, '');
                }
            },
            handleSizeChange(val) {
                this.page_size = val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.getUserList(val, this.page_size, this.mobile);
            },
            getUserList (page, max_num, mobile='') {
                var _this = this;
                console.log(_this);
                console.log(_this.$data.tableData);
                var query_data = new Object();
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
                    console.log('response', response.data.num);
                    _this.$data.total = response.data.num;
                    _this.$data.tableData = response.data.info;
                    console.log(_this.$data.tableData);
                })
                .catch(function (error) {
                    console.log('error', error);
                })
            }
        },
        mounted () {
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
        margin-top: 10px;
    }
</style>
<template>
    <div>
		<el-container style="border: 1px solid #eee" class="dc-container">
		  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
		    <el-menu :default-active="$route.path" router>
		    	<template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
		    		<el-submenu :index="index+''">
		    			<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
		    			<el-menu-item-group>
		    				<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">{{child.name}}</el-menu-item>
		    			</el-menu-item-group>
		    		</el-submenu>
		    	</template>
		    </el-menu>
		  </el-aside>

		  <el-container>
		    <el-header style="text-align: right; font-size: 12px">
		      <el-dropdown @command="handleCommand">
		        <i class="el-icon-setting" style="margin-right: 15px"></i>
		        <el-dropdown-menu slot="dropdown">
		          <!--
		          <el-dropdown-item>查看</el-dropdown-item>
		          <el-dropdown-item>新增</el-dropdown-item>
		          <el-dropdown-item>删除</el-dropdown-item>
		      	  -->
		      	  <el-dropdown-item command="logout">注销</el-dropdown-item>
		        </el-dropdown-menu>
		      </el-dropdown>
		      <span>DC</span>
		    </el-header>
		    
		    <el-main>
		    	<section class="content-container">
		            <transition name="fade" mode="out-in">
		                <router-view></router-view>
		            </transition>
		        </section>
		    </el-main>
		  </el-container>	  

		</el-container>
    </div>
</template>

<script>
	export default {
		methods: {
			handleCommand(command){
				console.log('do command: '+ command);
				if(command === 'logout'){
					console.log('do logout');
					sessionStorage.removeItem('user');
					this.$router.push('/login');
				}
			}
		}
	}

</script>

<style>
  .dc-container{
  	top: 0px;
  	bottom: 0px;
  	height: 100%;
  	width: 100%;
  	position: absolute;
  }

  .el-header {
    /*background-color: lightseagreen;*/
    background-color: #08BECE;
    color: #fff;
    line-height: 40px;
	height: 40px !important;
	border-radius: 3px;
  }
  
  .el-aside {
    color: #ffffff;
    top: 0px;
    bottom: 0px;
    position: relative;
  }
</style>

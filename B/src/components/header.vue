<template>
    <div>
        <el-header>
            <div class="left">
                <p class="p1"><i class="el-icon-s-unfold"></i>后台管理系统</p>
            </div>
            <div class="right">
                <el-button class="btn1" type="text">
                    <i class="icon iconfont icon-quanping" @click="toggleSreen"></i>
                </el-button>
                <span class="span1">不懂温柔</span>
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>消息</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
    </div>
</template>

<script>
import screenfull from 'screenfull'
export default {

    data() {
        return {

        };
    },

    mounted() {

    },

    methods: {
        toggleSreen(){
            screenfull.toggle()
        }
    },
};
</script>

<style lang="scss" scoped>

.el-header {
    background-color: #182b44;
    height: 100px !important;
}

.p1 {
    line-height: 60px;
    font-size: 35px;
    font-weight: 1000;
    color: #fff;
    line-height: 100px;
    padding-left: 20px;
}

i {
    padding-right: 20px;
}

.left {
    width: 300px;
    float: left;
}

.right {
    width: 220px;
    float: right;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.span1 {
    color: #fff;
    font-size: 18px;
    line-height: 100px;
}

.el-icon-caret-bottom {
    color: #fff;
    margin-top: 35px;
    font-size: 25px;
}
.btn1{
    border: none;
}

.icon-quanping {
    color: #fff;
    font-size: 30px;
}
</style>
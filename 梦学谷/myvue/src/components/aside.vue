<template>

    <el-container>
        <el-aside width="200px;">
            <el-menu :default-active="$router.path" router background-color="#2d3b51" text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="/welcome">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/member">
                    <i class="el-icon-user-solid"></i>
                    <span slot="title">会员管理</span>
                </el-menu-item>
                <el-menu-item index="/supplier">
                    <i class="el-icon-sell"></i>
                    <span slot="title">供应商管理</span>
                </el-menu-item>
                <el-menu-item index="/goods">
                    <i class="el-icon-sold-out"></i>
                    <span slot="title">商品管理</span>
                </el-menu-item>
                <el-menu-item index="/staff">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">员工管理</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view />
        </el-main>
    </el-container>

</template>

<script>
export default {

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>





.el-icon-arrow-down {
    font-size: 12px;
}

.el-container {
    height: 100vh;
}
.el-menu-item{
    font-size: 16px;
}
.el-container {
    height: 100vh;
}
li{
    height: 60px;
}

.el-aside {
    width: 250px;
    background-color: #2d3b51;

    .el-menu {
        border-right: none;
    }
}

</style>
<template>
        <el-header>
            <img src="../assets/meng.jpg" alt="" class="meng">
            <p class="p1">梦学谷会员系统</p>
            <div class="rightbox">
                <img src="../assets/tx1.jpg" alt="" class="tx">
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        北鸢倾城<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>修改密码</el-dropdown-item>
                        <el-dropdown-item command="tc">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
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
        handleCommand(command) {
            switch (command) {
                case 'tc':
                    this.$router.push('/')
                    break;
            }
        }
    },
};
</script>

<style lang="scss" scoped>

.el-dropdown-link {
    cursor: pointer;
    color: #fff;
    font-size: 14px;
    position: fixed;
    top: 15px;
    right: 30px;
}

.el-icon-arrow-down {
    font-size: 12px;
}



.el-header {
    background-color: #323b47;
    color: #333;
    line-height: 30px;
}

.p1 {
    float: left;
    color: #fff;
    font-size: 18px;
    margin-bottom: 10px;
    margin-left: 5px;
}



.meng {
    width: 50px;
    float: left;
    margin-top: 5px;
}

.rightbox {
    float: right;
    width: 130px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.tx {
    width: 43px;
    height: 43px;
    border-radius: 50%;
    margin-top: 11px;
}
</style>
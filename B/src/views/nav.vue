<template>
    <div>
        <div class="flax">
            <el-breadcrumb separator="/" class="show" v-show="show1 == false">
                <el-breadcrumb-item :to="{ path: '/' }" v-show="show2 == false">
                    <el-tag @click="go('/')">
                        表格
                    </el-tag>
                </el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/tab' }" v-show="show3 == false">
                    <el-tag @click="go('/tab')">
                        tab选项卡
                    </el-tag>
                </el-breadcrumb-item>
            </el-breadcrumb>
            <el-menu class="el-menu-demo" mode="horizontal" style="float: right;">
                <el-submenu index="2">
                    <template slot="title">标签选项</template>
                    <el-menu-item index="2-1" @click="closeAll">关闭所有</el-menu-item>
                    <el-menu-item index="2-2" @click="closeOther">关闭其他</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            show1: false,
            show2: false,
            show3: false,
            a:0,
            b:0,
            tags: [
                { name: '表格', type: '', path: '/' },
                { name: 'tab选项卡', type: '', path: '/tab' },
            ],
            path:'/',
        };
    },

    mounted() {
        
    },

    methods: {
        closeAll(){
            if (this.a == 0) {
                this.show1 = true
                this.a = 1
            } else {
                this.show1 = false
                this.a = 0
            }
        },
        closeOther(){
            if (this.b == 0) {
                this.show2 = true
                this.b = 1
            } else {
                this.show2 = false
                this.b = 0
            }
        },
        go(path) {
            this.path = path
        },
        
    },
};
</script>

<style lang="scss" scoped>


.el-menu-demo {
    margin-top: -14px;
}

.tab {
    margin-left: 20px;
}
.el-tag el-tag--light{
    cursor: pointer;
}
.flax {
    display: flex;
    flex-direction: row;
}
</style>
<template>
    <div>
        <Headers />
        <Mains />
        <el-container>
            <el-aside width="200px">
                <el-menu router unique-opened>
                    <el-menu-item :index="item.path" v-for="item in asideList" :key="item.id">{{item.title}}
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-main>
        </el-container>
    </div>
</template>

<script>

import Headers from './header.vue';
import Mains from './main.vue';
export default {
    components: {
        Headers,
        Mains
    },

    data() {
        return {
            // asidelist:[
            //     {
            //         id:'1',
            //         path:'/students',
            //         title:'学生管理',
            //         name:'学生管理'
            //     },
            //     {
            //         id: '2',
            //         path: '/teacher',
            //         title: '教师管理',
            //         name: '教师管理'
            //     },
            //     {
            //         id: '3',
            //         path: '/assistant',
            //         title: '助教管理',
            //         name: '助教管理'
            //     }
            // ]
            asidelist:[]
        };
    },

    mounted() {
        this.$axios.get('/parameter/list2').then(res=>{
            console.log(res);
            this.asidelist =res.data.data.data
        })
    },

    methods: {

    },
};
</script>

<style lang="scss" scoped>
.el-menu-item {
    text-align: center;
    border-style: hidden;
}

.el-menu {
    background-color: #fff;
}

.el-aside {
    height: 100vh;
    background-color: #fff;
    border-right: solid 1px #e6e6e6;
}
</style>
<template>
    <div>
        <Header />
        <!-- 侧边栏 -->
            <el-container>
                <el-aside width="200px">
                    <el-menu router unique-openeds>
                        <el-menu-item :index="item.path" v-for="item in asideList" :key="item.id"><i :class="item.icon"></i>{{ item.title }}
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
import Header from '../components/header.vue';
export default {
    components: {
        Header,
    },
    data() {
        return {
            asideList: []
        };
    },
    created() {
        this.$axios.get('/parameter/asideList').then(res => {
            console.log(res);
            this.asideList = res.data.data.asideList
        })
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
ul,li{
    padding: 0;
    margin: 0;
}

</style>
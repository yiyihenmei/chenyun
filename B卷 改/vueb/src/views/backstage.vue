<template>
    <div>
        后台管理
        {{$store.state.user.num}}
        你的期望薪资是：
        <ul>
            <li v-for="(item,index) in $store.state.user.arr" :key="index">{{item}}</li>
        </ul>
        <button @click="$store.commit('user/jia')">+1</button>
    </div>
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

</style>
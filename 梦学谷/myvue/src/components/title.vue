<template>
    <div>
        <el-card>
          <div class="item-title">{{title}}</div>
        </el-card>
    </div>
</template>

<script>
export default {

    data() {
        return {
            title:''
        };
    },
    created(){
        this.title=this.$route.meta.title
    }
};
</script>

<style lang="scss" scoped>
.item-title{
    border-left: 3px solid rgb(46, 191, 46);
    padding-left: 5px;
}
</style>
<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#7aabf6"
          text-color="#fff"
          active-text-color="#ffd04b" router unique-opened>
          <el-submenu index="1" v-for="item in asideList" :key="item.id">
            <template slot="title">
              <i :class="item.icon" style="color:#fff"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item-group v-for="ele in item.children" :key="ele.id">
              <el-menu-item index="ele.path">{{ele.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      icon: [],
      asideList: [],
      asidList2: []
    }
  },
  created() {
    this.getAsideList()
  },
  methods: {
    getAsideList() {
      this.$http.get('/effect/user/menubars').then((res) => {
        console.log(res)
        this.asideList = res.data.aside
      })
    }
  }
}
</script>



<style lang="scss" scoped>
.el-menu{
	height: 100vh;
}
</style>

<template>
  <div class='home'>
    <div>
      <Nav></Nav>
      <el-row :gutter="20" class="rowbox">
        <el-col :span="4">
          <el-button type="primary" @click="delMore"><i class="el-icon-delete"></i>删除选中</el-button>
        </el-col>
        <el-col :span="4">
          <el-select v-model="$store.state.user.model" placeholder="请选择城市">
            <el-option v-for="item in selectList " :label="item.label" :value="item.label" :key="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入用户名" v-model="$store.state.user.input" @input="$store.commit('user/search')">
          </el-input>
        </el-col>

      </el-row>

      <!-- 表格 -->
      <!-- <el-table :data="$store.state.user.userList"  border style="width: 100%">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="id" label="ID" align="center" width="150px">
                </el-table-column>
                <el-table-column prop="name" label="用户名" align="center">
                </el-table-column>
                <el-table-column prop="money" label="账户余额" align="center">
                </el-table-column>
                <el-table-column prop="thumb" label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.thumb" class="pictures"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="地址" align="center">
                </el-table-column>
                <el-table-column prop="state" label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag type="success">成功</el-tag>
                        <el-tag type="warning">失败</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="注册时间" align="center">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small"><i class="el-icon-edit"></i>编辑
                        </el-button>
                       
                        <el-button   type="text" size="small"><i class="el-icon-delete"></i>删除
                        </el-button>

                    </template>
                </el-table-column>
            </el-table> -->
      <table border="1" height="80px" cellspacing="0" bordercolor="#f5f5f5" align="center" width="1680px">
        <thead>
          <tr>
            <th width="120px">
              <input type="checkbox" v-model="checked" @change="$store.commit('user/checkAll',checked)">
            </th>
            <th width="120px">ID</th>
            <th width="200px">用户名</th>
            <th width="200px">账户余额</th>
            <th width="250px">头像(查看大图)
            </th>
            <th width="300px">地址</th>
            <th width="200px">状态</th>
            <th width="200px">注册时间</th>
            <th width="250px">操作</th>
          </tr>
        </thead>
        <tbody align="center">
          <tr v-for="(item,index) in $store.state.user.userList" :key="index">
            <td>
              <input type="checkbox" v-model="item.checked" @change="$store.commit('user/dx')">
            </td>
            <td>{{index+1}}</td>
            <td>{{item.name}}</td>
            <td>{{item.money}}</td>
            <td>
              <el-image :src="item.thumb" class="pictures" :preview-src-list="[item.thumb]"></el-image>
            </td>
            <td>{{item.address}}</td>
            <td>
              <el-tag type="success" v-if="item.state=='成功'">成功</el-tag>
              <el-tag type="warning" v-else>失败</el-tag>
            </td>
            <td>{{item.date}}</td>
            <td>
              <button class="but1" @click="$store.commit('user/editTwo',item)">编辑</button>

              <button class="but2" @click="$store.commit('user/del',index)">删除</button>

            </td>
          </tr>
        </tbody>

      </table>

      <!-- 编辑框 -->
      <el-dialog title="编辑" :visible.sync="$store.state.user.dialogFormVisible">
        <el-form :model="$store.state.user.editForm">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="$store.state.user.editForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="$store.state.user.editForm.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="$store.commit('user/off')">取 消</el-button>
          <el-button type="primary" @click="$store.commit('user/edit')">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"; //引入辅助函数
export default {
  name: "home",
  data() {
    return {
      checked:false,//定义全选的逻辑状态
      selectList: [], //下拉菜单数据
      formLabelWidth: "100px"
    };
  },

  mounted() {
    this.getSelection(); //挂载
    this.$store.dispatch("user/getUser");//初次渲染时触发vuex中的actions异步方法
  },
  methods: {
    ...mapMutations('user',['delMore']),//辅助函数，获取方法
    //获取地址列表
    getSelection() {
      this.$axios.get("/parameter/address").then(res => {
        console.log("地址数据");
        this.selectList = res.data.data.list;
      });
    }
  },
  //监听数据的变化
  watch: {
    //两种写法
    // '$store.state.user.userList': {
      
    // },
    userList: { //监听vuex中userList数据
      handler(newValue) {
        console.log('监听数据变化');
        //通过every方法 遍历里面每一个的选中状态 为 选中状态
        this.checked= newValue.every(item => {
          return item.checked == true;
        })
        // this.checked = (arr.length == newValue.length);

      },
      deep: true,//开启深度监听
      immediate:true,//立即执行
    }
  },
  computed: {
    ...mapState('user', ['userList']),//辅助函数 获取vuex中的userList 用于监听
  }
};
</script>

<style lang="scss" scoped >
i {
  padding-right: 10px;
}
.rowbox {
  margin-bottom: 20px;
}
.pictures {
  height: 50px;
}

.but1 {
  border: none;
  background-color: #0e5df0;
  font-size: 10px;
  color: white;
  width: 80px;
  height: 40px;
  cursor: pointer;
  margin-right: 20px;
}
.but2 {
  border: none;
  background-color: #f44336;
  font-size: 10px;
  color: white;
  width: 80px;
  height: 40px;
  cursor: pointer;
}
th{
  height: 60px;
}
td{
  height: 80px;
}
</style>

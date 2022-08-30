<template>
    <div>
        <el-header>
            <div class="big">
                <!-- logo -->
                <img src="../assets/111.jpg" alt="" class="logo">
                <el-menu unique-opened router class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="/"><i class="el-icon-user"></i>用户</el-menu-item>
                    <el-menu-item index="teaching"><i class="el-icon-reading"></i>教学</el-menu-item>
                    <el-menu-item index="Question bank"><i class="el-icon-notebook-2"></i>题库</el-menu-item>
                    <el-menu-item index="operate"><i class="el-icon-picture-outline"></i>运营</el-menu-item>
                    <el-menu-item index="Marketing"><i class="el-icon-document-copy"></i>营销</el-menu-item>
                    <el-menu-item index="commodity"><i class="el-icon-present"></i>商品</el-menu-item>
                    <el-menu-item index="Finance"><i class="el-icon-coin"></i>财务</el-menu-item>
                    <el-menu-item index="Statistics"><i class="el-icon-user"></i>统计</el-menu-item>
                    <el-menu-item index="system"><i class="el-icon-setting"></i>系统</el-menu-item>
                </el-menu>

                <!-- 头像 -->
                <div class="small">
                    <img src="../assets/微信图片_20220808204222.jpg" alt="" class="tx">
                    <!-- 下拉退出 -->
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            北鸢倾城<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>消息</el-dropdown-item>
                            <el-dropdown-item>退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </el-header>
    </div>
</template>

<script>

</script>

<style>
.el-header {
      background-image: linear-gradient(to right,#2c4ac8,#3f9cfb);
      color: rgb(255, 248, 248);
      text-align: center;
      line-height: 60px;
  }
  .el-dropdown-link {
      color: #fff;
      cursor: pointer;
      padding-left: 10px;
      position: relative;
      top: -18px;
      right: 5px;
      font-size: 15px;
  } 
  .logo {
      width: 70px;
      margin-top: 5px;
      height: 50px;
  }

  .el-menu-demo {
      height: 60px;
      background-image: linear-gradient(to right, #3751d8, #317aed);
      margin-left: -520px;
  }

  .el-menu--horizontal>.el-menu-item {
      color: rgb(191, 186, 186);
      font-size: 16px;
  }

  .tx {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      margin-top: 8px;
  }

  .big {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
  }

  .small {
      width: 150px;
  }
</style>
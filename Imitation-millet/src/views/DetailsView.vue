<template>
  <div id="details">
    <div class="title">
      <div class="w clearfix">
        <div class="fl">{{ detailslist.product_name }}</div>
        <div class="fr">
          <span>概述</span>
          <span>参数</span>
          <span>用户评价</span>
        </div>
      </div>
    </div>
    <div class="w">
      <div class="subject clearfix">
        <div class="fl">
          <el-carousel indicator-position="outside" height="564px">
            <el-carousel-item v-for="(item, i) in picturelist" :key="i">
              <img :src="`http://101.132.181.9/api/${item.product_picture}`" />
              <!-- <img :src="'http://101.132.181.9:3000/' + item.product_picture" /> -->
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="fr">
          <h2>{{ detailslist.product_name }}</h2>
          <p class="parameter">{{ detailslist.product_intro }}</p>
          <p class="label">小米自营</p>
          <p class="price">{{ detailslist.product_price }}元</p>
          <div class="box">
            <p class="box_price">
              <span class="fl">{{ detailslist.product_name }}</span
              ><span class="fr"
                >{{ detailslist.product_selling_price }}元
                <s>{{ detailslist.product_price }}</s
                >元
              </span>
            </p>
            <p class="total">总计：{{ detailslist.product_price }}元</p>
          </div>
          <div class="box_btn">
            <button class="btn_l" @click="pluscart">加入购物车</button>
            <button class="btn_r" @click="pluslike">喜欢</button>
          </div>
          <p class="icon">
            <span
              ><el-icon><CircleCheck /></el-icon> 小米自营</span
            >
            <span
              ><el-icon><CircleCheck /></el-icon> 小米发货</span
            >
            <span
              ><el-icon><CircleCheck /></el-icon> 7天无理由退货</span
            >
            <span
              ><el-icon><CircleCheck /></el-icon> 7天价格保护</span
            >
          </p>
        </div>
      </div>
    </div>

    <!-- 登录弹出框 -->
    <el-dialog
      v-model="dialogVisible"
      title="登录"
      width="25%"
      :before-close="handleClose"
    >
      <span>
        <p class="ipt">
          <span>
            <el-input
              size="large"
              v-model="username"
              class="w-50 m-2"
              placeholder="请填写用户名"
              :prefix-icon="UserFilled"
            />
          </span>
        </p>
        <p class="ipt">
          <span>
            <el-input
              size="large"
              type="password"
              v-model="password"
              class="w-50 m-2"
              placeholder="请填写密码"
              :prefix-icon="View"
            />
          </span>
        </p>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="gologin">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { goLogin, getRegister } from "@/api/Interface/home.js";
import { getShoppingCart } from "@/api/Interface/about.js";
import {
  getDetails,
  getDetailsPicture,
  addShoppingCart,
  addCollect,
} from "@/api/Interface/details.js";
import { ref, reactive, toRefs, mounted, onMounted } from "vue";
import { ElMessageBox, ElMessage, ElNotification } from "element-plus";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();
let detailslist = ref({});
let picturelist = ref([]);
// 登录
const dialogVisible = ref(false);
const username = ref("");
const password = ref("");

onMounted(async () => {
  let Details = await getDetails(route.query.Id);
  detailslist.value = Details.Product[0];
  let DetailsPicture = await getDetailsPicture(route.query.Id);
  picturelist.value = DetailsPicture.ProductPicture;
  console.log(picturelist);
});

// 加入购物车
const pluscart = async () => {
  if (localStorage.getItem("user")) {
    let userid = JSON.parse(localStorage.getItem("user")).user_id;
    let data = await addShoppingCart(userid, detailslist.value.product_id);
    if (data.code == "001") {
      ElNotification({
        title: "成功",
        message: data.msg,
        type: "success",
      });
    } else {
      ElNotification({
        title: "提醒",
        message: data.msg,
        type: "info",
      });
    }
    let { shoppingCartData } = await getShoppingCart(userid);
    store.commit("vuxnum", shoppingCartData);
    console.log("1111");
  } else {
    dialogVisible.value = true;
  }
};
const pluslike = async () => {
  if (localStorage.getItem("user")) {
    let userid = JSON.parse(localStorage.getItem("user")).user_id;
    let data = await addCollect(userid, detailslist.value.product_id);
    if (data.code == "001") {
      ElNotification({
        title: "成功",
        message: data.msg,
        type: "success",
      });
    } else {
      ElNotification({
        title: "提醒",
        message: data.msg,
        type: "info",
      });
    }
  } else {
    dialogVisible.value = true;
  }
};
// 登录
const login = () => {
  dialogVisible.value = true;
};
const gologin = async () => {
  let data = await goLogin(username.value, password.value);
  if (data.code == "001") {
    ElMessage({
      message: "登录成功",
      type: "success",
    });
    localStorage.setItem("user", JSON.stringify(data.user));
  } else {
    ElMessage({
      message: data.msg,
      type: "error",
    });
  }
  dialogVisible.value = false;
};
</script>
<style lang="scss" scoped>
#details {
  .title {
    box-shadow: 0 5px 5px rgb(0, 0, 0, 7%);
    margin-bottom: 20px;
    .w {
      line-height: 64px;
      .fl {
        font-size: 18px;
        font-weight: 400;
        color: #212121;
      }
      .fr {
        font-size: 14px;
        color: #616161;
        span {
          margin: 0 10px;
        }
      }
    }
  }
  .w {
    .subject {
      .fl {
        width: 44%;
        img {
          width: 100%;
        }
      }
      .fr {
        width: 56%;
        box-sizing: border-box;
        text-align: left;
        padding: 20px;
        h2 {
          font-size: 24px;
          margin: 10px 0;
          font-weight: 400;
        }
        .parameter {
          color: #ccc;
        }
        .label {
          color: #ed712e;
          margin: 10px 0;
          font-size: 18px;
        }
        .price {
          padding: 20px 0;
          color: #ed712e;
          font-size: 20px;
          border-bottom: 1px solid #ccc;
        }
        .box {
          background-color: #f9f9fa;
          width: 100%;
          height: 160px;
          margin: 40px 0;
          .box_price {
            padding: 30px;
          }
          .total {
            padding: 30px;
            color: #ed712e;
            font-size: 28px;
          }
        }
        .box_btn {
          .btn_l {
            width: 330px;
            height: 60px;
            background-color: #ed712e;
            color: white;
            border: 0px;
            border-radius: 4px;
            font-size: 18px;
            margin-right: 56px;
          }
          .btn_r {
            width: 260px;
            height: 60px;
            border: 0px;
            border-radius: 4px;
            background-color: #b0b0b0;
            color: white;
            font-size: 18px;
          }
        }
        .icon {
          line-height: 56px;
          color: rgb(176, 176, 176);
          span {
            padding-left: 18px;
            margin-right: 20px;
            position: relative;
            .el-icon {
              position: absolute;
              top: 50%;
              left: 0;
              transform: translate(0, -40%);
            }
          }
        }
      }
    }
  }
  .ipt {
    // text-align: center;
    margin-bottom: 20px;
    padding: 0 auto;
    span {
      margin: 0 auto;
    }
  }
}
</style>
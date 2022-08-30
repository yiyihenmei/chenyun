<template>
  <div id="myorder">
    <header>
      <div class="w">
        <h1>
          <el-icon><ShoppingCart /></el-icon>
          购物车<span
            >温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span
          >
        </h1>
      </div>
    </header>
    <section>
      <div class="w empty clearfix" v-if="flag">
        <div class="fl">
          <img src="http://101.132.181.9/img/cart-empty.8b316431.png" />
        </div>
        <div class="fr">
          <p class="top">您的购物车还是空的！</p>
          <p class="bottom">快去购物吧！</p>
        </div>
      </div>
      <div class="w content" v-if="!flag">
        <table>
          <thead>
            <tr>
              <th class="subtotal">
                <input type="checkbox" v-model="check" @change="selectall" />
                全选
              </th>
              <th class="img"></th>
              <th class="name">商品名称</th>
              <th class="price">单价</th>
              <th class="num">数量</th>
              <th class="subtotal">小计</th>
              <th class="subtotal">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cartlist" :key="index">
              <td>
                <input type="checkbox" v-model="item.check" />
              </td>
              <td>
                <img
                  :src="'http://101.132.181.9:3000/' + item.productImg"
                  alt=""
                />
              </td>
              <td class="name">{{ item.productName }}</td>
              <td>{{ item.price }}</td>
              <td>
                <el-input-number
                  v-model="item.num"
                  :min="1"
                  :max="10"
                  @change="handleChange(item.productID, item.num)"
                />
              </td>
              <td>{{ item.num * item.price }}</td>
              <td>
                <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  @confirm="delcart(item.productID)"
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  title="是否要删除该商品?"
                >
                  <template #reference>
                    <el-icon><CircleCloseFilled /></el-icon>
                  </template>
                </el-popconfirm>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="cart-bar">
          <div class="cart-bar-left fl">
            <span> <a>继续购物</a></span>
            <span class="sep">|</span>
            <span class="cart-total">
              共<span class="cart-total-num">4</span> 件商品，已选
              <span class="cart-total-num">{{num}}</span>件
            </span>
          </div>
          <div class="cart-bar-right fr">
            <span>
              <span class="total-price-title">合计:</span
              ><span class="total-price">{{total}}元</span></span
            >
            <a>
              <div class="btn-primary disabled" v-show="flage">去结算</div>
              <div class="btn-primary" v-show="!flage" @click="gosettlement">
                去结算
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import {
  getShoppingCart,
  updateShoppingCart,
  delShoppingCart,
} from "@/api/Interface/about.js";
import {
  ref,
  reactive,
  toRefs,
  mounted,
  onMounted,
  computed,
  watch,
} from "vue";
import { ElNotification } from "element-plus";
import { InfoFilled } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();

let flag = ref(true);
let flage = ref(true);
let check = ref(false);
let cartlist = ref([]);

let num = ref(0);
let total = ref(0);

onMounted(async () => {
  getshoppingcart();
});
// 请求数据
const getshoppingcart = async () => {
  let userid = JSON.parse(localStorage.getItem("user")).user_id;
  let { shoppingCartData } = await getShoppingCart(userid);
  cartlist.value = shoppingCartData;
  if (shoppingCartData) {
    if (shoppingCartData.length != 0) {
      flag.value = false;
    }
  }
  store.commit("vuxnum", shoppingCartData);
  // console.log(shoppingCartData);
  console.log(cartlist.value);
};
// 加减
const handleChange = async (pid, num) => {
  let userid = JSON.parse(localStorage.getItem("user")).user_id;
  let data = await updateShoppingCart(userid, pid, num);
  if (data.code == "001") {
    ElNotification({
      title: "Success",
      message: data.msg,
      type: "success",
    });
    getshoppingcart()
  } else {
    ElNotification({
      title: "Error",
      message: data.msg,
      type: "success",
    });
  }
  console.log(data);
};
// 删除
const delcart = async (pid) => {
  let userid = JSON.parse(localStorage.getItem("user")).user_id;
  let data = await delShoppingCart(userid, pid);
  if (data.code == "001") {
    ElNotification({
      title: "成功",
      message: data.msg,
      type: "success",
    });
    getshoppingcart();
  } else {
    ElNotification({
      title: "错误",
      message: data.msg,
      type: "success",
    });
  }
  console.log(data);
};
const selectall = () => {
  cartlist.value.forEach((ele) => {
    ele.check = check.value;
  });
};
// 结算
const gosettlement = () => {
  let arr = [];
  cartlist.value.forEach((ele) => {
    if (ele.check) {
      arr.push(ele);
    }
  });
  store.commit("vuxadd", arr);
  router.push("/confirmOrder");
};
watch(
  () => cartlist.value,
  (val) => {
    var s = 0;
    val.forEach((ele) => {
      if (ele.check) {
        s++;
      }
    });
    if (s > 0) {
      flage.value = false;
    } else {
      flage.value = true;
    }
    if (s == val.length) {
      check.value = true;
    } else {
      check.value = false;
    }
  },
  {
    deep: true,
  }
);
</script>
<style lang="scss" scoped>
#myorder {
  margin-top: 20px;
  header {
    border-bottom: 2px solid #ff6700;
    .w {
      h1 {
        text-align: left;
        font-size: 28px;
        line-height: 64px;
        font-weight: 400;
        color: #424242;
        padding-left: 50px;
        position: relative;
        .el-icon {
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translate(0, -50%);
          color: #ff6700;
        }
        span {
          color: #757575;
          font-size: 12px;
          // float: left;
          height: 20px;
          line-height: 20px;
          margin-top: 30px;
          margin-left: 15px;
        }
      }
    }
  }
  section {
    background-color: #f7f7f7;
    .empty {
      .fl {
        text-align: right;
        width: 42%;
        height: 500px;
        // background-color: #0cf;
        img {
          margin-top: 65px;
          width: 359px;
          // height: 360px;
        }
      }
      .fr {
        width: 58%;
        height: 500px;
        text-align: left;
        // background-color: #0cf;
        .top {
          font-weight: 900;
          margin: 120px 0 15px 60px;
          font-size: 36px;
          color: #b0b0b0;
        }
        .bottom {
          margin: 0 0 20px 60px;
          font-size: 20px;
          color: #b0b0b0;
        }
      }
    }
    .content {
      padding: 20px 0;
      table {
        width: 100%;
        background-color: #fff;
        thead {
          tr {
            font-weight: 400;
            height: 85px;
            th {
              border-bottom: 1px solid #e0e0e0;
            }
            .img {
              width: 200px;
            }
            .name {
              width: 380px;
              text-align: left;
            }
            .price {
              width: 178px;
            }
            .num {
              width: 190px;
            }
          }
        }
        tbody {
          tr {
            height: 125px;
            td {
              border-bottom: 1px solid #e0e0e0;
            }
            img {
              width: 80px;
              height: 80px;
            }
            .name {
              text-align: left;
            }
          }
          tr:last-child {
            td {
              border-bottom: 1px solid transparent;
            }
          }
        }
      }
      .cart-bar {
        margin: 20px 0 0 0;
        width: 1225px;
        height: 50px;
        line-height: 50px;
        background-color: #fff;
        .cart-bar-left {
          span {
            a {
              line-height: 50px;
              margin-left: 32px;
              color: #757575;
            }
          }
          .sep {
            color: #eee;
            margin: 0 20px;
          }
          .cart-total {
            color: #757575;
            .cart-total-num {
              color: #ff6700;
            }
          }
        }
        .cart-bar-right {
          .total-price {
            color: #ff6700;
            font-size: 30px;
          }
          .total-price-title {
            color: #ff6700;
            font-size: 14px;
          }
          .btn-primary {
            float: right;
            width: 200px;
            text-align: center;
            font-size: 18px;
            margin-left: 50px;
            background: #ff6700;
            color: #ffffff;
          }
          .disabled {
            background: #e0e0e0;
            color: #b0b0b0;
          }
        }
      }
    }
  }
}
</style>
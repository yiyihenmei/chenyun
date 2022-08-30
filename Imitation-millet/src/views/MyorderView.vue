<template>
  <div id="myorder">
    <header>
      <div class="w">
        <h1>
          <el-icon><List /></el-icon>
          我的订单
        </h1>
      </div>
    </header>
    <section>
      <div class="w empty clearfix" v-if="flag">
        <div class="fl">
          <img src="http://101.132.181.9/img/cart-empty.8b316431.png" />
        </div>
        <div class="fr">
          <p class="top">您的订单还是空的！</p>
          <p class="bottom">快去购物吧！</p>
        </div>
      </div>
      <div class="w content" v-if="!flag">
        <ul class="list">
          <li v-for="(ele, i) in orderlist" :key="i">
            <p class="top clearfix">
              <span class="fl">订单编号：{{ ele[0].order_id }}</span>
              <span class="fr">订单时间：{{ ele[0].order_time }}</span>
            </p>
            <table>
              <thead>
                <tr>
                  <th class="img"></th>
                  <th class="name">商品名称</th>
                  <th class="price">单价</th>
                  <th class="num">数量</th>
                  <th class="subtotal">小计</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in ele" :key="index">
                  <td>
                    <img
                      :src="'http://101.132.181.9:3000/' + item.product_picture"
                      alt=""
                    />
                  </td>
                  <td class="name">{{ item.product_name }}</td>
                  <td>{{ item.product_price }}</td>
                  <td>{{ item.product_num }}</td>
                  <td>{{ item.product_num * item.product_price }}</td>
                </tr>
              </tbody>
            </table>
            <p class="bottom clearfix">
              <span class="fl"
                >共 <span>{{ sum(ele) }}</span> 件商品</span
              >
              <span class="fr"
                >合计：<span> {{ total(ele) }}元</span></span
              >
            </p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script setup>
import { getMyorder } from "@/api/Interface/about.js";
import { ref, reactive, toRefs, mounted, onMounted, computed } from "vue";

let flag = ref(true);
let orderlist = ref([]);

onMounted(async () => {
  let userid = JSON.parse(localStorage.getItem("user")).user_id;
  let { orders } = await getMyorder(userid);
  orderlist.value = orders;
  if (orderlist.length != 0) {
    flag.value = false;
  }
  console.log(orderlist.value);
});
const getmyorder = () => {};
const sum = computed(() => (data) => {
  var s = 0;
  data.forEach((ele) => {
    s += ele.product_num;
  });
  return s;
});
const total = computed(() => (data) => {
  var s = 0;
  data.forEach((ele) => {
    s += ele.product_num * ele.product_price;
  });
  return s;
});
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
      .list {
        padding: 20px 0;
        li {
          margin-bottom: 20px;
          background-color: #fff;
          .top {
            padding: 0 20px;
            line-height: 60px;
            .fl {
              color: #ff6700;
            }
          }
          table {
            width: 100%;
            border-top: 1px solid #ff6700;
            border-bottom: 1px solid #ff6700;
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
          .bottom {
            padding: 0 20px;
            line-height: 60px;
            .fl {
              color: #757575;
              span {
                color: #ff6700;
              }
            }
            .fr {
              font-size: 12px;
              color: #ff6700;
              span {
                font-size: 30px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
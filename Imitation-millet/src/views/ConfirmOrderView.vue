<template>
  <div id="confirm">
    <header>
      <div class="w">
        <h1>
          <el-icon><Document /></el-icon>
          确认订单
        </h1>
      </div>
    </header>

    <div class="confirm_sec">
      <div class="confirm_sec_w">
        <p class="shdz">收货地址</p>
        <ul class="confirm_sec_ul">
          <li class="confirm_sec_li1 confirm_sec_li2">
            <p class="confirm_sec_p1">陈同学</p>
            <p class="confirm_sec_p2">13580018623</p>
            <p class="confirm_sec_p3">广东 广州市 白云区 江高镇</p>
            <p class="confirm_sec_p4">广东白云学院</p>
          </li>
          <li class="confirm_sec_li1">
            <p class="confirm_sec_p1">陈同学</p>
            <p class="confirm_sec_p2">13580018623</p>
            <p class="confirm_sec_p3">广东 茂名市 化州市 杨梅镇</p>
            <p class="confirm_sec_p4">***</p>
          </li>
          <li class="confirm_sec_li1">
            <el-icon style="width: 40px; height: 40px" class="icon3"
              ><CirclePlus style="width: 40px; height: 40px"
            /></el-icon>
            <p class="confirm_sec_p5">添加新地址</p>
          </li>
        </ul>
        <p class="confirm_sec_p6">商品及优惠券</p>
        <ul class="shopp_ul">
          <li class="shopp_li11" v-for="(item, index) in res" :key="index">
            <img
              :src="'http://101.132.181.9:3000/' + item.productImg"
              alt=""
              class="shopp_img6"
            />
            <span class="shopp_title21">{{ item.productName }}</span>
            <span class="shopp_title31"
              >{{ item.price }}元 x {{ item.num }}</span
            >
            <span class="shopp_title41">{{ item.num * item.price }}元</span>
          </li>
        </ul>
        <p class="confirm_sec_p7">
          配送方式 <span class="confirm_sp1">包邮</span>
        </p>
        <p class="confirm_sec_p7">
          发票 <span class="confirm_sp2">电子发票</span
          ><span class="confirm_sp3">个人</span
          ><span class="confirm_sp4">商品明细</span>
        </p>
        <div class="confrim_box">
          <div class="confrim_box2">
            <p class="clearfix box2">
              <span class="fl box2_p1_sp1">商品件数:</span
              ><span class="fr box2_p1_sp2">1件</span>
            </p>
            <p class="clearfix box2">
              <span class="fl box2_p1_sp1">商品总价:</span
              ><span class="fr box2_p1_sp2">0元</span>
            </p>
            <p class="clearfix box2">
              <span class="fl box2_p1_sp1">活动优惠:</span
              ><span class="fr box2_p1_sp2">-0元</span>
            </p>
            <p class="clearfix box2">
              <span class="fl box2_p1_sp1">优惠券抵扣:</span
              ><span class="fr box2_p1_sp2">0元</span>
            </p>
            <p class="clearfix box2">
              <span class="fl box2_p1_sp1">运费:</span
              ><span class="fr box2_p1_sp2">0元</span>
            </p>
            <p class="clearfix box2">
              <span class="fl box2_p1_sp1">应付总额:</span
              ><span class="fr box2_p1_sp2">元</span
              ><span class="fr box2_p1_sp3">{{ zj }}</span>
            </p>
          </div>
        </div>
        <p class="confirm_sec_p8">
          <button
            class="confim_btn confim_btn1"
            @click="router.push('/shoppingCart')"
          >
            返回购物车
          </button>
          <button class="confim_btn confim_btn2" @click="gosubmit()">
            结算
          </button>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { addMyorder, getShoppingCart } from "@/api/Interface/about.js";
import { List, CirclePlus } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
const store = useStore();
const router = useRouter();

let res = ref([]);
onMounted(() => {
  res.value = store.state.orderlist;
  console.log(res.value);
});

const gosubmit = async () => {
  let userid = JSON.parse(localStorage.getItem("user")).user_id;
  let data = await addMyorder(userid, res.value);
  store.commit("vuxdel");
  let { shoppingCartData } = await getShoppingCart(userid);
  store.commit("vuxnum", shoppingCartData);
  console.log(data);
  if (data.code == "001") {
    ElNotification({
      title: "Success",
      message: data.msg,
      type: "success",
    });
    router.push('/myorder')
  } else {
    ElNotification({
      title: "Error",
      message: data.msg,
      type: "success",
    });
  }
};
</script>
<style lang="scss" scoped>
#confirm {
  text-align: left;
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
  .About_top {
    width: 100%;
    height: 80px;
    border-bottom: 3px solid #ed712e;
    .About_top_w {
      width: 1200px;
      margin: 0 auto;
      height: 100%;
    }
  }
  .About_top_h1 {
    margin-left: -440px;
    margin-top: 20px;
    display: inline-block;
    font-weight: 400;
  }
  .wen1 {
    margin-left: -34px;
    margin-right: 10px;
    margin-top: 6px;
    color: #ed712e;
  }
  .confirm_sec {
    width: 100%;
    background-color: #f5f5f5;
    padding: 20px;
  }
  .confirm_sec_w {
    width: 1200px;
    margin: auto;
    height: 100%;
    padding: 0 50px;
    background-color: #fff;
  }
  .shdz {
    padding: 60px 0 20px 0px;
    font-size: 18px;
  }
  .confirm_sec_ul {
    width: 80%;
    height: 200px;
    margin-left: -10px;
    display: flex;
    flex-direction: row;
  }
  .confirm_sec_li1 {
    width: 30%;
    height: 200px;
    margin: 0 10px;
    border: 1px solid #b0b0b0;
  }
  .confirm_sec_p1 {
    margin: 22px 0 0 22px;
    font-size: 18px;
  }
  .confirm_sec_p2 {
    margin: 12px 0 12px 22px;
    color: #b0b0b0;
  }
  .confirm_sec_p3 {
    margin: 0 0 0 22px;
    color: #b0b0b0;
  }
  .confirm_sec_p4 {
    margin: 0 0 0 22px;
    color: #b0b0b0;
  }
  .icon3 {
    margin: 50px 0 0 122px;
  }
  .confirm_sec_p5 {
    margin: 6px 0 0 102px;
  }
  .confirm_sec_li2 {
    border: 1px solid #ed712e;
  }
  .confirm_sec_p6 {
    font-size: 20px;
    margin: 22px 0 0 0px;
  }
  .confirm_sec_p7 {
    font-size: 20px;
    padding: 30px 0 30px 0px;
    border-bottom: 1px solid #b0b0b0;
  }
  .shopp_ul {
    width: 1129px;
    border-top: 1px solid #b0b0b0;
    border-bottom: 1px solid #b0b0b0;
    margin-top: 10px;
  }
  .shopp_li11 {
    padding: 20px 0;
  }
  .shopp_title21 {
    margin-left: 6px;
    width: 200px;
    display: inline-block;
  }
  .shopp_title31 {
    margin-left: 450px;
    width: 130px;
    display: inline-block;
  }
  .shopp_title41 {
    margin-left: 130px;
    width: 130px;
    display: inline-block;
    color: #ed712e;
  }
  .shopp_img6 {
    width: 30px;
  }
  .confirm_sp1 {
    color: #ed712e;
    font-size: 14px;
    margin: 0 0 0 70px;
  }
  .confirm_sp2 {
    color: #ed712e;
    font-size: 14px;
    margin: 0 0 0 108px;
  }
  .confirm_sp3 {
    color: #ed712e;
    font-size: 14px;
    margin: 0 0 0 20px;
  }
  .confirm_sp4 {
    color: #ed712e;
    font-size: 14px;
    margin: 0 0 0 20px;
  }
  .confrim_box {
    height: 265px;
    width: 100%;
    border-bottom: 1px solid #b0b0b0;
  }
  .confrim_box2 {
    width: 200px;
    height: 246px;
    /* background-color: blue; */
    margin: 20px 0 0 900px;
  }
  .box2 {
    padding: 10px 0;
    .box2_p1_sp2 {
      color: #ed712e;
    }

    .box2_p1_sp3 {
      color: #ed712e;
      font-size: 30px;
      margin-top: -12px;
      display: inline-block;
    }
  }

  .confim_btn {
    width: 160px;
    height: 40px;
  }
  .confim_btn1 {
    background-color: #fff;
    border: 1px solid #b0b0b0;
    color: #b0b0b0;
    margin-left: 692px;
  }
  .confim_btn2 {
    background-color: #ed712e;
    color: white;
    border: 0px;
    margin-left: 70px;
  }
  .confirm_sec_p8 {
    font-size: 20px;
    padding: 30px 0 30px 0px;
  }
}
</style>
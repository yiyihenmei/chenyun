<template>
  <div id="collection">
    <header>
      <div class="w">
        <h1>
          <el-icon><CollectionTag /></el-icon>
          我的收藏
        </h1>
      </div>
    </header>
    <section>
      <div class="w empty clearfix" v-if="flag">
        <div class="fl">
          <img src="http://101.132.181.9/img/cart-empty.8b316431.png" />
        </div>
        <div class="fr">
          <p class="top">您的收藏还是空的！</p>
          <p class="bottom">快去购物吧！</p>
        </div>
      </div>

      <div class="w content" v-if="!flag">
        <ul class="list">
          <li v-for="(ele, i) in collectionslist" :key="i">
            <el-icon class="del" @click="deletelist(ele.product_id)"
              ><Close
            /></el-icon>
            <a :href="'#/goods/details?Id=' + ele.product_id">
              <img
                :src="'http://101.132.181.9:3000/' + ele.product_picture"
                alt=""
              />
              <p class="name">{{ ele.product_name }}</p>
              <p class="introduce">{{ ele.product_title }}</p>
              <p class="price">
                {{ ele.product_selling_price }}元
                <s>{{ ele.product_price }}元</s>
              </p>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script setup>
import { getCollections, deleteCollect } from "@/api/Interface/about.js";
import { ref, reactive, toRefs, mounted, onMounted, computed } from "vue";

const collectionslist = ref([]);
const flag = ref(true);

onMounted(async () => {
  getcollections();
});

const getcollections = async () => {
  let userid = JSON.parse(localStorage.getItem("user")).user_id;
  let { collectList } = await getCollections(userid);
  collectionslist.value = collectList;
  if (collectList) {
    if (collectList.length != 0) {
      flag.value = false;
    }
  }
  console.log(collectionslist.value);
};
// 删除
const deletelist = async (pid) => {
  let userid = JSON.parse(localStorage.getItem("user")).user_id;
  console.log(userid, pid);
  let del = await deleteCollect(userid, pid);
  if (del.code == "001") {
    getcollections();
  }
  console.log(abc);
};
</script>
<style lang="scss" scoped>
#collection {
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
        img {
          margin-top: 65px;
          width: 359px;
        }
      }
      .fr {
        width: 58%;
        height: 500px;
        text-align: left;
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
      .list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        position: relative;
        li {
          .del {
            position: absolute;
            top: 20px;
            right: 20px;
          }
          width: 19%;
          height: 288px;
          text-align: center;
          background-color: #fff;
          margin-right: 12px;
          margin-bottom: 12px;
          img {
            width: 160px;
            height: 160px;
          }
          .name {
            font-weight: 400;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            margin: 25px 10px 0;
            font-size: 14px;
            color: #333;
          }
          .introduce {
            margin: 5px 10px;
            height: 18px;
            font-size: 12px;
            color: #b0b0b0;
          }
          .price {
            color: #ff6700;
            s {
              margin-left: 0.5em;
              color: #b0b0b0;
              text-decoration: line-through;
            }
          }
        }
        li:hover {
          transition: all 0.4s;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgb(185, 185, 185);
        }
      }
    }
  }
}
</style>
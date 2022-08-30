<template>
  <div>
    <section id="commodity">
      <nav>
        <div class="w">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/goods' }"
              >全部商品</el-breadcrumb-item
            >
            <el-breadcrumb-item>分类</el-breadcrumb-item>
            <el-breadcrumb-item></el-breadcrumb-item>
          </el-breadcrumb>
          <ul class="category">
            <li class="title">分类</li>
            <li @click="getwhole()" :class="flag == 0 ? 'select' : ''">全部</li>
            <li
              v-for="(ele, i) in categorylist"
              :class="flag == i + 1 ? 'select' : ''"
              :key="i"
              @click="clicktabs(i + 1, ele.category_name)"
            >
              {{ ele.category_name }}
            </li>
          </ul>
        </div>
      </nav>
      <div class="commodity_list">
        <div class="w">
          <ul class="list">
            <li v-for="(ele, i) in wholelist" :key="i">
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

          <div class="box">
            <el-pagination
              class="pagination"
              background
              layout="prev, pager, next"
              v-model:currentPage="currentPage"
              v-model:page-size="pageSize"
              @current-change="handleCurrentChange"
              :total="total"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ArrowRight } from "@element-plus/icons-vue";
import {
  getCategory,
  getWhole,
  getSwitch,
  getSearch,
} from "@/api/Interface/goods.js";
import { ref, reactive, toRefs, onMounted, onBeforeUpdate } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
let categorylist = ref([]);
let flag = ref(0);
let wholelist = ref([]);
let currentPage = ref(1);
let pageSize = ref(15);
let total = ref(0);

let search = ref("");
onBeforeUpdate(async () => {
  if (route.query.search && route.query.search !== search.value) {
    flag.value = -1;
    let obj = {
      search: route.query.search,
      currentPage: currentPage.value,
      pageSize: pageSize.value,
    };
    let searchlist = await getSearch(obj);
    wholelist.value = searchlist.Product;
    search.value = route.query.search;
  }
});
onMounted(async () => {
  let { category } = await getCategory();
  categorylist.value = category;
  if (route.query.category_id) {
    flag.value = route.query.category_id;
    tabsSwitch(
      route.query.category_id,
      category[route.query.category_id-1].category_name
    );
  } else {
    getwhole();
  }
});

// 事件
const getwhole = async () => {
  flag.value = 0;
  let Whole = await getWhole(currentPage.value, pageSize.value);
  wholelist.value = Whole.Product;
  total.value = Whole.total;
  console.log(Whole);
};
const handleCurrentChange = (val) => {
  currentPage.value = val;
  getwhole();
};

// 点击切换
const clicktabs = (i, name) => {
  tabsSwitch(i, name);
  router.push("/goods?category_id=" + i);
};

// tabs切换
const tabsSwitch = async (i, name) => {
  console.log(i);
  flag.value = i;
  let { Product } = await getSwitch(name);
  wholelist.value = Product;
  total.value = Product.length;
};
</script>
<style lang="scss" scoped>
#commodity {
  nav {
    .w {
      height: 103px;
      border-bottom: 1px solid #e4e7ed;
      .el-breadcrumb {
        line-height: 62px !important;
        font-size: 16px !important;
      }
      .category {
        width: 100%;
        display: flex;
        .title {
          font-weight: 900;
          color: #000;
          border: 1px solid transparent;
        }
        li {
          padding: 0 20px;
          line-height: 40px;
          font-size: 14px;
          font-weight: 500;
          color: #303133;
          border: 1px solid #e4e7ed;
        }
        .select {
          border-bottom: 1px solid #fff;
        }
      }
    }
  }
  .commodity_list {
    background-color: #f5f5f5;
    .w {
      padding-top: 16px;
      .list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        li {
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
          transform: translateY(-4px);
          box-shadow: 0 3px 20px #aaa;
        }
      }
      .box {
        width: 100%;
        padding: 0 auto;
        .pagination {
          margin: 20px auto;
          width: 230px;
        }
      }
    }
  }
}
</style>
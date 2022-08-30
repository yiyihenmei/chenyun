<template>
  <div class="home">
    <section id="homePage">
      <div class="w">
        <div class="banner">
          <el-carousel height="460px">
            <el-carousel-item v-for="item in 4" :key="item">
              <img
                :src="
                  'http://101.132.181.9:3000/public/imgs/cms_' + item + '.jpg'
                "
              />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="section">
        <div class="w">
          <p class="title">手机</p>
          <div class="list">
            <div class="left">
              <img
                src="http://101.132.181.9:3000/public/imgs/phone/phone.png"
              />
            </div>
            <ul class="right">
              <li v-for="(ele, i) in mobilelist" :key="i">
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
              <li class="browse">
                <span
                  class="browse-span"
                  @click="gogoods(mobilelist[0].category_id)"
                >
                  浏览更多
                  <el-icon><DArrowRight /></el-icon>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div class="w">
          <p class="title">
            家电
            <span :class="['fr','Hot', flag == '电视机' ? 'xuanz' : '']" @mouseover="overswitch1('电视机')"
              >电视影音</span
            >
            <span :class="['fr', flag == '热门' ? 'xuanz' : '']" @mouseover="gettelevision('热门')">热门</span>
          </p>
          <div class="list">
            <div class="left">
              <div class="li">
                <img
                  src="http://101.132.181.9:3000/public/imgs/appliance/appliance-promo1.png"
                />
              </div>
              <div class="li">
                <img
                  src="http://101.132.181.9:3000/public/imgs/appliance/appliance-promo2.png"
                />
              </div>
            </div>
            <ul class="right">
              <li v-for="(ele, i) in televisionlist" :key="i">
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
              <li class="browse">
                <span
                  class="browse-span"
                  @click="gogoods(televisionlist[0].category_id)"
                >
                  浏览更多
                  <el-icon><DArrowRight /></el-icon>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div class="w">
          <p class="title">
            配件
            <span
              :class="['fr', 'Hot', flag1 == '充电器' ? 'xuanz' : '']"
              @mouseover="overswitch2('充电器')"
              >充电器</span
            >
            <span
              :class="['fr', 'Hot', flag1 == '保护套' ? 'xuanz' : '']"
              @mouseover="overswitch2('保护套')"
              >保护套</span
            >
            <span
              :class="['fr', flag1 == '热门' ? 'xuanz' : '']"
              @mouseover="getparts('热门')"
              >热门</span
            >
          </p>
          <div class="list">
            <div class="left">
              <div class="li">
                <img
                  src="http://101.132.181.9:3000/public/imgs/accessory/accessory-promo1.png"
                />
              </div>
              <div class="li">
                <img
                  src="http://101.132.181.9:3000/public/imgs/accessory/accessory-promo2.png"
                />
              </div>
            </div>
            <ul class="right">
              <li v-for="(ele, i) in partslist" :key="i">
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
              <li class="browse">
                <span
                  class="browse-span"
                  @click="gogoods(partslist[0].category_id)"
                >
                  浏览更多
                  <el-icon><DArrowRight /></el-icon>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { getMobile, getTelevision, getParts } from "@/api/Interface/home.js";
import router from "@/router";
import { ref, reactive, toRefs, mounted, onMounted } from "vue";

let flag = ref("热门");
let flag1 = ref("热门");
let mobilelist = ref([]);
let televisionlist = ref([]);
let partslist = ref([]);

onMounted(async () => {
  let Mobile = await getMobile("手机");
  mobilelist.value = Mobile.Product;
  console.log(Mobile);
  gettelevision();
  getparts();
});
// 家电热门
const gettelevision = async (name) => {
  flag.value=name
  let Television = await getTelevision();
  televisionlist.value = Television.Product;
  console.log(Television);
};
// 配件热门
const getparts = async (name) => {
  flag1.value = name;
  let Parts = await getParts();
  partslist.value = Parts.Product;
  console.log(Parts);
};

// 查看更多
const gogoods = async (category_id) => {
  router.push("/goods?category_id=" + category_id);
};

const overswitch1 = async (text) => {
  flag.value=text
  let data = await getMobile(text);
  televisionlist.value = data.Product;
};
const overswitch2 = async (text) => {
  flag1.value = text;
  let data = await getMobile(text);
  partslist.value = data.Product;
};
</script>
<style lang="scss" scoped>
.home {
  #homePage {
    background-color: #ffffff;
    .w {
      margin-bottom: 20px;
      .banner {
        .demonstration {
          color: var(--el-text-color-secondary);
        }
        .el-carousel__item {
          img {
            width: 100%;
          }
        }
        .el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
        }
        .el-carousel__item:nth-child(2n + 1) {
          background-color: #d3dce6;
        }
      }
    }
    .section {
      background-color: #f5f5f5;
      .w {
        .title {
          text-align: left;
          line-height: 46px;
          font-size: 22px;
          font-weight: 200;
          line-height: 58px;
          color: #333;
          .fr {
            font-weight: 500;
            font-size: 16px;
            color: #000;
          }
          .Hot {
            margin: 0 14px 0 20px;
          }
          .xuanz {
            color: #ff6700;
            text-decoration: #ff6700 solid 2px underline;
          }
        }
        .list {
          display: flex;
          justify-content: space-between;
          .left {
            width: 19%;
            height: 614px;
            img {
              width: 234px;
              height: 595px;
            }

            .li {
              width: 100%;
              height: 288px;
              text-align: center;
              background-color: #fff;
              margin-bottom: 19px;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .right {
            width: 80%;
            height: 614px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            flex-wrap: wrap;
            // background: #0cf;
            li {
              width: 23.4%;
              height: 288px;
              text-align: center;
              background-color: #fff;
              margin-bottom: 19px;
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
              box-shadow: 0 4px 20px #aaa;
            }
            .browse {
              position: relative;
              .browse-span {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 18px;
                color: #333;
                box-sizing: border-box;
                .el-icon {
                  margin: 10px 0;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

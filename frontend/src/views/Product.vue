<template>
  <div class="product-page">
    <h2>商品列表</h2>

    <!-- 搜索和分类 -->
    <div class="filter">
      <input v-model="searchText" placeholder="搜索商品名..." />
      <select v-model="selectedCategories" multiple>
        <optgroup label="生鲜食品">
          <option>水果</option>
          <option>蔬菜</option>
          <option>零食</option>
          <option>饮料</option>
        </optgroup>
        <optgroup label="数码家电">
          <option>手机</option>
          <option>电脑</option>
          <option>耳机</option>
          <option>充电设备</option>
        </optgroup>
        <optgroup label="服饰鞋包">
          <option>男装</option>
          <option>女装</option>
          <option>鞋子</option>
          <option>包包</option>
        </optgroup>
        <optgroup label="日用百货">
          <option>洗护用品</option>
          <option>清洁用品</option>
          <option>厨房用品</option>
        </optgroup>
        <optgroup label="家居家具">
          <option>家具</option>
          <option>收纳</option>
          <option>装饰</option>
        </optgroup>
      </select>
    </div>

    <!-- 商品列表 -->
    <div class="grid">
      <div class="card" v-for="item in filteredList" :key="item.id">
        <div class="tag">{{ item.category }}</div>
        <div class="name">{{ item.name }}</div>
        <div class="price">￥{{ item.price }}</div>

        <button @click="addToCart(item)">加入购物车</button>
      </div>
    </div>

    <!-- 购物车预览 -->
    <div class="cart-preview" v-if="cartList.length">
      <h3>购物车</h3>
      <ul>
        <li v-for="item in cartList" :key="item.id">
          {{ item.name }} × {{ item.num }}  ￥{{ item.price * item.num }}
          <button @click="removeFromCart(item)">删除</button>
        </li>
      </ul>
      <div>总价：￥{{ totalPrice }}</div>
      <button @click="goCartPage">去购物车结算</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"

const router = useRouter()

// 商品数据
const list = ref([
  { id: 1, name: "苹果", price: 10, category: "水果" },
  { id: 2, name: "香蕉", price: 5, category: "水果" },
  { id: 3, name: "耳机", price: 200, category: "耳机" },
])
const searchText = ref("")
const selectedCategories = ref([])

// 购物车
const cartList = ref([])

// 过滤商品
const filteredList = computed(() => {
  return list.value.filter(item => {
    const matchText = item.name.includes(searchText.value)
    const matchCategory =
      selectedCategories.value.length === 0 ||
      selectedCategories.value.includes(item.category)
    return matchText && matchCategory
  })
})

// 添加到购物车
const addToCart = (item) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || []

  const existing = cart.find(i => i.id === item.id)

  if (existing) {
    existing.num++
  } else {
    cart.push({
      ...item,
      num: 1
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
}

// 从购物车删除
const removeFromCart = (item) => {
  cartList.value = cartList.value.filter(i => i.id !== item.id)
}

// 购物车总价
const totalPrice = computed(() => {
  return cartList.value.reduce((sum, item) => sum + item.price * item.num, 0)
})

// 去购物车页面
const goCartPage = () => {
  router.push("/cart")
}
</script>

<style scoped>
.product-page { padding: 20px; font-family: Arial; }
.grid { display: flex; gap: 15px; flex-wrap: wrap; }
.card { background: #fff; padding: 12px; border-radius: 8px; box-shadow: 0 3px 8px rgba(0,0,0,0.1); width: 180px; display: flex; flex-direction: column; gap: 6px; }
button { cursor: pointer; border: none; border-radius: 6px; padding: 6px; background: #6ea3ff; color: #fff; transition: .2s; }
button:hover { transform: translateY(-2px); }
.cart-preview { margin-top: 30px; background: #f7f7f7; padding: 10px; border-radius: 8px; }
.cart-preview ul { list-style: none; padding: 0; }
.cart-preview li { display: flex; justify-content: space-between; margin-bottom: 6px; }



</style>


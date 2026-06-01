<template>
  <div class="cart-page">

    <!-- 有商品 -->
    <div class="cart-card" v-if="cartList.length">

      <h2>🛒 我的购物车</h2>

      <div
        class="cart-item"
        v-for="item in cartList"
        :key="item.id"
      >
        <!-- 商品信息 -->
        <div class="product-info">
          <div class="product-image">
            <img :src="item.image" alt="商品图片" />
          </div>
          <div class="product-details">
            <div class="name">{{ item.name }}</div>
            <div class="price">￥{{ item.price }}</div>
          </div>
        </div>

        <!-- 数量 + 删除 -->
        <div class="actions">
          <button @click="decrease(item)">-</button>
          <span>{{ item.num }}</span>
          <button @click="item.num++">+</button>
          <button class="delete-btn" @click="remove(item)">删除</button>
        </div>
      </div>

      <!-- 底部结算 -->
      <div class="footer">
        <div class="total">
          合计：￥{{ totalPrice }}
        </div>
        <button class="checkout-btn">去结算</button>
      </div>

    </div>

    <!-- 空购物车 -->
    <div class="empty-cart" v-else>
      🛒
      <h3>购物车空空如也</h3>
      <button @click="router.push('/home')">去购物</button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


const cartList = ref([])

const loadCart = () => {
  cartList.value = JSON.parse(localStorage.getItem("cart")) || []
}

// onMounted(() => {
//   loadCart()
// })


const updateCart = () => {
  localStorage.setItem("cart", JSON.stringify(cartList.value))
}

const increase = (item) => {
  item.num++
  updateCart()
}

// 减少数量，不能低于1

const decrease = (item) => {
  if (item.num > 1) {
    item.num--
  } else {
    cartList.value = cartList.value.filter(i => i.id !== item.id)
  }
  updateCart()
}
// 删除商品

const remove = (item) => {
  cartList.value = cartList.value.filter(i => i.id !== item.id)
  updateCart()
}

// 合计金额
const totalPrice = computed(() =>
  cartList.value.reduce((sum, item) => sum + item.price * item.num, 0)
)
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 50px;
  background: linear-gradient(135deg, #fff8fa, #eef6ff);
  font-family: "Arial", sans-serif;
}

.cart-card {
  width: 720px;
  background: rgba(255,255,255,.85);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,.08);
}

h2 {
  margin-bottom: 25px;
  color: #555;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  margin-bottom: 15px;
  border-radius: 16px;
  background: rgba(255,255,255,.95);
  box-shadow: 0 4px 12px rgba(0,0,0,.05);
}

.product-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.product-image img {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
}

.product-details .name {
  font-size: 18px;
  font-weight: 600;
}

.product-details .price {
  color: #ff8fb1;
  margin-top: 5px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.actions button {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: #ffb6c1;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.actions button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255,143,177,.3);
}

.delete-btn {
  border-radius: 8px;
  padding: 0 10px;
}

.footer {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.total {
  font-size: 22px;
  font-weight: bold;
  color: #ff8fb1;
}

.checkout-btn {
  padding: 12px 30px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffb6c1, #ff8fb1);
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255,143,177,.3);
}

.empty-cart {
  width: 720px;
  text-align: center;
  padding: 50px;
  border-radius: 24px;
  background: rgba(255,255,255,.75);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0,0,0,.08);
}

.empty-cart h3 {
  margin: 20px 0;
  color: #666;
}

.empty-cart button {
  padding: 12px 30px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffb6c1, #ff8fb1);
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.empty-cart button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255,143,177,.3);
}
</style>
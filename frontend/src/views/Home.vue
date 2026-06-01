<template>
  <div class="home-page">
    <div class="welcome-card">
      <h1>欢迎来到商城</h1>
      <p>轻松浏览商品，开始购物之旅</p>
        <button @click="goCart" class="btn1">购物车</button>
      <router-link to="/product">
        <button class="btn">去商品列表</button>
      </router-link>

      <router-link to="/admin">
        <button class="btn admin-btn">后台管理</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
    import { useRouter } from 'vue-router'

        const router = useRouter()

        // 按钮点击函数
        const goCart = () => {
            router.push('/cart')  // 跳转到 Cart.vue 页面
        }
</script>

<style scoped>

.home-page {
  height: 100vh;
  /* min-height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #fff8fa, #eef6ff);
}

.welcome-card {
  text-align: center;
  padding: 40px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.welcome-card h1 {
  margin-bottom: 15px;
  color: #4a4a4a;
}

.welcome-card p {
  margin-bottom: 25px;
  color: #6c6c6c;
}
.btn1{
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background: #a188db;
  color: #fff;
  font-size: 16px;
  margin: 0 5px;
  cursor: pointer;
  transition: 0.3s;
}
.btn1:hover{
    background: #9f72da;
}
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background: #8ab6ff;
  color: #fff;
  font-size: 16px;
  margin: 0 5px;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  background: #6ea3ff;
}

.admin-btn {
  background: #ffb76b;
}

.admin-btn:hover {
  background: #ffa541;
}
</style>
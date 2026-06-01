<template>
  <div class="page">
        <div class="sakura sakura1">🌸</div>
        <div class="sakura sakura2">🌸</div>
        <div class="sakura sakura3">🌸</div>
        <div class="sakura sakura4">🌸</div>
    <div class="login-card">
      <h2 class="title">商城登录</h2>

      <input v-model="username" placeholder="请输入账号" @keyup.enter="handleLogin" ref="usernameInput"/>
      <input v-model="password" type="password" placeholder="请输入密码" @keyup.enter="handleLogin" />

      <button @click="handleLogin">登录</button>

      <p class="msg">{{ msg }}</p>
      
    </div>

  </div>
  
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { login } from "../api/user"




const router = useRouter()

const username = ref("")
const password = ref("")
const msg = ref("")
const usernameInput = ref(null)

onMounted(()=>{
    usernameInput.value.focus()
})


const handleLogin = async () => {
  const res = await login({
    username: username.value,
    password: password.value
  })

  if (res.data.code === 200) {
    localStorage.setItem("isLogin","1")
    router.push("/home")
  } else {
    msg.value = res.data.msg
  }
}
</script>

<style scoped>
/* 整体背景 */
.page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background:
    linear-gradient(
      135deg,
      #ffe6ee,
      #fff8fa,
      #eef6ff
    );
}
/* .page {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background:
    linear-gradient(
      135deg,
      #ffe6ee 0%,
      #fff5f8 40%,
      #eef6ff 100%
    );

  overflow: hidden;
} */

/* 登录卡片 */
.login-card {
  width: 360px;
  padding: 35px;

  border-radius: 24px;

  background: rgba(255,255,255,0.65);

  backdrop-filter: blur(12px);

  border: 1px solid rgba(255,255,255,0.5);

  box-shadow:
    0 8px 32px rgba(0,0,0,0.08);

  text-align: center;

  z-index: 10;
}
/* 标题 */
.title {
  margin-bottom: 25px;

  color: #5b5b5b;

  font-size: 28px;

  letter-spacing: 2px;

  font-weight: 600;
}

/* 输入框 */
input {
  width: 100%;

  padding: 12px 14px;

  margin-bottom: 16px;

  border-radius: 12px;

  border: 1px solid #f1d6de;

  background: rgba(255,255,255,0.85);

  box-sizing: border-box;

  transition: all .3s;
}

input:focus {
  border-color: #f3a6c8;

  box-shadow:
    0 0 10px rgba(243,166,200,.3);
}

input:focus {
  border-color: #8ab6ff;
  box-shadow: 0 0 5px rgba(138,182,255,0.5);
}

/* 按钮 */
button {
  width: 100%;

  padding: 12px;

  border: none;

  border-radius: 12px;

  background:
    linear-gradient(
      135deg,
      #ffb6c1,
      #ff8fb1
    );

  color: white;

  font-size: 16px;

  font-weight: 600;

  cursor: pointer;

  transition: all .3s;
}

button:hover {
  transform: translateY(-2px);

  box-shadow:
    0 8px 18px rgba(255,143,177,.3);
}

button:hover {
  background: #6ea3ff;
}

/* 错误提示 */
.msg {
  margin-top: 10px;
  color: #ff6b6b;
  font-size: 14px;
}
.sakura {
  position: absolute;

  opacity: .18;

  font-size: 70px;

  user-select: none;
}

.sakura1 {
  top: 8%;
  left: 10%;
}

.sakura2 {
  top: 15%;
  right: 12%;
}

.sakura3 {
  bottom: 10%;
  left: 15%;
}

.sakura4 {
  bottom: 12%;
  right: 10%;
}
@keyframes float {

  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-15px);
  }

  100% {
    transform: translateY(0px);
  }
}

.sakura {
  animation: float 5s ease-in-out infinite;
}
</style>
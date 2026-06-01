<template>
  <div class="admin-page">
    <div class="header">
      <h2>🛠 商品后台管理</h2>
      <p>管理商城商品信息</p>
    </div>

    <!-- 添加商品 -->
    <div class="add-card">
      <input v-model="name" placeholder="商品名称" />
      <input v-model="price" placeholder="商品价格" type="number" />
      <button @click="addProduct">+ 添加商品</button>
    </div>

    <!-- 商品表格 -->
    <div class="table-card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>商品名称</th>
            <th>价格</th>
            <th>操作</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.id }}</td>
            <td>
              <input v-model="item.name" @blur="updateProduct(item)" />
            </td>
            <td>
              <input v-model.number="item.price" type="number" @blur="updateProduct(item)" />
            </td>
            <td>
              <button class="delete-btn" @click="deleteProduct(item.id)">删除</button>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const list = ref([])
const name = ref("")
const price = ref("")

// 读取商品列表
const fetchList = async () => {
  const res = await axios.get("/api/product/list")
  list.value = res.data
}

onMounted(() => {
  fetchList()
})

// 添加商品
const addProduct = async () => {
  if (!name.value || !price.value) return
  await axios.post("/api/product/add", { name:name.value, price:price.value })
  name.value = ""
  price.value = ""
  fetchList()
}

// 删除商品
const deleteProduct = async (id) => {
  await axios.post("/api/product/delete", { id })
  fetchList()
}

// 编辑商品（失去焦点触发）
const updateProduct = async (item) => {
  await axios.post("/api/product/update", { id:item.id, name:item.name, price:item.price })
  fetchList()
}
</script>

<style scoped>
.admin-page { min-height: 100vh; background: #f4f6f9; padding: 30px; font-family: Arial; }
.header { text-align: center; margin-bottom: 25px; }
.header h2 { margin:0;color:#333;}
.header p {color:#888;font-size:14px;}
.add-card { display:flex; gap:10px; justify-content:center; margin-bottom:25px; }
.add-card input { padding:10px; border-radius:8px; border:1px solid #ddd; outline:none; width:180px; }
.add-card button { background:#6ea3ff; border:none; color:white; padding:10px 16px; border-radius:8px; cursor:pointer; transition:0.3s; }
.add-card button:hover { background:#4f8cff; }
.table-card { background:#fff; border-radius:12px; padding:20px; box-shadow:0 5px 20px rgba(0,0,0,0.05); }
table { width:100%; border-collapse:collapse; }
th, td { padding:12px; text-align:center; border-bottom:1px solid #eee; }
th { color:#555; background:#fafafa; }
.delete-btn { background:#ff6b6b; border:none; color:white; padding:6px 12px; border-radius:6px; cursor:pointer; }
.delete-btn:hover { background:#ff4d4d; }
input[type="number"] { width: 80px; }
</style>
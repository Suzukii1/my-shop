const express = require("express")
const cors = require("cors")

const userRouter = require("./routes/user")
const productRouter = require("./routes/product")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use('/api/product', require('./routes/product'))

app.listen(3000, () => {
  console.log("server running on 3000")
})

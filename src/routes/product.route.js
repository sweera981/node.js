import express from 'express'
import { productCreateController } from '../controllers/product.controller.js'
const router = express.Router()

router.post("/create-product", productCreateController)

export default router
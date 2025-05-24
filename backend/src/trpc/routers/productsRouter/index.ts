import { router } from '../../index'
import { listProduct } from './productList'
import { getByIdProduct } from './productGetById'
import { createProduct } from './productCreate'
import { updateProduct } from './productUpdate'
import { deleteProduct } from './productDelete'

export const productsRouter = router({
  list: listProduct,
  getById: getByIdProduct,
  create: createProduct,
  update: updateProduct,
  delete: deleteProduct,
})
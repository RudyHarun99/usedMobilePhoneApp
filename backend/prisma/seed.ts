import { PrismaClient } from '@prisma/client'
import { ulid } from 'ulid'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.product.deleteMany()

  // Create sample products
  const products = [
    {
      id: ulid(),
      sku: 'IP14PM-128-BLK',
      slug: 'iphone-14-pro-max-128gb-black',
      name: 'iPhone 14 Pro Max 128GB Black',
      description: 'Used iPhone 14 Pro Max in excellent condition. Includes original charger and box.',
      price: 899.99,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H66e156f3cc6b4c2c9dc08755361f8e53q.jpg',
      stockQuantity: 5,
      minimumOrderQuantity: 1
    },
    {
      id: ulid(),
      sku: 'SGS23U-256-GRN',
      slug: 'samsung-galaxy-s23-ultra-256gb-green',
      name: 'Samsung Galaxy S23 Ultra 256GB Green',
      description: 'Used Samsung Galaxy S23 Ultra in good condition. Includes original accessories.',
      price: 799.99,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/He1b2593794bb43949e23d33ab80d04b3m.jpg',
      stockQuantity: 3,
      minimumOrderQuantity: 2
    },
    {
      id: ulid(),
      sku: 'IP13-128-RED',
      slug: 'iphone-13-128gb-red',
      name: 'iPhone 13 128GB Red',
      description: 'Used iPhone 13 in great condition. Includes charger.',
      price: 599.99,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/Hc72b7b2cd9204ff68c150f89cd328861o.jpg',
      stockQuantity: 8,
      minimumOrderQuantity: 3
    },
    {
      id: ulid(),
      sku: 'PXL7-256-BLK',
      slug: 'google-pixel-7-256gb-black',
      name: 'Google Pixel 7 256GB Black',
      description: 'Used Pixel 7 in excellent condition. Original box and accessories included.',
      price: 499.99,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H382878868c724d08ba123fe819e91516B.jpg',
      stockQuantity: 4,
      minimumOrderQuantity: 4
    },
    {
      id: ulid(),
      sku: 'OP9P-128-SLV',
      slug: 'oneplus-9-pro-128gb-silver',
      name: 'OnePlus 9 Pro 128GB Silver',
      description: 'Used OnePlus 9 Pro in good condition. Includes fast charger',
      price: 449.99,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/Sb04d841f08994a75904cdbaed346634fV.jpg',
      stockQuantity: 2,
      minimumOrderQuantity: 5
    },
    {
      id: ulid(),
      sku: 'IP12M-64-BLU',
      slug: 'iphone-12-mini-64gb-blue',
      name: 'iPhone 12 Mini 64GB Blue',
      description: 'Used iPhone 12 Mini in great condition. Original accessories included.',
      price: 399.99,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H3ec88f9f91f44c6b96c6bc7bde8640f5i.jpg',
      stockQuantity: 6,
      minimumOrderQuantity: 5
    },
    {
      id: ulid(),
      sku: 'SGS22-128-WHT',
      slug: 'samsung-galaxy-s22-128gb-white',
      name: 'Samsung Galaxy S22 128GB White',
      description: 'Used Galaxy S22 in excellent condition. Includes charger and case.',
      price: 549.99,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/Hb0150dd9865d4bfb9128f8ffb613045dk.jpg',
      stockQuantity: 4,
      minimumOrderQuantity: 4
    },
    {
      id: ulid(),
      sku: 'XM12P-256-GRY',
      slug: 'xiaomi-12-pro-256gb-gray',
      name: 'Xiaomi 12 Pro 256GB Gray',
      description: 'Used Xiaomi 12 Pro in good condition. Full package with accessories.',
      price: 479.99,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H59f6b6c1820e40a79d3ad9489e01b415W.jpg',
      stockQuantity: 3,
      minimumOrderQuantity: 3
    },
    {
      id: ulid(),
      sku: 'IP11-64-BLK',
      slug: 'iphone-11-64gb-black',
      name: 'iPhone 11 64GB Black',
      description: 'Used iPhone 11 in great condition. Includes charger and earphones.',
      price: 349.99,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H39f62986982d4f4ba864eeacd59273c3Z.jpg',
      stockQuantity: 7,
      minimumOrderQuantity: 2
    },
    {
      id: ulid(),
      sku: 'SGA53-128-BLU',
      slug: 'samsung-galaxy-a53-128gb-blue',
      name: 'Samsung Galaxy A53 128GB Blue',
      description: 'Used Galaxy A53 in excellent condition. Complete package with all accessories.',
      price: 299.99,
      imageUrl: 'https://s.alicdn.com/@sc04/kf/H1d4ec57273044075a28fd75012c56e99f.jpg',
      stockQuantity: 5,
      minimumOrderQuantity: 1
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  console.log('Database has been seeded')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
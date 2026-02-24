import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('207103Sultan12&crazy978222', 10)
  await prisma.user.create({
    data: {
      email: 'admin@mosketh.co.ke',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'MosKeth',
      role: 'ADMIN'
    }
  })

  // Create categories
  const mens = await prisma.category.create({
    data: {
      name: "Men's Perfumes",
      slug: 'mens-perfumes'
    }
  })

  const womens = await prisma.category.create({
    data: {
      name: "Women's Perfumes",
      slug: 'womens-perfumes'
    }
  })

  // Create products
  await prisma.product.createMany({
    data: [
      {
        name: 'Dior Sauvage 100ml',
        slug: 'dior-sauvage-100ml',
        sku: 'MOS001',
        priceKES: 8500,
        stock: 10,
        description: 'Fresh and spicy fragrance for men',
        images: ['/images/product1.jpg'],
        categoryId: mens.id,
        featured: true
      },
      {
        name: 'Chanel No.5 100ml',
        slug: 'chanel-no5-100ml',
        sku: 'MOS002',
        priceKES: 12000,
        stock: 5,
        description: 'Timeless elegance for women',
        images: ['/images/product2.jpg'],
        categoryId: womens.id,
        featured: true
      }
    ]
  })

  console.log('✅ Seeding complete')
}

main()
  .catch(e => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// ==================== HEALTH CHECK ====================
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'MosKeth Backend Running' })
})

// ==================== AUTH ====================
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

// ==================== PRODUCTS ====================
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    })
    res.json({ success: true, data: products })
  } catch (error) {
    console.error('Products error:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

app.get('/api/products/featured', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true, isActive: true },
      take: 8
    })
    res.json({ success: true, data: products })
  } catch (error) {
    console.error('Featured error:', error)
    res.status(500).json({ error: 'Failed to fetch featured products' })
  }
})

app.get('/api/products/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true }
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json({ success: true, data: product })
  } catch (error) {
    console.error('Product error:', error)
    res.status(500).json({ error: 'Failed to fetch product' })
  }
})

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany()
    res.json({ success: true, data: categories })
  } catch (error) {
    console.error('Categories error:', error)
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
})

// ==================== CART ====================
app.get('/api/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: { product: true }
          }
        }
      })
    }

    res.json({ success: true, data: cart })
  } catch (error) {
    console.error('Cart error:', error)
    res.status(500).json({ error: 'Failed to fetch cart' })
  }
})

app.post('/api/cart/add', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body

    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    let cart = await prisma.cart.findUnique({ where: { userId } })
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } })
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId
        }
      }
    })

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          priceKES: product.priceKES
        }
      })
    }

    const items = await prisma.cartItem.findMany({
      where: { cartId: cart.id }
    })

    const total = items.reduce((sum, item) => sum + (item.priceKES * item.quantity), 0)

    await prisma.cart.update({
      where: { id: cart.id },
      data: { totalKES: total }
    })

    res.json({ success: true, message: 'Added to cart' })
  } catch (error) {
    console.error('Add to cart error:', error)
    res.status(500).json({ error: 'Failed to add to cart' })
  }
})

app.put('/api/cart/item/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { quantity } = req.body

    await prisma.cartItem.update({
      where: { id },
      data: { quantity }
    })

    res.json({ success: true })
  } catch (error) {
    console.error('Update cart error:', error)
    res.status(500).json({ error: 'Failed to update cart' })
  }
})

app.delete('/api/cart/item/:id', async (req, res) => {
  try {
    const { id } = req.params
    await prisma.cartItem.delete({ where: { id } })
    res.json({ success: true })
  } catch (error) {
    console.error('Delete cart error:', error)
    res.status(500).json({ error: 'Failed to remove item' })
  }
})

// ==================== ORDERS ====================
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body
    const orderNumber = `MOS${Date.now()}${Math.floor(Math.random() * 1000)}`

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: orderData.userId,
        totalKES: orderData.totalKES,
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        customerPhone: orderData.customerPhone,
        shippingAddress: orderData.shippingAddress,
        items: {
          create: orderData.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            priceKES: item.priceKES,
            totalKES: item.priceKES * item.quantity
          }))
        }
      },
      include: { items: true }
    })

    await prisma.cartItem.deleteMany({
      where: { cart: { userId: orderData.userId } }
    })

    res.json({ success: true, data: order })
  } catch (error) {
    console.error('Order error:', error)
    res.status(500).json({ error: 'Failed to create order' })
  }
})

app.get('/api/orders/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    res.json({ success: true, data: orders })
  } catch (error) {
    console.error('User orders error:', error)
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

// ==================== ADMIN ====================
const verifyAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    })

    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Not authorized' })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

app.get('/api/admin/dashboard', verifyAdmin, async (req, res) => {
  try {
    const [totalOrders, totalProducts, totalCustomers] = await Promise.all([
      prisma.order.count(),
      prisma.product.count(),
      prisma.user.count({ where: { role: 'CUSTOMER' } })
    ])

    res.json({
      success: true,
      data: { totalOrders, totalProducts, totalCustomers }
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    res.status(500).json({ error: 'Failed to fetch dashboard' })
  }
})

app.get('/api/admin/products', verifyAdmin, async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    })
    res.json({ success: true, data: products })
  } catch (error) {
    console.error('Admin products error:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

app.post('/api/admin/products', verifyAdmin, async (req, res) => {
  try {
    const productData = req.body
    const slug = productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const product = await prisma.product.create({
      data: {
        ...productData,
        slug,
        images: productData.images || ['/images/product.jpg']
      }
    })

    res.json({ success: true, data: product })
  } catch (error) {
    console.error('Create product error:', error)
    res.status(500).json({ error: 'Failed to create product' })
  }
})

app.delete('/api/admin/products/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params
    await prisma.product.update({
      where: { id },
      data: { isActive: false }
    })
    res.json({ success: true })
  } catch (error) {
    console.error('Delete product error:', error)
    res.status(500).json({ error: 'Failed to delete product' })
  }
})

app.get('/api/admin/orders', verifyAdmin, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    })
    res.json({ success: true, data: orders })
  } catch (error) {
    console.error('Admin orders error:', error)
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

app.get('/api/admin/customers', verifyAdmin, async (req, res) => {
  try {
    const customers = await prisma.user.findMany({
      where: { role: 'CUSTOMER' },
      orderBy: { createdAt: 'desc' }
    })
    res.json({ success: true, data: customers })
  } catch (error) {
    console.error('Customers error:', error)
    res.status(500).json({ error: 'Failed to fetch customers' })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
  console.log(`📍 Store: Shop F5, Superior Centre, Kimathi Street, Nairobi CBD`)
  console.log(`📞 Phone/WhatsApp/Paybill: 0742783907`)
})
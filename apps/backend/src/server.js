import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const prisma = new PrismaClient()
const app = express()
const PORT = process.env.PORT || 5000

// ==================== CORS FIX ====================
const allowedOrigins = [
  'https://mosketh-frontend.vercel.app',
  'http://localhost:3000'
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy does not allow access from this origin.'
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.options('*', cors())
app.use(express.json({ limit: '10mb' }))

// ==================== HEALTH CHECK ====================
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'MosKeth Backend Running' })
})

// ==================== ADMIN VERIFICATION ====================
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

// ==================== DEBUG ROUTES ====================

// Debug route to check if user exists
app.get('/api/debug-user', async (req, res) => {
  try {
    console.log('🔍 Debug: Checking for admin user...')
    const user = await prisma.user.findUnique({
      where: { email: 'admin@mosketh.co.ke' }
    })
    
    if (user) {
      console.log('✅ Debug: Admin user found:', user.email)
      res.json({ 
        success: true,
        exists: true, 
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        hasPassword: !!user.password,
        userId: user.id
      })
    } else {
      console.log('❌ Debug: Admin user NOT found')
      res.json({ 
        success: true,
        exists: false,
        message: 'Admin user not found in database'
      })
    }
  } catch (error) {
    console.error('❌ Debug error:', error)
    res.status(500).json({ 
      success: false,
      error: error.message,
      stack: error.stack
    })
  }
})

// Debug route to test database connection
app.get('/api/debug-db', async (req, res) => {
  try {
    console.log('🔍 Debug: Testing database connection...')
    const userCount = await prisma.user.count()
    console.log('✅ Debug: Database connected. User count:', userCount)
    
    res.json({ 
      success: true,
      connected: true,
      userCount,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Debug database error:', error)
    res.status(500).json({ 
      success: false,
      connected: false,
      error: error.message,
      stack: error.stack
    })
  }
})

// Debug route to test login manually (GET version for testing)
app.get('/api/debug-login-test', (req, res) => {
  res.json({ 
    message: 'Login POST endpoint exists. Use POST request with email and password.',
    endpoint: '/api/auth/login',
    method: 'POST'
  })
})

// Debug route to test orders endpoint
app.get('/api/test-orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      take: 5,
      include: { items: true }
    })
    res.json({ 
      success: true, 
      message: 'Orders endpoint is working',
      ordersCount: orders.length,
      orders 
    })
  } catch (error) {
    console.error('Test orders error:', error)
    res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: error.stack 
    })
  }
})

// ==================== TEMPORARY CATEGORIES ROUTE ====================
app.get('/api/create-categories', async (req, res) => {
  try {
    console.log('🔧 Creating default categories...')
    
    const categories = await prisma.category.createMany({
      data: [
        { name: "Men's Perfumes", slug: "mens-perfumes" },
        { name: "Women's Perfumes", slug: "womens-perfumes" },
        { name: "Unisex Perfumes", slug: "unisex-perfumes" },
        { name: "Body Oils", slug: "body-oils" },
        { name: "Face Creams", slug: "face-creams" },
        { name: "Hair Products", slug: "hair-products" }
      ],
      skipDuplicates: true
    })
    
    console.log(`✅ Created ${categories.count} categories`)
    res.json({ 
      success: true, 
      message: 'Categories created successfully',
      count: categories.count 
    })
  } catch (error) {
    console.error('❌ Create categories error:', error)
    res.status(500).json({ error: error.message })
  }
})

// ==================== AUTH ====================
app.post('/api/auth/login', async (req, res) => {
  console.log('📝 Login attempt received at:', new Date().toISOString())
  console.log('Request body:', req.body)
  
  try {
    const { email, password } = req.body

    if (!email || !password) {
      console.log('❌ Missing email or password')
      return res.status(400).json({ error: 'Email and password are required' })
    }

    console.log('🔍 Looking up user with email:', email)
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      console.log('❌ User not found:', email)
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    console.log('✅ User found:', { id: user.id, email: user.email, role: user.role })

    console.log('🔍 Comparing passwords...')
    const validPassword = await bcrypt.compare(password, user.password)
    
    if (!validPassword) {
      console.log('❌ Invalid password for user:', email)
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    console.log('✅ Password valid, generating token...')
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    console.log('✅ Login successful for:', email)
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
    console.error('❌ Login error caught:', error)
    console.error('Error name:', error.name)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    res.status(500).json({ 
      error: 'Login failed: ' + error.message,
      details: error.meta || null
    })
  }
})

// ==================== IMAGE UPLOAD ====================
app.post('/api/admin/upload-image', verifyAdmin, async (req, res) => {
  try {
    const { image } = req.body
    
    if (!image) {
      return res.status(400).json({ error: 'No image provided' })
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: 'mosketh/products',
      transformation: [
        { width: 800, height: 800, crop: 'fill' }
      ]
    })

    res.json({ 
      success: true, 
      imageUrl: result.secure_url
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'Failed to upload image' })
  }
})

// ==================== PUBLIC PRODUCTS ====================
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

// ==================== CATEGORIES ====================
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany()
    res.json({ success: true, data: categories })
  } catch (error) {
    console.error('Categories error:', error)
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
})

// ==================== ADMIN DASHBOARD ====================
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

// ==================== ADMIN PRODUCTS ====================
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
    
    // Validate required fields
    if (!productData.name || !productData.sku || !productData.priceKES || !productData.stock || !productData.description || !productData.categoryId) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['name', 'sku', 'priceKES', 'stock', 'description', 'categoryId']
      })
    }

    // Check if SKU already exists
    const existingProduct = await prisma.product.findUnique({
      where: { sku: productData.sku.toUpperCase() }
    })

    if (existingProduct) {
      return res.status(400).json({ error: 'Product with this SKU already exists' })
    }

    // Generate slug from name
    const slug = productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    // Ensure comparePriceKES is handled properly (optional field)
    const comparePriceKES = productData.comparePriceKES 
      ? Number(productData.comparePriceKES) 
      : null

    console.log('Creating product with data:', {
      name: productData.name,
      sku: productData.sku.toUpperCase(),
      priceKES: Number(productData.priceKES),
      comparePriceKES,
      stock: Number(productData.stock),
      categoryId: productData.categoryId
    })

    // Create product with proper error handling
    const product = await prisma.product.create({
      data: {
        name: productData.name,
        slug,
        sku: productData.sku.toUpperCase(),
        priceKES: Number(productData.priceKES),
        comparePriceKES: comparePriceKES,
        stock: Number(productData.stock),
        description: productData.description,
        shortDescription: productData.shortDescription || '',
        categoryId: productData.categoryId,
        featured: productData.featured || false,
        images: productData.images || ['https://via.placeholder.com/800x800?text=MosKeth+Product']
      }
    })

    res.json({ 
      success: true, 
      message: 'Product created successfully',
      data: product 
    })
  } catch (error) {
    console.error('Create product error:', error)
    
    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        error: 'A product with this SKU already exists',
        field: 'sku'
      })
    }
    
    if (error.code === 'P2003') {
      return res.status(400).json({ 
        error: 'Invalid category ID. Please select a valid category.',
        field: 'categoryId'
      })
    }
    
    // General error response with details
    res.status(500).json({ 
      error: error.message || 'Failed to create product',
      details: error.meta || null
    })
  }
})

app.delete('/api/admin/products/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params
    await prisma.product.update({
      where: { id },
      data: { isActive: false }
    })
    res.json({ success: true, message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Delete product error:', error)
    res.status(500).json({ error: 'Failed to delete product' })
  }
})

// ==================== ADMIN ORDERS ====================
app.get('/api/admin/orders', verifyAdmin, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { 
        items: { 
          include: { product: true } 
        } 
      },
      orderBy: { createdAt: 'desc' }
    })
    res.json({ success: true, data: orders })
  } catch (error) {
    console.error('Admin orders error:', error)
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

// ==================== ADMIN CUSTOMERS ====================
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

// ==================== ORDERS - FIXED WITH DETAILED LOGGING ====================
app.post('/api/orders', async (req, res) => {
  console.log('📦 Order creation attempt at:', new Date().toISOString())
  console.log('Order data received:', JSON.stringify(req.body, null, 2))
  
  try {
    const orderData = req.body
    
    // Validate required fields
    if (!orderData.userId || !orderData.items || !orderData.totalKES || !orderData.customerName || !orderData.customerEmail || !orderData.customerPhone || !orderData.shippingAddress) {
      console.log('❌ Missing required fields')
      console.log('Fields present:', {
        userId: !!orderData.userId,
        items: !!orderData.items,
        totalKES: !!orderData.totalKES,
        customerName: !!orderData.customerName,
        customerEmail: !!orderData.customerEmail,
        customerPhone: !!orderData.customerPhone,
        shippingAddress: !!orderData.shippingAddress
      })
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Validate items array
    if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
      console.log('❌ Invalid items array')
      return res.status(400).json({ error: 'Items must be a non-empty array' })
    }

    const orderNumber = `MOS${Date.now()}${Math.floor(Math.random() * 1000)}`
    console.log('Generated order number:', orderNumber)

    // Check if user exists (if not guest)
    if (orderData.userId !== 'guest') {
      const user = await prisma.user.findUnique({
        where: { id: orderData.userId }
      })
      if (!user) {
        console.log('❌ User not found:', orderData.userId)
        return res.status(400).json({ error: 'User not found' })
      }
    }

    // Verify all products exist
    for (const item of orderData.items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId }
      })
      if (!product) {
        console.log('❌ Product not found:', item.productId)
        return res.status(400).json({ error: `Product ${item.productId} not found` })
      }
    }

    // Create order with items
    console.log('Creating order in database...')
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: orderData.userId,
        subtotalKES: orderData.totalKES, // Using total as subtotal for now
        totalKES: orderData.totalKES,
        status: 'PENDING',
        paymentStatus: 'PENDING',
        paymentMethod: 'MPESA',
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        customerPhone: orderData.customerPhone,
        shippingAddress: orderData.shippingAddress,
        notes: orderData.notes || '',
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

    console.log('✅ Order created successfully:', order.id)

    // Clear user's cart if not guest
    if (orderData.userId !== 'guest') {
      await prisma.cartItem.deleteMany({
        where: { cart: { userId: orderData.userId } }
      })
      console.log('Cart cleared for user:', orderData.userId)
    }

    res.json({ 
      success: true, 
      message: 'Order created successfully',
      data: {
        id: order.id,
        orderNumber: order.orderNumber,
        total: order.totalKES
      }
    })
  } catch (error) {
    console.error('❌ Order creation error:')
    console.error('Error name:', error.name)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    
    // Check for specific Prisma errors
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Duplicate order number' })
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Invalid product ID or foreign key constraint' })
    }
    
    res.status(500).json({ 
      error: 'Failed to create order',
      details: error.message,
      code: error.code || 'UNKNOWN'
    })
  }
})

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
  console.log(`📍 Store: Shop F5, Superior Centre, Kimathi Street, Nairobi CBD`)
  console.log(`📞 Phone/WhatsApp/Paybill: 0742783907`)
})
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  priceKES: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'mens-perfumes', 
      'womens-perfumes', 
      'unisex-perfumes', 
      'deodorants',
      'body-mists',
      'lotions',
      'body-creams',
      'soaps',
      'shower-gels',
      'body-scrubs',
      'facial-scrubs',
      'face-serums',
      'lip-oils',
      'face-masks',
      'body-oils', 
      'face-creams', 
      'hair-products', 
      'gift-sets'
    ]
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  images: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Product', productSchema);

// Format date to readable string
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Format price in KES
export const formatPrice = (price) => {
  if (price === undefined || price === null) return 'KSh 0'
  return `KSh ${Number(price).toLocaleString()}`
}

// Format currency (alias for formatPrice)
export const formatCurrency = formatPrice

// Truncate text
export const truncateText = (text, length = 100) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

// Generate slug from text
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}
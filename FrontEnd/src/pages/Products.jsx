import { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FaSearch, FaFilter, FaSort, FaStar, FaShoppingCart } from 'react-icons/fa'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { addToCart } = useCart()

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortOption, setSortOption] = useState('default')
  const [showFilters, setShowFilters] = useState(false)

  // Get query parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  // Fetch products and categories
  useEffect(() => {
    // In a real app, this would be API calls
    // For now, we'll use mock data
    const mockProducts = [
      {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        price: 12.99,
        originalPrice: 15.99,
        image: '/images/gatsby.jpg',
        rating: 4.5,
        description: 'A classic novel of the Jazz Age.',
        category: 'fiction',
        inStock: true,
        tags: ['classic', 'american', 'literature'],
      },
      {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        price: 14.99,
        originalPrice: 18.99,
        image: '/images/mockingbird.jpg',
        rating: 4.8,
        description: 'A gripping tale of racial injustice.',
        category: 'fiction',
        inStock: true,
        tags: ['classic', 'american', 'literature'],
      },
      {
        id: 3,
        title: '1984',
        author: 'George Orwell',
        price: 13.99,
        originalPrice: 16.99,
        image: '/images/1984.jpg',
        rating: 4.7,
        description: 'A dystopian social science fiction novel.',
        category: 'fiction',
        inStock: true,
        tags: ['dystopian', 'science fiction'],
      },
      {
        id: 4,
        title: 'A Brief History of Time',
        author: 'Stephen Hawking',
        price: 18.99,
        originalPrice: 22.99,
        image: '/images/history-time.jpg',
        rating: 4.4,
        description: 'A landmark volume in science writing.',
        category: 'science',
        inStock: true,
        tags: ['science', 'physics', 'cosmology'],
      },
      {
        id: 5,
        title: 'The Art of War',
        author: 'Sun Tzu',
        price: 9.99,
        originalPrice: 12.99,
        image: '/images/art-war.jpg',
        rating: 4.3,
        description: 'Ancient Chinese military treatise.',
        category: 'history',
        inStock: true,
        tags: ['military', 'philosophy', 'classic'],
      },
      {
        id: 6,
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        price: 16.99,
        originalPrice: 20.99,
        image: '/images/sapiens.jpg',
        rating: 4.6,
        description: 'A brief history of humankind.',
        category: 'history',
        inStock: true,
        tags: ['anthropology', 'history', 'science'],
      },
      {
        id: 7,
        title: 'The Power of Now',
        author: 'Eckhart Tolle',
        price: 14.99,
        originalPrice: 17.99,
        image: '/images/power-now.jpg',
        rating: 4.5,
        description: 'A guide to spiritual enlightenment.',
        category: 'self-help',
        inStock: true,
        tags: ['spirituality', 'mindfulness', 'self-help'],
      },
      {
        id: 8,
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        price: 12.99,
        originalPrice: 15.99,
        image: '/images/hobbit.jpg',
        rating: 4.8,
        description: 'Fantasy novel about Bilbo Baggins.',
        category: 'fiction',
        inStock: false,
        tags: ['fantasy', 'adventure', 'classic'],
      },
    ]

    const mockCategories = [
      { id: 'fiction', name: 'Fiction' },
      { id: 'science', name: 'Science' },
      { id: 'history', name: 'History' },
      { id: 'biography', name: 'Biography' },
      { id: 'self-help', name: 'Self-Help' },
      { id: 'children', name: 'Children' },
    ]

    // Simulate API delay
    setTimeout(() => {
      setProducts(mockProducts)
      setCategories(mockCategories)
      setLoading(false)
    }, 1000)
  }, [])

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.author.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory)
    }

    // Apply sorting
    switch (sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-a-z':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'name-z-a':
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
      case 'rating-high-low':
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        // Default order
        break
    }

    return result
  }, [products, searchQuery, selectedCategory, sortOption])

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      quantity: 1,
    })
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400" />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />)
    }

    return <div className="flex">{stars}</div>
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search books, authors, or tags..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline flex items-center"
            >
              <FaFilter className="mr-2" /> Filters
            </button>
            <button className="btn btn-outline flex items-center">
              <FaSort className="mr-2" /> Sort
              <select
                className="ml-2 bg-transparent border-none focus:outline-none"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
                <option value="rating-high-low">Rating: High to Low</option>
              </select>
            </button>
          </div>
        </div>

        {/* Filters - shown on mobile when toggled */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1 rounded-full ${
                  selectedCategory === ''
                    ? 'bg-primary text-white'
                    : 'bg-gray-200'
                }`}
                onClick={() => {
                  setSelectedCategory('')
                  setSearchParams({})
                }}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-3 py-1 rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-200'
                  }`}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setSearchParams({ category: category.id })
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredAndSortedProducts.length} of {products.length} products
        </p>
      </div>

      {/* Products Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="product-grid">
          {filteredAndSortedProducts.map((product) => (
            <div key={product.id} className="card">
              <div className="h-64 bg-gray-200 rounded-t-lg flex items-center justify-center">
                {/* Product image placeholder */}
                <div className="text-5xl text-gray-400">
                  <FaShoppingCart />
                </div>
              </div>
              <div className="card-body">
                <h3 className="font-bold text-lg mb-1">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-2">by {product.author}</p>
                <div className="flex items-center mb-2">
                  {renderStars(product.rating)}
                  <span className="ml-2 text-sm text-gray-500">
                    ({product.rating})
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-lg font-bold">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  {!product.inStock && (
                    <span className="text-red-500 text-sm">Out of Stock</span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-outline flex-1"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className={`btn btn-primary flex-1 ${
                      !product.inStock ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <FaShoppingCart className="inline mr-1" /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No products found.</p>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  )
}

export default Products
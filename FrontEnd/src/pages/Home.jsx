import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FaBook, FaStar, FaShoppingCart } from 'react-icons/fa'

const Home = () => {
  const { addToCart } = useCart()
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use mock data
    const mockFeaturedProducts = [
      {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        price: 12.99,
        originalPrice: 15.99,
        image: '/images/gatsby.jpg',
        rating: 4.5,
        description: 'A classic novel of the Jazz Age.',
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
      },
    ]

    const mockCategories = [
      { id: 1, name: 'Fiction', icon: <FaBook /> },
      { id: 2, name: 'Science', icon: <FaBook /> },
      { id: 3, name: 'History', icon: <FaBook /> },
      { id: 4, name: 'Biography', icon: <FaBook /> },
      { id: 5, name: 'Self-Help', icon: <FaBook /> },
      { id: 6, name: 'Children', icon: <FaBook /> },
    ]

    // Simulate API delay
    setTimeout(() => {
      setFeaturedProducts(mockFeaturedProducts)
      setCategories(mockCategories)
      setLoading(false)
    }, 1000)
  }, [])

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
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to E-Commerce Library
            </h1>
            <p className="text-xl mb-8">
              Discover your next favorite book from our extensive collection
            </p>
            <Link to="/products" className="btn btn-primary text-lg">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl text-primary mb-2">{category.icon}</div>
              <h3 className="font-medium">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-primary hover:underline">
            View All
          </Link>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="card">
              <div className="h-64 bg-gray-200 rounded-t-lg flex items-center justify-center">
                {/* Product image placeholder */}
                <div className="text-5xl text-gray-400">
                  <FaBook />
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
                    className="btn btn-primary flex-1"
                  >
                    <FaShoppingCart className="inline mr-1" /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Shop With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaBook className="text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Browse through thousands of books across all genres
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaStar className="text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Quality Reviews</h3>
              <p className="text-gray-600">
                Read honest reviews from our community of readers
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaShoppingCart className="text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
              <p className="text-gray-600">
                Not satisfied? We offer hassle-free returns
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
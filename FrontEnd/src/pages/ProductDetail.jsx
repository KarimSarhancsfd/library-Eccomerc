import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FaStar, FaShoppingCart, FaArrowLeft } from 'react-icons/fa'

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    // In a real app, this would be an API call
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
        fullDescription: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
        publisher: 'scribner',
        publishDate: 'April 10, 1925',
        pages: 180,
        language: 'English',
        isbn: '9780743273565',
        dimensions: '8.1 x 5.3 x 0.8 inches',
        weight: '0.45 pounds',
        reviews: [
          { id: 1, author: 'John D.', rating: 5, comment: 'A timeless classic!', date: '2023-05-15' },
          { id: 2, author: 'Jane S.', rating: 4, comment: 'Beautifully written but a bit slow at times.', date: '2023-04-22' },
          { id: 3, author: 'Mike R.', rating: 5, comment: 'Fitzgerald at his best!', date: '2023-03-10' },
        ],
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
        fullDescription: 'To Kill a Mockingbird is a novel by Harper Lee published in 1960. Instantly successful, it became bestseller and a classic of modern American literature. The plot and characters are loosely based on Lee\'s observations of her family, her neighbors and an event that occurred near her hometown of Monroeville, Alabama, in 1936, when she was ten.',
        publisher: 'J.B. Lippincott & Co.',
        publishDate: 'July 11, 1960',
        pages: 281,
        language: 'English',
        isbn: '9780061120084',
        dimensions: '8.1 x 5.4 x 0.9 inches',
        weight: '0.6 pounds',
        reviews: [
          { id: 1, author: 'sarah M.', rating: 5, comment: 'One of the best books I have ever read!', date: '2023-06-01' },
          { id: 2, author: 'David T.', rating: 5, comment: 'Powerful and moving story.', date: '2023-05-20' },
        ],
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
        fullDescription: 'Nineteen Eighty-Four is a dystopian social science fiction novel by the English novelist George Orwell. It was published in 1949 as Orwell s ninth and final book completed in his lifetime. Thematically, Nineteen Eighty-Four centres on the consequences of totalitarianism, mass surveillance, and repressive regimentation of persons and behaviours within society.',
        publisher: 'Secker & Warburg',
        publishDate: 'June 8, 1949',
        pages: 328,
        language: 'English',
        isbn: '9780451524935',
        dimensions: '8.2 x 5.5 x 0.8 inches',
        weight: '0.5 pounds',
        reviews: [
          { id: 1, author: 'Alex K.', rating: 5, comment: 'Frighteningly relevant today.', date: '2023-05-18' },
          { id: 2, author: 'Lisa P.', rating: 4, comment: 'A masterpiece of dystopian fiction.', date: '2023-04-30' },
        ],
      },
    ]

    // Find the product by ID
    const foundProduct = mockProducts.find(p => p.id === parseInt(id))

    // Simulate API delay
    setTimeout(() => {
      setProduct(foundProduct)
      setLoading(false)
    }, 500)
  }, [id])

  const handleAddToCart = () => {
    if (product && product.inStock) {
      addToCart({
        ...product,
        quantity,
      })
    }
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

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/products" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link to="/products" className="btn btn-outline flex items-center">
          <FaArrowLeft className="mr-2" /> Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
          {/* Product image placeholder */}
          <div className="text-6xl text-gray-400">
            <FaShoppingCart />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-xl text-gray-600">by {product.author}</p>
          </div>

          <div className="flex items-center">
            {renderStars(product.rating)}
            <span className="ml-2 text-gray-600">
              {product.rating} ({product.reviews.length} reviews)
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-2xl font-bold">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="ml-2 text-lg text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="space-y-4">
            <p>{product.description}</p>
            <p>{product.fullDescription}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.inStock ? 99 : 0}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-3 py-2 border rounded-md"
                disabled={!product.inStock}
              />
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`btn btn-primary mt-6 ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FaShoppingCart className="inline mr-2" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>

          {/* Product Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-3">Product Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Publisher</p>
                <p>{product.publisher}</p>
              </div>
              <div>
                <p className="text-gray-600">Publish Date</p>
                <p>{product.publishDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Pages</p>
                <p>{product.pages}</p>
              </div>
              <div>
                <p className="text-gray-600">Language</p>
                <p>{product.language}</p>
              </div>
              <div>
                <p className="text-gray-600">ISBN</p>
                <p>{product.isbn}</p>
              </div>
              <div>
                <p className="text-gray-600">Dimensions</p>
                <p>{product.dimensions}</p>
              </div>
              <div>
                <p className="text-gray-600">Weight</p>
                <p>{product.weight}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        {product.reviews.length > 0 ? (
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="bg-white border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold">{review.author}</h3>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet. Be the first to review this product.</p>
        )}
      </div>
    </div>
  )
}

export default ProductDetail
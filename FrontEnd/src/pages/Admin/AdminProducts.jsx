import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaBook } from 'react-icons/fa'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    // Fetch products (in a real app, this would be an API call)
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          price: 12.99,
          originalPrice: 15.99,
          category: 'fiction',
          stock: 45,
          status: 'active',
          image: '/images/gatsby.jpg',
        },
        {
          id: 2,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          price: 14.99,
          originalPrice: 18.99,
          category: 'fiction',
          stock: 32,
          status: 'active',
          image: '/images/mockingbird.jpg',
        },
        {
          id: 3,
          title: '1984',
          author: 'George Orwell',
          price: 13.99,
          originalPrice: 16.99,
          category: 'fiction',
          stock: 28,
          status: 'active',
          image: '/images/1984.jpg',
        },
        {
          id: 4,
          title: 'A Brief History of Time',
          author: 'Stephen Hawking',
          price: 18.99,
          originalPrice: 22.99,
          category: 'science',
          stock: 15,
          status: 'active',
          image: '/images/history-time.jpg',
        },
        {
          id: 5,
          title: 'The Art of War',
          author: 'Sun Tzu',
          price: 9.99,
          originalPrice: 12.99,
          category: 'history',
          stock: 20,
          status: 'active',
          image: '/images/art-war.jpg',
        },
        {
          id: 6,
          title: 'Sapiens: A Brief History of Humankind',
          author: 'Yuval Noah Harari',
          price: 16.99,
          originalPrice: 20.99,
          category: 'history',
          stock: 0,
          status: 'inactive',
          image: '/images/sapiens.jpg',
        },
      ]
      setProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.author.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = 
      selectedCategory ? product.category === selectedCategory : true

    return matchesSearch && matchesCategory
  })

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // In a real app, this would be an API call
      setProducts(products.filter(product => product.id !== id))
    }
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <Link
          to="/admin/products/add"
          className="btn btn-primary flex items-center"
        >
          <FaPlus className="mr-2" /> Add New Product
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
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
                onClick={() => setSelectedCategory('')}
              >
                All
              </button>
              <button
                className={`px-3 py-1 rounded-full ${
                  selectedCategory === 'fiction'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200'
                }`}
                onClick={() => setSelectedCategory('fiction')}
              >
                Fiction
              </button>
              <button
                className={`px-3 py-1 rounded-full ${
                  selectedCategory === 'science'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200'
                }`}
                onClick={() => setSelectedCategory('science')}
              >
                Science
              </button>
              <button
                className={`px-3 py-1 rounded-full ${
                  selectedCategory === 'history'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200'
                }`}
                onClick={() => setSelectedCategory('history')}
              >
                History
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                        <FaBook className="text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.author}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${product.price}
                      {product.originalPrice > product.price && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.stock}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProducts
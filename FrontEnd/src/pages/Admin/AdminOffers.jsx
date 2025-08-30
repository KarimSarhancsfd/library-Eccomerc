import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaPercent, FaGift, FaTag } from 'react-icons/fa'

const AdminOffers = () => {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch offers (in a real app, this would be an API call)
    setTimeout(() => {
      const mockOffers = [
        {
          id: 1,
          title: 'Summer Reading Sale',
          type: 'percentage',
          value: 20,
          description: 'Get 20% off on all fiction books',
          startDate: '2023-06-01',
          endDate: '2023-06-30',
          status: 'active',
          products: [1, 2, 3], // Fiction books
        },
        {
          id: 2,
          title: 'New Customer Discount',
          type: 'fixed',
          value: 5,
          description: '$5 off on your first order',
          startDate: '2023-01-01',
          endDate: '2023-12-31',
          status: 'active',
          products: [], // All products
        },
        {
          id: 3,
          title: 'Science Bundle',
          type: 'bundle',
          value: 3,
          description: 'Buy 2 science books, get 1 free',
          startDate: '2023-05-01',
          endDate: '2023-08-31',
          status: 'active',
          products: [4], // Science books
        },
        {
          id: 4,
          title: 'Holiday Special',
          type: 'percentage',
          value: 15,
          description: '15% off on all history books',
          startDate: '2022-12-01',
          endDate: '2022-12-25',
          status: 'expired',
          products: [5, 6], // History books
        },
      ]
      setOffers(mockOffers)
      setLoading(false)
    }, 1000)
  }, [])

  const handleDeleteOffer = (id) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      // In a real app, this would be an API call
      setOffers(offers.filter(offer => offer.id !== id))
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getOfferIcon = (type) => {
    switch (type) {
      case 'percentage':
        return <FaPercent className="text-indigo-500" />
      case 'fixed':
        return <FaTag className="text-green-500" />
      case 'bundle':
        return <FaGift className="text-yellow-500" />
      default:
        return <FaPercent />
    }
  }

  const getOfferValue = (offer) => {
    switch (offer.type) {
      case 'percentage':
        return `${offer.value}%`
      case 'fixed':
        return `$${offer.value}`
      case 'bundle':
        return `Buy ${offer.value - 1}, get 1 free`
      default:
        return ''
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
        <h1 className="text-2xl font-bold">Offers Management</h1>
        <Link
          to="/admin/offers/add"
          className="btn btn-primary flex items-center"
        >
          <FaPlus className="mr-2" /> Create New Offer
        </Link>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  {getOfferIcon(offer.type)}
                  <h3 className="ml-2 text-lg font-bold">{offer.title}</h3>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  offer.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : offer.status === 'expired'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{offer.description}</p>

              <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-bold text-primary">
                  {getOfferValue(offer)}
                </div>
              </div>

              <div className="text-sm text-gray-500 mb-4">
                <div>Valid: {formatDate(offer.startDate)} - {formatDate(offer.endDate)}</div>
                <div className="mt-1">
                  Products: {offer.products.length > 0 ? offer.products.length : 'All'}
                </div>
              </div>

              <div className="flex justify-between">
                <Link
                  to={`/admin/offers/edit/${offer.id}`}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={() => handleDeleteOffer(offer.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {offers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No offers found.</p>
        </div>
      )}
    </div>
  )
}

export default AdminOffers
import { useState, useEffect } from 'react'
import { FaSearch, FaFilter, FaFileExcel, FaEye, FaCheck, FaTimes } from 'react-icons/fa'
import * as XLSX from 'xlsx'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Fetch orders (in a real app, this would be an API call)
    setTimeout(() => {
      const mockOrders = [
        {
          id: 1001,
          customerName: 'John Doe',
          customerEmail: 'john.doe@example.com',
          total: 45.97,
          status: 'delivered',
          date: '2023-06-15',
          paymentMethod: 'cod',
          items: [
            { id: 1, title: 'The Great Gatsby', quantity: 1, price: 12.99 },
            { id: 2, title: 'To Kill a Mockingbird', quantity: 2, price: 16.49 },
          ],
        },
        {
          id: 1002,
          customerName: 'Jane Smith',
          customerEmail: 'jane.smith@example.com',
          total: 28.98,
          status: 'processing',
          date: '2023-06-14',
          paymentMethod: 'cod',
          items: [
            { id: 3, title: '1984', quantity: 1, price: 13.99 },
            { id: 4, title: 'A Brief History of Time', quantity: 1, price: 14.99 },
          ],
        },
        {
          id: 1003,
          customerName: 'Robert Johnson',
          customerEmail: 'robert.j@example.com',
          total: 16.99,
          status: 'shipped',
          date: '2023-06-12',
          paymentMethod: 'cod',
          items: [
            { id: 5, title: 'The Art of War', quantity: 1, price: 9.99 },
            { id: 6, title: 'Sapiens', quantity: 1, price: 7.00 },
          ],
        },
        {
          id: 1004,
          customerName: 'Emily Davis',
          customerEmail: 'emily.davis@example.com',
          total: 32.97,
          status: 'pending',
          date: '2023-06-10',
          paymentMethod: 'cod',
          items: [
            { id: 1, title: 'The Great Gatsby', quantity: 1, price: 12.99 },
            { id: 3, title: '1984', quantity: 1, price: 19.98 },
          ],
        },
        {
          id: 1005,
          customerName: 'Michael Wilson',
          customerEmail: 'm.wilson@example.com',
          total: 24.98,
          status: 'cancelled',
          date: '2023-06-08',
          paymentMethod: 'cod',
          items: [
            { id: 2, title: 'To Kill a Mockingbird', quantity: 1, price: 14.99 },
            { id: 4, title: 'A Brief History of Time', quantity: 1, price: 9.99 },
          ],
        },
      ]
      setOrders(mockOrders)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toString().includes(searchQuery) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = 
      statusFilter === 'all' ? true : order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const exportToExcel = () => {
    // Prepare data for export
    const exportData = filteredOrders.map(order => ({
      'Order ID': order.id,
      'Customer Name': order.customerName,
      'Customer Email': order.customerEmail,
      'Total': order.total,
      'Status': order.status,
      'Date': order.date,
      'Payment Method': order.paymentMethod,
      'Items': order.items.map(item => `${item.title} (x${item.quantity})`).join(', '),
    }))

    // Create a workbook and add the data
    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Orders')

    // Generate and download the Excel file
    XLSX.writeFile(wb, 'orders_export.xlsx')
  }

  const updateOrderStatus = (orderId, newStatus) => {
    // In a real app, this would be an API call
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { text: 'Pending', class: 'bg-yellow-100 text-yellow-800' },
      processing: { text: 'Processing', class: 'bg-blue-100 text-blue-800' },
      shipped: { text: 'Shipped', class: 'bg-purple-100 text-purple-800' },
      delivered: { text: 'Delivered', class: 'bg-green-100 text-green-800' },
      cancelled: { text: 'Cancelled', class: 'bg-red-100 text-red-800' },
    }

    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${config.class}`}>
        {config.text}
      </span>
    )
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
        <h1 className="text-2xl font-bold">Orders Management</h1>
        <button
          onClick={exportToExcel}
          className="btn btn-primary flex items-center"
        >
          <FaFileExcel className="mr-2" /> Export to Excel
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by ID, customer name, or email..."
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
                  statusFilter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200'
                }`}
                onClick={() => setStatusFilter('all')}
              >
                All Statuses
              </button>
              <button
                className={`px-3 py-1 rounded-full ${
                  statusFilter === 'pending'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200'
                }`}
                onClick={() => setStatusFilter('pending')}
              >
                Pending
              </button>
              <button
                className={`px-3 py-1 rounded-full ${
                  statusFilter === 'processing'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200'
                }`}
                onClick={() => setStatusFilter('processing')}
              >
                Processing
              </button>
              <button
                className={`px-3 py-1 rounded-full ${
                  statusFilter === 'shipped'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200'
                }`}
                onClick={() => setStatusFilter('shipped')}
              >
                Shipped
              </button>
              <button
                className={`px-3 py-1 rounded-full ${
                  statusFilter === 'delivered'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200'
                }`}
                onClick={() => setStatusFilter('delivered')}
              >
                Delivered
              </button>
              <button
                className={`px-3 py-1 rounded-full ${
                  statusFilter === 'cancelled'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200'
                }`}
                onClick={() => setStatusFilter('cancelled')}
              >
                Cancelled
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      #{order.id}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {order.customerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.customerEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items.map(item => item.title).join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${order.total.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <FaEye />
                      </button>

                      {order.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'processing')}
                            className="text-green-600 hover:text-green-900"
                            title="Mark as Processing"
                          >
                            <FaCheck />
                          </button>
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            className="text-red-600 hover:text-red-900"
                            title="Cancel Order"
                          >
                            <FaTimes />
                          </button>
                        </>
                      )}

                      {order.status === 'processing' && (
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'shipped')}
                          className="text-blue-600 hover:text-blue-900"
                          title="Mark as Shipped"
                        >
                          <FaCheck />
                        </button>
                      )}

                      {order.status === 'shipped' && (
                        <button 
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="text-green-600 hover:text-green-900"
                          title="Mark as Delivered"
                        >
                          <FaCheck />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No orders found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminOrders
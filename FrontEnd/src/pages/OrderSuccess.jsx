import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-green-500 text-5xl mb-4">✓</div>
      <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Thank you for your order. We'll process it shortly and send you a confirmation email.
      </p>
      <div className="space-x-4">
        <button 
          onClick={() => window.location.href = '/'}
          className="btn btn-outline"
        >
          Continue Shopping
        </button>
        <button 
          onClick={() => window.location.href = '/orders'}
          className="btn btn-primary"
        >
          View Orders
        </button>
      </div>
    </div>
  )
}

export default OrderSuccess
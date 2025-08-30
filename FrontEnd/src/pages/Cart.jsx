import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa'

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, totalAmount, itemCount } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <FaShoppingCart className="text-5xl text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some products to your cart to continue.</p>
        <Link to="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4 flex">
              {/* Product Image */}
              <div className="w-24 h-32 bg-gray-200 rounded flex items-center justify-center mr-4">
                <FaShoppingCart className="text-3xl text-gray-400" />
              </div>

              {/* Product Details */}
              <div className="flex-grow">
                <Link to={`/products/${item.id}`} className="text-lg font-bold hover:text-primary">
                  {item.title}
                </Link>
                <p className="text-gray-600 text-sm">by {item.author}</p>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>

                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="btn btn-outline p-1"
                    >
                      <FaMinus />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="btn btn-outline p-1"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Subtotal ({itemCount} items)</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${(totalAmount * 0.08).toFixed(2)}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(totalAmount * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Link to="/checkout" className="btn btn-primary w-full">
            Proceed to Checkout
          </Link>

          <div className="mt-4 text-center">
            <Link to="/products" className="text-primary hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
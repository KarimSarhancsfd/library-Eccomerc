import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { FaCreditCard, FaMapMarkerAlt, FaUser } from 'react-icons/fa'

const Checkout = () => {
  const { cartItems, totalAmount, itemCount, clearCart } = useCart()
  const navigate = useNavigate()

  const [step, setStep] = useState(1) // 1: Contact Info, 2: Shipping, 3: Payment, 4: Review
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'cod',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmitOrder = async () => {
    setLoading(true)

    // Simulate API call to place order
    setTimeout(() => {
      // Create order object
      const order = {
        id: Date.now(),
        items: cartItems,
        subtotal: totalAmount,
        tax: totalAmount * 0.08,
        total: totalAmount * 1.08,
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        paymentMethod: formData.paymentMethod,
        status: 'pending',
        orderDate: new Date().toISOString(),
      }

      // In a real app, this would be sent to the backend
      console.log('Order placed:', order)

      // Clear cart and show success message
      clearCart()
      setOrderPlaced(true)
      setLoading(false)
    }, 1500)
  }

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      handleSubmitOrder()
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Thank you for your order. We'll process it shortly and send you a confirmation email.
        </p>
        <div className="space-x-4">
          <button 
            onClick={() => navigate('/')}
            className="btn btn-outline"
          >
            Continue Shopping
          </button>
          <button 
            onClick={() => navigate('/orders')}
            className="btn btn-primary"
          >
            View Orders
          </button>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some products to your cart to continue.</p>
        <button 
          onClick={() => navigate('/products')}
          className="btn btn-primary"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= num ? 'bg-primary text-white' : 'bg-gray-200'
                  }`}>
                    {num}
                  </div>
                  <span className={`ml-2 text-sm ${
                    step >= num ? 'font-medium' : 'text-gray-500'
                  }`}>
                    {num === 1 && 'Contact'}
                    {num === 2 && 'Shipping'}
                    {num === 3 && 'Payment'}
                    {num === 4 && 'Review'}
                  </span>
                  {num < 4 && (
                    <div className={`w-16 h-1 mx-4 ${
                      step > num ? 'bg-primary' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Contact Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleNextStep}
                    className="btn btn-primary"
                  >
                    Continue to Shipping
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Shipping Information */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                <div className="flex items-center mb-4">
                  <FaMapMarkerAlt className="text-primary mr-2" />
                  <h3 className="font-medium">Shipping Address</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={handlePrevStep}
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="btn btn-primary"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="cod" className="font-medium">
                        Cash on Delivery
                      </label>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 ml-6">
                      Pay with cash when your order is delivered.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <label htmlFor="card" className="font-medium flex items-center">
                        <FaCreditCard className="mr-2" />
                        Credit/Debit Card
                      </label>
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div className="mt-4 ml-6 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            className="form-control"
                            required={formData.paymentMethod === 'card'}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              placeholder="MM/YY"
                              className="form-control"
                              required={formData.paymentMethod === 'card'}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV *
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              placeholder="123"
                              className="form-control"
                              required={formData.paymentMethod === 'card'}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={handlePrevStep}
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="btn btn-primary"
                  >
                    Continue to Review
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Review Your Order</h2>

                {/* Order Items */}
                <div className="space-y-4">
                  <h3 className="font-medium">Order Items</h3>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex border-b pb-3">
                      <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center mr-4">
                        <FaCreditCard className="text-xl text-gray-400" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-600">by {item.author}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm">Quantity: {item.quantity}</span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Address */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    Shipping Address
                  </h3>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                    <p>{formData.address}</p>
                    <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center">
                    <FaCreditCard className="mr-2" />
                    Payment Method
                  </h3>
                  <div className="bg-gray-50 p-4 rounded">
                    {formData.paymentMethod === 'cod' ? (
                      <p>Cash on Delivery</p>
                    ) : (
                      <div>
                        <p>Credit Card</p>
                        <p className="text-sm text-gray-600">
                          **** **** **** {formData.cardNumber.slice(-4)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-3">
                  <h3 className="font-medium">Order Summary</h3>
                  <div className="bg-gray-50 p-4 rounded">
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
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${(totalAmount * 1.08).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={handlePrevStep}
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmitOrder}
                    disabled={loading}
                    className="btn btn-primary"
                  >
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex-grow">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3">
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

            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
              <p className="font-medium mb-1">Note:</p>
              <p>Cash on Delivery payment is available for your area.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
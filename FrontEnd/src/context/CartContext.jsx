import React, { createContext, useContext, useReducer } from 'react'

// Create the CartContext
const CartContext = createContext()

// Define the initial state
const initialState = {
  cartItems: [],
  totalAmount: 0,
  itemCount: 0,
}

// Define the cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const newItem = action.payload
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === newItem.id
      )

      let updatedCartItems

      if (existingItemIndex >= 0) {
        // Item already exists in cart, update quantity
        updatedCartItems = [...state.cartItems]
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: updatedCartItems[existingItemIndex].quantity + newItem.quantity,
        }
      } else {
        // New item, add to cart
        updatedCartItems = [...state.cartItems, newItem]
      }

      // Calculate new totals
      const newTotalAmount = updatedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
      const newItemCount = updatedCartItems.reduce(
        (total, item) => total + item.quantity,
        0
      )

      return {
        ...state,
        cartItems: updatedCartItems,
        totalAmount: newTotalAmount,
        itemCount: newItemCount,
      }
    }

    case 'REMOVE_FROM_CART': {
      const itemId = action.payload
      const updatedCartItems = state.cartItems.filter((item) => item.id !== itemId)

      // Calculate new totals
      const newTotalAmount = updatedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
      const newItemCount = updatedCartItems.reduce(
        (total, item) => total + item.quantity,
        0
      )

      return {
        ...state,
        cartItems: updatedCartItems,
        totalAmount: newTotalAmount,
        itemCount: newItemCount,
      }
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload
      const updatedCartItems = state.cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )

      // Calculate new totals
      const newTotalAmount = updatedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )
      const newItemCount = updatedCartItems.reduce(
        (total, item) => total + item.quantity,
        0
      )

      return {
        ...state,
        cartItems: updatedCartItems,
        totalAmount: newTotalAmount,
        itemCount: newItemCount,
      }
    }

    case 'CLEAR_CART':
      return initialState

    default:
      return state
  }
}

// Create the CartProvider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Actions to be used in the application
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId: productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
import React from "react"
import { CheckoutList } from "./CheckoutList"
import { useCart } from "../CartContext/CartContext"
import { CheckoutForm } from "./CheckoutForm"
import { submitCheckout } from '../utils/api'

export interface CheckoutProps {
  useCartHook?: typeof useCart
}

export const Checkout = ({useCartHook=useCart}:CheckoutProps) => {
  const { products, totalPrice, clearCart } = useCartHook()

  const _submit = async () => {
    const { orderId } = await submitCheckout({
      products
    })
    clearCart()
    window.location.assign(`/order/?orderId=${orderId}`)
  }

  return (
    <section className="nes-container with-title">
      <h1 className="title">Checkout</h1>
      <div className="nes-container is-rounded checkout-list-wrapper">
        <p>You are going to buy:</p>
        <CheckoutList products={products} />
        <p>Total: {totalPrice()} Zm</p>
      </div>
      <p>Enter your payment credentials:</p>
      <CheckoutForm submit={_submit} />
    </section>
  )
}

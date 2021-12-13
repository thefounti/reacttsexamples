import React from "react"
import { useCart } from "../CartContext/useCart"
import { Product } from "../shared/types"

export interface ProductProps {
  datum: Product;
  useCartHook?: () => Pick<ReturnType<typeof useCart>, 'products' | 'addToCart'>
}

export const ProductCard = ({ datum, useCartHook = useCart }: ProductProps) => {
  const { addToCart, products } = useCartHook()

  const isInCart = !!products?.find((product) => datum.name === product.name)

  return (
    <div
      className="nes-container is-rounded item"
    >
      <img
        style={{ imageRendering: "pixelated" }}
        src={datum.image}
        width="64px"
        height="64px"
        alt="goblin"
      />
      <p>{datum.name}</p>
      <p>{datum.price} Zm</p>
      {isInCart ? (
        <button disabled className="nes-btn is-disabled">Added to cart</button>
      ) : (
        <button className="nes-btn is-primary"
          onClick={() => {
            addToCart(datum)
          }}
        >Add to cart</button>
      )}
    </div>
  )
}

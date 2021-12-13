import { render } from '@testing-library/react'
import React from 'react'
import { Home } from './Home'
import { ProductCard, ProductProps } from './ProductCard'
import {Category} from '../shared/types'

jest.mock('./ProductCard', () => ({
  ProductCard: ({ datum }: ProductProps) => {
    const { name, price, image } = datum
    return (
      <div>
        {name} {price} {image}
      </div>
    )
  }
}))

describe("Home", () => {
  describe('while loading', () => {
    it("renders loader", () => {
      const mockUseProducts = () => ({
        categories: [],
        isLoading: true,
        error: false
      })

      const { container } = render(<Home useProductsHook={mockUseProducts} />)

      expect(container.innerHTML).toMatch('Loading')
    })
  })
  describe('while data', () => {
    const category:Category ={
      name:"Category Foo",
      items:[
        {
          name:"Product foo",
          price:55,
          image:'/test.jpg'
        }
      ]
    }
    it("render categories with products",() => {
      const mockUseProducts=() => ({
        categories:[category],
        isLoading:false,
        error:false
      })

      const {container}=render(<Home useProductsHook={mockUseProducts}/>)

      expect(container.innerHTML).toMatch("Category Foo"); 
      expect(container.innerHTML).toMatch("Product foo 55 /test.jpg"); 
    })
  })
  describe('while error', () => {
    it("renders error message", () => {
      const mockUseProducts = () => ({
        categories: [],
        isLoading: false,
        error: true
      })

      const { container } = render(<Home useProductsHook={mockUseProducts} />)

      expect(container.innerHTML).toMatch('Error')
    })
  })

})
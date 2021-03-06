import React from "react"
import { Category } from "../shared/types"
import { getProducts } from "../utils/api"


export const useProducts = (apiGetProducts = getProducts) => {
  const [categories, setCategories] = React.useState<Category[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiGetProducts()
        setCategories(data.categories || [])
      } catch (error) {
        setError(error)
      }
      setIsLoading(false)
    }
    fetchProducts()
  }, [])

  return { categories, isLoading, error }
}

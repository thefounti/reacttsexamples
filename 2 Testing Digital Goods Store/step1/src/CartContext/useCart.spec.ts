import { act } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import { json } from "express"
import { Product } from "../shared/types"
import { useCart } from "./useCart"

const localStorageMock = (() => {
    let store: { [key: string]: string } = {}
    return {
        clear: () => {
            store = {}
        },
        getItem: (key: string) => {
            return store[key] || null
        },
        removeItem: (key: string) => {
            delete store[key]
        },
        setItem: jest.fn((key: string, value: string) => {
            store[key] = value ? value.toString() : ""
        })
    }
})()

Object.defineProperty(window, "localStorage", {
    value: localStorageMock
})

describe("useCart", () => {
    afterEach(() => {
        localStorageMock.clear();
    })
    const products: Product[] = [
        {
            name: "Product foo",
            price: 50,
            image: "image.png"
        }
    ]
    describe("on mount", () => {
        it("it loads data from localstorage", () => {

            localStorageMock.setItem("products", JSON.stringify(products));

            const { result } = renderHook(useCart);

            expect(result.current.products).toEqual(products);
        });
    })

    describe("#addToCart", () => {
        it("adds item to the cart", () => {
            const { result } = renderHook(useCart);

            act(() => {
                result.current.addToCart(products[0])
            })
            expect(result.current.products).toEqual([products[0]]);
            expect(localStorageMock.setItem).toHaveBeenCalledWith("products", JSON.stringify([products[0]]))
        });
    })


    describe("#removeFromCart", () => {
        it("removes item from the cart", () => {
            localStorageMock.setItem(
                "products",
                JSON.stringify([products[0]])
            )

            const { result } = renderHook(useCart);

            act(() => {
                result.current.removeFromCart(products[0])
            })

            expect(result.current.products).toEqual([]);
            expect(localStorageMock.setItem).toHaveBeenCalledWith("products", "[]")
        });
    })


    describe("#totalPrice", () => {
        it("returns total products price", () => {

            localStorageMock.setItem("products", JSON.stringify([products[0], products[0]]))

            const { result } = renderHook(useCart);

            expect(result.current.totalPrice()).toEqual(100);

        });
    })


    describe("#clearCart", () => {
        it("removes all products from the cart", () => {
            localStorageMock.setItem(
                "products",
                JSON.stringify([products[0], products[0]])
            )

            const { result } = renderHook(useCart);

            act(() => {
                result.current.clearCart()
            })

            expect(result.current.products).toEqual([])
            expect(localStorageMock.setItem).toHaveBeenCalledWith("products","[]");

        });
    })



})
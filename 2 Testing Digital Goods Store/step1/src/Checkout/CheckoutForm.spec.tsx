import { fireEvent, render } from "@testing-library/react"
import React from "react"
import { act } from "react-dom/test-utils"
import { CheckoutForm } from "./CheckoutForm"

describe("CheckoutForm", () => {
  afterAll(jest.clearAllMocks)
  it("renders correctly", () => {
    const { container } = render(
      <CheckoutForm />
    )

    expect(container.innerHTML).toMatch("Cardholder's Name")
    expect(container.innerHTML).toMatch("Card Number")
    expect(container.innerHTML).toMatch("Expiration Date")
    expect(container.innerHTML).toMatch("CVV")
  })

  describe("with validation errors", () => {
    it("renders error messages", async () => {
      const { container, getByText } = render(
        <CheckoutForm />
      )
      await act(async () => {
        fireEvent.click(getByText("Place order"))
      })

      expect(container.innerHTML).toMatch("Error:")
    })
    it.todo("disables submit button")
  })

  describe("without validation errors", () => {
    describe("on place order button click", () => {
      it("calls submit function with form data", async () => {
        const _mockSubmit = jest.fn();
        const { getByLabelText,getByPlaceholderText, getByText } = render(
          <CheckoutForm submit={_mockSubmit} />
        )

        await act(async () => {
          fireEvent.change(getByLabelText("Cardholder's Name:"), { target: { value: 'Bibo Bobbins' } })
          // fireEvent.change(getByPlaceholderText("John Smith"), { target: { value: 'Bibo Bobbins' } })

          fireEvent.change(getByLabelText('Card Number:'), { target: { value: '0000 0000 0000 0000' } })
          // fireEvent.change(getByPlaceholderText('0000 0000 0000 0000'), { target: { value: '0000 0000 0000 0000' } })

          fireEvent.change(getByLabelText("Expiration Date:"), { target: { value: '3020-05' } })
          // fireEvent.change(getByPlaceholderText("YYYY-MM"), { target: { value: '3020-05' } })

          fireEvent.change(getByLabelText("CVV:"), { target: { value: '123' } })
          // fireEvent.change(getByPlaceholderText("000"), { target: { value: '123' } })
        })

        await act(async () => {
          fireEvent.click(getByText("Place order"))
        })

        expect(_mockSubmit).toHaveBeenCalled();

      });
      it.todo("clears cart")
      it.todo("redirects to order summary page")
    })
  })
})

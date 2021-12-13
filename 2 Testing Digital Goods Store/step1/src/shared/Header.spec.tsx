import { fireEvent } from '@testing-library/dom';
import React from 'react';
import { Header } from './Header';

jest.mock("./CartWidget", () => ({
    CartWidget: () => <div>Cart widget</div>
}))

describe("Header", () => {
    it("renders correctly", () => {
        const { container } = renderWithRouter(() => <Header />);
        expect(container.innerHTML).toMatch("Goblin Store");
        expect(container.innerHTML).toMatch("Cart widget");
    })

    it('navigates to / on header title click', () => {
        const { getByText, history } = renderWithRouter(() => <Header />)
        fireEvent.click(getByText('Goblin Store'));
        expect(history.location.pathname).toEqual('/');
    })
});
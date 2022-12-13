import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'


test('order phases for happy path', async () => {
    //render App
    render(<App />)

    // add ice cream scoop and topping
    const user = userEvent.setup()
    const subtotal = screen.getByText('Scoops total: $', { exact: false })
    expect(subtotal).toHaveTextContent("0.00")

    const vanillaInptut = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    await user.clear(vanillaInptut)
    await user.type(vanillaInptut, '1')

    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' })
    await user.click(cherriesCheckbox)

    //find and click order button
    const orderButton = await screen.findByRole('button', { name: 'Order Sundae!' })
    expect(orderButton).toHaveTextContent('Order Sundae!')
    await user.click(orderButton)
    //check summary information based on order

    const headerPage = screen.getByText('OrderSummary', { exact: false })
    expect(headerPage).toHaveTextContent("OrderSummary")

    const toppingsSubtotal = screen.getByRole("heading", { name: /Toppings: \$/i })
    expect(toppingsSubtotal).toHaveTextContent("1.50")

    const scoopsSubtotal = screen.getByRole("heading", { name: /Scoops: \$/i })
    expect(scoopsSubtotal).toHaveTextContent("2.00")


    const selectionList = await screen.findAllByRole("listitem")
    expect(selectionList).toHaveLength(2)

    const scoopItem = selectionList[0]
    expect(scoopItem).toHaveTextContent("1 Vanilla")

    const toppingItem = selectionList[1]
    expect(toppingItem).toHaveTextContent("Cherries")

    const agreeCheckbox = await screen.findByRole('checkbox', { name: /terms and conditions/i })
    expect(agreeCheckbox).not.toBeChecked();

    const termsAndConditions = screen.getByText(/terms and conditions/i)
    await user.hover(termsAndConditions)
    const popover = screen.getByText(/no ice cream will actually be delivered/i)
    expect(popover).toBeInTheDocument()
    await user.unhover(termsAndConditions)
    // expect(popover).not.toBeInTheDocument()

    const confirmButton = await screen.findByRole('button', { name: 'Confirm order' })
    expect(confirmButton).toHaveTextContent('Confirm order')
    expect(confirmButton).toBeDisabled();
    // accept term and condition and click button to confirm order

    await user.click(agreeCheckbox)
    expect(agreeCheckbox).toBeChecked();

    expect(confirmButton).toBeEnabled();
    await user.click(confirmButton)
    //expect loading to show
    const loading = screen.getByText(/loading/i)
    expect(loading).toBeInTheDocument()

    //confirm order number on confirmation page

    const headerConfirmationPage = await screen.findByRole('heading', { name: 'Thank You!' })
    expect(headerConfirmationPage).toHaveTextContent("Thank You!")
    const newOrderButton = await screen.findByRole('button', { name: 'Create new order' })
    expect(newOrderButton).toHaveTextContent('Create new order')

    // click 'new order' button on confirmation page

    await user.click(newOrderButton)
    //check that scoops and toppings subtotals have been reset
    const scoopToCerototal = screen.getByText('Scoops total: $', { exact: false })
    expect(scoopToCerototal).toHaveTextContent("0.00")
    const toppinToCerototal = screen.getByText('Toppings total: $', { exact: false })
    expect(toppinToCerototal).toHaveTextContent("0.00")
    //do we need to await anithing to avoid test errors?
    await screen.findByRole('spinbutton', { name: 'Vanilla' })
    await screen.findByRole('checkbox', { name: 'Cherries' })
})

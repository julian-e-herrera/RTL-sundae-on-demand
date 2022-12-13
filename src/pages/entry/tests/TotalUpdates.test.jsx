import { render, screen } from "../../../test-utils/testing-library";
import userEvent from '@testing-library/user-event'
import Options from '../Options'
import OrderEntry from '../OrderEntry'

test('update scoop subtotal when scoops change', async () => {
    const user = userEvent.setup()
    render(<Options optionType='scoops' />)

    //make sure total starts out $0,00
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
    expect(scoopsSubtotal).toHaveTextContent("0.00")
    // update vanilla scoops to 1 and check subtotal
    const vanillaInptut = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    await user.clear(vanillaInptut)
    await user.type(vanillaInptut, '1')

    expect(scoopsSubtotal).toHaveTextContent('2.00')


    //update chocolate scoops to 2 and check subtotal

    const chocolateInptut = await screen.findByRole('spinbutton', { name: 'Chocolate' })
    await user.clear(chocolateInptut)
    await user.type(chocolateInptut, '2')

    expect(scoopsSubtotal).toHaveTextContent('6.00')
})



test('update topping subtotal when topping change', async () => {
    const user = userEvent.setup()
    render(<Options optionType='toppings' />)



    //make sure total starts unchecked

    const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false })
    expect(toppingsSubtotal).toHaveTextContent("0.00")
    // update Cherries topping to 1 and check subtotal
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' })
    await user.click(cherriesCheckbox)
    expect(toppingsSubtotal).toHaveTextContent('1.50')

    const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: 'Hot fudge' })
    await user.click(hotFudgeCheckbox)
    expect(toppingsSubtotal).toHaveTextContent('3.00')
    //uncheck and update total
    await user.click(hotFudgeCheckbox)
    expect(toppingsSubtotal).toHaveTextContent('1.50')
})


describe('Grand Total', () => {

    test('grand total updates properly if scoop is added first', async () => {
        const user = userEvent.setup()
        render(<OrderEntry />)
        const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/i })
        expect(grandTotal).toHaveTextContent('0.00')

        const vanillaInptut = await screen.findByRole('spinbutton', { name: 'Vanilla' })
        await user.clear(vanillaInptut)
        await user.type(vanillaInptut, '2')

        expect(grandTotal).toHaveTextContent('4.00')

        const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' })
        await user.click(cherriesCheckbox)
        expect(grandTotal).toHaveTextContent('5.50')

    })
    test('grand total updates properly if topping is added first', async () => {

        const user = userEvent.setup()
        render(<OrderEntry />)
        const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/i })


        const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' })
        await user.click(cherriesCheckbox)
        expect(grandTotal).toHaveTextContent('1.50')

        const vanillaInptut = await screen.findByRole('spinbutton', { name: 'Vanilla' })
        await user.clear(vanillaInptut)
        await user.type(vanillaInptut, '1')

        expect(grandTotal).toHaveTextContent('3.50')
    })
    test('grand total updates properly if item is removed', async () => {

        const user = userEvent.setup()
        render(<OrderEntry />)
        const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/i })


        const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' })
        await user.click(cherriesCheckbox)
        // expect(grandTotal).toHaveTextContent('1.50')

        const vanillaInptut = await screen.findByRole('spinbutton', { name: 'Vanilla' })
        await user.clear(vanillaInptut)
        await user.type(vanillaInptut, '2')

        //remove one
        await user.clear(vanillaInptut)
        await user.type(vanillaInptut, '1')

        //check total

        expect(grandTotal).toHaveTextContent('3.50')

        //remove another
        await user.click(cherriesCheckbox)

        //check total

        expect(grandTotal).toHaveTextContent('2.00')
    })
})
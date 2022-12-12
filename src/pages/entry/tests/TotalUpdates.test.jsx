import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Options from '../Options'
import { OrderDetailsProvider } from '../../../contexts/OrderDetails'

test('update scoop subtotal when scoops change', async () => {
    const user = userEvent.setup()
    render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider })

    //make sure total starts out $0,00
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
    expect(scoopsSubtotal).toHaveTextContent("0.00")
    // update vanilla scoops to 1 and check subtotal
    const vanillaIptut = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    await user.clear(vanillaIptut)
    await user.type(vanillaIptut, '1')

    expect(scoopsSubtotal).toHaveTextContent('2.00')


    //update chocolate scoops to 2 and check subtotal

    const chocolateIptut = await screen.findByRole('spinbutton', { name: 'Chocolate' })
    await user.clear(chocolateIptut)
    await user.type(chocolateIptut, '2')

    expect(scoopsSubtotal).toHaveTextContent('6.00')
})
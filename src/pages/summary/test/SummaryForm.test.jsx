import SummaryForm from '../SummaryForm'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('Checkbox is unchecked by default', () => {

    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked();
})

test('Checking checkbox enables button', async () => {
    const user = userEvent.setup()
    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    expect(checkbox).toBeChecked();
})

test('Unchecking checkbox again disables button', async () => {
    const user = userEvent.setup()
    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox')
    const button = screen.getByRole('button')
    await user.click(button)
    expect(checkbox).not.toBeChecked();
})

test('Popover responds to hover', async () => {
    const user = userEvent.setup()

    render(<SummaryForm />)
    // popover starts out hidden
    const nullPopover = screen.queryByText(/no ice cream will be delivered/i)
    expect(nullPopover).not.toBeInTheDocument()

    //popover appears on mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i)
    await user.hover(termsAndConditions)

    const popover = screen.getByText(/no ice cream will actually be delivered/i)
    expect(popover).toBeInTheDocument()

    //popover disappears when we mouse out 
    await user.unhover(termsAndConditions)
    expect(popover).not.toBeInTheDocument()
})
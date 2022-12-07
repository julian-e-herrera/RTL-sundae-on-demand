import SummaryForm from '../SummaryForm'
import { render, screen, fireEvent } from '@testing-library/react'


test('Checkbox is unchecked by default', () => {

    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked();
})

test('Checking checkbox enables button', () => {

    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked();
})

test('Unchecking checkbox again disables button', () => {

    render(<SummaryForm />)
    const checkbox = screen.getByRole('checkbox')
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(checkbox).not.toBeChecked();
})

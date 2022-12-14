
import { render, screen, waitFor } from '../../../test-utils/testing-library'
import OrderEntry from '../OrderEntry'
import { rest } from 'msw'
import { server } from '../../../mocks/server'


test("handles error for scoops and topping routes", async () => {
    //this is how reset handlers
    server.resetHandlers(
        rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
            res(ctx.status(500))
        ),
        rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
            res(ctx.status(500)))
    )

    render(<OrderEntry />)
    //this waitFor is a callback to wait for all responses to be succeded
    await waitFor(async () => {
        const alerts = await screen.findAllByRole('alert')
        expect(alerts).toHaveLength(2)
    }
    )


})
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const SummaryForm = () => {
    const [tcChecked, setTcChecked] = useState(false)

    const checkboxLabel = (
        <span>
            I agree to <span style={{ color: 'blue' }}>Term and conditions</span>
        </span>
    )
    return (
        <Form>
            <Form.Group controlId='term-and-conditions'>
                <Form.Check
                    type='checkbox'
                    checked={tcChecked}
                    onChange={(e) => setTcChecked(e.target.checked)}
                    label={checkboxLabel}
                />
            </Form.Group>
            <Button
                variant='primary'
                type='submit'
                disabled={!tcChecked}>
                Confirm order
            </Button>

        </Form>
    )
}

export default SummaryForm
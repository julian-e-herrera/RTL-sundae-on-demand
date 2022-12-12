import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useOrderDetails } from '../../contexts/OrderDetails'

const ScoopOption = ({ name, imagePath }) => {

    const { updateItemCount } = useOrderDetails()

    const handlerChange = (e) => {
        updateItemCount(name, parseInt(e.target.value), "scoops")
    }
    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
            <img
                src={`http://localhost:3030/${imagePath}`}
                alt={`${name} scoop`}
                style={{ width: '75%' }}
            />
            <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: '10px' }}>
                <Form.Label column xs='6' style={{ textAlign: 'right' }}>
                    {name}
                </Form.Label>
                <Col xs='5' style={{ textAlign: 'left' }}>
                    <Form.Control type='number' default={0} onChange={handlerChange} />
                </Col>
            </Form.Group>
        </Col>
    )
}

export default ScoopOption
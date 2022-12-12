import React from 'react'
import Options from './Options'

const OrderEntry = () => {
    return (
        <div>
            <Options optionType='scoops' />
            <Options optionType='topping' />
        </div>
    )
}

export default OrderEntry
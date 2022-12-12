import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";


const OrderDetails = createContext()

//cretae custom hook to chekc wheter we re in a provider


export const useOrderDetails = () => {
    const contextValue = useContext(OrderDetails)

    if (!contextValue)
    {
        throw new Error("useOrderDetails must be called from within OrderDetailsProvider")
    }
    return contextValue
}

export const OrderDetailsProvider = (props) => {
    const [optionCounts, setOptionsCounts] = useState({
        scoops: {},//ex:{Chocolate:1,Vanilla:2}
        toppings: {}//ex : {'Gummi Bears ':1}
    })


    const updateItemCount = (itemName, newItemCount, optionType) => {
        const newOptionCounts = { ...optionCounts }
        newOptionCounts[optionType][itemName] = newItemCount

        setOptionsCounts(newOptionCounts)
    }

    const resetOrder = () => {
        setOptionsCounts({
            scoops: {},
            toppings: {}
        })
    }

    // utility function to derive totals from optionCounts state value
    const calculateTotal = (optionType) => {
        // get an array of count for the option type 
        const countArray = Object.values(optionCounts[optionType])

        // total the values in the array of counts for the number of items
        const totalCount = countArray.reduce((total, value) => total + value, 0)

        // multiply the total number of items by the price for this item type 

        return totalCount * pricePerItem[optionType]

    }

    const totals = {
        scoops: calculateTotal('scoops'),
        toppings: calculateTotal('toppings'),
    }

    const value = { optionCounts, totals, updateItemCount, resetOrder }
    return <OrderDetails.Provider value={value} {...props} />
}
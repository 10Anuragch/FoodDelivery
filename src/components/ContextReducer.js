import React, { useReducer, useContext, createContext } from 'react';

// Create contexts
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    qty: action.qty,
                    size: action.size,
                    price: action.price,
                    img: action.img
                }
            ];

        case "REMOVE":
            const updatedArr = [...state];
            updatedArr.splice(action.index, 1);
            return updatedArr;

        case "DROP":
            return []; // empty the cart

        case "UPDATE":
            const updatedState = [...state];
            const itemIndex = updatedState.findIndex(item => item.id === action.id && item.size === action.size);

            if (itemIndex !== -1) {
                const item = updatedState[itemIndex];
                updatedState[itemIndex] = {
                    ...item,
                    qty: item.qty + parseInt(action.qty),
                    price: item.price + action.price
                };
            }

            return updatedState;

        default:
            console.log("Error in Reducer: Unknown action type");
            return state;
    }
};

// Provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

// Custom hooks with fallback
export const useCart = () => useContext(CartStateContext) || [];
export const useDispatchCart = () => useContext(CartDispatchContext);

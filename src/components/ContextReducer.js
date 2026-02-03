
import React, { useReducer, useContext, createContext } from 'react';


const CartStateContext = createContext();
const CartDispatchContext = createContext();


const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    qty: parseInt(action.qty, 10),
                    size: action.size,
                    price: action.price,
                    img: action.img
                }
            ];

        case "REMOVE": {
            const updatedArr = [...state];
            updatedArr.splice(action.index, 1);
            return updatedArr;
        }

        case "DROP":
            return [];

        case "UPDATE": {
            const updatedState = [...state];

            const findIndex = (it) => {
                if (action.size !== undefined && action.size !== null && action.size !== "") {
                    return it.id === action.id && it.size === action.size;
                }
                return it.id === action.id;
            };
            const itemIndex = updatedState.findIndex(findIndex);

            if (itemIndex !== -1) {
                const item = updatedState[itemIndex];
                const addedQty = parseInt(action.qty, 10);
                const addedPrice = Number(action.price);
                updatedState[itemIndex] = {
                    ...item,
                    qty: item.qty + addedQty,
                    price: item.price + addedPrice
                };
            } else {
                // If an update couldn't find an existing item, add it instead (robust fallback)
                updatedState.push({
                    id: action.id,
                    name: action.name || "Item",
                    qty: parseInt(action.qty || 1, 10),
                    size: action.size || "",
                    price: action.price || 0,
                    img: action.img || ""
                });
            }

            return updatedState;
        }

        default:
            console.error("Error in Reducer: Unknown action type", action.type);
            return state;
    }
};

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

export const useCart = () => useContext(CartStateContext) || [];
export const useDispatchCart = () => useContext(CartDispatchContext);

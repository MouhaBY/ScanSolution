const initialState = { inventoryRows: [] }

function toggleInventoryRow(state = initialState, action) {
    let nextState
    switch(action.type){
        case 'ADD_ROW_INV':
            nextState = {
                ...state,
                inventoryRows: [...state.inventoryRows, action.value]
                        }
            return nextState || state
        default: 
            return state
    }
}

export default toggleInventoryRow
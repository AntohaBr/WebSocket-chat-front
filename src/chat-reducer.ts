
const initialState = {
    messages: []
}

const chatReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case 'MESSAGES_RECEIVED': {
            return {...state, messages: action.messages}
        }
        case 'NEW_MESSAGE_RECEIVED': {
            return {...state, messages: [...state.messages, action.messages]}
        }
        default:
            return state
    }
}


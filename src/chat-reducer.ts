import {api} from './api'
import {AppThunkType, InferActionsTypes} from './store'

const initialState = {
    messages: [] as MessagesType [],
    typingUser: [] as UserType []
}

export const chatReducer = (state: ChatReducerStateType = initialState, action: ChatActionType): ChatReducerStateType => {
    switch (action.type) {
        case 'MESSAGES_RECEIVED': {
            return {...state, messages: action.messages}
        }
        case 'NEW_MESSAGE_RECEIVED': {
            return {...state, messages: [...state.messages, action.message],
                typingUser: state.typingUser.filter(u => u.id !== action.message.user.id)
            }
        }
        case 'TYPING_USER_ADDED': {
            return {...state, typingUser: [...state.typingUser.filter(u => u.id !== action.user.id), action.user]}
        }
        default:
            return state
    }
}

export const chatAction = {
    messagesReceived: (messages: MessagesType []) => ({type: 'MESSAGES_RECEIVED', messages}) as const,
    newMessageReceived: (message: any) => ({type: 'NEW_MESSAGE_RECEIVED', message}) as const,
    typingUserAdded: (user: UserType) => ({type: 'TYPING_USER_ADDED', user}) as const
}


export const createConnection = (): AppThunkType => (dispatch) => {
    api.createConnection()
    api.subscribe((messages: MessagesType []) => {
            dispatch(chatAction.messagesReceived(messages))
        },
        (message: string) => {
            dispatch(chatAction.newMessageReceived(message))
        },
        (user: UserType) => {
            dispatch(chatAction.typingUserAdded(user))
        }
    )
}

export const setClientName = (name: string): AppThunkType => (dispatch) => {
    api.sendName(name)
}

export const sendMessage = (message: string): AppThunkType => (dispatch) => {
    api.sendMessage(message)
}

export const destroyConnection = (): AppThunkType => (dispatch) => {
    api.destroyConnection()
}

export const typeMessage = (): AppThunkType => (dispatch) => {
    api.typeMessage()
}


type ChatReducerStateType = typeof initialState
export type ChatActionType = InferActionsTypes<typeof chatAction>

export type MessagesType = {
    message: string
    id: string
    user: UserType
}

export type UserType = {
    id: string
    name: string
}
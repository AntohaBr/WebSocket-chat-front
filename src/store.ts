import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {ChatActionType, chatReducer} from './chat-reducer'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'

const rootReducer = combineReducers({
    chat: chatReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))


//type
export type RootReducerType = ReturnType<typeof rootReducer>
export type AppActionsType = ChatActionType

export type AppDispatchType = ThunkDispatch<RootReducerType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootReducerType, unknown, AppActionsType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never


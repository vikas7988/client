import {legacy_createStore, applyMiddleware} from 'redux'
import {combineReducers} from 'redux'
import graphReducer from './graphReducer'
import thunk from 'redux-thunk'
import {logger} from "redux-logger"


const comreducer = combineReducers({

    graphData:graphReducer
})


export const reduxstore = legacy_createStore(comreducer, applyMiddleware(logger,thunk))
import { createContext, useReducer, useMemo } from 'react'
import * as ActionTypes from '../ActionTypes'

const INIT_STATE = {
  multiCounter: []
}

const INITIAL_MULTI_COUNTER = {
  count: 0
}

const multiCountReducer = (state, action) => {
  switch(action.type) {
    case ActionTypes.MULTI_COUNTER_INIT: {
      return {
        ...state,
        multiCounter: new Array(action.number).fill().map(() => ({ ...INITIAL_MULTI_COUNTER }))
      }
    }
    case ActionTypes.MULTI_COUNTER_UPDATE: {
      const result = state.multiCounter.toSpliced(
        action.index,
        1,
        { ...state.multiCounter[action.index], count: action.payload}
      )
      return {
        ...state,
        multiCounter: result
      }
    }
    default: return state
  }
}

export const MultiCountContext = createContext()
MultiCountContext.displayName = 'MultiCountContext'

export const MultiCountContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(multiCountReducer, INIT_STATE)

  const value = useMemo(() => ({
    ...state,
    initMultiCounter: (number) => {
      dispatch({ type: ActionTypes.MULTI_COUNTER_INIT, number })
    },
    updateMultiCounter: (index, payload) => {
      dispatch({
        type: ActionTypes.MULTI_COUNTER_UPDATE,
        index,
        payload
      })
    }
  }), [state])

  return (
    <MultiCountContext.Provider value={value}>
      {children}
    </MultiCountContext.Provider>
  )
}
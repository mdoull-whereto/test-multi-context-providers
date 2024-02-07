import { createContext, useReducer, useMemo } from 'react'
import * as ActionTypes from './ActionTypes'

const INIT_STATE = {
  count: 0,
  multiCounter: [],
  notes: []
}

const INITIAL_MULTI_COUNTER = {
  count: 0,
}

const globalReducer = (state, action) => {
  switch(action.type) {
    case ActionTypes.COUNTER_INCREMENT: {
      return {
        ...state,
        count: state.count + 1
      }
    }
    case ActionTypes.COUNTER_DECREMENT: {
      return {
        ...state,
        count: state.count - 1
      }
    }
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
    case ActionTypes.NOTE_ADD: {
      const newnotes = [...state.notes, action.payload]

      return {
        ...state,
        notes: [...state.notes, action.payload]
      }
    }
    case ActionTypes.NOTE_DELETE: {
      return {
        ...state,
        notes: state.notes.toSpliced(action.index, 1)
      }
    }
    case ActionTypes.NOTE_EDIT: {
      return {
        ...state,
        notes: state.notes.toSpliced(action.index, 1, action.note)
      }
    }
    default: return state
  }
}

export const GlobalContext = createContext()
GlobalContext.displayName = 'GlobalContext'

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, INIT_STATE);

  const value = useMemo(() => ({
    ...state,
    incrementCount: () => {
      dispatch({ type: ActionTypes.COUNTER_INCREMENT })
    },
    decrementCount: () => {
      dispatch({ type: ActionTypes.COUNTER_DECREMENT })
    },
    initMultiCounter: (number) => {
      dispatch({ type: ActionTypes.MULTI_COUNTER_INIT, number })
    },
    updateMultiCounter: (index, payload) => {
      dispatch({
        type: ActionTypes.MULTI_COUNTER_UPDATE,
        index,
        payload
      })
    },
    noteAdd: (note) => {
      dispatch({
        type: ActionTypes.NOTE_ADD,
        payload: note
      })
    },
    noteDelete: (index) => {
      dispatch({
        type: ActionTypes.NOTE_DELETE,
        index
      })
    },
    noteEdit: (index, note) => {
      dispatch({
        type: ActionTypes.NOTE_EDIT,
        index,
        note
      })
    }
  }), [state])

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}

import { createContext, useReducer, useMemo } from 'react'
import * as ActionTypes from '../ActionTypes'

const INIT_STATE = {
  notes: []
}

const globalReducer = (state, action) => {
  switch(action.type) {
    case ActionTypes.NOTE_ADD: {
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

export const NotesContext = createContext()
NotesContext.displayName = 'NotesContext'

export const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, INIT_STATE);

  const value = useMemo(() => ({
    ...state,
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
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  )
}

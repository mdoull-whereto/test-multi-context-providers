import React, { useCallback, useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/Global'
import { logComponentTime } from '../logging'
import './notes.css'

const EditingNote = ({
  text,
  handler,
  i,
  cancelHandler,
  saveHandler
}) => {
  logComponentTime(`editing note #${i}`)
  return (
    <div className="note__content__text note__content__text--editing">
      <textarea
        onChange={handler}
        value={text}
      />
      <button onClick={saveHandler}>save</button>
      <button onClick={() => cancelHandler(false)}>cancel</button>

    </div>
  )
}
export default function Notes () {
  const {
    noteEdit,
    noteAdd,
    noteDelete,
    notes
  } = useContext(GlobalContext)

  const [currentNote, setCurrentNote] = useState(null)
  const [editingMode, setEditingMode] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [addNoteMode, setAddNoteMode] = useState(false)

  const textEditHandler = useCallback((e) => {
    setCurrentNote(e.target.value)
  }, [])
  const handleSaveEdit = useCallback(() => {
    noteEdit(editingIndex, currentNote)
    setEditingIndex(null)
    setEditingMode(() => false)
    setCurrentNote(null)
  }, [noteEdit, editingIndex, currentNote])
  
  const handleEditingMode = (i) => {
    setEditingMode(true)
    setEditingIndex(i)  
    setCurrentNote(notes[i])
  }
  logComponentTime('notes')

  return (
    <div className="notes">
      <div className="notes__title">NOTES!</div>
      {notes.map((n, i) => {
        return (
        <div className="note" key={i}>
          <div className="note__content">
            <div className="note__content__number"># {i}</div>
            {editingMode && i === editingIndex ? (
              <EditingNote
                i={i}
                text={currentNote}
                cancelHandler={setEditingMode}
                handler={textEditHandler}
                saveHandler={handleSaveEdit}
              />
            ) : (
              <div className="note__content__text">{n}</div>
            )}
          </div>
          <div className="note__buttons">
            <button
              onClick={() => handleEditingMode(i)}
              disabled={editingMode || addNoteMode}
            >
              edit
            </button>
            <button
              onClick={() => noteDelete(i)}
              disabled={editingMode || addNoteMode}
            >
              delete
            </button>
          </div>
        </div>
      )})}
      {addNoteMode && (
        <div>
          <textarea value={currentNote} onChange={textEditHandler} />
          <button
            onClick={() => {
              noteAdd(currentNote)
              setCurrentNote(null)
              setAddNoteMode(false)
            }}
          >
            save
          </button>
          <button
            onClick={() => {
              setCurrentNote(null)
              setAddNoteMode(false)
            }}
          >
            cancel
          </button>
        </div>
      )}
      <div className="notes__buttons">
        <button
          onClick={() => {
            setAddNoteMode(true)
            setCurrentNote('')
          }}
        >
          add
        </button>
      </div>
    </div>
  )
}
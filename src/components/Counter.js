import React, { useCallback, useContext, useMemo } from 'react'
import { logComponentTime } from '../logging'
import { GlobalContext } from '../context/Global'

export default function Counter ({ name, isMultiCounter, index }) {
  const {
    count,
    incrementCount,
    decrementCount,
    multiCounter,
    updateMultiCounter
  } = useContext(GlobalContext)

  const increment = useCallback(() => {
    isMultiCounter ? updateMultiCounter(index, multiCounter[index].count + 1) : incrementCount()
  }, [incrementCount, index, isMultiCounter, multiCounter, updateMultiCounter])
  const decrement = useCallback(() => {
    isMultiCounter ? updateMultiCounter(index, multiCounter[index].count - 1) : decrementCount()
  }, [decrementCount, index, isMultiCounter, multiCounter, updateMultiCounter])

  logComponentTime(`Counter${name ? ' ' + name : ''}`)

  const thisCount = useMemo(() => {
    return isMultiCounter
      ? multiCounter[index]?.count ?? 0
      : count
  }, [count, index, isMultiCounter, multiCounter])
  return (
    <div>
      <div>count is: {thisCount}</div>
      <div>
        <button onClick={increment}>add 1</button>
        <button onClick={decrement}>subtract 1</button>
      </div>
    </div>
  )
}
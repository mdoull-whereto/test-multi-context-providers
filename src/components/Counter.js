import React, { useContext, useMemo } from 'react'

export default function Counter ({ name, index, ctx }) {
  const {
    multiCounter,
    updateMultiCounter
  } = useContext(ctx)

  const thisCount = useMemo(() => multiCounter?.[index]?.count ?? 0, [index, multiCounter])

  return (
    <div>
      <div>count is: {thisCount}</div>
      <div>
        <button onClick={() => updateMultiCounter(index, multiCounter[index]?.count + 1)}>add 1</button>
        <button onClick={() => updateMultiCounter(index, multiCounter[index]?.count - 1)}>subtract 1</button>
      </div>
    </div>
  )
}
import React, { useContext, useRef, useEffect } from 'react'
import Counter from './Counter'
import { GlobalContext } from '../context/Global'
import { logComponentTime } from '../logging'

export default function MultiCounter ({ number }) {
  const counters = useRef()
  const { initMultiCounter } = useContext(GlobalContext)

  useEffect(() => {
    initMultiCounter(number)
  }, [])

  if (!counters.current) {
    counters.current = new Array(number).fill()
  }

  logComponentTime('multi counter')

  return (
    <div>
      {counters.current.map((_, i) => (
        <Counter isMultiCounter index={i} />
      ))}
    </div>
  )
}
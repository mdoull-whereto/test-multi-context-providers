import React, { useContext, useRef, useEffect } from 'react'
import Counter from './Counter'
import { MultiCountContext } from '../context/multi/MultiCounter'
import { logComponentTime } from '../logging'

export default function MultiCounterWithSeparateState ({ number }) {
  const counters = useRef()
  const { initMultiCounter } = useContext(MultiCountContext)

  useEffect(() => {
    initMultiCounter(number)
  }, [])

  if (!counters.current) {
    counters.current = new Array(number).fill()
  }

  logComponentTime('multi counter with separate state')

  return (
    <div>
      {counters.current.map((_, i) => (
        <Counter ctx={MultiCountContext} key={`multss${i}`} index={i} />
      ))}
    </div>
  )
}
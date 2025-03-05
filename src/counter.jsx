import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, reset, incrementByAmount } from './features/counter/counterSlice'

const counter = () => {
    const [amount, setAmount] = useState("")
  const count2 = useSelector((state) => state.counter2.value)
  const dispatch = useDispatch()
  const handelIn = () => {
    dispatch(increment())
  }
  const handelDec = () => {
    dispatch(decrement())
  }
  const handelReset = () => {
    dispatch(reset())
  }
  const handelAmount = () => {
    dispatch(incrementByAmount(Number(amount)))
  }

  return (
    <>
      <button onClick={handelIn}>+</button>
      <p>counter {count2}</p>
      <button onClick={handelDec}>-</button>
      <button onClick={handelReset}>reset</button>
      <br />
      <div>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        <button onClick={handelAmount}> amount by </button>
      </div>
    </>
  )
}

export default counter
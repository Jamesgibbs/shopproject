import { text } from '@fortawesome/fontawesome-svg-core'
import { useState } from 'react'

export default function Counter() {
    const [count, setCount] = useState(0)
    const [amount, setAmount] = useState(1)

    return (
        <div>
            <h1>Counter Component</h1>

            <button onClick={() => setCount((prev) => prev + amount)}> Increment </button>

            <button
                onClick={() => {
                    if (count > 0) {
                        setCount((prev) => prev - 1)
                    }
                }}
            >
                {' '}
                Decrement{' '}
            </button>

            <button onClick={() => setCount((prev) => prev * 2)}> Double </button>

            <button onClick={() => setCount(0)}> Reset </button>

            <h2> Current count: {count} </h2>

            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            />
        </div>
    )
}

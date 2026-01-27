import React from "react"
import { JSX, useState } from 'react'

function UserForm(): JSX.Element {
    const [name, setName] = useState<string>('')
    const [age, setAge] = useState<string>('')

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!name.trim()) {
            alert('Name is required')
            return
        }

        if (Number(age) < 18) {
            alert('You must be at least 18')
            return
        }

        const data = {
            name: name.trim(),
            age: Number(age),
        }

        console.log('Form submitted:', data)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Name:
                    <input
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                        type="text"
                    />
                </label>
            </div>

            <div>
                <label>
                    Age:
                    <input value={age} onChange={(e) => setAge(e.target.value)} type="number" />
                </label>
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}

export default UserForm

"use client"

import { signIn } from "next-auth/react"
import { ChangeEvent, FormEvent, useState } from "react"

export default function RegisterForm() {
  const [formValues, setFormValues] = useState({})

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormValues((old) => ({ ...old, [name]: value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })

      if (!res.ok) return alert("register failed")

      setFormValues({})
      return signIn(undefined, { callbackUrl: "/" })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="shadow-md rounded-md p-6 w-[40vw] bg-white">
      <h3 className="text-xl text-center">Register</h3>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            className="border-b border-b-black py-1 px-2"
            type="text"
            name="name"
            id="name"
            placeholder="John"
            onChange={handleInput}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="border-b border-b-black py-1 px-2"
            name="email"
            id="email"
            placeholder="example@gmail.com"
            onChange={handleInput}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="border-b border-b-black py-1 px-2"
            name="password"
            id="password"
            onChange={handleInput}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirm">Confirm</label>
          <input
            type="password"
            className="border-b border-b-black py-1 px-2"
            name="confirm"
            id="confirm"
            onChange={handleInput}
          />
        </div>
        <div className="text-center">
          <button className="px-6 py-2 bg-sky-600 text-slate-100 rounded-md">
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

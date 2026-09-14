"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import { DashboardShell } from "@/components/common/dashboard-shell"

export default function CreateChapterPage() {
  const [name, setName] = useState("")
  const [saved, setSaved] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaved(name.trim().length > 0)
  }

  return (
    <DashboardShell role="admin">
      <p className="eyebrow">Create chapter</p>
      <h1>Register a chapter.</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Chapter name
          <input
            placeholder="Enter chapter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <button className="button button-primary" type="submit">
          Create chapter
        </button>
        {saved && <p role="status">Chapter ready to be added.</p>}
      </form>
    </DashboardShell>
  )
}

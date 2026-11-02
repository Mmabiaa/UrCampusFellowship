"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/common/dashboard-shell"
import { DenominationForm } from "@/components/admin/denomination-form"

interface Denomination {
  id: string
  name: string
  description?: string
  logo_url?: string
}

export default function DenominationsPage() {
  const [denominations, setDenominations] = useState<Denomination[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingDenom, setEditingDenom] = useState<Denomination | null>(null)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const loadDenominations = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/public/denominations")
      if (res.ok) {
        const data = await res.json()
        setDenominations(data.denominations || [])
      }
    } catch {
      setError("Failed to load denominations.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadDenominations()
  }, [])

  const handleSuccess = () => {
    const action = editingDenom ? "updated" : "created"
    setMessage(`Denomination ${action} successfully!`)
    setTimeout(() => setMessage(""), 4000)
    setEditingDenom(null)
    loadDenominations()
  }

  const openCreateModal = () => {
    setEditingDenom(null)
    setShowModal(true)
  }

  const openEditModal = (denom: Denomination) => {
    setEditingDenom(denom)
    setShowModal(true)
  }

  return (
    <DashboardShell role="admin">
      <div className="dash-header">
        <div>
          <p className="eyebrow">Denominations</p>
          <h1>Manage Denominations</h1>
          <p className="intro">Create and update denominations and their official logos.</p>
        </div>
        <button type="button" className="button button-primary" onClick={openCreateModal}>
          + New Denomination
        </button>
      </div>

      {message && (
        <p
          style={{
            padding: "12px 16px",
            background: "var(--sage)",
            color: "var(--moss)",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          ✓ {message}
        </p>
      )}

      {error && (
        <p
          style={{
            color: "var(--destructive)",
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          {error}
        </p>
      )}

      {isLoading ? (
        <div className="simple-list">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="simple-list-row" style={{ justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
                <div
                  className="skeleton"
                  style={{ width: 44, height: 44, borderRadius: "50%" }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    className="skeleton"
                    style={{ height: "15px", width: "55%", marginBottom: "6px" }}
                  />
                  <div className="skeleton" style={{ height: "13px", width: "70%" }} />
                </div>
              </div>
              <div
                className="skeleton"
                style={{ height: "32px", width: "80px", borderRadius: "12px" }}
              />
            </div>
          ))}
        </div>
      ) : denominations.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--muted-foreground)" }}>
          <p style={{ fontSize: "15px" }}>No denominations yet. Create your first one!</p>
        </div>
      ) : (
        <div className="simple-list">
          {denominations.map((denom) => (
            <div
              key={denom.id}
              className="simple-list-row"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {denom.logo_url ? (
                  <img
                    src={denom.logo_url}
                    alt={denom.name}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "1px solid var(--border)",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "var(--sage)",
                      color: "var(--moss)",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {denom.name[0]}
                  </div>
                )}
                <div>
                  <strong style={{ display: "block", fontSize: "15px" }}>{denom.name}</strong>
                  {denom.description && (
                    <span style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
                      {denom.description}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                className="button button-outline"
                style={{ padding: "6px 14px", fontSize: "13px" }}
                onClick={() => openEditModal(denom)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

      <DenominationForm
        open={showModal}
        onOpenChange={setShowModal}
        denomination={editingDenom}
        onSuccess={handleSuccess}
      />
    </DashboardShell>
  )
}

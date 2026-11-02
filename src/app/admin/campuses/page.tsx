"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/common/dashboard-shell"
import { CampusForm } from "@/components/admin/campus-form"

interface Campus {
  id: string
  name: string
  logo_url?: string
}

export default function CampusesPage() {
  const [campuses, setCampuses] = useState<Campus[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCampus, setEditingCampus] = useState<Campus | null>(null)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const loadCampuses = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/public/campuses")
      if (res.ok) {
        const data = await res.json()
        setCampuses(data.campuses || [])
      }
    } catch {
      setError("Failed to load campuses.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadCampuses()
  }, [])

  const handleSuccess = () => {
    const action = editingCampus ? "updated" : "created"
    setMessage(`Campus ${action} successfully!`)
    setTimeout(() => setMessage(""), 4000)
    setEditingCampus(null)
    loadCampuses()
  }

  const openCreateModal = () => {
    setEditingCampus(null)
    setShowModal(true)
  }

  const openEditModal = (campus: Campus) => {
    setEditingCampus(campus)
    setShowModal(true)
  }

  return (
    <DashboardShell role="admin">
      <div className="dash-header">
        <div>
          <p className="eyebrow">Campus Management</p>
          <h1>Manage Campuses</h1>
          <p className="intro">Create and update university campuses and their logos.</p>
        </div>
        <button type="button" className="button button-primary" onClick={openCreateModal}>
          + New Campus
        </button>
      </div>

      {message && (
        <p
          style={{
            padding: "12px 16px",
            background: "var(--sage)",
            color: "var(--moss)",
            borderRadius: "8px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          ✓ {message}
        </p>
      )}

      {error && (
        <p style={{ color: "var(--destructive)", fontWeight: "bold", marginBottom: "20px" }}>
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
                  <div className="skeleton" style={{ height: "15px", width: "50%" }} />
                </div>
              </div>
              <div
                className="skeleton"
                style={{ height: "32px", width: "80px", borderRadius: "12px" }}
              />
            </div>
          ))}
        </div>
      ) : campuses.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--muted-foreground)" }}>
          <p style={{ fontSize: "15px" }}>No campuses yet. Create your first one!</p>
        </div>
      ) : (
        <div className="simple-list">
          {campuses.map((campus) => (
            <div
              key={campus.id}
              className="simple-list-row"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {campus.logo_url ? (
                  <img
                    src={campus.logo_url}
                    alt={campus.name}
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
                    {campus.name[0]}
                  </div>
                )}
                <div>
                  <strong style={{ display: "block", fontSize: "15px" }}>{campus.name}</strong>
                </div>
              </div>

              <button
                type="button"
                className="button button-outline"
                style={{ padding: "6px 14px", fontSize: "13px" }}
                onClick={() => openEditModal(campus)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

      <CampusForm
        open={showModal}
        onOpenChange={setShowModal}
        campus={editingCampus}
        onSuccess={handleSuccess}
      />
    </DashboardShell>
  )
}

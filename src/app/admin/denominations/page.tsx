"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/common/dashboard-shell"

interface Denomination {
  id: string
  name: string
  description?: string
  logo_url?: string
}

export default function DenominationsPage() {
  const [denominations, setDenominations] = useState<Denomination[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingDenom, setEditingDenom] = useState<Denomination | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo_url: "",
  })

  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const loadDenominations = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/public/denominations')
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError("")

    try {
      const uploadData = new FormData()
      uploadData.append('file', file)

      const res = await fetch('/api/uploads/logo', {
        method: 'POST',
        body: uploadData,
      })

      const data = await res.json()
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, logo_url: data.url }))
        setMessage("Logo image uploaded successfully!")
      } else {
        setError(data.error || "Failed to upload image.")
      }
    } catch {
      setError("Network error uploading image.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      setError("Denomination name is required.")
      return
    }

    setIsSaving(true)
    setError("")
    setMessage("")

    try {
      const res = await fetch('/api/admin/denominations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to save denomination.")
        setIsSaving(false)
        return
      }

      setMessage(editingDenom ? "Denomination updated!" : "Denomination created successfully!")
      setFormData({ name: "", description: "", logo_url: "" })
      setShowCreateForm(false)
      setEditingDenom(null)
      setIsSaving(false)
      loadDenominations()

      setTimeout(() => setMessage(""), 4000)
    } catch {
      setError("Network error.")
      setIsSaving(false)
    }
  }

  const openEditForm = (denom: Denomination) => {
    setFormData({
      name: denom.name,
      description: denom.description || "",
      logo_url: denom.logo_url || "",
    })
    setEditingDenom(denom)
    setShowCreateForm(false)
    setError("")
    setMessage("")
  }

  const cancelForm = () => {
    setFormData({ name: "", description: "", logo_url: "" })
    setShowCreateForm(false)
    setEditingDenom(null)
    setError("")
  }

  return (
    <DashboardShell role="admin">
      <div className="dash-header">
        <div>
          <p className="eyebrow">Denominations</p>
          <h1>Manage Denominations & Logos.</h1>
          <p className="intro">
            Create and update denominations and their official logo pictures.
          </p>
        </div>
        <button
          type="button"
          className="button button-primary"
          onClick={() => {
            setShowCreateForm(!showCreateForm)
            setEditingDenom(null)
            setFormData({ name: "", description: "", logo_url: "" })
            setError("")
            setMessage("")
          }}
          style={{ whiteSpace: "nowrap" }}
        >
          {showCreateForm ? "Cancel" : "+ New Denomination"}
        </button>
      </div>

      {message && (
        <p style={{ padding: "12px 16px", background: "var(--sage)", color: "var(--moss)", borderRadius: "8px", fontSize: "14px", fontWeight: "bold", marginBottom: "20px" }}>
          ✓ {message}
        </p>
      )}

      {error && (
        <p style={{ color: "var(--destructive)", fontSize: "14px", fontWeight: "bold", marginBottom: "20px" }}>
          {error}
        </p>
      )}

      {(showCreateForm || editingDenom) && (
        <div style={{
          background: "var(--cream)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          padding: "24px",
          marginBottom: "32px",
          animation: "fadeIn 0.2s ease",
        }}>
          <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>
            {editingDenom ? `Edit Denomination: ${editingDenom.name}` : "Create New Denomination"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="denom-name" style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>
                Denomination Name *
              </label>
              <input
                id="denom-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Assemblies of God Ghana"
                required
                autoFocus
              />
            </div>

            {/* Picture Upload / URL Input */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>
                Denomination Logo (Picture Upload or URL)
              </label>

              <div style={{ display: "flex", gap: "16px", alignItems: "center", marginTop: "8px" }}>
                {formData.logo_url ? (
                  <img
                    src={formData.logo_url}
                    alt="Logo preview"
                    style={{ width: 54, height: 54, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border)" }}
                  />
                ) : (
                  <div style={{ width: 54, height: 54, borderRadius: "50%", background: "var(--sage)", color: "var(--moss)", display: "grid", placeItems: "center", fontWeight: "bold", fontSize: "20px" }}>
                    {formData.name ? formData.name[0] : "D"}
                  </div>
                )}

                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div>
                    <span style={{ fontSize: "12px", color: "var(--muted-foreground)", display: "block", marginBottom: "4px" }}>
                      Upload Picture File:
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      style={{ fontSize: "13px" }}
                    />
                    {isUploading && <small style={{ color: "var(--moss)", display: "block" }}>Uploading picture...</small>}
                  </div>

                  <div>
                    <span style={{ fontSize: "12px", color: "var(--muted-foreground)", display: "block", marginBottom: "4px" }}>
                      Or Image URL:
                    </span>
                    <input
                      type="url"
                      value={formData.logo_url}
                      onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="denom-desc" style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>
                Description (optional)
              </label>
              <textarea
                id="denom-desc"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Optional notes or description about this denomination"
                rows={3}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                className="button button-primary"
                disabled={isSaving || isUploading || !formData.name.trim()}
              >
                {isSaving ? "Saving..." : editingDenom ? "Update Denomination" : "Create Denomination"}
              </button>
              <button
                type="button"
                className="button button-outline"
                onClick={cancelForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div style={{ padding: "64px 0", textAlign: "center", color: "var(--muted-foreground)" }}>
          Loading denominations...
        </div>
      ) : denominations.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--muted-foreground)" }}>
          <p style={{ fontSize: "15px", marginBottom: "8px" }}>No denominations yet</p>
        </div>
      ) : (
        <div className="simple-list">
          {denominations.map((denom) => (
            <div key={denom.id} className="simple-list-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {denom.logo_url ? (
                  <img
                    src={denom.logo_url}
                    alt={denom.name}
                    style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border)" }}
                  />
                ) : (
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--sage)", color: "var(--moss)", display: "grid", placeItems: "center", fontWeight: "bold" }}>
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
                onClick={() => openEditForm(denom)}
              >
                Edit Form
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  )
}

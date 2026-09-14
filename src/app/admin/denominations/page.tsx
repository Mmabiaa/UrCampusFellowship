"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/common/dashboard-shell"
import { denominationRows } from "@/data/chapters"

type Denomination = {
  id: string
  name: string
  description?: string
  chapterCount: number
  campuses: string
}

export default function DenominationsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingDenom, setEditingDenom] = useState<Denomination | null>(null)
  const [formData, setFormData] = useState({ name: "", description: "" })

  // Mock denominations from data
  const denominations: Denomination[] = denominationRows.map(([name, info], index) => ({
    id: String(index + 1),
    name,
    chapterCount: parseInt(info.match(/\d+/)?.[0] || "0"),
    campuses: info.split("·")[0].trim(),
    description: undefined,
  }))

  const handleCreateDenomination = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return
    
    alert(`Denomination "${formData.name}" created successfully.\n\nYou can now create chapter shells under this denomination from the Chapters page.`)
    setFormData({ name: "", description: "" })
    setShowCreateForm(false)
  }

  const handleUpdateDenomination = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !editingDenom) return
    
    alert(`Denomination "${editingDenom.name}" updated to "${formData.name}".`)
    setFormData({ name: "", description: "" })
    setEditingDenom(null)
  }

  const openEditForm = (denom: Denomination) => {
    setFormData({ name: denom.name, description: denom.description || "" })
    setEditingDenom(denom)
    setShowCreateForm(false)
  }

  const cancelForm = () => {
    setFormData({ name: "", description: "" })
    setShowCreateForm(false)
    setEditingDenom(null)
  }

  return (
    <DashboardShell role="admin">
      <div className="dash-header">
        <div>
          <p className="eyebrow">Denominations</p>
          <h1>Manage denominations.</h1>
          <p className="intro">
            Create and organize denominations that chapters belong to. Each chapter
            must be tied to a denomination.
          </p>
        </div>
        <button
          type="button"
          className="button button-primary"
          onClick={() => {
            setShowCreateForm(!showCreateForm)
            setEditingDenom(null)
            setFormData({ name: "", description: "" })
          }}
          style={{ whiteSpace: "nowrap" }}
        >
          {showCreateForm ? "Cancel" : "+ New denomination"}
        </button>
      </div>

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
            {editingDenom ? "Edit denomination" : "Create new denomination"}
          </h3>
          <form onSubmit={editingDenom ? handleUpdateDenomination : handleCreateDenomination}>
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="denom-name" style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
                marginBottom: "6px",
                color: "var(--ink)",
              }}>
                Denomination name *
              </label>
              <input
                id="denom-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Seventh-Day Adventist Church"
                required
                autoFocus
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="denom-desc" style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 500,
                marginBottom: "6px",
                color: "var(--ink)",
              }}>
                Description (optional)
              </label>
              <textarea
                id="denom-desc"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Optional notes about this denomination"
                rows={3}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                className="button button-primary"
                disabled={!formData.name.trim()}
              >
                {editingDenom ? "Update denomination" : "Create denomination"}
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

      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
          {denominations.length} {denominations.length === 1 ? "denomination" : "denominations"}
        </p>
      </div>

      {denominations.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "80px 20px",
          color: "var(--muted-foreground)",
        }}>
          <p style={{ fontSize: "15px", marginBottom: "8px" }}>No denominations yet</p>
          <p style={{ fontSize: "13px" }}>Create your first denomination to get started</p>
        </div>
      ) : (
        <div className="simple-list">
          {denominations.map((denom) => (
            <div key={denom.id} className="simple-list-row" style={{ alignItems: "flex-start" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <strong style={{ display: "block", marginBottom: "4px" }}>
                  {denom.name}
                </strong>
                <span style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
                  {denom.chapterCount} {denom.chapterCount === 1 ? "chapter" : "chapters"} · {denom.campuses}
                </span>
                {denom.description && (
                  <p style={{
                    fontSize: "13px",
                    color: "var(--muted-foreground)",
                    marginTop: "8px",
                    marginBottom: 0,
                    lineHeight: "1.5",
                  }}>
                    {denom.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                className="button button-outline"
                style={{ padding: "6px 14px", fontSize: "13px" }}
                onClick={() => openEditForm(denom)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{
        marginTop: "48px",
        paddingTop: "32px",
        borderTop: "1px solid var(--border)",
      }}>
        <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.65" }}>
          <strong style={{ color: "var(--ink)", display: "block", marginBottom: "8px" }}>
            About denominations
          </strong>
          Denominations are parent organizations that chapters belong to. When you create
          a denomination, it becomes available for selection when creating chapter shells.
          Students browsing fellowships will see chapters organized by denomination. Edit
          with caution — existing chapters depend on their parent denomination.
        </p>
      </div>
    </DashboardShell>
  )
}

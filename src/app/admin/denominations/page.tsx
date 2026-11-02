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
  const [showModal, setShowModal] = useState(false)
  const [editingDenom, setEditingDenom] = useState<Denomination | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo_url: "",
  })

  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
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
        setMessage("Logo uploaded successfully!")
        setTimeout(() => setMessage(""), 3000)
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
      const url = editingDenom ? `/api/admin/denominations/${editingDenom.id}` : '/api/admin/denominations'
      const method = editingDenom ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to save denomination.")
        setIsSaving(false)
        return
      }

      setMessage(editingDenom ? "Denomination updated!" : "Denomination created!")
      setFormData({ name: "", description: "", logo_url: "" })
      setShowModal(false)
      setEditingDenom(null)
      setIsSaving(false)
      loadDenominations()

      setTimeout(() => setMessage(""), 4000)
    } catch {
      setError("Network error.")
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!editingDenom) return

    setIsDeleting(true)
    setError("")
    setMessage("")
    setShowDeleteModal(false)

    try {
      const res = await fetch(`/api/admin/denominations/${editingDenom.id}`, {
        method: 'DELETE',
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to delete denomination.")
        setIsDeleting(false)
        return
      }

      setMessage("Denomination deleted!")
      setEditingDenom(null)
      setShowModal(false)
      setIsDeleting(false)
      loadDenominations()

      setTimeout(() => setMessage(""), 4000)
    } catch {
      setError("Network error.")
      setIsDeleting(false)
    }
  }

  const openCreateModal = () => {
    setFormData({ name: "", description: "", logo_url: "" })
    setEditingDenom(null)
    setShowModal(true)
    setError("")
    setMessage("")
  }

  const openEditModal = (denom: Denomination) => {
    setFormData({
      name: denom.name,
      description: denom.description || "",
      logo_url: denom.logo_url || "",
    })
    setEditingDenom(denom)
    setShowModal(true)
    setError("")
    setMessage("")
  }

  const closeModal = () => {
    setFormData({ name: "", description: "", logo_url: "" })
    setShowModal(false)
    setEditingDenom(null)
    setError("")
  }

  return (
    <DashboardShell role="admin">
      <div className="dash-header">
        <div>
          <p className="eyebrow">Denominations</p>
          <h1>Manage Denominations</h1>
          <p className="intro">
            Create and update denominations and their official logos.
          </p>
        </div>
        <button
          type="button"
          className="button button-primary"
          onClick={openCreateModal}
        >
          + New Denomination
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

      {isLoading ? (
        <div className="simple-list">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="simple-list-row" style={{ justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
                <div className="skeleton" style={{ width: 44, height: 44, borderRadius: "50%" }} />
                <div style={{ flex: 1 }}>
                  <div className="skeleton" style={{ height: "15px", width: "55%", marginBottom: "6px" }} />
                  <div className="skeleton" style={{ height: "13px", width: "70%" }} />
                </div>
              </div>
              <div className="skeleton" style={{ height: "32px", width: "80px", borderRadius: "12px" }} />
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
                onClick={() => openEditModal(denom)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <>
          <div className="modal-overlay" onClick={closeModal} />
          <div className="modal-card" role="dialog" aria-modal="true">
            <div className="modal-header">
              <h3>{editingDenom ? "Edit Denomination" : "New Denomination"}</h3>
              <button
                type="button"
                onClick={closeModal}
                className="modal-close"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-field">
                  <label htmlFor="denom-name">Denomination Name *</label>
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

                <div className="form-field">
                  <label>Logo</label>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    {formData.logo_url ? (
                      <img
                        src={formData.logo_url}
                        alt="Logo preview"
                        style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--line)" }}
                      />
                    ) : (
                      <div style={{ width: 50, height: 50, borderRadius: "50%", background: "var(--sage)", color: "var(--moss)", display: "grid", placeItems: "center", fontWeight: "bold", fontSize: "18px" }}>
                        {formData.name ? formData.name[0] : "D"}
                      </div>
                    )}

                    <div style={{ flex: 1 }}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        style={{ fontSize: "13px", marginBottom: "6px" }}
                      />
                      {isUploading && <small style={{ color: "var(--moss)", fontSize: "12px" }}>Uploading...</small>}
                      <input
                        type="url"
                        value={formData.logo_url}
                        onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                        placeholder="Or paste image URL"
                        style={{ fontSize: "13px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="denom-desc">Description (optional)</label>
                  <textarea
                    id="denom-desc"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Optional description"
                    rows={3}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="submit"
                  className="modal-btn btn-primary"
                  disabled={isSaving || isUploading || !formData.name.trim()}
                >
                  {isSaving ? "Saving..." : editingDenom ? "Update" : "Create"}
                </button>
                {editingDenom && (
                  <button
                    type="button"
                    className="modal-btn btn-danger"
                    onClick={() => setShowDeleteModal(true)}
                    disabled={isDeleting || isSaving}
                  >
                    Delete
                  </button>
                )}
                <button
                  type="button"
                  className="modal-btn btn-secondary"
                  onClick={closeModal}
                  disabled={isSaving || isDeleting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && editingDenom && (
        <>
          <div className="modal-overlay" onClick={() => setShowDeleteModal(false)} />
          <div className="modal-card modal-sm">
            <div className="modal-header">
              <h3>Delete Denomination?</h3>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="modal-close"
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <p style={{ margin: 0, fontSize: "14px", color: "var(--muted-foreground)", lineHeight: "1.6" }}>
                Are you sure you want to delete <strong>{editingDenom.name}</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="modal-btn btn-danger"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
              <button
                type="button"
                className="modal-btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(32, 35, 31, 0.6);
          z-index: 999;
          backdrop-filter: blur(2px);
        }

        .modal-card {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border: 2px solid var(--ink);
          border-radius: 10px;
          box-shadow: 4px 4px 0 var(--ink);
          width: min(520px, calc(100vw - 32px));
          max-height: calc(100vh - 60px);
          overflow-y: auto;
          z-index: 1000;
        }

        .modal-sm {
          width: min(420px, calc(100vw - 32px));
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 20px;
          border-bottom: 1px solid var(--line);
          background: var(--sage);
        }

        .modal-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: var(--ink);
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: var(--muted-foreground);
          padding: 4px 8px;
          line-height: 1;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .modal-close:hover {
          background: var(--line);
          color: var(--ink);
        }

        .modal-body {
          padding: 20px;
        }

        .form-field {
          margin-bottom: 18px;
        }

        .form-field:last-child {
          margin-bottom: 0;
        }

        .form-field label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--ink);
        }

        .modal-footer {
          display: flex;
          gap: 10px;
          padding: 16px 20px;
          border-top: 1px solid var(--line);
          background: var(--cream);
        }

        .modal-btn {
          flex: 1;
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          border: 2px solid;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary {
          border-color: var(--moss);
          background: var(--moss);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #3a442f;
          transform: translateY(-1px);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-danger {
          border-color: var(--destructive);
          color: var(--destructive);
          background: white;
        }

        .btn-danger:hover:not(:disabled) {
          background: var(--destructive);
          color: white;
          transform: translateY(-1px);
        }

        .btn-secondary {
          border-color: var(--line);
          background: white;
          color: var(--ink);
        }

        .btn-secondary:hover:not(:disabled) {
          background: var(--line);
        }

        @media (max-width: 768px) {
          .modal-card {
            width: calc(100vw - 24px);
            max-height: calc(100vh - 40px);
          }

          .modal-header {
            padding: 14px 16px;
          }

          .modal-body {
            padding: 16px;
          }

          .modal-footer {
            flex-direction: column;
            padding: 12px 16px;
          }

          .modal-btn {
            width: 100%;
          }
        }
      `}</style>
    </DashboardShell>
  )
}

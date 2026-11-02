"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/common/dashboard-shell"

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

  const [formData, setFormData] = useState({
    name: "",
    logo_url: "",
  })

  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const loadCampuses = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/public/campuses')
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
        setMessage("Logo uploaded!")
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
      setError("Campus name is required.")
      return
    }

    setIsSaving(true)
    setError("")
    setMessage("")

    try {
      const url = editingCampus ? `/api/admin/campuses/${editingCampus.id}` : '/api/admin/campuses'
      const method = editingCampus ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to save campus.")
        setIsSaving(false)
        return
      }

      setMessage(editingCampus ? "Campus updated!" : "Campus created!")
      setFormData({ name: "", logo_url: "" })
      setShowModal(false)
      setEditingCampus(null)
      setIsSaving(false)
      loadCampuses()

      setTimeout(() => setMessage(""), 4000)
    } catch {
      setError("Network error.")
      setIsSaving(false)
    }
  }

  const openCreateModal = () => {
    setFormData({ name: "", logo_url: "" })
    setEditingCampus(null)
    setShowModal(true)
    setError("")
    setMessage("")
  }

  const openEditModal = (campus: Campus) => {
    setFormData({
      name: campus.name,
      logo_url: campus.logo_url || "",
    })
    setEditingCampus(campus)
    setShowModal(true)
    setError("")
    setMessage("")
  }

  const closeModal = () => {
    setFormData({ name: "", logo_url: "" })
    setShowModal(false)
    setEditingCampus(null)
    setError("")
  }

  return (
    <DashboardShell role="admin">
      <div className="dash-header">
        <div>
          <p className="eyebrow">Campus Management</p>
          <h1>Manage Campuses</h1>
          <p className="intro">
            Create and update university campuses and their logos.
          </p>
        </div>
        <button
          type="button"
          className="button button-primary"
          onClick={openCreateModal}
        >
          + New Campus
        </button>
      </div>

      {message && (
        <p style={{ padding: "12px 16px", background: "var(--sage)", color: "var(--moss)", borderRadius: "8px", fontWeight: "bold", marginBottom: "20px" }}>
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
                <div className="skeleton" style={{ width: 44, height: 44, borderRadius: "50%" }} />
                <div style={{ flex: 1 }}>
                  <div className="skeleton" style={{ height: "15px", width: "50%" }} />
                </div>
              </div>
              <div className="skeleton" style={{ height: "32px", width: "80px", borderRadius: "12px" }} />
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
            <div key={campus.id} className="simple-list-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {campus.logo_url ? (
                  <img
                    src={campus.logo_url}
                    alt={campus.name}
                    style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border)" }}
                  />
                ) : (
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--sage)", color: "var(--moss)", display: "grid", placeItems: "center", fontWeight: "bold" }}>
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

      {/* Create/Edit Modal */}
      {showModal && (
        <>
          <div className="modal-overlay" onClick={closeModal} />
          <div className="modal-card" role="dialog" aria-modal="true">
            <div className="modal-header">
              <h3>{editingCampus ? "Edit Campus" : "New Campus"}</h3>
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
                  <label htmlFor="campus-name">Campus Name *</label>
                  <input
                    id="campus-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. UMaT Main Campus"
                    required
                    autoFocus
                  />
                </div>

                <div className="form-field">
                  <label>Campus Logo</label>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    {formData.logo_url ? (
                      <img
                        src={formData.logo_url}
                        alt="Logo preview"
                        style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--line)" }}
                      />
                    ) : (
                      <div style={{ width: 50, height: 50, borderRadius: "50%", background: "var(--sage)", color: "var(--moss)", display: "grid", placeItems: "center", fontWeight: "bold", fontSize: "18px" }}>
                        {formData.name ? formData.name[0] : "C"}
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
              </div>

              <div className="modal-footer">
                <button
                  type="submit"
                  className="modal-btn btn-primary"
                  disabled={isSaving || isUploading || !formData.name.trim()}
                >
                  {isSaving ? "Saving..." : editingCampus ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  className="modal-btn btn-secondary"
                  onClick={closeModal}
                  disabled={isSaving}
                >
                  Cancel
                </button>
              </div>
            </form>
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

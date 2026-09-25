"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/common/dashboard-shell"

interface Option {
  id: string
  name: string
}

interface Chapter {
  id: string
  name: string
  status: string
  meeting_day?: string
  meeting_time?: string
  location?: string
  description?: string
  logo_url?: string
  whatsapp_link?: string
  campuses?: { name: string }
  denominations?: { name: string }
}

export default function AdminChapterPage() {
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [denominations, setDenominations] = useState<Option[]>([])
  const [campuses, setCampuses] = useState<Option[]>([])

  const [isLoading, setIsLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null)
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    denomination_id: "",
    campus_id: "",
    status: "draft",
    meeting_day: "",
    meeting_time: "",
    location: "",
    description: "",
    whatsapp_link: "",
    logo_url: "",
  })

  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const loadData = async () => {
    try {
      setIsLoading(true)
      const [chapRes, denRes, camRes] = await Promise.all([
        fetch('/api/public/chapters'),
        fetch('/api/public/denominations'),
        fetch('/api/public/campuses')
      ])

      if (chapRes.ok) {
        const cData = await chapRes.json()
        setChapters(cData.chapters || [])
      }
      if (denRes.ok) {
        const dData = await denRes.json()
        setDenominations(dData.denominations || [])
      }
      if (camRes.ok) {
        const caData = await camRes.json()
        setCampuses(caData.campuses || [])
      }
    } catch {
      setError("Failed to load chapter management data.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setError("Chapter name is required.")
      return
    }

    setIsSaving(true)
    setError("")
    setMessage("")

    try {
      const res = await fetch('/api/admin/chapters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to save chapter.")
        setIsSaving(false)
        return
      }

      setMessage(editingChapter ? "Chapter updated successfully!" : "Chapter shell created successfully!")
      setShowCreateForm(false)
      setEditingChapter(null)
      setIsSaving(false)
      loadData()

      setTimeout(() => setMessage(""), 4000)
    } catch {
      setError("Network error.")
      setIsSaving(false)
    }
  }

  const openEditForm = (chap: Chapter) => {
    setEditingChapter(chap)
    setFormData({
      name: chap.name,
      denomination_id: chap.denominations ? "" : "",
      campus_id: "",
      status: chap.status,
      meeting_day: chap.meeting_day || "",
      meeting_time: chap.meeting_time || "",
      location: chap.location || "",
      description: chap.description || "",
      whatsapp_link: chap.whatsapp_link || "",
      logo_url: chap.logo_url || "",
    })
    setShowCreateForm(false)
    setError("")
    setMessage("")
  }

  return (
    <DashboardShell role="admin">
      <div className="dash-header">
        <div>
          <p className="eyebrow">Chapter Management</p>
          <h1>Chapters & Logo Pictures</h1>
          <p className="intro">
            Create and edit chapters with custom picture logos and meeting details.
          </p>
        </div>
        <button
          type="button"
          className="button button-primary"
          onClick={() => {
            setShowCreateForm(!showCreateForm)
            setEditingChapter(null)
            setFormData({
              name: "",
              denomination_id: denominations[0]?.id || "",
              campus_id: campuses[0]?.id || "",
              status: "draft",
              meeting_day: "",
              meeting_time: "",
              location: "",
              description: "",
              whatsapp_link: "",
              logo_url: "",
            })
            setError("")
            setMessage("")
          }}
          style={{ whiteSpace: "nowrap" }}
        >
          {showCreateForm ? "Cancel" : "+ New Chapter"}
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

      {(showCreateForm || editingChapter) && (
        <div style={{
          background: "var(--cream)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          padding: "24px",
          marginBottom: "32px",
          animation: "fadeIn 0.2s ease",
        }}>
          <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>
            {editingChapter ? `Update Chapter: ${editingChapter.name}` : "Create Chapter Shell"}
          </h3>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>
                  Chapter Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. PENSA UMaT Chapter"
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="draft">Draft</option>
                  <option value="coming_soon">Coming Soon</option>
                  <option value="active">Active</option>
                </select>
              </div>
            </div>

            {/* Picture Upload / URL Input section */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>
                Chapter Logo (Picture File Upload or Image URL)
              </label>

              <div style={{ display: "flex", gap: "16px", alignItems: "center", marginTop: "8px" }}>
                {formData.logo_url ? (
                  <img
                    src={formData.logo_url}
                    alt="Logo preview"
                    style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border)" }}
                  />
                ) : (
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--sage)", color: "var(--moss)", display: "grid", placeItems: "center", fontWeight: "bold", fontSize: "24px" }}>
                    {formData.name ? formData.name[0] : "C"}
                  </div>
                )}

                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div>
                    <span style={{ fontSize: "12px", color: "var(--muted-foreground)", display: "block", marginBottom: "4px" }}>
                      Upload Logo Picture File:
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={isUploading}
                      style={{ fontSize: "13px" }}
                    />
                    {isUploading && <small style={{ color: "var(--moss)", display: "block" }}>Uploading logo...</small>}
                  </div>

                  <div>
                    <span style={{ fontSize: "12px", color: "var(--muted-foreground)", display: "block", marginBottom: "4px" }}>
                      Or Image URL:
                    </span>
                    <input
                      type="url"
                      value={formData.logo_url}
                      onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                      placeholder="https://example.com/chapter-logo.png"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>
                  Meeting Day
                </label>
                <input
                  type="text"
                  value={formData.meeting_day}
                  onChange={(e) => setFormData({ ...formData, meeting_day: e.target.value })}
                  placeholder="e.g. Wednesday"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>
                  Meeting Time
                </label>
                <input
                  type="text"
                  value={formData.meeting_time}
                  onChange={(e) => setFormData({ ...formData, meeting_time: e.target.value })}
                  placeholder="e.g. 5:30 PM"
                />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Old Lecture Theatre (OLT)"
              />
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
              <button
                type="submit"
                className="button button-primary"
                disabled={isSaving || isUploading || !formData.name.trim()}
              >
                {isSaving ? "Saving..." : editingChapter ? "Update Chapter" : "Create Chapter Shell"}
              </button>
              <button
                type="button"
                className="button button-outline"
                onClick={() => {
                  setShowCreateForm(false)
                  setEditingChapter(null)
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Chapters list */}
      {isLoading ? (
        <div style={{ padding: "64px 0", textAlign: "center", color: "var(--muted-foreground)" }}>
          Loading chapters...
        </div>
      ) : (
        <div className="simple-list">
          {chapters.map((chap) => (
            <div key={chap.id} className="simple-list-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", flex: 1 }}
                onClick={() => setSelectedChapter(chap)}
              >
                {chap.logo_url ? (
                  <img
                    src={chap.logo_url}
                    alt={chap.name}
                    style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border)" }}
                  />
                ) : (
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--sage)", color: "var(--moss)", display: "grid", placeItems: "center", fontWeight: "bold" }}>
                    {chap.name[0]}
                  </div>
                )}
                <div>
                  <strong style={{ display: "block", fontSize: "15px" }}>{chap.name}</strong>
                  <span style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>
                    {chap.denominations?.name || "Fellowship"} • {chap.campuses?.name || "Main Campus"}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{
                  fontSize: "12px",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  background: chap.status === "active" ? "var(--sage)" : "var(--cream)",
                  color: chap.status === "active" ? "var(--moss)" : "var(--muted-foreground)",
                  fontWeight: 500,
                }}>
                  {chap.status}
                </span>

                <button
                  type="button"
                  className="button button-outline"
                  onClick={() => openEditForm(chap)}
                  style={{ padding: "6px 12px", fontSize: "13px" }}
                >
                  Edit Form
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chapter Details Modal */}
      {selectedChapter && (
        <>
          <div className="modal-overlay" onClick={() => setSelectedChapter(null)} />
          <div className="modal-card">
            <div className="modal-head" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {selectedChapter.logo_url ? (
                <img
                  src={selectedChapter.logo_url}
                  alt={selectedChapter.name}
                  style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--sage)", color: "var(--moss)", display: "grid", placeItems: "center", fontWeight: "bold", fontSize: "20px" }}>
                  {selectedChapter.name[0]}
                </div>
              )}
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: "18px", margin: 0 }}>{selectedChapter.name}</h2>
                <p style={{ margin: 0, color: "var(--muted-foreground)", fontSize: "13px" }}>
                  {selectedChapter.denominations?.name}
                </p>
              </div>
              <button type="button" onClick={() => setSelectedChapter(null)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}>×</button>
            </div>

            <div style={{ padding: "16px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <small style={{ color: "var(--muted-foreground)", fontSize: "10px", display: "block" }}>Campus</small>
                <strong>{selectedChapter.campuses?.name || "Main Campus"}</strong>
              </div>
              <div>
                <small style={{ color: "var(--muted-foreground)", fontSize: "10px", display: "block" }}>Status</small>
                <strong style={{ color: selectedChapter.status === "active" ? "var(--moss)" : "inherit" }}>{selectedChapter.status}</strong>
              </div>
              <div>
                <small style={{ color: "var(--muted-foreground)", fontSize: "10px", display: "block" }}>Meeting Schedule</small>
                <strong>{selectedChapter.meeting_day || "N/A"} {selectedChapter.meeting_time || ""}</strong>
              </div>
              <div>
                <small style={{ color: "var(--muted-foreground)", fontSize: "10px", display: "block" }}>Location</small>
                <strong>{selectedChapter.location || "N/A"}</strong>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .modal-overlay { position: fixed; inset: 0; background: rgba(32, 35, 31, 0.5); z-index: 999; }
        .modal-card { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--cream); border: 1px solid var(--border); border-radius: 14px; padding: 22px; width: min(480px, calc(100vw - 32px)); z-index: 1000; }
      `}</style>
    </DashboardShell>
  )
}
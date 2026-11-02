"use client"

import { useState, useEffect } from "react"
import { AdminModal } from "./admin-modal"
import { DeleteConfirmationModal } from "./delete-confirmation-modal"
import { LogoUploadField } from "./logo-upload-field"

interface Option {
  id: string
  name: string
}

interface Chapter {
  id: string
  name: string
  status: string
  denomination_id?: string
  campus_id?: string
  meeting_day?: string
  meeting_time?: string
  location?: string
  description?: string
  logo_url?: string
  whatsapp_link?: string
  campuses?: { id?: string; name: string }
  denominations?: { id?: string; name: string }
}

interface ChapterFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  chapter: Chapter | null
  denominations: Option[]
  campuses: Option[]
  onSuccess: () => void
}

export function ChapterForm({
  open,
  onOpenChange,
  chapter,
  denominations,
  campuses,
  onSuccess,
}: ChapterFormProps) {
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
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [error, setError] = useState("")

  // Update form data when chapter changes
  useEffect(() => {
    if (chapter && open) {
      setFormData({
        name: chapter.name,
        denomination_id: chapter.denomination_id || chapter.denominations?.id || "",
        campus_id: chapter.campus_id || chapter.campuses?.id || "",
        status: chapter.status,
        meeting_day: chapter.meeting_day || "",
        meeting_time: chapter.meeting_time || "",
        location: chapter.location || "",
        description: chapter.description || "",
        whatsapp_link: chapter.whatsapp_link || "",
        logo_url: chapter.logo_url || "",
      })
    } else if (!chapter && open) {
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
    }
  }, [chapter, open, denominations, campuses])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError("")

    try {
      const uploadData = new FormData()
      uploadData.append("file", file)

      const res = await fetch("/api/uploads/logo", {
        method: "POST",
        body: uploadData,
      })

      const data = await res.json()
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, logo_url: data.url }))
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

    const payload: Record<string, any> = { ...formData }
    if (!payload.denomination_id) delete payload.denomination_id
    if (!payload.campus_id) delete payload.campus_id

    try {
      const url = chapter ? `/api/admin/chapters/${chapter.id}` : "/api/admin/chapters"
      const method = chapter ? "PATCH" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to save chapter.")
        setIsSaving(false)
        return
      }

      setIsSaving(false)
      onOpenChange(false)
      onSuccess()
    } catch {
      setError("Network error.")
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!chapter) return

    setIsDeleting(true)
    setShowDeleteModal(false)

    try {
      const res = await fetch(`/api/admin/chapters/${chapter.id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Failed to delete chapter.")
        setIsDeleting(false)
        return
      }

      setIsDeleting(false)
      onOpenChange(false)
      onSuccess()
    } catch {
      setError("Network error.")
      setIsDeleting(false)
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setError("")
    }
    onOpenChange(isOpen)
  }

  return (
    <>
      <AdminModal
        open={open}
        onOpenChange={handleOpenChange}
        title={chapter ? "Edit Chapter" : "New Chapter"}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="admin-form-field">
              <label htmlFor="chapter-name">Chapter Name *</label>
              <input
                id="chapter-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. PENSA UMaT Chapter"
                required
                autoFocus
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="chapter-status">Status</label>
              <select
                id="chapter-status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="draft">Draft</option>
                <option value="pending_approval">Pending Approval</option>
                <option value="coming_soon">Coming Soon</option>
                <option value="active">Active</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="admin-form-field">
              <label htmlFor="chapter-denom">Denomination</label>
              <select
                id="chapter-denom"
                value={formData.denomination_id}
                onChange={(e) => setFormData({ ...formData, denomination_id: e.target.value })}
              >
                <option value="">Select (Optional)</option>
                {denominations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-form-field">
              <label htmlFor="chapter-campus">Campus</label>
              <select
                id="chapter-campus"
                value={formData.campus_id}
                onChange={(e) => setFormData({ ...formData, campus_id: e.target.value })}
              >
                <option value="">Select (Optional)</option>
                {campuses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <LogoUploadField
            logoUrl={formData.logo_url}
            name={formData.name}
            onFileUpload={handleFileUpload}
            onUrlChange={(url) => setFormData({ ...formData, logo_url: url })}
            isUploading={isUploading}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="admin-form-field">
              <label htmlFor="chapter-day">Meeting Day</label>
              <input
                id="chapter-day"
                type="text"
                value={formData.meeting_day}
                onChange={(e) => setFormData({ ...formData, meeting_day: e.target.value })}
                placeholder="e.g. Wednesday"
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="chapter-time">Meeting Time</label>
              <input
                id="chapter-time"
                type="text"
                value={formData.meeting_time}
                onChange={(e) => setFormData({ ...formData, meeting_time: e.target.value })}
                placeholder="e.g. 5:30 PM"
              />
            </div>
          </div>

          <div className="admin-form-field">
            <label htmlFor="chapter-location">Location</label>
            <input
              id="chapter-location"
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Old Lecture Theatre (OLT)"
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="chapter-whatsapp">WhatsApp Link</label>
            <input
              id="chapter-whatsapp"
              type="url"
              value={formData.whatsapp_link}
              onChange={(e) => setFormData({ ...formData, whatsapp_link: e.target.value })}
              placeholder="https://chat.whatsapp.com/..."
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="chapter-desc">Description</label>
            <textarea
              id="chapter-desc"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Optional description"
              rows={3}
            />
          </div>

          {error && (
            <p style={{ color: "var(--destructive)", fontSize: "14px", marginTop: "12px" }}>
              {error}
            </p>
          )}

          <div className="admin-modal-footer">
            <button
              type="submit"
              className="admin-modal-btn admin-btn-primary"
              disabled={isSaving || isUploading || !formData.name.trim()}
            >
              {isSaving ? "Saving..." : chapter ? "Update" : "Create"}
            </button>
            {chapter && (
              <button
                type="button"
                className="admin-modal-btn admin-btn-danger"
                onClick={() => setShowDeleteModal(true)}
                disabled={isDeleting || isSaving}
              >
                Delete
              </button>
            )}
            <button
              type="button"
              className="admin-modal-btn admin-btn-secondary"
              onClick={() => handleOpenChange(false)}
              disabled={isSaving || isDeleting}
            >
              Cancel
            </button>
          </div>
        </form>
      </AdminModal>

      <DeleteConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        title="Delete Chapter?"
        description="Are you sure you want to delete"
        itemName={chapter?.name || ""}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  )
}

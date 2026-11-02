"use client"

import { useState } from "react"
import { AdminModal } from "@/components/admin/admin-modal"
import { LogoUploadField } from "@/components/admin/logo-upload-field"

interface ChapterInfoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  chapterName: string
  initialData: {
    meeting_day: string
    meeting_time: string
    location: string
    description: string
    whatsapp_link: string
    logo_url: string
  }
  onSuccess: () => void
}

export function ChapterInfoModal({
  open,
  onOpenChange,
  chapterName,
  initialData,
  onSuccess,
}: ChapterInfoModalProps) {
  const [formData, setFormData] = useState(initialData)
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingLogo(true)
    setError("")

    try {
      const uploadFormData = new FormData()
      uploadFormData.append("file", file)

      const res = await fetch("/api/uploads/logo", {
        method: "POST",
        body: uploadFormData,
      })

      const data = await res.json()

      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, logo_url: data.url }))
      } else {
        setError(data.error || "Logo upload failed.")
      }
    } catch {
      setError("Network error during logo upload.")
    } finally {
      setIsUploadingLogo(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.meeting_day ||
      !formData.meeting_time ||
      !formData.location ||
      !formData.whatsapp_link
    ) {
      setError("Please fill in all required fields marked with *.")
      return
    }

    setIsSaving(true)
    setError("")

    try {
      const res = await fetch("/api/heads/chapter", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to update chapter setup.")
        setIsSaving(false)
        return
      }

      setIsSaving(false)
      onOpenChange(false)
      onSuccess()
    } catch {
      setError("Network error. Please try again.")
      setIsSaving(false)
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setError("")
    }
    onOpenChange(isOpen)
  }

  return (
    <AdminModal
      open={open}
      onOpenChange={handleOpenChange}
      title="Chapter Setup"
      description="Update meeting schedule and fellowship details"
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="admin-form-field">
            <label htmlFor="meeting-day">
              Meeting Day <span style={{ color: "var(--destructive)" }}>*</span>
            </label>
            <select
              id="meeting-day"
              value={formData.meeting_day}
              onChange={(e) => setFormData({ ...formData, meeting_day: e.target.value })}
              required
            >
              <option value="">Select day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>

          <div className="admin-form-field">
            <label htmlFor="meeting-time">
              Meeting Time <span style={{ color: "var(--destructive)" }}>*</span>
            </label>
            <input
              id="meeting-time"
              type="text"
              value={formData.meeting_time}
              onChange={(e) => setFormData({ ...formData, meeting_time: e.target.value })}
              placeholder="e.g. 5:30 PM"
              required
            />
          </div>
        </div>

        <div className="admin-form-field">
          <label htmlFor="location">
            Location <span style={{ color: "var(--destructive)" }}>*</span>
          </label>
          <input
            id="location"
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="e.g. Old Lecture Theatre (OLT)"
            required
          />
        </div>

        <LogoUploadField
          logoUrl={formData.logo_url}
          name={chapterName}
          onFileUpload={handleLogoUpload}
          onUrlChange={(url) => setFormData({ ...formData, logo_url: url })}
          isUploading={isUploadingLogo}
          placeholder="Or paste logo URL"
        />

        <div className="admin-form-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe your fellowship community..."
            rows={4}
          />
        </div>

        <div className="admin-form-field">
          <label htmlFor="whatsapp-link">
            WhatsApp Group Link <span style={{ color: "var(--destructive)" }}>*</span>
          </label>
          <input
            id="whatsapp-link"
            type="url"
            value={formData.whatsapp_link}
            onChange={(e) => setFormData({ ...formData, whatsapp_link: e.target.value })}
            placeholder="https://chat.whatsapp.com/..."
            required
          />
          <small
            style={{
              fontSize: "12px",
              color: "var(--muted-foreground)",
              display: "block",
              marginTop: "4px",
            }}
          >
            Students automatically receive this link upon registration
          </small>
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
            disabled={isSaving || isUploadingLogo}
          >
            {isSaving ? "Saving..." : "Save and Activate"}
          </button>
          <button
            type="button"
            className="admin-modal-btn admin-btn-secondary"
            onClick={() => handleOpenChange(false)}
            disabled={isSaving || isUploadingLogo}
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminModal>
  )
}

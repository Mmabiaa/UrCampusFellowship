"use client"

import { useState } from "react"
import { AdminModal } from "./admin-modal"
import { LogoUploadField } from "./logo-upload-field"

interface Campus {
  id: string
  name: string
  logo_url?: string
}

interface CampusFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  campus: Campus | null
  onSuccess: () => void
}

export function CampusForm({ open, onOpenChange, campus, onSuccess }: CampusFormProps) {
  const [formData, setFormData] = useState({
    name: campus?.name || "",
    logo_url: campus?.logo_url || "",
  })

  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

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
      setError("Campus name is required.")
      return
    }

    setIsSaving(true)
    setError("")

    try {
      const url = campus ? `/api/admin/campuses/${campus.id}` : "/api/admin/campuses"
      const method = campus ? "PATCH" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to save campus.")
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

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setFormData({
        name: "",
        logo_url: "",
      })
      setError("")
    }
    onOpenChange(isOpen)
  }

  useState(() => {
    if (campus && open) {
      setFormData({
        name: campus.name,
        logo_url: campus.logo_url || "",
      })
    }
  })

  return (
    <AdminModal
      open={open}
      onOpenChange={handleOpenChange}
      title={campus ? "Edit Campus" : "New Campus"}
    >
      <form onSubmit={handleSubmit}>
        <div className="admin-form-field">
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

        <LogoUploadField
          logoUrl={formData.logo_url}
          name={formData.name}
          onFileUpload={handleFileUpload}
          onUrlChange={(url) => setFormData({ ...formData, logo_url: url })}
          isUploading={isUploading}
        />

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
            {isSaving ? "Saving..." : campus ? "Update" : "Create"}
          </button>
          <button
            type="button"
            className="admin-modal-btn admin-btn-secondary"
            onClick={() => handleOpenChange(false)}
            disabled={isSaving}
          >
            Cancel
          </button>
        </div>
      </form>
    </AdminModal>
  )
}

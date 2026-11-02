"use client"

import { useState } from "react"
import { AdminModal } from "./admin-modal"
import { DeleteConfirmationModal } from "./delete-confirmation-modal"
import { LogoUploadField } from "./logo-upload-field"

interface Denomination {
  id: string
  name: string
  description?: string
  logo_url?: string
}

interface DenominationFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  denomination: Denomination | null
  onSuccess: () => void
}

export function DenominationForm({
  open,
  onOpenChange,
  denomination,
  onSuccess,
}: DenominationFormProps) {
  const [formData, setFormData] = useState({
    name: denomination?.name || "",
    description: denomination?.description || "",
    logo_url: denomination?.logo_url || "",
  })

  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
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
      setError("Denomination name is required.")
      return
    }

    setIsSaving(true)
    setError("")

    try {
      const url = denomination
        ? `/api/admin/denominations/${denomination.id}`
        : "/api/admin/denominations"
      const method = denomination ? "PATCH" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Failed to save denomination.")
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
    if (!denomination) return

    setIsDeleting(true)
    setShowDeleteModal(false)

    try {
      const res = await fetch(`/api/admin/denominations/${denomination.id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Failed to delete denomination.")
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

  // Reset form when modal closes
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setFormData({
        name: "",
        description: "",
        logo_url: "",
      })
      setError("")
    }
    onOpenChange(isOpen)
  }

  // Update form data when denomination prop changes
  useState(() => {
    if (denomination && open) {
      setFormData({
        name: denomination.name,
        description: denomination.description || "",
        logo_url: denomination.logo_url || "",
      })
    }
  })

  return (
    <>
      <AdminModal
        open={open}
        onOpenChange={handleOpenChange}
        title={denomination ? "Edit Denomination" : "New Denomination"}
      >
        <form onSubmit={handleSubmit}>
          <div className="admin-form-field">
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

          <LogoUploadField
            logoUrl={formData.logo_url}
            name={formData.name}
            onFileUpload={handleFileUpload}
            onUrlChange={(url) => setFormData({ ...formData, logo_url: url })}
            isUploading={isUploading}
          />

          <div className="admin-form-field">
            <label htmlFor="denom-desc">Description (optional)</label>
            <textarea
              id="denom-desc"
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
              {isSaving ? "Saving..." : denomination ? "Update" : "Create"}
            </button>
            {denomination && (
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
        title="Delete Denomination?"
        description="Are you sure you want to delete"
        itemName={denomination?.name || ""}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  )
}

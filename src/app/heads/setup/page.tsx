"use client"

import { useEffect, useState } from "react"
import { DashboardShell } from "@/components/common/dashboard-shell"

interface ChapterData {
  id: string
  name: string
  status: string
  meeting_day: string
  meeting_time: string
  location: string
  description: string
  whatsapp_link: string
  logo_url: string
  campuses?: { name: string }
  denominations?: { name: string }
}

export default function ChapterSetupPage() {
  const [chapter, setChapter] = useState<ChapterData | null>(null)
  const [formData, setFormData] = useState({
    meeting_day: "",
    meeting_time: "",
    location: "",
    description: "",
    whatsapp_link: "",
    logo_url: "",
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingLogo, setIsUploadingLogo] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    async function fetchChapter() {
      try {
        setIsLoading(true)
        const res = await fetch('/api/heads/chapter')
        if (res.ok) {
          const data = await res.json()
          const c = data.chapter
          if (c) {
            setChapter(c)
            setFormData({
              meeting_day: c.meeting_day || "",
              meeting_time: c.meeting_time || "",
              location: c.location || "",
              description: c.description || "",
              whatsapp_link: c.whatsapp_link || "",
              logo_url: c.logo_url || "",
            })
          }
        }
      } catch {
        setErrorMessage("Failed to load chapter information.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchChapter()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setSaveMessage("")
    setErrorMessage("")
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingLogo(true)
    setErrorMessage("")

    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)

      const res = await fetch('/api/uploads/logo', {
        method: 'POST',
        body: uploadFormData,
      })

      const data = await res.json()

      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, logo_url: data.url }))
        setSaveMessage("Logo uploaded successfully!")
      } else {
        setErrorMessage(data.error || "Logo upload failed.")
      }
    } catch {
      setErrorMessage("Network error during logo upload.")
    } finally {
      setIsUploadingLogo(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.meeting_day || !formData.meeting_time || !formData.location || !formData.whatsapp_link) {
      setErrorMessage("Please fill in all required fields marked with *.")
      return
    }

    setIsSaving(true)
    setSaveMessage("")
    setErrorMessage("")

    try {
      const res = await fetch('/api/heads/chapter', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to update chapter setup.")
        setIsSaving(false)
        return
      }

      setChapter(data.chapter)
      setSaveMessage("Chapter setup updated successfully! Status is now ACTIVE.")
      setIsSaving(false)

      setTimeout(() => setSaveMessage(""), 4000)
    } catch {
      setErrorMessage("Network error. Please try again.")
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardShell role="head">
        <div style={{ padding: "64px 0", textAlign: "center", color: "var(--muted-foreground)" }}>
          Loading chapter setup form...
        </div>
      </DashboardShell>
    )
  }

  const isFormComplete =
    formData.meeting_day && formData.meeting_time && formData.location && formData.whatsapp_link

  return (
    <DashboardShell role="head">
      <div className="dash-header">
        <div>
          <p className="eyebrow">Chapter setup</p>
          <h1>Keep your fellowship details current.</h1>
          <p className="intro">
            Update the meeting schedule and WhatsApp link that students receive upon joining.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="setup-form">
        <div className="form-grid">
          <label>
            Chapter name
            <input
              type="text"
              value={chapter?.name || ""}
              disabled
              style={{ opacity: 0.6, cursor: "not-allowed" }}
            />
          </label>

          <label>
            Denomination
            <input
              type="text"
              value={chapter?.denominations?.name || ""}
              disabled
              style={{ opacity: 0.6, cursor: "not-allowed" }}
            />
          </label>

          <label>
            Campus
            <input
              type="text"
              value={chapter?.campuses?.name || "Main Campus"}
              disabled
              style={{ opacity: 0.6, cursor: "not-allowed" }}
            />
          </label>

          <label>
            Meeting day <span style={{ color: "var(--destructive)" }}>*</span>
            <select
              name="meeting_day"
              value={formData.meeting_day}
              onChange={handleChange}
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
          </label>

          <label>
            Meeting time <span style={{ color: "var(--destructive)" }}>*</span>
            <input
              type="text"
              name="meeting_time"
              value={formData.meeting_time}
              onChange={handleChange}
              placeholder="e.g. 5:30 PM"
              required
            />
          </label>

          <label>
            Location <span style={{ color: "var(--destructive)" }}>*</span>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Old Lecture Theatre (OLT)"
              required
            />
          </label>

          {/* Logo Upload Field */}
          <label className="wide-field">
            Fellowship Logo
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
              {formData.logo_url ? (
                <img
                  src={formData.logo_url}
                  alt="Chapter Logo"
                  style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border)' }}
                />
              ) : (
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'var(--sage)',
                    color: 'var(--moss)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }}
                >
                  {chapter?.name ? chapter.name[0] : 'L'}
                </div>
              )}
              <div style={{ flex: 1 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  disabled={isUploadingLogo}
                  style={{ fontSize: '13px' }}
                />
                {isUploadingLogo && (
                  <span style={{ fontSize: '12px', color: 'var(--muted-foreground)', display: 'block', marginTop: '4px' }}>
                    Uploading logo...
                  </span>
                )}
              </div>
            </div>
          </label>

          <label className="wide-field">
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your fellowship community..."
              rows={4}
            />
          </label>

          <label className="wide-field">
            WhatsApp group link <span style={{ color: "var(--destructive)" }}>*</span>
            <input
              type="url"
              name="whatsapp_link"
              value={formData.whatsapp_link}
              onChange={handleChange}
              placeholder="https://chat.whatsapp.com/..."
              required
            />
            <span style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "4px" }}>
              Students automatically receive this link upon registration
            </span>
          </label>
        </div>

        {saveMessage && (
          <p
            style={{
              color: "var(--moss)",
              fontSize: "14px",
              marginTop: "16px",
              padding: "12px 16px",
              background: "var(--sage)",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            ✓ {saveMessage}
          </p>
        )}

        {errorMessage && (
          <p
            style={{
              color: "var(--destructive)",
              fontSize: "14px",
              marginTop: "16px",
              fontWeight: "bold",
            }}
          >
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          className="button button-primary full"
          disabled={isSaving || isUploadingLogo}
          style={{
            marginTop: "24px",
            opacity: isSaving || isUploadingLogo ? 0.6 : 1,
            cursor: isSaving || isUploadingLogo ? "not-allowed" : "pointer",
          }}
        >
          {isSaving ? "Saving setup..." : "Save and Activate Chapter"}
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </DashboardShell>
  )
}

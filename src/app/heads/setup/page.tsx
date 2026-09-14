"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/common/dashboard-shell"

export default function ChapterSetupPage() {
  const [formData, setFormData] = useState({
    name: "Campus Christian Fellowship",
    denomination: "Campus Christian Fellowship",
    campus: "Main Campus",
    day: "Friday",
    time: "6:00 PM",
    location: "Fellowship Hall, Block C",
    description: "A welcoming community growing together in faith, friendship, and service.",
    whatsappLink: "https://chat.whatsapp.com/mock-invite-link",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setSaveMessage("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveMessage("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    setSaveMessage("Changes saved successfully!")
    setIsSaving(false)

    // Clear message after 3 seconds
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const isFormComplete = formData.day && formData.time && formData.location && formData.whatsappLink

  return (
    <DashboardShell role="head">
      <div className="dash-header">
        <div>
          <p className="eyebrow">Chapter setup</p>
          <h1>Keep your chapter details current.</h1>
          <p className="intro">
            Update the information students see when they find your fellowship. Complete all
            required fields to make your chapter active and visible.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="setup-form">
        <div className="form-grid">
          <label>
            Chapter name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled
              style={{ opacity: 0.6, cursor: "not-allowed" }}
            />
            <span style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "4px" }}>
              Contact admin to change chapter name
            </span>
          </label>

          <label>
            Denomination
            <input
              type="text"
              name="denomination"
              value={formData.denomination}
              onChange={handleChange}
              disabled
              style={{ opacity: 0.6, cursor: "not-allowed" }}
            />
          </label>

          <label>
            Campus
            <select 
              name="campus" 
              value={formData.campus} 
              onChange={handleChange}
              disabled
              style={{ opacity: 0.6, cursor: "not-allowed" }}
            >
              <option value="Main Campus">Main Campus</option>
              <option value="Essikado">Essikado</option>
            </select>
          </label>

          <label>
            Meeting day <span style={{ color: "var(--destructive)" }}>*</span>
            <select name="day" value={formData.day} onChange={handleChange} required>
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
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="e.g. 6:00 PM"
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
              placeholder="e.g. Fellowship Hall, Block C"
              required
            />
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
              name="whatsappLink"
              value={formData.whatsappLink}
              onChange={handleChange}
              placeholder="https://chat.whatsapp.com/..."
              required
            />
            <span style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "4px" }}>
              Students get this link instantly after registration
            </span>
          </label>
        </div>

        {saveMessage && (
          <p style={{ 
            color: "var(--moss)", 
            fontSize: "14px", 
            marginTop: "16px",
            padding: "12px 16px",
            background: "var(--sage)",
            borderRadius: "8px",
          }}>
            ✓ {saveMessage}
          </p>
        )}

        {!isFormComplete && (
          <p style={{ 
            color: "var(--clay)", 
            fontSize: "13px", 
            marginTop: "16px",
            padding: "12px 16px",
            background: "var(--butter)",
            borderRadius: "8px",
          }}>
            Complete all required fields (*) to activate your chapter and make it visible to students.
          </p>
        )}

        <button
          type="submit"
          className="button button-primary full"
          disabled={isSaving}
          style={{
            marginTop: "24px",
            opacity: isSaving ? 0.6 : 1,
            cursor: isSaving ? "not-allowed" : "pointer",
          }}
        >
          {isSaving ? "Saving changes..." : "Save changes"}
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
        <h3 style={{ fontSize: "18px", marginBottom: "12px" }}>Chapter status</h3>
        <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.65" }}>
          Your chapter is currently <strong style={{ color: isFormComplete ? "var(--moss)" : "var(--clay)" }}>
            {isFormComplete ? "active" : "inactive"}
          </strong>. 
          {isFormComplete 
            ? " Students can find and register with your fellowship."
            : " Complete all required fields above to make your chapter visible to students."
          }
        </p>
      </div>
    </DashboardShell>
  )
}

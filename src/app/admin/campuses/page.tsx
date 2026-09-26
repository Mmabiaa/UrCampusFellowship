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
    const [showCreateForm, setShowCreateForm] = useState(false)
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
                setMessage("Campus logo uploaded successfully!")
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

            setMessage(editingCampus ? "Campus updated successfully!" : "Campus created successfully!")
            setFormData({ name: "", logo_url: "" })
            setShowCreateForm(false)
            setEditingCampus(null)
            setIsSaving(false)
            loadCampuses()

            setTimeout(() => setMessage(""), 4000)
        } catch {
            setError("Network error.")
            setIsSaving(false)
        }
    }

    const openEditForm = (campus: Campus) => {
        setFormData({
            name: campus.name,
            logo_url: campus.logo_url || "",
        })
        setEditingCampus(campus)
        setShowCreateForm(false)
        setError("")
        setMessage("")
    }

    const cancelForm = () => {
        setFormData({ name: "", logo_url: "" })
        setShowCreateForm(false)
        setEditingCampus(null)
        setError("")
    }

    return (
        <DashboardShell role="admin">
            <div className="dash-header">
                <div>
                    <p className="eyebrow">Campus Management</p>
                    <h1>Campuses & Logos</h1>
                    <p className="intro">
                        Create and update university campuses and their official logo pictures.
                    </p>
                </div>
                <button
                    type="button"
                    className="button button-primary"
                    onClick={() => {
                        setShowCreateForm(!showCreateForm)
                        setEditingCampus(null)
                        setFormData({ name: "", logo_url: "" })
                        setError("")
                        setMessage("")
                    }}
                    style={{ whiteSpace: "nowrap" }}
                >
                    {showCreateForm ? "Cancel" : "+ New Campus"}
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

            {(showCreateForm || editingCampus) && (
                <div style={{
                    background: "var(--cream)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "24px",
                    marginBottom: "32px",
                    animation: "fadeIn 0.2s ease",
                }}>
                    <h3 style={{ fontSize: "18px", marginBottom: "16px" }}>
                        {editingCampus ? `Edit Campus: ${editingCampus.name}` : "Create New Campus"}
                    </h3>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: "16px" }}>
                            <label htmlFor="campus-name" style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>
                                Campus Name *
                            </label>
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

                        {/* Picture Upload / URL Input */}
                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>
                                Campus Logo (Picture File Upload or Image URL)
                            </label>

                            <div style={{ display: "flex", gap: "16px", alignItems: "center", marginTop: "8px" }}>
                                {formData.logo_url ? (
                                    <img
                                        src={formData.logo_url}
                                        alt="Logo preview"
                                        style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border)" }}
                                    />
                                ) : (
                                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--sage)", color: "var(--moss)", display: "grid", placeItems: "center", fontWeight: "bold", fontSize: "20px" }}>
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
                                            onChange={handleFileUpload}
                                            disabled={isUploading}
                                            style={{ fontSize: "13px" }}
                                        />
                                        {isUploading && <small style={{ color: "var(--moss)", display: "block" }}>Uploading campus logo...</small>}
                                    </div>

                                    <div>
                                        <span style={{ fontSize: "12px", color: "var(--muted-foreground)", display: "block", marginBottom: "4px" }}>
                                            Or Image URL:
                                        </span>
                                        <input
                                            type="url"
                                            value={formData.logo_url}
                                            onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                                            placeholder="https://example.com/campus-logo.png"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                            <button
                                type="submit"
                                className="button button-primary"
                                disabled={isSaving || isUploading || !formData.name.trim()}
                            >
                                {isSaving ? "Saving..." : editingCampus ? "Update Campus" : "Create Campus"}
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

            {/* Campuses list */}
            {isLoading ? (
                <div style={{ padding: "64px 0", textAlign: "center", color: "var(--muted-foreground)" }}>
                    Loading campuses...
                </div>
            ) : campuses.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--muted-foreground)" }}>
                    <p style={{ fontSize: "15px", marginBottom: "8px" }}>No campuses yet</p>
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
                                onClick={() => openEditForm(campus)}
                            >
                                Edit Form
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </DashboardShell>
    )
}

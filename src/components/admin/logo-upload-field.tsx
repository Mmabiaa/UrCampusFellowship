"use client"

interface LogoUploadFieldProps {
  logoUrl: string
  name: string
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUrlChange: (url: string) => void
  isUploading: boolean
  placeholder?: string
}

export function LogoUploadField({
  logoUrl,
  name,
  onFileUpload,
  onUrlChange,
  isUploading,
  placeholder = "Or paste image URL",
}: LogoUploadFieldProps) {
  const initial = name ? name[0].toUpperCase() : "L"

  return (
    <div className="admin-form-field">
      <label>Logo</label>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {logoUrl ? (
          <img
            src={logoUrl}
            alt="Logo preview"
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid var(--line)",
            }}
          />
        ) : (
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "var(--sage)",
              color: "var(--moss)",
              display: "grid",
              placeItems: "center",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            {initial}
          </div>
        )}

        <div style={{ flex: 1 }}>
          <input
            type="file"
            accept="image/*"
            onChange={onFileUpload}
            disabled={isUploading}
            style={{ fontSize: "13px", marginBottom: "6px" }}
          />
          {isUploading && (
            <small style={{ color: "var(--moss)", fontSize: "12px", display: "block" }}>
              Uploading...
            </small>
          )}
          <input
            type="url"
            value={logoUrl}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder={placeholder}
            style={{ fontSize: "13px" }}
          />
        </div>
      </div>
    </div>
  )
}

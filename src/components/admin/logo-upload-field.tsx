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
      <div className="logo-upload-wrapper">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt="Logo preview"
            className="logo-preview"
          />
        ) : (
          <div className="logo-placeholder">
            {initial}
          </div>
        )}

        <div className="logo-upload-inputs">
          <input
            type="file"
            accept="image/*"
            onChange={onFileUpload}
            disabled={isUploading}
            className="logo-file-input"
          />
          {isUploading && (
            <small className="upload-status">
              Uploading...
            </small>
          )}
          <input
            type="url"
            value={logoUrl}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder={placeholder}
            className="logo-url-input"
          />
        </div>
      </div>

      <style jsx>{`
        .logo-upload-wrapper {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .logo-preview {
          width: 50px;
          height: 50px;
          min-width: 50px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--line);
        }

        .logo-placeholder {
          width: 50px;
          height: 50px;
          min-width: 50px;
          border-radius: 50%;
          background: var(--sage);
          color: var(--moss);
          display: grid;
          place-items: center;
          font-weight: bold;
          font-size: 18px;
        }

        .logo-upload-inputs {
          flex: 1;
          min-width: 0;
        }

        .logo-file-input {
          font-size: 13px;
          margin-bottom: 6px;
          width: 100%;
        }

        .upload-status {
          color: var(--moss);
          font-size: 12px;
          display: block;
          margin-bottom: 6px;
        }

        .logo-url-input {
          font-size: 13px;
          width: 100%;
        }

        @media (max-width: 480px) {
          .logo-upload-wrapper {
            flex-direction: column;
            align-items: flex-start;
          }

          .logo-preview,
          .logo-placeholder {
            width: 60px;
            height: 60px;
            min-width: 60px;
          }

          .logo-upload-inputs {
            width: 100%;
          }

          .logo-file-input,
          .logo-url-input {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  )
}

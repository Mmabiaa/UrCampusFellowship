"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AdminModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
}

export function AdminModal({
  open,
  onOpenChange,
  title,
  description,
  children,
}: AdminModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[520px] p-0 w-[calc(100%-2rem)] sm:w-full max-h-[calc(100vh-60px)] overflow-y-auto">
        {/* Custom close button */}
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-[var(--muted-foreground)] hover:text-[var(--ink)] hover:bg-[var(--line)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="admin-modal-header">
          <DialogHeader>
            <DialogTitle className="text-left text-lg font-semibold text-[var(--ink)]">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-left text-sm text-[var(--muted-foreground)] mt-1">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        </div>

        <div className="admin-modal-body">{children}</div>

        <style jsx global>{`
          .admin-modal-header {
            padding: 18px 20px;
            border-bottom: 1px solid var(--line);
            background: var(--sage);
          }

          .admin-modal-body {
            padding: 20px;
          }

          .admin-form-field {
            margin-bottom: 18px;
          }

          .admin-form-field:last-child {
            margin-bottom: 0;
          }

          .admin-form-field label {
            display: block;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 8px;
            color: var(--ink);
          }

          .admin-modal-footer {
            display: flex;
            gap: 10px;
            padding: 16px 20px;
            border-top: 1px solid var(--line);
            background: var(--cream);
          }

          .admin-modal-btn {
            flex: 1;
            padding: 10px 16px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 8px;
            border: 2px solid;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
          }

          .admin-btn-primary {
            border-color: var(--moss);
            background: var(--moss);
            color: white;
          }

          .admin-btn-primary:hover:not(:disabled) {
            background: #3a442f;
            transform: translateY(-1px);
          }

          .admin-btn-primary:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .admin-btn-danger {
            border-color: var(--destructive);
            color: var(--destructive);
            background: white;
          }

          .admin-btn-danger:hover:not(:disabled) {
            background: var(--destructive);
            color: white;
            transform: translateY(-1px);
          }

          .admin-btn-secondary {
            border-color: var(--line);
            background: white;
            color: var(--ink);
          }

          .admin-btn-secondary:hover:not(:disabled) {
            background: var(--line);
          }

          @media (max-width: 768px) {
            .admin-modal-header {
              padding: 14px 16px;
            }

            .admin-modal-body {
              padding: 16px;
            }

            .admin-modal-footer {
              flex-direction: column;
              padding: 12px 16px;
            }

            .admin-modal-btn {
              width: 100%;
            }

            .admin-form-field label {
              font-size: 12px;
            }
          }

          @media (max-width: 480px) {
            .admin-modal-header {
              padding: 12px 14px;
            }

            .admin-modal-body {
              padding: 14px;
            }

            .admin-form-field {
              margin-bottom: 16px;
            }

            .admin-modal-footer {
              padding: 10px 14px;
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  )
}

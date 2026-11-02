"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Member {
  id: string
  name: string
  email: string
  phone: string
  program: string
  level: string
  hall: string
  status: string
  created_at: string
  campuses?: { name: string }
}

interface MemberDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  member: Member | null
  onFlag: (member: Member) => void
  onRemove: (member: Member) => void
}

export function MemberDetailsModal({
  open,
  onOpenChange,
  member,
  onFlag,
  onRemove,
}: MemberDetailsModalProps) {
  if (!member) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[460px] p-0 w-[calc(100%-2rem)] sm:w-full">
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

        <div className="modal-header-section">
          <DialogHeader>
            <DialogTitle className="text-left text-lg font-semibold text-[var(--ink)]">
              {member.name}
            </DialogTitle>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              Joined {new Date(member.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </DialogHeader>
        </div>

        <div className="modal-body-section">
          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">Phone</span>
              <span className="info-value">{member.phone || "—"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email</span>
              <span className="info-value email-value">{member.email || "—"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Program</span>
              <span className="info-value">{member.program || "—"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Level</span>
              <span className="info-value">Level {member.level}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Hall</span>
              <span className="info-value">{member.hall || "—"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Campus</span>
              <span className="info-value">{member.campuses?.name || "Main Campus"}</span>
            </div>
          </div>
        </div>

        <div className="modal-footer-section">
          <button
            type="button"
            className="action-button flag-button"
            onClick={() => {
              onFlag(member)
              onOpenChange(false)
            }}
          >
            <span className="button-icon">🚩</span>
            <span>Flag</span>
          </button>
          <button
            type="button"
            className="action-button remove-button"
            onClick={() => {
              onRemove(member)
              onOpenChange(false)
            }}
          >
            <span className="button-icon">✕</span>
            <span>Remove</span>
          </button>
        </div>

        <style jsx>{`
          .modal-header-section {
            padding: 18px 20px;
            border-bottom: 1px solid var(--line);
            background: var(--sage);
          }

          .modal-body-section {
            padding: 8px 20px;
          }

          .info-grid {
            display: flex;
            flex-direction: column;
          }

          .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid var(--line);
            gap: 16px;
          }

          .info-row:last-child {
            border-bottom: none;
          }

          .info-label {
            font-size: 13px;
            font-weight: 600;
            color: var(--muted-foreground);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            flex-shrink: 0;
          }

          .info-value {
            font-size: 14px;
            color: var(--ink);
            text-align: right;
            word-break: break-word;
          }

          .email-value {
            font-size: 13px;
          }

          .modal-footer-section {
            display: flex;
            gap: 10px;
            padding: 16px 20px;
            border-top: 1px solid var(--line);
            background: var(--cream);
          }

          .action-button {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 10px 16px;
            font-size: 14px;
            font-weight: 600;
            border-radius: 8px;
            border: 2px solid;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .button-icon {
            font-size: 16px;
          }

          .flag-button {
            border-color: var(--gold);
            color: var(--accent-foreground);
            background: var(--butter);
          }

          .flag-button:hover {
            background: var(--gold);
            transform: translateY(-1px);
          }

          .remove-button {
            border-color: var(--destructive);
            color: var(--destructive);
            background: white;
          }

          .remove-button:hover {
            background: var(--destructive);
            color: white;
            transform: translateY(-1px);
          }

          @media (max-width: 768px) {
            .modal-header-section {
              padding: 14px 16px;
            }

            .modal-body-section {
              padding: 6px 16px;
            }

            .info-row {
              flex-direction: column;
              align-items: flex-start;
              gap: 4px;
              padding: 10px 0;
            }

            .info-value {
              text-align: left;
            }

            .modal-footer-section {
              padding: 12px 16px;
              flex-direction: column;
            }

            .action-button {
              width: 100%;
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  )
}

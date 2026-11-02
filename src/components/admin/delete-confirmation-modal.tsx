"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DeleteConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  itemName: string
  onConfirm: () => void
  isDeleting: boolean
}

export function DeleteConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  itemName,
  onConfirm,
  isDeleting,
}: DeleteConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[420px] p-0 w-[calc(100%-2rem)] sm:w-full">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-[var(--muted-foreground)] hover:text-[var(--ink)] hover:bg-[var(--line)] transition-colors duration-150"
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
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="admin-modal-header">
          <DialogHeader>
            <DialogTitle className="text-left text-lg font-semibold text-[var(--destructive)]">
              {title}
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="admin-modal-body">
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed m-0">
            {description} <strong className="text-[var(--ink)]">{itemName}</strong>? This action
            cannot be undone.
          </p>
        </div>

        <div className="admin-modal-footer">
          <button
            type="button"
            className="admin-modal-btn admin-btn-danger"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <button
            type="button"
            className="admin-modal-btn admin-btn-secondary"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

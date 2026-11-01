"use client"

import * as React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface RejectChapterModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    chapterId: string
    chapterName: string
    headEmail: string
    onSuccess: () => void
}

export function RejectChapterModal({ 
    open, 
    onOpenChange, 
    chapterId, 
    chapterName, 
    headEmail,
    onSuccess 
}: RejectChapterModalProps) {
    const [reason, setReason] = React.useState("")
    const [showSuccess, setShowSuccess] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [error, setError] = React.useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!reason || reason.trim().length < 5) {
            setError("Rejection reason must be at least 5 characters.")
            return
        }

        setIsSubmitting(true)
        setError("")

        try {
            const res = await fetch(`/api/admin/chapters/${chapterId}/reject`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reason: reason.trim() }),
            })

            if (res.ok) {
                setShowSuccess(true)
                setReason("")
                // Call success callback after a short delay
                setTimeout(() => {
                    onSuccess()
                    handleClose()
                }, 2000)
            } else {
                const data = await res.json()
                setError(data.error || "Failed to reject chapter.")
            }
        } catch {
            setError("Network error. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
        onOpenChange(false)
        // Reset state after closing animation
        setTimeout(() => {
            setShowSuccess(false)
            setReason("")
            setError("")
        }, 200)
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-[460px] p-0 w-[calc(100%-2rem)] sm:w-full">
                {/* Custom close button */}
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close dialog"
                    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-[var(--muted-foreground)] hover:text-[var(--ink)] hover:bg-[var(--sage)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cream)]"
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

                <div className="p-6">
                    {!showSuccess ? (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-center">Reject Chapter</DialogTitle>
                                <DialogDescription className="text-center">
                                    You're about to reject <strong>{chapterName}</strong>. An email notification will be sent to <strong>{headEmail}</strong> with your reason for rejection.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-5 mt-5">
                                <div>
                                    <label htmlFor="reason" className="block text-sm font-bold mb-2 text-[var(--ink)]">
                                        Rejection reason
                                    </label>
                                    <textarea
                                        id="reason"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        placeholder="Please provide a clear reason for rejecting this chapter application..."
                                        required
                                        disabled={isSubmitting}
                                        rows={4}
                                        className="w-full bg-[var(--cream)] border border-[var(--line)] rounded-[10px] px-4 py-3 text-[var(--ink)] outline-none transition-all focus:border-[var(--ink)] focus:shadow-[3px_3px_0_var(--gold)] disabled:opacity-50 resize-none"
                                    />
                                </div>

                                {error && (
                                    <p style={{ color: "var(--destructive)", fontSize: "14px", marginTop: "8px" }}>
                                        {error}
                                    </p>
                                )}

                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        disabled={isSubmitting}
                                        className="button button-outline w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="button w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                        style={{ 
                                            backgroundColor: "var(--destructive)", 
                                            color: "white",
                                            border: "2px solid var(--ink)"
                                        }}
                                    >
                                        {isSubmitting ? "Rejecting..." : "Reject Chapter"}
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-6">
                            <div className="w-16 h-16 rounded-full bg-[var(--sage)] text-[var(--moss)] flex items-center justify-center text-3xl mx-auto mb-5">
                                ✓
                            </div>
                            <DialogHeader>
                                <DialogTitle className="text-center">Chapter Rejected</DialogTitle>
                                <DialogDescription className="text-center mt-3">
                                    {chapterName} has been rejected. An email notification has been sent to {headEmail} with the rejection details.
                                </DialogDescription>
                            </DialogHeader>
                            <button
                                onClick={handleClose}
                                className="button button-primary mt-6"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

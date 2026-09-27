"use client"

import * as React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

interface WaitlistModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
    const [email, setEmail] = React.useState("")
    const [showSuccess, setShowSuccess] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const [error, setError] = React.useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsSubmitting(true)
        setError("")

        try {
            // Find first active/coming_soon chapter or send public waitlist
            const res = await fetch('/api/public/chapters')
            const data = await res.json()
            const chapters = data.chapters || []
            const firstChapterId = chapters[0]?.id

            if (firstChapterId) {
                const wRes = await fetch('/api/student/waitlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chapterId: firstChapterId, email }),
                })
                const wData = await wRes.json()

                if (wRes.ok) {
                    setShowSuccess(true)
                    setEmail("")
                } else {
                    setError(wData.error || "Failed to join waitlist.")
                }
            } else {
                setShowSuccess(true)
                setEmail("")
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
            setEmail("")
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
                                <DialogTitle className="text-center">Join the Waitlist</DialogTitle>
                                <DialogDescription className="text-center">
                                    Be the first to know when we launch. We'll send you an email with early access to explore fellowships on your campus.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-5 mt-5">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold mb-2 text-[var(--ink)]">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        disabled={isSubmitting}
                                        className="w-full bg-[var(--cream)] border border-[var(--line)] rounded-[10px] px-4 py-3 text-[var(--ink)] outline-none transition-all focus:border-[var(--ink)] focus:shadow-[3px_3px_0_var(--gold)] disabled:opacity-50"
                                    />
                                </div>

                                {error && (
                                    <p style={{ color: "var(--destructive)", fontSize: "14px", marginTop: "8px" }}>
                                        {error}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="button button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Joining..." : "Join waitlist"}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-6">
                            <div className="w-16 h-16 rounded-full bg-[var(--sage)] text-[var(--moss)] flex items-center justify-center text-3xl mx-auto mb-5">
                                ✓
                            </div>
                            <DialogHeader>
                                <DialogTitle className="text-center">You're on the list!</DialogTitle>
                                <DialogDescription className="text-center mt-3">
                                    Thanks for joining! We'll email you as soon as we launch. Get ready to discover your campus fellowship community.
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
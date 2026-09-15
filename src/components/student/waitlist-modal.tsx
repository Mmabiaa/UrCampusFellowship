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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))

        setShowSuccess(true)
        setIsSubmitting(false)
        setEmail("")
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
            <DialogContent className="max-w-[460px]">
                {!showSuccess ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>Join the Waitlist</DialogTitle>
                            <DialogDescription>
                                Be the first to know when we launch. We'll send you an email with early access to explore fellowships on your campus.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-5">
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
                            <DialogTitle>You're on the list!</DialogTitle>
                            <DialogDescription className="mt-3">
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
            </DialogContent>
        </Dialog>
    )
}

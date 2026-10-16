/**
 * Email Queue System
 * Manages email sending with retry logic and proper error handling
 */

import { sendEmail } from '../email'

interface EmailJob {
    id: string
    to: string
    subject: string
    html: string
    attempts: number
    maxAttempts: number
    createdAt: Date
}

class EmailQueue {
    private queue: EmailJob[] = []
    private processing = false
    private readonly MAX_ATTEMPTS = 3
    private readonly RETRY_DELAY = 2000 // 2 seconds

    async addToQueue(to: string, subject: string, html: string): Promise<void> {
        const job: EmailJob = {
            id: `email-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            to,
            subject,
            html,
            attempts: 0,
            maxAttempts: this.MAX_ATTEMPTS,
            createdAt: new Date(),
        }

        this.queue.push(job)
        console.log(`📬 Email queued: ${job.id}`)
        console.log(`   To: ${to}`)
        console.log(`   Subject: ${subject}`)
        console.log(`   Queue length: ${this.queue.length}`)

        // Start processing if not already processing
        if (!this.processing) {
            console.log('🚀 Starting queue processing...')
            this.processQueue()
        } else {
            console.log('⏳ Queue is already processing...')
        }
    }

    private async processQueue(): Promise<void> {
        if (this.processing || this.queue.length === 0) {
            return
        }

        this.processing = true

        while (this.queue.length > 0) {
            const job = this.queue[0]

            try {
                job.attempts++
                console.log(`📤 Attempting to send email ${job.id} (attempt ${job.attempts}/${job.maxAttempts})`)

                const success = await sendEmail({
                    to: job.to,
                    subject: job.subject,
                    html: job.html,
                })

                if (success) {
                    console.log(`✅ Email sent successfully: ${job.id}`)
                    this.queue.shift() // Remove from queue
                } else {
                    throw new Error('Email send returned false')
                }
            } catch (error) {
                console.error(`❌ Failed to send email ${job.id}:`, error)

                if (job.attempts >= job.maxAttempts) {
                    console.error(`💀 Email ${job.id} failed after ${job.maxAttempts} attempts. Removing from queue.`)
                    this.queue.shift() // Remove after max attempts
                } else {
                    console.log(`🔄 Will retry email ${job.id} in ${this.RETRY_DELAY}ms`)
                    // Wait before retry
                    await new Promise((resolve) => setTimeout(resolve, this.RETRY_DELAY))
                }
            }
        }

        this.processing = false
    }

    getQueueStatus(): { pending: number; jobs: EmailJob[] } {
        return {
            pending: this.queue.length,
            jobs: this.queue.map((job) => ({
                ...job,
                html: job.html.substring(0, 100) + '...', // Truncate for logging
            })),
        }
    }
}

// Singleton instance
export const emailQueue = new EmailQueue()

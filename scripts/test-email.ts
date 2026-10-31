/**
 * Email Testing Script
 * Run this to diagnose SMTP connection issues
 * 
 * Usage: npx tsx scripts/test-email.ts
 */

import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from src/.env.local
dotenv.config({ path: path.join(process.cwd(), 'src', '.env.local') })

async function testEmail() {
    console.log('🔍 Email Configuration Test\n')
    
    // Check environment variables
    console.log('📋 Configuration:')
    console.log('  SMTP_HOST:', process.env.SMTP_HOST || '❌ NOT SET')
    console.log('  SMTP_PORT:', process.env.SMTP_PORT || '❌ NOT SET')
    console.log('  SMTP_USER:', process.env.SMTP_USER || '❌ NOT SET')
    console.log('  SMTP_PASS:', process.env.SMTP_PASS ? '✓ SET' : '❌ NOT SET')
    console.log('  EMAIL_FROM:', process.env.EMAIL_FROM || '❌ NOT SET')
    console.log()

    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.error('❌ Email configuration incomplete. Check your .env.local file.')
        process.exit(1)
    }

    console.log('🔧 Creating SMTP transporter...')
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: false, // use TLS
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        debug: true,
        logger: true,
    })

    console.log('✓ Transporter created\n')

    // Test 1: Verify connection (this is what was causing issues)
    console.log('🧪 Test 1: Verifying SMTP connection...')
    try {
        await transporter.verify()
        console.log('✅ Test 1 PASSED: SMTP connection verified!\n')
    } catch (error) {
        console.error('❌ Test 1 FAILED: SMTP verification failed')
        if (error instanceof Error) {
            console.error('   Error:', error.message)
            
            if (error.message.includes('Connection closed')) {
                console.error('\n💡 This is the same error you were seeing!')
                console.error('💡 Possible causes:')
                console.error('   1. App Password is incorrect or expired')
                console.error('   2. 2-Step Verification not enabled on Gmail')
                console.error('   3. Gmail "Less secure app access" is blocking you')
                console.error('\n📝 To fix:')
                console.error('   1. Go to: https://myaccount.google.com/security')
                console.error('   2. Enable 2-Step Verification')
                console.error('   3. Go to: https://myaccount.google.com/apppasswords')
                console.error('   4. Generate new App Password for "Mail"')
                console.error('   5. Update SMTP_PASS in .env.local (remove spaces)')
            } else if (error.message.includes('Invalid login')) {
                console.error('\n💡 Username or password is incorrect')
                console.error('   - Check SMTP_USER matches your Gmail address')
                console.error('   - Check SMTP_PASS is your App Password (not regular password)')
            }
        }
        console.log('\n🔄 Continuing to Test 2 (sending without verify)...\n')
    }

    // Test 2: Try sending email without verify (the new approach)
    console.log('🧪 Test 2: Sending test email without verify...')
    try {
        const info = await transporter.sendMail({
            from: `"UrCampus Fellowship Test" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER, // Send to yourself
            subject: 'Test Email from UrCampus Fellowship',
            html: `
                <h1>Email Test Successful!</h1>
                <p>If you're reading this, your SMTP configuration is working correctly.</p>
                <p><strong>Configuration:</strong></p>
                <ul>
                    <li>Host: ${process.env.SMTP_HOST}</li>
                    <li>Port: ${process.env.SMTP_PORT}</li>
                    <li>User: ${process.env.SMTP_USER}</li>
                </ul>
                <p>Timestamp: ${new Date().toISOString()}</p>
            `,
        })

        console.log('✅ Test 2 PASSED: Email sent successfully!')
        console.log('   Message ID:', info.messageId)
        console.log('   Response:', info.response)
        console.log('\n✨ Check your inbox:', process.env.SMTP_USER)
        console.log('\n🎉 Your email system is working correctly!')
    } catch (error) {
        console.error('❌ Test 2 FAILED: Could not send email')
        if (error instanceof Error) {
            console.error('   Error:', error.message)
            console.error('   Stack:', error.stack)
        }
        console.log('\n❌ Email system is not working. Follow the troubleshooting steps above.')
        process.exit(1)
    }
}

// Run the test
testEmail()
    .then(() => {
        console.log('\n✅ All tests completed!')
        process.exit(0)
    })
    .catch((error) => {
        console.error('\n💥 Unexpected error:', error)
        process.exit(1)
    })

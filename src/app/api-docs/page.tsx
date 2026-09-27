'use client'

import dynamic from 'next/dynamic'
import 'swagger-ui-react/swagger-ui.css'

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false })

export default function ApiDocsPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="pt-24 pb-8 max-w-7xl mx-auto">
                <SwaggerUI url="/swagger.json" />
            </div>
        </div>
    )
}

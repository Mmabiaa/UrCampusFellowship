import { PageShell } from "@/components/common/site-header"
import { SiteFooter } from "@/components/common/site-footer"
import Link from "next/link"
import Image from "next/image"

export default function ForLeadersPage() {
    return (
        <PageShell>
            <div className="narrow">
                <p className="eyebrow">For chapter leaders</p>
                <h1>Simple tools for meaningful ministry.</h1>
                <p className="intro">
                    Manage your chapter, reach students looking for community, and keep your roster
                    up to date — all in one place.
                </p>

                <figure className="about-photo" style={{ marginTop: "48px" }}>
                    <Image
                        src="https://i.pinimg.com/736x/31/bf/eb/31bfeb8a589618e10bbdf6a4f80c96b6.jpg"
                        alt="Small group leader facilitating discussion"
                        width={1200}
                        height={720}
                        className="about-photo-img"
                        priority
                    />
                    <figcaption>Lead with clarity, not complexity.</figcaption>
                </figure>

                <div style={{ marginTop: "64px" }}>
                    <span className="step-number">01</span>
                    <h3>Set up your chapter</h3>
                    <p style={{ color: "var(--muted-foreground)", lineHeight: "1.65" }}>
                        Add your meeting day, time, location, and WhatsApp group link. Once you save these
                        details, your chapter becomes active and visible to students browsing fellowships
                        on their campus.
                    </p>
                </div>

                <div style={{ marginTop: "56px" }}>
                    <span className="step-number">02</span>
                    <h3>Students join instantly</h3>
                    <p style={{ color: "var(--muted-foreground)", lineHeight: "1.65" }}>
                        When a student registers with your fellowship, they get immediate access to your
                        WhatsApp group — no waiting on approval. They fill out their details (name, phone,
                        program, hall, level) so you know who&apos;s joining your community.
                    </p>
                </div>

                <div style={{ marginTop: "56px" }}>
                    <span className="step-number">03</span>
                    <h3>Manage your roster</h3>
                    <p style={{ color: "var(--muted-foreground)", lineHeight: "1.65" }}>
                        View all registered members and manage your community. You can flag members for
                        follow-up or remove them if needed — freeing them to register elsewhere. You only
                        ever see your own chapter&apos;s members, never another chapter&apos;s.
                    </p>
                </div>

                <div style={{ marginTop: "80px", paddingTop: "40px", borderTop: "1px solid var(--border)" }}>
                    <h2 style={{ fontSize: "30px", marginBottom: "20px" }}>Built for campus ministry</h2>
                    <p className="intro" style={{ marginBottom: "32px" }}>
                        We know you&apos;re already managing WhatsApp groups, planning meetings, and building
                        community. This platform handles the discovery and registration side, so students
                        can find you and you can focus on discipleship.
                    </p>

                    <div style={{
                        background: "var(--sage)",
                        padding: "32px",
                        borderRadius: "12px",
                        marginBottom: "32px",
                    }}>
                        <h3 style={{ fontSize: "18px", marginBottom: "12px" }}>Why we built this</h3>
                        <p style={{ color: "black", fontSize: "15px", lineHeight: "1.65", margin: 0 }}>
                            Most chapters still recruit by walking around campus with a notebook, collecting
                            names and numbers by hand, then adding people to WhatsApp one at a time. Meeting
                            details live in flyers and word of mouth. We think finding your fellowship should
                            be easier than that — for students and for the people leading them.
                        </p>
                    </div>

                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                        <Link className="button button-primary" href="/auth/login">
                            Chapter head login
                        </Link>
                        <Link className="button button-outline" href="/student">
                            Browse as a student
                        </Link>
                    </div>
                </div>
            </div>
            <SiteFooter />
        </PageShell>
    )
}
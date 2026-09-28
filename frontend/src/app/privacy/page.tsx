import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Lock,
  EyeOff,
  Database,
  Cpu,
  Globe,
  Cookie,
  Mail,
  Clock,
  UserCheck,
} from "lucide-react";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Remove Backgrounds Online",
  description:
    "Review our strict Privacy Policy. At Remove Backgrounds Online, your photos are processed purely in ephemeral RAM and never stored on disk or used for AI training.",
  alternates: {
    canonical: "https://removebackgrounds.online/privacy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 28, 2026";

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f] text-slate-100">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-transform hover:scale-[1.02]"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[1.5px]">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-300" />
              </div>
            </div>
            <span className="font-bold text-base tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
              Remove Backgrounds<span className="text-cyan-400"> Online</span>
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to App</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Page Hero */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-4">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Data Protection &amp; Confidentiality</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-slate-400 flex items-center gap-2 justify-center sm:justify-start">
            <Clock className="w-4 h-4 text-slate-500" />
            <span>Last Updated: {lastUpdated}</span>
          </p>
        </div>

        {/* Core Privacy Pillar Callout */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-indigo-950/30 border border-emerald-500/30 mb-10 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg text-emerald-300">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <span>Our Uncompromising Privacy Guarantee: Zero Image Storage</span>
          </div>
          <p>
            When you upload an image to <strong>Remove Backgrounds Online</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-200">
            <li>
              <strong>100% In-Memory RAM Processing:</strong> Your picture is decoded in temporary volatile RAM, processed by our neural network model, and converted into a transparent PNG.
            </li>
            <li>
              <strong>No Disk Writing:</strong> Your image files are <strong>never</strong> saved to hard drives, cloud buckets, or file systems.
            </li>
            <li>
              <strong>Zero AI Training:</strong> We <strong>never</strong> use your photographs or resulting cutouts to train, evaluate, or fine-tune AI models.
            </li>
            <li>
              <strong>Immediate Memory Purge:</strong> Once the processed PNG stream is transmitted back to your browser, all memory buffers holding your image are immediately discarded.
            </li>
          </ul>
        </div>

        {/* Policy Sections */}
        <article className="space-y-10 text-sm leading-relaxed text-slate-300">
          {/* Section 1 */}
          <section id="introduction" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-400" />
              <span>1. Introduction</span>
            </h2>
            <p className="mb-3">
              This Privacy Policy explains how Remove Backgrounds Online (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
              collects, uses, and safeguards information when you visit{" "}
              <strong className="text-white">https://removebackgrounds.online</strong>.
            </p>
            <p>
              We believe privacy is a fundamental human right. Our architecture is deliberately designed so that
              we collect only the bare minimum data required to authenticate users and operate the service.
            </p>
          </section>

          {/* Section 2 */}
          <section id="data-collected" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" />
              <span>2. Information We Collect</span>
            </h2>
            <p className="mb-3">We collect information in the following categories:</p>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <h3 className="font-semibold text-white mb-1 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-indigo-400" />
                  <span>Account Information (Registered Users Only)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  When you sign in using Google OAuth or email credentials via Firebase Authentication, we receive:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-slate-300">
                  <li>Your Google account email address and unique User ID (UID).</li>
                  <li>Your public profile display name and profile picture URL (if provided by Google).</li>
                  <li>Account creation timestamp and processed image counter stored in Cloud Firestore.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <h3 className="font-semibold text-white mb-1 flex items-center gap-2">
                  <EyeOff className="w-4 h-4 text-emerald-400" />
                  <span>Uploaded Image Data (Ephemeral Only)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Image files (JPG, PNG, WEBP) uploaded for background removal are held temporarily in volatile memory
                  (RAM) solely for the runtime duration of the background segmentation algorithm. They are never written
                  to persistent storage or linked to your personal identity.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                <h3 className="font-semibold text-white mb-1 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span>Technical &amp; Log Data</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Standard web server logs may temporarily record anonymous technical metrics including IP address,
                  browser type, referral headers, and HTTP response codes. These logs are used solely for DDoS mitigation,
                  rate-limiting enforcement, and server health monitoring.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="how-we-use-data" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span>3. How We Use Your Information</span>
            </h2>
            <p className="mb-3">We use collected information exclusively to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Authenticate your identity when signing in via Google OAuth or email.</li>
              <li>Record your total processed image counter and maintain your account profile.</li>
              <li>Execute the requested background removal transformation in real time.</li>
              <li>Prevent automated bot abuse, fraud, and Denial of Service (DoS) attacks.</li>
              <li>Provide customer support when you reach out to our team.</li>
            </ul>
            <p className="mt-3">
              We <strong>never sell, rent, monetize, or trade</strong> your personal information or uploaded images to third
              parties, advertisers, or data brokers.
            </p>
          </section>

          {/* Section 4 */}
          <section id="third-party-services" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span>4. Third-Party Service Providers</span>
            </h2>
            <p className="mb-3">
              We rely on vetted infrastructure providers to deliver our services securely:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Google Firebase Authentication &amp; Firestore:</strong> Handles secure authentication, OAuth sign-in,
                and user profile records under Google Cloud Enterprise security standards.
              </li>
              <li>
                <strong>Cloud Hosting Infrastructure:</strong> Houses our self-hosted Docker containers and Python AI
                microservice behind encrypted Nginx reverse proxies with SSL/TLS (Let&apos;s Encrypt).
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="cookies" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Cookie className="w-5 h-5 text-amber-400" />
              <span>5. Cookies &amp; Local Storage</span>
            </h2>
            <p className="mb-3">
              We do not use invasive tracking cookies or third-party marketing beacons.
            </p>
            <p>
              We utilize essential browser local storage and session tokens strictly to keep you signed in, remember your
              interface preferences, and maintain offline fallback testing mode. You can clear cookies and local storage
              at any time via your browser settings.
            </p>
          </section>

          {/* Section 6 */}
          <section id="data-rights" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>6. Your Rights (GDPR &amp; CCPA Compliance)</span>
            </h2>
            <p className="mb-3">
              Depending on your location, you possess privacy rights under the European General Data Protection Regulation
              (GDPR) or California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mb-3">
              <li><strong>Right to Access:</strong> You can request a summary of personal information we hold about you.</li>
              <li><strong>Right to Rectification:</strong> You can request corrections to any inaccurate account details.</li>
              <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> You may request permanent deletion of your account and Firestore user document.</li>
              <li><strong>Right to Data Portability:</strong> You may request an export of your account metadata in a portable JSON format.</li>
            </ul>
            <p>
              To exercise any of these rights, email us directly at{" "}
              <a href="mailto:privacy@removebackgrounds.online" className="text-indigo-400 hover:text-indigo-300 underline font-medium">
                privacy@removebackgrounds.online
              </a>.
            </p>
          </section>

          {/* Section 7 */}
          <section id="security" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-400" />
              <span>7. Data Security Measures</span>
            </h2>
            <p className="mb-3">
              We employ strict industry-standard technical measures to safeguard your data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>All web traffic between your browser and our servers is secured using modern TLS 1.3 / HTTPS encryption.</li>
              <li>AI inference microservices operate in sandboxed, non-privileged Docker container runtimes.</li>
              <li>Database access rules enforce strict user-only read/write permissions via Firebase Security Rules.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section id="children" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-purple-400" />
              <span>8. Children&apos;s Privacy</span>
            </h2>
            <p>
              Remove Backgrounds Online is not directed toward children under 13 years of age (or 16 in the EEA). We do not
              knowingly collect personal identifiable information from children. If you become aware that a child has provided
              us with personal data, please contact us immediately for account termination and data purge.
            </p>
          </section>

          {/* Section 9 */}
          <section id="contact" className="scroll-mt-24 p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-cyan-400" />
              <span>9. Contact Our Data Protection Officer</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our zero-retention data
              practices, please contact us:
            </p>
            <div className="mt-3 text-xs sm:text-sm font-medium text-slate-200">
              <p>Email: <a href="mailto:privacy@removebackgrounds.online" className="text-indigo-400 hover:text-indigo-300 underline">privacy@removebackgrounds.online</a></p>
              <p>Support: <a href="mailto:support@removebackgrounds.online" className="text-indigo-400 hover:text-indigo-300 underline">support@removebackgrounds.online</a></p>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

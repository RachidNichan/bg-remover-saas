import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Scale,
  FileText,
  CreditCard,
  AlertTriangle,
  UserCheck,
  Ban,
  HelpCircle,
  Clock,
} from "lucide-react";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Remove Backgrounds Online",
  description:
    "Read the Terms of Service for Remove Backgrounds Online. Learn about our service terms, ephemeral image processing policies, user credits, acceptable use, and intellectual property rights.",
  alternates: {
    canonical: "https://removebackgrounds.online/terms",
  },
};

export default function TermsOfServicePage() {
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

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Page Hero */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 mb-4">
            <Scale className="w-3.5 h-3.5 text-indigo-400" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-slate-400 flex items-center gap-2 justify-center sm:justify-start">
            <Clock className="w-4 h-4 text-slate-500" />
            <span>Last Updated: {lastUpdated}</span>
          </p>
        </div>

        {/* Quick Highlights Box */}
        <div className="p-5 sm:p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 mb-10 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
          <p className="font-semibold text-white flex items-center gap-2 text-sm sm:text-base">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Summary of Key Principles</span>
          </p>
          <p>
            • <strong>Your Content is Yours:</strong> You retain 100% intellectual property ownership of any photo you upload and all transparent cutouts you generate.
          </p>
          <p>
            • <strong>Zero Data Retention:</strong> Images uploaded for background removal are processed strictly in server RAM and are immediately purged from memory once the transparent PNG is delivered. We never store your photos or use them to train AI models.
          </p>
          <p>
            • <strong>Fair Usage:</strong> You agree not to upload abusive, unlawful, or infringing images, or attempt to overwhelm or reverse-engineer the service.
          </p>
        </div>

        {/* Legal Sections */}
        <article className="space-y-10 text-sm leading-relaxed text-slate-300">
          {/* Section 1 */}
          <section id="acceptance" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span>1. Acceptance of Terms</span>
            </h2>
            <p className="mb-3">
              By accessing, browsing, or using the website located at{" "}
              <strong className="text-white">https://removebackgrounds.online</strong> (the &quot;Service&quot;),
              or any related services provided by Remove Backgrounds Online (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;),
              you (&quot;User&quot;, &quot;you&quot;) acknowledge that you have read, understood, and agree to be bound by these
              Terms of Service (&quot;Terms&quot;) and our Privacy Policy.
            </p>
            <p>
              If you do not agree with any part of these Terms, you must immediately cease accessing or using
              the Service.
            </p>
          </section>

          {/* Section 2 */}
          <section id="service-description" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>2. Description of the Service</span>
            </h2>
            <p className="mb-3">
              Remove Backgrounds Online is an automated cloud-based software-as-a-service (SaaS) utility that utilizes
              machine learning neural network models to isolate subjects (such as humans, products, automobiles, and animals)
              and remove backgrounds from user-supplied digital image files.
            </p>
            <p>
              The service converts raster graphics (JPG, PNG, WEBP) into transparent PNG cutouts. The processing is
              performed using optimized CPU inference.
            </p>
          </section>

          {/* Section 3 */}
          <section id="accounts-credits" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              <span>3. User Accounts &amp; Credit System</span>
            </h2>
            <p className="mb-3">
              To utilize full-resolution downloads and track credit balance, users may register an account using
              Google Sign-In or email credentials via Firebase Authentication:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>
                <strong>Free Credits:</strong> New verified user accounts may receive promotional complimentary credits
                (e.g., 3 free credits upon initial signup) to test the Service.
              </li>
              <li>
                <strong>Credit Consumption:</strong> Each successful background removal request consumes one (1) credit
                from your account balance upon processing.
              </li>
              <li>
                <strong>Non-Transferability:</strong> Credits are tied exclusively to your registered account and cannot
                be transferred, bartered, or redeemed for cash.
              </li>
              <li>
                <strong>Account Responsibility:</strong> You are responsible for safeguarding your login credentials and
                for all activities occurring under your account.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="intellectual-property" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-purple-400" />
              <span>4. Intellectual Property &amp; Content Ownership</span>
            </h2>
            <p className="mb-3">
              <strong>Your Content:</strong> You retain complete and unencumbered copyright, trademark, and all other
              proprietary rights to any images, graphics, or content you upload to the Service, as well as the resulting
              transparent cutouts. Remove Backgrounds Online claims zero ownership or intellectual property rights over your photos.
            </p>
            <p className="mb-3">
              <strong>Limited Processing License:</strong> You grant us solely the temporary, non-exclusive, worldwide,
              royalty-free license to transmit, resize, and process your image in memory for the single and exclusive purpose
              of executing the requested background removal and returning the result to your device.
            </p>
            <p>
              <strong>Platform Ownership:</strong> All rights, title, and interest in and to the Remove Backgrounds Online
              platform, website design, UI components, code, logo, domain, and branding belong exclusively to Remove Backgrounds Online.
            </p>
          </section>

          {/* Section 5 */}
          <section id="acceptable-use" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Ban className="w-5 h-5 text-red-400" />
              <span>5. Acceptable Use Policy</span>
            </h2>
            <p className="mb-3">You expressly agree that you will NOT use the Service to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Upload or process any image containing child sexual abuse material (CSAM), non-consensual imagery, extreme
                violence, or any material that violates applicable local, state, federal, or international laws.
              </li>
              <li>
                Process images that infringe upon any patent, trademark, trade secret, copyright, right of publicity, or
                other proprietary right of any party without explicit authorization.
              </li>
              <li>
                Probe, scan, benchmark, or test the vulnerability of the infrastructure, or attempt to bypass any security
                or rate-limiting measures.
              </li>
              <li>
                Deploy automated scrapers, bots, or scripts designed to abuse API endpoints or simulate fraudulent requests.
              </li>
              <li>
                Decompile, reverse-engineer, or disassemble any part of the service code or model runtime.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section id="payments-refunds" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-cyan-400" />
              <span>6. Payments, Billing &amp; Refunds</span>
            </h2>
            <p className="mb-3">
              Credit bundles and premium subscriptions are billed in U.S. Dollars (USD) or local currency equivalents.
              All payment transactions are handled through secure third-party payment gateways.
            </p>
            <p>
              <strong>Refunds:</strong> If you purchase credits and encounter technical malfunctions preventing the successful
              removal of backgrounds, contact our support team at{" "}
              <a
                href="mailto:support@removebackgrounds.online"
                className="text-indigo-400 hover:text-indigo-300 underline font-medium"
              >
                support@removebackgrounds.online
              </a>{" "}
              within 14 days of purchase. Unused credit packages may be refunded upon review. Consumed credits are generally
              non-refundable.
            </p>
          </section>

          {/* Section 7 */}
          <section id="disclaimer" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>7. Disclaimer of Warranties (&quot;As-Is&quot;)</span>
            </h2>
            <p className="mb-3">
              THE SERVICE IS PROVIDED ON AN &quot;AS-IS&quot; AND &quot;AS-AVAILABLE&quot; BASIS WITHOUT ANY WARRANTIES OF ANY KIND,
              WHETHER EXPRESS OR IMPLIED. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p>
              While our AI model provides high segmentation precision, we do not warrant that output cutouts will meet all
              aesthetic expectations, be error-free, or that service operation will be uninterrupted.
            </p>
          </section>

          {/* Section 8 */}
          <section id="liability" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-400" />
              <span>8. Limitation of Liability</span>
            </h2>
            <p>
              IN NO EVENT SHALL REMOVE BACKGROUNDS ONLINE, ITS DIRECTORS, EMPLOYEES, OR AFFILIATES BE LIABLE FOR ANY
              INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE
              OF OR INABILITY TO USE THE SERVICE. OUR TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE GREATER OF FIFTY
              DOLLARS ($50 USD) OR THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          {/* Section 9 */}
          <section id="modifications" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-400" />
              <span>9. Modifications to Terms</span>
            </h2>
            <p>
              We reserve the right to revise or replace these Terms at any time. When updates are published, the &quot;Last Updated&quot;
              date at the top will be updated accordingly. Continued use of the Service following published updates constitutes
              your acceptance of the modified Terms.
            </p>
          </section>

          {/* Section 10 */}
          <section id="contact" className="scroll-mt-24 p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              <span>10. Contact Information</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              For legal inquiries, terms clarification, or copyright concerns, please reach out to:
            </p>
            <div className="mt-3 text-xs sm:text-sm font-medium text-slate-200">
              <p>Email: <a href="mailto:support@removebackgrounds.online" className="text-indigo-400 hover:text-indigo-300 underline">support@removebackgrounds.online</a></p>
              <p>Website: <a href="https://removebackgrounds.online" className="text-indigo-400 hover:text-indigo-300 underline">https://removebackgrounds.online</a></p>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

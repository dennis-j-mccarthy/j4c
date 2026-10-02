import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Jobs For Catholics",
  description: "What JobsForCatholics.com collects, why, who sees it, and how to control it.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 2, 2026"
      intro="Applying for a job means trusting a site with your work history, contact details, and sometimes your faith life. This policy explains, in plain language, what we collect, why, who can see it, and how you stay in control."
      sections={[
        {
          heading: "What we collect",
          body: [
            "Account and profile details you give us: name, email, phone, location, headline, desired roles, education, and preferences.",
            "Documents and media you upload or create: resumes (including ones built with our AI tools), cover letters, headshots, portfolio images, and videos.",
            "Activity on the Site: jobs you save or apply to, application stages set by employers, messages you send through contact and inquiry forms, and basic technical data such as device and browser type.",
            "For employers and freelancers: organization details, job postings, listing content, and billing records (card details are handled by our payment processor, never stored by us).",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "To run the Site: show your profile and listings, deliver applications to employers, compute fit scores, and send the job alerts you choose.",
            "To power the AI features you ask for. When you request a resume draft, tailored resume, cover letter, job description, or fit read, the relevant text is sent to our AI provider to generate the result. We do not allow that provider to use your content to train its models.",
            "To keep the Site safe, fix problems, and improve it. We don't sell your personal information, and we don't share it with advertisers.",
          ],
        },
        {
          heading: "Who can see what",
          body: [
            "Employers see an application only for the job it was sent to — including your contact details, cover letter, and resume. Applicant lists are visible only to the hiring organization.",
            "If you mark your candidate profile as searchable, signed-in employers can view your profile summary. You can switch this off at any time.",
            "Freelancer profiles and portfolios are public by design. Inquiries sent to a freelancer go to that freelancer.",
            "Service providers that host our database, files, email, payments, and AI features process data on our behalf under confidentiality obligations.",
          ],
        },
        {
          heading: "How long we keep it",
          body: [
            "We keep your account data while your account is active. When you delete your account, we delete or anonymize your profile and documents within 30 days, except records we must keep for legal or billing reasons. Applications you already submitted remain with the employers who received them.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            "You can view and edit your profile, turn employer search off, change alert frequency, delete individual documents, or ask us to export or delete everything. Depending on where you live, you may have additional rights under laws such as the CCPA; contact us and we'll honor them.",
          ],
        },
        {
          heading: "Security",
          body: [
            "Uploaded files are stored privately and served through short-lived signed links. Data is encrypted in transit. No system is perfectly secure, so please use a unique email-account password and tell us right away if you suspect misuse.",
          ],
        },
        {
          heading: "Children",
          body: [
            "The Site is not intended for children under 16, and we don't knowingly collect their information.",
          ],
        },
      ]}
    />
  );
}

import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use — Jobs For Catholics",
  description: "The terms that govern using JobsForCatholics.com as a job seeker, employer, or freelancer.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="October 2, 2026"
      intro="These terms govern your use of JobsForCatholics.com (the “Site”), whether you are looking for work, hiring, or offering freelance services. By creating an account or using the Site, you agree to them. If you don't agree, please don't use the Site."
      sections={[
        {
          heading: "1. Who can use the Site",
          body: [
            "You must be at least 16 years old to create a job-seeker profile and at least 18 to post jobs or list freelance services. You're responsible for keeping your account information accurate and for everything that happens under your account.",
          ],
        },
        {
          heading: "2. Job seekers",
          body: [
            "Your profile, resume, and applications are yours. When you apply to a job, you authorize us to share your application with that employer. If you mark your profile as searchable, employers on the Site may view it.",
            "Our AI tools (resume writing, tailoring, cover letters, fit scores) produce drafts and estimates. Review everything before you send it — you are responsible for the accuracy of what you submit, and a fit score is guidance, not a hiring decision.",
          ],
        },
        {
          heading: "3. Employers",
          body: [
            "Postings must describe real, currently open positions and comply with applicable employment law. Religious organizations may state faith-based qualifications to the extent the law permits them; all employers remain responsible for their own hiring decisions and legal compliance.",
            "You may use applicant information only to evaluate candidates for the position they applied to. Don't contact candidates for unrelated purposes, sell or share their data, or post misleading listings. We may edit, refuse, or remove postings that violate these terms.",
          ],
        },
        {
          heading: "4. Freelancers",
          body: [
            "Freelance listings are offered on a monthly subscription. You set your own rates and terms with clients; Jobs For Catholics is not a party to those agreements and takes no commission. You are responsible for the work you deliver and for your own taxes, licenses, and insurance.",
            "Portfolio images you upload must be your own work or used with permission. Captions and pitches must be truthful.",
          ],
        },
        {
          heading: "5. Fees and payments",
          body: [
            "Some services are paid — for example additional job listings, featured placement, and freelancer subscriptions. Prices are shown before you buy. Subscriptions renew until cancelled and can be cancelled at any time, effective at the end of the current billing period. Fees already paid are non-refundable except where required by law.",
          ],
        },
        {
          heading: "6. Acceptable use",
          body: [
            "Don't scrape the Site, impersonate anyone, upload malicious code, harass other users, or post content that is unlawful, discriminatory beyond what the law permits, or contrary to the dignity of the human person. We may suspend accounts that do.",
          ],
        },
        {
          heading: "7. Your content",
          body: [
            "You keep ownership of what you post. You give us a limited license to host, display, and process it to operate the Site — including to generate AI drafts and fit scores you request. That license ends when you delete the content or your account, except for copies an employer has already received through an application.",
          ],
        },
        {
          heading: "8. Disclaimers and liability",
          body: [
            "We connect people; we don't employ candidates, guarantee hires, or verify every claim made in a posting, profile, or listing. The Site is provided “as is.” To the extent the law allows, our total liability for any claim relating to the Site is limited to the fees you paid us in the twelve months before the claim.",
          ],
        },
        {
          heading: "9. Changes",
          body: [
            "We may update these terms. If a change is material, we'll notify you by email or on the Site before it takes effect. Continuing to use the Site after that means you accept the updated terms.",
          ],
        },
      ]}
    />
  );
}

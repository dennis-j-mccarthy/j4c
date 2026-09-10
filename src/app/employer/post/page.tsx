import { redirect } from "next/navigation";

// post-a-job requires an employer account; onboarding is the front door for now
export default function EmployerPostPage() {
  redirect("/employer/register");
}

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const EMPLOYER_COOKIE = "jfc_employer";

/** The signed-in employer (cookie holds the user id) with their company, or null. */
export async function getEmployer() {
  const cookieStore = await cookies();
  const userId = cookieStore.get(EMPLOYER_COOKIE)?.value;
  if (!userId) return null;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { company: true },
  });
  if (!user || user.role !== "EMPLOYER" || !user.company) return null;
  return { user, company: user.company };
}

/** The job, only if it belongs to the signed-in employer's company. */
export async function getOwnedJob(jobId: string) {
  const employer = await getEmployer();
  if (!employer) return { employer: null, job: null };
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job || job.companyId !== employer.company.id) return { employer, job: null };
  return { employer, job };
}

export const employerCookieOptions = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax" as const,
  httpOnly: true,
};

export const TYPE_LABELS: Record<string, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  TEMPORARY: "Temporary",
  INTERNSHIP: "Internship",
  VOLUNTEER: "Volunteer",
};

export const MODE_LABELS: Record<string, string> = {
  ONSITE: "On-site",
  HYBRID: "Hybrid",
  REMOTE: "Remote",
};

export function formatSalary(min: number | null, max: number | null): string | null {
  if (min == null && max == null) return null;
  const lo = min ?? max!;
  const hi = max ?? min!;
  if (lo >= 10000) {
    const k = (n: number) => `$${Math.round(n / 1000)}k`;
    return lo === hi ? k(lo) : `${k(lo)} – ${k(hi)}`;
  }
  if (lo >= 100) {
    return lo === hi ? `$${lo}/wk` : `$${lo} – $${hi}/wk`;
  }
  return lo === hi ? `$${lo}/hr` : `$${lo} – $${hi}/hr`;
}

export function timeAgo(date: Date): string {
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

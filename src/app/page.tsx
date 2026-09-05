import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-brand px-4 py-2 text-sm text-white">
        <div className="mx-auto flex max-w-6xl justify-end gap-4">
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        </div>
      </div>

      <header className="bg-white px-4 py-4 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/">
            <Image
              src="/brand/logomail.png"
              alt="JobsForCatholics.com"
              width={332}
              height={133}
              className="h-16 w-auto"
              priority
            />
          </Link>
          <nav className="hidden gap-6 font-medium text-ink sm:flex">
            <Link href="/search" className="hover:text-brand-dark">
              Job Search
            </Link>
            <Link href="/info" className="hover:text-brand-dark">
              Job Seekers
            </Link>
            <Link href="/employer/info" className="hover:text-brand-dark">
              Employers
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden">
          <Image
            src="/brand/hero-church-windows.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative mx-auto max-w-3xl px-4 py-20 text-center text-white">
            <h1 className="font-heading text-4xl font-bold sm:text-5xl">
              Faith-filled work starts here
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Connecting Catholic job seekers with parishes, schools, and
              mission-driven employers.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/search"
                className="rounded-sm bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-dark"
              >
                Find a Job
              </Link>
              <Link
                href="/employer/register"
                className="rounded-sm border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-ink"
              >
                Post a Job
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink px-4 py-10 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-sm">
          <p>&copy; {new Date().getFullYear()} JobsForCatholics.com</p>
          <p className="text-white/70">Ora et labora</p>
        </div>
      </footer>
    </div>
  );
}

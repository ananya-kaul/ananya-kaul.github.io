import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const NotFound = () => {
  return (
    <section className="w-full min-h-[80vh] flex flex-col justify-center items-center text-ink px-6 py-24">
      <div className="text-center">
        <p className="font-display text-7xl sm:text-9xl font-bold text-danger mb-4">
          404
        </p>
        <h1 className="text-2xl sm:text-4xl font-semibold mb-4">
          Page Not Found
        </h1>
        <p className="text-muted max-w-md mx-auto mb-8 leading-relaxed">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex min-h-12 py-3 px-6 gap-2 justify-center items-center rounded-xl border border-line-strong text-ink font-semibold transition-all hover:border-blue-500 hover:text-accent"
        >
          Go back home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;

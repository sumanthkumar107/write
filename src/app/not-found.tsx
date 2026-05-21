import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary px-4">
      <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
      <p className="text-xl text-text-muted mb-8">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-btn-primary text-white rounded-button hover:bg-btn-hover transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}
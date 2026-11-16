// client/src/pages/HomePage.tsx
// Temporary landing hero to check fonts and colours. Replaced by the full
// home page (hero, categories, new arrivals, best sellers) in WEB-2.
import { Link } from 'react-router';

export function HomePage() {
  return (
    <section className="bg-paper">
      <div className="container-site flex flex-col items-center py-20 text-center sm:py-28">
        <p className="eyebrow">The new season</p>
        <h1 className="mt-4 text-4xl leading-[1.05] sm:text-6xl">
          Made to be worn,
          <br />
          <span className="text-bronze italic">made to be kept.</span>
        </h1>
        <p className="text-ink-soft mt-6 max-w-xl text-base">
          Considered clothing and accessories for every season — designed in Dhaka, built to last
          beyond the trend.
        </p>
        <Link
          to="/styleguide"
          className="bg-ink text-paper hover:bg-bronze-dark mt-10 inline-flex h-11 items-center px-7 font-mono text-sm tracking-[0.12em] uppercase transition-colors"
        >
          View style guide
        </Link>
      </div>
    </section>
  );
}

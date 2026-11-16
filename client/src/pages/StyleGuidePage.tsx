// client/src/pages/StyleGuidePage.tsx
// Living reference of the RICOVERSE tokens. Open /styleguide while building UI.
import { formatPrice } from '@/lib/formatPrice';

const colors = [
  { name: 'paper', className: 'bg-paper', hex: '#ffffff' },
  { name: 'cream', className: 'bg-cream', hex: '#f3eee6' },
  { name: 'sand', className: 'bg-sand', hex: '#e7dccb' },
  { name: 'taupe', className: 'bg-taupe', hex: '#d4bfa6' },
  { name: 'blush', className: 'bg-blush', hex: '#fce6e3' },
  { name: 'bronze', className: 'bg-bronze', hex: '#6e4e2a' },
  { name: 'ink', className: 'bg-ink', hex: '#121110' },
  { name: 'muted', className: 'bg-muted', hex: '#8a847c' },
  { name: 'line', className: 'bg-line', hex: '#e6e0d6' },
];

export function StyleGuidePage() {
  return (
    <div className="bg-cream py-16">
      <div className="container-site space-y-16">
        <header>
          <p className="eyebrow">RICOVERSE</p>
          <h1 className="mt-2 text-4xl">Style guide</h1>
        </header>

        <section aria-labelledby="colors">
          <h2 id="colors" className="text-2xl">
            Colours
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {colors.map((color) => (
              <li key={color.name} className="rounded-card bg-paper shadow-card p-3">
                <div className={`rounded-card border-line h-20 border ${color.className}`} />
                <p className="mt-3 text-sm font-medium">{color.name}</p>
                <p className="text-muted font-mono text-xs">{color.hex}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="type" className="space-y-4">
          <h2 id="type" className="text-2xl">
            Typography
          </h2>
          <p className="eyebrow">Eyebrow — IBM Plex Mono 11px uppercase</p>
          <p className="font-display text-5xl">Display — Fraunces</p>
          <p className="font-display text-2xl">The Linen Overshirt</p>
          <p className="text-ink-soft max-w-prose text-base">
            Body — Inter. A relaxed overshirt cut from washed linen, finished with horn buttons and
            a soft collar. True to size.
          </p>
          <p className="text-bronze font-mono text-lg">{formatPrice(4250)}</p>
        </section>

        <section aria-labelledby="buttons" className="space-y-4">
          <h2 id="buttons" className="text-2xl">
            Buttons (preview — real components come in WEB-2)
          </h2>
          <div className="flex flex-wrap gap-3">
            <button className="bg-ink text-paper hover:bg-bronze-dark h-11 px-7 font-mono text-sm tracking-[0.12em] uppercase">
              Add to bag
            </button>
            <button className="border-ink hover:bg-ink hover:text-paper h-11 border px-7 font-mono text-sm tracking-[0.12em] uppercase">
              Apply
            </button>
            <button className="text-bronze h-11 px-2 text-sm underline underline-offset-4">
              Size guide →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

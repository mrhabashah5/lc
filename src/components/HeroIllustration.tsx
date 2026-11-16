/**
 * Original flat illustration: a consultant and a client reviewing loan documents at a desk.
 * Inline SVG in brand colours, so it adds no image download and stays sharp at any size.
 */
export function HeroIllustration({ className = "" }: { className?: string }) {
  const navy = "#00496E";
  const navyDark = "#003552";
  const sky = "#1890C4";
  const skyBrand = "#20A7E2";
  const skyLight = "#B5E2F9";
  const orange = "#FF7026";
  const white = "#FFFFFF";
  const line = "#E5EDF2";
  const skinA = "#C68642";
  const skinB = "#8D5524";
  const hair = "#2B1D18";

  return (
    <svg viewBox="0 0 560 520" className={className} role="img" aria-labelledby="hero-ill-title">
      <title id="hero-ill-title">A consultant and a client reviewing loan documents together</title>

      {/* Wall frame with a cleared document */}
      <rect x="196" y="40" width="168" height="112" rx="14" fill={white} opacity="0.85" />
      <rect x="218" y="60" width="62" height="74" rx="6" fill={white} stroke={navy} strokeWidth="4" />
      <path d="M230 80h38M230 94h30M230 108h34" stroke={line} strokeWidth="6" strokeLinecap="round" />
      <circle cx="318" cy="96" r="24" fill={sky} />
      <path d="M307 96l8 8 15-17" fill="none" stroke={white} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

      {/* Plant (left) */}
      <path d="M58 300c-6-40 10-74 30-92 4 30-2 64-18 92z" fill={sky} />
      <path d="M74 300c4-44 30-70 56-80-6 32-24 62-48 80z" fill={skyBrand} />
      <path d="M66 300c-24-26-36-56-30-84 22 18 34 50 36 84z" fill={navy} opacity="0.85" />
      <path d="M44 296h56l-8 52H52z" fill={navy} />

      {/* Client chair + client (left, facing right) */}
      <rect x="98" y="228" width="26" height="132" rx="10" fill={navyDark} />
      <path d="M104 236c6-30 30-46 62-46s50 18 52 52l6 92H110z" fill={sky} />
      <path d="M150 194h22v18c0 8-22 8-22 0z" fill={skinB} />
      <circle cx="162" cy="164" r="32" fill={skinB} />
      <path d="M130 160c0-24 16-36 34-36 20 0 34 14 32 30-12-8-30-10-44-2-6 4-14 8-22 8z" fill={hair} />
      {/* Client arm resting on desk, holding a paper */}
      <path d="M196 246c14 22 24 44 38 68" fill="none" stroke={skyBrand} strokeWidth="24" strokeLinecap="round" />
      <circle cx="238" cy="320" r="11" fill={skinB} />

      {/* Consultant chair + consultant (right, facing left) */}
      <rect x="436" y="214" width="28" height="146" rx="10" fill={navyDark} />
      <path d="M454 230c-6-32-32-48-64-48s-52 18-54 54l-6 98h126z" fill={navy} />
      <path d="M372 196l18 30 18-30z" fill={white} />
      <path d="M380 186h22v18c0 8-22 8-22 0z" fill={skinA} />
      <circle cx="392" cy="156" r="32" fill={skinA} />
      {/* Hair with a bun */}
      <circle cx="420" cy="128" r="14" fill={hair} />
      <path d="M362 156c-4-26 12-44 34-44 22 0 36 16 34 38-4 16-10 28-14 36 0-18-4-30-14-36-12-6-28-4-40 6z" fill={hair} />
      {/* Consultant arm on laptop */}
      <path d="M362 248c-14 22-28 44-44 66" fill="none" stroke={navyDark} strokeWidth="24" strokeLinecap="round" />
      <circle cx="314" cy="320" r="11" fill={skinA} />

      {/* Desk */}
      <ellipse cx="280" cy="500" rx="230" ry="14" fill={navy} opacity="0.12" />
      <rect x="36" y="330" width="488" height="20" rx="10" fill={navy} />
      <rect x="72" y="350" width="416" height="104" rx="10" fill={white} opacity="0.7" />
      <path d="M280 360v84" stroke={skyLight} strokeWidth="4" />
      <rect x="152" y="396" width="56" height="10" rx="5" fill={sky} />
      <rect x="352" y="396" width="56" height="10" rx="5" fill={sky} />
      <rect x="84" y="454" width="16" height="44" rx="4" fill={navy} />
      <rect x="460" y="454" width="16" height="44" rx="4" fill={navy} />

      {/* Laptop (back view, facing the consultant) */}
      <path d="M290 248h90l-8 82h-86z" fill={line} />
      <path d="M296 254h78l-7 70h-74z" fill={white} />
      <circle cx="333" cy="288" r="10" fill={skyLight} />
      <rect x="276" y="326" width="112" height="8" rx="4" fill={navy} />

      {/* Document with approval seal (client side) */}
      <g transform="rotate(-8 214 312)">
        <rect x="186" y="286" width="62" height="44" rx="5" fill={white} stroke={navy} strokeWidth="3" />
        <path d="M196 300h30M196 312h22" stroke={line} strokeWidth="5" strokeLinecap="round" />
        <circle cx="236" cy="320" r="9" fill={orange} />
      </g>

      {/* Mug */}
      <rect x="436" y="300" width="28" height="30" rx="6" fill={white} stroke={navy} strokeWidth="3" />
      <path d="M464 308c10 0 10 14 0 14" fill="none" stroke={navy} strokeWidth="3" />

      {/* Speech bubble */}
      <g>
        <rect x="236" y="176" width="88" height="48" rx="16" fill={white} />
        <path d="M262 224l-8 16 22-16z" fill={white} />
        <circle cx="262" cy="200" r="6" fill={sky} />
        <circle cx="280" cy="200" r="6" fill={sky} />
        <circle cx="298" cy="200" r="6" fill={orange} />
      </g>
    </svg>
  );
}

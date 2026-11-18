// Generates article thumbnails and social share images in brand colours.
// Every file is compressed until it is under MAX_BYTES (10 KB).
//
//   npm run images
//
// Output:
//   public/images/articles/<slug>.webp   640x360  card thumbnail (no text)
//   public/images/og/<slug>.jpg          1200x630 social share image (title + brand)
//   public/images/og/default.jpg         1200x630 site-wide share image
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const MAX_BYTES = 10_000; // "under 10 KB", counted strictly as 10,000 bytes
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const thumbDir = path.join(root, "public", "images", "articles");
const ogDir = path.join(root, "public", "images", "og");
fs.mkdirSync(thumbDir, { recursive: true });
fs.mkdirSync(ogDir, { recursive: true });

const C = {
  navy: "#0B4D33",
  sky: "#15934A",
  skyBrand: "#22C55E",
  skyInk: "#0E7A3E",
  skyLight: "#D9F4E4",
  orange: "#F97316",
  white: "#FFFFFF",
  line: "#E3EFE8",
  surface: "#F4FAF6",
};

// Each article gets its own motif. Keep this in sync with src/content/articles.
const articles = [
  { slug: "loan-clearance-certificate-noc-pakistan", motif: "doc", eyebrow: "Documents", title: "How to Get a Loan Clearance Certificate (NOC) in Pakistan" },
  { slug: "close-loan-app-loan-pakistan", motif: "phone", eyebrow: "Loan Apps", title: "How to Close a Loan App Loan and Get Written Clearance" },
  { slug: "check-loan-app-secp-approved", motif: "magnifier", eyebrow: "Loan Apps", title: "How to Check if a Loan App Is SECP-Approved" },
  { slug: "loan-app-harassment-pakistan", motif: "shield", eyebrow: "Your Rights", title: "Loan App Harassment: Your Rights and Where to Complain" },
  { slug: "loan-settlement-vs-loan-clearance", motif: "compare", eyebrow: "Basics", title: "Loan Settlement vs. Loan Clearance: What Is the Difference?" },
  { slug: "check-credit-report-pakistan", motif: "chart", eyebrow: "Credit", title: "How to Check Your Credit Report in Pakistan" },
  { slug: "remove-bank-lien-car-registration-pakistan", motif: "car", eyebrow: "Auto Finance", title: "Remove the Bank's Name From Your Car Registration" },
  { slug: "clearance-letter-noc-explained", motif: "seal", eyebrow: "Documents", title: "The Clearance Letter (NOC) Explained" },
  { slug: "understanding-your-credit-record-in-pakistan", motif: "gauge", eyebrow: "Credit", title: "Understanding Your Credit Record in Pakistan" },
];

// ---- Motifs: original line illustrations drawn in a 200x200 box ----
const check = (x, y, s = 1, color = C.white) =>
  `<path d="M${x - 14 * s} ${y + 1 * s} l${10 * s} ${10 * s} l${20 * s} -${22 * s}" fill="none" stroke="${color}" stroke-width="${7 * s}" stroke-linecap="round" stroke-linejoin="round"/>`;

const motifs = {
  doc: `
    <path d="M45 20 h82 l33 33 v127 a10 10 0 0 1 -10 10 h-105 a10 10 0 0 1 -10 -10 v-150 a10 10 0 0 1 10 -10z" fill="${C.white}" stroke="${C.navy}" stroke-width="6"/>
    <path d="M127 20 v33 h33" fill="none" stroke="${C.navy}" stroke-width="6" stroke-linejoin="round"/>
    <g stroke="${C.line}" stroke-width="8" stroke-linecap="round"><path d="M60 70 h60"/><path d="M60 92 h80"/><path d="M60 114 h70"/></g>
    <circle cx="138" cy="152" r="30" fill="${C.sky}"/>${check(138, 150)}`,
  phone: `
    <rect x="52" y="12" width="96" height="176" rx="18" fill="${C.white}" stroke="${C.navy}" stroke-width="6"/>
    <rect x="66" y="34" width="68" height="112" rx="6" fill="${C.surface}"/>
    <path d="M86 24 h28" stroke="${C.navy}" stroke-width="5" stroke-linecap="round"/>
    <rect x="76" y="118" width="48" height="10" rx="5" fill="${C.line}"/><rect x="76" y="118" width="48" height="10" rx="5" fill="${C.sky}"/>
    <circle cx="100" cy="80" r="26" fill="${C.sky}"/>${check(100, 78)}
    <circle cx="100" cy="168" r="7" fill="${C.navy}"/>`,
  magnifier: `
    <rect x="30" y="26" width="104" height="148" rx="14" fill="${C.white}" stroke="${C.navy}" stroke-width="6"/>
    <g stroke="${C.line}" stroke-width="8" stroke-linecap="round"><path d="M50 60 h64"/><path d="M50 84 h50"/><path d="M50 108 h58"/></g>
    <circle cx="128" cy="118" r="38" fill="${C.skyLight}" fill-opacity="0.55" stroke="${C.sky}" stroke-width="9"/>
    <path d="M155 145 l28 28" stroke="${C.navy}" stroke-width="13" stroke-linecap="round"/>
    ${check(128, 116, 0.9, C.skyInk)}`,
  shield: `
    <path d="M100 16 l66 24 v52 c0 44 -28 74 -66 92 c-38 -18 -66 -48 -66 -92 v-52z" fill="${C.white}" stroke="${C.navy}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M100 38 l46 17 v38 c0 31 -19 52 -46 66 c-27 -14 -46 -35 -46 -66 v-38z" fill="${C.sky}"/>
    ${check(100, 96, 1.2)}`,
  compare: `
    <rect x="14" y="40" width="78" height="112" rx="12" fill="${C.white}" stroke="${C.navy}" stroke-width="6"/>
    <rect x="108" y="40" width="78" height="112" rx="12" fill="${C.white}" stroke="${C.navy}" stroke-width="6"/>
    <g stroke="${C.line}" stroke-width="7" stroke-linecap="round"><path d="M30 70 h46"/><path d="M30 90 h34"/><path d="M124 70 h46"/><path d="M124 90 h34"/></g>
    <circle cx="53" cy="124" r="15" fill="${C.orange}"/><circle cx="147" cy="124" r="15" fill="${C.sky}"/>${check(147, 123, 0.55)}
    <path d="M82 176 h36 m-10 -9 l10 9 l-10 9 M118 176 h-36" fill="none" stroke="${C.navy}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
  chart: `
    <rect x="20" y="20" width="160" height="160" rx="16" fill="${C.white}" stroke="${C.navy}" stroke-width="6"/>
    <rect x="44" y="118" width="22" height="40" rx="4" fill="${C.skyLight}"/>
    <rect x="78" y="96" width="22" height="62" rx="4" fill="${C.skyLight}"/>
    <rect x="112" y="74" width="22" height="84" rx="4" fill="${C.sky}"/>
    <rect x="146" y="52" width="16" height="106" rx="4" fill="${C.navy}"/>
    <path d="M44 100 L82 78 L116 60 L154 38" fill="none" stroke="${C.orange}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="154" cy="38" r="7" fill="${C.orange}"/>`,
  car: `
    <path d="M24 122 l16 -40 a14 14 0 0 1 13 -9 h94 a14 14 0 0 1 13 9 l16 40 v34 a8 8 0 0 1 -8 8 h-136 a8 8 0 0 1 -8 -8z" fill="${C.white}" stroke="${C.navy}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M48 116 l11 -28 h82 l11 28z" fill="${C.skyLight}"/>
    <circle cx="58" cy="164" r="16" fill="${C.navy}"/><circle cx="142" cy="164" r="16" fill="${C.navy}"/>
    <circle cx="58" cy="164" r="6" fill="${C.white}"/><circle cx="142" cy="164" r="6" fill="${C.white}"/>
    <rect x="78" y="130" width="44" height="16" rx="4" fill="${C.surface}" stroke="${C.navy}" stroke-width="3"/>
    <circle cx="160" cy="44" r="26" fill="${C.sky}"/>${check(160, 42, 0.85)}`,
  seal: `
    <rect x="30" y="18" width="120" height="156" rx="12" fill="${C.white}" stroke="${C.navy}" stroke-width="6"/>
    <g stroke="${C.line}" stroke-width="7" stroke-linecap="round"><path d="M50 48 h80"/><path d="M50 68 h64"/><path d="M50 88 h72"/></g>
    <path d="M128 150 l-12 40 l18 -10 l12 16 l4 -40z M156 150 l12 40 l-18 -10 l-12 16 l-4 -40z" fill="${C.orange}"/>
    <circle cx="142" cy="138" r="32" fill="${C.sky}" stroke="${C.white}" stroke-width="5"/>${check(142, 136, 0.9)}`,
  gauge: `
    <path d="M28 140 a72 72 0 0 1 144 0" fill="none" stroke="${C.line}" stroke-width="22" stroke-linecap="round"/>
    <path d="M28 140 a72 72 0 0 1 36 -62" fill="none" stroke="${C.orange}" stroke-width="22" stroke-linecap="round"/>
    <path d="M64 78 a72 72 0 0 1 72 0" fill="none" stroke="${C.skyLight}" stroke-width="22"/>
    <path d="M136 78 a72 72 0 0 1 36 62" fill="none" stroke="${C.sky}" stroke-width="22" stroke-linecap="round"/>
    <path d="M100 140 L146 96" stroke="${C.navy}" stroke-width="9" stroke-linecap="round"/>
    <circle cx="100" cy="140" r="14" fill="${C.navy}"/>
    <rect x="62" y="164" width="76" height="20" rx="10" fill="${C.sky}"/>`,
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;");

function wrap(text, max) {
  const lines = [];
  let line = "";
  for (const w of text.split(" ")) {
    if ((line + " " + w).trim().length > max) {
      lines.push(line.trim());
      line = w;
    } else line += " " + w;
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

// Decorative background shared by all images.
const backdrop = (w, h) => `
  <rect width="${w}" height="${h}" fill="${C.skyLight}"/>
  <circle cx="${w - 40}" cy="30" r="${h * 0.42}" fill="${C.white}" fill-opacity="0.45"/>
  <circle cx="40" cy="${h + 10}" r="${h * 0.38}" fill="${C.skyBrand}" fill-opacity="0.18"/>`;

function thumbSvg(motif) {
  const w = 640, h = 360;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${backdrop(w, h)}
    <circle cx="520" cy="290" r="9" fill="${C.orange}"/>
    <g transform="translate(220 80) scale(1)">${motifs[motif]}</g>
  </svg>`;
}

const FONT = "Segoe UI, Arial, Helvetica, sans-serif";

function ogSvg({ motif, eyebrow, title }) {
  const w = 1200, h = 630;
  const lines = wrap(title, 26).slice(0, 4);
  const size = lines.length > 3 ? 54 : 60;
  const startY = 250 - (lines.length - 1) * (size * 0.55) + 20;
  const text = lines
    .map((l, i) => `<text x="80" y="${startY + i * size * 1.15}" font-family="${FONT}" font-size="${size}" font-weight="800" fill="${C.navy}">${esc(l)}</text>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="${C.white}"/>
    <rect x="${w - 420}" width="420" height="${h}" fill="${C.skyLight}"/>
    <circle cx="${w - 60}" cy="40" r="170" fill="${C.white}" fill-opacity="0.45"/>
    <g transform="translate(${w - 330} 175) scale(1.25)">${motifs[motif] ?? ""}</g>
    ${eyebrow ? `<text x="80" y="120" font-family="${FONT}" font-size="28" font-weight="700" letter-spacing="3" fill="${C.skyInk}">${esc(eyebrow.toUpperCase())}</text>` : ""}
    ${text}
    <rect x="80" y="${h - 118}" width="44" height="44" rx="12" fill="${C.navy}"/>
    ${check(102, h - 98, 0.75, C.skyBrand)}
    <text x="140" y="${h - 84}" font-family="${FONT}" font-size="34" font-weight="800" fill="${C.navy}">ByeBye<tspan fill="${C.sky}">Loan</tspan></text>
    <text x="350" y="${h - 84}" font-family="${FONT}" font-size="26" fill="#55665D">byebyeloan.online</text>
    <rect x="0" y="${h - 12}" width="${w}" height="12" fill="${C.navy}"/>
  </svg>`;
}

let worst = 0;
const log = (buf, note, file) => {
  worst = Math.max(worst, buf.length);
  console.log(`${(buf.length / 1024).toFixed(1).padStart(5)} KB  ${note.padEnd(16)} ${path.relative(root, file)}`);
};

/** Card thumbnail: WebP, quality lowered until under the limit. */
async function writeThumb(file, svg) {
  for (let q = 82; q >= 20; q -= 4) {
    const buf = await sharp(Buffer.from(svg)).webp({ quality: q, effort: 6 }).toBuffer();
    if (buf.length < MAX_BYTES) {
      fs.writeFileSync(file, buf);
      return log(buf, `webp q${q}`, file);
    }
  }
  throw new Error(`Thumbnail over limit: ${file}`);
}

// Social share images: largest size that fits wins. PNG first (supported everywhere), then WebP.
const OG_SIZES = [
  [1200, 630],
  [1000, 525],
  [800, 420],
  [600, 315],
];

/** Share image: returns { file, width, height, type } for the manifest. */
async function writeOg(base, svg) {
  const attempts = [];
  for (const [w, h] of OG_SIZES) {
    for (const colors of [16, 8]) attempts.push({ w, h, fmt: "png", colors });
  }
  for (const [w, h] of OG_SIZES) {
    for (const q of [60, 45, 30]) attempts.push({ w, h, fmt: "webp", q });
  }
  for (const a of attempts) {
    const img = sharp(Buffer.from(svg)).resize(a.w, a.h);
    const buf =
      a.fmt === "png"
        ? await img.png({ palette: true, colors: a.colors, compressionLevel: 9, effort: 10, dither: 0 }).toBuffer()
        : await img.webp({ quality: a.q, effort: 6 }).toBuffer();
    if (buf.length < MAX_BYTES) {
      const file = path.join(ogDir, `${base}.${a.fmt}`);
      for (const ext of ["png", "webp", "jpg"]) {
        const old = path.join(ogDir, `${base}.${ext}`);
        if (old !== file && fs.existsSync(old)) fs.rmSync(old);
      }
      fs.writeFileSync(file, buf);
      log(buf, `${a.fmt} ${a.w}x${a.h}`, file);
      return { url: `/images/og/${base}.${a.fmt}`, width: a.w, height: a.h, type: `image/${a.fmt}` };
    }
  }
  throw new Error(`Share image over limit: ${base}`);
}

const manifest = {};
for (const a of articles) {
  await writeThumb(path.join(thumbDir, `${a.slug}.webp`), thumbSvg(a.motif));
  manifest[a.slug] = await writeOg(a.slug, ogSvg(a));
}
manifest.default = await writeOg(
  "default",
  ogSvg({ motif: "doc", eyebrow: "Loan settlement & clearance in Pakistan", title: "Get Clarity. Find Your Way Forward." }),
);

// Square logo for structured data (Organization.logo), from the favicon artwork.
{
  const svg = fs.readFileSync(path.join(root, "src", "app", "icon.svg"));
  const file = path.join(root, "public", "images", "logo.png");
  const buf = await sharp(svg, { density: 1200 }).resize(512, 512).png({ palette: true, colors: 16, compressionLevel: 9, effort: 10 }).toBuffer();
  if (buf.length >= MAX_BYTES) throw new Error("logo.png over limit");
  fs.writeFileSync(file, buf);
  log(buf, "png 512x512", file);
}

// The site reads this to publish correct image URLs and dimensions.
fs.writeFileSync(
  path.join(root, "src", "content", "og-images.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(`\nLargest file: ${(worst / 1024).toFixed(1)} KB (limit ${MAX_BYTES} bytes)`);

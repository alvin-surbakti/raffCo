/* ===================================================================
   script.js — Vanilla JS conversion of the React raffCo. application.
   Handles SPA-style routing, mobile menu, blog filtering, and icons.
   =================================================================== */

// ─── Data ────────────────────────────────────────────────────────────
const images = {
  hero: "https://images.unsplash.com/photo-1636997639477-f1ab15b65f63?auto=format&fit=crop&w=1900&q=88",
  beans: "https://images.unsplash.com/photo-1733938941418-df8bf946c6aa?auto=format&fit=crop&w=1100&q=85",
  green: "https://images.unsplash.com/photo-1475333154578-0538252118ad?auto=format&fit=crop&w=1100&q=85",
  roasted: "https://images.unsplash.com/photo-1593536673055-14892cdffac7?auto=format&fit=crop&w=1100&q=85",
  process: "https://images.unsplash.com/photo-1604083737126-099209de3f25?auto=format&fit=crop&w=1300&q=85",
  cup: "https://images.unsplash.com/photo-1601713555182-d4e826252f24?auto=format&fit=crop&w=1000&q=85",
  darkBeans: "https://images.unsplash.com/photo-1584539062025-18a88b003938?auto=format&fit=crop&w=1200&q=85",
  harvest: "https://images.unsplash.com/photo-1609475349547-644d546313f6?auto=format&fit=crop&w=1000&q=85",
};

const navItems = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang", label: "Tentang Kami" },
  { id: "katalog", label: "Katalog" },
  { id: "kontak", label: "Kontak" },
];

const pagePaths = {
  beranda: "/",
  tentang: "/tentang-kami",
  katalog: "/katalog",
  blog: "/blog",
  kontak: "/kontak",
};

const products = [
  { name: "Arabica", image: "./public/assets/product-1.png", variety: "Mix", process: "Fullwashed", number: "01" },
  { name: "Arabica", image: "./public/assets/product-2.png", variety: "Mix", process: "Natural", number: "02" },
  { name: "Arabica", image: "./public/assets/product-3.png", variety: "Mix", process: "Wine", number: "03" },
  { name: "Arabica", image: "./public/assets/product-4.png", variety: "Yellow Caturra", process: "Natural", number: "04" },
  { name: "Arabica", image: "./public/assets/product-5.png", variety: "Orange Bourbon", process: "Natural", number: "05" },
  { name: "Arabica", image: "./public/assets/product-6.png", variety: "Blue Mountain", process: "Natural", number: "06" },
];

const posts = [
  { category: "Cerita Roastery", title: "Mengenal Karakter Arabika Java Ijen", excerpt: "Menelusuri aroma floral, rasa buah, dan keasaman cerah dari lereng Ijen.", image: images.beans, date: "12 Mei 2025" },
  { category: "Kopi Bondowoso", title: "Dari Petik Merah Hingga Biji Pilihan", excerpt: "Bagaimana ketelitian saat panen membentuk kualitas akhir secangkir kopi.", image: images.green, date: "28 April 2025" },
  { category: "Cerita Roastery", title: "Seni Menemukan Profil Sangrai", excerpt: "Catatan dari roaster tentang waktu, suhu, dan rasa manis yang kami cari.", image: images.roasted, date: "10 April 2025" },
  { category: "Event", title: "Ruang Cicip: Edisi Panen Ijen", excerpt: "Mengajak penikmat kopi mencicipi tiga proses pascapanen dalam satu meja.", image: images.cup, date: "22 Maret 2025" },
  { category: "Kopi Bondowoso", title: "Menjaga Terroir di Setiap Musim", excerpt: "Cerita petani, iklim, dan tanah vulkanik yang membentuk kopi Bondowoso.", image: images.harvest, date: "08 Maret 2025" },
  { category: "Event", title: "Kolaborasi Seduh Bersama Komunitas", excerpt: "Rekap hangat dari pertemuan, obrolan, dan eksplorasi resep seduh.", image: images.darkBeans, date: "19 Februari 2025" },
];

const values = [
  { icon: "leaf", no: "01", title: "Seleksi Single Origin", text: "Biji terlacak dari kebun di lereng Ijen, dipetik merah, dan dipilih untuk karakter terbaiknya." },
  { icon: "flame", no: "02", title: "Presisi Sangrai", text: "Setiap batch disangrai dengan profil khusus agar rasa alami, aroma, dan keseimbangannya tetap utuh." },
  { icon: "people", no: "03", title: "Tumbuh Bersama Petani", text: "Kemitraan langsung yang adil membantu kualitas kopi dan kesejahteraan komunitas bertumbuh bersama." },
];

// ─── SVG Icon Helper ─────────────────────────────────────────────────
const iconPaths = {
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M8 3H5a2 2 0 0 0-2 2c0 8.8 7.2 16 16 16a2 2 0 0 0 2-2v-3l-4-1-2 2c-3.5-1.5-6-4-7.5-7.5l2-2L8 3Z"/>',
  leaf: '<path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-8 10-16Z"/><path d="M4 21c3-5 7-9 12-12"/>',
  flame: '<path d="M12 22c4 0 7-3 7-7 0-3-1.5-5.5-4-8-1 3-2.5 4-4 5 0-4-2-7-4-9 0 5-3 7-3 12 0 4 4 7 8 7Z"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-4 2-7 6-7s6 3 6 7"/><path d="M16 5c3 0 4 2 4 4s-1 3-3 3M17 14c3 1 4 3 4 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
};

function icon(name, cls = "h-5 w-5") {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || ""}</svg>`;
}

// ─── Reusable HTML Generators ────────────────────────────────────────
function logoHTML() {
  return `<button onclick="goTo('beranda')" class="w-32 md:w-36" aria-label="Ke beranda">
    <img src="./public/assets/logo.png" alt="raffCo. Sweet Roastery" class="block h-auto w-full object-contain" />
  </button>`;
}

function buttonHTML(text, onclick, light = false) {
  const cls = light
    ? "border border-white/20 text-white hover:border-[#FEDE58] hover:text-[#FEDE58]"
    : "bg-[#FEDE58] text-[#121212] hover:bg-white";
  return `<button onclick="${onclick}" class="inline-flex items-center gap-4 px-6 py-4 text-xs font-bold tracking-[.14em] uppercase transition ${cls}">
    ${text}${icon("arrow", "h-4 w-4")}
  </button>`;
}

function productCardHTML(product) {
  return `<article class="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1A1A1A] transition duration-300 hover:-translate-y-1 hover:border-[#FEDE58]/40">
    <div class="relative aspect-[4/3] overflow-hidden">
      <img src="${product.image}" alt="Biji kopi ${product.name}, varietas ${product.variety}" class="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105" />
    </div>
    <div class="flex flex-1 flex-col p-6">
      <h3 class="font-[Poppins] text-2xl font-bold tracking-tight text-white">${product.name}</h3>
      <div class="mt-4 border-t border-[rgba(255,255,255,0.12)] pt-3">
        <dl class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <dt class="text-[10px] uppercase tracking-[1.5px] text-white/60">Variety</dt>
            <dd class="text-right text-sm font-bold text-white">${product.variety}</dd>
          </div>
          <div class="flex items-center justify-between">
            <dt class="text-[10px] uppercase tracking-[1.5px] text-white/60">Process</dt>
            <dd class="text-right text-sm font-bold text-[#FEDE58]">${product.process}</dd>
          </div>
        </dl>
      </div>
    </div>
  </article>`;
}

function footerHTML() {
  return `<footer class="border-t border-white/10 bg-[#0d0d0d]">
    <div class="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-2 md:px-10 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-16">
      <div>
        ${logoHTML()}
        <p class="mt-5 max-w-sm text-sm leading-7 text-white/55">Menyangrai karakter terbaik dari tanah Bondowoso, satu batch dalam satu waktu.</p>
      </div>
      <div>
        <p class="eyebrow">Kunjungi Kami</p>
        <a href="https://maps.app.goo.gl/8biDpL9XeUBx52qB7" target="_blank" rel="noreferrer" class="mt-4 block text-sm leading-7 text-white/70 transition hover:text-[#FEDE58]">
          Jl. Panjaitan, Tamansari<br>Bondowoso, Jawa Timur
        </a>
      </div>
      <div>
        <p class="eyebrow">Jam Operasional</p>
        <p class="mt-4 text-sm leading-7 text-white/70">Buka Senin — Sabtu<br>Jam 09.00 - 21.00 WIB</p>
      </div>
    </div>
    <div class="mx-auto flex max-w-[1440px] flex-col gap-2 border-t border-white/8 px-5 py-6 text-[11px] tracking-wider text-white/35 md:flex-row md:justify-between md:px-10 lg:px-16">
      <p>© 2025 raffCo. Sweet Roastery. Hak cipta dilindungi.</p>
      <p>Bondowoso · Java Ijen · Indonesia</p>
    </div>
  </footer>`;
}

// ─── Page Renderers ──────────────────────────────────────────────────
function pageHeroHTML(eyebrow, title, image) {
  return `<section class="relative flex min-h-[500px] items-end overflow-hidden pt-24">
    <img src="${image}" alt="" class="absolute inset-0 h-full w-full object-cover" />
    <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30"></div>
    <div class="relative mx-auto w-full max-w-[1440px] px-5 pb-16 md:px-10 lg:px-16 lg:pb-20">
      <p class="eyebrow">${eyebrow}</p>
      <h1 class="mt-5 max-w-4xl font-[Poppins] text-[clamp(3.5rem,7vw,7rem)] leading-[.9] font-medium tracking-[-.045em] text-white">${title}</h1>
    </div>
  </section>`;
}

function renderHome() {
  const featuredCards = products.slice(0, 3).map(productCardHTML).join("");

  return `
    <section class="relative flex min-h-[790px] items-end overflow-hidden pt-24">
      <img src="${images.hero}" alt="Biji kopi sangrai pilihan raffCo." class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,.95)_0%,rgba(8,8,8,.72)_48%,rgba(8,8,8,.2)_100%)]"></div>
      <div class="relative mx-auto w-full max-w-[1440px] px-5 pb-20 md:px-10 md:pb-28 lg:px-16">
        <h1 class="sr-only">raffCo. Sweet Roastery</h1>
        <div class="my-4">
          <img src="./public/assets/logo.png" alt="raffCo. Sweet Roastery" class="block h-auto w-full max-w-[340px] object-contain drop-shadow-2xl md:max-w-[531px]" />
        </div>
        <div class="mt-8 flex w-full flex-col gap-7 border-l border-[#FEDE58] pl-6 pr-4 md:mt-10 md:flex-row md:items-center md:justify-between md:pr-10">
          <p class="max-w-lg text-base leading-7 text-white/70 md:text-lg">Kopi Arabika Single Origin dari Bondowoso, Java Ijen</p>
        </div>
      </div>
    </section>

    <section class="bg-[#121212] px-5 py-20 md:px-10 lg:px-16 lg:py-28">
      <div class="mx-auto max-w-[1312px]">
        <div class="flex flex-col justify-between gap-8 border-b border-white/10 pb-9 md:flex-row md:items-end">
          <div class="max-w-2xl">
            <p class="eyebrow">Highlight Varian Kopi</p>
            <h2 class="section-title mt-5">Tiga karakter dari<br>tanah Java Ijen.</h2>
          </div>
        </div>
        <div class="mt-10 grid gap-6 md:grid-cols-3">${featuredCards}</div>
        <div class="mt-10 flex justify-center">
          ${buttonHTML("Lihat Katalog Lengkap", "goTo('katalog')")}
        </div>
      </div>
    </section>

    <section class="grid bg-[#171717] lg:grid-cols-2">
      <div class="min-h-[500px]"><img src="${images.process}" alt="Proses pemilihan biji kopi raffCo." class="h-full w-full object-cover" /></div>
      <div class="flex items-center px-6 py-20 md:px-14 lg:px-20">
        <div class="max-w-xl">
          <p class="eyebrow">Cerita di Balik Sangrai</p>
          <h2 class="section-title mt-5">Jujur pada asal.<br>Presisi pada rasa.</h2>
          <p class="mt-7 text-base leading-8 text-white/60">Kami bekerja langsung bersama petani lokal Bondowoso, memilih buah kopi terbaik dari lereng Ijen, lalu menyangrainya dalam batch kecil. Bagi kami, secangkir kopi yang baik selalu dimulai dari hubungan yang baik.</p>
          <div class="mt-9">${buttonHTML("Kenali raffCo.", "goTo('tentang')", true)}</div>
        </div>
      </div>
    </section>

    ${footerHTML()}`;
}

function renderCatalog() {
  const allCards = products.map(productCardHTML).join("");
  return `
    ${pageHeroHTML("Pilihan raffCo.", "Katalog Varian Kopi", images.beans)}
    <section class="bg-[#121212] px-5 py-20 md:px-10 lg:px-16 lg:py-28">
      <div class="mx-auto max-w-[1312px]">
        <div class="mb-14 flex flex-col justify-between gap-6 border-b border-white/10 pb-9 md:flex-row md:items-end">
          <div>
            <p class="eyebrow">Enam Karakter Pilihan</p>
            <h2 class="mt-4 font-[Poppins] text-4xl text-white md:text-5xl">Temukan profil rasa Anda.</h2>
          </div>
          <p class="max-w-md text-sm leading-7 text-white/55">Setiap profil dipilih dan disangrai untuk menampilkan keunikan rasa yang tumbuh di dataran tinggi Bondowoso.</p>
        </div>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">${allCards}</div>
      </div>
    </section>
    ${footerHTML()}`;
}

function renderAbout() {
  const valueCards = values.map(item => `
    <article class="bg-[#181818] p-8 md:p-10">
      <div class="flex items-start justify-between">${icon(item.icon, "h-9 w-9 text-[#FEDE58]")}<span class="font-[Poppins] text-2xl text-white/20">${item.no}</span></div>
      <h3 class="mt-14 font-[Poppins] text-3xl text-white">${item.title}</h3>
      <p class="mt-4 text-sm leading-7 text-white/55">${item.text}</p>
    </article>`).join("");

  return `
    ${pageHeroHTML("Tentang Kami", "Dari Biji Terbaik Bondowoso, Java Ijen", images.green)}
    <section class="px-5 py-24 md:px-10 lg:px-16 lg:py-32">
      <div class="mx-auto grid max-w-[1312px] gap-14 lg:grid-cols-[.75fr_1.25fr]">
        <div>
          <p class="eyebrow">Tentang Kami</p>
          <h2 class="mt-6 font-[Poppins] text-4xl leading-tight text-white md:text-5xl">Dari Biji Terbaik Bondowoso, Java Ijen</h2>
          <div class="mt-9 inline-flex items-center gap-4 border border-[#FEDE58]/40 bg-[#FEDE58]/5 px-5 py-4">
            <span class="flex h-12 w-12 items-center justify-center rounded-full border border-[#FEDE58] text-[9px] font-bold tracking-wider text-[#FEDE58] uppercase">Halal</span>
            <div>
              <span class="block text-[8px] font-bold tracking-[.18em] text-white/35 uppercase">Sertifikat Halal</span>
              <span class="mt-1 block text-xs font-semibold text-white">NO. HALAL ID35410021236840325</span>
            </div>
          </div>
        </div>
        <div class="space-y-6 text-base leading-8 text-white/60 md:text-lg">
          <p>raffCo. lahir dari kecintaan mendalam terhadap kopi specialty Indonesia. Kami memilih dan mengolah biji kopi Arabika &amp; Robusta pilihan dari dataran tinggi Bondowoso — kawasan Java Ijen yang terkenal dengan karakter kopi yang kaya dan kompleks.</p>
          <p>Setiap batch di-roast dengan cermat menggunakan metode kami sendiri: Fully Washed, Natural, Anaerobic, hingga Wine Extended Fermentation — untuk menghadirkan karakter rasa terbaik dari setiap biji.</p>
          <p>Bukan sekadar kopi. Ini adalah cerita dari tanah, dari tangan petani, dan dari api roaster kami.</p>
        </div>
      </div>
    </section>

    <section class="bg-[#181818] px-5 py-24 md:px-10 lg:px-16 lg:py-28">
      <div class="mx-auto max-w-[1312px]">
        <div class="max-w-2xl"><p class="eyebrow">Proses &amp; Kualitas</p><h2 class="section-title mt-5">Dari kebun hingga cangkir,<br>tanpa jalan pintas.</h2></div>
        <div class="mt-14 grid gap-px bg-white/10 lg:grid-cols-3">${valueCards}</div>
      </div>
    </section>

    <section class="relative min-h-[520px] overflow-hidden">
      <img src="${images.harvest}" alt="Perjalanan kopi dari kebun Bondowoso" class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 bg-black/65"></div>
      <div class="relative mx-auto flex min-h-[520px] max-w-[1312px] items-center justify-center px-5 text-center">
        <div><p class="eyebrow">Filosofi Kami</p><p class="mx-auto mt-6 max-w-3xl font-[Poppins] text-4xl leading-tight text-white md:text-6xl">Merayakan asal, menjaga karakter, berbagi rasa.</p></div>
      </div>
    </section>

    ${footerHTML()}`;
}

function renderBlog() {
  return `
    ${pageHeroHTML("Jurnal Kami", "Blog &amp; Cerita raffCo.", images.roasted)}
    <section class="px-5 py-20 md:px-10 lg:px-16 lg:py-28">
      <div class="mx-auto max-w-[1312px]">
        <div class="flex flex-col justify-between gap-7 border-b border-white/10 pb-8 md:flex-row md:items-center">
          <div><p class="eyebrow">Cerita Terbaru</p><h2 class="mt-3 font-[Poppins] text-4xl text-white">Dari kebun dan ruang sangrai.</h2></div>
          <div id="blog-filters" class="flex flex-wrap gap-2"></div>
        </div>
        <div id="blog-grid" class="mt-10 grid gap-x-7 gap-y-14 md:grid-cols-2 lg:grid-cols-3"></div>
        <div class="mt-20 flex justify-center gap-2" aria-label="Paginasi">
          <button class="grid h-11 w-11 place-items-center text-xs font-bold bg-[#FEDE58] text-black">1</button>
          <button class="grid h-11 w-11 place-items-center text-xs font-bold border border-white/15 text-white/60 hover:border-[#FEDE58]">2</button>
          <button class="grid h-11 w-11 place-items-center text-xs font-bold border border-white/15 text-white/60 hover:border-[#FEDE58]">3</button>
        </div>
      </div>
    </section>
    ${footerHTML()}`;
}

function renderContact() {
  const contactItems = [
    { icon: "pin", label: "Alamat", html: '<a href="https://maps.app.goo.gl/8biDpL9XeUBx52qB7" target="_blank" rel="noreferrer" class="transition hover:text-[#FEDE58]">Jl. Panjaitan, Tamansari, Bondowoso<br>Jawa Timur</a>' },
    { icon: "phone", label: "WhatsApp", html: "081235599228" },
    { icon: "mail", label: "Email", html: "[EMAIL_ADDRESS]" },
    { icon: "clock", label: "Jam Operasional", html: "Senin - Sabtu: 09.00 - 21.00 WIB" },
  ];

  const contactList = contactItems.map(c => `
    <div class="flex gap-5">
      ${icon(c.icon, "mt-1 h-5 w-5 shrink-0 text-[#FEDE58]")}
      <div>
        <p class="text-[9px] font-bold tracking-[.18em] text-white/35 uppercase">${c.label}</p>
        <p class="mt-2 text-sm leading-6 text-white/75">${c.html}</p>
      </div>
    </div>`).join("");

  return `
    ${pageHeroHTML("Mari Terhubung", "Hubungi raffCo.", images.cup)}
    <section class="px-5 py-24 md:px-10 lg:px-16 lg:py-32">
      <div class="mx-auto grid max-w-[1312px] gap-16 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <p class="eyebrow">Kontak &amp; Kunjungan</p>
          <h2 class="section-title mt-5">Mari mulai<br>sebuah percakapan.</h2>
          <p class="mt-6 max-w-md text-sm leading-7 text-white/55">Untuk kolaborasi, kebutuhan kopi bisnis, kunjungan roastery, atau sekadar berbagi cerita tentang kopi—kami siap mendengar.</p>
          <div class="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-1">${contactList}</div>
          <div class="mt-10 flex items-center gap-4 border-t border-white/10 pt-8">
            <a href="https://www.instagram.com/raff.coffee/" target="_blank" rel="noreferrer" class="grid h-10 w-10 place-items-center border border-white/15 text-white hover:border-[#FEDE58] hover:text-[#FEDE58]" aria-label="Instagram">${icon("instagram", "h-4 w-4")}</a>
            <p class="text-xs font-semibold tracking-wider text-white/60">@raff.coffee</p>
          </div>
        </div>
        <div class="border border-white/10 bg-[#181818] p-7 md:p-12">
          <p class="text-[10px] font-bold tracking-[.18em] text-[#FEDE58] uppercase">Kontak Langsung</p>
          <h3 class="mt-3 font-[Poppins] text-4xl text-white">Terhubung dengan raffCo.</h3>
          <p class="mt-5 max-w-lg text-sm leading-7 text-white/50">Pilih kanal yang paling nyaman untuk berbicara dengan kami, mengikuti kabar terbaru, atau menemukan lokasi roastery.</p>
          <div class="mt-10 space-y-4">
            <a href="https://wa.me/6281235599228" target="_blank" rel="noreferrer" class="group flex items-center justify-between bg-[#FEDE58] px-6 py-5 text-[#121212] transition hover:bg-white">
              <span class="flex items-center gap-4">${icon("phone", "h-5 w-5")}<span class="text-xs font-bold tracking-[.1em] uppercase">Hubungi via WhatsApp</span></span>
              ${icon("arrow", "h-5 w-5 transition group-hover:translate-x-1")}
            </a>
            <a href="https://www.instagram.com/raff.coffee/" target="_blank" rel="noreferrer" class="group flex items-center justify-between border border-white/15 px-6 py-5 text-white transition hover:border-[#FEDE58] hover:text-[#FEDE58]">
              <span class="flex items-center gap-4">${icon("instagram", "h-5 w-5")}<span class="text-xs font-bold tracking-[.1em] uppercase">Kunjungi Instagram @raff.coffee</span></span>
              ${icon("arrow", "h-5 w-5 transition group-hover:translate-x-1")}
            </a>
            <a href="https://maps.app.goo.gl/8biDpL9XeUBx52qB7" target="_blank" rel="noreferrer" class="group flex items-center justify-between border border-white/15 px-6 py-5 text-white transition hover:border-[#FEDE58] hover:text-[#FEDE58]">
              <span class="flex items-center gap-4">${icon("pin", "h-5 w-5")}<span class="text-xs font-bold tracking-[.1em] uppercase">Petunjuk Arah (Google Maps)</span></span>
              ${icon("arrow", "h-5 w-5 transition group-hover:translate-x-1")}
            </a>
          </div>
        </div>
      </div>
    </section>
    ${footerHTML()}`;
}

// ─── Blog Filter Logic ───────────────────────────────────────────────
let currentFilter = "Semua";

function renderBlogCards(filter) {
  const visible = filter === "Semua" ? posts : posts.filter(p => p.category === filter);
  return visible.map(post => `
    <article class="group">
      <div class="h-64 overflow-hidden"><img src="${post.image}" alt="${post.title}" class="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
      <div class="pt-5">
        <div class="flex items-center gap-3 text-[9px] font-bold tracking-[.15em] uppercase"><span class="text-[#FEDE58]">${post.category}</span><span class="h-px w-6 bg-white/20 inline-block"></span><span class="text-white/35">${post.date}</span></div>
        <h3 class="mt-4 font-[Poppins] text-[27px] leading-tight text-white">${post.title}</h3>
        <p class="mt-3 text-sm leading-6 text-white/50">${post.excerpt}</p>
        <a href="#" class="mt-5 inline-flex items-center gap-2 text-[10px] font-bold tracking-[.14em] text-white uppercase hover:text-[#FEDE58]">Baca Selengkapnya ${icon("arrow", "h-4 w-4")}</a>
      </div>
    </article>`).join("");
}

function initBlogFilters() {
  const filtersContainer = document.getElementById("blog-filters");
  const grid = document.getElementById("blog-grid");
  if (!filtersContainer || !grid) return;

  const categories = ["Semua", "Cerita Roastery", "Event", "Kopi Bondowoso"];

  filtersContainer.innerHTML = categories.map(cat => {
    const isActive = currentFilter === cat;
    const cls = isActive
      ? "bg-[#FEDE58] text-black border border-[#FEDE58]"
      : "border border-white/15 text-white/60 hover:border-white/40";
    return `<button class="filter-btn px-4 py-2.5 text-[10px] font-bold tracking-wider uppercase transition ${cls}" data-filter="${cat}">${cat}</button>`;
  }).join("");

  grid.innerHTML = renderBlogCards(currentFilter);

  filtersContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    currentFilter = btn.dataset.filter;

    // Update active state
    filtersContainer.querySelectorAll(".filter-btn").forEach(b => {
      if (b.dataset.filter === currentFilter) {
        b.className = "filter-btn px-4 py-2.5 text-[10px] font-bold tracking-wider uppercase transition bg-[#FEDE58] text-black border border-[#FEDE58]";
      } else {
        b.className = "filter-btn px-4 py-2.5 text-[10px] font-bold tracking-wider uppercase transition border border-white/15 text-white/60 hover:border-white/40";
      }
    });

    grid.innerHTML = renderBlogCards(currentFilter);
    setupReveal(grid);
  });
}

// ─── Router & Navigation ─────────────────────────────────────────────
let currentPage = "beranda";
let mobileMenuOpen = false;

function getPageFromPath() {
  const routes = {
    "/": "beranda",
    "/tentang-kami": "tentang",
    "/katalog": "katalog",
    "/blog": "blog",
    "/kontak": "kontak",
  };
  return routes[window.location.pathname] || "beranda";
}

function goTo(page) {
  window.history.pushState({}, "", pagePaths[page]);
  currentPage = page;
  mobileMenuOpen = false;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen;
  const nav = document.getElementById("mobile-nav");
  const btn = document.getElementById("menu-toggle-btn");
  if (nav) {
    nav.classList.toggle("open", mobileMenuOpen);
  }
  if (btn) {
    btn.innerHTML = icon(mobileMenuOpen ? "close" : "menu");
  }
}

function updateNavActive() {
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function render() {
  const main = document.getElementById("main-content");
  if (!main) return;

  // Restart smooth page fade
  main.style.animation = "none";
  void main.offsetHeight;
  main.style.animation = "";

  switch (currentPage) {
    case "beranda": main.innerHTML = renderHome(); break;
    case "tentang": main.innerHTML = renderAbout(); break;
    case "katalog": main.innerHTML = renderCatalog(); break;
    case "blog":    main.innerHTML = renderBlog(); break;
    case "kontak":  main.innerHTML = renderContact(); break;
    default:        main.innerHTML = renderHome();
  }

  updateNavActive();

  // Initialize blog filters after DOM update
  if (currentPage === "blog") {
    initBlogFilters();
  }

  // Close mobile menu
  const nav = document.getElementById("mobile-nav");
  if (nav) nav.classList.remove("open");
  const btn = document.getElementById("menu-toggle-btn");
  if (btn) btn.innerHTML = icon("menu");
  mobileMenuOpen = false;

  // Animasi muncul halus untuk konten halaman
  setupReveal(main, true);
}

// ─── Scroll Reveal Animations ────────────────────────────────────────
let revealObserver = null;

/**
 * Menambahkan animasi "muncul halus" pada elemen-elemen halaman.
 * - Hero: teks/logo muncul berurutan saat halaman dibuka.
 * - Section lain: muncul bertahap saat di-scroll ke area layar.
 * Tidak mengubah markup; elemen ditandai otomatis lewat class.
 */
function setupReveal(root = document, reset = false) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reset && revealObserver) {
    revealObserver.disconnect();
    revealObserver = null;
  }
  if (!revealObserver && "IntersectionObserver" in window) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  }

  const siblingCount = new Map();

  const tag = (el, { variant = "up", delay = null, card = false, extra = "" } = {}) => {
    if (!el || el.classList.contains("reveal")) return;
    if (el.parentElement && el.parentElement.closest(".reveal")) return; // anak dari elemen yang sudah beranimasi

    let d = delay;
    if (d === null) {
      const parent = el.parentElement;
      const n = siblingCount.get(parent) || 0;
      siblingCount.set(parent, n + 1);
      d = card ? (n % 3) * 110 : Math.min(n, 4) * 90;
    }

    el.classList.add("reveal");
    if (variant !== "up") el.classList.add("reveal-" + variant);
    if (extra) el.classList.add(extra);
    el.style.setProperty("--reveal-delay", d + "ms");

    if (revealObserver && !reduceMotion) revealObserver.observe(el);
    else el.classList.add("in-view");
  };

  // Hero (hanya saat halaman dirender penuh)
  if (reset) {
    document
      .querySelectorAll("main > section:first-child > .relative > *:not(.sr-only)")
      .forEach((el, i) => tag(el, { delay: 200 + i * 150 }));
  }

  const base = "main > section:not(:first-child)";

  // Urutan penting: wadah ditandai dulu sebelum isinya
  root.querySelectorAll(`${base} article`).forEach((el) => tag(el, { card: true }));
  root.querySelectorAll(`${base} .flex.gap-5`).forEach((el) => tag(el));
  root.querySelectorAll(`${base} .border-t.pt-8`).forEach((el) => tag(el, { delay: 200 }));
  root.querySelectorAll(`${base} #blog-filters, ${base} [aria-label="Paginasi"]`).forEach((el) => tag(el, { delay: 120 }));
  root.querySelectorAll(`${base}.grid > div:first-child`).forEach((el) => tag(el, { variant: "left", extra: "reveal-media" }));
  root.querySelectorAll(`${base} .inline-flex`).forEach((el) => tag(el, { delay: 260 }));
  root.querySelectorAll(`${base} a.group`).forEach((el, i) => tag(el, { delay: 200 + i * 100 }));
  root.querySelectorAll(`${base} :is(p, h2, h3)`).forEach((el) => tag(el));

  if (reset) {
    document.querySelectorAll("main > footer").forEach((el) => tag(el, { variant: "fade", delay: 0 }));
  }
}

// ─── Initialization ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  currentPage = getPageFromPath();

  // Build desktop nav
  const desktopNav = document.getElementById("desktop-nav");
  if (desktopNav) {
    desktopNav.innerHTML = navItems.map(item =>
      `<button class="nav-link" data-page="${item.id}" onclick="goTo('${item.id}')">${item.label}</button>`
    ).join("");
  }

  // Build mobile nav
  const mobileNav = document.getElementById("mobile-nav");
  if (mobileNav) {
    mobileNav.innerHTML = navItems.map(item =>
      `<button class="block w-full border-b border-white/8 py-4 text-left text-sm font-semibold text-white bg-transparent" onclick="goTo('${item.id}')">${item.label}</button>`
    ).join("");
  }

  // Set initial menu icon
  const menuBtn = document.getElementById("menu-toggle-btn");
  if (menuBtn) {
    menuBtn.innerHTML = icon("menu");
  }

  // Listen for popstate (back/forward)
  window.addEventListener("popstate", () => {
    currentPage = getPageFromPath();
    render();
  });

  // Header shadow on scroll
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) {
      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  }, { passive: true });

  render();
});
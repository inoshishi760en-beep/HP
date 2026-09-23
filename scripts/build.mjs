import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const site = "https://inoshishi760en-beep.github.io/HP/";
const line = "https://lin.ee/80STrad";
const hours = "8:00〜18:00 / 日曜定休";
const arrow = '<span class="arrow" aria-hidden="true">↗</span>';
const icons = {
  phone:
    '<path d="m7 3 3 5-2 2a15 15 0 0 0 6 6l2-2 5 3v3a1 1 0 0 1-1 1C10 21 3 14 3 4a1 1 0 0 1 1-1Z"/>',
  chat: '<path d="M21 11a8 8 0 0 1-8 8H8l-5 3 1-7a8 8 0 0 1-1-4 9 9 0 0 1 18 0Z"/><path d="M8 10h8M8 14h5"/>',
  window:
    '<rect x="4" y="3" width="16" height="18" rx=".5"/><path d="M12 3v18M4 12h16M9 7 7 9M17 15l-2 2"/>',
  check: '<path d="m5 12 4 4L19 6"/><circle cx="12" cy="12" r="10"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
};
const icon = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
const pic = (p, name, alt, extra = "") =>
  `<img src="${p}assets/${name}.webp" alt="${alt}" width="1024" height="1024" loading="lazy" decoding="async" ${extra}>`;
const brand = (p) =>
  `<a class="brand" href="${p}index.html" aria-label="有限会社老田硝子店 ホーム"><img src="${p}assets/brand.webp" alt="" width="80" height="80"><span class="brand-text"><small>茨城県筑西市のガラス・サッシ専門店</small><span class="company-prefix">有限会社</span>老田硝子店</span></a>`;
const navItems = [
  ["home", "ホーム", "index.html"],
  ["service", "事業紹介", "service/index.html"],
  ["company", "私たちについて", "company/index.html"],
  ["contact", "ご相談・お見積もり", "contact/index.html"],
];
function header(p, current) {
  const links = (mobile) =>
    navItems
      .map(
        ([key, text, url]) =>
          `<a href="${p}${url}"${key === current ? ' aria-current="page"' : ""} class="${key === "contact" && !mobile ? "button" : key === "home" ? "home-link" : ""}">${text}${key === "contact" || mobile ? arrow : ""}</a>`,
      )
      .join("");
  return `<a class="skip-link" href="#main">本文へスキップ</a><header class="site-header"><div class="header-inner">${brand(p)}<nav class="desktop-nav" aria-label="メインナビゲーション">${links(false)}</nav><button class="menu-button" id="menuBtn" aria-label="メニューを開く" aria-controls="mobileNav" aria-expanded="false">${icon("menu")}</button></div><nav class="mobile-nav" id="mobileNav" aria-label="モバイルナビゲーション" hidden>${links(true)}</nav></header>`;
}
function contactBand(p) {
  return `<section class="contact-band" aria-labelledby="contact-heading"><div class="wrap"><div><p class="eyebrow">Contact</p><h2 class="section-title" id="contact-heading">窓のこと、<br>気軽に話してみませんか。</h2><p>小さな修理から、住まいの見直しまで。<br>ご相談・お見積もりは無料です。</p></div><div class="contact-band-actions"><div class="phone-block">${icon("phone")}<a href="tel:0296246241">0296-24-6241</a><small>受付 ${hours}</small></div><a class="button light" href="${line}" target="_blank" rel="noopener noreferrer">${icon("chat")}LINEで相談する${arrow}</a><a class="button outline" href="${p}contact/index.html">お問い合わせのご案内${arrow}</a></div></div></section>`;
}
function footer(p) {
  return `<footer class="footer"><div class="wrap"><div class="footer-top"><div>${brand(p)}<address class="footer-address">〒308-0021 茨城県筑西市甲91-1<br>TEL <a href="tel:0296246241">0296-24-6241</a><br>受付 ${hours}</address></div><nav class="footer-nav" aria-label="フッターナビゲーション"><a href="${p}index.html">ホーム</a><a href="${p}service/index.html">事業紹介</a><a href="${p}company/index.html">会社概要</a><a href="${p}contact/index.html">お問い合わせ</a><a href="${p}privacy/index.html">プライバシーポリシー</a><a href="${p}index.html#faq">よくあるご質問</a></nav></div><div class="footer-bottom"><span>筑西市および近隣地域の、窓と暮らしを支えます。</span><span>© <span data-year>2026</span> 有限会社老田硝子店</span></div></div></footer><nav class="mobile-contact" aria-label="すぐに相談する"><a href="tel:0296246241">${icon("phone")}電話で相談</a><a href="${line}" target="_blank" rel="noopener noreferrer">${icon("chat")}LINEで相談${arrow}</a></nav>`;
}
function layout({
  key,
  title,
  description,
  content,
  contact = true,
  noindex = false,
}) {
  const p = key === "home" ? "./" : key === "404" ? "/HP/" : "../";
  const url =
    site + (key === "home" ? "" : key === "404" ? "404.html" : `${key}/`);
  const schema =
    key === "home"
      ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "HomeAndConstructionBusiness", name: "有限会社老田硝子店", url: site, image: site + "assets/service_eco.webp", telephone: "+81-296-24-6241", address: { "@type": "PostalAddress", postalCode: "308-0021", addressRegion: "茨城県", addressLocality: "筑西市", streetAddress: "甲91-1", addressCountry: "JP" }, areaServed: "筑西市および近隣地域", openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "18:00" }] })}</script>`
      : "";
  return `<!DOCTYPE html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><meta name="theme-color" content="#244e42">${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}<meta property="og:type" content="website"><meta property="og:locale" content="ja_JP"><meta property="og:site_name" content="有限会社老田硝子店"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${url}"><meta property="og:image" content="${site}assets/social.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="${p}assets/favicon-small.png" type="image/png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600&amp;family=Noto+Serif+JP:wght@400;500;600&amp;display=swap" rel="stylesheet"><link rel="stylesheet" href="${p}css/style.css">${key === "home" ? `<link rel="preload" as="image" href="${p}assets/service_eco.webp">` : ""}${schema}<script src="${p}js/script.js" defer></script></head><body>${header(p, key)}<main id="main">${content}${contact ? contactBand(p) : ""}</main>${footer(p)}</body></html>\n`;
}
function pageHero(p, en, title, lead, extra = "") {
  return `<div class="wrap"><nav class="breadcrumbs" aria-label="パンくずリスト"><a href="${p}index.html">ホーム</a><span aria-hidden="true">/</span><span aria-current="page">${title}</span></nav></div><section class="page-hero"><div class="wrap"><p class="eyebrow">${en}</p><h1>${title}</h1><p class="lead">${lead}</p>${extra}</div></section>`;
}
const services = [
  {
    id: "glass",
    num: "01",
    en: "Glass repair",
    title: "ガラス修理・交換",
    image: "service_repair",
    alt: "窓ガラスを丁寧に調整する作業のイメージ",
    intro: "一枚のガラスから、いつもの安心を。",
    text: "割れたガラスや小さなひびも、まずはご相談ください。ガラスの種類とサイズを確認し、採寸から交換まで丁寧に対応します。防犯性や断熱性を高めるガラスへの交換も承ります。",
    short:
      "割れたガラスやひびの修理から、防犯・断熱ガラスへの交換まで。一枚から丁寧に対応します。",
    tags: ["ひび・割れ", "防犯対策"],
    list: [
      "透明・すり・網入りガラスの割れ替え",
      "ペアガラス・真空ガラスへの交換",
      "防犯ガラスのご相談",
    ],
    note: "当日対応はガラスの種類・在庫・現場の状況によります。お急ぎの場合はお電話ください。",
  },
  {
    id: "sash",
    num: "02",
    en: "Window & sash",
    title: "サッシ・内窓",
    image: "service_eco",
    alt: "内窓のある明るいリビングのイメージ",
    intro: "開けるたびに、心地よい窓へ。",
    text: "窓の開け閉めが重い、すきま風が気になる。そんなお悩みは、戸車の交換やレールの調整で改善できる場合があります。内窓の設置やサッシの交換など、住まいに合う方法をご提案します。",
    short:
      "開け閉めの不具合、すきま風、寒さや結露。サッシの調整や内窓で、窓まわりを心地よく。",
    tags: ["断熱・結露対策", "開閉の不具合"],
    list: [
      "サッシ調整・戸車の交換",
      "内窓（二重窓）の設置",
      "玄関ドア・勝手口の交換、網戸の張り替え",
    ],
    note: "断熱・防音・結露軽減の効果は、建物や設置条件によって異なります。現地の状態を確認してご案内します。",
  },
  {
    id: "film",
    num: "03",
    en: "Window film",
    title: "窓用フィルム",
    image: "service_security",
    alt: "窓ガラスの表面を仕上げる作業のイメージ",
    intro: "今ある窓に、もうひとつの機能を。",
    text: "日差しの暑さ、外からの視線、万一のガラスの飛散。気になることに合わせて、窓用フィルムをご提案します。ガラスの種類や設置環境を確認し、適した製品を丁寧に施工します。",
    short:
      "強い日差しや外からの視線が気になる窓に。遮熱・目隠し・飛散防止の機能を加えます。",
    tags: ["遮熱・UVカット", "飛散防止"],
    list: ["飛散防止フィルム", "遮熱・UVカットフィルム", "目隠しフィルム"],
    note: "フィルムの種類によって機能は異なります。ガラスとの適合性を確認したうえで施工します。",
  },
];
function flow() {
  return `<section class="section" id="flow"><div class="wrap"><div class="section-head"><div><p class="eyebrow">How it works</p><h2 class="section-title">ご相談から、施工まで。</h2></div><p>初めてのご依頼でも、ひとつずつ丁寧に。<br>内容とお見積もりにご納得いただいてから進めます。</p></div><div class="flow-grid">${[
    ["お問い合わせ", "お電話またはLINEで、気になることをお聞かせください。"],
    [
      "現地確認・お見積もり",
      "窓の状態やサイズを確認し、施工内容と費用をご案内します。",
    ],
    [
      "日程調整・施工",
      "内容にご納得いただいたうえで日程を調整し、丁寧に施工します。",
    ],
    [
      "仕上がりのご確認",
      "施工箇所や使い方を一緒に確認。気になる点もお伝えください。",
    ],
  ]
    .map(
      ([title, text], i) =>
        `<div class="flow-step"><span aria-hidden="true">0${i + 1}</span><h3>${title}</h3><p>${text}</p></div>`,
    )
    .join("")}</div></div></section>`;
}
const faqs = [
  [
    "ガラス一枚だけでもお願いできますか？",
    "はい、ガラス一枚の修理・交換から承ります。小さなひびや、窓の開け閉めの不具合もお気軽にご相談ください。",
  ],
  [
    "今日中に修理してもらえますか？",
    "ガラスの種類や在庫、現場の状況によって当日対応できる場合があります。お急ぎの方は、受付時間内（8:00〜18:00・日曜定休）にお電話ください。",
  ],
  [
    "見積もりに費用はかかりますか？",
    "ご相談・お見積もりは無料です。施工費用はガラスの種類やサイズ、作業条件により異なります。内容と費用をご案内し、ご納得いただいてから施工します。",
  ],
  [
    "どの地域まで対応していますか？",
    "茨城県筑西市および近隣地域に対応しています。お住まいの地域とご相談内容を、お電話またはLINEでお知らせください。",
  ],
  [
    "LINEでは何を送ればいいですか？",
    "窓全体と気になる箇所の写真、おおよそのサイズ、お住まいの地域、ご希望の内容をお送りください。返信は営業時間内に順次行います。正確なお見積もりには現地確認が必要な場合があります。",
  ],
];
function faq() {
  return `<section class="section faq-section" id="faq"><div class="wrap faq-layout"><div><p class="eyebrow">Questions & answers</p><h2 class="section-title">よくあるご質問</h2></div><div class="faq-list">${faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></div></section>`;
}
const home = `<section class="hero" aria-labelledby="hero-title"><div class="hero-copy"><div class="hero-location">筑西市と、そのまわりの暮らしに。</div><h1 id="hero-title">窓から、<br><span class="indent">心地よい毎日を。</span></h1><p>ガラス一枚の修理から、住まいの快適さまで。<br>地域に根ざした硝子店が、<br>あなたの「窓の困った」に、丁寧に向き合います。</p><div class="hero-actions"><a class="button" href="./contact/index.html">窓のことを相談する${arrow}</a><a class="text-link" href="./service/index.html">事業紹介を見る<span class="arrow" aria-hidden="true">→</span></a></div></div><div class="hero-visual"><img src="./assets/service_eco.webp" width="1024" height="1024" alt="大きな窓から柔らかい光が差し込むリビングのイメージ" fetchpriority="high"><div class="hero-stamp"><small>LOCAL CRAFT</small><span>地域に根ざす</span><strong>窓の専門店</strong></div><div class="photo-caption"><span>A BETTER LIFE, THROUGH YOUR WINDOWS.</span><span>写真はイメージです</span></div></div></section>
<div class="service-strip"><div class="wrap strip-inner"><p class="strip-label">ガラス・サッシ・フィルム<br>窓まわりのこと、お任せください。</p><div class="strip-item">${icon("window")}<div>小さな修理から対応<small>窓ガラス一枚でもお気軽に</small></div></div><div class="strip-item">${icon("check")}<div>ご相談・お見積もり無料<small>まずはお話をお聞かせください</small></div></div><a class="strip-item" href="tel:0296246241">${icon("phone")}<div><small>お急ぎの方はお電話で</small><strong>0296-24-6241</strong></div></a></div></div>
<section class="section"><div class="wrap intro"><div><p class="eyebrow">About us</p><h2 class="section-title">いつもの窓に、<br>いつでも頼れる人を。</h2></div><div class="intro-copy"><p>何気なく開ける窓。日差しの入るリビング。<br>その当たり前の心地よさを、私たちは大切にしています。<br><br>老田硝子店は、茨城県筑西市のガラス・サッシ専門店です。<br>突然のガラス割れも、ずっと気になっていた窓の不具合も。<br>お住まいの状態に合わせて、必要な施工をご提案します。</p><a class="text-link" href="./company/index.html">老田硝子店について${arrow}</a></div></div></section>
<section class="section services" id="service"><div class="wrap"><div class="section-head"><div><p class="eyebrow">Our services</p><h2 class="section-title">窓のお悩みに、できること。</h2></div><p>直す、整える、機能を加える。<br>暮らしに合った方法を、一緒に考えます。</p></div><div class="service-grid">${services.map((s) => `<a class="service-card" href="./service/index.html#${s.id}"><div class="card-image">${pic("./", s.image, s.alt)}<span class="number" aria-hidden="true">${s.num}</span></div><div class="card-body"><h3>${s.title}${arrow}</h3><p>${s.short}</p><div class="card-tags">${s.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div></div></a>`).join("")}</div><p class="photo-note">掲載写真は施工内容・住空間のイメージです。</p><div class="service-bottom"><a class="button outline" href="./service/index.html">サービスを詳しく見る${arrow}</a></div></div></section>
<section class="section"><div class="wrap"><p class="eyebrow">Our promise</p><h2 class="section-title">身近な硝子店として、大切にすること。</h2><div class="promise-grid">${[
  [
    "01",
    "地域に寄り添う。",
    "筑西市と近隣地域の皆さまへ。小さな修理も相談しやすい、身近な窓の専門店でありたいと考えています。",
  ],
  [
    "02",
    "わかりやすく伝える。",
    "お困りごとを伺い、施工の内容と費用をご説明。ご納得いただいてから作業を進めます。",
  ],
  [
    "03",
    "一つひとつ、丁寧に。",
    "採寸から施工、仕上がりの確認まで。毎日使う窓だからこそ、細かなところにも気を配ります。",
  ],
]
  .map(
    ([n, h, t]) =>
      `<div class="promise"><span>${n}</span><h3>${h}</h3><p>${t}</p></div>`,
  )
  .join("")}</div></div></section>
<section class="feature"><div class="feature-photo">${pic("./", "case_living", "窓辺でくつろぐ明るいリビングのイメージ")}</div><div class="feature-copy"><p class="eyebrow">Comfort by the window</p><h2 class="section-title">窓を見直すと、<br>暮らしが変わる。</h2><p>冬の寒さ、夏の日差し、毎朝の結露。<br>そのお悩み、窓から考えてみませんか。<br>内窓やガラスの交換で、もっと心地よい住まいへ。</p><a class="text-link" href="./service/index.html#sash">内窓・サッシのご相談${arrow}</a><p class="photo-note">写真は住空間のイメージです。</p></div></section>${flow()}${faq()}`;
const service =
  pageHero(
    "../",
    "Our services",
    "事業紹介",
    "ガラス一枚の修理から、窓まわりのリフォームまで。お悩みと住まいに合った施工をご提案します。",
    `<nav class="jump-nav" aria-label="サービス一覧">${services.map((s) => `<a href="#${s.id}">${s.num} ${s.title}<span aria-hidden="true">↓</span></a>`).join("")}</nav>`,
  ) +
  `<div class="wrap">${services.map((s) => `<section class="service-detail" id="${s.id}" aria-labelledby="${s.id}-title"><figure class="detail-photo">${pic("../", s.image, s.alt)}<figcaption>写真は施工内容・住空間のイメージです。</figcaption></figure><div class="detail-copy"><p class="eyebrow">${s.num} / ${s.en}</p><h2 class="section-title" id="${s.id}-title">${s.title}</h2><p><strong>${s.intro}</strong><br>${s.text}</p><ul>${s.list.map((t) => `<li>${t}</li>`).join("")}</ul><a class="text-link" href="../contact/index.html">このサービスを相談する${arrow}</a><p>${s.note}</p></div></section>`).join("")}<aside class="note-box"><strong>費用は、窓の種類や状態を確認してご案内します。</strong>ガラスのサイズや種類、設置場所によって費用は異なります。まずはお電話・LINEでご相談ください。ご相談・お見積もりは無料です。</aside></div>${flow()}`;
const company =
  pageHero(
    "../",
    "About us",
    "私たちについて",
    "地域に根ざし、暮らしに寄り添う。茨城県筑西市の有限会社老田硝子店です。",
  ) +
  `<section class="section"><div class="wrap intro"><div><p class="eyebrow">Our philosophy</p><h2 class="section-title">窓の向こうにある、<br>日々の暮らしのために。</h2></div><div class="intro-copy"><p>私たちは、日々の暮らしを支える「窓」の安心を第一に考え、誠実な施工を大切にしています。<br><br>小さな修理から住まいの窓の見直しまで。お客様の声に耳を傾け、窓の状態を確かめながら、必要な施工を一緒に考えます。<br><br>「こんなことを頼んでもいいのかな」。そう思ったときも、どうぞ気軽にお声がけください。</p></div></div></section><section class="section services"><div class="wrap company-grid"><div><p class="eyebrow">Company profile</p><h2 class="section-title">会社概要</h2></div><dl class="company-table">${[
    ["名称", "有限会社老田硝子店"],
    ["代表者", "老田 成男"],
    ["所在地", "〒308-0021<br>茨城県筑西市甲91-1"],
    ["電話番号", '<a href="tel:0296246241">0296-24-6241</a>'],
    ["受付時間", "8:00〜18:00"],
    ["定休日", "日曜日"],
    ["事業内容", "一般住宅のサッシ・ガラス・窓用フィルム施工"],
    ["対応エリア", "筑西市および近隣地域"],
  ]
    .map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`)
    .join(
      "",
    )}</dl></div></section><section class="section"><div class="wrap"><div class="company-grid"><div><p class="eyebrow">Our history</p><h2 class="section-title">地域とともに。</h2></div><div class="history"><p><time datetime="1990">1990年</time><span>老田硝子店 創業</span></p><p><time datetime="2005">2005年</time><span>有限会社へ法人化</span></p><p><span>現在</span><span>住宅向けガラス・サッシ・フィルム施工を中心に事業展開</span></p></div></div><div class="map-panel"><div><h3>筑西市から、お伺いします。</h3><p>〒308-0021 茨城県筑西市甲91-1<br>ご来店の際は、事前にお電話でご連絡ください。</p></div><a class="button outline" href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent("有限会社老田硝子店 茨城県筑西市甲91-1")}" target="_blank" rel="noopener noreferrer">Google マップで見る${arrow}</a></div></div></section>`;
const contact =
  pageHero(
    "../",
    "Contact",
    "ご相談・お見積もり",
    "「ガラスが割れた」「窓が開けにくい」「寒さが気になる」。窓のことなら、まずは気軽にご相談ください。",
  ) +
  `<section class="section"><div class="wrap"><div class="contact-options"><section class="contact-option"><div class="icon-box">${icon("phone")}</div><p class="eyebrow">Phone</p><h2>お急ぎの方は、お電話で。</h2><p>ガラス割れなど、お急ぎのご相談はこちらへ。<br>状況を伺い、対応できる日程をご案内します。</p><a class="button phone-number" href="tel:0296246241">${icon("phone")}0296-24-6241</a><small>受付 ${hours}<br>当日対応の可否は、在庫・現場の状況によります。</small></section><section class="contact-option line"><div class="icon-box">${icon("chat")}</div><p class="eyebrow">LINE</p><h2>写真を添えて、気軽に。</h2><p>友だち追加して、窓の写真とお困りごとを送信。<br>文章でゆっくり相談したい方におすすめです。</p><a class="button" href="${line}" target="_blank" rel="noopener noreferrer">${icon("chat")}LINEで相談する${arrow}</a><small>メッセージは24時間送信できます。<br>返信は営業時間内に順次行います。</small></section></div><div class="contact-preparation"><div><p class="eyebrow">Before you contact us</p><h2 class="section-title">わかる範囲で、<br>お聞かせください。</h2><p class="muted">詳しい種類や寸法がわからなくても大丈夫です。</p></div><ul class="checklist"><li>お名前・ご連絡先</li><li>お住まいの地域・施工場所</li><li>窓の状態や、お困りごと</li><li>窓全体と気になる箇所の写真（LINEの場合）</li><li>ご希望の時期</li></ul></div><aside class="note-box"><strong>ご相談・お見積もりは無料です。</strong>正確なお見積もりには、現地確認が必要な場合があります。施工内容と費用をご確認いただいてから作業を進めます。<br>お預かりする情報の取り扱いは、<a class="text-link" href="../privacy/index.html">プライバシーポリシー${arrow}</a>をご確認ください。</aside></div></section>${faq()}`;
const privacy =
  pageHero(
    "../",
    "Privacy policy",
    "プライバシーポリシー",
    "お客様の個人情報の取り扱いについて。",
  ) +
  `<section class="section"><div class="wrap"><div class="privacy-content">${readFileSync(resolve(root, "content/privacy.html"), "utf8")}</div></div></section>`;
const pages = [
  {
    key: "home",
    title: "有限会社老田硝子店｜筑西市のガラス修理・サッシ・窓用フィルム",
    description:
      "茨城県筑西市の老田硝子店。ガラス一枚の修理から、サッシ・内窓・窓用フィルムまで丁寧に対応。ご相談・お見積もり無料。電話0296-24-6241、LINEでも受付。8:00〜18:00・日曜定休。",
    content: home,
  },
  {
    key: "service",
    title: "事業紹介｜ガラス修理・サッシ・窓用フィルム｜老田硝子店",
    description:
      "ガラス修理・交換、サッシ調整・内窓設置、窓用フィルム施工。筑西市と近隣地域の窓のお悩みに、住まいに合った施工をご提案します。",
    content: service,
  },
  {
    key: "company",
    title: "会社概要・私たちについて｜有限会社老田硝子店",
    description:
      "有限会社老田硝子店は茨城県筑西市甲91-1のガラス・サッシ専門店です。会社情報、対応エリア、アクセスをご案内します。",
    content: company,
  },
  {
    key: "contact",
    title: "ご相談・お見積もり｜電話・LINE｜老田硝子店",
    description:
      "窓のご相談・お見積もりは無料。電話0296-24-6241（8:00〜18:00・日曜定休）、LINEで受け付けています。お急ぎの修理はお電話ください。",
    content: contact,
    contact: false,
  },
  {
    key: "privacy",
    title: "プライバシーポリシー｜有限会社老田硝子店",
    description: "有限会社老田硝子店の個人情報の取り扱いについてご案内します。",
    content: privacy,
    contact: false,
  },
  {
    key: "404",
    title: "ページが見つかりません｜老田硝子店",
    description:
      "お探しのページが見つかりません。トップページからご覧ください。",
    content:
      '<section class="wrap not-found"><p class="eyebrow">Page not found</p><h1>404</h1><p>お探しのページが見つかりませんでした。<br>ページの移動やURLの変更があった可能性があります。</p><a class="button" href="/HP/index.html">ホームへ戻る<span aria-hidden="true">→</span></a></section>',
    contact: false,
    noindex: true,
  },
];
for (const page of pages) {
  const target = resolve(
    root,
    page.key === "home"
      ? "index.html"
      : page.key === "404"
        ? "404.html"
        : `${page.key}/index.html`,
  );
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, layout(page).replace(/></g, ">\n<"));
}
for (const key of ["service", "company", "contact"]) {
  writeFileSync(
    resolve(root, `${key}.html`),
    `<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ページを移動しました｜老田硝子店</title><link rel="canonical" href="${site}${key}/"><meta http-equiv="refresh" content="0;url=./${key}/index.html"><script>location.replace('./${key}/index.html'+location.search+location.hash);</script></head><body><p>ページを移動しました。<a href="./${key}/index.html">こちらからご覧ください。</a></p></body></html>\n`,
  );
}
writeFileSync(
  resolve(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
    .filter((p) => !p.noindex)
    .map(
      (p) =>
        `<url><loc>${site}${p.key === "home" ? "" : p.key + "/"}</loc></url>`,
    )
    .join("")}</urlset>\n`,
);
console.log("Built 6 pages, 3 legacy redirects, and sitemap.xml.");

// 老田硝子店 - 最小構成用スクリプト
// 役割:
//  - モバイルメニュー開閉
//  - 年号の自動更新
//  - ヒーロー画像/テキストの初期フェードイン
//  - AOS(Animate On Scroll) の初期化
//  - お問い合わせフォームの簡易バリデーション＋擬似送信

document.addEventListener('DOMContentLoaded', function () {
  // モバイルメニュー開閉
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('mobileNav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const nowHidden = nav.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', String(!nowHidden));
    });
  }

  // 年号の自動更新
  const year = document.getElementById('y');
  if (year) year.textContent = new Date().getFullYear();

  // ヒーローのフェードイン（画像 -> テキスト）
  const heroImg = document.querySelector('.hero-img');
  const heroText = document.querySelector('.hero-text');
  if (heroImg) {
    // 画像が読み込まれたら表示（キャッシュ考慮）
    const reveal = () => heroImg.classList.add('is-visible');
    if ((heroImg).complete) reveal(); else heroImg.addEventListener('load', reveal);
  }
  if (heroText) {
    // 少し遅らせてテキストを表示
    setTimeout(() => heroText.classList.add('is-visible'), 150);
  }

  // モバイル下部CTAのふんわり表示
  const mobileCta = document.getElementById('mobileStickyCta');
  if (mobileCta) {
    setTimeout(() => mobileCta.classList.add('is-visible'), 300);
  }

  // AOS 初期化（スクロールでふんわり出現）
  if (window.AOS) {
    AOS.init({
      duration: 650,
      easing: 'ease-out',
      once: true,
      offset: 80,
    });
  }

  // お問い合わせフォーム（擬似送信 + 簡易検証）
  const form = document.getElementById('contactForm');
  if (form) {
    const nameI = document.getElementById('name');
    const emailI = document.getElementById('email');
    const msgI = document.getElementById('message');
    const agreeI = document.getElementById('agree');
    const nameErr = document.getElementById('nameErr');
    const emailErr = document.getElementById('emailErr');
    const messageErr = document.getElementById('messageErr');
    const formMsg = document.getElementById('formMsg');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      [nameErr, emailErr, messageErr].forEach(el => el && el.classList.add('hidden'));
      if (nameI && !nameI.value.trim()) { nameErr && nameErr.classList.remove('hidden'); ok = false; }
      if (emailI && !emailI.checkValidity()) { emailErr && emailErr.classList.remove('hidden'); ok = false; }
      if (msgI && !msgI.value.trim()) { messageErr && messageErr.classList.remove('hidden'); ok = false; }
      if (agreeI && !agreeI.checked) { ok = false; alert('個人情報の取り扱いに同意してください。'); }
      if (!ok) return;
      form.reset();
      formMsg && formMsg.classList.remove('hidden');
    });
  }
});


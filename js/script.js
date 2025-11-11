// 閠∫伐遑晏ｭ仙ｺ・- 譛蟆乗ｧ区・逕ｨ繧ｹ繧ｯ繝ｪ繝励ヨ
// 蠖ｹ蜑ｲ:
//  - 繝｢繝舌う繝ｫ繝｡繝九Η繝ｼ髢矩哩
//  - 蟷ｴ蜿ｷ縺ｮ閾ｪ蜍墓峩譁ｰ
//  - 繝偵・繝ｭ繝ｼ逕ｻ蜒・繝・く繧ｹ繝医・蛻晄悄繝輔ぉ繝ｼ繝峨う繝ｳ
//  - AOS(Animate On Scroll) 縺ｮ蛻晄悄蛹・//  - 縺雁撫縺・粋繧上○繝輔か繝ｼ繝縺ｮ邁｡譏薙ヰ繝ｪ繝・・繧ｷ繝ｧ繝ｳ・区闘莨ｼ騾∽ｿ｡

document.addEventListener('DOMContentLoaded', function () {
  // 繝｢繝舌う繝ｫ繝｡繝九Η繝ｼ髢矩哩
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('mobileNav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const nowHidden = nav.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', String(!nowHidden));
    });
  }

  // 蟷ｴ蜿ｷ縺ｮ閾ｪ蜍墓峩譁ｰ
  const year = document.getElementById('y');
  if (year) year.textContent = new Date().getFullYear();

  // 繝偵・繝ｭ繝ｼ縺ｮ繝輔ぉ繝ｼ繝峨う繝ｳ・育判蜒・-> 繝・く繧ｹ繝茨ｼ・  const heroImg = document.querySelector('.hero-img');
  const heroText = document.querySelector('.hero-text');
  if (heroImg) {
    // 逕ｻ蜒上′隱ｭ縺ｿ霎ｼ縺ｾ繧後◆繧芽｡ｨ遉ｺ・医く繝｣繝・す繝･閠・・・・    const reveal = () => heroImg.classList.add('is-visible');
    if ((heroImg).complete) reveal(); else heroImg.addEventListener('load', reveal);
  }
  if (heroText) {
    // 蟆代＠驕・ｉ縺帙※繝・く繧ｹ繝医ｒ陦ｨ遉ｺ
    setTimeout(() => heroText.classList.add('is-visible'), 150);
  }

  // 繝｢繝舌う繝ｫ荳矩ΚCTA縺ｮ縺ｵ繧薙ｏ繧願｡ｨ遉ｺ
  const mobileCta = document.getElementById('mobileStickyCta');
  if (mobileCta) {
    setTimeout(() => mobileCta.classList.add('is-visible'), 300);
  }

  // AOS 蛻晄悄蛹厄ｼ医せ繧ｯ繝ｭ繝ｼ繝ｫ縺ｧ縺ｵ繧薙ｏ繧雁・迴ｾ・・  if (window.AOS) {
    AOS.init({
      duration: 650,
      easing: 'ease-out',
      once: true,
      offset: 80,
    });
  }

  // 縺雁撫縺・粋繧上○繝輔か繝ｼ繝・域闘莨ｼ騾∽ｿ｡ + 邁｡譏捺､懆ｨｼ・・  const form = document.getElementById('contactForm');
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
      if (agreeI && !agreeI.checked) { ok = false; alert('蛟倶ｺｺ諠・ｱ縺ｮ蜿悶ｊ謇ｱ縺・↓蜷梧э縺励※縺上□縺輔＞縲・); }
      if (!ok) return;
      form.reset();
      formMsg && formMsg.classList.remove('hidden');
    });
  }
});



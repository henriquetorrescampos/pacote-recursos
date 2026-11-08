/* =========================================================
   CONFIGURAÇÃO: edite aqui o preço e o link de pagamento
   ========================================================= */
const CONFIG = {
  // Link do checkout (Kiwify, Hotmart, Eduzz, Cakto etc.)
  checkoutUrl: '#',

  precoDe: 'R$ 97,00',        // valor "de" (riscado)
  preco: 'R$ 37,00',          // valor final
  parcelas: 'ou até 8x de R$ 5,27 no cartão',
};

/* ---------- Aplica a configuração ---------- */
document.querySelectorAll('[data-preco]').forEach(el => (el.textContent = CONFIG.preco));
document.querySelectorAll('[data-preco-de]').forEach(el => (el.textContent = CONFIG.precoDe));
document.querySelectorAll('[data-parcelas]').forEach(el => (el.textContent = CONFIG.parcelas));
document.querySelectorAll('[data-checkout]').forEach(el => (el.href = CONFIG.checkoutUrl));
document.querySelectorAll('[data-year]').forEach(el => (el.textContent = new Date().getFullYear()));

/* ---------- Animação ao rolar ---------- */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

/* ---------- CTA fixo (mobile): aparece depois do hero, some na oferta ---------- */
const sticky = document.querySelector('.sticky-cta');
const hero = document.querySelector('.hero');
const offer = document.querySelector('#oferta');
let pastHero = false;
let atOffer = false;
const updateSticky = () => {
  const show = pastHero && !atOffer;
  sticky.classList.toggle('is-visible', show);
  // só empurra o WhatsApp para cima quando a barra está de fato visível (mobile)
  document.body.classList.toggle('has-sticky', show && getComputedStyle(sticky).display !== 'none');
};

if ('IntersectionObserver' in window && sticky) {
  new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; updateSticky(); }).observe(hero);
  new IntersectionObserver(([e]) => { atOffer = e.isIntersecting; updateSticky(); }, { threshold: 0.1 }).observe(offer);
}

/* ---------- Lightbox ---------- */
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');

document.querySelectorAll('[data-lightbox]').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
});

const closeLightbox = () => {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
};
lightbox.addEventListener('click', e => { if (e.target !== lightboxImg) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ---------- FAQ: mantém só uma pergunta aberta ---------- */
document.querySelectorAll('.faq details').forEach(d => {
  d.addEventListener('toggle', () => {
    if (d.open) document.querySelectorAll('.faq details').forEach(o => { if (o !== d) o.open = false; });
  });
});

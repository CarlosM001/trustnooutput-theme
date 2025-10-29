console.log("✅ custom.js geladen und aktiv!");
document.body.style.border = "3px solid lime";



/* ==========================================================================
   TRUST.NO.OUTPUT — custom.js (CLEAN)
   Motion: Page Fade, Reveal & sanfte Parallax
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* 1) Page fade-in */
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity .6s ease";
  requestAnimationFrame(() => setTimeout(() => { document.body.style.opacity = 1; }, 60));
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) { document.body.style.opacity = 0; setTimeout(() => { document.body.style.opacity = 1; }, 50); }
  });

  /* 2) Reveal + Parallax trigger */
  const revealEls = document.querySelectorAll(".reveal, [data-parallax]");
  if (revealEls.length){
    const obs = new IntersectionObserver((entries, observer)=>{
      entries.forEach((entry)=>{
        if (entry.isIntersecting){
          entry.target.classList.add("is-visible");
          if (entry.target.hasAttribute("data-parallax")) entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    revealEls.forEach((el)=>obs.observe(el));
  }

  /* 3) Micro-glitch impulse (subtil) */
  const glitchEls = document.querySelectorAll(".tno-glitch-strong, .tno-glitch-soft");
  glitchEls.forEach((el)=>{
    el.style.animation = "none";
    setTimeout(()=>{ el.style.animation = ""; }, 300 + Math.random()*400);
  });

  /* 4) Parallax scroll (leicht, optional) */
  const parallaxEls = document.querySelectorAll("[data-parallax].in-view");
  if (parallaxEls.length){
    window.addEventListener("scroll", ()=>{
      const y = window.scrollY || window.pageYOffset;
      parallaxEls.forEach((el)=>{
        const speed = 0.15;
        const offset = (y - el.offsetTop) * speed;
        el.style.transform = `translateY(${offset}px)`;
      });
    });
  }
});

/* 5) Maus-Parallax (optional für .tno-hero oder andere Elemente mit data-parallax="0.02") */
(function parallaxMouse(){
  const els = document.querySelectorAll('[data-parallax]');
  if (!els.length) return;

  let raf = null, mx = 0, my = 0, w = window.innerWidth, h = window.innerHeight;

  const onMove = (e) => {
    mx = (e.clientX / w - 0.5);
    my = (e.clientY / h - 0.5);
    if (!raf) raf = requestAnimationFrame(apply);
  };

  const apply = () => {
    els.forEach(el => {
      const f = parseFloat(el.getAttribute('data-parallax')) || 0.02;
      el.style.transform = `translate3d(${mx * f * 100}px, ${my * f * 100}px, 0)`;
    });
    raf = null;
  };

  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('resize', () => { w = window.innerWidth; h = window.innerHeight; });
})();

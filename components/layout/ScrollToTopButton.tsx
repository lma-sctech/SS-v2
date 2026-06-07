export function ScrollToTopButton() {
  return (
    <>
      <button
        type="button"
        id="scroll-to-top"
        aria-label="Scroll to top"
        className="focus-ring pointer-events-none fixed bottom-20 right-4 z-50 flex size-12 items-center justify-center rounded-full bg-[#F2A30F] text-xl font-bold leading-none text-navy opacity-0 shadow-[0_16px_45px_rgba(242,163,15,0.34)] transition duration-300 hover:-translate-y-1 hover:bg-[#f6b742] md:bottom-6"
      >
        ^
      </button>
      <script
        dangerouslySetInnerHTML={{
          __html: `
(() => {
  const button = document.getElementById("scroll-to-top");
  if (!button) return;
  let ticking = false;

  function setVisible(visible) {
    button.classList.toggle("pointer-events-none", !visible);
    button.classList.toggle("opacity-0", !visible);
    button.classList.toggle("opacity-100", visible);
    button.classList.toggle("bottom-20", !visible);
    button.classList.toggle("bottom-24", visible);
  }

  function update() {
    ticking = false;
    setVisible(window.scrollY > 520);
  }

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }, { passive: true });

  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  update();
})();`,
        }}
      />
    </>
  );
}

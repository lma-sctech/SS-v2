"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { navItems } from "@/data/site";
import { phoneLink, whatsappLink } from "@/lib/contact";
import { AboutStoryModal } from "@/components/marketing/AboutStoryTrigger";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pushedHistoryRef = useRef(false);
  const pendingAboutOpenRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.history.pushState({ ...window.history.state, sanaaMobileMenu: true }, "", window.location.href);
    pushedHistoryRef.current = true;

    function onPopState() {
      setIsOpen(false);
      pushedHistoryRef.current = false;

      if (pendingAboutOpenRef.current) {
        pendingAboutOpenRef.current = false;
        window.setTimeout(() => setIsAboutOpen(true), 0);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    function onPointerDown(event: PointerEvent) {
      const target = event.target;

      if (!(target instanceof Node)) return;
      if (panelRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;

      closeMenu();
    }

    window.addEventListener("popstate", onPopState);
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown, true);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [isOpen]);

  function closeMenu() {
    if (pushedHistoryRef.current && window.history.state?.sanaaMobileMenu) {
      window.history.back();
      return;
    }

    setIsOpen(false);
    pushedHistoryRef.current = false;
  }

  function closeMenuWithoutHistoryBack() {
    setIsOpen(false);
    pushedHistoryRef.current = false;
  }

  function openAboutStory() {
    if (pushedHistoryRef.current && window.history.state?.sanaaMobileMenu) {
      pendingAboutOpenRef.current = true;
      window.history.back();
      return;
    }

    closeMenuWithoutHistoryBack();
    setIsAboutOpen(true);
  }

  return (
    <div className="relative z-20 xl:hidden">
      <button
        ref={triggerRef}
        type="button"
        className="focus-ring flex size-10 cursor-pointer list-none items-center justify-center rounded-md"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
      >
        <span className="flex w-6 flex-col gap-1.5">
          <span className={`h-0.5 rounded-full bg-white transition ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 rounded-full bg-white transition ${isOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 rounded-full bg-white transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </span>
      </button>

      {isOpen ? (
        <>
          <div
            className="fixed inset-0 z-10 cursor-default bg-navy/18 backdrop-blur-[1px]"
            aria-hidden="true"
          />
          <div ref={panelRef} className="absolute right-0 top-14 z-20 w-[min(17.5rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/45 bg-[#F2A30F] p-3 text-navy shadow-[0_22px_70px_rgba(15,23,42,0.22)] backdrop-blur-xl">
            <div className="pointer-events-none absolute -left-10 top-0 h-full w-20 bg-gradient-to-r from-white/45 to-transparent blur-xl" />
            <div className="pointer-events-none absolute -right-10 top-0 h-full w-20 bg-gradient-to-l from-white/35 to-transparent blur-xl" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-navy/10" />
            <nav aria-label="Mobile navigation" className="relative z-10 grid gap-1.5">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="focus-ring rounded-xl px-4 py-3 text-sm font-bold text-navy transition hover:bg-white/35" onClick={closeMenuWithoutHistoryBack}>
                  {item.label}
                </Link>
              ))}
              <button type="button" className="focus-ring rounded-xl px-4 py-3 text-left text-sm font-bold text-navy transition hover:bg-white/35" onClick={openAboutStory}>
                About us
              </button>
            </nav>
            <div className="relative z-10 mt-4 grid gap-2">
              <ButtonLink href={phoneLink()} variant="contact" onClick={closeMenuWithoutHistoryBack}>
                Contact us
              </ButtonLink>
              <ButtonLink href={whatsappLink()} variant="whatsapp" target="_blank" rel="noreferrer" onClick={closeMenuWithoutHistoryBack}>
                WhatsApp
              </ButtonLink>
            </div>
          </div>
        </>
      ) : null}
      <AboutStoryModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
}

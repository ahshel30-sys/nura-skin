"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { site } from "@/lib/content";
import { useStore } from "./Store";

const ids = ["products", "story", "reviews", "faq"];

export default function Header() {
  const [notice, setNotice] = useState(true);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const { count, setCartOpen } = useStore();

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
    const hero = document.getElementById("home");
    if (!sections.length || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    }), { rootMargin: "-35% 0px -55% 0px" });
    if (hero) observer.observe(hero);
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "Tab" && menuRef.current) {
        const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a,button"));
        if (!items.length) return;
        if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items[items.length - 1].focus(); }
        else if (!event.shiftKey && document.activeElement === items[items.length - 1]) { event.preventDefault(); items[0].focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    requestAnimationFrame(() => menuRef.current?.querySelector("a")?.focus());
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open, close]);

  return (
    <>
      {notice ? (
        <div className="notice">
          <span className="notice__star" aria-hidden="true">✳</span>
          <p>اكتشفي روتينك الجديد للعناية ببشرتك</p>
          <button onClick={() => setNotice(false)} aria-label="إخفاء الإعلان"><X size={14} /></button>
        </div>
      ) : null}
      <div className="progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      <header className="nav">
        <div className="nav__inner">
          <a className="logo" href="#home" aria-label="نُورا — الرئيسية" onClick={close}>
            <span className="logo__mark">✳</span>
            <span className="logo__text">NŪRA <i>SKIN</i></span>
          </a>
          <nav className="nav__links" aria-label="التنقل الرئيسي">
            {site.nav.map((link) => {
              const id = link.href.replace("#", "");
              return <a key={link.href} href={link.href} className={active === id ? "is-active" : ""} aria-current={active === id ? "page" : undefined}>{link.label}</a>;
            })}
          </nav>
          <div className="nav__actions">
            <button className="bag" onClick={() => setCartOpen(true)} aria-label={`فتح سلة المشتريات، ${count} منتج`}>
              <ShoppingBag size={18} strokeWidth={1.6} /><span className="bag__count" dir="ltr">{count}</span>
            </button>
            <button className="menu-toggle" onClick={() => (open ? close() : setOpen(true))} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
      {open ? (
        <div className="mobile-menu" id="mobile-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="قائمة التنقل">
          <nav aria-label="قائمة الجوال">
            {site.nav.map((link, index) => <a key={link.href} href={link.href} onClick={close}><span dir="ltr">0{index + 1}</span>{link.label}</a>)}
          </nav>
          <p>نُورا للعناية بالبشرة<br />عناية بسيطة لكل يوم</p>
        </div>
      ) : null}
    </>
  );
}

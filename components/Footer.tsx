import { ArrowUp, Instagram, Facebook } from "lucide-react";
import { site, products } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <div className="footer__logo latin">NŪRA<span>SKIN</span></div>
          <p>نُورا للعناية بالبشرة — علامة تجارية توضيحية أنشئت لعرض تصميم وتطوير موقع متكامل.</p>
          <div className="footer__social">
            {site.socials.slice(0, 2).map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                {social.label === "Instagram" ? <Instagram size={17} /> : <Facebook size={17} />}
              </a>
            ))}
          </div>
        </div>
        <div className="footer__cols">
          <nav aria-label="روابط التذييل">
            <h3>استكشفي</h3>
            <ul>{site.nav.map((link) => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>
          </nav>
          <div>
            <h3>المنتجات</h3>
            <ul>{products.map((product) => <li key={product.id}><a href="#products">{product.name}</a></li>)}</ul>
          </div>
          <div>
            <h3>تواصلي</h3>
            <ul>
              <li><a href="mailto:hello@nura-skin-demo.com" dir="ltr">hello@nura-skin-demo.com</a></li>
              <li><span dir="ltr">{site.phone}</span></li>
              <li>{site.address}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__word latin" aria-hidden="true">NŪRA</div>
      <div className="footer__bottom">
        <p>© 2026 نُورا سكين — مفهوم توضيحي لل portfolio. جميع المنتجات والأسعار والآراء خيالية.</p>
        <a href="#home" className="back-top">العودة للأعلى <ArrowUp size={13} /></a>
      </div>
    </footer>
  );
}

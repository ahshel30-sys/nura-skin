import Image from "next/image";

function Burst({ className = "" }: { className?: string }) {
  const points = 14;
  const step = Math.PI / points;
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? 98 : 78;
    const x = (100 + Math.cos(i * step - Math.PI / 2) * radius).toFixed(1);
    const y = (100 + Math.sin(i * step - Math.PI / 2) * radius).toFixed(1);
    d += `${i === 0 ? "M" : "L"}${x} ${y}`;
  }
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <path d={`${d}Z`} fill="currentColor" />
    </svg>
  );
}

function Squiggle() {
  return (
    <svg className="hero__squiggle" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
      <path d="M4 14 Q22 -4 40 12 T76 12 T112 12 T148 12 T184 12 T220 12 T256 12 T296 10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__copy">
        <span className="kicker"><span dir="ltr">01</span> / نُورا سكين</span>
        <h1 id="hero-title">جمالكِ<br />يبدأ بـ<span className="hero__accent">عناية<br />هادئة</span></h1>
        <Squiggle />
        <p className="hero__lede">منتجات عناية بالبشرة بسيطة ومدروسة، صُممت لتصبح لحظتكِ الخاصة كل يوم. لا تعقيد، ولا وعود مبالغ فيها — فقط روتين تشعرين معه بالراحة.</p>
        <div className="hero__actions">
          <a className="btn btn--ink" href="#products">اكتشفي المنتجات <span aria-hidden="true">←</span></a>
          <a className="btn btn--ghost" href="#story">اكتشفي قصتنا</a>
        </div>
        <div className="hero__meta">
          <div><b dir="ltr">04</b><span>منتجات أساسية</span></div>
          <div><b dir="ltr">100%</b><span>تجربة توضيحية</span></div>
          <div><b>✳</b><span>صنعت بحب للتفاصيل</span></div>
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero__frame">
          <Image src="/images/hero.webp" alt="زجاجة زيت زجاجية على حامل مع ظلال نباتية دافئة" fill priority sizes="(max-width: 900px) 92vw, 44vw" />
        </div>
        <div className="hero__burst"><Burst /><span>جَديد</span></div>
        <div className="hero__sticker">
          <span className="latin">NŪRA</span>
          <b>روتينكِ اليومي</b>
        </div>
        <div className="hero__label latin">simple care · quiet glow</div>
      </div>
    </section>
  );
}

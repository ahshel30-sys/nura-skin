"use client";

import { useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { testimonials } from "@/lib/content";
import Image from "next/image";

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const item = testimonials[index];

  const next = () => setIndex((value) => (value + 1) % testimonials.length);
  const prev = () => setIndex((value) => (value - 1 + testimonials.length) % testimonials.length);

  const subscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError("يرجى إدخال بريد إلكتروني صحيح.");
      return;
    }
    setError(null);
    setDone(true);
  };

  return (
    <>
      <section className="section reviews" id="reviews" aria-labelledby="reviews-title">
        <div className="section__head" data-reveal>
          <div>
            <span className="kicker"><span dir="ltr">05</span> / آراء تجريبية</span>
            <h2 id="reviews-title">كلام <em>جميل</em></h2>
          </div>
          <p>آراء توضيحية منشأة للعرض، وليست تقييمات حقيقية لعملاء.</p>
        </div>
        <div className="reviews__stage" data-reveal>
          <div className="reviews__art"><Image src="/images/ritual.webp" alt="لحظة عناية يومية هادئة" fill sizes="(max-width: 900px) 92vw, 35vw" /></div>
          <div className="reviews__content" key={index}>
            <span className="reviews__mark" aria-hidden="true">❝</span>
            <blockquote>{item.quote}</blockquote>
            <div className="reviews__who"><b>{item.name}</b><span>{item.detail}</span></div>
          </div>
          <div className="reviews__controls">
            <button onClick={prev} aria-label="الرأي السابق"><ChevronRight size={18} /></button>
            <span dir="ltr">{String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span>
            <button onClick={next} aria-label="الرأي التالي"><ChevronLeft size={18} /></button>
          </div>
        </div>
        <p className="demo-note">هذه آراء توضيحية منشأة لهذا المشروع، وليست شهادات عملاء حقيقية.</p>
      </section>

      <section className="newsletter" aria-labelledby="newsletter-title">
        <div className="newsletter__inner" data-reveal>
          <div>
            <span className="kicker"><span dir="ltr">06</span> / النشرة</span>
            <h2 id="newsletter-title">رسائل قليلة،<br />لكن <em>جميلة</em></h2>
            <p>اشتركي لتصلكِ ملاحظات عن الروتين والعناية البسيطة. هذه نشرة توضيحية لا تُرسل فيها رسائل فعلية.</p>
          </div>
          {done ? (
            <div className="newsletter__done" role="status">
              <CheckCircle2 size={26} />
              <h3>تم التسجيل تجريبيًا</h3>
              <p>شكرًا لكِ! لم تُحفظ بياناتكِ ولم يُرسل أي بريد — هذا عرض توضيحي فقط.</p>
              <button className="text-btn" onClick={() => { setEmail(""); setDone(false); }}>تسجيل بريد آخر</button>
            </div>
          ) : (
            <form onSubmit={subscribe} noValidate>
              <label htmlFor="newsletter-email">بريدكِ الإلكتروني</label>
              <div className="newsletter__row">
                <Mail size={18} aria-hidden="true" />
                <input id="newsletter-email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setError(null); }} placeholder="you@example.com" dir="ltr" aria-invalid={Boolean(error)} aria-describedby={error ? "newsletter-error" : undefined} />
                <button className="btn btn--ink" type="submit">اشتركي</button>
              </div>
              {error ? <p className="field-error" id="newsletter-error">{error}</p> : <p className="newsletter__hint">لن نشارك بريدكِ مع أي جهة — لا يوجد أي خادم في هذا العرض.</p>}
            </form>
          )}
        </div>
      </section>
    </>
  );
}

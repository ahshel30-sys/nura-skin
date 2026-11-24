import { faqs } from "@/lib/content";

export default function Faq() {
  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="section__head" data-reveal>
        <div>
          <span className="kicker"><span dir="ltr">07</span> / الأسئلة الشائعة</span>
          <h2 id="faq-title">أسئلة <em>صغيرة</em></h2>
        </div>
        <p>إجابات توضيحية عن هذا المتجر التجريبي، وليست معلومات عن متجر حقيقي.</p>
      </div>
      <div className="faq__layout">
        <div className="faq__aside" data-reveal>
          <div className="faq__burst" aria-hidden="true">✳</div>
          <p>لم تجدي إجابتكِ؟<br />هذا متجر توضيحي، لذا كل التفاصيل هنا للعرض فقط.</p>
          <a href="mailto:hello@nura-skin-demo.com" className="text-btn">راسلينا (بريد توضيحي)</a>
        </div>
        <div className="faq__list" data-reveal>
          {faqs.map((item, index) => (
            <details key={item.q}>
              <summary>
                <span className="faq__num latin" dir="ltr">{String(index + 1).padStart(2, "0")}</span>
                <span>{item.q}</span>
                <span className="faq__plus" aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

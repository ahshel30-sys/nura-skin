import Image from "next/image";
import { Droplet, Leaf, Sparkles, Sun } from "lucide-react";
import { values } from "@/lib/content";

const icons = { sparkle: Sparkles, leaf: Leaf, droplet: Droplet, sun: Sun };

export default function Story() {
  return (
    <>
      <section className="section story" id="story" aria-labelledby="story-title">
        <div className="story__inner">
          <div className="story__visual" data-reveal>
            <div className="story__image"><Image src="/images/story.webp" alt="يدان تحملان زهورًا طبيعية بضوء ناعم" fill sizes="(max-width: 900px) 92vw, 40vw" /></div>
            <div className="story__quote">«العناية ليست خطوة إضافية، بل لحظة تعودين فيها إلى نفسكِ.»</div>
            <div className="story__badge latin">nūra<br />skin</div>
          </div>
          <div className="story__copy" data-reveal>
            <span className="kicker"><span dir="ltr">03</span> / قصتنا</span>
            <h2 id="story-title">الجمال يبدأ<br />من <em>العناية</em></h2>
            <p>بدأت نُورا من فكرة بسيطة: أن العناية بالبشرة لا تحتاج إلى قائمة طويلة من الخطوات، ولا إلى وعود كبيرة. يكفي أن تكون المنتجات لطيفة، صادقة، وجميلة في استخدامها اليومي.</p>
            <p>اخترنا أسماءً هادئة، وعبواتًا يمكن أن تبقى على رفّكِ بكل فخر، وملمسًا يجعل الروتين أقرب إلى الطقس منه إلى المهمة. هذا ما تعنيه نُورا بالبساطة.</p>
            <div className="story__signature"><span className="latin">Nūra Skin</span><span>— علامة توضيحية</span></div>
          </div>
        </div>
      </section>

      <section className="section values" aria-label="قيم العلامة">
        <div className="section__head" data-reveal>
          <div>
            <span className="kicker"><span dir="ltr">04</span> / ما نؤمن به</span>
            <h2>تفاصيل نصنعها<br /><em>بقصد</em></h2>
          </div>
          <p>أربع قيم بسيطة تشكّل طريقة تفكيرنا في كل منتج وكل عبوة.</p>
        </div>
        <div className="values__grid">
          {values.map((value, index) => {
            const Icon = icons[value.icon];
            return (
              <article className="value" key={value.title} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
                <span className="value__icon"><Icon size={24} strokeWidth={1.4} /></span>
                <span className="value__no latin" dir="ltr">0{index + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

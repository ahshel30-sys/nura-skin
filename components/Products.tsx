"use client";

import { ArrowUpLeft, Plus } from "lucide-react";
import { formatPrice, products } from "@/lib/content";
import { useStore } from "./Store";

export default function Products() {
  const { add, setDetail } = useStore();

  return (
    <section className="section products" id="products" aria-labelledby="products-title">
      <div className="section__head" data-reveal>
        <div>
          <span className="kicker"><span dir="ltr">02</span> / المنتجات</span>
          <h2 id="products-title">مجموعة مُختارة<br /><em>بكل بساطة</em></h2>
        </div>
        <p>أربعة منتجات تؤسس روتينًا يوميًا متوازنًا. كل عبوة تحمل اسم نُورا، وتصميمًا هادئًا يليق برفّكِ.</p>
      </div>

      <div className="products__grid">
        {products.map((product, index) => (
          <article className="product" key={product.id} data-reveal style={{ transitionDelay: `${index * 80}ms` }}>
            <button className="product__media" onClick={() => setDetail(product)} aria-label={`عرض تفاصيل ${product.name}`}>
              <img src={product.image} alt={`عبوة ${product.name} من نُورا`} loading="lazy" />
              <span className="product__category">{product.category}</span>
            </button>
            <div className="product__body">
              <span className="product__latin latin">{product.latin}</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product__foot">
                <b dir="ltr">{formatPrice(product.price)}</b>
                <div className="product__buttons">
                  <button className="product__details" onClick={() => setDetail(product)}>التفاصيل <ArrowUpLeft size={14} /></button>
                  <button className="product__add" onClick={() => add(product.id)} aria-label={`أضف ${product.name} إلى الحقيبة`}><Plus size={17} /></button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="demo-note">جميع المنتجات والأسعار لعلامة تجارية توضيحية ولم يتم بيع أي منتج فعلي.</p>
    </section>
  );
}

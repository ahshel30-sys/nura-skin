"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatPrice, products, type Product } from "@/lib/content";

type Line = { id: string; qty: number };
type Store = {
  lines: Line[];
  count: number;
  subtotal: number;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  detail: Product | null;
  setDetail: (product: Product | null) => void;
};

const Ctx = createContext<Store | null>(null);

export function useStore() {
  const value = useContext(Ctx);
  if (!value) throw new Error("useStore must be used inside StoreProvider");
  return value;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [detail, setDetail] = useState<Product | null>(null);

  const add = useCallback((id: string) => {
    setLines((current) => {
      const found = current.find((line) => line.id === id);
      return found
        ? current.map((line) => (line.id === id ? { ...line, qty: line.qty + 1 } : line))
        : [...current, { id, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((current) => qty < 1 ? current.filter((line) => line.id !== id) : current.map((line) => (line.id === id ? { ...line, qty } : line)));
  }, []);

  const remove = useCallback((id: string) => setLines((current) => current.filter((line) => line.id !== id)), []);

  useEffect(() => {
    if (!cartOpen && !detail) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setCartOpen(false); setDetail(null); }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [cartOpen, detail]);

  const value = useMemo<Store>(() => ({
    lines,
    count: lines.reduce((sum, line) => sum + line.qty, 0),
    subtotal: lines.reduce((sum, line) => sum + (products.find((p) => p.id === line.id)?.price ?? 0) * line.qty, 0),
    add, setQty, remove, cartOpen, setCartOpen, detail, setDetail,
  }), [lines, add, setQty, remove, cartOpen, detail]);

  return <Ctx.Provider value={value}>{children}<CartDrawer /><ProductDialog /></Ctx.Provider>;
}

function CartDrawer() {
  const { lines, count, subtotal, setQty, remove, cartOpen, setCartOpen } = useStore();
  const close = () => setCartOpen(false);

  return (
    <div className={`drawer-root ${cartOpen ? "is-open" : ""}`} aria-hidden={!cartOpen}>
      <button className="drawer-scrim" tabIndex={cartOpen ? 0 : -1} aria-label="إغلاق سلة المشتريات" onClick={close} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="سلة المشتريات" aria-hidden={!cartOpen}>
        <div className="drawer__head">
          <div><span className="kicker">حقيبتك</span><h2>سلة المشتريات <span className="count">{count}</span></h2></div>
          <button className="icon-btn" onClick={close} aria-label="إغلاق"><X size={19} /></button>
        </div>
        {lines.length === 0 ? (
          <div className="drawer__empty">
            <ShoppingBag size={38} strokeWidth={1.2} />
            <p>حقيبتك فارغة</p>
            <span>ابدئي باكتشاف منتجات نُورا.</span>
            <button className="btn btn--ink" onClick={close}>تصفح المنتجات</button>
          </div>
        ) : (
          <>
            <ul className="drawer__lines">
              {lines.map((line) => {
                const product = products.find((p) => p.id === line.id)!;
                return (
                  <li key={line.id}>
                    <img src={product.image} alt="" width={72} height={88} />
                    <div className="drawer__info">
                      <strong>{product.name}</strong>
                      <span className="latin">{product.latin}</span>
                      <div className="qty">
                        <button onClick={() => setQty(line.id, line.qty - 1)} aria-label={`تقليل كمية ${product.name}`}><Minus size={13} /></button>
                        <span dir="ltr">{line.qty}</span>
                        <button onClick={() => setQty(line.id, line.qty + 1)} aria-label={`زيادة كمية ${product.name}`}><Plus size={13} /></button>
                      </div>
                    </div>
                    <div className="drawer__price">
                      <b dir="ltr">{formatPrice(product.price * line.qty)}</b>
                      <button onClick={() => remove(line.id)} aria-label={`حذف ${product.name}`}><Trash2 size={14} /></button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="drawer__foot">
              <div className="drawer__row"><span>المجموع الفرعي</span><b dir="ltr">{formatPrice(subtotal)}</b></div>
              <p>عرض توضيحي — لا توجد عملية دفع أو طلب حقيقي.</p>
              <button className="btn btn--ink" onClick={() => window.alert("هذا متجر توضيحي لل portfolio. لا توجد عملية دفع فعلية.")}>إتمام الطلب (توضيحي)</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function ProductDialog() {
  const { detail, setDetail, add } = useStore();
  if (!detail) return null;
  return (
    <div className="modal-root" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDetail(null); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={detail.name}>
        <button className="icon-btn modal__close" onClick={() => setDetail(null)} aria-label="إغلاق"><X size={19} /></button>
        <div className="modal__media"><img src={detail.image} alt={detail.name} /></div>
        <div className="modal__body">
          <span className="kicker">{detail.category} · نُورا</span>
          <h2>{detail.name}</h2>
          <p className="latin modal__latin">{detail.latin}</p>
          <p>{detail.details}</p>
          <div className="modal__how"><b>طريقة الاستخدام</b><p>{detail.howTo}</p></div>
          <ul className="modal__tags">{detail.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
          <div className="modal__actions">
            <b dir="ltr">{formatPrice(detail.price)}</b>
            <button className="btn btn--ink" onClick={() => { add(detail.id); setDetail(null); }}>أضف إلى الحقيبة <Plus size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

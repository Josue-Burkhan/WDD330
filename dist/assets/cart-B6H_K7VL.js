import{l as p,g as e,s as l,u as d}from"./utils-CW8xCWq6.js";p();function s(){const t=e("so-cart")||[],a=t.map(c=>f(c));document.querySelector(".product-list").innerHTML=a.join("");const r=document.querySelector(".cart-footer");if(t.length>0){r.classList.remove("hide");const c=t.reduce((u,o)=>u+o.FinalPrice*(o.quantity||1),0),i=document.querySelector(".cart-total");i.innerHTML=`Total: $${c.toFixed(2)}`}else r.classList.add("hide")}function f(t){return`<li class="cart-card divider" data-id="${t.Id}">
    <a href="/product/index.html?product=${t.Id}" class="cart-card__image">
      <img src="${t.Image}" alt="${t.Name}" />
    </a>
    <a href="/product/index.html?product=${t.Id}">
      <h2 class="card__name">${t.Name}</h2>
    </a>
    <p class="cart-card__color">${t.Colors[0].ColorName}</p>
    <div class="cart-card__controls">
      <button class="decrease">-</button>
      <span class="cart-card__quantity">${t.quantity||1}</span>
      <button class="increase">+</button>
    </div>
    <p class="cart-card__price">$${t.FinalPrice}</p>
    <button class="remove">Delete Product</button>
  </li>`}function n(t,a){let r=e("so-cart");r=r.map(c=>(c.Id===t&&(c.quantity=(c.quantity||1)+a,c.quantity<1&&(c.quantity=1)),c)),l("so-cart",r),s(),d()}function m(t){let a=e("so-cart");a=a.filter(r=>r.Id!==t),l("so-cart",a),s(),d()}document.querySelector(".product-list").addEventListener("click",t=>{var r;const a=(r=t.target.closest("li"))==null?void 0:r.dataset.id;a&&(t.target.classList.contains("increase")&&n(a,1),t.target.classList.contains("decrease")&&n(a,-1),t.target.classList.contains("remove")&&m(a))});s();

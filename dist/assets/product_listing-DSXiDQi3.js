import{l,a as c}from"./utils-CW8xCWq6.js";import{P as u}from"./ProductData-BbFgXDJ1.js";class m{constructor(t,e,s){this.category=t,this.dataSource=e,this.listElement=s}async init(t){const e=t?await t:await this.dataSource.getData(this.category);this.products=e,this.renderList(e);const s=new URLSearchParams(window.location.search).get("q");document.querySelector(".top-products-title").innerHTML=s?`Search Results for "${s}"`:`Top Products: ${this.category.charAt(0).toUpperCase()+this.category.slice(1)}`,document.getElementById("sortByName").addEventListener("click",()=>this.sortByName()),document.getElementById("sortByPrice").addEventListener("click",()=>this.sortByPrice())}sortByName(){this.products.sort((t,e)=>t.NameWithoutBrand.localeCompare(e.NameWithoutBrand)),this.renderList(this.products)}sortByPrice(){this.products.sort((t,e)=>t.FinalPrice-e.FinalPrice),this.renderList(this.products)}renderList(t){const e=t.map(s=>this.productCardTemplate(s));this.listElement.innerHTML=e.join("")}productCardTemplate(t){const e=t.SuggestedRetailPrice>t.FinalPrice;let s="",a="";if(e){const d=Math.round((t.SuggestedRetailPrice-t.FinalPrice)/t.SuggestedRetailPrice*100);s=`
        <span class="product-card__price--original">$${t.SuggestedRetailPrice.toFixed(2)}</span>
        <span class="product-card__price--final">$${t.FinalPrice.toFixed(2)}</span>
      `,a=`<p class="product-card__discount">${d}% off</p>`}else s=`<span class="product-card__price--final">$${t.FinalPrice.toFixed(2)}</span>`;return`<li class="product-card">
      <a href="/product/index.html?product=${t.Id}">
        <img
          src="${t.Images.PrimaryMedium}"
          alt="Image of ${t.NameWithoutBrand}"
        />
        <h3 class="card__brand">${t.Brand.Name}</h3>
        <h2 class="card__name">${t.NameWithoutBrand}</h2>
        <div class="product-card__price">
          ${s}
        </div>
        ${a}
      </a>
    </li>`}}l();const h=c("category"),r=c("q"),o=new u,g=document.querySelector(".product-list"),i=new m(h,o,g);r?(async()=>{const t=(await o.getAllProductsByCategory()).filter(e=>e.NameWithoutBrand.toLowerCase().includes(r.toLowerCase()));i.init(Promise.resolve(t))})():i.init();

import{g as c,s as o,u as s,l as a,a as e}from"./utils-CW8xCWq6.js";import{P as u}from"./ProductData-BbFgXDJ1.js";class n{constructor(t,d){this.productId=t,this.product={},this.dataSource=d}async init(){this.product=await this.dataSource.findProductById(this.productId),document.querySelector("main").innerHTML=this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))}addToCart(){let t=c("so-cart")||[];const d=t.findIndex(r=>r.Id===this.product.Id);d>-1?t[d].quantity+=1:(this.product.quantity=1,t.push(this.product)),o("so-cart",t),s()}renderProductDetails(){const t=this.product.SuggestedRetailPrice>this.product.FinalPrice;let d="";if(t){const r=Math.round((this.product.SuggestedRetailPrice-this.product.FinalPrice)/this.product.SuggestedRetailPrice*100),i=(this.product.SuggestedRetailPrice-this.product.FinalPrice).toFixed(2);d=`<p class="product-card__discount">${r}% off (save ${i})</p>`}return`<section class="product-detail">
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${this.product.Images.PrimaryLarge}"
        alt="${this.product.NameWithoutBrand}"
      />
      <p class="product-card__price">
        ${t?`<span class="product-card__price--original">$${this.product.SuggestedRetailPrice.toFixed(2)}</span>`:""}
        <span class="product-card__price--final">$${this.product.FinalPrice.toFixed(2)}</span>
      </p>
      ${d}
      <p class="product__color">${this.product.Colors[0].ColorName}</p>
      <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    </section>`}}a();const p=e("product"),l=new u("tents"),h=new n(p,l);h.init();

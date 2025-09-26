export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    const htmlItems = list.map((item) => this.productCardTemplate(item));
    this.listElement.innerHTML = htmlItems.join("");
  }

  productCardTemplate(product) {
    const isDiscounted = product.SuggestedRetailPrice > product.FinalPrice;
    let priceInfo = "";
    let discountBadge = "";

    if (isDiscounted) {
      const discountPercentage = Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) *
          100
      );
      priceInfo = `
        <span class="product-card__price--original">$${product.SuggestedRetailPrice.toFixed(2)}</span>
        <span class="product-card__price--final">$${product.FinalPrice.toFixed(2)}</span>
      `;
      discountBadge = `<p class="product-card__discount">${discountPercentage}% off</p>`;
    } else {
      priceInfo = `<span class="product-card__price--final">$${product.FinalPrice.toFixed(2)}</span>`;
    }

    return `<li class="product-card">
      <a href="/product/index.html?product=${product.Id}">
        <img
          src="${product.Image}"
          alt="Image of ${product.NameWithoutBrand}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <div class="product-card__price">
          ${priceInfo}
        </div>
        ${discountBadge}
      </a>
    </li>`;
  }
}
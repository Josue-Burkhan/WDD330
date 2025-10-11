export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init(promise) {
    const list = promise ? await promise : await this.dataSource.getData(this.category);
    this.products = list;
    this.renderList(list);
    const query = new URLSearchParams(window.location.search).get("q");
    document.querySelector(
      ".top-products-title"
    ).innerHTML = query ? `Search Results for "${query}"` : `Top Products: ${
      this.category.charAt(0).toUpperCase() + this.category.slice(1)
    }`;
    document.getElementById("sortByName").addEventListener("click", () => this.sortByName());
    document.getElementById("sortByPrice").addEventListener("click", () => this.sortByPrice());
  }

  sortByName() {
    this.products.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
    this.renderList(this.products);
  }

  sortByPrice() {
    this.products.sort((a, b) => a.FinalPrice - b.FinalPrice);
    this.renderList(this.products);
  }

  renderList(list) {
    const htmlItems = list.map((item) => this.productCardTemplate(item));
    this.listElement.innerHTML = htmlItems.join("");
  }

  productCardTemplate(product) {
    const isDiscounted =
      product.SuggestedRetailPrice > product.FinalPrice;
    let priceInfo = "";
    let discountBadge = "";

    if (isDiscounted) {
      const discountPercentage = Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) *
          100
      );
      priceInfo = `
        <span class="product-card__price--original">$${product.SuggestedRetailPrice.toFixed(
          2
        )}</span>
        <span class="product-card__price--final">$${product.FinalPrice.toFixed(
          2
        )}</span>
      `;
      discountBadge = `<p class="product-card__discount">${discountPercentage}% off</p>`;
    } else {
      priceInfo = `<span class="product-card__price--final">$${product.FinalPrice.toFixed(
        2
      )}</span>`;
    }

    return `<li class="product-card">
      <a href="/product/index.html?product=${product.Id}">
        <img
          src="${product.Images.PrimaryMedium}"
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
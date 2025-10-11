export default class Breadcrumbs {
    constructor(category, product, count) {
    this.category = category;
    this.product = product;
    this.count = count;
    this.path = window.location.pathname;
  }

  render() {
    const breadcrumbContainer = document.querySelector(".breadcrumb-container");
    if (!breadcrumbContainer) return;

    let breadcrumb = "";
    if (this.path.includes("product_listing")) {
      breadcrumb = `<a href="/">Home</a> &gt; <span>${this.category}</span>`;
    } else if (this.path.includes("product")) {
      breadcrumb = `<a href="/">Home</a> &gt; <a href="/product_listing/index.html?category=${this.category}">${this.category}</a> &gt; <span>${this.product.Name}</span>`;
    }

    if (this.path === "/" || this.path === "/index.html") {
        breadcrumb = "";
    }

    breadcrumbContainer.innerHTML = breadcrumb;
  }
}

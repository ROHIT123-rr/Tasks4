const products = [
  { id: 1, name: "Wireless Earbuds", category: "Tech", price: 1499, rating: 4.7, icon: "🎧", description: "Compact everyday audio with a comfortable fit." },
  { id: 2, name: "Desk Lamp", category: "Home", price: 899, rating: 4.5, icon: "💡", description: "A clean, adjustable lamp for your study space." },
  { id: 3, name: "Canvas Tote", category: "Accessories", price: 399, rating: 4.3, icon: "👜", description: "A reusable carry-all for daily essentials." },
  { id: 4, name: "Bluetooth Speaker", category: "Tech", price: 1999, rating: 4.8, icon: "🔊", description: "Portable sound for your desk or weekend." },
  { id: 5, name: "Ceramic Mug", category: "Home", price: 299, rating: 4.2, icon: "☕", description: "A simple ceramic mug for your favorite drink." },
  { id: 6, name: "Everyday Watch", category: "Accessories", price: 1299, rating: 4.6, icon: "⌚", description: "A versatile design for casual everyday wear." }
];

const categoryFilter = document.getElementById("categoryFilter");
const maxPrice = document.getElementById("maxPrice");
const sortBy = document.getElementById("sortBy");
const productGrid = document.getElementById("productGrid");
const resultCount = document.getElementById("resultCount");

function renderProducts() {
  const category = categoryFilter.value;
  const priceLimit = maxPrice.value === "all" ? Infinity : Number(maxPrice.value);
  const sort = sortBy.value;

  let visible = products.filter((product) =>
    (category === "all" || product.category === category) && product.price <= priceLimit
  );

  if (sort === "price-low") visible.sort((a, b) => a.price - b.price);
  if (sort === "price-high") visible.sort((a, b) => b.price - a.price);
  if (sort === "rating") visible.sort((a, b) => b.rating - a.rating);

  productGrid.innerHTML = "";
  resultCount.textContent = `Showing ${visible.length} of ${products.length} products`;

  if (visible.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "No products match these filters. Try changing your selection.";
    productGrid.appendChild(empty);
    return;
  }

  visible.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    const visual = document.createElement("div");
    visual.className = "product-visual";
    visual.setAttribute("aria-hidden", "true");
    visual.textContent = product.icon;

    const info = document.createElement("div");
    info.className = "product-info";
    const categoryText = document.createElement("span");
    categoryText.className = "category";
    categoryText.textContent = product.category;
    const name = document.createElement("h2");
    name.textContent = product.name;
    const description = document.createElement("p");
    description.className = "description";
    description.textContent = product.description;
    const bottom = document.createElement("div");
    bottom.className = "product-bottom";
    const price = document.createElement("span");
    price.className = "price";
    price.textContent = `₹${product.price.toLocaleString("en-IN")}`;
    const rating = document.createElement("span");
    rating.className = "rating";
    rating.textContent = `★ ${product.rating.toFixed(1)}`;
    bottom.append(price, rating);
    info.append(categoryText, name, description, bottom);
    card.append(visual, info);
    productGrid.appendChild(card);
  });
}

[categoryFilter, maxPrice, sortBy].forEach((control) => {
  control.addEventListener("change", renderProducts);
});
renderProducts();

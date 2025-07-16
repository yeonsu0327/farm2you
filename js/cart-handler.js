document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.querySelector(".cart-btn");
  if (!cartBtn) return;

  cartBtn.addEventListener("click", () => {
    const product = {
      id: cartBtn.dataset.id,
      name: cartBtn.dataset.name,
      image: cartBtn.dataset.image,
      quantity: 1,
      price: parseInt(cartBtn.dataset.price),
      link: cartBtn.dataset.link,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "../cart.html";
  });
});

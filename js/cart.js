document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".cart-section");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  section.innerHTML = "<h1>장바구니</h1>";

  if (cart.length === 0) {
    section.innerHTML +=
      "<p style='text-align:center;'>담긴 상품이 없습니다.</p>";
    return;
  }

  const list = document.createElement("div");
  list.classList.add("cart-list");

  let total = 0;

  cart.forEach((item, index) => {
    if (typeof item.price !== "number") item.price = 0;
    total += item.price * item.quantity;

    const card = document.createElement("div");
    card.classList.add("cart-card");

    // 카드 전체 클릭 시 상세페이지 이동
    card.addEventListener("click", (e) => {
      if (!e.target.closest(".qty-btn") && !e.target.closest(".delete-btn")) {
        window.location.href = item.link || "#";
      }
    });

    card.innerHTML = `
        <button class="delete-btn" data-index="${index}">
          <img src="./image/icon-close.svg" alt="삭제" />
        </button>
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p class="price">${item.price.toLocaleString()}원</p>
          <div class="qty-controls">
            <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
            <span class="qty-count">${item.quantity}</span>
            <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
          </div>
        </div>
      `;
    list.appendChild(card);
  });

  section.appendChild(list);

  const totalEl = document.createElement("div");
  totalEl.className = "cart-total";
  totalEl.innerText = `총합계 : ${total.toLocaleString()}원`;
  section.appendChild(totalEl);

  // 수량 조절 및 삭제
  list.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    const action = e.target.dataset.action;

    if (action === "increase") {
      cart[index].quantity++;
    } else if (action === "decrease" && cart[index].quantity > 1) {
      cart[index].quantity--;
    } else if (e.target.closest(".delete-btn")) {
      cart.splice(index, 1);
    } else {
      return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  });
});

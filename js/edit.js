document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelector(".product-cards");
  const deleteBtn = document.querySelector(".delete-btn");
  const editBtn = document.querySelector(".edit-btn");
  const emptyMessage = document.getElementById("empty-message");

  const editForm = document.getElementById("edit-form");
  const updateBtn = editForm.querySelector(".update-btn");

  const nameInput = document.getElementById("edit-name");
  const priceInput = document.getElementById("edit-price");
  const regionInput = document.getElementById("edit-region");
  const dateInput = document.getElementById("edit-date");
  const weightInput = document.getElementById("edit-weight");
  const imageInput = document.getElementById("edit-image");
  const descInput = document.getElementById("edit-description");

  const categoryButtons = [
    document.getElementById("cat-veg"),
    document.getElementById("cat-fruit"),
    document.getElementById("cat-grain"),
  ];

  let selectedIndex = null;
  let products = JSON.parse(localStorage.getItem("products")) || [];

  if (products.length === 0) {
    const defaultProducts = [
      {
        id: 1,
        name: "사과 350g",
        price: "2000",
        region: "경상북도 의성군",
        date: "2025-05-15",
        weight: "350g",
        description: "신선하고 달콤한 사과입니다.",
        image: "./image/apple.svg",
        category: "과일",
      },
      {
        id: 2,
        name: "당근 500g",
        price: "1800",
        region: "경상북도 의성군",
        date: "2025-05-15",
        weight: "500g",
        description: "건강하고 맛있는 당근입니다.",
        image: "./image/carrot.svg",
        category: "채소",
      },
      {
        id: 3,
        name: "토마토 500g",
        price: "2500",
        region: "경상북도 의성군",
        date: "2025-05-15",
        weight: "500g",
        description: "신선하고 달콤한 토마토입니다",
        image: "./image/tomato.svg",
        category: "채소",
      },
    ];
    products = defaultProducts;
    localStorage.setItem("products", JSON.stringify(products));
  }

  function renderCards() {
    cards.innerHTML = "";
    products.forEach((p, idx) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `<img src="${p.image}" alt="${p.name}" /><h4>${
        p.name
      }</h4><p>${Number(p.price).toLocaleString()}원</p>
      `;
      card.addEventListener("click", () => {
        document
          .querySelectorAll(".product-card")
          .forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
        selectedIndex = idx;
      });
      cards.appendChild(card);
    });
  }

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  deleteBtn.addEventListener("click", () => {
    if (selectedIndex === null) return alert("삭제할 상품을 선택하세요.");
    if (confirm("정말 삭제하시겠습니까?")) {
      products.splice(selectedIndex, 1);
      localStorage.setItem("products", JSON.stringify(products));
      selectedIndex = null;
      renderCards();
    }
  });

  editBtn.addEventListener("click", () => {
    if (selectedIndex === null) return alert("수정할 상품을 선택하세요.");
    const p = products[selectedIndex];
    nameInput.value = p.name;
    priceInput.value = p.price;
    regionInput.value = p.region;
    dateInput.value = p.date;
    weightInput.value = p.weight;
    descInput.value = p.description;
    categoryButtons.forEach((b) =>
      b.classList.toggle("active", b.textContent === p.category)
    );
    editForm.style.display = "block";
  });

  updateBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const newData = {
      id: products[selectedIndex].id,
      name: nameInput.value,
      price: priceInput.value,
      region: regionInput.value,
      date: dateInput.value,
      weight: weightInput.value,
      description: descInput.value,
      category: categoryButtons.find((b) => b.classList.contains("active"))
        .textContent,
      image: products[selectedIndex].image,
    };

    const file = imageInput.files[0];
    if (file) newData.image = await getBase64(file);

    products[selectedIndex] = newData;
    localStorage.setItem("products", JSON.stringify(products));
    alert("수정 완료되었습니다");
    location.reload();
  });

  renderCards();
});
const fileInput = document.getElementById("edit-image");
const fakeInput = document.getElementById("image-filename");

fileInput.addEventListener("change", () => {
  const fileName = fileInput.files[0]?.name || "선택된 파일 없음";
  fakeInput.value = fileName;
});

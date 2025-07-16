document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const manageSection = document.getElementById("manage-section");
  const productCardsContainer = document.querySelector(".product-cards");
  const deleteBtn = document.querySelector(".delete-btn");
  const editBtn = document.querySelector(".edit-btn");
  const formInputs = registerForm.querySelectorAll(
    "input[type='text'], input[type='date']"
  );
  const fileInput = registerForm.querySelector("input[type='file']");
  const categoryButtons = document.querySelectorAll(".category-select button");
  const submitBtn = registerForm.querySelector(".submit-btn");

  let selectedProductIndex = null;
  let editingImage = null;

  let products = [
    {
      id: 1,
      name: "사과 350g",
      price: "2,000원",
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
      price: "1,800원",
      region: "경상북도 의성군",
      date: "2025-05-15",
      weight: "500g",
      description: "건강하고 맛있는 당근입니다.",
      image: "./image/carrot.svg",
      category: "채소",
    },
    {
      id: 3,
      name: "토마토 350g",
      price: "2,500원",
      region: "경상북도 의성군",
      date: "2025-05-15",
      weight: "350g",
      description: "신선하고 달콤한 토마토입니다.",
      image: "./image/tomato.svg",
      category: "채소",
    },
  ];

  document.getElementById("show-register").addEventListener("click", () => {
    registerForm.classList.remove("hidden");
    manageSection.classList.add("hidden");
    setActiveTab("show-register");
  });

  document.getElementById("show-manage").addEventListener("click", () => {
    renderProducts();
    registerForm.classList.add("hidden");
    manageSection.classList.remove("hidden");
    setActiveTab("show-manage");
  });

  function setActiveTab(id) {
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
  }

  function renderProducts() {
    productCardsContainer.innerHTML = "";
    products.forEach((p, idx) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
            <img src="${p.image}" alt="${p.name}" />
            <h4>${p.name}</h4>
            <p>${p.price}</p>
          `;
      card.addEventListener("click", () => {
        selectedProductIndex = idx;
        document
          .querySelectorAll(".product-card")
          .forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
      });
      productCardsContainer.appendChild(card);
    });
  }

  editBtn.addEventListener("click", () => {
    if (selectedProductIndex === null)
      return alert("수정할 상품을 선택하세요.");
    const product = products[selectedProductIndex];

    formInputs[0].value = product.name;
    formInputs[1].value = product.price;
    formInputs[2].value = product.region;
    formInputs[3].value = product.date;
    formInputs[4].value = product.weight;
    formInputs[5].value = product.description;
    editingImage = product.image;
    fileInput.value = "";

    categoryButtons.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.textContent === product.category) btn.classList.add("active");
    });

    registerForm.classList.remove("hidden");
    manageSection.classList.add("hidden");
    setActiveTab("show-register");
    submitBtn.textContent = "수정 완료";
  });

  deleteBtn.addEventListener("click", () => {
    if (selectedProductIndex === null)
      return alert("삭제할 상품을 선택하세요.");
    if (confirm("정말 삭제하시겠습니까?")) {
      products.splice(selectedProductIndex, 1);
      selectedProductIndex = null;
      renderProducts();
    }
  });

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = formInputs[0].value.trim();
    const price = formInputs[1].value.trim();
    const region = formInputs[2].value.trim();
    const date = formInputs[3].value.trim();
    const weight = formInputs[4].value.trim();
    const description = formInputs[5].value.trim();
    const category = [...categoryButtons].find((b) =>
      b.classList.contains("active")
    )?.textContent;

    if (
      !name ||
      !price ||
      !region ||
      !date ||
      !weight ||
      !description ||
      !category
    ) {
      alert("모든 항목을 입력해야 등록 또는 수정이 가능합니다.");
      return;
    }

    const imageFile = fileInput.files[0];
    const image = imageFile
      ? URL.createObjectURL(imageFile)
      : editingImage || "./image/default.svg";

    const newProduct = {
      id: Date.now(),
      name,
      price,
      region,
      date,
      weight,
      description,
      image,
      category,
    };

    if (
      submitBtn.textContent === "수정 완료" &&
      selectedProductIndex !== null
    ) {
      products[selectedProductIndex] = newProduct;
      selectedProductIndex = null;
      editingImage = null;
      alert("수정이 완료되었습니다.");
    } else {
      products.unshift(newProduct);
      alert("등록이 완료되었습니다.");
    }

    registerForm.reset();
    fileInput.value = "";
    submitBtn.textContent = "등록하기";

    registerForm.classList.add("hidden");
    manageSection.classList.remove("hidden");
    setActiveTab("show-manage");
    renderProducts();
  });

  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
});

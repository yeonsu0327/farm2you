document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector("#register-form form");

  const nameInput = document.getElementById("edit-name");
  const priceInput = document.getElementById("edit-price");
  const regionInput = document.getElementById("edit-region");
  const dateInput = document.getElementById("edit-date");
  const weightInput = document.getElementById("edit-weight");
  const descInput = document.getElementById("edit-description");
  const fileInput = document.getElementById("edit-image");
  const fakeInput = document.getElementById("image-filename");

  const categoryButtons = document.querySelectorAll(".category-select button");
  const submitBtn = registerForm.querySelector(".update-btn");

  let products = JSON.parse(localStorage.getItem("products")) || [];

  // 카테고리 선택 처리
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const price = priceInput.value.trim();
    const region = regionInput.value.trim();
    const date = dateInput.value.trim();
    const weight = weightInput.value.trim();
    const description = descInput.value.trim();
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
      alert("모든 항목을 입력해야 등록이 가능합니다.");
      return;
    }

    const imageFile = fileInput.files[0];

    if (!imageFile) {
      alert("이미지를 업로드해야 합니다.");
      return;
    }

    const base64Image = await getBase64(imageFile);

    const newProduct = {
      id: Date.now(),
      name,
      price,
      region,
      date,
      weight,
      description,
      image: base64Image,
      category,
    };

    products.unshift(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    alert("등록이 완료되었습니다.");
    registerForm.reset();
    fileInput.value = "";
    fakeInput.value = "";
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    submitBtn.textContent = "등록하기";
    window.location.href = "edit.html";
  });

  fileInput.addEventListener("change", () => {
    const fileName = fileInput.files[0]?.name || "선택된 파일 없음";
    fakeInput.value = fileName;
  });
});

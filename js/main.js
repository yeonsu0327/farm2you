document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const overlay = document.getElementById("overlay");
  const menuClose = document.getElementById("menu-close");
  const navLinks = hamburgerMenu?.querySelectorAll("a");

  // 햄버거 메뉴 열기
  menuToggle?.addEventListener("click", () => {
    hamburgerMenu.classList.add("open");
    overlay.classList.add("show");
  });

  // 메뉴 닫기
  menuClose?.addEventListener("click", () => {
    hamburgerMenu.classList.remove("open");
    overlay.classList.remove("show");
  });

  overlay?.addEventListener("click", () => {
    hamburgerMenu.classList.remove("open");
    overlay.classList.remove("show");
  });

  navLinks?.forEach((link) => {
    link.addEventListener("click", () => {
      hamburgerMenu.classList.remove("open");
      overlay.classList.remove("show");
    });
  });

  // 로그아웃
  const signoutBtn = document.querySelector(".signout-btn");
  signoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("accessToken");
    alert("로그아웃되었습니다.");
    window.location.href = "login.html";
  });

  // 필터링
  const filterButtons = document.querySelectorAll(".btn-filter");
  const productCards = document.querySelectorAll(".product-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      productCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 배경 이미지 슬라이드 (hero-section이 있는 경우만 실행)
  const heroSection = document.getElementById("hero-section");
  const backgrounds = [
    "url('./image/background1.jpg')",
    "url('./image/background2.jpg')",
    "url('./image/background3.jpg')",
    "url('./image/background4.jpg')",
    "url('./image/background5.jpg')",
  ];
  let bgIndex = 0;

  if (heroSection) {
    function changeHeroBackground() {
      heroSection.style.backgroundImage = `
          linear-gradient(to right, #ffead8 0%, #ffead8 30%, #ffead800 100%),
          ${backgrounds[bgIndex]}
        `;
      bgIndex = (bgIndex + 1) % backgrounds.length;
    }
    setInterval(changeHeroBackground, 8000);
  }

  // 로그인 체크 (접근 보호)
  const protectedSelectors = [
    ".header-logo a",
    ".header-icon a",
    "#hamburger-menu a",
    ".footer a",
  ];

  protectedSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      if (el.classList.contains("signout-btn")) return;
      el.addEventListener("click", (e) => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          e.preventDefault();
          alert("로그인 후 이용 가능합니다.");
        }
      });
    });
  });
});

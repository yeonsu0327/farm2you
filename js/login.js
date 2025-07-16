// 로그인/회원가입 토글
function showLogin() {
  document.getElementById("login-box").style.display = "flex";
  document.getElementById("signup-box").style.display = "none";
  document.getElementById("login-btn").classList.add("active");
  document.getElementById("signup-btn").classList.remove("active");
}

function showSignup() {
  document.getElementById("login-box").style.display = "none";
  document.getElementById("signup-box").style.display = "flex";
  document.getElementById("signup-btn").classList.add("active");
  document.getElementById("login-btn").classList.remove("active");
}

// 로그인 동작
function handleLogin(event) {
  event.preventDefault();
  localStorage.setItem("accessToken", "dummy_token");
  alert("로그인 성공! 이제 FARM2YOU이 가능합니다.");
  window.location.href = "index.html"; // 홈화면 이동
}

// 회원가입 동작
function handleSignup(event) {
  event.preventDefault();
  alert("회원가입이 완료되었습니다. 로그인해주세요.");
  showLogin(); // 로그인 창 보여주기
}

// 로그아웃
function handleLogout() {
  localStorage.removeItem("accessToken");
  alert("로그아웃되었습니다.");
  window.location.href = "login.html";
}

// 로그인 여부 체크
function requireLogin() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    alert("로그인 후 이용 가능합니다.");
    return false;
  }
  return true;
}

// 햄버거 메뉴 열기/닫기
const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");

menuToggle?.addEventListener("click", () => {
  document.getElementById("hamburger-menu").classList.add("open");
  document.getElementById("overlay").classList.add("show");
});

menuClose?.addEventListener("click", () => {
  document.getElementById("hamburger-menu").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
});

// 로그인 필요한 링크만 막기 (login.html은 예외)
const protectedSelectors = [
  ".header-logo a",
  ".header-icon a",
  "#hamburger-menu a",
  ".footer a",
];

protectedSelectors.forEach((selector) => {
  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener("click", function (e) {
      const href = el.getAttribute("href");
      if (href && href.includes("login.html")) return;
      if (!requireLogin()) e.preventDefault();
    });
  });
});

// 로그인/회원가입 폼 submit 이벤트 연결
window.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#login-box form")
    ?.addEventListener("submit", handleLogin);
  document
    .querySelector("#signup-box form")
    ?.addEventListener("submit", handleSignup);

  const token = localStorage.getItem("accessToken");
  const loginBtn = document.getElementById("header-login");
  const logoutBtn = document.getElementById("header-logout");
  const signoutBtn = document.querySelector(".signout-btn");

  if (token) {
    loginBtn?.classList.add("hidden");
    logoutBtn?.classList.remove("hidden");
    if (signoutBtn) {
      signoutBtn.textContent = "SIGN OUT";
      signoutBtn.addEventListener("click", handleLogout);
    }
  } else {
    loginBtn?.classList.remove("hidden");
    logoutBtn?.classList.add("hidden");
    if (signoutBtn) {
      signoutBtn.textContent = "LOGIN";
      signoutBtn.addEventListener("click", () => {
        window.location.href = "login.html";
      });
    }
  }
});

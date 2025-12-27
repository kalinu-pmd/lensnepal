// auth.js

export function validateLogin(email, password) {
  if (!email || !password) {
    return "All fields are required";
  }

  if (!email.includes("@")) {
    return "Invalid email address";
  }

  return null;
}

export function validateRegister(name, email, password) {
  if (!name || !email || !password) {
    return "All fields are required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
}
function isUserLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
}
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const error = validateLogin(email, password);

  if (error) {
    document.getElementById("login-error").textContent = error;
    return;
  }

  // ✅ STEP 3.2 (login success)
  localStorage.setItem("isLoggedIn", "true");

  window.location.href = "checkout.html";
}

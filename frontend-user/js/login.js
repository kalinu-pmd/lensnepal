const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5050/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    // ✅ Save token & user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // 🔁 Redirect back if user was adding product
    const redirectTo = localStorage.getItem("redirectAfterLogin");
    if (redirectTo) {
      localStorage.removeItem("redirectAfterLogin");
      window.location.href = redirectTo;
    } else {
      window.location.href = "products.html";
    }
  } catch (err) {
    message.textContent = err.message;
  }
});

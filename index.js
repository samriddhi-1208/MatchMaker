async function login() {
  const usernameField = document.getElementById("username").value;
  const passwordField = document.getElementById("password").value;
  const errorContainer = document.getElementById("error");

  errorContainer.innerText = ""; // Clear previous error labels

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: usernameField, password: passwordField })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Authentication failed.");
    }

    // Store security token validation context parameters
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("customer", JSON.stringify(data.user));

    // Proceed safely to your dashboard 
    window.location.href = "dashboard.html";

  } catch (err) {
    errorContainer.innerText = err.message;
    console.error("Authentication Exception Encountered:", err);
  }
}
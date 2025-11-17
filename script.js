const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const generateBtn = document.getElementById("generateBtn");
const passwordDisplay = document.getElementById("passwordDisplay");
const copyBtn = document.getElementById("copyBtn");
const themeToggle = document.getElementById("themeToggle");
const strengthStatus = document.getElementById("strengthStatus");

// Update length label
lengthSlider.oninput = () => {
  lengthValue.textContent = lengthSlider.value;
};

// Generate password
generateBtn.onclick = () => {
  const length = lengthSlider.value;

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "0123456789";
  const syms = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let chars = "";
  if (document.getElementById("lowercase").checked) chars += lower;
  if (document.getElementById("uppercase").checked) chars += upper;
  if (document.getElementById("numbers").checked) chars += nums;
  if (document.getElementById("symbols").checked) chars += syms;

  if (chars === "") {
    passwordDisplay.textContent = "Select at least 1 option!";
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  passwordDisplay.textContent = password;
  updateStrength(password);
};

// Dark / Light mode
themeToggle.onclick = () => {
  document.body.dataset.theme =
    document.body.dataset.theme === "light" ? "dark" : "light";

  themeToggle.textContent =
    document.body.dataset.theme === "light" ? "🌙" : "☀️";
};

// Strength checker
function updateStrength(pwd) {
  let score = 0;

  if (/[a-z]/.test(pwd)) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;
  if (pwd.length >= 14) score++;

  const levels = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
  strengthStatus.textContent = levels[score];
}

// Password Copy Handler (using the new method)
document.addEventListener("click", (e) => {
  if (e.target.id === "copyBtn") {

    const pwd = passwordDisplay.textContent.trim();

    if (!pwd || pwd === "Click Generate") {
      alert("No password to copy.");
      return;
    }

    // Fallback works everywhere (even file://)
    let temp = document.createElement("textarea");
    temp.value = pwd;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();

    copyBtn.textContent = "Copied!";
    setTimeout(() => copyBtn.textContent = "Copy", 1500);
  }
});
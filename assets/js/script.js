// ------------------------------
// Scroll Behavior for Navbar
// ------------------------------
let prevScrollPos = window.pageYOffset;

window.addEventListener("scroll", function () {
  const currentScrollPos = window.pageYOffset;
  const navbar = document.getElementById("navbar");

  if (prevScrollPos > currentScrollPos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-80px";
  }
  prevScrollPos = currentScrollPos;
});

// ------------------------------
// Draggable Floating Chat Button
// ------------------------------
const button = document.getElementById("chatbot-drag-button");

if (button) {
  let offsetX, offsetY, isDragging = false;

  button.addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - button.getBoundingClientRect().left;
    offsetY = e.clientY - button.getBoundingClientRect().top;
    button.style.transition = "none";

    // Important: clear right/bottom so left/top works during drag
    button.style.right = "auto";
    button.style.bottom = "auto";
  });

  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      button.style.left = `${x}px`;
      button.style.top = `${y}px`;
    }
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
  });
}

// ------------------------------
// Theme Toggle (Dark / Light)
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.createElement("button");
  themeToggle.innerText = "🌓"; // Optional: use 🌙 / ☀️ icons
  themeToggle.id = "theme-toggle";
  themeToggle.title = "Toggle Dark / Light Mode";

  Object.assign(themeToggle.style, {
    position: "fixed",
    top: "15px",
    right: "15px",
    padding: "8px 12px",
    borderRadius: "20px",
    backgroundColor: "#007acc",
    color: "#fff",
    border: "none",
    zIndex: 9999,
    cursor: "pointer"
  });

  document.body.appendChild(themeToggle);

  // Apply saved theme on load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
});


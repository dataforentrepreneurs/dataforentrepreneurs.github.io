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

  // Touch support
  button.addEventListener("touchstart", startTouchDrag);
  button.addEventListener("touchmove", dragButtonTouch);
}

function startTouchDrag(e) {
  const touch = e.touches[0];
  touchStartX = touch.clientX - e.target.offsetLeft;
  touchStartY = touch.clientY - e.target.offsetTop;
}

function dragButtonTouch(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const button = document.getElementById('chatbot-drag-button');
  button.style.left = `${touch.clientX - touchStartX}px`;
  button.style.top = `${touch.clientY - touchStartY}px`;
}

// ------------------------------
// Theme Toggle (Dark / Light)
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.createElement("button");
  themeToggle.innerText = "🌓";
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

  // Highlight active nav item
  const currentPath = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-item a").forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// ------------------------------
// YouTube Player API and Chapter Card Clicks
// ------------------------------
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('chatbot-video', {
    height: '400',
    width: '100%',
    videoId: 'NofI0hwgRxc',
    playerVars: {
      enablejsapi: 1,
      origin: window.location.origin
    },
    events: {
      onReady: () => {
        console.log("✅ YouTube Player Ready");

        const chapterCards = document.querySelectorAll('.chapter-card');
        chapterCards.forEach(card => {
          card.addEventListener('click', function () {
            const time = parseInt(this.getAttribute('data-time'), 10);
            if (player && typeof player.seekTo === 'function') {
              player.seekTo(time, true);
              player.playVideo();

              const video = document.getElementById("chatbot-video");
              if (video) {
                const yOffset = -80;
                const y = video.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }
          });
        });
      }
    }
  });
}

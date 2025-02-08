// Track the previous scroll position
let prevScrollPos = window.pageYOffset;

window.addEventListener("scroll", function() {
  const currentScrollPos = window.pageYOffset;
  const navbar = document.getElementById("navbar");

  // If scrolling upward, show the navbar; if scrolling downward, hide it
  if (prevScrollPos > currentScrollPos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-80px"; // Adjust this value if your navbar height changes
  }
  prevScrollPos = currentScrollPos;
});

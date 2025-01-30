function heroBg() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    document.querySelector(".hero").style.backgroundImage = "url('./img/hero/bg--mobile.jpg')";
  }
}

document.addEventListener("DOMContentLoaded", heroBg);
window.addEventListener("resize", heroBg);

export default heroBg;

fetch("components/navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;

    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("navLinks");
    const themeBtn = document.getElementById("toggle-theme");

    /* =========================
       MENU MOVIL
    ========================== */

    if (toggle && nav) {
      toggle.addEventListener("click", (e) => {
        e.stopPropagation(); // evita que el click cierre inmediatamente
        nav.classList.toggle("show");
      });

      // cerrar menú si se hace click fuera
      document.addEventListener("click", (event) => {
        const navbar = document.querySelector(".navbar");

        if (!navbar.contains(event.target)) {
          nav.classList.remove("show");
        }
      });
      const links = nav.querySelectorAll("a");
      links.forEach((link) => {
        link.addEventListener("click", () => {
          nav.classList.remove("show");
        });
      });
    }

    /* =========================
       DARK MODE
    ========================== */

    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
      });
    }
  });

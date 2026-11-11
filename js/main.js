// Shared header and footer for all five pages.
const header = document.getElementById("site-header");
const footer = document.getElementById("site-footer");

if (header) {
  const currentPage = location.pathname.split("/").pop() || "index.html";
  const links = [
    ["index.html", "Home"],
    ["about.html", "About"],
    ["services.html", "Services"],
    ["projects.html", "Projects"],
    ["contact.html", "Contact"]
  ];
  header.innerHTML = `
    <nav class="navbar navbar-expand-lg sticky-top">
      <div class="container">
        <a class="navbar-brand" href="index.html">MY OWN DECOR<span class="brand-mark">.</span></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav ms-auto align-items-lg-center">
            ${links.map(([url, label]) => `<li class="nav-item"><a class="nav-link ${currentPage === url ? "active" : ""}" href="${url}">${label}</a></li>`).join("")}
          </ul>
        </div>
      </div>
    </nav>`;
}

if (footer) {
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-5 footer-col">
            <a class="footer-brand" href="index.html">MY OWN DECOR.</a>
            <p class="mt-3 mb-0">Thoughtful spaces, beautifully made.<br>Interior design studio · Kerala, India</p>
          </div>
          <div class="col-6 col-lg-3 footer-col">
            <div class="footer-heading">EXPLORE</div>
            <div class="footer-links"><a href="about.html">About us</a><a href="services.html">Services</a><a href="projects.html">Projects</a><a href="contact.html">Contact</a></div>
          </div>
          <div class="col-6 col-lg-4 footer-col">
            <div class="footer-heading">START A CONVERSATION</div>
            <div class="footer-links"><a href="mailto:hello@myowndecor.example">hello@myowndecor.example</a><a href="contact.html">Request a consultation ↗</a></div>
          </div>
        </div>
        <div class="footer-bottom d-flex flex-wrap justify-content-between gap-2"><span>© <span id="year"></span> My Own Decor. All rights reserved.</span><span>Designed with intention.</span></div>
      </div>
    </footer>`;
  document.getElementById("year").textContent = new Date().getFullYear();
}

// Portfolio category filters.
document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project-item").forEach(project => {
      project.classList.toggle("d-none", filter !== "all" && project.dataset.category !== filter);
    });
  });
});

// Demo contact form: creates an email draft in the visitor's default mail app.
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const subject = encodeURIComponent(`Website enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone") || "Not provided"}\nService: ${data.get("service")}\n\nProject details:\n${data.get("message")}`
    );
    // Replace this address with the business owner's real email.
    window.location.href = `mailto:hello@myowndecor.example?subject=${subject}&body=${body}`;
  });
}

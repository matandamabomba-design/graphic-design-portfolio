(() => {
  "use strict";
  const data = window.SITE_DATA;
  const content = document.getElementById("case-content");
  const notFound = document.getElementById("case-not-found");
  if (!data || !content || !notFound) return;

  const projectId = new URLSearchParams(window.location.search).get("id");
  const project = data.projects.find((item) => item.id === projectId && item.visible);
  if (!project) {
    notFound.hidden = false;
    content.hidden = true;
    return;
  }

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
  const hasCaseStudy = Boolean(project.caseStudy);
  const caseStudy = project.caseStudy || { role: "", brief: "", approach: [], deliverables: [], gallery: [] };
  const caseProjects = data.projects.filter((item) => item.visible && item.caseStudy);
  const nextProject = caseProjects[(caseProjects.indexOf(project) + 1) % caseProjects.length];
  const imageHtml = (src, alt, className) => `<div class="image-placeholder ${className}" data-title="${escapeHtml(alt)}"><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async"></div>`;

  content.innerHTML = `
    <header class="project-heading">
      <p class="eyebrow">${escapeHtml(project.category)}${project.year ? ` <span aria-hidden="true">·</span> ${escapeHtml(project.year)}` : ""}</p>
      <h1>${escapeHtml(project.title)}</h1>
      <p class="project-meta">${caseStudy.role ? `<span>${escapeHtml(caseStudy.role)}</span>` : ""}${project.year ? `<span>${escapeHtml(project.year)}</span>` : ""}</p>
    </header>
    <figure class="project-hero-image">${imageHtml(project.image, project.title, `case-image${project.category === "Logo & Branding" ? " image-fit-logo" : ""}`)}</figure>
    ${hasCaseStudy ? `<div class="project-story">
      <section><p class="eyebrow">01 / The brief</p><h2>The brief</h2><p>${escapeHtml(caseStudy.brief)}</p></section>
      <section><p class="eyebrow">02 / My approach</p><h2>My approach</h2>${(caseStudy.approach || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section>
      <section><p class="eyebrow">03 / The outcome</p><h2>Deliverables</h2><ul class="deliverables-list">${(caseStudy.deliverables || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>
    </div>` : `<section class="project-story case-note"><p class="eyebrow">Project overview</p><h2>${escapeHtml(project.title)}</h2><p>${escapeHtml(project.description)}</p><p>A full case study has not been added yet.</p><a class="text-link" href="index.html#work">Back to selected work <span aria-hidden="true">↗</span></a></section>`}
    ${caseStudy.gallery && caseStudy.gallery.length ? `<section class="project-gallery-section" aria-labelledby="gallery-title"><p class="eyebrow">More from the project</p><h2 id="gallery-title">In the series<span class="accent-period">.</span></h2><div class="project-gallery">${caseStudy.gallery.map((image, index) => `<button class="gallery-image-button" type="button" data-image-index="${index}" aria-label="Open project image ${index + 1}">${imageHtml(image, `${project.title}, additional image ${index + 1}`, `gallery-image${project.category === "Logo & Branding" ? " image-fit-logo" : ""}`)}</button>`).join("")}</div></section>` : ""}
    ${hasCaseStudy && nextProject ? `<a class="next-project" href="project.html?id=${encodeURIComponent(nextProject.id)}"><span><span class="eyebrow">Next case study</span><strong>${escapeHtml(nextProject.title)}</strong></span><span class="next-arrow" aria-hidden="true">↗</span></a>` : ""}
  `;
  document.title = `${project.title} — MatandaDesign case study`;
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.content = project.description;
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = `${data.siteUrl}project.html?id=${encodeURIComponent(project.id)}`;

  const lightbox = document.getElementById("lightbox");
  const galleryImages = [project.image, ...(caseStudy.gallery || [])];
  let activeImageIndex = 0;
  let focusReturn = null;
  const renderImage = () => {
    const imageWrap = lightbox.querySelector(".lightbox-image-wrap");
    imageWrap.replaceChildren();
    const wrapper = document.createElement("div");
    wrapper.className = `image-placeholder${project.category === "Logo & Branding" ? " image-fit-logo" : ""}`;
    wrapper.dataset.title = project.title;
    const image = document.createElement("img");
    image.src = galleryImages[activeImageIndex];
    image.alt = `${project.title}, image ${activeImageIndex + 1}`;
    image.decoding = "async";
    image.addEventListener("error", () => {
      image.remove();
      wrapper.classList.add("is-placeholder");
    }, { once: true });
    wrapper.append(image);
    imageWrap.append(wrapper);
    lightbox.querySelector(".lightbox-category").textContent = project.category;
    lightbox.querySelector(".lightbox-title").textContent = project.title;
    lightbox.querySelector(".lightbox-description").textContent = `${activeImageIndex + 1} of ${galleryImages.length}`;
    lightbox.querySelector(".lightbox-prev").hidden = galleryImages.length < 2;
    lightbox.querySelector(".lightbox-next").hidden = galleryImages.length < 2;
  };
  const close = () => {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    if (focusReturn) focusReturn.focus();
  };
  const step = (amount) => {
    activeImageIndex = (activeImageIndex + amount + galleryImages.length) % galleryImages.length;
    renderImage();
  };
  content.querySelectorAll(".image-placeholder").forEach((wrapper) => {
    const image = wrapper.querySelector("img");
    image.addEventListener("error", () => {
      image.remove();
      wrapper.classList.add("is-placeholder");
    }, { once: true });
  });
  content.querySelectorAll(".gallery-image-button").forEach((button) => {
    button.addEventListener("click", () => {
      activeImageIndex = Number(button.dataset.imageIndex) + 1;
      focusReturn = button;
      renderImage();
      lightbox.hidden = false;
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      lightbox.querySelector(".lightbox-close").focus();
    });
  });
  lightbox.querySelector(".lightbox-close").addEventListener("click", close);
  lightbox.querySelector(".lightbox-prev").addEventListener("click", () => step(-1));
  lightbox.querySelector(".lightbox-next").addEventListener("click", () => step(1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
    if (event.key === "Tab") {
      const focusable = [...lightbox.querySelectorAll("button:not([hidden])")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  let touchStartX = null;
  lightbox.addEventListener("touchstart", (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
  lightbox.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 50) step(distance < 0 ? 1 : -1);
    touchStartX = null;
  }, { passive: true });
})();

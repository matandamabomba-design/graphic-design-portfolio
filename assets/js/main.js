(() => {
  "use strict";

  const data = window.SITE_DATA;
  if (!data) {
    console.error("MatandaDesign site data could not be loaded.");
    return;
  }

  const heroTitle = document.getElementById("hero-title");
  if (heroTitle) heroTitle.textContent = data.tagline;
  const heroRole = document.getElementById("hero-role");
  if (heroRole) heroRole.textContent = data.title;
  const heroLocation = document.getElementById("hero-location");
  if (heroLocation) heroLocation.textContent = data.location;
  if (document.querySelector(".hero")) {
    document.title = `${data.studio} — ${data.title} in ${data.location}`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = `${data.tagline} ${data.title} based in ${data.location}.`;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = data.siteUrl;
  }

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);

  document.querySelectorAll(".brand-logo").forEach((image) => {
    image.addEventListener("error", () => {
      image.hidden = true;
      const fallback = image.parentElement.querySelector(".brand-fallback");
      if (fallback) fallback.classList.add("is-visible");
    }, { once: true });
  });

  document.querySelectorAll("#current-year").forEach((year) => {
    year.textContent = new Date().getFullYear();
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-nav");
  const closeMenu = () => {
    if (!menuToggle || !navigation) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    navigation.classList.remove("is-open");
  };
  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
      navigation.classList.toggle("is-open", !isOpen);
    });
    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  const imageWithPlaceholder = (src, title, className = "") => {
    const wrapper = document.createElement("div");
    wrapper.className = `image-placeholder ${className}`.trim();
    wrapper.setAttribute("data-title", title);
    const image = document.createElement("img");
    image.src = src;
    image.alt = title;
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => {
      image.remove();
      wrapper.classList.add("is-placeholder");
    }, { once: true });
    wrapper.append(image);
    return wrapper;
  };

  let visibleProjects = data.projects.filter((project) => project.visible);
  let activeProjects = visibleProjects;
  let activeIndex = 0;
  let returnFocus = null;
  const filters = document.getElementById("project-filters");
  const projectGrid = document.getElementById("project-grid");
  const workEmpty = document.getElementById("work-empty");
  const lightbox = document.getElementById("lightbox");

  const renderLightbox = () => {
    const project = activeProjects[activeIndex];
    if (!project || !lightbox) return;
    const imageWrap = lightbox.querySelector(".lightbox-image-wrap");
    imageWrap.replaceChildren(imageWithPlaceholder(project.image, project.title));
    lightbox.querySelector(".lightbox-category").textContent = project.category;
    lightbox.querySelector(".lightbox-title").textContent = project.title;
    lightbox.querySelector(".lightbox-description").textContent = project.description;
    const caseLink = lightbox.querySelector(".lightbox-case-link");
    caseLink.hidden = !project.caseStudy;
    caseLink.href = `project.html?id=${encodeURIComponent(project.id)}`;
    const showArrows = activeProjects.length > 1;
    lightbox.querySelector(".lightbox-prev").hidden = !showArrows;
    lightbox.querySelector(".lightbox-next").hidden = !showArrows;
  };

  const openLightbox = (project, trigger) => {
    if (!lightbox) return;
    activeIndex = activeProjects.indexOf(project);
    returnFocus = trigger;
    renderLightbox();
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lightbox.querySelector(".lightbox-close").focus();
  };

  const closeLightbox = () => {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    if (returnFocus && document.contains(returnFocus)) returnFocus.focus();
  };

  const moveLightbox = (amount) => {
    if (activeProjects.length < 2) return;
    activeIndex = (activeIndex + amount + activeProjects.length) % activeProjects.length;
    renderLightbox();
  };

  if (lightbox) {
    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", () => moveLightbox(-1));
    lightbox.querySelector(".lightbox-next").addEventListener("click", () => moveLightbox(1));
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    lightbox.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveLightbox(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        moveLightbox(1);
      } else if (event.key === "Tab") {
        const focusable = [...lightbox.querySelectorAll("button:not([hidden]), a[href]:not([hidden])")];
        if (!focusable.length) return;
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
    lightbox.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener("touchend", (event) => {
      if (touchStartX === null) return;
      const distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) > 50) moveLightbox(distance < 0 ? 1 : -1);
      touchStartX = null;
    }, { passive: true });
  }

  const renderProjects = (category = "All") => {
    if (!projectGrid) return;
    activeProjects = category === "All" ? visibleProjects : visibleProjects.filter((project) => project.category === category);
    projectGrid.replaceChildren();
    activeProjects.forEach((project) => {
      const card = document.createElement("button");
      card.className = "project-card";
      card.type = "button";
      card.setAttribute("aria-label", `View ${project.title}, ${project.category}`);
      card.append(imageWithPlaceholder(project.image, project.title, "project-image"));
      const details = document.createElement("span");
      details.className = "project-card-details";
      details.innerHTML = `<span class="project-card-title">${escapeHtml(project.title)}</span><span class="project-card-category">${escapeHtml(project.category)}</span>`;
      card.append(details);
      card.addEventListener("click", () => openLightbox(project, card));
      projectGrid.append(card);
    });
    if (workEmpty) workEmpty.hidden = activeProjects.length > 0;
  };

  if (filters && projectGrid) {
    const categories = ["All", ...(data.categories || [])];
    categories.forEach((category, index) => {
      const button = document.createElement("button");
      button.className = "filter-button";
      button.type = "button";
      button.textContent = category;
      button.setAttribute("aria-pressed", String(index === 0));
      button.addEventListener("click", () => {
        filters.querySelectorAll(".filter-button").forEach((item) => item.setAttribute("aria-pressed", "false"));
        button.setAttribute("aria-pressed", "true");
        renderProjects(category);
      });
      filters.append(button);
    });
    renderProjects();
  }

  const caseList = document.getElementById("case-list");
  if (caseList) {
    const cases = visibleProjects.filter((project) => project.caseStudy);
    cases.forEach((project, index) => {
      const article = document.createElement("article");
      article.className = `case-card${index % 2 ? " case-card-reverse" : ""}`;
      const link = `project.html?id=${encodeURIComponent(project.id)}`;
      article.innerHTML = `<a class="case-image-link" href="${link}" aria-label="Read the ${escapeHtml(project.title)} case study"></a><div class="case-copy"><p class="eyebrow">${escapeHtml(project.category)}${project.year ? ` <span aria-hidden="true">·</span> ${escapeHtml(project.year)}` : ""}</p><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.description)}</p><a class="text-link" href="${link}">Explore case study <span aria-hidden="true">↗</span></a></div>`;
      article.querySelector(".case-image-link").append(imageWithPlaceholder(project.image, project.title, "case-image"));
      caseList.append(article);
    });
  }

  const bioCopy = document.getElementById("bio-copy");
  if (bioCopy) {
    bioCopy.innerHTML = (data.bio || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
    const toolList = document.getElementById("tool-list");
    (data.tools || []).forEach((tool) => {
      const item = document.createElement("li");
      item.textContent = tool;
      toolList.append(item);
    });
    const portrait = document.querySelector("#portrait-frame img");
    portrait.addEventListener("error", () => {
      portrait.hidden = true;
      document.getElementById("portrait-frame").classList.add("portrait-fallback");
    }, { once: true });
  }

  const contactActions = document.getElementById("contact-actions");
  if (contactActions) {
    const phone = (data.contact.phones || [])[0];
    const phoneDigits = phone ? phone.replace(/[^\d+]/g, "") : "";
    const actions = [
      data.contact.whatsapp ? { label: "WhatsApp", href: `https://wa.me/${encodeURIComponent(data.contact.whatsapp)}`, primary: true } : null,
      phoneDigits ? { label: "Call", href: `tel:${phoneDigits}` } : null,
      data.contact.email ? { label: "Email", href: `mailto:${data.contact.email}` } : null
    ].filter(Boolean);
    actions.forEach((action) => {
      const link = document.createElement("a");
      link.className = `button ${action.primary ? "button-light" : "button-dark-outline"}`;
      link.href = action.href;
      link.textContent = action.label;
      if (action.href.startsWith("https:")) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
      contactActions.append(link);
    });
    const secondPhone = (data.contact.phones || [])[1];
    if (secondPhone) {
      const phoneText = document.getElementById("second-phone");
      phoneText.innerHTML = `Also reachable at <a href="tel:${escapeHtml(secondPhone.replace(/[^\d+]/g, ""))}">${escapeHtml(secondPhone)}</a>`;
    }
  }

  const socialLinks = document.getElementById("social-links");
  if (socialLinks) {
    const socialLabels = { instagram: "Instagram", tiktok: "TikTok", linkedin: "LinkedIn", x: "X", youtube: "YouTube" };
    Object.entries(data.social || {}).forEach(([key, url]) => {
      if (!url) return;
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", socialLabels[key] || key);
      link.textContent = socialLabels[key] || key;
      socialLinks.append(link);
    });
    socialLinks.hidden = socialLinks.children.length === 0;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Person", "ProfessionalService"],
    name: data.name,
    brand: data.studio,
    jobTitle: data.title,
    address: { "@type": "PostalAddress", addressLocality: "Kampala", addressCountry: "UG" },
    url: data.siteUrl,
    description: data.tagline
  };
  if (data.contact.email) structuredData.email = data.contact.email;
  if (data.contact.phones && data.contact.phones.length) structuredData.telephone = data.contact.phones[0];
  if (data.social) structuredData.sameAs = Object.values(data.social).filter(Boolean);
  const jsonLd = document.createElement("script");
  jsonLd.type = "application/ld+json";
  jsonLd.textContent = JSON.stringify(structuredData);
  if (document.querySelector(".hero")) document.head.append(jsonLd);

  const revealItems = document.querySelectorAll(".section-wrap:not(.hero), .service-card, .process-grid li, .case-card");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => {
      item.classList.add("reveal");
      observer.observe(item);
    });
  }
})();

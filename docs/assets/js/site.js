(() => {
  const course = window.MICROCERT_COURSE;
  if (!course) return;

  document.querySelectorAll("[data-live-link]").forEach(link => {
    link.href = course.liveUrl;
  });

  document.querySelectorAll("[data-registration-link]").forEach(link => {
    link.href = course.registrationUrl;
  });

  const studioList = document.getElementById("studio-list");
  if (studioList) {
    studioList.innerHTML = course.studios.map((studio, studioIndex) => `
      <details class="studio" ${studioIndex === 0 ? "open" : ""}>
        <summary class="studio-summary">
          <div class="studio-image" style="background-image:url('${studio.image}')" role="img" aria-label="Illustration for Module Studio ${studio.module}: ${studio.title}"></div>
          <div class="studio-copy">
            <div class="studio-meta"><span>Module Studio ${studio.module}</span><span>${studio.phase}</span><span>3 lessons</span></div>
            <h3>${studio.title}</h3>
            <p><strong>${studio.question}</strong> ${studio.outcome}</p>
            <p class="studio-project">${studio.project}</p>
          </div>
          <span class="studio-toggle" aria-hidden="true">Review lessons</span>
        </summary>
        <div class="lesson-grid">
          ${studio.lessons.map(lesson => `
            <article class="lesson">
              <span class="lesson-number">Lesson ${String(lesson.number).padStart(2, "0")}</span>
              <h4>${lesson.title}</h4>
              <span class="lesson-duration">${lesson.duration}</span>
              <p>${lesson.objective}</p>
              <dl>
                <dt>Applied activity</dt>
                <dd>${lesson.activity}</dd>
                <dt>Notebook deliverable</dt>
                <dd>${lesson.deliverable}</dd>
              </dl>
            </article>
          `).join("")}
        </div>
      </details>
    `).join("");
  }

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
    });

    nav.addEventListener("click", event => {
      if (event.target instanceof HTMLAnchorElement) {
        menuButton.setAttribute("aria-expanded", "false");
        nav.classList.remove("open");
      }
    });
  }
})();

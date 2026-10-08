document.addEventListener("DOMContentLoaded", () => {
  const skillsContainer = document.getElementById("skills-container");

  // Load Skills from JSON File
  async function loadSkills() {
    try {
      const response = await fetch("DataManagement/skills.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const skillsData = await response.json();
      renderSkills(skillsData);
      setupSkillFiltering();
    } catch (error) {
      console.error("Skills JSON load karne me error aayi:", error);
      if (skillsContainer) {
        skillsContainer.innerHTML = `
          <p class="col-span-full text-center text-red-500 font-semibold py-4">
            Failed to load skills data.
          </p>
        `;
      }
    }
  }

  // Render Skill Cards in HTML Container
  function renderSkills(skills) {
    if (!skillsContainer) return;
    skillsContainer.innerHTML = "";

    skills.forEach((skill) => {
      const skillCategory = skill.category || "all";
      const skillCardHTML = `
        <div class="skill-item glass-card p-5 rounded-2xl transition-all duration-300 hover:shadow-lg"
             data-category="${skillCategory}">
            <div class="flex justify-between items-center mb-2">
                <div class="flex items-center gap-3">
                    <i class="${skill.iconClass}"></i>
                    <span class="font-semibold text-slate-800 dark:text-slate-200">${skill.SkillName}</span>
                </div>
                <span class="text-sm font-mono text-slate-500">${skill.progress}%</span>
            </div>
            <div class="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div class="bg-gradient-to-r from-brand-500 to-cyan-400 h-2.5 rounded-full transition-all duration-1000 ease-out"
                     style="width: ${skill.progress}%"></div>
            </div>
        </div>
      `;
      skillsContainer.insertAdjacentHTML("beforeend", skillCardHTML);
    });
  }

  // Filter Buttons Click Handling Logic
  function setupSkillFiltering() {
    const filterButtons = document.querySelectorAll("#skill-filters .skill-filter-btn");

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Active status update karein button styling ke liye
        filterButtons.forEach((b) => {
          b.classList.remove("bg-brand-600", "text-white", "shadow-md", "shadow-brand-500/20", "active");
          b.classList.add("bg-slate-200/80", "dark:bg-slate-800/80", "text-slate-700", "dark:text-slate-300");
        });

        btn.classList.add("bg-brand-600", "text-white", "shadow-md", "shadow-brand-500/20", "active");
        btn.classList.remove("bg-slate-200/80", "dark:bg-slate-800/80", "text-slate-700", "dark:text-slate-300");

        const selectedFilter = btn.getAttribute("data-filter");
        const skillItems = document.querySelectorAll(".skill-item");

        skillItems.forEach((item) => {
          const itemCategory = item.getAttribute("data-category");
          if (selectedFilter === "all" || itemCategory === selectedFilter) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // Initialize
  loadSkills();
});
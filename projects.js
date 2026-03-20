// Function jo JSON file se data load karegi
async function loadProjects() {
    const container = document.getElementById('projects-container');

    try {
        // Path check kar lena: Data_management folder projects.html ke relative hona chahiye
        const response = await fetch('Data_manegement/project.json');
        
        if (!response.ok) {
            throw new Error("JSON file nahi mili!");
        }

        const projectsData = await response.json();
        
        // Container saaf karo
        container.innerHTML = "";

        // Har project ke liye HTML generate karo
        projectsData.forEach(project => {
            const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

            const cardHTML = `
                <article class="project-card">
                    <div class="project-thumb">
                        <img src="${project.thumbnail}" alt="${project.name}">
                    </div>
                    <div class="project-content">
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                        <div class="project-meta">
                            ${tagsHTML}
                        </div>
                    </div>
                    <div class="project-actions">
                        <a class="btn primary" href="${project.primary_button.download_link}" 
                           ${project.primary_button.text === 'Download' ? 'download' : ''}>
                            ${project.primary_button.text}
                        </a>
                        <a class="btn ghost" href="${project.secondary_button.path}">
                            ${project.secondary_button.text}
                        </a>
                    </div>
                </article>
            `;
            container.innerHTML += cardHTML;
        });

    } catch (error) {
        console.error("Error loading projects:", error);
        container.innerHTML = `<p style="color: red;">Projects load nahi ho paye. Error: ${error.message}</p>`;
    }
}

// Page load hote hi function call karo
document.addEventListener('DOMContentLoaded', loadProjects);
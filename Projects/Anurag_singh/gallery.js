const imagesPerPage = 30;
let currentIndex = 0;
let images = [];

fetch("images.json")
    .then(res => res.json())
    .then(data => {
        images = data;
        loadImages();
    });

function loadImages() {
    const grid = document.getElementById("galleryGrid");

    const slice = images.slice(currentIndex, currentIndex + imagesPerPage);

    slice.forEach(imgName => {
        const div = document.createElement("div");
        div.className = "gallery-item";

        const img = document.createElement("img");
        img.src = `Assets/gallary/${imgName}`;
        img.loading = "lazy";

        div.appendChild(img);
        grid.appendChild(div);
    });

    currentIndex += imagesPerPage;

    if (currentIndex >= images.length) {
        document.getElementById("loadMore").style.display = "none";
    }
}

document.getElementById("loadMore").addEventListener("click", loadImages);

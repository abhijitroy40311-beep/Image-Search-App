// Unsplash API Key
const ACCESS_KEY = "BKIVWTyLsh4q-8zWTgsTDI177YbZpUS8CEq9_H42UpM";

// Select Elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMore");
const loader = document.querySelector(".loader");


// Variables
let keyword = "";
let page = 1;

// Hide Load More button initially
loadMoreBtn.style.display = "none";

// Fetch Images
async function searchImages() {
    keyword = searchInput.value.trim();

    if (keyword === "") {
        alert("Please enter something!");
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${ACCESS_KEY}&per_page=12`;

    try {
        const response = await fetch(url);

        if (!response.ok) { throw new Error("Failed to fetch images."); }
        const data = await response.json();

        // Clear old images when new search
        if (page === 1) { gallery.innerHTML = ""; }

        // Display images
        setTimeout(() => {
            data.results.forEach((image) => {
                const imageCard = document.createElement("div");
                imageCard.classList.add("image-card");
                imageCard.innerHTML = `<a href="${image.links.html}" target="_blank">
                    <img src="${image.urls.small}" alt="${image.alt_description}">
                </a>
            `;
                gallery.appendChild(imageCard);
            });
        }, 500); // Wait 1 

        // Show Load More button
        if (data.total_pages > page) {
            loadMoreBtn.style.display = "block";
        } else {
            loadMoreBtn.style.display = "none";
        }

    } catch (error) {
        console.error(error);
        alert("Something went wrong!");
    }
}

// Search Button
searchBtn.addEventListener("click", () => {
    page = 1;
    searchImages();
});

// Enter Key Support
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        page = 1;
        searchImages();
    }
});

// Load More
loadMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});



// function portfolio() {
//     window.location.href = "";
// }

function portfolio() {
    alert("This feature is under development. Please check back later.");
};
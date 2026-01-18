// Define the Profile class
class Profile {
    constructor(name, picture, description, category, price, owner, location) {
        this.name = name;
        this.picture = picture;
        this.description = description;
        this.category = category;
        this.price = price;
        this.owner = owner;
        this.location = location;
    }
}

// Handle form submission for upload page
if (document.getElementById("uploadForm")) {
    document.getElementById("uploadForm").addEventListener("submit", function(event) {
        event.preventDefault();  // Prevent the form from submitting the default way

        // Get form data
        const formData = new FormData(event.target);

        // Prepare item data
        const itemData = {
            name: formData.get("name"),
            description: formData.get("description"),
            category: formData.get("category"),
            price: formData.get("price"),
            owner: formData.get("owner"),
            location: formData.get("location"),
            file: formData.get("file") // This contains the file input
        };

        // Check if the picture is uploaded
        const pictureFile = formData.get("picture");

        // Read the file as a data URL (base64-encoded)
        const reader = new FileReader();
        reader.onload = function(event) {
            // Create a new Profile object
            const newProfile = new Profile(
                itemData.name,
                event.target.result, // Image as base64
                itemData.description,
                itemData.category,
                itemData.price,
                itemData.owner,
                itemData.location
            );

            // Save the new profile in sessionStorage
            let profiles = JSON.parse(sessionStorage.getItem("profiles")) || [];
            profiles.push(newProfile);
            sessionStorage.setItem("profiles", JSON.stringify(profiles));

            // Clear the form
            event.target.reset();

            // Reload profiles to update the page
            loadProfiles(); // Call the function to render the profiles
        };

        // If a picture file is uploaded, read it
        if (pictureFile) {
            reader.readAsDataURL(pictureFile); // Convert image file to base64
        } else {
            alert("Please upload a picture.");
        }
    });
}

// This function will load and display profiles from sessionStorage
function loadProfiles() {
    const profiles = JSON.parse(sessionStorage.getItem("profiles")) || [];
    const container = document.querySelector(".homeitems");

    // Clear the container before re-rendering profiles
    container.innerHTML = '';

    profiles.forEach(profile => {
        const profileDiv = document.createElement("div");
        profileDiv.classList.add("itemblock");

        profileDiv.innerHTML = `
            <div class="itemblock_image">
                <img src="${profile.picture}" alt="${profile.name}" />
            </div>
            <div class="itemblock_content">
                <h2 class="itemblock_title">${profile.name}</h2>
                <p class="itemblock_description">${profile.description}</p>
                <p class="itemblock_category">Category: ${profile.category}</p>
                <div class="price_and_loc">
                    <div class="itemblock_price">${profile.price}</div>
                    <div class="itemblock_owner">${profile.owner}</div>
                    <div class="itemblock_location">${profile.location}</div>
                </div>
            </div>
        `;

        // Append the new profile div to the container
        container.appendChild(profileDiv);
    });
}

window.onload = function() {
    loadProfiles(); // Load profiles when the page loads
};

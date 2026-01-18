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

            // Save the new profile in sessiontorage
            let profiles = JSON.parse(sessionStorage.getItem("profiles")) || [];
            profiles.push(newProfile);
            sessionStorage.setItem("profiles", JSON.stringify(profiles));

            // Clear the form
            event.target.reset();
        };

        // If a picture file is uploaded, read it
        if (pictureFile) {
            reader.readAsDataURL(pictureFile); // Convert image file to base64
        } else {
            alert("Please upload a picture.");
        }
    });
}

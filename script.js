const backendURL = "https://lebron-prayer.onrender.com"; // Replace with your backend URL

// Function to get the current prayer count from the backend
function fetchPrayerCount() {
    fetch(`${backendURL}/prayers`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("prayer-count").textContent = data.count;
        })
        .catch(error => console.error("Error fetching prayer count:", error));
}

// Function to check if the user has already prayed today
function hasPrayedToday() {
    const lastPrayerDate = localStorage.getItem("lastPrayerDate");
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    return lastPrayerDate === today;
}

// Function to handle praying
function prayForLeBron() {
    if (hasPrayedToday()) {
        alert("You can only pray for LeBron once per day. Come back tomorrow!");
        return;
    }

    // Send prayer request to the backend
    fetch(`${backendURL}/pray`, { method: "POST" })
        .then(response => response.json())
        .then(data => {
            alert("Your prayer has been counted! 🙏");
            document.getElementById("prayer-count").textContent = data.count;

            // Store today's date to prevent multiple prayers in one day
            localStorage.setItem("lastPrayerDate", new Date().toISOString().split("T")[0]);

            // Update the button appearance
            updatePrayButton();
        })
        .catch(error => console.error("Error:", error));
}

// Function to update the button style and text based on prayer status
function updatePrayButton() {
    const prayButton = document.getElementById("pray-button");

    if (hasPrayedToday()) {
        prayButton.style.backgroundColor = "red"; // Already prayed → Red button
        prayButton.textContent = "Prayed for LeBron 🙏";
        prayButton.disabled = true; // Disable further clicks
    } else {
        prayButton.style.backgroundColor = "green"; // Can pray → Green button
        prayButton.textContent = "Pray for LeBron";
        prayButton.disabled = false;
    }
}

// Run when the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchPrayerCount(); // Fetch prayer count from backend
    updatePrayButton(); // Check if the user has already prayed
});

// Attach the prayer function to the button
document.getElementById("pray-button").addEventListener("click", prayForLeBron);

const prayerCountElement = document.getElementById("prayerCount");
const prayerButton = document.getElementById("prayButton");

// Function to fetch the latest prayer count from the backend
async function fetchPrayerCount() {
    try {
        const response = await fetch("https://your-backend.onrender.com/prayers");
        const data = await response.json();
        prayerCountElement.textContent = `Prayers: ${data.count}`;
    } catch (error) {
        console.error("Error fetching prayer count:", error);
    }
}

// Function to send a prayer and increase the count
async function sendPrayer() {
    try {
        const response = await fetch("https://your-backend.onrender.com/pray", {
            method: "POST",
        });

        if (response.ok) {
            const data = await response.json();
            prayerCountElement.textContent = `Prayers: ${data.count}`;
        } else {
            console.error("Failed to send prayer");
        }
    } catch (error) {
        console.error("Error sending prayer:", error);
    }
}

// Event listener for the prayer button
prayerButton.addEventListener("click", sendPrayer);

// Fetch prayer count when the page loads
fetchPrayerCount();

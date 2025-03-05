const backendURL = "https://lebron-prayer.onrender.com";

function fetchPrayerCount() {
    fetch(`${backendURL}/prayers`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("prayer-count").textContent = data.count;
        })
        .catch(error => console.error("Error fetching prayer count:", error));
}

document.getElementById("pray-button").addEventListener("click", () => {
    fetch(`${backendURL}/pray`, { method: "POST" })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            document.getElementById("prayer-count").textContent = data.count;
        })
        .catch(error => console.error("Error:", error));
});

// Load prayer count when page loads
fetchPrayerCount();

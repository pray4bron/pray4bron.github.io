document.addEventListener("DOMContentLoaded", async () => {
    const prayerCount = document.getElementById("prayer-count");
    const prayButton = document.getElementById("pray-button");
    const message = document.getElementById("message");

    // Fetch current prayer count
    async function fetchPrayerCount() {
        try {
            const response = await fetch("https://pray4bron.github.io/");
            const data = await response.json();
            prayerCount.textContent = data.count;
        } catch (error) {
            console.error("Error fetching prayer count:", error);
        }
    }

    // Handle prayer button click
    prayButton.addEventListener("click", async () => {
        try {
            const response = await fetch("https://your-backend-url.com/pray", { method: "POST" });
            const data = await response.json();
            if (data.error) {
                message.textContent = data.error;
                message.style.color = "red";
            } else {
                prayerCount.textContent = data.count;
                message.textContent = "Thank you for your prayer! Come back tomorrow.";
                message.style.color = "green";
            }
        } catch (error) {
            console.error("Error submitting prayer:", error);
        }
    });

    fetchPrayerCount();
});

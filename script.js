document.addEventListener("DOMContentLoaded", function () {
    const prayerCountElement = document.getElementById("prayerCount");
    const prayerButton = document.getElementById("prayButton");

    const backendURL = "https://lebron-prayer-api.onrender.com"; // ⬅️ Replace this with your actual backend URL

    if (!prayerCountElement || !prayerButton) {
        console.error("Prayer count element or button not found!");
        return;
    }

    // ✅ Fetch the current prayer count from the backend
    async function fetchPrayerCount() {
        try {
            const response = await fetch(`${backendURL}/prayers`);
            const data = await response.json();
            prayerCountElement.textContent = `Prayers: ${data.count}`;
        } catch (error) {
            console.error("Error fetching prayer count:", error);
        }
    }

    // ✅ Function to send a prayer request
    async function sendPrayer() {
        try {
            const response = await fetch(`${backendURL}/pray`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
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

    // ✅ Attach event listener to the button
    prayerButton.addEventListener("click", sendPrayer);

    // ✅ Fetch count when page loads
    fetchPrayerCount();
});

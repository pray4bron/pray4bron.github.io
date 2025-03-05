document.addEventListener("DOMContentLoaded", function () {
    const prayerCountElement = document.getElementById("prayerCount");
    const prayerButton = document.getElementById("prayButton");

    const backendURL = "https://lebron-prayer-api.onrender.com"; // ✅ Correct backend URL

    // ✅ Function to check if user has already prayed today
    function hasPrayedToday() {
        const lastPrayedDate = localStorage.getItem("lastPrayedDate");
        const today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD
        return lastPrayedDate === today;
    }

    // ✅ Function to disable the button if already prayed
    function updateButtonState() {
        if (hasPrayedToday()) {
            prayerButton.disabled = true;
            prayerButton.textContent = "You've already prayed today 🙏";
            prayerButton.style.backgroundColor = "red"; // Make it red
        }
    }

    // ✅ Fetch the current prayer count from the backend
    async function fetchPrayerCount() {
        try {
            const response = await fetch(`${backendURL}/prayers`);
            const data = await response.json();
            prayerCountElement.textContent = `Prayers: ${data.count}`; // ✅ Fix double text
        } catch (error) {
            console.error("Error fetching prayer count:", error);
        }
    }

    // ✅ Function to send a prayer request
    async function sendPrayer() {
        if (hasPrayedToday()) return; // Stop if already prayed today

        try {
            const response = await fetch(`${backendURL}/pray`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const data = await response.json();
                prayerCountElement.textContent = `Prayers: ${data.count}`; // ✅ Update count

                // ✅ Store today's date in localStorage
                const today = new Date().toISOString().split("T")[0];
                localStorage.setItem("lastPrayedDate", today);

                // ✅ Update button state
                updateButtonState();
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

    // ✅ Update button state when page loads
    updateButtonState();
});

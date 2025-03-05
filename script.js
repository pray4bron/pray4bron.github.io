document.addEventListener("DOMContentLoaded", function () {
    const prayerCountElement = document.getElementById("prayerCount");
    const prayerButton = document.getElementById("prayButton");

    const backendURL = "https://lebron-prayer-api.onrender.com"; // ✅ Backend URL

    // ✅ Function to get today's date in YYYY-MM-DD format
    function getTodayDate() {
        return new Date().toISOString().split("T")[0];
    }

    // ✅ Function to check if the user has already prayed today (stored locally)
    function hasPrayedToday() {
        const lastPrayedDate = localStorage.getItem("lastPrayedDate");
        return lastPrayedDate === getTodayDate();
    }

    // ✅ Function to disable the button if the user has already prayed
    function updateButtonState() {
        if (hasPrayedToday()) {
            prayerButton.disabled = true;
            prayerButton.textContent = "You've already prayed today 🙏";
            prayerButton.style.backgroundColor = "red"; // Make it red
        } else {
            prayerButton.disabled = false;
            prayerButton.textContent = "Pray for LeBron 🙌";
            prayerButton.style.backgroundColor = "green"; // Make it green
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

    // ✅ Function to send a prayer request (only if they haven't prayed today)
    async function sendPrayer() {
        if (hasPrayedToday()) {
            return; // ❌ Stop if already prayed today
        }

        try {
            const response = await fetch(`${backendURL}/pray`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {
                const data = await response.json();
                prayerCountElement.textContent = `Prayers: ${data.count}`; // ✅ Update counter

                // ✅ Store today's date in localStorage to prevent multiple prayers
                localStorage.setItem("lastPrayedDate", getTodayDate());

                // ✅ Disable button after prayer
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

    // ✅ Initial setup when page loads
    fetchPrayerCount();
    updateButtonState();
});

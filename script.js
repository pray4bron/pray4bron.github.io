document.addEventListener("DOMContentLoaded", function () {
    const prayerCountElement = document.getElementById("prayerCount");
    const prayerButton = document.getElementById("prayButton");

    const backendURL = "https://lebron-prayer-api.onrender.com"; // ✅ Backend URL

    // ✅ Function to get today's date in YYYY-MM-DD format
    function getTodayDate() {
        return new Date().toISOString().split("T")[0];
    }

    // ✅ Function to check if the user has already prayed today
    function hasPrayedToday() {
        const lastPrayedDate = localStorage.getItem("lastPrayedDate");
        console.log("Stored lastPrayedDate:", lastPrayedDate); // ✅ Debugging
        console.log("Today's date:", getTodayDate()); // ✅ Debugging
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
            prayerCountElement.textContent = `Prayers: ${data.count}`;
        } catch (error) {
            console.error("Error fetching prayer count:", error);
        }
    }

    // ✅ Function to send a prayer request
    async function sendPrayer() {
        if (hasPrayedToday()) {
            console.log("Prayer already sent today.");
            return;
        }

        try {
            const response = await fetch(`${backendURL}/pray`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {
                const data = await response.json();
                prayerCountElement.textContent = `Prayers: ${data.count}`;

                // ✅ Store today's date in localStorage
                localStorage.setItem("lastPrayedDate", getTodayDate());
                console.log("Saved lastPrayedDate:", getTodayDate()); // ✅ Debugging

                updateButtonState();
            } else {
                console.error("Failed to send prayer");
            }
        } catch (error) {
            console.error("Error sending prayer:", error);
        }
    }

    // ✅ Attach event listener
    prayerButton.addEventListener("click", sendPrayer);

    // ✅ Initialize on page load
    fetchPrayerCount();
    updateButtonState();
});

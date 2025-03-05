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
        console.log("Last prayed date:", lastPrayedDate); // 🔍 Debugging
        const today = getTodayDate();
        console.log("Today's date:", today); // 🔍 Debugging
        return lastPrayedDate === today;
    }

    // ✅ Function to disable the button if the user has already prayed
    function updateButtonState() {
        if (hasPrayedToday()) {
            console.log("User has already prayed today. Disabling button."); // 🔍 Debugging
            prayerButton.disabled = true;
            prayerButton.textContent = "You've already prayed today 🙏";
            prayerButton.style.backgroundColor = "red"; // Make it red
        } else {
            console.log("User has NOT prayed today. Button is enabled."); // 🔍 Debugging
        }
    }

    // ✅ Fetch the current prayer count from the backend
    async function fetchPrayerCount() {
        try {
            const response = await fetch(`${backendURL}/prayers`);
            const data = await response.json();
            console.log("Fetched prayer count:", data.count); // 🔍 Debugging
            prayerCountElement.textContent = `Prayers: ${data.count}`; // ✅ Fix double text
        } catch (error) {
            console.error("Error fetching prayer count:", error);
        }
    }

    // ✅ Function to send a prayer request
    async function sendPrayer() {
        if (hasPrayedToday()) {
            console.log("User tried to pray again, but they have already prayed today."); // 🔍 Debugging
            return; // Stop if already prayed today
        }

        try {
            const response = await fetch(`${backendURL}/pray`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Prayer sent successfully. New count:", data.count); // 🔍 Debugging
                prayerCountElement.textContent = `Prayers: ${data.count}`;

                // ✅ Store today's date in localStorage
                const today = getTodayDate();
                localStorage.setItem("lastPrayedDate", today);
                console.log("Stored new prayer date in localStorage:", today); // 🔍 Debugging

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

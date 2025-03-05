document.addEventListener("DOMContentLoaded", function () {
    const prayerCountElement = document.getElementById("prayerCount");
    const prayerButton = document.getElementById("prayButton");

    const backendURL = "https://lebron-prayer-api.onrender.com"; // ✅ Your backend URL

    // ✅ Check if user has already prayed today
    const hasPrayedToday = localStorage.getItem("hasPrayedToday");
    if (hasPrayedToday) {
        prayerButton.disabled = true; // Disable button if already prayed
        prayerButton.textContent = "You've already prayed today 🙏";
        prayerButton.style.backgroundColor = "red"; // Make button red
    }

    // ✅ Fetch the current prayer count from the backend
    async function fetchPrayerCount() {
        try {
            const response = await fetch(`${backendURL}/prayers`);
            const data = await response.json();
            prayerCountElement.textContent = `Prayers: ${data.count}`; // ✅ Fix: No double text
        } catch (error) {
            console.error("Error fetching prayer count:", error);
        }
    }

    // ✅ Function to send a prayer request (only if allowed)
    async function sendPrayer() {
        if (localStorage.getItem("hasPrayedToday")) {
            return; // Stop function if the user already prayed
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
                prayerCountElement.textContent = `Prayers: ${data.count}`; // ✅ Update count

                // ✅ Mark that the user has prayed today
                localStorage.setItem("hasPrayedToday", true);
                prayerButton.disabled = true;
                prayerButton.textContent = "You've already prayed today 🙏";
                prayerButton.style.backgroundColor = "red"; // Make button red
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

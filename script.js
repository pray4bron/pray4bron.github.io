document.addEventListener("DOMContentLoaded", function () {
    const prayerCountElement = document.getElementById("prayerCount").querySelector("span");
    const prayerButton = document.getElementById("prayButton");

    const backendURL = "https://lebron-prayer-api.onrender.com"; 
    const prayerSound = new Audio("prayer-sound.mp3"); 

    function getTodayDate() {
        return new Date().toISOString().split("T")[0];
    }

    function hasPrayedToday() {
        return localStorage.getItem("lastPrayedDate") === getTodayDate();
    }

    function updateButtonState() {
        if (hasPrayedToday()) {
            prayerButton.disabled = true;
            prayerButton.textContent = "Come back tomorrow! 🙏"; 
            prayerButton.style.backgroundColor = "red"; 
        } else {
            prayerButton.disabled = false;
            prayerButton.textContent = "Pray for LeBron 🙌";
            prayerButton.style.backgroundColor = "green"; 
        }
    }

    function launchConfetti() {
        if (typeof confetti !== "undefined") {
            const confettiSettings = { particleCount: 100, spread: 60, origin: { y: 0.6 } };
            confetti(confettiSettings);
        }
    }

    async function fetchPrayerCount() {
        try {
            const response = await fetch(`${backendURL}/prayers`);
            const data = await response.json();
            prayerCountElement.textContent = data.count; // ✅ FIX: Only update number
        } catch (error) {
            console.error("Error fetching prayer count:", error);
        }
    }

    async function sendPrayer() {
        if (hasPrayedToday()) return;

        try {
            const response = await fetch(`${backendURL}/pray`, { method: "POST" });

            if (response.ok) {
                const data = await response.json();
                prayerCountElement.textContent = data.count; // ✅ FIX: Only update number

                // ✅ Store today's date in localStorage
                localStorage.setItem("lastPrayedDate", getTodayDate());

                // ✅ Play sound & launch confetti
                prayerSound.play();
                launchConfetti();

                // ✅ Immediately update the button state
                prayerButton.disabled = true;
                prayerButton.textContent = "Come back tomorrow! 🙏"; 
                prayerButton.style.backgroundColor = "red";
            } else {
                console.error("Failed to send prayer:", response.statusText);
            }
        } catch (error) {
            console.error("Error sending prayer:", error);
        }
    }

    prayerButton.addEventListener("click", sendPrayer);

    fetchPrayerCount();
    updateButtonState();
});

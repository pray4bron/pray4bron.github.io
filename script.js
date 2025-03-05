document.addEventListener("DOMContentLoaded", function () {
    const prayerCountElement = document.getElementById("prayerCount");
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
        const confettiSettings = { particleCount: 100, spread: 60, origin: { y: 0.6 } };
        confetti(confettiSettings);
    }

    async function fetchPrayerCount() {
        try {
            const response = await fetch(`${backendURL}/prayers`);
            const data = await response.json();
            prayerCountElement.textContent = `Prayers: ${data.count}`;
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
                prayerCountElement.textContent = `Prayers: ${data.count}`;

                // ✅ Store today's date in localStorage
                localStorage.setItem("lastPrayedDate", getTodayDate());

                // ✅ Play sound & launch confetti
                prayerSound.play();
                launchConfetti();

                // ✅ Update button state immediately
                prayerButton.disabled = true;
                prayerButton.textContent = "Come back tomorrow! 🙏"; 
                prayerButton.style.backgroundColor = "red"; 
            } else if (response.status === 429) {
                // ✅ If rate-limited, update button immediately
                console.warn("You have already prayed today!");
                prayerButton.disabled = true;
                prayerButton.textContent = "Come back tomorrow! 🙏"; 
                prayerButton.style.backgroundColor = "red";

                // ✅ Also store in localStorage to prevent re-clicks
                localStorage.setItem("lastPrayedDate", getTodayDate());
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

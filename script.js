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

    
        localStorage.setItem("lastPrayedDate", getTodayDate());

    
        prayerSound.play();
        launchConfetti();

    
        prayerButton.disabled = true;
        prayerButton.textContent = "Come back tomorrow! 🙏"; 
        prayerButton.style.backgroundColor = "red";
}

            } else {
                console.error("Failed to send prayer");
            }
        } catch (error) {
            console.error("Error sending prayer:", error);
        }
    }

    
    prayerButton.addEventListener("click", sendPrayer);

    
    fetchPrayerCount();
    updateButtonState();
});

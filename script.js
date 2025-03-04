document.addEventListener("DOMContentLoaded", () => {
    const prayerCount = document.getElementById("prayer-count");
    const prayButton = document.getElementById("pray-button");
    const message = document.getElementById("message");
    const prayerSound = new Audio("prayer-sound.mp3"); // Add your sound file here

    // Load stored prayer count from local storage (default to 0 if not set)
    let count = parseInt(localStorage.getItem("prayerCount")) || 0;
    prayerCount.textContent = count;

    // Check if user has already prayed today
    const lastPrayDate = localStorage.getItem("lastPrayDate");
    const today = new Date().toDateString();

    if (lastPrayDate === today) {
        prayButton.disabled = true;
        prayButton.style.backgroundColor = "red";
        prayButton.style.color = "white";
        message.textContent = "You have already prayed today. Come back tomorrow!";
        message.style.color = "red";
    } else {
        prayButton.style.backgroundColor = "green";
        prayButton.style.color = "white";
    }

    // Handle button click
    prayButton.addEventListener("click", () => {
        const lastPrayDate = localStorage.getItem("lastPrayDate");
        const today = new Date().toDateString();

        if (lastPrayDate === today) {
            message.textContent = "You can only pray once per day!";
            message.style.color = "red";
            return;
        }

        // Play prayer sound
        prayerSound.play();

        // Increment prayer count
        count++;
        localStorage.setItem("prayerCount", count);
        localStorage.setItem("lastPrayDate", today);

        // Update UI
        prayerCount.textContent = count;
        message.textContent = "Thank you for your prayer! Come back tomorrow.";
        message.style.color = "green";
        prayButton.disabled = true;
        prayButton.style.backgroundColor = "red";
        prayButton.style.color = "white";
    });
});

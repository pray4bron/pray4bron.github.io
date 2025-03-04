document.addEventListener("DOMContentLoaded", () => {
    const prayerCount = document.getElementById("prayer-count");
    const prayButton = document.getElementById("pray-button");
    const message = document.getElementById("message");

    // Load stored prayer count from local storage
    let count = localStorage.getItem("prayerCount") || 0;
    prayerCount.textContent = count;

    // Check if user has already prayed today
    const lastPrayDate = localStorage.getItem("lastPrayDate");
    const today = new Date().toDateString();

    if (lastPrayDate === today) {
        prayButton.disabled = true;
        message.textContent = "You have already prayed today. Come back tomorrow!";
        message.style.color = "red";
    }

    // Handle button click
    prayButton.addEventListener("click", () => {
        if (localStorage.getItem("lastPrayDate") === today) {
            message.textContent = "You can only pray once per day!";
            message.style.color = "red";
            return;
        }

        // Update count and store in local storage
        count++;
        localStorage.setItem("prayerCount", count);
        localStorage.setItem("lastPrayDate", today);

        // Update UI
        prayerCount.textContent = count;
        message.textContent = "Thank you for your prayer! Come back tomorrow.";
        message.style.color = "green";
        prayButton.disabled = true;
    });
});

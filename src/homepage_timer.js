let interval;
const targetDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

export function startCountdown() {
    const countdownElements = document.querySelectorAll('.timebox__number');

    function updateCountdown() {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(interval);
            countdownElements.forEach(el => (el.textContent = "00"));
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        countdownElements[0].textContent = String(days).padStart(2, '0');
        countdownElements[1].textContent = String(hours).padStart(2, '0');
        countdownElements[2].textContent = String(minutes).padStart(2, '0');
        countdownElements[3].textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
}




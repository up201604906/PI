export function initializeCounters() {
    const counters = document.querySelectorAll(".counter");

    // Find the maximum target value among all counters
    let maxTarget = 0;
    counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        if (target > maxTarget) {
            maxTarget = target;
        }
    });

    counters.forEach((counter) => {
        counter.innerText = "0";
        const updateCounter = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const increment = target / 100; // You can adjust this value to control the speed
            const timeout = 50 / (target / maxTarget);
            if (count < target) {
                counter.innerText = `${Math.ceil(count + increment)}`;
                setTimeout(updateCounter, timeout);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
}
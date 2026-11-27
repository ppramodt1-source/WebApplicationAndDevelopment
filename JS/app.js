
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

const cards = document.querySelectorAll(".card");
const matchCards = document.getElementById("matchCards");
const filter = document.getElementById("filter");

// Hamburger menu

menu.addEventListener("click", () => {
    nav.classList.toggle("open");
});

// Close mobile menu after clicking a link

document.querySelectorAll("#nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
    });
});

// Team filtering

filter.addEventListener("change", () => {

    cards.forEach(card => {

        const teams = card.dataset.teams.split(" ");

        card.style.display =
            filter.value === "all" ||
            teams.includes(filter.value)
                ? ""
                : "none";

    });

});

// Grid view

document.getElementById("grid").addEventListener("click", () => {
    matchCards.classList.remove("list");
});

// List view

document.getElementById("list").addEventListener("click", () => {
    matchCards.classList.add("list");
});

// Booking elements

const match = document.getElementById("match");
const stand = document.getElementById("stand");
const qty = document.getElementById("qty");

const details = document.getElementById("details");
const total = document.getElementById("total");

const prices = {
    General: 500,
    Silver: 1500,
    Premium: 2500,
    VIP: 5000
};

// Update booking summary

function update() {

    let price = prices[stand.value] || 0;
    let count = Number(qty.value) || 1;

    details.textContent =
        "Match: " + (match.value || "Not selected") +
        " | Stand: " + (stand.value || "Not selected") +
        " | Tickets: " + count +
        " | Price: ₹" + price;

    total.textContent =
        "Total: ₹" + (price * count);
}

match.addEventListener("change", update);
stand.addEventListener("change", update);
qty.addEventListener("input", update);

// Confirm booking

document.getElementById("form").addEventListener(
    "submit",
    function(e) {

        e.preventDefault();

        const count = Number(qty.value);

        if (!match.value || !stand.value ||
            count < 1 || count > 10) {

            alert("Please select valid booking details!");
            return;
        }

        const amount = prices[stand.value] * count;

        const bookings = document.getElementById("bookings");

        bookings.textContent =
            "Booking Confirmed! | Match: " +
            match.value +
            " | Stand: " +
            stand.value +
            " | Tickets: " +
            count +
            " | Total: ₹" +
            amount;

        alert("Booking Successful!");

        this.reset();

        qty.value = 1;

        update();
    }
);

update();

document.addEventListener("DOMContentLoaded", function () {

    const matchSelect = document.getElementById("match");
    const standSelect = document.getElementById("stand");
    const quantityInput = document.getElementById("quantity");
    const bookingForm = document.getElementById("bookingForm");

    const summaryMatch = document.getElementById("summaryMatch");
    const summaryStand = document.getElementById("summaryStand");
    const summaryQuantity = document.getElementById("summaryQuantity");
    const summaryPrice = document.getElementById("summaryPrice");
    const totalPrice = document.getElementById("totalPrice");
    const summaryMessage = document.getElementById("summaryMessage");

    const prices = {
        "General": 500,
        "Silver": 1500,
        "Premium": 2500,
        "VIP": 5000
    };

    function formatPrice(amount) {
        return "₹" + amount.toLocaleString("en-IN");
    }

    // Toast notification
    function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }

    // Update booking summary live
    function updateSummary() {
        const match = matchSelect.value;
        const stand = standSelect.value;
        let quantity = Number(quantityInput.value);

        if (!quantity || quantity < 1) quantity = 1;
        if (quantity > 10) quantity = 10;

        quantityInput.value = quantity;

        const price = prices[stand] || 0;
        const total = price * quantity;

        summaryMatch.textContent = match || "Not selected";
        summaryStand.textContent = stand || "Not selected";
        summaryQuantity.textContent = quantity;
        summaryPrice.textContent = formatPrice(price);
        totalPrice.textContent = formatPrice(total);

        if (match && stand) {
            summaryMessage.textContent = "Your booking summary is updated!";
        } else {
            summaryMessage.textContent = "Select match and stand to see your total.";
        }
    }

    // Live update events
    matchSelect.addEventListener("change", updateSummary);
    standSelect.addEventListener("change", updateSummary);
    quantityInput.addEventListener("input", updateSummary);

    // Confirm Booking
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const match = matchSelect.value;
        const stand = standSelect.value;
        const quantity = Number(quantityInput.value);
        const price = prices[stand] || 0;
        const total = price * quantity;

        if (match === "" || stand === "") {
            showToast("Please select a match and stand!");
            return;
        }

        if (quantity < 1 || quantity > 10) {
            showToast("Please enter quantity between 1 and 10!");
            return;
        }

        const bookingList = document.getElementById("bookingList");

        // Remove initial message
        bookingList.innerHTML = "";

        const bookingItem = document.createElement("div");
        bookingItem.className = "booking-item";

        bookingItem.innerHTML = `
            <h3>Booking Confirmed!</h3>
            <p><strong>Match:</strong> ${match}</p>
            <p><strong>Stand:</strong> ${stand}</p>
            <p><strong>Tickets:</strong> ${quantity}</p>
            <p><strong>Total:</strong> ${formatPrice(total)}</p>
        `;

        bookingList.prepend(bookingItem);

        showToast("Booking confirmed successfully!");

        // Reset form after successful booking
        bookingForm.reset();
        quantityInput.value = 1;
        updateSummary();
    });

    // Initial display
    updateSummary();

    console.log("IPL Booking JavaScript loaded successfully!");

});

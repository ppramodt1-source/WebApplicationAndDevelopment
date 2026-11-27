function showToast(message) {
    alert(message);
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".book-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            showToast("Please fill the booking form!");
        });
    });

    document.querySelectorAll('a[href="#booking"]').forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            document.querySelector("#booking").scrollIntoView({
                behavior: "smooth"
            });
            showToast("Scroll to booking section");
        });
    });
});
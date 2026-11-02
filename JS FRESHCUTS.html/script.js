document.addEventListener("DOMContentLoaded", function () {

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const service = document.getElementById("service");
            const message = document.getElementById("message").value.trim();

            const selectedService = service.options[service.selectedIndex];
            const price = selectedService.dataset.price;

            if (!name || !phone || !service.value || !message) {
                alert("Please complete all fields.");
                return;
            }

            if (!/^[0-9+\s()-]{10,20}$/.test(phone)) {
                alert("Please enter a valid phone number.");
                return;
            }

            if (!price) {
                alert("Please select a valid service.");
                return;
            }

            const bookingData = {
                name: name,
                phone: phone,
                service: service.value,
                price: "R" + price,
                message: message,
                _subject: "New JS FRESHCUTS Booking Request"
            };

            const submitButton = bookingForm.querySelector('button[type="submit"]');

            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

            fetch("https://formsubmit.co/ajax/keagankheswa@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(bookingData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Server error: " + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log("FormSubmit response:", data);

                if (data.success === "true" || data.success === true) {
                    alert("Your booking request has been accepted!");
                    bookingForm.reset();
                } else {
                    alert("Booking failed. Please try again.");
                }
            })
            .catch(error => {
                console.error("Booking error:", error);
                alert("Unable to send your booking. Please try again.");
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = "Send Booking Request";
            });
        });
    }


    const galleryImages = document.querySelectorAll(".gallery-image");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");

    galleryImages.forEach(function (image) {
        image.addEventListener("click", function () {
            if (lightbox && lightboxImage) {
                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;
                lightbox.style.display = "flex";
            }
        });
    });

    function hideLightbox() {
        if (lightbox) {
            lightbox.style.display = "none";
        }
    }

    if (closeLightbox) {
        closeLightbox.addEventListener("click", hideLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                hideLightbox();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            hideLightbox();
        }
    });


    const searchBox = document.getElementById("serviceSearch");
    const services = document.querySelectorAll(".service-item");

    if (searchBox) {
        searchBox.addEventListener("input", function () {
            const searchValue = searchBox.value.toLowerCase().trim();

            services.forEach(function (service) {
                const serviceText = service.textContent.toLowerCase();

                service.style.display =
                    serviceText.includes(searchValue) ? "list-item" : "none";
            });
        });
    }


    const priceSort = document.getElementById("priceSort");

    const serviceList = document.querySelector(".service-item")
        ? document.querySelector(".service-item").closest("ul")
        : null;

    if (priceSort && serviceList) {
        const originalServices = Array.from(
            serviceList.querySelectorAll(".service-item")
        );

        priceSort.addEventListener("change", function () {
            let sortedServices = [...originalServices];

            if (priceSort.value === "low-high") {
                sortedServices.sort(function (a, b) {
                    const priceA = Number(a.textContent.match(/\d+/)[0]);
                    const priceB = Number(b.textContent.match(/\d+/)[0]);
                    return priceA - priceB;
                });
            }

            else if (priceSort.value === "high-low") {
                sortedServices.sort(function (a, b) {
                    const priceA = Number(a.textContent.match(/\d+/)[0]);
                    const priceB = Number(b.textContent.match(/\d+/)[0]);
                    return priceB - priceA;
                });
            }

            serviceList.replaceChildren(...sortedServices);
        });
    }


    const animatedElements = document.querySelectorAll(
        ".service-item, .service-search, .service-sort, .animate-on-scroll"
    );

    if ("IntersectionObserver" in window) {
        animatedElements.forEach(function (element) {
            element.classList.add("animate-on-scroll");
        });

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        animatedElements.forEach(function (element) {
            observer.observe(element);
        });
    } else {
        animatedElements.forEach(function (element) {
            element.classList.add("show");
        });
    }

});


const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwUaU_hR9eOyXXHfdb80LkIqpL5GWJEoB6NzslFTTXHmeCLaO_aBnsX3vwX7i79BGk/exec";


// ==========================================
// REPORT FORM SUBMISSION
// ==========================================

const reportForm = document.getElementById("reportForm");

if (reportForm) {

    reportForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton =
            reportForm.querySelector("button[type='submit']");

        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";

        const formData = new FormData(reportForm);

        const imageFile =
            formData.get("image");

        let imageData = "";
        let imageName = "";
        let imageType = "";


        // ==========================================
        // READ SELECTED IMAGE
        // ==========================================

        if (imageFile && imageFile instanceof File && imageFile.size > 0) {

            try {

                imageData = await fileToBase64(imageFile);
                imageName = imageFile.name;
                imageType = imageFile.type;

            } catch (error) {

                console.error("Image processing error:", error);

                alert("Unable to process the selected image.");

                submitButton.disabled = false;
                submitButton.textContent = "Submit Report";

                return;
            }
        }


        const data = {

            type: formData.get("type"),

            itemName: formData.get("itemName"),

            category: formData.get("category"),

            description: formData.get("description"),

            location: formData.get("location"),

            date: formData.get("date"),

            imageData: imageData,

            imageName: imageName,

            imageType: imageType,

            contact: formData.get("contact")
        };


        try {

            const response = await fetch(SCRIPT_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },

                body: JSON.stringify(data)

            });


            const text = await response.text();

            console.log("Server response:", text);


            let result;

            try {

                result = JSON.parse(text);

            } catch (jsonError) {

                console.error(
                    "Invalid JSON response:",
                    text
                );

                throw new Error(
                    "The server did not return valid JSON."
                );
            }


            if (result.success) {

                alert(
                    "Item reported successfully!"
                );

                reportForm.reset();

            } else {

                alert(
                    result.message ||
                    "Something went wrong. Please try again."
                );

            }


        } catch (error) {

            console.error(
                "Submission error:",
                error
            );

            alert(
                "Unable to submit the report. Please check that the Google Apps Script is deployed correctly."
            );


        } finally {

            submitButton.disabled = false;

            submitButton.textContent =
                "Submit Report";

        }

    });

}


// ==========================================
// CONVERT IMAGE TO BASE64
// ==========================================

function fileToBase64(file) {

    return new Promise(function (resolve, reject) {

        const reader = new FileReader();

        reader.onload = function () {

            const base64String =
                reader.result.split(",")[1];

            resolve(base64String);

        };

        reader.onerror = function (error) {

            reject(error);

        };

        reader.readAsDataURL(file);

    });

}


// ==========================================
// LOAD REPORTS ON HOMEPAGE
// ==========================================

const itemsGrid =
    document.querySelector(".items-grid");


if (itemsGrid) {

    let allItems = [];

    let currentFilter = "all";


    // ==========================================
    // DISPLAY ITEMS
    // ==========================================

    function displayItems(items) {

        itemsGrid.innerHTML = "";


        if (items.length === 0) {

            itemsGrid.innerHTML = `
                <p style="text-align: center; width: 100%;">
                    No items found.
                </p>
            `;

            return;
        }


        items.forEach(function (item) {

            const card =
                document.createElement("div");

            card.className =
                "item-card";


            const statusClass =
                item.type === "lost"
                    ? "lost"
                    : "found";


            const statusText =
                item.type
                    ? item.type.toUpperCase()
                    : "UNKNOWN";


            const formattedDate =
                item.date
                    ? new Date(item.date)
                        .toLocaleDateString(
                            "en-IN",
                            {
                                day: "2-digit",
                                month: "long",
                                year: "numeric"
                            }
                        )
                    : "";


            card.innerHTML = `

                <div class="item-image">

                    ${
                        item.imageUrl
                            ? `
                                <img
    src="${
        item.imageUrl.includes("/file/d/")
            ? `https://drive.google.com/thumbnail?id=${
                item.imageUrl.split("/file/d/")[1].split("/")[0]
              }&sz=w1000`
            : item.imageUrl.replace(
                "https://drive.google.com/uc?export=view&id=",
                "https://drive.google.com/thumbnail?id="
              ) + "&sz=w1000"
    }"
    alt="${item.itemName}"
>
                              `
                            : "📦"
                    }

                </div>


                <div class="item-content">

                    <span class="status ${statusClass}">
                        ${statusText}
                    </span>


                    <h3>
                        ${item.itemName || "Unnamed Item"}
                    </h3>


                    <p>
                        📍
                        ${item.location || "Location not provided"}
                    </p>


                    <p>
                        📅
                        ${formattedDate}
                    </p>


                    <button class="details-button">
                        View Details
                    </button>

                </div>

            `;


            itemsGrid.appendChild(card);
            const detailsButton =
    card.querySelector(".details-button");

detailsButton.addEventListener(
    "click",
    function () {

        alert(
            "Item: " + (item.itemName || "Unnamed Item") +
            "\nType: " + (item.type || "Unknown") +
            "\nCategory: " + (item.category || "Unknown") +
            "\nLocation: " + (item.location || "Not provided") +
            "\nDate: " + (formattedDate || "Not provided") +
            "\nDescription: " + (item.description || "Not provided") +
            "\nContact: " + (item.contact || "Not provided")
        );

    }
);

        });

    }


    // ==========================================
    // LOAD REPORTS
    // ==========================================

    async function loadReports() {

        try {

            const response =
                await fetch(SCRIPT_URL);


            const items =
                await response.json();


            console.log(
                "Reports loaded:",
                items
            );


            if (!Array.isArray(items)) {

                console.error(
                    "Invalid reports data:",
                    items
                );

                return;
            }


            allItems = items;

            displayItems(allItems);


        } catch (error) {

            console.error(
                "Error loading reports:",
                error
            );

        }

    }


    // ==========================================
    // FILTER BUTTONS
    // ==========================================

    const filterButtons =
        document.querySelectorAll(".filter");


    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                currentFilter =
                    button.dataset.filter;


                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active-filter"
                        );

                    }
                );


                button.classList.add(
                    "active-filter"
                );


                if (currentFilter === "all") {

                    displayItems(allItems);

                    return;

                }


                const filteredItems =
                    allItems.filter(
                        function (item) {


                            if (
                                currentFilter === "lost" ||
                                currentFilter === "found"
                            ) {

                                return (
                                    item.type ===
                                    currentFilter
                                );

                            }


                            return (
                                item.category &&
                                item.category
                                    .toLowerCase() ===
                                currentFilter
                            );

                        }
                    );


                displayItems(filteredItems);

            }
        );

    });


    // ==========================================
    // SEARCH
    // ==========================================

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const searchText =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                const filteredItems =
                    allItems.filter(
                        function (item) {

                            return (

                                (
                                    item.itemName &&
                                    item.itemName
                                        .toLowerCase()
                                        .includes(searchText)
                                )

                                ||

                                (
                                    item.category &&
                                    item.category
                                        .toLowerCase()
                                        .includes(searchText)
                                )

                                ||

                                (
                                    item.description &&
                                    item.description
                                        .toLowerCase()
                                        .includes(searchText)
                                )

                                ||

                                (
                                    item.location &&
                                    item.location
                                        .toLowerCase()
                                        .includes(searchText)
                                )

                                ||

                                (
                                    item.type &&
                                    item.type
                                        .toLowerCase()
                                        .includes(searchText)
                                )

                            );

                        }
                    );


                displayItems(filteredItems);

            }
        );

    }


    // ==========================================
    // START
    // ==========================================

    loadReports();

}
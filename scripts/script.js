var submitButton = document.getElementById("submit");
var saveButton = document.getElementById("save");

// Error handling for name input. Validating the input and form. Showing error for unvalid conditions.
document.getElementById("nameInput").addEventListener("input", function(e) {
    var validInput = /^[a-zA-Z\s]*$/;
    var errorMessageElement = document.getElementById("error");
    // var submitButton = document.getElementById("submit");
    // var saveButton = document.getElementById("save");

    if (!validInput.test(e.target.value) || e.target.value === "") {
        // Display an error message and disable buttons
        errorMessageElement.textContent = "Invalid input";
        submitButton.disabled = true;
        saveButton.disabled = true;
    } else {
        // Clear the error message and enable buttons
        errorMessageElement.textContent = "";
        submitButton.disabled = false;
        saveButton.disabled = false;
    }
});

document.getElementById("clear-radio").addEventListener("click", function() {
    var radioButtons = document.querySelectorAll('.form-item input[type="radio"]');

    radioButtons.forEach(radio => {
        radio.checked = false;
    })
})

// saving 
document.getElementById("save").addEventListener("click", function() {
    var name = document.getElementById("nameInput").value.trim();
    var selectedGender = document.querySelector('input[name="gender"]:checked').value;
    
    // Only save if name is not empty and a gender is selected
    if (name && selectedGender) {
        localStorage.setItem(name, selectedGender);
    }
});

document.getElementById("form").onsubmit = function(event) {
    event.preventDefault(); // Prevent default form submission

    var name = document.getElementById("nameInput").value.trim();
    var url = `https://api.genderize.io/?name=${name}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Display gender prediction and probability
            document.getElementById("gender-prediction").textContent = data.gender;
            document.getElementById("gender-prob").textContent = data.probability;

            // Check and display saved answer
            var savedGender = localStorage.getItem(name);
            if (savedGender) {
                document.getElementById("saved-answer").textContent = savedGender;
            } else {
                document.getElementById("saved-answer").textContent = "";
            }
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });
};

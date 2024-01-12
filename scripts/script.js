// Error handling for name input. Validating the input and form. Showing error for invalid conditions.
document.getElementById("nameInput").addEventListener("input", function(e) {
    var validInput = /^[a-zA-Z\s]*$/;
    var errorMessageElement = document.getElementById("error");
    var submitButton = document.getElementById("submit");
    var saveButton = document.getElementById("save");
    var clearSavedButton = document.getElementById("clear-saved");

    if (!validInput.test(e.target.value) || e.target.value === "") {
        // Display an error message and disable buttons
        errorMessageElement.textContent = "Invalid input";
        submitButton.disabled = true;
        saveButton.disabled = true;
        clearSavedButton.disabled = true;
    } else {
        // Clear the error message and enable buttons
        errorMessageElement.textContent = "";
        submitButton.disabled = false;
        saveButton.disabled = false;
        clearSavedButton.disabled = false;
    }
});

// Unchecking the selected radio button by clicking on clear button
document.getElementById("clear-radio").addEventListener("click", function() {
    checkedRadio = document.querySelector('input[name="gender"]:checked');
    if (checkedRadio !== null) {
        checkedRadio.checked = false;
    }

    /*
    var radioButtons = document.querySelectorAll('.form-item input[type="radio"]');

    radioButtons.forEach(radio => {
        radio.checked = false;
    })
    */
})

// Saving gender for the name in the nameInput element. The gender selected by radio buttons has higher priority than the prediction 
document.getElementById("save").addEventListener("click", function() {
    var name = document.getElementById("nameInput").value.trim();
    var selectedGender = document.querySelector('input[name="gender"]:checked');
    if (selectedGender !== null) {
        selectedGender = selectedGender.value
    }
    var predictedGender = document.getElementById("gender-prediction").innerHTML;
    
    // Save if name is not empty and a gender is selected using radio buttons
    if (name && selectedGender) {
        localStorage.setItem(name, selectedGender);
    } else if (name && predictedGender) {  // Save if name is not empty and a gender is not selected using radio buttons and the gender is predicted
        localStorage.setItem(name, predictedGender);
    }
});


// Submitting the form, sending a GET request to the API, and displaying the response. Displaying the saved answer if it exists.
document.getElementById("form").onsubmit = function(event) {
    event.preventDefault(); // Prevent default form submission

    var name = document.getElementById("nameInput").value.trim();
    var url = `https://api.genderize.io/?name=${name}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Display gender prediction and probability
            document.getElementById("gender-prediction").textContent = "Gender: " + data.gender;
            document.getElementById("gender-prob").textContent = "Prob: " + data.probability;

            // Check and display saved answer
            var savedGender = localStorage.getItem(name);
            if (savedGender) {
                document.getElementById("saved-answer").textContent = name + " is " + savedGender;
            } else {
                document.getElementById("saved-answer").textContent = "";
            }
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });
};


// Clear the saved answer for the name entered in the nameInput element, if one exists
document.getElementById("clear-saved").addEventListener("click", function() {
    var name = document.getElementById("nameInput").value.trim();
    var savedGender = localStorage.getItem(name);

    if (savedGender) {
        localStorage.removeItem(name);
        document.getElementById("saved-answer").textContent = name + "'s saved info got removed."
    }
});
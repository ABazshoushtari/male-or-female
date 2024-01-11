var submitButton = document.getElementById('submit');
var saveButton = document.getElementById('save');

// Error handling for name input. Validating the input and form. Showing error for unvalid conditions.
document.getElementById('nameInput').addEventListener('input', function(e) {
    var validInput = /^[a-zA-Z\s]*$/;
    var errorMessageElement = document.getElementById('error');
    // var submitButton = document.getElementById('submit');
    // var saveButton = document.getElementById('save');

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
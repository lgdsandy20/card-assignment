// Get references to the HTML elements we will interact with.
// These lines connect our JavaScript to the parts of our HTML page.
const cardForm = document.getElementById('cardForm');         // The main <form> element.
const nameInput = document.getElementById('name');           // The <input> field for the person's name.
const emailInput = document.getElementById('email');         // The <input> field for the email address.
const detailInput = document.getElementById('detail');       // The <textarea> for details or bio.
const avatarInput = document.getElementById('avatarInput');   // The <input type="file"> for the avatar image.
const cardContainer = document.getElementById('cardContainer'); // The <div> where new cards will be displayed.
// const createCardBtn = document.getElementById('createCardBtn'); // No longer needed to change button text.

// Add an event listener to the form.
// This means: "When the form is submitted, run the following function."
cardForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior.
    // Normally, submitting a form reloads the page. We don't want that here.
    event.preventDefault();

    // Get the text values from the input fields.
    // .trim() removes any extra spaces from the beginning or end of the text.
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const detail = detailInput.value.trim();
    // Get the first file selected in the avatar file input (if any).
    const avatarFile = avatarInput.files[0];

    // Simple validation: Check if the main text fields are empty.
    if (!name || !email || !detail) {
        alert('Please fill in all fields: Name, Email, and Details.');
        return; // Stop the function here if any field is empty.
    }

    // This function will create the HTML for the avatar (either an image or a text initial)
    // and then build and display the card.
    const createAndDisplayCard = (avatarHTML) => {
        // Create a new 'div' element in memory. This will be our card.
        const cardElement = document.createElement('div');
        // Add the CSS class 'generated-card' to style it.
        cardElement.className = 'generated-card';

        // Set the HTML content of the card using a template literal (backticks ``).
        // This structure defines what each card will look like.
        // WARNING: Directly putting user input (name, email, detail) into innerHTML
        // without proper sanitization can be a security risk (XSS).
        // For learning, this is simple, but for real websites, sanitize input!
        cardElement.innerHTML = `
            <div class="card-header">
                <div class="card-avatar">${avatarHTML}</div>
                <div>
                    <h3 class="card-name">${name}</h3>
                    <p class="card-email">${email}</p>
                </div>
            </div>
            <p class="card-details-text">${detail}</p>
            <div class="card-actions">
                <button class="delete-btn">Delete</button>
            </div>
        `;
        // Add the new card to the beginning of the 'cardContainer' on the page.
        cardContainer.prepend(cardElement);

        // Find the "Delete" button that we just added to this new card.
        const deleteBtn = cardElement.querySelector('.delete-btn');
        // Add an event listener to this delete button.
        // When clicked, it will remove the entire cardElement.
        deleteBtn.addEventListener('click', function() {
            cardElement.remove();
        });

        // Reset the form fields so they are empty for the next card.
        cardForm.reset();
        // Clear the file input explicitly (form.reset() might not always do this).
        avatarInput.value = '';
        // Put the cursor back into the 'name' input field for convenience.
        nameInput.focus();
    };

    // Now, let's handle the avatar image.
    // If the user selected an avatar file...
    if (avatarFile) {
        const reader = new FileReader(); // Create a FileReader to read the file.
        // The 'onload' event fires when the file has been successfully read.
        reader.onload = function(e) {
            // e.target.result contains the image file as a base64 data URL.
            // We create an <img> tag with this data URL as its source.
            const imageAvatarHtml = `<img src="${e.target.result}" alt="Avatar">`;
            createAndDisplayCard(imageAvatarHtml); // Create the card with the image.
        }
        // Start reading the selected file.
        reader.readAsDataURL(avatarFile);
    } else {
        // If no avatar file was selected, use the first letter of the name as the avatar.
        const textAvatarHtml = name.charAt(0).toUpperCase();
        createAndDisplayCard(textAvatarHtml); // Create the card with the text initial.
    }
});

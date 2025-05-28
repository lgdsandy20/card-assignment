// Get DOM elements
        const cardForm = document.getElementById('cardForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const detailInput = document.getElementById('detail');
        const cardContainer = document.getElementById('cardContainer');
        const errorMessage = document.getElementById('errorMessage');
        const noCardsMessage = document.getElementById('noCardsMessage');

        // Event listener for form submission
        cardForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission (page reload)

            // Get input values
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const detail = detailInput.value.trim();

            // Basic validation
            if (!name || !email || !detail) {
                errorMessage.textContent = 'Oops! All fields are required to create a card.';
                errorMessage.classList.remove('hidden');
                // Hide message after 3 seconds
                setTimeout(() => {
                    errorMessage.classList.add('hidden');
                }, 3000);
                return;
            }
            errorMessage.classList.add('hidden'); // Hide error message if previously shown

            // Hide "no cards" message if it's visible
            if (noCardsMessage && !noCardsMessage.classList.contains('hidden')) {
                noCardsMessage.classList.add('hidden');
            }

            // Create card element
            const card = document.createElement('div');
            card.className = 'generated-card'; // Apply the main card style

            // Sanitize text content to prevent XSS (basic example)
            const sanitize = (str) => {
                const temp = document.createElement('div');
                temp.textContent = str;
                return temp.innerHTML;
            }

            // Card content using new CSS classes
            card.innerHTML = `
                <div class="card-content-wrapper">
                    <div class="card-header-info">
                        <div class="card-avatar">
                            ${sanitize(name.charAt(0).toUpperCase())}
                        </div>
                        <div>
                            <h3 class="card-name">${sanitize(name)}</h3>
                            <p class="card-email">${sanitize(email)}</p>
                        </div>
                    </div>
                    <p class="card-detail">${sanitize(detail)}</p>
                </div>
                <div class="card-footer">
                    Generated: ${new Date().toLocaleTimeString()}
                </div>
            `;

            // Prepend the new card to the container for a "newest first" feel
            cardContainer.prepend(card);

            // Clear input fields
            nameInput.value = '';
            emailInput.value = '';
            detailInput.value = '';
            nameInput.focus(); // Focus on the first input for better UX
        });
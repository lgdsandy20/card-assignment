const cardForm = document.getElementById('cardForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const detailInput = document.getElementById('detail');
const avatarInput = document.getElementById('avatarInput');
const cardContainer = document.getElementById('cardContainer');

cardForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const detail = detailInput.value.trim();
    const avatarFile = avatarInput.files[0];

    if (!name || !email || !detail) {
        alert('Please fill in all fields: Name, Email, and Details.');
        return;
    }

    const createAndDisplayCard = (avatarHTML) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'generated-card';

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
        cardContainer.prepend(cardElement);

        const deleteBtn = cardElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            cardElement.remove();
        });

        cardForm.reset();
        avatarInput.value = '';
        nameInput.focus();
    };

    if (avatarFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageAvatarHtml = `<img src="${e.target.result}" alt="Avatar">`;
            createAndDisplayCard(imageAvatarHtml);
        }
        reader.readAsDataURL(avatarFile);
    } else {
        const textAvatarHtml = name.charAt(0).toUpperCase();
        createAndDisplayCard(textAvatarHtml);
    }
});
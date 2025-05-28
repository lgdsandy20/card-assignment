function createCard() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name && email && message) {
    const card = `
      <div class="card">
        <h3>${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      </div>
    `;
    document.getElementById('card-container').innerHTML = card;
  } else {
    alert('Please fill all fields.');
  }
}

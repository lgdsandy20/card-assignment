function createCard() {
  const name = document.getElementById('name').value.trim();
  const info = document.getElementById('info').value.trim();
  const email = document.getElementById('email').value.trim();

  if (name === '' || info === ''|| email === '') {
    alert('Please fill all the  fields!');
    return;
  }

  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <h4>${name}</h4>
    <p>${info}</p>
     <p><strong>Email:</strong> ${email}</p>
  `;

  document.getElementById('cardContainer').appendChild(card);

  // Clear input fields
  document.getElementById('name').value = '';
  document.getElementById('info').value = '';
   document.getElementById('email').value = '';
}
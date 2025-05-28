function createCard() {
  const name = document.getElementById('name').value.trim();
  const info = document.getElementById('info').value.trim();

  if (name === '' || info === '') {
    alert('Please fill in both fields!');
    return;
  }

  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <h4>${name}</h4>
    <p>${info}</p>
  `;

  document.getElementById('cardContainer').appendChild(card);

  // Clear input fields
  document.getElementById('name').value = '';
  document.getElementById('info').value = '';
}
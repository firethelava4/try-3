// Load terms.json dynamically
let termsData = [];
fetch('terms.json')
  .then(response => response.json())
  .then(data => {
    termsData = data;
  })
  .catch(error => console.error('Error loading terms:', error));

const searchBar = document.getElementById('search-bar');
const suggestionsList = document.getElementById('suggestions');
const resultDiv = document.getElementById('result');
const termElement = document.getElementById('term');
const definitionElement = document.getElementById('definition');
const exampleElement = document.getElementById('example');
const avoidanceElement = document.getElementById('avoidance');

// Filter terms based on input
searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();
  suggestionsList.innerHTML = '';

  if (query.trim() !== '') {
    const filteredTerms = termsData.filter(item =>
      item.term.toLowerCase().includes(query)
    );

    filteredTerms.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.term;
      li.addEventListener('click', () => showResult(item));
      suggestionsList.appendChild(li);
    });
  }
});

// Display the selected term's details
function showResult(item) {
  termElement.textContent = item.term;
  definitionElement.textContent = item.definition;
  exampleElement.textContent = item.example;
  avoidanceElement.textContent = item.avoidance;

  resultDiv.style.display = 'block';
  suggestionsList.innerHTML = '';
  searchBar.value = '';
}


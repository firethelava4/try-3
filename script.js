// Fetch the terms from the JSON file
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
const avoidanceContainer = document.getElementById('avoidance-container');
const avoidanceElement = document.getElementById('avoidance');

// Filter terms based on input
searchBar.addEventListener('input', () => {
  const query = searchBar.value.toLowerCase();
  suggestionsList.innerHTML = '';

  if (query.trim() !== '') {
    const filteredTerms = termsData.filter(item =>
      item.term.toLowerCase().includes(query)
    );

    // Limit the number of displayed suggestions to three
    const limitedTerms = filteredTerms.slice(0, 3);

    limitedTerms.forEach(item => {
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

  // Check if avoidance exists and toggle visibility
  if (item.avoidance) {
    avoidanceElement.textContent = item.avoidance;
    avoidanceContainer.style.display = 'block';
  } else {
    avoidanceContainer.style.display = 'none';
  }

  resultDiv.style.display = 'block';
  suggestionsList.innerHTML = '';
  searchBar.value = '';
}



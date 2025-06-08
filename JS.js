document.getElementById('search-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const query = document.getElementById('query').value.trim();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Searching...';
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    if (data.results && data.results.length) {
      resultsDiv.innerHTML = data.results.map(item =>
        `<div class="card mb-2"><div class="card-body">
           <a href="${item.link}" target="_blank">${item.title}</a>
           <p>${item.snippet}</p>
         </div></div>`
      ).join('');
    } else {
      resultsDiv.innerHTML = "No results found.";
    }
  } catch (err) {
    resultsDiv.innerHTML = "An error occurred.";
  }
});
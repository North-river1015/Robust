//AI generated
document.getElementById('search-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const query = document.getElementById('query').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = "Searching...";
  // Always use production backend
  const backendUrl = 'https://robust-1.onrender.com/search';
  try {
    const response = await fetch(`${backendUrl}?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    if (data.results && data.results.length) {
      resultsDiv.innerHTML = data.results.map(item => {
        // Extract domain for favicon
        let domain;
        try {
          domain = new URL(item.link).hostname;
        } catch (e) {
          domain = '';
        }
        return `
          <div class="card mb-2" style="border:1px solid #ddd; border-radius:8px; margin-bottom:28px; box-shadow:0 2px 8px #eee; font-family:'Open Sans', Arial, sans-serif; padding:18px 12px;">
            <div class="card-body" style="display:flex; align-items:center;">
              <img src="https://www.google.com/s2/favicons?domain=${domain}" alt="favicon" style="width:20px;height:20px;margin-right:12px;">
              <div>
                <a href="${item.link}" target="_blank" style="font-weight:600; font-size:1.12em; color:#1a0dab; font-family:'Open Sans', Arial, sans-serif; text-decoration:none;">${item.title}</a>
                <p style="margin:6px 0 0 0; color:#444; font-size:0.97em; font-family:'Open Sans', Arial, sans-serif;">${item.snippet}</p>
              </div>
            </div>
          </div>
        `;
      }).join('');
    } else {
      resultsDiv.innerHTML = "No results found.";
    }
  } catch (err) {
    resultsDiv.innerHTML = "An error occurred.";
  }
});


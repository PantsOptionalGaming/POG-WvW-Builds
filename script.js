const scriptURL = "https://script.google.com/macros/s/AKfycbyTqjcE-x6fSBelow9yv8IEdbnOCNX3Axe3MSpI3oK-3ZWQnb1F80eLV3v68irO7slF/exec";

function loadBuilds(type, value) {
  const loading = document.getElementById('loading');
  const table = document.getElementById('build-table');
  loading.style.display = 'block';
  table.innerHTML = '';

  const url = `${scriptURL}?filterType=${type}&filterValue=${encodeURIComponent(value)}`;
  console.log("Fetching builds from:", url);

  fetch(url)
    .then(response => {
      console.log("Fetch response status:", response.status);
      return response.json();
    })
    .then(data => {
      console.log("Received data:", data);
      loading.style.display = 'none';

      if (!Array.isArray(data) || !data.length) {
        table.innerHTML = '<tr><td>No builds found.</td></tr>';
        return;
      }

      // ... rest of rendering as before
    })
    .catch(error => {
      loading.style.display = 'none';
      console.error("Fetch error:", error);
      table.innerHTML = '<tr><td>Error loading builds.</td></tr>';
    });
}

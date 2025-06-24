// ✅ Your deployed web app URL:
const scriptURL = "https://script.google.com/macros/s/AKfycbyTqjcE-x6fSBelow9yv8IEdbnOCNX3Axe3MSpI3oK-3ZWQnb1F80eLV3v68irO7slF/exec";

function loadBuilds(type, value) {
  const loading = document.getElementById('loading');
  const table = document.getElementById('build-table');
  loading.style.display = 'block';
  table.innerHTML = '';

  // Generate a unique callback function name
  const callbackName = `cb_${Date.now()}`;
  window[callbackName] = function (data) {
    delete window[callbackName]; // Clean up
    loading.style.display = 'none';

    if (!data || !data.length) {
      table.innerHTML = '<tr><td>No builds found.</td></tr>';
      return;
    }

    const headers = data[0];
    const rows = data.slice(1);

    let html = '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';
    rows.forEach(row => {
      html += '<tr>' + row.map(cell => {
        if (typeof cell === 'string' && cell.startsWith('http')) {
          return `<td><a href="${cell}" target="_blank">Link</a></td>`;
        }
        return `<td>${cell}</td>`;
      }).join('') + '</tr>';
    });
    table.innerHTML = html;
  };

  // Add script tag to fetch JSONP response
  const script = document.createElement('script');
  script.src = `${scriptURL}?filterType=${type}&filterValue=${encodeURIComponent(value)}&callback=${callbackName}`;
  script.onerror = function () {
    loading.style.display = 'none';
    table.innerHTML = '<tr><td>Error loading builds.</td></tr>';
  };
  document.body.appendChild(script);
}

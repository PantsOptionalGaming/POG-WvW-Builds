const scriptURL = "https://script.google.com/macros/s/AKfycbyTqjcE-x6fSBelow9yv8IEdbnOCNX3Axe3MSpI3oK-3ZWQnb1F80eLV3v68irO7slF/exec";

function loadBuilds(type, value) {
  const loading = document.getElementById('loading');
  const table = document.getElementById('build-table');
  loading.style.display = 'block';
  table.innerHTML = '';

  const callbackName = 'cb_' + Math.random().toString(36).substring(2); 
  window[callbackName] = function(data) {
    console.log("JSONP callback data:", data);
    loading.style.display = 'none';
    delete window[callbackName];
    document.body.removeChild(script);

    if (!Array.isArray(data) || data.length < 2) {
      table.innerHTML = '<tr><td>No builds found.</td></tr>';
      return;
    }

    const headers = data[0], rows = data.slice(1);
    let html = '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';
    rows.forEach(row => {
      html += '<tr>' + row.map(cell => {
        return (typeof cell === 'string' && cell.startsWith('http'))
          ? `<td><a href="${cell}" target="_blank">Link</a></td>`
          : `<td>${cell}</td>`;
      }).join('') + '</tr>';
    });
    table.innerHTML = html;
  };

  const script = document.createElement('script');
  script.src = `${scriptURL}?filterType=${type}&filterValue=${encodeURIComponent(value)}&callback=${callbackName}`;
  console.log("Appending JSONP script:", script.src);
  document.body.appendChild(script);
}

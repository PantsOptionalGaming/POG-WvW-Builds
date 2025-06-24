
function loadBuilds(type, value) {
  const loading = document.getElementById('loading');
  const table = document.getElementById('build-table');
  loading.style.display = 'block';
  table.innerHTML = '';

  fetch(`https://script.google.com/macros/s/YOUR_DEPLOYED_WEBAPP_ID/exec?filterType=${type}&filterValue=${encodeURIComponent(value)}`)
    .then(response => response.json())
    .then(data => {
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
    })
    .catch(error => {
      loading.style.display = 'none';
      alert('Error loading builds: ' + error);
    });
}

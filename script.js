<script>
const scriptURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

function loadBuilds(type, value) {
  const loading = document.getElementById('loading');
  const table = document.getElementById('build-table');
  loading.style.display = 'block';
  table.innerHTML = '';

  const callbackName = 'handleBuildData_' + Math.floor(Math.random() * 100000);
  window[callbackName] = function(data) {
    loading.style.display = 'none';
    delete window[callbackName];

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

  const script = document.createElement('script');
  script.src = `${scriptURL}?callback=${callbackName}&filterType=${type}&filterValue=${encodeURIComponent(value)}`;
  script.onerror = () => {
    loading.style.display = 'none';
    table.innerHTML = '<tr><td>Error loading builds.</td></tr>';
  };
  document.body.appendChild(script);
}
</script>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>GW2 Build Viewer</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    .btn-group button {
      margin: 5px;
      padding: 8px 16px;
      cursor: pointer;
    }
    table {
      border-collapse: collapse;
      margin-top: 20px;
      width: 100%;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f4f4f4;
    }
    #loading {
      color: #007bff;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h2>Guild Wars 2 Build Viewer</h2>

  <div class="btn-group">
    <button onclick="loadBuilds('profession', 'Elementalist')">Elementalist</button>
    <button onclick="loadBuilds('profession', 'Engineer')">Engineer</button>
    <button onclick="loadBuilds('role', 'Support')">Support</button>
    <button onclick="loadBuilds('role', 'BackLineDPS')">BackLine DPS</button>
  </div>

  <div id="loading" style="display: none;">Loading builds...</div>
  <table id="build-table"></table>

  <script>
    const scriptURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec";

    function loadBuilds(type, value) {
      const loading = document.getElementById('loading');
      const table = document.getElementById('build-table');
      loading.style.display = 'block';
      table.innerHTML = '';

      fetch(`${scriptURL}?filterType=${type}&filterValue=${encodeURIComponent(value)}`)
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
          alert('Error loading builds: ' + error.message);
        });
    }
  </script>
</body>
</html>

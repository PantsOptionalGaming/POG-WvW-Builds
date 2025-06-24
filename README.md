# POG WvW Builds - Static Website

## Usage

1. Upload this folder to your GitHub repository or any static hosting.
2. Open `index.html` in your browser.
3. Click buttons to load builds from the Google Apps Script Web App.
4. Make sure your Google Apps Script Web App is deployed with:
   - Anyone, even anonymous can access (public)
   - The Web App URL is set correctly in `script.js` (variable `scriptURL`)

## Notes

- This uses JSONP to avoid CORS issues.
- Buttons filter builds by profession or role.
- Builds data is loaded live from your Google Sheets via the Google Apps Script Web App.


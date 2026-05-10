# The Threshold — Application Form

A publicly hosted, multi-step React application form for The Threshold pre-screening process.

## Live Site

- **Production URL:** [https://the-threshold-app.vercel.app](https://the-threshold-app.vercel.app)

## Running Locally

1. **Install Node.js (v22+ recommended)**
   You can install Node.js via any package manager, or download a portable binary:
   ```bash
   curl -fsSL https://nodejs.org/dist/v22.15.0/node-v22.15.0-darwin-arm64.tar.gz -o /tmp/node-arm64.tar.gz
   tar -xzf /tmp/node-arm64.tar.gz -C /tmp
   export PATH="/tmp/node-v22.15.0-darwin-arm64/bin:$PATH"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

```bash
npm run build
```

The optimized static files will be output to the `dist/` directory.

## Deploying Updates

1. **Make your changes** to the source files (e.g., `src/App.jsx`).

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy to Vercel**
   ```bash
   npx vercel --prod
   ```

   > **Note:** If this is your first time deploying from this machine, you may need to log in first:
   > ```bash
   > npx vercel login
   > ```

## Project Structure

```
The Threshold/
├── index.html          # Entry HTML file
├── package.json        # Project dependencies & scripts
├── vite.config.js      # Vite configuration
├── dist/               # Production build output
└── src/
    ├── App.jsx         # Main application form component
    ├── main.jsx        # Application entry point
    └── index.css       # Global base styles
```

## Data Collection (Google Sheets)

Form submissions are sent to a Google Sheet via a Google Apps Script webhook. The webhook URL is already configured in `src/App.jsx`.

### Spreadsheet Setup (one-time)

1. Create a new Google Sheet named **"Threshold Applications"**
2. Add these headers in row 1:
   `Timestamp | Name | Age | Location | Occupation | Relationship | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Q11 | Q12 | Q13 | Q14 | Q15 | Commitment Scale | Commitment Why | Agreements`
3. Open **Extensions → Apps Script**
4. Replace the default code with the contents of `google-apps-script.gs` in this repo
5. Click **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Every submission will appear as a new row in your Sheet

## Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- Hosted on [Vercel](https://vercel.com/)
- Data stored in [Google Sheets](https://sheets.google.com/)

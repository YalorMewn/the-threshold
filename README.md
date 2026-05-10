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

## Data Collection (Email Forwarding via Formspree)

Form submissions are sent directly to your email inbox via [Formspree](https://formspree.io). No spreadsheet setup required.

### Setup (5 minutes)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form — you'll get an endpoint like `https://formspree.io/f/xrgjprnd`
3. Paste that URL into `src/App.jsx` on line 220, replacing `YOUR_FORM_ID`
4. Rebuild and redeploy:
   ```bash
   npm run build && npx vercel --prod
   ```
5. Every submission arrives in your email inbox, plus you can view/export submissions from the Formspree dashboard

### Features

- Free tier: 50 submissions/month
- Built-in spam protection
- CSV export of all submissions
- Optional: connect your own email (Gmail, custom domain, etc.)

## Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- Hosted on [Vercel](https://vercel.com/)
- Data stored in [Google Sheets](https://sheets.google.com/)

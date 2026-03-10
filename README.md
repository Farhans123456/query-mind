# QueryMind — AI SQL Query Generator

**QueryMind** is a modern, AI-powered web application that instantly converts plain English natural language into optimized SQL queries. It's built to eliminate the need for syntax memorization, helping data analysts, developers, startups, and non-technical founders query their databases with ease.

[![QueryMind Banner](/public/github-banner.png)](https://github.com/Farhans123456/query-mind)

## 🚀 Features

- **Natural Language to SQL:** Type what you want in plain English, and the AI generates the corresponding SQL query.
- **Context-Aware Generation:** Optionally provide your database schema (`CREATE TABLE` statements) to get perfectly tailored queries that match your exact table structures.
- **SQL Explanation & Optimization:** The app doesn't just give you code; it provides step-by-step explanations of the generated SQL and suggests optimizations.
- **Secure & Custom UX:** Includes a custom right-click context menu and disabled standard browser developer tools for enhanced app security.
- **Beautiful UI:** A sleek, dark-themed, glassmorphic UI built with Radix Primitives and Tailwind CSS for a premium user experience.

## 🛠️ Technology Stack

- **Frontend Framework:** React 18, Vite, TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **UI Components:** Shadcn UI (Radix UI Primitives), Lucide React
- **Data Fetching:** TanStack React Query
- **Backend / AI:** Supabase Edge Functions (invoking the `generate-sql` function)
- **Deployment:** Ready for Netlify deployment (`netlify.toml` included)

## 📦 Getting Started

### Prerequisites

- Node.js (v22+)
- `npm` or `bun`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Farhans123456/query-mind.git
   cd query-mind
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Set up your Supabase project URL and API keys in your `.env` file for the AI generation to work correctly.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:8080/`.

## 🏗️ Build & Deployment

To build the project for production:

```bash
npm run build
```

This project includes a `netlify.toml` file configured to automatically build and deploy via Netlify using `npm run build`.

## 👨‍💻 Author

**Made by Farhan Shaikh**
- [Email](mailto:f98561965@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/farhan-shaikh-753551358/)
- [GitHub](https://github.com/Farhans123456/)

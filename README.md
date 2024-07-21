# Fullstack Developer Assignment

This project demonstrates integrating Next.js with Google Sheets using the Google Generative AI API. The application allows users to generate content using the AI API and store the generated content in a Google Sheet.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/fullstack-developer-assignment.git
    cd fullstack-developer-assignment
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root of the project and add the following environment variables:
    ```env
    GEMINI_API_KEY=your_gemini_api_key
    GOOGLE_CLIENT_EMAIL=your_google_client_email
    GOOGLE_PRIVATE_KEY=your_google_private_key
    ```

## Running the Application

1. Start the development server:
    ```bash
    npm run dev
    ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

fullstack-developer-assignment/
├── app/
│ ├── api/
│ │ ├── generate/
│ │ │ └── route.ts
│ │ └── get-sheet-data/
│ │ └── route.ts
│ ├── favicon.ico
│ ├── globals.css
│ ├── layout.tsx
│ └── page.tsx
├── lib/
│ └── googleSheet.ts
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.ts
└── tsconfig.json


## Code Walkthrough

### API Routes

#### `app/api/generate/route.ts`

Handles generating content using the Google Generative AI API and appending the result to a Google Sheet.

#### `app/api/get-sheet-data/route.ts`

Fetches data from the Google Sheet.

### Frontend

#### `app/page.tsx`

The main page where users can input a prompt, generate content, and view the Google Sheet data.

### Google Sheets Integration

#### `lib/googleSheet.ts`

Contains functions to interact with Google Sheets:
- `appendToSheet` - Appends generated content to the sheet.
- `readFromSheet` - Reads data from the sheet.

## URL of Google Spreadsheet

[https://docs.google.com/spreadsheets/d/19txWlEpGEMiBjW9oLyYJ87mHp67ZRCXdkPTEBTWXP-g/edit?gid=0#gid=0](https://docs.google.com/spreadsheets/d/19txWlEpGEMiBjW9oLyYJ87mHp67ZRCXdkPTEBTWXP-g/edit?gid=0#gid=0)

## Deployment

Had some issues with GOOGLE_PRIVATE_KEY env variable while deploying it to vercel, due to project deadlines am submitting without deploying, am trying to solve the issue meanwhile. (THE PROJECT WORKS FLAWLESSLY LOCALLY)
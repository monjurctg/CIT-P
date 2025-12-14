# Portfolio Subproject 3 - Frontend

This is the React frontend for the Movie Application. It connects to the backend service (Subproject 2) and The Movie Database (TMDB).

## Features
- **Browse Movies & People**: Search, filter, and view detailed information.
- **User Authentication**: Register and Login functionality.
- **Integration**: Fetches data from internal backend and external TMDB API.
- **Responsive Design**: Built with React Bootstrap, following the layout references.

## Setup Instructions

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Configuration**
    - Update `src/api/apiClient.js` with your Backend URL.
    - Update `src/api/tmdbApi.js` with your TMDB API Key.

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Build provided for Production**
    ```bash
    npm run build
    ```

## Architecture
- **Presentation Layer**: React Components (`src/components`, `src/pages`)
- **Business Logic Layer**: Domain Models (`src/domain`)
- **Data Access Layer**: API Services (`src/api`)

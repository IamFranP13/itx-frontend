# Frontend Technical Assessment

A Single Page Application (SPA) built with React for browsing and managing a mobile device catalog. This project focuses on **scalable architecture**, **performance**, and a **robust user experience**, strictly adhering to the requested functional and persistence requirements.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation & Execution

1.  **Clone and install dependencies:**
    ```bash
    npm install
    ```

2.  **Start development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

3.  **Run Linter:**
    ```bash
    npm run lint
    ```

---

## 🏗️ Architecture & Technical Decisions

The project follows a component-based architecture with a strict **Separation of Concerns (SoC)** for business logic and data management.

### 1. Cache & Persistence Strategy (Service Layer)
To meet the mandatory **1-hour expiration requirement** and minimize redundant network requests, a two-layer strategy was implemented:

*   **`storage.js` (Low Level):** A wrapper around `localStorage` that handles JSON serialization and validates the data timestamp against the expiration time.
*   **`cache.js` (Strategy Pattern):** A service implementing the *Cache-Aside* pattern. It intercepts requests, checks `storage` for valid fresh data, and decides whether to serve local data or fetch from the network.
    *   *Benefit:* This decouples the UI components from the data origin logic, making the views agnostic to where the data comes from.

### 2. State Management (Context API)
**React Context** (`CartContext`) was chosen to manage the shopping cart state.
*   **Stateless API Challenge:** The provided API does not maintain session state (it always returns `count: 1` on successive requests).
*   **Solution (Optimistic UI):** An optimistic update logic with local backup was implemented. While the mandatory POST request is sent to the server to fulfill the requirement, the Context manages the counter increment on the client side to ensure a consistent and reliable UX.

### 3. Routing & Navigation
**React Router v6** is used, implementing **Nested Routes** and **Layouts**.
*   The `Layout` component acts as the main wrapper, ensuring elements like the `Header` persist between navigation events without unnecessary re-renders.
*   The **Breadcrumb** is performance-oriented: it utilizes cached data to resolve the product name in the detail view without triggering extra network requests.

### 4. Code Quality & Typing
Despite the restriction on **not using TypeScript**, type safety and data integrity were prioritized via:
*   **PropTypes:** Runtime validation for all components.
*   **Mappers (Adapter Pattern):** A transformation layer (`mappers.js`) is used to normalize API responses. This creates a firewall against `null` or `undefined` values and fixes data inconsistencies (e.g., handling the known API typo `secondaryCmera`).

---

## 📂 Project Structure

```text
src/
├── components/          # Atomic Design (UI)
│   ├── atoms/           # Base components (Button, Image)
│   ├── molecules/       # Compound components (Breadcrumbs, SearchBar)
│   └── organisms/       # Complex blocks (Header, ProductCard)
│   └── layout/          # Global visual structure
├── context/             # Global State (Cart)
├── hooks/               # Custom Hooks (Business Logic & UI binding)
├── pages/               # Main Views
├── services/            # External communication & Persistence
│   ├── api.js           # HTTP Client
│   ├── cache.js         # Caching Strategy
│   └── storage.js       # LocalStorage + Expiration Logic
└── utils/               # Helpers & Mappers
```
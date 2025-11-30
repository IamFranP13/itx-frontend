# Frontend Technical Assessment

A Single Page Application (SPA) built with React for browsing and managing a mobile device catalog. This project prioritizes **scalable architecture**, **performance**, and **data integrity**, strictly adhering to the requested functional and persistence requirements.

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

3.  **Run Tests:**
    ```bash
    npm run test
    ```

4.  **Run Linter:**
    ```bash
    npm run lint
    ```

---

## 🏗️ Architecture & Technical Decisions

The project follows a component-based architecture with a strict **Separation of Concerns (SoC)**.

### 1. Service Layer & Caching Strategy
To meet the mandatory **1-hour expiration requirement** and optimize performance, a two-layer persistence strategy was implemented:

*   **`storage.js` (Low Level):** A wrapper around `localStorage` that handles JSON serialization and strictly validates the data timestamp against the 1-hour expiration window.
*   **`cache.js` (Strategy Pattern):** A service implementing the *Cache-Aside* pattern. It intercepts data requests, checks `storage` for valid fresh data, and decides whether to serve local data or fetch from the network. This decouples UI components from data sourcing logic.

### 2. State Management (Context API)
**React Context** (`CartContext`) is used to manage the global shopping cart state.
*   **Challenge:** The API is stateless (returns `count: 1` on successive requests).
*   **Solution (Optimistic UI):** An optimistic update logic with local backup was implemented. The application manages the counter increment on the client side while still performing the mandatory server-side calls, ensuring a consistent user experience.

### 3. Business Logic & Robustness
The application implements defensive programming practices to ensure stability:
*   **Price Validation:** The `ProductDetail` view implements a Guard Clause that disables the "Add to Cart" action if the API returns a product without a price, providing clear feedback to the user ("Not Available").
*   **Adapter Pattern (Mappers):** A transformation layer (`mappers.js`) normalizes API responses. This acts as a firewall against `null`/`undefined` values and fixes data inconsistencies (e.g., handling the known API typo `secondaryCmera`).

### 4. Routing
**React Router v6** is used with **Nested Routes** and **Layouts**.
*   The `Layout` component preserves the `Header` state between navigation events.
*   The **Breadcrumb** logic is optimized to resolve product names using cached data, avoiding redundant network requests.

---

## ✅ Testing Strategy

Testing focuses on **Critical Business Logic** rather than implementation details. **Vitest** is used as the test runner.

*   **Persistence (`storage.test.js`):** Verifies that data expires correctly after 1 hour (Time manipulation tests).
*   **Data Integrity (`mappers.test.js`):** Ensures the application doesn't crash on malformed API data and verifies typo fixes.
*   **Business Rules (`ProductDetail.test.jsx`):** Validates that users cannot add products with missing prices to the cart.
*   **UI Logic (`useSearch.test.js`):** Tests the filtering algorithms isolated from the view.

---

## 📂 Project Structure

```text
src/
├── components/          # Atomic Design (UI components)
├── context/             # Global State (CartContext)
├── hooks/               # Custom Hooks (Logic & UI binding)
├── pages/               # Main Views (ProductList, ProductDetail)
├── services/            # External communication & Persistence
│   ├── api.js           # HTTP Client
│   ├── cache.js         # Caching Strategy
│   └── storage.js       # LocalStorage + Expiration Logic
├── test/                # Unit & Integration Tests
└── utils/               # Helpers & Mappers
```

---

## 🔮 Future Improvements

1.  **TypeScript Migration:** To enhance static type safety and Developer Experience (DX).
2.  **Debounced Search:** Implement debouncing for the search input to handle larger datasets efficiently.
3.  **E2E Testing:** Add Cypress/Playwright for full user flow validation.

---

*Project developed with React 19, Vite, and Vitest.*
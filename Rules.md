# Engineering Rules & Guidelines

## 1. What to Use

- **Next.js App Router**: Leverage the `app/` directory structure with nested layouts and Route Handlers (`app/api/`).
- **Client vs. Server Components**: Default to Server Components for performance and SEO; mark components with `"use client"` only when managing state, event listeners, or browser APIs.
- **Tailwind CSS Utility Classes**: Use consistent Tailwind utility classes. Maintain custom brand colors defined in `tailwind.config.ts` (`dlc-blue`, `dlc-accent`, etc.).
- **TypeScript Strict Typing**: Ensure all props, API requests, and data models have explicit TypeScript interfaces.
- **Lucide React Icons**: Use consistent, clean SVG icons from `lucide-react` for UI accents, navigation, and indicators.
- **Modern Web Guidance for Performance**:
  - Always apply `fetchPriority="high"` on LCP hero candidate images.
  - Never pair `fetchPriority="high"` with `loading="lazy"`.
  - Use `loading="lazy"` exclusively on below-the-fold content.

---

## 2. What to Avoid

### Prohibited Libraries & Patterns
- **Do NOT install heavy CSS-in-JS runtimes** (such as styled-components or emotion) that degrade Next.js App Router hydration performance.
- **Do NOT introduce redundant UI component libraries** (e.g., Material UI, Ant Design) that inflate bundle sizes and conflict with Tailwind styling.
- **Do NOT use deprecated HTML attributes** such as `importance` or `loading="auto"`.
- **Do NOT use `fetchpriority="auto"`**; omit the attribute when using default browser heuristics.

### Strict Error Handling & Resilience
- **Zero-Crash Policy**: Wrap all asynchronous operations, data fetches, and file I/O operations inside `try/catch` blocks with graceful fallback UI states.
- **Form Validation**: Always validate phone numbers (10 digits) and mandatory input fields client-side before dispatching network requests.
- **API Response Standards**: Always return standardized JSON schemas from API routes:
  ```json
  { "success": true, "message": "...", "data": { ... } }
  ```
  And on failure:
  ```json
  { "success": false, "message": "Clear user-facing error message" }
  ```

### Boundaries for AI Assistants
- **Preserve Brand Integrity**: Never alter the core brand colors (`#0C59D4`, white, slate, and amber accents) or remove Hindi trade nomenclature (*राजमिस्त्री, बढ़ई, प्लंबर, etc.*).
- **Preserve Documentation Integrity**: Update `Memory.md` and related documentation upon completing significant milestones or architectural changes.
- **No Blind Overwrites**: When adding new features, extend the existing component modularity without destroying tested functionality.

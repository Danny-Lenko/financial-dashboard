# MVP Detailed Flows

> **Goal:** detailed specifications for each user flow with success/error states.
>
> **Audience:** developers and QA engineers.
>
> **Note:** MVP uses pre-seeded mock data (2 years of transactions) and local storage persistence (no backend).

---

> Scope rule: if a feature does not fit this flow, it should not be prioritized for the current phase.

---

## 1) Global App Shell / Navigation

### 🎯 User Goal
Navigate between core pages and understand available product surface.

### 👁️ What user sees
- Top navigation with routes: Overview, Transactions, Categories, Accounts (**disabled in MVP**), Wallets (**disabled in MVP**).
- Utility icons (Settings, Notifications) shown as **disabled** in MVP.
- Profile avatar (**not functional in MVP**).

### 🖱️ What user can do
- Navigate to available pages (Overview, Transactions, Categories).
- Attempt to click disabled items (blocked with tooltip context).

### ✅ Success
- Route content loads in the main area.
- Active route is highlighted in navigation.

### ❌ Errors
- Route-level error boundary shows status/message or stack for unexpected runtime errors.

---

## 2) Overview (Main Dashboard) (`/`)

### 🎯 User Goal
Review the financial summary for the selected period and quickly start transaction actions.

### 👁️ What user sees
- Greeting block.
- Period selector with presets and month/year picker.
- Cashflow cards (Income, Expense, Balance) with trend/average context.
- Add transaction actions (`Add income` / `Add expense`).
- Expenses by category pie chart + category percentage list.
- Last transactions table (latest records).
  - Columns: Vendor, Method, Date, Amount.
  - Row 3-dot menu: [Details] [Edit] [Delete].

### 🖱️ What user can do
- Switch active period (month or year).
- Open Add Transaction flow by selecting income/expense action.
- Open row actions from the recent transactions menu.

### ✅ Success
- All widgets recalculate for selected period and render consistent values.
- Active period remains consistent where shared period state is used.

### ❌ Errors
- If a period has no expenses, the expense block should show an explicit empty state (preferred) instead of silently disappearing.

---

## 3) Add Transaction Flow (`/transactions/add/:type`)

### 🎯 User Goal
Record a new income or expense with required details.

### 👁️ What user sees
- Shared layout with type toggle (income/expense), active type highlighted.
- Form fields:
  - Vendor (text, required)
  - Amount (number, required)
  - Date (date picker, required)
  - Payment method (Cash / Card / Bank Transfer, required)
  - Category (expense only, required for expenses)
  - Description (Markdown editor, optional)
- Submit button: `Add Income` or `Add Expense`.

### 🖱️ What user can do
- Fill and validate transaction data.
- Switch type; form context updates.
- Submit transaction (form resets for next entry).
- Click `[Undo]` in success toast to remove the just-added transaction.

### ✅ Success
- Transaction stored in Redux and persisted to local storage.
- Success toast appears with undo affordance.
- Form resets to defaults after successful submit.
- User remains on add form; dashboard data updates via shared store.

### ❌ Errors
- Validation errors shown inline for required/invalid fields.
- Invalid `:type` route redirects to `expense` variant.

---

## 4) Transaction Detail (`/transactions/:id`)

### 🎯 User Goal
View full details of one transaction.

### 👁️ What user sees
- Structured details with labeled fields:
  - Vendor, Amount, Date, Category (if expense), Payment Method
  - Description
- Planned actions for future increment: `[Edit]`, `[Delete]`.

### 🖱️ What user can do
- Review details.
- (Planned) open edit flow.
- (Planned) trigger delete flow.

### ✅ Success
- Transaction data resolved by ID from store and displayed.
- Fields are formatted consistently (date/currency/text).

### ❌ Errors
- If transaction ID is not found, preferred behavior is redirect to `/transactions` with an error toast.

---

## 5) Edit Transaction Flow (`/transactions/:id/edit`) — Planned MVP increment

### 🎯 User Goal
Update an existing transaction.

### 👁️ What user sees
- Edit form pre-filled with transaction values.
- Editable fields: type, vendor, amount, date, category (if expense), method, description.
- Actions: `[Save Changes]`, `[Cancel]`.

### 🖱️ What user can do
- Update values and save.
- Cancel edit.
- If dirty and cancel/back is pressed, confirm discard.

### ✅ Success
- Transaction updated in Redux + local storage.
- Success toast supports quick follow-up action (view/undo semantics).
- Affected period widgets recompute.

### ❌ Errors
- Inline validation errors.
- Not found ID redirects to `/transactions` with toast.

---

## 6) Delete Transaction Flow — Planned MVP increment

### 🎯 User Goal
Delete a transaction safely.

### 👁️ What user sees
- `[Delete]` button (from detail context).
- Confirmation dialog with `[Cancel]` and `[Delete]`.

### 🖱️ What user can do
- Start deletion, confirm, or cancel.

### ✅ Success
- Transaction removed from Redux + local storage.
- Success toast displayed.
- Redirect target should be consistent (recommended: `/transactions` for task continuity).

### ❌ Errors
- If transaction no longer exists, show error toast and redirect.

---

## 7) Transactions Table (`/transactions`) — Planned MVP increment

### 🎯 User Goal
Browse all transactions for selected period.

### 👁️ What user sees
- Transactions table with newest records first.
- Columns: Vendor, Method, Date, Amount.
- Row menu: [Details] [Edit] [Delete].
- Shared period selector.
- Incremental loading control (e.g., `[Show More]`) when needed.

### 🖱️ What user can do
- Change period and filter table.
- Open row actions.
- Load more rows incrementally.

### ✅ Success
- Correct period-scoped transaction list is displayed.
- Load-more control reflects loaded vs total count.

### ❌ Errors
- Empty period shows explicit empty state (`No transactions in this period`).

---

## 8) Categories Analytics (`/categories`) — Planned MVP increment

### 🎯 User Goal
Compare expense distribution across two periods.

### 👁️ What user sees
- Two side-by-side expense charts:
  - Chart 1: active period
  - Chart 2: comparison period
- Each chart includes pie visualization + category percentages.

### 🖱️ What user can do
- Change period for chart 1.
- Change period for chart 2 independently.
- Compare patterns visually.

### ✅ Success
- Both charts recompute when their period changes.
- User can perform custom comparisons (e.g., YoY same month).

### ❌ Errors
- If no expense data for selected period, show clear empty message.

---

## 9) Placeholder Pages (Current MVP State)

### Accounts (`/accounts`)
- Disabled in navigation.

### Wallets (`/wallets`)
- Disabled in navigation.

### ✅ Success
- Disabled routes are presented as unavailable without navigation breaks.

### ❌ Errors
- No domain logic yet (future phase).

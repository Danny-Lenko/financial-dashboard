# Feature Specs (Implemented Features)

## 1) Feature name: App Shell & Route Navigation
### User story
As a user, I want a stable app shell with clear navigation so that I can move across available product areas.

### Business logic
- Routes are declared in central config and transformed into React Router objects.
- Navigation renders only routes marked `showInNav`.
- Some routes are intentionally disabled for MVP and shown as non-interactive controls.

### UI states
- **Loading:** route-level lazy loading fallback with backdrop + spinner.
- **Empty:** not applicable (shell always visible).
- **Success:** selected route highlighted and content rendered in outlet.
- **Error:** root error boundary renders route or runtime error info.

### Frontend (React / Next)
- **pages / routes:** `src/routes.tsx`, `src/config/router.config.tsx`, `src/components/layout/Layout.tsx`
- **components:** `NavbarDesktop`, `Navigation`, `MenuStack`, `Header`
- **state:** none (navigation metadata from static config)
- **API calls:** none

### Out of scope
- Permission-based menu visibility.
- Real settings/notifications interactions.
- Mobile-specific navigation patterns.

---

## 2) Feature name: Period Selection
### User story
As a user, I want to switch month/year period quickly so that all finance widgets reflect the timeframe I care about.

### Business logic
- Active period stored as `activeYear` + `activeMonth` in Redux.
- If `activeMonth === null`, period type is yearly.
- Month picker blocks future months and months before dataset start.
- Previous period selector powers trend comparison.

### UI states
- **Loading:** none (client-side state).
- **Empty:** when no transactions exist, start period defaults to current date.
- **Success:** all dependent selectors recompute based on active period.
- **Error:** invalid period payload is prevented via controlled actions/UI.

### Frontend (React / Next)
- **pages / routes:** embedded in Overview
- **components:** `HelloAndPeriodSection`, `PeriodButtonsStack`, `PeriodPicker`
- **state:** global Redux (`period` slice + selectors)
- **API calls:** none

### Out of scope
- Custom arbitrary date range (from/to).
- Server-side persisted period preferences.

---

## 3) Feature name: Cashflow Summary Cards
### User story
As a user, I want to see incomes, expenses, and balance for my selected period so that I understand my financial position immediately.

### Business logic
- Base data comes from initialized local monthly transactions.
- Cashflow per month is calculated with running balance from initial balance constant.
- Year mode returns average values across available months.
- Trend (%) compares active period against previous period.

### UI states
- **Loading:** none (derived selectors).
- **Empty:** missing period data returns zeros.
- **Success:** cards show formatted currency and trend/average chip.
- **Error:** none explicit; selector fallbacks prevent crash.

### Frontend (React / Next)
- **pages / routes:** embedded in Overview
- **components:** `CashflowSection`, `CashflowCard`, `AppChip`
- **state:** global Redux selectors (`cashflow` + `period`)
- **API calls:** none

### Out of scope
- Multi-currency support.
- Forecast/projection calculations.

---

## 4) Feature name: Expense Analytics
### User story
As a user, I want a category-level expense breakdown so that I can identify where most spending happens.

### Business logic
- Expenses are aggregated by predefined categories.
- Year mode returns average monthly category values.
- Percentages are computed and shown in list + pie chart.

### UI states
- **Loading:** none.
- **Empty:** if no expenses for period, section returns null/hidden.
- **Success:** pie slices and category rows reflect computed distribution.
- **Error:** none explicit; unknown category icon fallback is not implemented.

### Frontend (React / Next)
- **pages / routes:** embedded in Overview
- **components:** `ExpensesSection`, `PieChart`
- **state:** global Redux selectors (`expenses` + `period`)
- **API calls:** none

### Out of scope
- Drill-down by merchant.
- Interactive legend filters.

---

## 5) Feature name: Last Transactions Feed
### User story
As a user, I want to review my latest transactions so that I can quickly verify recent activity.

### Business logic
- Selector returns max 7 latest transactions for active period.
- Year mode flattens all months of selected year before sorting.
- Table column config controls formatting and cell rendering.

### UI states
- **Loading:** none.
- **Empty:** table renders headers and zero rows.
- **Success:** rows show normalized merchant/date/amount formatting and action menu.
- **Error:** none explicit.

### Frontend (React / Next)
- **pages / routes:** Overview widget; detail route at `/transactions/:id`
- **components:** `LastTransactionSection`, `LastTransactionsTable`, `TableMenu`, `TransactionDetail`
- **state:** global Redux selectors (`transactions`)
- **API calls:** none

### Out of scope
- Pagination and server-side filtering.
- Bulk actions.

---

## 6) Feature name: Add Transaction (Income / Expense)
### User story
As a user, I want to add income or expense with validation so that my dashboard data stays accurate.

### Business logic
- Shared schema validates all fields (Zod + React Hook Form).
- Expense requires category; income omits category.
- Amount normalized by type: expense becomes negative, income positive.
- Submission creates transaction ID, dispatches add action, shows toast with Undo.
- Undo action removes inserted transaction from month bucket.

### UI states
- **Loading:** submit button disabled while submitting.
- **Empty:** default form values prefilled (including date for MVP testing).
- **Success:** success toast displayed and form reset.
- **Error:** inline validation errors for invalid/required fields.

### Frontend (React / Next)
- **pages / routes:** `/transactions/add/:type`
- **components:** `AddTransactionsLayout`, `TransactionsFormContent`, `AddRecordingSection`
- **state:** form local state + global Redux (`data` slice)
- **API calls:** none (local state only)

### Out of scope
- Editing existing transaction.
- Backend persistence/sync.
- File attachments/receipt OCR.

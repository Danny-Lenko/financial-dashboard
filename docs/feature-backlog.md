# Feature Backlog

| Feature | User value | Flow step | Depends on | Complexity | Priority | Status |
|---|---|---|---|---|---|---|
| App shell & navigation | High | Global navigation | Router config | Medium | P0 | Done |
| Dashboard overview composition | High | Overview | App shell | Medium | P0 | Done |
| Period selection (preset + month picker) | High | Overview | Redux period state | Medium | P0 | Done |
| Cashflow summary cards + trend | High | Overview | Data initialization, period selection | Medium | P0 | Done |
| Expense analytics (pie + percentages) | High | Overview | Data initialization, period selection | Medium | P0 | Done |
| Last transactions table | High | Overview | Data selectors, formatting utils | Medium | P0 | Done |
| Add transaction form (income/expense) | High | Add Transaction | Validation schema, data slice | High | P0 | Done |
| Transaction detail page | Medium | Transaction Detail | Last transactions list, selector by id | Low | P1 | Done |
| Undo transaction from toast | Medium | Add Transaction | Toast system, data remove action | Low | P1 | Done |
| Transactions index page content | Medium | Transactions | Existing transaction domain data | Low | P1 | Backlog |
| Categories page content | Medium | Categories | Expense category domain | Low | P1 | Backlog |
| Edit transaction flow | Medium | Transaction Detail | Add transaction form, route scaffold | Medium | P1 | Backlog |
| Accounts module | Low | Navigation | Account data model | Medium | P2 | Later |
| Wallets module | Low | Navigation | Wallet data model | Medium | P2 | Later |
| Settings pages (profile/preferences/security) | Low | Navigation utilities | Auth/preferences model | Medium | P2 | Later |
| Notifications center | Low | Navigation utilities | Notification model | Medium | P2 | Later |
| Auth & multi-user support | High | Cross-cutting | API/backend, protected routes | High | P2 | Later |

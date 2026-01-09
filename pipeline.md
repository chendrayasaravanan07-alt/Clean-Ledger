# DCA & FedEx Management System - Pipeline

## Tech Stack

### Frontend
- React.js – UI library for building interactive web pages.
- React Router v6 – Handles navigation and routing.
- Tailwind CSS – Utility-first CSS framework for styling.
- Lucide Icons – Lightweight icon library for buttons and UI.
- Recharts – For dashboards and charts.
- Browser File API – For CSV upload and export.

### Backend (Optional)
- Node.js + Express.js – Server for CSV upload, data processing, and APIs.
- CSV / JSON Handling – For parsing and storing data.
- Database (Optional) – MongoDB / PostgreSQL for persistent storage.

### Tools
- Git + GitHub – Version control.
- Vite / CRA – Project setup and build.
- Figma / PPT – UI mockups and visualization.

## User Roles

### FedEx Admin
- Upload CSV data of customers.
- View and filter customer data.
- Update customer status and priority.
- Track DCA follow-ups and SLA status.

### DCA Manager
- Dashboard with case statistics (total, active, closed).
- View assigned cases.
- Track SLA alerts and breach risks.
- Add and manage case notes / audit logs.

## Data Flow / Pipeline

### CSV Upload (FedEx Admin)
1. Admin uploads CSV file with customer data.
2. React reads CSV → stores data in `customerData` state.
3. CSV data available to all dependent components (View, Update, DCA Status).

### Data Processing
- Filter by status (`Unpaid`, `Partially Paid`, `All`).
- Display in table with priority tags (`High`, `Medium`, `Low`).
- Export filtered data as CSV.

### DCA Dashboard
- Displays summary stats: total cases, active cases, closed cases.
- Bar chart visualization using Recharts.
- Quick action cards: navigate to Alerts / Case Notes.

### SLA Alerts
- Identify customers at risk of SLA breach.
- Highlight critical alerts based on `slaBreachDays`.
- Export alerts as CSV for reporting.

### Case Notes
- Track all DCA interactions per case.
- Add new notes with type, author, timestamp.
- Search & filter notes by case ID, customer name, or content.

## Navigation Flow
Landing Page → Role Selection → [FedEx Admin] → Dashboard → View / Update / DCA Status  
Landing Page → Role Selection → [DCA Manager] → Dashboard → View Cases / Alerts / Case Notes

## Optional Backend / API Flow
CSV Upload → Backend API → Validate & Store → Return JSON → Frontend → Fetch JSON → Render Tables / Charts  
DCA Actions → API → Update Case Notes / SLA Status

## Deployment (Optional)
- Frontend: Vercel / Netlify (React SPA)
- Backend: Heroku / Railway / AWS Lambda
- Database: MongoDB Atlas / Supabase

## Visual Workflow (Mermaid Diagram)
```mermaid
flowchart TD
    A[Landing Page] --> B[Role Selection]
    B -->|FedEx Admin| C[Dashboard]
    C --> D[View Customer Data]
    C --> E[Update Customer Data]
    C --> F[DCA Status]
    B -->|DCA Manager| G[DCA Dashboard]
    G --> H[View Cases]
    G --> I[SLA Alerts]
    G --> J[Case Notes]
    D --> K[Filter / Export CSV]
    I --> L[Export Alerts CSV]
    J --> M[Add / Search Notes]
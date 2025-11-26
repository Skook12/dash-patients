# Dash Patients - Patient Management Dashboard

A modern, responsive patient management dashboard built with React, TypeScript, and Vite. This application allows healthcare professionals to view, filter, and manage patient visit records with an intuitive interface.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Key Components](#key-components)
- [Development](#development)

## ✨ Features

- **Patient List Management**: View all patients in a sortable, paginated data table
- **Advanced Filtering**: Filter patients by:
  - Name (text search)
  - CPF (Brazilian ID number)
  - Status (All, Pending, In Day)
  - Visit frequency (in days)
- **Visit Status Tracking**: Automatically calculates and displays patient visit status:
  - **Pending**: Patient's last visit date + frequency has passed
  - **In Day**: Patient is within the visit frequency period
- **Update Visit Dates**: Update patient visit dates through an intuitive dialog interface
- **Dark/Light Theme**: Built-in theme switching with persistent storage
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Real-time Updates**: Automatic data refresh after updates using React Query

## 🛠 Tech Stack

### Core Technologies
- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.4** - Build tool and dev server
- **React Router 7.9.6** - Client-side routing

### State Management & Data Fetching
- **TanStack React Query 5.90.10** - Server state management and caching
- **React Context API** - Global app state (page title)

### UI Components & Styling
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives:
  - Dialog, Dropdown Menu, Popover, Select, Tooltip, etc.
- **Lucide React** - Icon library
- **shadcn/ui** - Pre-built component library

### Form Management
- **React Hook Form 7.66.1** - Form state management
- **Zod 4.1.13** - Schema validation
- **@hookform/resolvers** - Zod integration for React Hook Form

### Data Display
- **TanStack React Table 8.21.3** - Powerful table component
- **date-fns 4.1.0** - Date formatting and manipulation
- **react-day-picker 9.11.2** - Date picker component

### Additional Libraries
- **Sonner 2.0.7** - Toast notifications
- **class-variance-authority** - Component variant management
- **clsx & tailwind-merge** - Conditional class utilities

## 📁 Project Structure

```
dash-patients/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and static files
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── app-sidebar.tsx
│   │   ├── data-table.tsx
│   │   ├── date-picker.tsx
│   │   ├── update-visit-dialog.tsx
│   │   └── ...
│   ├── contexts/           # React Context providers
│   │   └── app-context.tsx
│   ├── core-components/   # Feature-specific components
│   │   ├── filter-patients.tsx
│   │   ├── header.tsx
│   │   └── main-component.tsx
│   ├── data-const/        # Constants and configurations
│   │   ├── columns.tsx    # Table column definitions
│   │   └── menu.ts        # Sidebar menu items
│   ├── hooks/             # Custom React hooks
│   │   ├── use-mobile.ts
│   │   └── use-patient-filters.ts
│   ├── http/              # API service functions
│   │   └── patients/
│   │       ├── patients-get-service.ts
│   │       └── patients-update-service.ts
│   ├── lib/               # Utility functions
│   │   └── utils.ts
│   ├── models/            # TypeScript type definitions
│   │   └── patients.ts
│   ├── pages/             # Page components
│   │   ├── layout-main.tsx
│   │   └── page-patients.tsx
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── components.json        # shadcn/ui configuration
├── eslint.config.js       # ESLint configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- pnpm (or npm/yarn)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dash-patients
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```
   Or with npm:
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```
   Or with npm:
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

## 💻 Usage

### Viewing Patients
- The main page displays all patients in a data table
- Each row shows:
  - Patient name
  - CPF (formatted as XXX.XXX.XXX-XX)
  - Last visit date
  - Visit frequency (in days)
  - Status badge (Pending/In Day)
  - Action button to update visit date

### Filtering Patients
Use the filter panel at the top of the page to:
- **Search by name**: Type part of the patient's name
- **Search by CPF**: Enter the CPF number (with or without formatting)
- **Filter by status**: Select "Todos", "Pendente", or "Em dia"
- **Filter by frequency**: Enter the visit frequency in days

Filters work in combination - all active filters are applied together.

### Updating Visit Dates
1. Click the calendar icon button in the actions column
2. Select a new date and time using the date picker
3. Click "Salvar" to update
4. The table will automatically refresh with the new data

### Theme Switching
- Use the theme toggle in the header to switch between light and dark modes
- Your preference is saved in localStorage

## 🔌 API Integration

The application connects to a REST API for patient data management.

### Base URL
```
https://tatico.spocws.icu/teste/followups_261e
```

### Endpoints

#### GET - Fetch All Patients
```typescript
GET /teste/followups_261e
```
Returns an array of patient objects.

**Response Example:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "cpf": "12345678901",
    "active": true,
    "last_verified_date": "2024/01/15 10:30:00",
    "verify_frequency_in_days": 30
  }
]
```

#### PATCH - Update Visit Date
```typescript
PATCH /teste/followups_261e/{id}
Content-Type: application/json

{
  "last_verified_date": "2024/01/20 14:00:00"
}
```

### Data Models

#### Patient
```typescript
type Patient = {
  id: number;
  name: string;
  cpf: string;
  active: boolean;
  last_verified_date: string;  // Format: "yyyy/MM/dd HH:mm:ss"
  verify_frequency_in_days: number;
};
```

#### Update Visit Date
```typescript
type UpdateVisitDate = {
  id: number;
  last_verified_date: string;  // Format: "yyyy/MM/dd HH:mm:ss"
};
```

## 🧩 Key Components

### DataTable
A powerful, sortable table component built on TanStack React Table. Displays patient data with custom cell renderers for formatting and status badges.

### PatientFilters
A comprehensive filter form component that allows filtering by multiple criteria. Uses React Hook Form with Zod validation for type-safe form handling.

### UpdateVisitDialog
A modal dialog for updating patient visit dates. Includes:
- Date and time picker
- Form validation
- Loading states
- Success/error toast notifications

### AppSidebar
Responsive sidebar navigation component with collapsible menu items.

### Header
Application header with:
- Page title (managed by AppContext)
- Theme toggle
- Responsive design

## 🧪 Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linter
pnpm lint
```

### Code Organization

- **Components**: Reusable UI components in `src/components/`
- **Pages**: Route-level components in `src/pages/`
- **Hooks**: Custom React hooks in `src/hooks/`
- **Services**: API service functions in `src/http/`
- **Types**: TypeScript type definitions in `src/models/`
- **Constants**: Static data and configurations in `src/data-const/`

### State Management

- **Server State**: Managed by TanStack React Query
  - Automatic caching
  - Background refetching
  - Optimistic updates
- **Client State**: 
  - React Context for global app state (page title)
  - Local state for component-specific data
  - React Hook Form for form state

### Styling Approach

- **Tailwind CSS**: Utility-first CSS framework
- **CSS Variables**: For theme customization
- **Responsive Design**: Mobile-first approach with breakpoints
- **Component Variants**: Using class-variance-authority for component styling

### Type Safety

The project uses TypeScript with strict type checking. All API responses, component props, and form data are fully typed.

## 📝 Notes

- The application uses Portuguese (PT-BR) for UI text
- Date format used by the API: `yyyy/MM/dd HH:mm:ss`
- CPF is formatted for display but stored/compared without formatting
- Visit status is calculated client-side based on `last_verified_date` + `verify_frequency_in_days`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using React, TypeScript, and modern web technologies.

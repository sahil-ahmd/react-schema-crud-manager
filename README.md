# User Management Dashboard

A modern, responsive React + TypeScript dashboard for managing user records. Built with **Vite** and **Tailwind CSS**, featuring a 2x2 grid form, automated avatars with initials, and a mock REST API integration.

---

## 🚀 Setup Instructions

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed on your machine.

### 2. Installation
```bash
# Clone the repository
git clone [https://github.com/your-username/delta-sigma-ventures.git](https://github.com/your-username/delta-sigma-ventures.git)

# Navigate to the project folder
cd delta-sigma-ventures

# Install dependencies
npm install
```

### 3. Running Locally
You need to run two separate processes to have a full experience:
- Terminal A (Mock Backend): Starts the JSON server.
```bash
npm run server
```

- Terminal B (Frontend): Starts the React development server.
```bash
npm run dev
```

## 🛠 Adding New Fields
This project is designed to be easily extensible. To add a new field (e.g., "Department") to the system:

- Update the Type: Add the property to the User interface in `src/types/user.ts`.
- Update the Form Config: Add a new object to the userFormFields array in `UserForm.tsx`:
```ts
{ name: "department", label: "Department", type: "text" }
```
- Update the Table: Add a corresponding <th> (header) and <td> (data cell) in `UserList.tsx`.

## 💡 Design Decisions & Assumptions
### Dynamic Avatars
Every user is assigned a visual avatar generated from their initials. This is calculated as: `$Initials = FirstName[0] + LastName[0]$` The avatars use a gradient background to provide a modern UI feel without requiring external image hosting.

### Optimistic UI State
Because the production mock API (My JSON Server) is read-only, I implemented Optimistic State Updates. When a user is created, edited, or deleted, the local React state is updated immediately. This ensures the dashboard remains interactive and reflects changes even when the backend storage is static.

## 🔌 Mock API Setup (JSON-Server)
This project utilizes json-server to simulate a real-world RESTful environment.

- Data Source: `db.json` acts as the persistent storage during local development.
- Deployment: For the live preview, the app connects to My JSON Server.
- Behavioral Note: In the hosted version, the API simulates success (200 OK) for `POST`, `PUT`, and `DELETE` requests. However, since GitHub repositories are static, the data will reset to the original `db.json` state upon page refresh.

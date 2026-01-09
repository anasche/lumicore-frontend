# LumiCore Frontend – Data Cleaning Dashboard

This project is a Next.js 16.1.1 (App Router)** frontend application that interacts with the LumiCore Backend API to fetch, clean, review, and submit normalized data.

The frontend focuses on **user experience, data visibility, and feedback, while all validation and cleaning logic is handled securely by the backend.

---

## 🚀 Features

- Fetch cleaned data from backend APIs
- Submit cleaned data for validation
- Display API responses clearly
- Toast notifications for success and error messages
- SWR-based data fetching with caching and revalidation
- Environment-based configuration
- App Router–based architecture (Next.js 16.1.1)

---

## 🛠 Tech Stack

- Next.js **16.1.1**
- React
- JavaScript / TypeScript
- SWR
- Fetch API
- React Hot Toast / Sonner
- Tailwind CSS (if used)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/lumicore-frontend.git
cd lumicore-frontend
```

---

### 2️⃣ Install dependencies

```bash
npm install
# or
yarn install
```

---

### 3️⃣ Environment variables setup

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

---

### 4️⃣ Run the development server

```bash
npm run dev
# or
yarn dev
```

The application will be available at:

```
http://localhost:3000
```

---

## 🔐 Environment Variables

### `.env.example`

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

| Variable | Description |
|--------|------------|
| NEXT_PUBLIC_API_BASE_URL | Base URL of the backend API |

---

## 🔌 API Integration

The frontend never talks directly to the external LumiCore API.  
All communication happens through the backend.

### Backend Endpoints Used

- `GET /api/raw-data/?batch=1`
- `GET /api/cleaned-data/?batch=1`
- `POST /api/submit/`

---

## 🔔 Toast Notifications

Toast notifications provide immediate feedback on submissions.

```ts
import { toast } from "react-hot-toast";

toast.success("Submission accepted");
toast.error("Submission failed");
```

Example backend response:

```json
{
  "success": true,
  "message": "Submission accepted",
  "validation": {
    "score": 92,
    "issues_found": 2
  }
}
```

---

## 🧠 Design Approach

- Backend-controlled validation and cleaning
- Frontend focused on UX and presentation
- Reusable SWR hooks for API communication
- App Router–based file structure
- Environment-driven configuration

---

## 🛡 Reliability & UX

- Loading states for API calls
- Graceful error handling
- Toast-based user feedback
- Cached and revalidated API responses via SWR

---

## ✅ Summary

This frontend application complements the LumiCore backend by providing a clean, responsive UI for interacting with the data cleaning pipeline, while keeping all business logic and validation securely on the server.

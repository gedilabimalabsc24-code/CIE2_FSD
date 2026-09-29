# RoomieSync – Smart Roommate Finder

> "Find a roommate who matches your lifestyle."

**CS3301 – Full Stack Development | CIE-2 Assignment**

---

## 🗂 Project Structure

```
RoomieSync/
├── client/                     ← React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          (Functional)
│   │   │   ├── Footer.jsx          (Functional)
│   │   │   ├── RoommateCard.jsx    (Functional – Reusable)
│   │   │   ├── SearchFilter.jsx    (Functional – Mod 2)
│   │   │   └── CompatibilityBadge.jsx (Functional – Mod 1)
│   │   ├── pages/
│   │   │   ├── Home.jsx            (Functional)
│   │   │   ├── FindRoommates.jsx   (Functional – Parent)
│   │   │   ├── RoommateDetails.jsx (Functional)
│   │   │   ├── CreateProfile.jsx   (Functional)
│   │   │   ├── SavedRoommates.jsx  (Functional)
│   │   │   └── AboutRoomieSync.jsx (CLASS COMPONENT ✅)
│   │   ├── styles/App.css
│   │   ├── App.jsx                 (Routes + lifted state)
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── server/                     ← Express.js Backend
    ├── data/roommates.js       (10 sample profiles)
    ├── routes/roommateRoutes.js
    ├── server.js
    └── package.json
```

---

## 🚀 How to Run

### Step 1 – Start the Backend (Express)

```bash
cd server
npm install        # Only needed first time
npm start          # Runs on http://localhost:5000
```

### Step 2 – Start the Frontend (React)

Open a **new terminal**:

```bash
cd client
npm install        # Only needed first time
npm run dev        # Runs on http://localhost:5173
```

> Open **http://localhost:5173** in your browser.

---

## 🌐 API Endpoints

| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| GET    | `/api/roommates`       | Get all 10 roommates     |
| GET    | `/api/roommates/:id`   | Get single roommate by ID|
| POST   | `/api/roommates`       | Add new roommate profile |

---

## 📄 Pages & Routes

| Route                | Component         | Description                  |
|----------------------|-------------------|------------------------------|
| `/`                  | Home              | Landing page + featured cards|
| `/find-roommates`    | FindRoommates     | Browse + filter roommates    |
| `/roommate/:id`      | RoommateDetails   | Full profile + Connect btn   |
| `/create-profile`    | CreateProfile     | Form to add your profile     |
| `/saved`             | SavedRoommates    | Your saved profiles          |
| `/about`             | AboutRoomieSync   | About page (Class Component) |

---

## ✅ React Concepts Demonstrated

| Concept            | Where Used |
|--------------------|------------|
| Class Component    | `AboutRoomieSync.jsx` (constructor, this.state, setState, lifecycle) |
| Functional Comp.   | All other pages and components |
| Props              | Parent→RoommateCard (name, age, budget, compat, onSave, isSaved) |
| useState           | Filters, form fields, saved list, connect state, menu toggle |
| useEffect          | Fetch roommates on page load (Home + FindRoommates + RoommateDetails) |
| Event Handling     | onClick (save/connect), onChange (filters/form), onSubmit (form) |
| Form Handling      | CreateProfile – controlled inputs with useState |
| React Router       | 6 routes, useParams, useNavigate, NavLink |
| Parent–Child       | FindRoommates → SearchFilter + RoommateCard (props + callbacks) |
| Responsive UI      | CSS media queries (desktop / tablet / mobile) |

---

## 🔧 Modifications

### Modification 1 – Compatibility Score
- Simple point-based algorithm (budget ±20, location ±20, sleep ±15, food ±15, smoking ±15, pets ±15)
- Shown on every `RoommateCard` and on `RoommateDetails` with a progress bar
- `CompatibilityBadge` component: 🟢 ≥80% | 🟡 ≥55% | 🔴 <55%

### Modification 2 – Search & Lifestyle Filter
- `SearchFilter` component on Find Roommates page
- Filter by: name/location (text), max budget (number), smoking (dropdown), pets (dropdown)
- Filters applied client-side in `FindRoommates` using `useState`

### Bonus – Save Roommate
- Heart button on every card
- `savedRoommates` state lifted to `App.jsx` and shared across all pages
- Saved Roommates page shows saved profiles or an empty state

---

## 🎨 Design

- Color theme: Purple (`#6c63ff`) + Teal (`#43c6ac`) + Pink (`#ff6584`)
- Responsive grid cards, pill badges, rounded corners
- CSS variables for consistent theming
- Mobile hamburger menu

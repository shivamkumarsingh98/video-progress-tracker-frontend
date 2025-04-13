# React + Vite

# SDE Intern Assignment – Lecture Video Progress Tracker

A full-stack application that accurately tracks how much of a lecture video a user has genuinely watched — not just if they played the video to the end. This project ensures unique viewing is tracked, prevents skipping, and supports persistent progress tracking and resume functionality.

---

## 🛠 Tech Stack

### Frontend:
- React.js
- HTML5 Video Player
- Axios
- Tailwind CSS (or any other CSS)

### Backend:
- Node.js
- Express.js
- MongoDB (or any other database)
- CORS
- Body-parser

---

## 📸 Features

###  Real Progress Tracking:
- Tracks only **newly watched segments** of the video.
- Prevents increase in progress if user re-watches or skips.
- Merges overlapping watched intervals to get accurate progress.

###  Persistent Progress:
- Stores progress and watched intervals in the database.
- Resumes video from the last watched position when the user logs in again.

###  Clean UI:
- A simple and intuitive video interface.
- Live percentage display of actual progress.
- Auto-resume video player on reload or revisit.

---

## 📂 Folder Structure
project-root/ ├── backend/ # Express backend │ ├── controllers/ │ ├── models/ │ ├── routes/ │ └── server.js ├── frontend/ # React frontend │ ├── src/ │ ├── public/ │ └── package.json ├── README.md # This file └── .gitignore

## Run Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev
# or
npm start


## Live Demo
[Insert live URL here]

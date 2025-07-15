# 🏡
**cabin-booking** is a cabin booking platform originally created by [Jonas Schmedtmann](https://github.com/jonasschmedtmann).<br>
This version has been modified and Specialized by me.
this project lets users explore cabins, filter by capacity, and book stays through interface.<br> Users can log in with their Google account, view their bookings, edit existing reservations, and book new stays using a calendar-based interface.<br><br>


⚠️ Important Note:<br>
This project uses NextAuth.js for Google authentication. In some countries, access to certain Google APIs or domains used by NextAuth may be restricted.
If you face issues during login, you may need to use a VPN to bypass regional limitations.<br><br>
Live Demo: 👉 https://cabin-booking-orpin.vercel.app/<br>

<br>


## ✨ Features

- 🏕 View a list of available cabins with images, descriptions, and capacity info
- 🔍 Filter cabins by capacity (e.g. 2-person, 4-person, etc.)
- 📅 Reserve a cabin using an interactive calendar
- 🔐 Login via Google using OAuth
- 👤 Guest area to view personal reservation history
- 🎨 Fully responsive and styled with Tailwind CSS


<br><br>

## 🛠️ Technologies Used

| Layer	         | Tech Stack                          |
|-----------------|-------------------------------------|
| Frontend        | Nextjs                              |
| Styling         | Tailwind CSS                        |
| UI Components   | react-day-picker, date-fns          |
| Backend & Auth  | Supabase + NextAuth.js              |

<br><br>

## 📦 Getting Started


### 🔧 Run Locally: 
0. ⚠️ Before running the project, you must configure Google OAuth in your Google Cloud Console:

1. **Clone the repo:**
   ```bash
   git clone https://github.com/SalarMahani/cabin-booking.git
   cd cabin-booking
   
2. Install dependencies:
   ```bash
   npm install

3. Configure variable environment
   ```bash
   SUPABASE_KEY= your_SUPABASE_KEY
   NEXTAUTH_URL= your_NEXTAUTH_URL
   NEXTAUTH_SECRET= your_NEXTAUTH_SECRET
   AUTH_GOOGLE_ID= your_AUTH_GOOGLE_ID
   AUTH_GOOGLE_SECRET= your_AUTH_GOOGLE_SECRET

3. Run the dev server:
   ```bash
   npm run dev
   
4. Run the local backend:
   ```bash
   npm run server
   
5. Visit: http://localhost:3000


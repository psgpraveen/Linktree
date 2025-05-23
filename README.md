Sure! Here's a clean and professional `README.md` file for your **TreeLink** project:

---

```markdown
# 🌿 TreeLink – Create Your Personalized Link Profile with QR!

TreeLink is a lightweight, modern web app where users can create and manage a personal profile page with their profile picture, a custom user ID, and a curated list of links. It also generates a public QR code and shareable URL for the profile—perfect for portfolio links, social media, resumes, and more.

## 🚀 Features

- 🔐 User Authentication (via NextAuth.js)
- 📸 Upload & update your profile picture
- 🆔 Set a unique username (public user ID)
- 🔗 Add, view, and delete links
- 🌐 Generate a public link and QR code for your profile
- 📱 Mobile responsive & user-friendly UI
- ⚙️ Built with Next.js, TypeScript, Tailwind CSS, and MongoDB

## 📷 Preview

<img src="public/preview.png" alt="TreeLink preview" width="100%"/>

## 🧑‍💻 Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript
- **Backend:** API Routes in Next.js, MongoDB (via Mongoose)
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **QR Code Generator:** react-qr-code

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/treelink.git
cd treelink
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/treelink?retryWrites=true&w=majority
```

> You can get your Google OAuth credentials from https://console.cloud.google.com/

### 4. Run the app locally

```bash
pnpm dev
```

Now open [http://localhost:3000](http://localhost:3000) in your browser 🚀

## 📁 Project Structure

```
src/
├── app/
│   ├── api/treelink/          # API endpoints for GET, POST, PUT, DELETE
│   ├── user/[userId]/         # Public user profile route
│   └── page.tsx               # Home page with TreeLink form
├── components/TreeLink.tsx    # Main TreeLink component
├── lib/mongodb.ts             # MongoDB connection
├── models/Link.ts             # Mongoose model
├── styles/                    # Global styles
```

## 📦 Deployment

You can deploy this project easily using **Vercel**.

1. Push to GitHub.
2. Connect the repo to [vercel.com](https://vercel.com).
3. Add the same environment variables to your Vercel project settings.
4. Deploy and enjoy! ✨

## 💡 Ideas for Future Enhancements

- 🎨 Custom themes and color options for profile page
- 📊 Analytics for link clicks
- 🖼️ Background image or cover photo support
- 📱 Convert into a mobile app using React Native / Expo
- 🔍 Search for public profiles by user ID

## 📄 License

MIT License. Feel free to fork and enhance it!

---

### ✨ Built with ❤️ by [psgpraveen](https://psgpraveen.github.io/port/)
```

---

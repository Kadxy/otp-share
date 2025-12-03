# OTP Share

<div align="center">

![OTP Share](public/icon.svg)

**Client-Side Generation · Zero Secret Exposure · Ephemeral Sharing**

Generate 2FA tokens in your browser and share them via secure, one-time links without ever revealing your secret key to the server.

[Demo](https://your-project-url.vercel.app) · [Report Bug](https://github.com/Kadxy/OTP-share/issues) · [Request Feature](https://github.com/Kadxy/OTP-share/issues)

</div>

## ✨ Features

- 🔒 **Zero Secret Exposure**: Your TOTP secret key is used to calculate codes locally in your browser. The secret key is **never** sent to the server.
- ⏱️ **Ephemeral Access**: Links can be set to expire after a specific time (1h, 12h, 24h).
- 🔥 **Burn After Reading**: Optional "Single View" mode ensures the link is destroyed immediately after being accessed once.
- 📱 **Responsive Design**: Optimized for mobile and desktop, perfect for sharing 2FA access with colleagues or family members.
- 🛡️ **Privacy Focused**: No user accounts required. No tracking.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: PostgreSQL (via Prisma ORM)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- A PostgreSQL database (Local or Vercel Postgres)

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/Kadxy/OTP-share.git](https://github.com/Kadxy/OTP-share.git)
   cd OTP-share
   ```
2. Install dependencies
   ```bash
   pnpm install
   ```
3. Configure Environment Variables Rename .env.example to .env (or create one) and add your database connection string:
   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/otpshare?schema=public"
   ```
4. Initialize Database
   ```bash
   npx prisma migrate dev --name init
   ```
5. Run Development Server
   ```bash
   pnpm dev
   ```

6. Open http://localhost:3000 with your browser.

### How It Works

Input Secret: User enters their TOTP Secret Key in the browser.

Local Calculation: The browser calculates all future TOTP codes for the selected validity period (e.g., next 1 hour).

Secure Storage: Only the generated codes (not the secret key) are sent to the server and stored in the database.

Link Generation: A unique, random 7-character ID is generated.

Access: The recipient opens the link and sees the valid code for the current time window.

### 🤝 Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
Distributed under the MIT License. See LICENSE for more information.
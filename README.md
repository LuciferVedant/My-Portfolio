# 🚀 Vedant Khatri — 3D Full-Stack Developer Portfolio

An enterprise-grade, high-performance portfolio application for **Vedant Khatri** (Software Engineer, 2+ Years Experience) featuring an interactive **Three.js 3D Canvas**, **Apple-inspired dark glassmorphism UI**, and an interactive **3D AI Recruiter Assistant**. 

The repository is built with a clean full-stack architecture split into two independent services:
- **`frontend/`**: Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and React Three Fiber / Three.js.
- **`backend/`**: Built with NestJS, TypeScript, Class Validator, Nodemailer, Rate Limiting, and persistent database contact logging.

---

## 🌟 Key Features & Highlights

- **🎨 Apple-Style 3D Visual Experience**:
  - Interactive custom 3D mesh sphere canvas with floating orbital rings, particle starfields, and real-time mouse-tracking distortion.
  - Dark glassmorphism panels, radial neon ambient glows, micro-interactions, and smooth momentum scrolling.

- **🤖 3D AI Recruiter Assistant Bot**:
  - Interactive floating chat drawer connected directly to the NestJS backend (`POST /api/ai/chat`).
  - Recruiters can ask questions like *"What did Vedant build at PostQode?"* or *"What is Vedant's tech stack?"* to receive real-time AI answers 24/7.

- **🔔 Contact & Multi-Channel Notification Engine**:
  - **Email Notification**: Direct HTML email notification dispatched to `vedrocks2000@gmail.com` via Nodemailer / SMTP.
  - **Discord / Telegram Push Alert**: Real-time push notification webhook alerts dispatched directly to your mobile/desktop.
  - **Persistent Database Logs**: All contact submissions (`name`, `email`, `subject`, `company`, `message`, `ipAddress`, `submittedAt`) are logged to local persistent database storage (`backend/data/contacts-db.json`) and viewable via `GET /api/contact/logs`.

- **🧭 Dedicated Page Routing**:
  - `/` — **Home & Hero**: Interactive 3D Canvas, executive summary, core capabilities, key metrics.
  - `/about` — **About Vedant**: Career overview, B.Tech ECE degree from SATI Vidisha, Coding Ninjas certifications.
  - `/experience` — **Work History**: Interactive timeline for PostQode (Software Engineer), Purpledocs (UNMH Hospital CMS & EMRD 2.0), and SecuredApp.
  - `/projects` — **Software Showcase**: Thakur Dental Clinic (Full-stack queueing algorithm with SSE delay alerts in Go & PostgreSQL), Qodeflow, and PurpleCMS.
  - `/skills` — **Technical Competencies Matrix**: Categorized interactive cards for Programming Languages, Frameworks, and Tools/Platforms.
  - `/contact` — **Contact & Connect**: Direct form connected live to NestJS API with status feedback & Webhook alert testing.

---

## 📁 Repository Directory Structure

```
My-Portfolio/
├── backend/                        # NestJS REST API Application
│   ├── data/
│   │   └── contacts-db.json        # Local persistent database store for contact submission logs
│   ├── src/
│   │   ├── contact/                # POST /api/contact & GET /api/contact/logs (Email + Webhook + DB)
│   │   ├── projects/               # GET /api/projects & GET /api/projects/:id
│   │   ├── experience/             # GET /api/experience
│   │   ├── ai-assistant/           # POST /api/ai/chat (Resume AI Q&A)
│   │   ├── analytics/              # POST /api/analytics/track & GET /api/analytics/stats
│   │   ├── health/                 # GET /api/health (Uptime & status)
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                       # Next.js App Router Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx            # Home / Hero route
│   │   │   ├── about/page.tsx      # About route
│   │   │   ├── experience/page.tsx # Career timeline route
│   │   │   ├── projects/page.tsx   # Projects showcase route
│   │   │   ├── skills/page.tsx     # Technical matrix route
│   │   │   ├── contact/page.tsx    # Contact route
│   │   │   ├── globals.css         # Glassmorphism & design system tokens
│   │   │   └── layout.tsx
│   │   └── components/
│   │       ├── 3d/HeroCanvas.tsx   # Three.js / React Three Fiber interactive 3D Mesh
│   │       ├── Navbar.tsx         # Active route pill navigation
│   │       ├── Footer.tsx         # Footer with social links & NestJS API ping
│   │       └── AiChatWidget.tsx   # 3D AI Recruiter Assistant drawer
│   ├── package.json
│   └── tsconfig.json
│
└── README.md                       # Complete documentation
```

---

## ⚙️ Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v8.0.0` or higher

---

## 🛠️ Installation & Running Guide

### 1. Clone & Setup Repository
```bash
git clone https://github.com/vedrocks2000/My-Portfolio.git
cd My-Portfolio
```

---

### 2. Running the NestJS Backend

1. Navigate to `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables (Optional):
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   *If `.env` is omitted, NestJS will run gracefully with console logging and database saving enabled.*

4. Build and Start the NestJS Server in Development Mode:
   ```bash
   npm run start:dev
   ```
   - **Server Base URL**: `http://localhost:5001`
   - **Health Check Endpoint**: `http://localhost:5001/api/health`
   - **View Contact Logs DB**: `http://localhost:5001/api/contact/logs`

---

### 3. Running the Next.js Frontend

1. In a new terminal, navigate to `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch Next.js Development Server:
   ```bash
   npm run dev
   ```
   - **Web Application URL**: `http://localhost:3000`

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/contact` | Validates & logs contact submission to DB, triggers Email & Webhook alerts |
| `GET` | `/api/contact/logs` | Retrieves persistent contact submission logs from DB |
| `POST` | `/api/ai/chat` | AI Assistant query endpoint for resume Q&A |
| `GET` | `/api/projects` | Returns all software projects (filterable with `?tech=golang`) |
| `GET` | `/api/projects/:id` | Returns detailed project breakdown |
| `GET` | `/api/experience` | Returns work experience timeline |
| `POST` | `/api/analytics/track` | Logs page view metrics |
| `GET` | `/api/analytics/stats` | Returns aggregate portfolio telemetry stats |
| `GET` | `/api/health` | Returns backend service status and uptime |

---

## 🛡️ Security & Best Practices

- **Rate Limiting**: Protected with `@nestjs/throttler` (max 10 requests/min for contact form).
- **Validation Pipe**: Enforced with `class-validator` and `class-transformer` for strict payload checking.
- **CORS**: Configured in NestJS `main.ts` to allow cross-origin requests from Next.js.

---

## 👨‍💻 Author

**Vedant Khatri**  
*Full Stack Developer / Software Engineer*  
- **Email**: [vedrocks2000@gmail.com](mailto:vedrocks2000@gmail.com)  
- **Phone**: +91 8349443633  
- **Location**: Jabalpur, M.P. • Bangalore, India  
- **GitHub**: [github.com/vedrocks2000](https://github.com/vedrocks2000)  

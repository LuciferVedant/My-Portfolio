# 🚀 Vedant Khatri — Enterprise Full-Stack Developer Portfolio

An enterprise-grade, high-performance portfolio application for **Vedant Khatri** (Software Engineer, 2+ Years Experience) featuring a **Matrix-inspired terminal UI aesthetic**, an interactive **Terminal Code Inspector**, and a NestJS-powered **AI Career Assistant** with strict resume guardrails.

The repository is built with a clean full-stack architecture split into two independent services:
- **`frontend/`**: Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lucide React.
- **`backend/`**: Built with NestJS, TypeScript, OpenRouter / LLM integration, Class Validator, Nodemailer, Rate Limiting, 5-minute Anti-Spam Cooldown, and persistent database logging.

---

## 🌟 Key Features & Highlights

- **🎨 Matrix Terminal & Dark Glassmorphism UI**:
  - Custom Matrix rain background canvas, CRT scanline sweeps, dark glassmorphism panels, and neon emerald glows.
  - **Terminal Code Inspector**: Interactive tabbed code inspector displaying real production code (Go SSE queue algorithm for Thakur Dental Clinic, NestJS contact pipeline, and TypeScript report generator for PostQode).

- **🤖 AI Career Assistant & OpenRouter LLM Guardrail Engine**:
  - Powered by OpenRouter / LLM models (e.g., `openai/gpt-4o-mini`, `anthropic/claude-3.5-sonnet`, `meta-llama/llama-3.3-70b-instruct`).
  - **Strict Resume Guardrails**: Seeded with Vedant's complete professional experience, tech stack (React, Go, Java Spring Boot, NestJS), and projects. Off-topic questions are strictly declined.

- **🔔 Contact & Multi-Channel Notification Engine**:
  - **Email Notification**: Direct HTML email notification dispatched to `vedrocks2000@gmail.com` via Nodemailer / SMTP.
  - **Discord / Telegram Webhook Push Alert**: Real-time push notification alerts dispatched directly to your mobile or desktop chat.
  - **Anti-Spam & Cooldown Protection**: 5-minute memory cooldown per sender/IP and NestJS Throttler rate limiting (10 req/min) to prevent inbox flooding.
  - **Persistent Database Logs**: All contact submissions (`name`, `email`, `subject`, `company`, `message`, `ipAddress`, `submittedAt`) are logged to local persistent database storage (`backend/data/contacts-db.json`) and viewable via `GET /api/contact/logs`.

- **🧭 Dedicated Page Routing**:
  - `/` — **Home & Hero**: Live Terminal Code Inspector, executive summary, core capabilities, key stats.
  - `/about` — **About Vedant**: Career overview, B.Tech ECE degree from SATI Vidisha, Coding Ninjas certifications.
  - `/experience` — **Work History**: Interactive career timeline for PostQode (Software Engineer), Purpledocs (UNMH Hospital CMS & EMRD 2.0), and SecuredApp.
  - `/projects` — **Software Showcase**: Thakur Dental Clinic (Full-stack queueing algorithm with SSE delay alerts in Go & PostgreSQL), Qodeflow, and PostQode Extension.
  - `/skills` — **Technical Competencies Matrix**: Categorized interactive cards for Programming Languages, Frameworks, and Tools/Platforms.
  - `/contact` — **Contact & Connect**: Direct form connected live to NestJS API with status feedback & Live Contact Pipeline Code Inspector.

---

## 📁 Repository Directory Structure

```
My-Portfolio/
├── backend/                        # NestJS REST API Application
│   ├── data/
│   │   └── contacts-db.json        # Local persistent database store for contact submission logs
│   ├── src/
│   │   ├── contact/                # POST /api/contact & GET /api/contact/logs (Email + Webhook + DB + Spam Guard)
│   │   ├── projects/               # GET /api/projects & GET /api/projects/:id
│   │   ├── experience/             # GET /api/experience
│   │   ├── ai-assistant/           # POST /api/ai/chat (OpenRouter LLM + Resume Guardrails)
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
│   │   │   ├── globals.css         # Design system tokens & matrix animations
│   │   │   └── layout.tsx
│   │   └── components/
│   │       ├── TerminalCodeInspector.tsx # Interactive code tab inspector
│   │       ├── MatrixRain.tsx     # Canvas matrix rain effect
│   │       ├── Navbar.tsx         # Active route navigation
│   │       ├── Footer.tsx         # Footer with social links & NestJS API ping
│   │       └── AiChatWidget.tsx   # AI Career Assistant chat drawer
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
   *Add `OPENROUTER_API_KEY`, `AI_MODEL`, `SMTP_USER`, `SMTP_PASS`, or `DISCORD_WEBHOOK_URL` to enable live LLM models, email alerts, or push webhooks.*

4. Start the NestJS Server in Development Mode:
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
| `POST` | `/api/contact` | Validates & logs contact submission to DB, triggers Email & Webhook alerts with 5-min spam cooldown |
| `GET` | `/api/contact/logs` | Retrieves persistent contact submission logs from DB |
| `POST` | `/api/ai/chat` | AI Assistant endpoint powered by OpenRouter LLM with strict resume guardrails |
| `GET` | `/api/projects` | Returns all software projects (filterable with `?tech=golang`) |
| `GET` | `/api/projects/:id` | Returns detailed project breakdown |
| `GET` | `/api/experience` | Returns work experience timeline |
| `POST` | `/api/analytics/track` | Logs page view metrics |
| `GET` | `/api/analytics/stats` | Returns aggregate portfolio telemetry stats |
| `GET` | `/api/health` | Returns backend service status and uptime |

---

## 🛡️ Security & Anti-Spam Best Practices

- **5-Minute Anti-Spam Cooldown**: Suppresses duplicate email & webhook dispatches from the same email or IP within 5 minutes.
- **Rate Limiting**: Protected with `@nestjs/throttler` (max 10 requests/min per IP).
- **Validation Pipe**: Enforced with `class-validator` and `class-transformer` for payload validation.
- **CORS**: Configured in NestJS `main.ts` to allow cross-origin requests from Next.js.

---

## 👨‍💻 Author

**Vedant Khatri**  
*Full Stack Developer / Software Engineer*  
- **Email**: [vedrocks2000@gmail.com](mailto:vedrocks2000@gmail.com)  
- **Phone**: +91 8349443633  
- **Location**: Bengaluru, Karnataka, India  
- **GitHub**: [github.com/vedrocks2000](https://github.com/vedrocks2000)  

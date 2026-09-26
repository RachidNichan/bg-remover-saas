# ClearCut AI — Production-Ready AI Background Remover SaaS MVP

A modern, high-performance, full-stack AI Background Remover SaaS application. Engineered to run seamlessly on a local laptop CPU and ready for single-command self-hosting on any Ubuntu VPS.

---

## 🚀 Key Highlights & Architecture

- **Frontend & SaaS Logic:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Lucide Icons, Shadcn-inspired dark aesthetic.
- **AI Microservice:** Python FastAPI running `rembg[cpu]` with ONNX Runtime CPU execution. The `u2net` neural network is loaded into memory on startup for sub-second consecutive processing with **zero cold starts**.
- **Database & Authentication:** Firebase Auth (Google Sign-In + Email/Password) and Cloud Firestore for atomic credit tracking.
- **Credit Lifecycle:** Users receive **3 free credits** upon account creation. Every background removal consumes 1 credit. At 0 credits, users are prompted with an Upgrade modal.
- **Local Evaluation & Demo Mode:** If Firebase keys are not provided or set to defaults, the application runs in local interactive mode with 3 simulated credits and 1-click test login.
- **Zero GPU Dependency:** Optimized for multi-threaded CPU inference (AVX2/AVX-512) on everyday laptops and low-cost VPS instances.

---

## 📁 Repository Structure

```
bg-remover-saas/
├── backend/                         # Python AI Microservice (FastAPI + rembg)
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                  # FastAPI endpoints (/api/remove-bg, /api/health)
│   │   ├── config.py                # Environment & settings
│   │   ├── schemas.py               # Pydantic models for request/response
│   │   └── services/
│   │       ├── __init__.py
│   │       └── remover.py           # In-memory session manager & rembg engine
│   ├── Dockerfile                   # Pre-bakes u2net model into container image
│   ├── requirements.txt             # Python dependencies
│   └── .dockerignore
│
├── frontend/                        # Next.js 14+ SaaS Web Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx           # SEO metadata, viewport, AuthProvider
│   │   │   ├── page.tsx             # Complete SaaS landing & workspace page
│   │   │   ├── globals.css          # Theme tokens, checkerboard, glassmorphism
│   │   │   └── api/
│   │   │       ├── remove-bg/       # Next.js API proxy to Python microservice
│   │   │       └── health/          # Full-stack health check endpoint
│   │   ├── components/
│   │   │   ├── Navbar.tsx           # Live AI status, credit pill, user avatar
│   │   │   ├── Hero.tsx             # High-converting dark mode hero section
│   │   │   ├── BeforeAfterSlider.tsx# Interactive draggable comparison slider
│   │   │   ├── ImageUploader.tsx    # Drag-and-drop, clipboard paste, options
│   │   │   ├── ResultPreview.tsx    # Lossless HD PNG viewer & background changer
│   │   │   ├── Features.tsx         # Performance & edge extraction highlights
│   │   │   ├── Pricing.tsx          # Free Trial, Creator Pro, Business tiers
│   │   │   ├── FAQ.tsx              # Expandable interactive accordion
│   │   │   ├── Footer.tsx           # Footer with stack badges & copyright
│   │   │   ├── AuthModal.tsx        # Google & Email/Password sign-in
│   │   │   └── UpgradeModal.tsx     # Credit refill & evaluation top-up
│   │   ├── context/
│   │   │   └── AuthContext.tsx      # Auth & Firestore state management
│   │   ├── lib/
│   │   │   ├── firebase.ts          # Safe Firebase initialization
│   │   │   ├── firestore.ts         # User profiles & atomic credit transactions
│   │   │   └── utils.ts             # Image downloading, bytes formatting
│   │   └── types/
│   │       └── index.ts             # Shared TypeScript types
│   ├── public/
│   │   └── samples/                 # High-res sample images (portrait, sneaker)
│   ├── Dockerfile                   # Multi-stage production container build
│   └── package.json
│
├── docker-compose.yml               # Multi-container orchestration
├── firestore.rules                  # Production Cloud Firestore security rules
├── .env.example                     # Environment variables template
├── .env                             # Local environment variables
└── README.md                        # Documentation
```

---

## 🛠️ Quick Start Option 1: Docker Compose (Recommended)

Running with Docker Compose starts both the Python AI microservice and the Next.js frontend in isolated containers with automatic health-checking and shared networking.

### 1. Clone & Setup Environment

```bash
git clone <repo-url> bg-remover-saas
cd bg-remover-saas
cp .env.example .env
```

### 2. Launch the Stack

```bash
docker compose up -d --build
```

### 3. Verify Running Services

- **Next.js Web Application:** [http://localhost:3000](http://localhost:3000)
- **FastAPI AI Backend:** [http://localhost:8000](http://localhost:8000)
- **Interactive Swagger Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **Full-Stack Health Check:** [http://localhost:3000/api/health](http://localhost:3000/api/health)

### 4. Stop Services

```bash
docker compose down
```

---

## 💻 Quick Start Option 2: Running Locally Without Docker

If you prefer to run services natively on your machine:

### 1. Start the Python AI Microservice (`/backend`)

**Prerequisites:** Python 3.10, 3.11, or 3.12 recommended.

```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Start FastAPI server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

*Note: On initial boot, `rembg` will automatically download `u2net.onnx` (~170MB) to `~/.u2net/` and cache it in memory for instant subsequent inferences.*

Verify it is running:
```bash
curl http://localhost:8000/api/health
```

### 2. Start the Next.js SaaS Frontend (`/frontend`)

**Prerequisites:** Node.js 18+ or 20+ and npm.

Open a separate terminal window:
```bash
cd frontend

# Install dependencies
npm install --legacy-peer-deps

# Start Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Firebase Authentication & Cloud Firestore Setup

ClearCut AI supports **Google Sign-In** and **Email/Password** authentication with Firestore credit balance management.

### 1. Create a Firebase Project
1. Visit the [Firebase Console](https://console.firebase.google.com/) and click **Add Project**.
2. Name your project (e.g. `clearcut-bg-remover`).

### 2. Enable Authentication Providers
1. In the left navigation, go to **Build** -> **Authentication** -> **Get Started**.
2. Under the **Sign-in method** tab:
   - Enable **Google** (provide your project support email).
   - Enable **Email/Password**.
3. Under **Settings** -> **Authorized domains**, make sure `localhost` is listed.

### 3. Create Cloud Firestore Database
1. Go to **Build** -> **Firestore Database** -> **Create database**.
2. Select **Start in production mode** and pick your closest server location.
3. In the **Rules** tab, paste the contents of [firestore.rules](file:///home/rachid/Development/bg-remover-saas/firestore.rules):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId && request.resource.data.credits <= 3;
      allow update: if request.auth != null && request.auth.uid == userId;
      allow delete: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 4. Copy Web App Credentials to `.env`
1. Go to **Project Settings** -> **General** -> **Your apps** -> Click the **Web (`</>`)** icon.
2. Register the app and copy the credentials into your root `.env` file:

```ini
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-app.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-app"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-app.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1234567890"
NEXT_PUBLIC_FIREBASE_APP_ID="1:1234567890:web:abcdef"
```

---

## 📡 REST API Reference

The Python backend exposes clean REST endpoints:

### `POST /api/remove-bg`
Remove background from an image. Supports `multipart/form-data` and `application/json` (base64).

#### Multipart Form Data Request:
```bash
curl -X POST \
  -F "file=@/path/to/photo.jpg" \
  -F "alpha_matting=false" \
  http://localhost:8000/api/remove-bg \
  --output cutout.png
```

#### JSON Base64 Request:
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"image": "<base64_string>", "alpha_matting": false}' \
  http://localhost:8000/api/remove-bg?format=json
```

#### Response Headers:
- `Content-Type`: `image/png`
- `Content-Disposition`: `inline; filename="background_removed.png"`
- `X-Process-Time`: Inference duration in seconds (e.g., `0.582`)

---

## 🌐 Production Ubuntu VPS Deployment

To deploy ClearCut AI to an Ubuntu 22.04 or 24.04 VPS:

### 1. Install Docker & Compose on Ubuntu

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 2. Deploy Project

```bash
git clone <repo-url> /opt/bg-remover-saas
cd /opt/bg-remover-saas
cp .env.example .env
nano .env  # Add your real domain and Firebase credentials

# Start services
docker compose up -d --build
```

### 3. Nginx Reverse Proxy with SSL (Certbot)

Create an Nginx site config `/etc/nginx/sites-available/clearcut`:

```nginx
server {
    server_name yourdomain.com;

    client_max_body_size 25M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site and acquire free SSL certificate:
```bash
sudo ln -s /etc/nginx/sites-available/clearcut /etc/nginx/sites-enabled/
sudo certbot --nginx -d yourdomain.com
```

---

## 🛡️ License

This project is licensed under the MIT License — feel free to customize and launch your own AI SaaS.

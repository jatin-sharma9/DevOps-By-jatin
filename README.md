# DevOps With Jatin - Full-Stack Learning Platform

Welcome to **DevOps With Jatin**, a comprehensive, full-stack learning platform designed to help students master DevOps engineering from fundamentals to advanced practices.

## Project Structure

This project is organized into two main workspaces:
- **`artifacts/devops-jatin/`**: The frontend single-page application built using React, Vite, TypeScript, TailwindCSS, Framer Motion, and Radix UI.
- **`artifacts/api-server/`**: The backend REST API server built using Node.js, Express, TypeScript, and Pino logging.

---

## Core Features

1. **Interactive DevOps Roadmap**:
   - A step-by-step roadmap guiding users through 7 milestones.
   - Clickable roadmap items triggering detail dialogs with in-depth conceptual explanations, practical shell/CLI command cheatsheets, and copy buttons.
   - Dynamic path links redirection to related labs or core topics.

2. **Core Topics**:
   - Deep-dives into core DevOps technologies: Linux, Git, Docker, Kubernetes, CI/CD (Jenkins, GitHub Actions), Infrastructure as Code (Terraform, Ansible), Observability (Prometheus, Grafana), and Cloud (AWS).

3. **Hands-on Labs**:
   - Guided real-world sandbox environments with step-by-step instructions.

4. **Real-world Projects**:
   - Multi-tier production architecture blueprints (e.g., EKS multi-tenancy, Serverless logging, centralized log storage pipelines).

5. **Interview Preparation**:
   - Interactive Q&As categorized by difficulty (Beginner, Intermediate, Advanced) with search filters.

6. **Best Practices Checklist**:
   - Standards and configuration checklists for Docker, Kubernetes, Terraform, Linux, and CI/CD.

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### 1. Run the Backend API Server
```bash
cd artifacts/api-server
npm install
npm run dev
```
The server will start listening on `http://localhost:5000`.

### 2. Run the Frontend App
```bash
cd artifacts/devops-jatin
npm install
npm run dev
```
The web application will start and run at `http://localhost:5173/`.

# 📚 KWIN City Portal - Documentation Guide

Welcome! This guide helps you understand the KWIN City Portal—its architecture, content model, components, and how to work with it.

**Choose your path below based on what you want to do.**

---

## 🎯 Quick Navigation by Task

| **I want to...** | **Read this** | **Time** |
|---|---|---|
| Understand what KWIN City is | [Project README](../README.md) | 5 min |
| Get started developing locally | [Development Guide](DEVELOPMENT.md) | 15 min |
| Update page content (JSON) | [HOW_TO Guide](../HOW_TO.md) | 10 min |
| Build or modify UI components | [Component Reference](COMPONENTS.md) | 20 min |
| Add/update data (timeline, sectors, etc.) | [Data Model Reference](DATA_MODEL.md) | 15 min |
| Understand the evidence system | [Evidence System](EVIDENCE_SYSTEM.md) | 20 min |
| Run Instagram/Facebook publishing | [Social Media Content Automation](social-media-content-automation.md) | 30 min |
| Query data via API | [API Reference](API.md) | 10 min |
| Contribute code to the project | [Contributing Guide](../CONTRIBUTING.md) | 10 min |
| Check project quality standards | [Quality Standards](../QUALITY_STANDARDS.md) | 20 min |
| Add a new language | [HOW_TO Guide - Task 11](../HOW_TO.md#task-11-add-a-new-language-configuration-only) | 5 min |

---

## 📖 Complete Documentation Index

### **Getting Started**
- **[Project README](../README.md)** — What is KWIN City? Site map, tech stack, getting started
- **[SETUP_GUIDE](../SETUP_GUIDE.md)** — Installation walkthrough and first steps

### **Development & Architecture**
- **[Development Guide](DEVELOPMENT.md)** — Local setup, daily workflow, available scripts, troubleshooting
- **[ARCHITECTURE.md](../ARCHITECTURE.md)** — System design, tech stack, directory structure, data flow
- **[Backend Architecture](BACKEND_ARCHITECTURE.md)** — Backend services and infrastructure

### **Content & Data Management**
- **[HOW_TO Guide](../HOW_TO.md)** — Practical step-by-step guides for common tasks ⭐ START HERE
- **[Data Model Reference](DATA_MODEL.md)** — TypeScript interfaces, data constants, structured data guide
- **[Evidence System Guide](EVIDENCE_SYSTEM.md)** — How claims are verified, source registry, evidence tiers
- **[Social Media Content Automation](social-media-content-automation.md)** — Instagram/Facebook content calendar, caption templates, and daily automation strategy

### **Component & UI Development**
- **[Component Reference](COMPONENTS.md)** — All 25+ components: purpose, props, usage examples
- **[Implementation Summary](../IMPLEMENTATION_SUMMARY.md)** — System improvements and architecture overview

### **API & Integration**
- **[API Reference](API.md)** — `GET /api/opencity` endpoint, parameters, responses, error codes
- **[Supabase Setup](SUPABASE_SETUP.md)** — Backend database configuration

### **Quality & Standards**
- **[Quality Standards](../QUALITY_STANDARDS.md)** — Production-grade quality checklist, roadmap, metrics
- **[Contributing Guide](../CONTRIBUTING.md)** — How to contribute: workflow, standards, pull requests

### **Reference**
- **[Project Phases](../PHASE_4_SUMMARY.md)** — Project phases and implementation summary
- **[Legal Content Checklist](../LEGAL_CONTENT_CHECKLIST.md)** — Asset licensing and legal reviews

---

## 🚀 Quick Start (5 Minutes)

### 1. **Clone the project**
```bash
git clone https://github.com/aartisr/kwin-city-portal.git
cd kwin-city-portal
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Start development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Changes hot-reload automatically.

### 4. **Edit content** (no coding needed)
- Open any JSON file: `app/content/pages/*.json`
- Edit text, add items, change metadata
- Refresh browser—changes appear instantly

### 5. **Learn more**
- For configuration → [HOW_TO Guide](../HOW_TO.md)
- For development → [Development Guide](DEVELOPMENT.md)
- For components → [Component Reference](COMPONENTS.md)

---

## 🗂️ Directory Structure (Quick Reference)

```
kwin-city-portal/
├── app/
│   ├── components/          # 25+ UI components
│   ├── config/
│   │   └── site.config.ts   # Centralized configuration
│   ├── content/
│   │   └── pages/           # Page content (JSON — edit these!)
│   ├── data/
│   │   └── constants.ts     # All structured data
│   ├── lib/
│   │   ├── content-manager.ts     # Content loading
│   │   ├── generic-page-builder.tsx # Page builder
│   │   └── i18n/                  # 4-language support
│   ├── types/
│   │   └── kwin.ts          # TypeScript interfaces
│   └── [pages]/             # Page routes
├── docs/                    # This documentation
├── public/                  # Images, assets
├── HOW_TO.md               # Task-based guide ⭐ START
├── README.md               # Project overview
└── QUALITY_STANDARDS.md    # Quality roadmap
```

---

## 🎓 Suggested Learning Path

### **For Content Editors**
1. [Project README](../README.md)
2. [HOW_TO Guide](../HOW_TO.md)
3. [Data Model](DATA_MODEL.md) (optional but helpful)

### **For Frontend Developers**
1. [Development Guide](DEVELOPMENT.md)
2. [ARCHITECTURE.md](../ARCHITECTURE.md)
3. [Component Reference](COMPONENTS.md)
4. [HOW_TO Guide](../HOW_TO.md)

### **For Project Leads**
1. [Project README](../README.md)
2. [PHASE_4_SUMMARY](../PHASE_4_SUMMARY.md)
3. [Quality Standards](../QUALITY_STANDARDS.md)

---

## 💡 Key Concepts

### **Single Source of Truth**
- **Configuration:** `app/config/site.config.ts`
- **Content:** `app/content/pages/*.json`
- **Data:** `app/data/constants.ts`
- **Types:** `app/types/kwin.ts`

### **Three Evidence Tiers**
1. **✅ Verified** — Official documents
2. **🔍 Pending** — Awaiting verification
3. **⚪ Contextual** — Regional context

Learn more: [Evidence System](EVIDENCE_SYSTEM.md)

### **Localization (i18n)**
Supports: English, Kannada, Hindi, Tamil

To add language: Edit `app/lib/i18n/messages.ts` only
See: [HOW_TO Task 11](../HOW_TO.md#task-11-add-a-new-language-configuration-only)

---

## 🔧 Common Commands

```bash
npm run dev              # Start dev server
npm run type-check      # TypeScript check
npm run lint            # ESLint validation
npm run build           # Production build
npm test                # Run tests
npm run format          # Format code
npm run clean:next      # Clean build cache
```

---

## ❓ FAQ

**Q: How do I edit page content?**  
A: Edit JSON files in `app/content/pages/`. See [HOW_TO Guide](../HOW_TO.md).

**Q: How do I add a new page?**  
A: Create a JSON file and route. See [Development Guide](DEVELOPMENT.md#5-adding-a-new-page).

**Q: How do I modify navigation?**  
A: Edit `app/config/site.config.ts`—changes propagate everywhere.

**Q: How do I add a language?**  
A: Edit `app/lib/i18n/messages.ts`. See [HOW_TO Task 11](../HOW_TO.md#task-11-add-a-new-language-configuration-only).

**Q: How do I contribute?**  
A: Read [Contributing Guide](../CONTRIBUTING.md).

---

## 📞 Support

**For questions:** Open a GitHub issue or contact aartisr@example.com  
**For security:** Email security@example.com  
**Last Updated:** March 27, 2026

---

**Ready to get started?** → [HOW_TO Guide](../HOW_TO.md) or [Development Guide](DEVELOPMENT.md)

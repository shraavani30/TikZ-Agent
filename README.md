# 🖼️ TikZ Agent

A full-stack web application that generates professional LaTeX TikZ diagrams from natural language descriptions.

---

## 🚀 Overview

**TikZ Agent** allows users to effortlessly convert natural language prompts into LaTeX TikZ code for academic-quality diagrams. It simplifies diagram creation for researchers, students, and professionals who want visually accurate, publication-ready visuals without writing complex TikZ syntax manually.

---

## ✨ Features

- **🧠 Natural Language to TikZ**
  - Describe a diagram (e.g., "Draw a binary tree with A as root and B, C as children") and receive accurate TikZ code.
  
- **🔁 Real-time Preview**
  - Instantly render and preview diagrams in-browser using **TikZJax**.

- **✏️ Interactive Editing**
  - Modify existing diagrams through simple natural language commands (e.g., "Make node 3 red" or "Add a new node connected to B").

- **📋 Code Management**
  - View and copy the generated TikZ code.

- **📥 Download Options**
  - Export diagrams as **PNG** or **PDF** with one click.

- **🔐 Secure API Handling**
  - Backend proxy server ensures **IBM Cloud API keys** remain secure.

---

## ⚠️ Current Status & Known Issue

> The application is fully developed and functional, but currently experiencing **IBM Cloud quota exhaustion** under the free-tier plan.

### 🛑 Issue
- **Error**: `"instance_quota_exceeded"`
- **Cause**: IBM Watson Machine Learning free-tier quota exceeded for the current month.

### ✅ Temporary Workaround
1. Enter your diagram description and click **Generate Diagram**.
2. Copy the **generated TikZ code**.
3. Paste it into a LaTeX editor like [Overleaf](https://www.overleaf.com/).
4. Manually compile and export your diagram.

The full feature set (preview, editing, and download) will resume automatically when the quota resets at the beginning of the next month.

---

## 🛠️ Tech Stack

### 🧩 Frontend
- HTML5
- JavaScript
- **Tailwind CSS** (Styling and layout)
- **TikZJax** (Live TikZ rendering in-browser)
- **html2canvas** + **jsPDF** (Image/PDF export)
- **Fetch API** (Client-server communication)

### 🔧 Backend (Node.js Proxy Server)
- Node.js (v18+)
- Express.js
- CORS
- body-parser
- Native `fetch` API (for secure calls to IBM Watson Machine Learning)

---

## 👩‍💻 Developed By

**Shraavani Salunkhe**  
IBM Agentic AI Internship 2025 | SB4Academia Problem Statement 26  
[LinkedIn](https://www.linkedin.com/in/shraavani-salunkhe) | [GitHub](https://github.com/shraavani30)

---


## 💡 Future Improvements

- Add user authentication and history tracking
- Support TikZ libraries auto-included based on prompt
- Integrate multilingual support (e.g., Hindi/English prompts)

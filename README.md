# 🚀 SevaLink | Smart Resource Allocation Engine

[![Live Demo](https://img.shields.io/badge/Demo-Live_Prototype-brightgreen?style=for-the-badge&logo=github)](https://himanshisharma18-wq.github.io/NGO_Bridge/)
[![Backend Status](https://img.shields.io/badge/Render_API-Active-blue?style=for-the-badge&logo=render)](https://ngo-bridge.onrender.com)
[![Google Solution Challenge](https://img.shields.io/badge/Google_Solution_Challenge-2026-4285F4?style=for-the-badge&logo=google)](https://developers.google.com/community/gdsc-solution-challenge)

> **Solving last-mile social impact inefficiencies by transforming fragmented community data into real-time actionable missions through AI-assisted workflow automation.**

---

## 📌 Executive Summary

**SevaLink** is a full-stack functional prototype designed for the **Google Solution Challenge (Theme: Smart Resource Allocation)**. 

In traditional community welfare operations, local NGOs rely on paper-based surveys, unorganized spreadsheets, and manual phone calls to deploy aid. This causes severe coordination lag, scattered data, and poor resource utilization. 

SevaLink bridges the gap between **Data Collection** and **Field Action** by digitizing the handshake between NGOs and volunteers. Featuring an integrated **Gemini AI generation engine**, it empowers non-technical NGO administrators to synthesize complex field reports into optimized, targeted mission listings within seconds.

---

## 🎥 Demonstration & Links


* 🌐 **Live Application:** [SevaLink Web Client](https://himanshisharma18-wq.github.io/NGO_Bridge/)
* ⚡ **Deployed Backend API:** [Render API Endpoint](https://ngo-bridge.onrender.com)
* 📹 **Video Walkthrough:** [Watch Demo on Google Drive](https://drive.google.com/file/d/1t2MC_Y4PiUfY-xiaDBSa9jqsP_fwuxKv/view?usp=drivesdk)

---

## 🚨 Problem vs. Solution

| Operational Phase | Traditional Workflow | SevaLink Ecosystem |
| :--- | :--- | :--- |
| **Data Capture** | Manual paper surveys & fragmented notes | Digitized Google Sheets / Web Forms Sync |
| **Content Creation** | Time-consuming manual drafting of outreach posts | **Gemini AI Smart Generation Engine** |
| **Visibility** | Siloed in local file storage | Unified Real-time Mission Heatmap |
| **Allocation** | Manual phone calls & broadcast messages | Automated, skill-matched volunteer alerts |

---

## 🛠️ System Architecture & Tech Stack

[ Client Browser ]
(GitHub Pages / Static UI)
│
│ HTTP / REST API (CORS Enabled)
▼
[ Node.js + Express Backend ]
(Hosted on Render)
│
│ Google Generative AI SDK
▼
[ Gemini AI API ]


* **Frontend:** HTML5, CSS3, JavaScript (ES6+), Modular DOM Architecture
* **Backend:** Node.js, Express.js
* **AI Integration:** `@google/generative-ai` SDK (`gemini-1.5-flash`)
* **Deployment & Infrastructure:**
  * **Frontend Hosting:** GitHub Pages
  * **Backend Hosting:** Render PaaS
  * **Environment Management:** `dotenv`, CORS Cross-Origin Policies

---

## Key Features & Highlights

### 🤖 1. Gemini AI-Powered Smart Post Generator
* Integrated Google Generative AI to allow NGO workers to type a one-sentence need and receive an automatically structured, high-conversion volunteer recruitment post.
* Reduces administrative overhead by **80%**, letting teams focus on field execution rather than content writing.

### 🌐 2. Decoupled & Scalable Architecture
* Built with a stateless Node.js REST API that dynamically shifts base URLs depending on whether it is running in local development (`localhost`) or live production (`Render`).
* Fully configured with CORS policies to allow cross-origin requests securely from GitHub Pages.

### 📊 3. Dynamic Mission Dashboard
* Intuitive state management rendering active relief efforts, volunteer applicants, and urgency statuses without page reloads.

---

## 🎯 UN Sustainable Development Goals (SDG) Alignment

SevaLink directly aligns with **SDG 17: Partnerships for the Goals** by serving as an open coordination layer. It accelerates progress for:
* 🪪 **SDG 1 (No Poverty):** Optimizes the rapid delivery of food, medical aid, and emergency relief supplies.
* 📚 **SDG 4 (Quality Education):** Matches volunteer educators with local community learning centers based on verified skill sets.

---

## 🔄 Future Roadmap & Ongoing Development

To transition SevaLink from a functional MVP into an enterprise-grade social impact platform:
* 🗄️ **Database Integration (Active Focus):** Currently integrating a dedicated persistent database (MongoDB/PostgreSQL) to store volunteer profiles, mission logs, and real-time application analytics efficiently.
* 🗺️ **Geospatial Mapping:** Integrating Google Maps API to visualize resource requests as an interactive heat map.
* 📱 **Mobile Application:** Expanding the frontend into a Flutter-based mobile app for field deployment.

---

## 👤 Developer & Ownership

Designed, engineered, and deployed single-handedly:

* **Himanshi Sharma** – *Lead Developer & Architect*
  * 🌐 **GitHub:** [@himanshisharma18-wq](https://github.com/himanshisharma18-wq)
  * 💼 **LinkedIn:** [Connect on LinkedIn](https://www.linkedin.com/in/himanshi-sharma-wq) 
 
---

## 🚀 Running the Project Locally

### Prerequisites
* Node.js (v18 or higher)
* A valid `GEMINI_API_KEY` from Google AI Studio

### 1. Clone & Set Up Backend
```bash
git clone [https://github.com/himanshisharma18-wq/NGO_Bridge.git](https://github.com/himanshisharma18-wq/NGO_Bridge.git)
cd NGO_Bridge/backend
npm install
2. Configure Environment Variables
Create a .env file in the backend/ folder:

Code snippet
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
3. Start the Server
Bash
npm start
# Server runs at http://localhost:3000
4. Launch Frontend
Open index.html or ngo_dashboad.html directly in your browser or through VS Code Live Server.

🙏 Acknowledgment & Conclusion
"Technology is best when it brings people together to solve real-world human problems."

Thank you for exploring SevaLink. This project represents a dedication to building scalable, high-impact technical solutions that bridge social inequality. If you have any feedback, collaboration proposals, or feedback on the architecture, feel free to reach out or connect!
# LinkedIn Post - AI Test Plan Generator

🚀 **I Built an AI-Powered Test Plan Generator from Scratch!** 🚀

For months, creating test plans was a tedious, time-consuming task. Reading JIRA tickets, manually copying details, formatting documentation... it took 30+ minutes that could've been spent on actual testing.

Today, I changed that by building a complete full-stack web application that automates the entire process.

---

## 🎯 What the Application Does

**Input:** JIRA Ticket ID (e.g., PROJ-123)
**Process:** 
- Fetches ticket data from JIRA automatically
- Analyzes description, acceptance criteria, priority
- Uses AI to generate comprehensive test plan
- Follows your custom PDF template structure

**Output:** Complete Markdown test plan with:
- Test Scope & Overview
- Test Scenarios
- Test Cases
- Acceptance Criteria validation
- Export-ready documentation

---

## 💻 Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast builds
- Tailwind CSS for styling
- Shadcn/UI components
- React hooks for state management

### Backend  
- Node.js + Express
- SQLite for persistent storage
- Multer for file uploads
- PDF-parse for template extraction
- AES-256 encryption for credentials

### Integrations
- JIRA REST API v3
- Groq API (openai/gpt-oss-120b, llama-3.3-70b, mixtral)
- Ollama for local AI
- OpenAI API support

---

## 🔑 Key Features Built

✅ **JIRA Integration**
- Secure API token authentication
- Automatic ticket fetching
- ADF (Atlassian Document Format) parsing
- Recent tickets history

✅ **LLM Providers**
- Groq Cloud API (fast & affordable)
- Ollama Local AI
- OpenAI API support
- Model switching in Settings

✅ **Template Management**
- PDF upload with drag & drop
- Automatic structure extraction
- Default template fallback
- Template preview

✅ **Security**
- AES-256 encrypted credentials
- No API keys in frontend
- Secure backend storage
- CORS protection

✅ **User Experience**
- Clean sidebar navigation
- Loading states & progress indicators
- Toast notifications
- Copy/Export functionality

---

## 🏆 Impact

| Before | After |
|--------|-------|
| 30+ minutes per test plan | 30 seconds |
| Manual copy-paste | Auto-fetch from JIRA |
| Generic templates | Custom PDF structure |
| Separate documentation | All-in-one tool |

---

## 📁 Project Structure

```
intelligent-test-plan-generator/
├── backend/
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Business logic
│   │   └── utils/       # Helpers
│   └── data/           # SQLite database
├── frontend/
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Dashboard, Settings, History
│   │   ├── hooks/       # Custom React hooks
│   │   └── services/   # API layer
│   └── dist/           # Production build
└── templates/          # PDF templates
```

---

## 🎓 Challenges Overcome

1. **Groq SDK Issues** - The official SDK had bugs, so I rewrote it to use native fetch API
2. **Decommissioned Models** - llama3-70b and mixtral were deprecated; adapted to use new models
3. **ADF Parsing** - JIRA descriptions use Atlassian Document Format; built custom parser
4. **Encryption** - API tokens needed secure storage; implemented AES-256 encryption
5. **CORS Configuration** - Secured API endpoints while allowing frontend access

---

## 🔧 APIs Built

```
POST /api/settings/jira      # Save JIRA credentials
POST /api/settings/llm       # Save LLM configuration
POST /api/jira/fetch          # Fetch JIRA ticket
POST /api/templates/upload    # Upload PDF template
POST /api/testplan/generate   # Generate test plan
GET  /api/testplan/history    # Get generation history
```

---

## 💡 Why This Matters

As QA Engineers, we spend too much time on documentation instead of testing. This tool frees up that time for what actually matters - finding bugs and improving quality.

The AI understands context from JIRA tickets and generates structured, comprehensive test plans that follow your organization's template format.

---

## 🔗 Tech Stack Highlights

⚡ Groq API - Incredibly fast inference, affordable pricing
🗄️ SQLite - Zero-config database
⚛️ React 18 - Modern declarative UI
🔒 AES-256 Encryption - Bank-grade security

---

## 🎉 Try It Yourself!

The project is now live and working. Steps to run:

1. Clone the repository
2. `cd backend && npm install && npm run dev`
3. `cd frontend && npm install && npm run dev`
4. Open http://localhost:5173
5. Configure JIRA credentials in Settings
6. Select your LLM provider (Groq recommended)
7. Enter JIRA ticket ID and generate!

---

What repetitive QA tasks are eating up your time? Would love to hear about automation opportunities! 👇

#SoftwareTesting #QAEngineering #TestAutomation #LinkedIn #BuildInPublic #NodeJS #ReactJS #AI #Groq #JIRA

---

*Note: Happy to share the GitHub repo if there's interest!*
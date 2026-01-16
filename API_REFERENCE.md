# Backend API Reference

This document describes the expected API endpoints and responses that the frontend expects from the backend.

## 🔐 Authentication Endpoints

### POST /auth/register

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Email already exists"
}
```

---

### POST /auth/login

**Request:**
```json
{
  "email": "john@example.com",
  "password": "secure_password"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Error Response (401):**
```json
{
  "message": "Invalid credentials"
}
```

---

## 📊 Entries Endpoints

### GET /entries/dashboard/summary

Returns today's health summary.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "calories": 2000,
  "sleepHours": 8,
  "steps": 10000,
  "heartRate": 72,
  "mood": "good",
  "waterIntake": 8
}
```

---

### GET /entries

Returns all entries (last 30).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
```
?limit=30&offset=0
```

**Success Response (200):**
```json
[
  {
    "id": "abc123",
    "date": "2024-01-15",
    "calories": 2000,
    "sleepHours": 8,
    "steps": 10000,
    "heartRate": 72,
    "mood": "good",
    "waterIntake": 8,
    "symptoms": ["Headache"],
    "notes": "Felt great today",
    "createdAt": "2024-01-15T10:00:00Z"
  },
  {
    "id": "abc124",
    "date": "2024-01-14",
    "calories": 1800,
    "sleepHours": 7,
    "steps": 8000,
    "heartRate": 70,
    "mood": "neutral",
    "waterIntake": 7,
    "symptoms": [],
    "notes": "",
    "createdAt": "2024-01-14T10:00:00Z"
  }
]
```

---

### POST /entries

Create a new entry.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "date": "2024-01-15",
  "calories": 2000,
  "sleepHours": 8,
  "steps": 10000,
  "heartRate": 72,
  "mood": "good",
  "waterIntake": 8,
  "symptoms": ["Headache", "Fatigue"],
  "notes": "Had a good day overall"
}
```

**Success Response (201):**
```json
{
  "id": "abc125",
  "date": "2024-01-15",
  "calories": 2000,
  "sleepHours": 8,
  "steps": 10000,
  "heartRate": 72,
  "mood": "good",
  "waterIntake": 8,
  "symptoms": ["Headache", "Fatigue"],
  "notes": "Had a good day overall",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

---

### PUT /entries/:id

Update an existing entry.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "date": "2024-01-15",
  "calories": 2100,
  "sleepHours": 8,
  "steps": 10500,
  "heartRate": 73,
  "mood": "good",
  "waterIntake": 8,
  "symptoms": ["Fatigue"],
  "notes": "Updated notes"
}
```

**Success Response (200):**
```json
{
  "id": "abc125",
  "date": "2024-01-15",
  "calories": 2100,
  "sleepHours": 8,
  "steps": 10500,
  "heartRate": 73,
  "mood": "good",
  "waterIntake": 8,
  "symptoms": ["Fatigue"],
  "notes": "Updated notes",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

---

### DELETE /entries/:id

Delete an entry.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "message": "Entry deleted successfully"
}
```

**Error Response (404):**
```json
{
  "message": "Entry not found"
}
```

---

## 🤖 AI Endpoints

### POST /ai/chat

Chat with AI assistant.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "I've been feeling tired lately. What should I do?"
}
```

**Success Response (200):**
```json
{
  "message": "It sounds like you might need more rest. Consider getting 8 hours of sleep and staying hydrated. If fatigue persists, consult a healthcare professional."
}
```

**Rate Limit Response (429):**
```json
{
  "message": "Too many requests. Please try again later."
}
```

---

### POST /ai/weekly-report

Generate AI-powered weekly health report.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{}
```

**Success Response (200):**
```json
{
  "report": "Weekly Health Summary (Jan 8-14, 2024)\n\nGreat week overall! Your average sleep was 7.5 hours, which is solid. Steps averaged 9,200 - keep up the activity!\n\nAreas to improve:\n- Increase water intake (averaging 6.5 cups, aim for 8)\n- Monitor mood spikes (had one low day on Jan 12)\n\nOverall Rating: 8/10\n\nKeep tracking - consistency is key!"
}
```

**Rate Limit Response (429):**
```json
{
  "message": "Weekly report generation limit reached. Please try again tomorrow."
}
```

---

## ✅ Expected Behaviors

### Authentication
- Token is JWT (JSON Web Token)
- Should be in `Authorization: Bearer <token>` header
- Backend should validate token signature
- Expired tokens return 401

### Validation
- Email must be valid format
- Password minimum 8 characters
- All health metrics are numbers
- Mood is one of: ["poor", "neutral", "good", "excellent"]

### Rate Limiting
- AI endpoints should implement rate limiting
- Return 429 status with clear message
- Consider: 5 requests per hour per user for chat, 1 per day for weekly report

### Error Handling
- All error responses should have `message` field
- Status codes: 200 (success), 201 (created), 400 (bad request), 401 (unauthorized), 404 (not found), 429 (rate limit), 500 (server error)

---

## 🚀 Setup Checklist

Before connecting frontend to backend:

- [ ] Backend running on `http://localhost:3001`
- [ ] CORS enabled for `http://localhost:5173` (frontend dev server)
- [ ] Environment variable or hardcoded base URL: `http://localhost:3001/api`
- [ ] All auth endpoints implemented
- [ ] Entry endpoints (CRUD) implemented
- [ ] AI endpoints with rate limiting
- [ ] Proper error messages in all responses
- [ ] Token validation on protected endpoints
- [ ] Auto-logout mechanism for 401 responses

---

## 🧪 Testing the API with curl

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Dashboard Summary
```bash
curl -X GET http://localhost:3001/api/entries/dashboard/summary \
  -H "Authorization: Bearer <token>"
```

### Create Entry
```bash
curl -X POST http://localhost:3001/api/entries \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-01-15",
    "calories": 2000,
    "sleepHours": 8,
    "steps": 10000,
    "heartRate": 72,
    "mood": "good",
    "waterIntake": 8,
    "symptoms": [],
    "notes": "Test entry"
  }'
```

### Chat with AI
```bash
curl -X POST http://localhost:3001/api/ai/chat \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello! How can I improve my health?"
  }'
```

---

## 📌 System Prompt for AI

When implementing the AI endpoints, use this system prompt to guide responses:

```
You are a professional, friendly health assistant.

Your role:
- Give supportive, non-medical advice
- Analyze health habits gently
- Encourage healthy routines
- Never provide diagnoses or medical treatment
- Keep responses concise and reassuring

Tone:
- Calm
- Motivational
- Human-like
- Non-judgmental

If user asks medical questions:
- Politely suggest consulting a healthcare professional

Example exchange:
User: "I've been having headaches"
Assistant: "Headaches can result from many things - stress, dehydration, or sleep issues. 
Try increasing water intake and getting good rest. If they persist, definitely see a doctor. 
How's your sleep and stress level been?"
```

---

## 🔐 Security Notes

- Always validate token before accessing protected endpoints
- Never expose the backend API URL in frontend code (use environment variables)
- Hash passwords (use bcrypt or similar)
- Use HTTPS in production (not just HTTP)
- Implement CORS properly - only allow frontend domain
- Rate limit API endpoints to prevent abuse
- Validate all input on backend (don't trust frontend validation)
- Log important events (login, API errors) for debugging

---

Generated for HealthTrack Frontend - January 2024

# Expense Tracker Fullstack

A modern expense tracker built with Django REST Framework, SQLite, Swagger/OpenAPI, React, Vite, TailwindCSS, and Docker.

## Tech Stack

- Backend: Django 6, Django REST Framework, SQLite, drf-spectacular, django-cors-headers
- Frontend: React, Vite, TailwindCSS, Axios
- DevOps: Docker, Docker Compose, hot reload for backend and frontend

## Project Structure

```text
expense-tracker-fullstack/
  backend/
    expense_tracker/
    transactions/
    manage.py
    requirements.txt
    Dockerfile
  frontend/
    src/
    package.json
    Dockerfile
  docker-compose.yml
```

## Run With Docker

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api/transactions/
- Swagger UI: http://localhost:8000/api/docs/
- OpenAPI schema: http://localhost:8000/api/schema/

## Backend Local Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver 8000
```

## Frontend Local Setup

```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```

## Environment Variables

Backend variables live in `backend/.env`:

```env
SECRET_KEY=replace-me
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0,192.168.0.112
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://192.168.0.112:5173
```

Frontend variable:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## Sample API Requests

Create a transaction:

```bash
curl -X POST http://localhost:8000/api/transactions/ \
  -H "Content-Type: application/json" \
  -d '{"title":"Salary","amount":"4500.00","type":"income","category":"Work"}'
```

List transactions:

```bash
curl http://localhost:8000/api/transactions/
```

Update a transaction:

```bash
curl -X PATCH http://localhost:8000/api/transactions/1/ \
  -H "Content-Type: application/json" \
  -d '{"amount":"120.00","category":"Groceries"}'
```

Delete a transaction:

```bash
curl -X DELETE http://localhost:8000/api/transactions/1/
```

Monthly summary:

```bash
curl "http://localhost:8000/api/summary/monthly/?year=2026&month=5"
```

The summary endpoint defaults to the current month when `year` and `month` are omitted.

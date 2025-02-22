# Work-it Backend

## Overview
The backend of **Work-it** is built using Node.js, Express, and MySQL to provide a robust and scalable freelancing platform. It facilitates user authentication, job postings, applications, and user profile management.

## Features
- User Authentication (Client & Freelancer)
- Job Listings & Applications
- Skill Management
- Secure API Endpoints
- Database Integration with MySQL

## API Routes
The backend API is structured based on frontend components and features for seamless integration.

### Authentication
| Route | Method | Description | Frontend Integration |
|--------|--------|---------------------------|---------------------------|
| `/api/auth/register` | POST | Register a new user (client or freelancer) | `forms/Sign-up/PersonalInformation.tsx` |
| `/api/auth/login` | POST | Authenticate a user and return a token | `forms/Login.tsx` |

### User Management
| Route | Method | Description | Frontend Integration |
|--------|--------|---------------------------|---------------------------|
| `/api/users/:id` | GET | Get user details by ID | `protected/client/` & `protected/employee/` |
| `/api/users/:id/skills` | GET | Get a freelancer's skills | `forms/Sign-up/Interest.tsx` |
| `/api/users/:id/skills` | POST | Update or add skills for a freelancer | `forms/Sign-up/Interest.tsx` |

### Job Listings
| Route | Method | Description | Frontend Integration |
|--------|--------|---------------------------|---------------------------|
| `/api/jobs` | GET | Fetch all available jobs | `pages/ApplyForJob.tsx` |
| `/api/jobs/:id` | GET | Fetch details of a specific job by ID | `components/JobDetails.tsx` |
| `/api/jobs` | POST | Post a new job (client feature) | `protected/client/` |
| `/api/jobs/:id/apply` | POST | Apply to a job (freelancer feature) | `protected/employee/` |
| `/api/jobs/:id/status` | PATCH | Update job status (completed, ongoing) | `protected/client/` |

### Education Form
| Route | Method | Description | Frontend Integration |
|--------|--------|---------------------------|---------------------------|
| `/api/education` | POST | Save education details for a user | `forms/Sign-up/EducationForm.tsx` |

## Suggested Frontend Integration Points
To start backend integration, focus on these frontend files:

- **Authentication:**
  - `forms/Login.tsx` → `/api/auth/login`
  - `forms/Sign-up/PersonalInformation.tsx` → `/api/auth/register`
  
- **Job Listings:**
  - `pages/ApplyForJob.tsx` → `/api/jobs (GET)`
  - `components/JobDetails.tsx` → `/api/jobs/:id`

- **User-Specific Data:**
  - `protected/client/` → `/api/jobs (POST)`, `/api/jobs/:id/status`, `/api/users/:id`
  - `protected/employee/` → `/api/jobs/:id/apply`, `/api/users/:id/skills`

- **Skill Management:**
  - `forms/Sign-up/Interest.tsx` → `/api/users/:id/skills (GET & POST)`

## Database Schema (Updated)
To accommodate all necessary fields for education details, modify your MySQL database:

```sql
ALTER TABLE education_form ADD COLUMN startDate DATE;
ALTER TABLE education_form ADD COLUMN endDate DATE;
ALTER TABLE education_form ADD COLUMN schooling BOOLEAN;
ALTER TABLE education_form ADD COLUMN schoolState VARCHAR(100);
ALTER TABLE education_form ADD COLUMN schoolCountry VARCHAR(100);
```

## Frontend Routes
Your frontend is structured with React Router. Here are the key routes:

| Path | Component |
|------|-----------|
| `/login` | `Login.tsx` |
| `/sign-up` | `SignUpOne.tsx` |
| `/sign-upprofile` | `FormWrapper.tsx` |
| `/sign-upprofile/education` | `EducationForm.tsx` |
| `/sign-upprofile/interest` | `Interest.tsx` |
| `/home` | `PageLayout.tsx` |
| `/gigs` | `PageLayout.tsx` (Job Listings) |
| `/gigs/details` | `ApplyForJob.tsx` (Job Details) |

## Setup & Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Justreadin/Work-it.git
   cd Work-it
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables (`.env`):
   ```env
   DATABASE_URL=mysql://user:password@localhost:3306/getit_done
   JWT_SECRET=your_secret_key
   ```
4. Run the server:
   ```sh
   npm start
   ```

## Contribution Guidelines
1. Fork the repository.
2. Create a feature branch.
3. Commit changes and push.
4. Open a pull request.

---

This README ensures clear documentation for developers working on **Work-it**. 🚀


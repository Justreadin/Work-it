# Getit Done at Little Price

## App Description
Welcome to our Freelancing App, a platform designed to streamline the hiring process for clients seeking quality work at affordable rates. Connect with talented freelancers who can complete your projects quickly and efficiently, ensuring you get the best results without breaking the bank.

Our app not only benefits clients but also empowers freelancers to learn and enhance their skills while working on real-world projects. With opportunities for professional growth and development, freelancers can elevate their expertise and advance their careers—all while delivering exceptional service to their clients.

Join us today and experience a win-win solution for both clients and freelancers!

## Project Structure

### Frontend Structure
```
project-root/
├── index.html
├── node_modules/
├── public/
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── vite_env.d.ts
│   ├── assets/
│   │   └── Images/
│   ├── components/
│   │   ├── ApplyModal.tsx
│   │   └── JobDetails.tsx
│   ├── constants/
│   │   └── const.type.ts
│   ├── contexts/
│   │   ├── FormContext.tsx
│   │   └── HeaderContext.tsx
│   ├── forms/
│   │   ├── Login.tsx
│   │   ├── PersonalizedModal.tsx
│   │   ├── SignUpOne.tsx
│   │   ├── StageFormLayout.tsx
│   │   └── SignUp/
│   │       ├── EducationForm.tsx
│   │       ├── PersonalInfo.tsx
│   │       ├── Interest.tsx
│   │       ├── MailVerification.tsx
│   │       └── PhotoUpload.tsx
│   ├── header/
│   │   ├── Header.tsx
│   │   ├── HeaderAction.tsx
│   │   ├── Nav.tsx
│   │   └── HeaderWrapper.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Footer.tsx
│   │   ├── Equip.tsx
│   │   ├── Uniqueness.tsx
│   │   ├── WhoWeAre.tsx
│   │   ├── Opportunities.tsx
│   │   ├── AfterLogin.tsx
│   │   ├── ApplyForJob.tsx
│   │   ├── Home.tsx
│   │   ├── Overview.tsx
│   │   └── PageLayout.tsx
│   ├── pages/
│   ├── protected/
│   │   ├── client/
│   │   ├── employee/
│   │   └── welcome/
│   └── ui/
│       ├── BecomeAClientButton.tsx
│       ├── ReadMoreButton.tsx
│       └── GetStartedButton.tsx
├── .gitignore
├── package-lock.json
├── package.json
├── postcss.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### Backend Structure
```
Backend/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── userController.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   ├── api.js
│   │   └── auth.js
│   ├── uploads/
│   ├── .env
│   ├── .gitignore
│   ├── Backend.txt
│   ├── package-lock.json
|   |-- package.json
|   |-- Readme.md
|   |-- structure.txt
```

## Backend Overview
The backend of **Work-it** is built using Node.js, Express, and MySQL to provide a robust and scalable freelancing platform. It facilitates user authentication, job postings, applications, and user profile management.

### Features
- User Authentication (Client & Freelancer)
- Job Listings & Applications
- Skill Management
- Secure API Endpoints
- Database Integration with MySQL

### API Routes
#### Authentication
| Route | Method | Description |
|--------|--------|---------------------------|
| `/api/auth/register` | POST | Register a new user (client or freelancer) |
| `/api/auth/login` | POST | Authenticate a user and return a token |

#### User Management
| Route | Method | Description |
|--------|--------|---------------------------|
| `/api/users/:id` | GET | Get user details by ID |
| `/api/users/:id/skills` | GET | Get a freelancer's skills |
| `/api/users/:id/skills` | POST | Update or add skills for a freelancer |

#### Job Listings
| Route | Method | Description |
|--------|--------|---------------------------|
| `/api/jobs` | GET | Fetch all available jobs |
| `/api/jobs/:id` | GET | Fetch details of a specific job by ID |
| `/api/jobs` | POST | Post a new job (client feature) |
| `/api/jobs/:id/apply` | POST | Apply to a job (freelancer feature) |
| `/api/jobs/:id/status` | PATCH | Update job status (completed, ongoing) |

### Setup & Installation
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

### Contribution Guidelines
1. Fork the repository.
2. Create a feature branch.
3. Commit changes and push.
4. Open a pull request.

---
This README ensures clear documentation for developers working on **Work-it**. 🚀


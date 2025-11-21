## Plan: Add Full-Stack Backend to TalentFirst

This plan outlines implementing a backend using PostgreSQL database, Prisma ORM, JWT-based authentication with httpOnly cookies, and Next.js API routes to replace mock data, enable user registration/login, and support CRUD operations for talent profiles, employer profiles, proposals, and messaging.

### Steps

1. Set up Prisma with PostgreSQL schema for User, TalentProfile, EmployerProfile, Proposal, Message models.
2. Implement authentication API routes for register, login, logout with password hashing and JWT tokens.
3. Create API routes for talent profiles CRUD, search/filtering, and recommendations.
4. Build employer profile and proposal management API routes with status updates.
5. Integrate messaging system API routes for proposal communications.
6. Update frontend components to fetch from new API endpoints instead of mock data.

### Detailed Task List

- [ ] **Database Setup**

  - [ ] Install Prisma and PostgreSQL dependencies
  - [ ] Configure PostgreSQL connection in environment variables
  - [ ] Initialize Prisma schema file
  - [ ] Define User model with id, email, password, name, role, createdAt, updatedAt
  - [ ] Define TalentProfile model with userId, title, location, skills, experience, rate, availability, bio, education, workHistory, portfolio, rating
  - [ ] Define EmployerProfile model with userId, companyName, industry, size, logo, website, location, description, foundedYear, socialMediaLinks
  - [ ] Define Proposal model with id, employerId, talentId, jobTitle, projectDescription, compensationDetails, startDate, duration, location, status, message, createdAt, updatedAt
  - [ ] Define Message model with id, proposalId, senderId, receiverId, content, read, createdAt
  - [ ] Define Session model with id, userId, token, expiresAt, createdAt
  - [ ] Run Prisma generate and push to create database tables

- [ ] **Authentication System**

  - [ ] Install bcryptjs and jsonwebtoken libraries
  - [ ] Create /api/auth/register route with POST handler for user registration
  - [ ] Implement password hashing with bcrypt in register route
  - [ ] Create /api/auth/login route with POST handler for user login
  - [ ] Implement session token generation and httpOnly cookie setting in login route
  - [ ] Create /api/auth/logout route to clear session cookie
  - [ ] Add middleware for session verification on protected routes
  - [ ] Update login/signup pages to use API instead of mock

- [ ] **Talent Profile API**

  - [ ] Create /api/talent route with GET (list/search), POST (create) handlers
  - [ ] Implement search/filtering logic for skills, location, experience
  - [ ] Create /api/talent/[id] route with GET, PUT, DELETE handlers
  - [ ] Add recommendations logic (basic matching based on skills/location)
  - [ ] Update browse-talent, profile/[id], create-profile pages to use API

- [ ] **Employer Profile API**

  - [ ] Create /api/employer route with GET, POST handlers
  - [ ] Create /api/employer/[id] route with GET, PUT, DELETE handlers
  - [ ] Update employer/profile page to use API

- [ ] **Proposal API**

  - [ ] Create /api/proposals route with GET (list), POST (create) handlers
  - [ ] Create /api/proposals/[id] route with GET, PUT (status update) handlers
  - [ ] Implement status transitions (pending -> accepted/declined)
  - [ ] Update send-proposal, proposals, employer/dashboard pages to use API

- [ ] **Messaging API**

  - [ ] Create /api/messages route with GET (by proposal), POST (send) handlers
  - [ ] Create /api/messages/[id] route with PUT (mark as read) handler
  - [ ] Update proposals page communication threads to use API

- [ ] **Frontend Integration**

  - [ ] Replace all mock data in components with API calls
  - [ ] Add loading states and error handling for API requests
  - [ ] Implement authentication state management (context/provider)
  - [ ] Add protected route guards for authenticated pages
  - [ ] Test all user journeys end-to-end

- [ ] **Security & Validation**

  - [ ] Add Zod schemas for all API input validation
  - [ ] Implement rate limiting on auth routes
  - [ ] Add CORS configuration for API routes
  - [ ] Sanitize user inputs to prevent XSS
  - [ ] Add CSRF protection if using sessions

- [ ] **Additional Features (Optional)**
  - [ ] Add email notifications for proposals/messages
  - [ ] Implement password reset functionality
  - [ ] Add analytics tracking for dashboard metrics


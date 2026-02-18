# TalentFirst Development Plan

## Project Status Overview

This plan outlines all steps needed to make TalentFirst fully functional, from database setup to complete frontend integration.

---

## Phase 1: Database Setup & Schema Configuration

### 1.1 PostgreSQL Database Setup

- [x] **Install PostgreSQL** (if not already installed)
  - PostgreSQL 18.1 is installed
  - Database user `postgres` is configured
- [x] **Create TalentFirst Database**
  - Database `talentfirst` already exists
  - Database is accessible and has existing tables (users, talent_profiles, employer_profiles, proposals, messages, sessions)
- [x] **Set up environment variables**
  - `.env` file exists with `DATABASE_URL`
  - Format: `postgresql://postgres:password1234@localhost:5432/talentfirst?schema=public`
  - Connected successfully

**Status:** ✅ Complete (PostgreSQL 18.1 installed, database `talentfirst` exists and is operational)

---

### 1.2 Prisma Schema Update

#### 1.2.1 Update User Model

- [x] **Review existing User model**
  - Current fields: id, email, password, name, role, createdAt, updatedAt
  - Status: ✅ Matches STORIES.md requirements

#### 1.2.2 Update TalentProfile Model

- [ ] **Add missing fields to TalentProfile**
  - Add `name: String` (for display, separate from User.name)
  - Add `reviewCount: Int @default(0)` (for ratings display)
  - Change `portfolio: Json?` to individual URL fields:
    - `portfolio: String?` (single URL)
    - `linkedin: String?`
    - `github: String?`
    - `website: String?`
  - Add `openToRemote: Boolean @default(true)`
  - Add `openToContract: Boolean @default(true)`
  - Remove/deprecate `education: Json?` (not used in frontend)
  - Remove/deprecate `workHistory: Json?` (not used in frontend)

**Status:** ✅ Complete (Schema matches requirements)

#### 1.2.3 Update EmployerProfile Model

- [ ] **Add missing fields to EmployerProfile**
  - Add `culture: String? @db.Text` (company culture description)
  - Change `socialMediaLinks: Json?` to individual fields:
    - `linkedin: String?`
    - `twitter: String?`
  - Add `benefits: String[]` (array of benefits)
  - Add `techStack: String[]` (array of technologies)
  - Add `remotePolicy: String` (remote/hybrid/onsite)
  - Add `isHiring: Boolean @default(true)`

**Status:** ✅ Complete (Schema matches requirements)

#### 1.2.4 Update Proposal Model

- [ ] **Rename and add fields to Proposal**
  - Rename `jobTitle` → `position`
  - Rename `projectDescription` → `message`
  - Rename `compensationDetails` → `budget`
  - Add `budgetType: String` (hourly/fixed/salary)
  - Add `remote: String` (Fully Remote/Hybrid/On-site)
  - Add `requirements: String? @db.Text`
  - Add `benefits: String? @db.Text`
  - Keep `duration: String?`
  - Keep `startDate: String?`
  - Keep `location: String`
  - Update `status` enum values if needed

**Status:** ✅ Complete (Schema matches requirements)

#### 1.2.5 Create SavedTalent Model

- [ ] **Add new SavedTalent model**

  ```prisma
  model SavedTalent {
    id         String   @id @default(cuid())
    employerId String
    talentId   String
    notes      String?  @db.Text
    savedDate  DateTime @default(now())

    employer User @relation("SavedByEmployer", fields: [employerId], references: [id], onDelete: Cascade)
    talent   TalentProfile @relation(fields: [talentId], references: [id], onDelete: Cascade)

    @@unique([employerId, talentId])
    @@map("saved_talents")
  }
  ```

**Status:** ✅ Complete (Schema matches requirements)

#### 1.2.6 Update Relations

- [ ] **Update User model relations**
  - Add `savedTalents SavedTalent[] @relation("SavedByEmployer")`
- [ ] **Update TalentProfile relations**
  - Add `savedBy SavedTalent[]`

**Status:** ✅ Complete (Schema matches requirements)

---

### 1.3 Prisma Migration

- [x] **Dropped and recreated database**
  - Dropped old `talentfirst` database
  - Created fresh `talentfirst` database
- [x] **Push schema to database**
  ```bash
  npx prisma db push
  ```
  - All tables created successfully:
    - users, talent_profiles, employer_profiles
    - proposals, saved_talents (new), messages, sessions
- [x] **Generate Prisma Client**
  ```bash
  npx prisma generate
  ```
  - Prisma Client v7.2.0 generated successfully

**Status:** ✅ Complete (Database schema matches Prisma schema perfectly)

---

### 1.4 Seed Database (Optional but Recommended)

- [ ] **Create seed script** (`prisma/seed.ts`)
  - Create sample talent profiles (5-10)
  - Create sample employer profiles (2-3)
  - Create sample proposals (3-5)
- [ ] **Run seed script**
  ```bash
  npx prisma db seed
  ```

**Status:** ❌ Not Implemented

---

## Phase 2: Backend API Implementation

### 2.1 Authentication API Routes

#### 2.1.1 User Registration

- [x] **POST /api/auth/register** ([`src/app/api/auth/register/route.ts`](src/app/api/auth/register/route.ts))
  - Validate input with Zod schema
  - Check email uniqueness
  - Hash password with bcrypt
  - Create User record
  - Create session/JWT token
  - Return user data and token

**Status:** ✅ Implemented

#### 2.1.2 User Login

- [x] **POST /api/auth/login** ([`src/app/api/auth/login/route.ts`](src/app/api/auth/login/route.ts))
  - Validate credentials
  - Compare hashed password
  - Create session
  - Return user data with role

**Status:** ✅ Implemented

#### 2.1.3 Get Current User

- [x] **GET /api/auth/me** ([`src/app/api/auth/me/route.ts`](src/app/api/auth/me/route.ts))
  - Verify session token
  - Return current user data

**Status:** ✅ Implemented

#### 2.1.4 Logout

- [ ] **POST /api/auth/logout**
  - Clear session cookie
  - Invalidate token
  - Return success response

**Status:** ❌ Not Implemented

#### 2.1.5 Forgot Password

- [ ] **POST /api/auth/forgot-password**
  - Validate email exists
  - Generate reset token
  - Send email with reset link (future)
  - Return success message

**Status:** ❌ Not Implemented

---

### 2.2 Talent Profile API Routes

#### 2.2.1 Create Talent Profile

- [ ] **POST /api/talents**
  - Validate user is authenticated
  - Validate user role is TALENT
  - Validate input data (title, bio, location, skills, rate, etc.)
  - Create TalentProfile record linked to userId
  - Return created profile

**Status:** ❌ Not Implemented

#### 2.2.2 Get Single Talent Profile

- [ ] **GET /api/talents/:id**
  - Fetch TalentProfile by id
  - Include user name from User relation
  - Return profile data or 404

**Status:** ❌ Not Implemented

#### 2.2.3 List All Talents (with filters)

- [ ] **GET /api/talents**
  - Accept query params: `search`, `skills`, `location`, `sort`, `page`, `limit`
  - Filter by search query (name, title, skills, bio)
  - Filter by skills array (AND logic)
  - Filter by location (contains)
  - Sort by: rating, rate, experience
  - Implement pagination (20 per page default)
  - Return talents array and total count

**Status:** ❌ Not Implemented

#### 2.2.4 Update Talent Profile

- [ ] **PUT /api/talents/:id**
  - Verify user owns this profile
  - Validate input data
  - Update TalentProfile record
  - Return updated profile

**Status:** ❌ Not Implemented

#### 2.2.5 Advanced Search

- [ ] **GET /api/talents/search**
  - Accept advanced filter params:
    - skills, location, experienceMin, experienceMax
    - rateMin, rateMax, availability, rating
    - remote, contract, languages, industries
  - Build complex Prisma query with filters
  - Sort by relevance/rating/rate/experience
  - Return filtered results

**Status:** ❌ Not Implemented

---

### 2.3 Employer Profile API Routes

#### 2.3.1 Create Company Profile

- [ ] **POST /api/companies**
  - Validate user is authenticated
  - Validate user role is EMPLOYER
  - Validate input data (companyName, industry, size, location, description, etc.)
  - Create EmployerProfile record linked to userId
  - Return created profile

**Status:** ❌ Not Implemented

#### 2.3.2 Get Company Profile

- [ ] **GET /api/companies/:userId**
  - Fetch EmployerProfile by userId
  - Return profile data or 404

**Status:** ❌ Not Implemented

#### 2.3.3 Update Company Profile

- [ ] **PUT /api/companies/:id**
  - Verify user owns this profile
  - Validate input data
  - Update EmployerProfile record (name, description, benefits, techStack, etc.)
  - Return updated profile

**Status:** ❌ Not Implemented

---

### 2.4 Proposal API Routes

#### 2.4.1 Send Proposal

- [ ] **POST /api/proposals**
  - Validate user is EMPLOYER
  - Validate input data (talentId, position, budget, message, etc.)
  - Create Proposal record with status "pending"
  - Send notification to talent (future)
  - Return created proposal

**Status:** ❌ Not Implemented

#### 2.4.2 Get Proposals for Talent

- [ ] **GET /api/proposals?talentId={userId}&status={filter}**
  - Fetch proposals where talentId matches
  - Filter by status if provided (pending/viewed/accepted/declined)
  - Include employer and company data (populate relations)
  - Sort by sentDate (newest first)
  - Return proposals array

**Status:** ❌ Not Implemented

#### 2.4.3 Get Proposals from Employer

- [ ] **GET /api/proposals?employerId={userId}&status={filter}**
  - Fetch proposals where employerId matches
  - Filter by status if provided
  - Include talent data (populate relations)
  - Sort by sentDate (newest first)
  - Return proposals array

**Status:** ❌ Not Implemented

#### 2.4.4 Get Single Proposal

- [ ] **GET /api/proposals/:id**
  - Fetch Proposal by id
  - Verify user is either sender or receiver
  - Include related data (company, talent)
  - Return proposal data

**Status:** ❌ Not Implemented

#### 2.4.5 Update Proposal Status

- [ ] **PUT /api/proposals/:id**
  - Validate user is the talent (receiver)
  - Accept status update (viewed/accepted/declined)
  - Accept optional response message
  - Update Proposal status and responseMessage
  - Send notification to employer (future)
  - Return updated proposal

**Status:** ❌ Not Implemented

---

### 2.5 Saved Talent API Routes

#### 2.5.1 Save Talent

- [ ] **POST /api/saved-talents**
  - Validate user is EMPLOYER
  - Accept talentId and optional notes
  - Check if already saved (unique constraint)
  - Create SavedTalent record
  - Return success response

**Status:** ❌ Not Implemented

#### 2.5.2 Get Saved Talents

- [ ] **GET /api/saved-talents?employerId={userId}**
  - Fetch SavedTalent records for employer
  - Include full TalentProfile data
  - Sort by savedDate (newest first)
  - Return saved talents array

**Status:** ❌ Not Implemented

#### 2.5.3 Unsave Talent

- [ ] **DELETE /api/saved-talents/:id**
  - Verify user owns this saved record
  - Delete SavedTalent record
  - Return success response

**Status:** ❌ Not Implemented

---

### 2.6 Recommendations API Routes

#### 2.6.1 Personalized Recommendations

- [ ] **GET /api/recommendations/for-you?employerId={userId}**
  - Fetch employer's company profile
  - Get employer's saved talents and proposals
  - Calculate match scores based on:
    - Skills overlap with past interactions
    - Budget fit (talent rate within range)
    - Location/remote preferences
    - Availability match
  - Sort by match score (highest first)
  - Return top 10-20 recommended talents with match reasons

**Status:** ❌ Not Implemented

#### 2.6.2 Trending Talents

- [ ] **GET /api/recommendations/trending**
  - Identify talents with:
    - High profile views (future metric)
    - Multiple recent proposals received
    - In-demand skills (most searched)
    - High ratings
  - Add trending reason for each
  - Return trending talents array

**Status:** ❌ Not Implemented

#### 2.6.3 Similar Hires

- [ ] **GET /api/recommendations/similar?employerId={userId}**
  - Get employer's saved/contacted talents
  - Find talents with similar skills
  - Exclude already contacted talents
  - Return similar talents array

**Status:** ❌ Not Implemented

---

### 2.7 Analytics API Routes

#### 2.7.1 Market Insights

- [ ] **GET /api/analytics/market-insights**
  - Aggregate skills across all talents
  - Calculate average rate per skill
  - Determine demand (count of talents with skill)
  - Calculate growth trends (optional)
  - Return top skills with metrics

**Status:** ❌ Not Implemented

#### 2.7.2 Employer Stats

- [ ] **GET /api/analytics/employer?employerId={userId}**
  - Count profile views (future)
  - Count proposals sent
  - Calculate response rate (accepted/sent)
  - Calculate average response time
  - Return stats object

**Status:** ❌ Not Implemented

---

## Phase 3: Frontend Integration

### 3.1 Authentication Pages

#### 3.1.1 Sign Up Page

- [x] **Page:** [`/signup`](src/app/signup/page.tsx)
  - [x] UI implemented with role selection
  - [ ] Connect to `POST /api/auth/register`
  - [ ] Handle success redirect based on role
  - [ ] Display validation errors

**Status:** 🟡 Partially Implemented (needs API connection)

#### 3.1.2 Login Page

- [x] **Page:** [`/login`](src/app/login/page.tsx)
  - [x] UI implemented
  - [x] Connected to `POST /api/auth/login`
  - [x] Role-based redirect implemented
  - [x] Error handling implemented

**Status:** ✅ Fully Implemented

#### 3.1.3 Forgot Password Page

- [x] **Page:** [`/forgot-password`](src/app/forgot-password/page.tsx)
  - [x] UI implemented
  - [ ] Connect to `POST /api/auth/forgot-password`
  - [ ] Handle success state

**Status:** 🟡 Partially Implemented (needs API)

---

### 3.2 Public Pages

#### 3.2.1 Landing Page

- [x] **Page:** [`/`](src/app/page.tsx)
  - [x] Hero section implemented
  - [x] Featured talents section (using mock data)
  - [ ] Replace mock data with API call to `GET /api/talents?featured=true`
  - [x] How It Works section
  - [x] Navigation links

**Status:** 🟡 Needs API Integration

#### 3.2.2 For Employers Page

- [x] **Page:** [`/for-employers`](src/app/for-employers/paget.tsx)
  - [x] Benefits section implemented
  - [x] How it works section
  - [x] Testimonials section
  - [x] CTA buttons

**Status:** ✅ Fully Implemented (static content)

#### 3.2.3 How It Works Page

- [ ] **Page:** `/how-it-works`
  - [ ] Create page file
  - [ ] Implement talent workflow
  - [ ] Implement employer workflow
  - [ ] Add FAQ section

**Status:** ❌ Not Implemented

---

### 3.3 Talent Pages

#### 3.3.1 Create Profile Page

- [x] **Page:** [`/create-profile`](src/app/create-profile/page.tsx)
  - [x] Form UI implemented (all fields)
  - [ ] Connect to `POST /api/talents`
  - [ ] Add form validation
  - [ ] Handle success redirect to `/proposals`
  - [ ] Display error messages

**Status:** 🟡 Needs API Connection

#### 3.3.2 Proposals Page (Talent)

- [x] **Page:** [`/proposals`](src/app/proposals/page.tsx)
  - [x] UI implemented with tabs and stats
  - [x] Proposal cards with mock data
  - [x] Proposal detail dialog
  - [ ] Connect to `GET /api/proposals?talentId={userId}`
  - [ ] Filter proposals by status (tabs)
  - [ ] Connect accept/decline to `PUT /api/proposals/:id`
  - [ ] Refresh data after action

**Status:** 🟡 Needs API Connection

#### 3.3.3 Talent Profile View Page

- [x] **Page:** [`/profile/[id]`](src/app/profile/[id]/page.tsx)
  - [x] Profile display UI implemented
  - [x] Using mock data
  - [ ] Connect to `GET /api/talents/:id`
  - [ ] Fetch similar talents
  - [ ] Handle 404 if profile not found
  - [ ] Add "Edit Profile" button if viewing own profile

**Status:** 🟡 Needs API Connection

---

### 3.4 Employer Pages

#### 3.4.1 Browse Talent Page

- [x] **Page:** [`/browse-talent`](src/app/browse-talent/page.tsx)
  - [x] Search and filters UI implemented
  - [x] Talent grid with mock data
  - [x] Client-side filtering implemented
  - [ ] Connect to `GET /api/talents`
  - [ ] Send search/filter params to API
  - [ ] Implement pagination (load more)
  - [ ] Update URL with filter state

**Status:** 🟡 Needs API Connection

#### 3.4.2 Advanced Search Page

- [x] **Page:** [`/search`](src/app/search/page.tsx)
  - [x] Advanced filters UI implemented
  - [x] Search suggestions
  - [x] Using mock data
  - [ ] Connect to `GET /api/talents/search`
  - [ ] Send all filter params to API
  - [ ] Implement saved searches (localStorage or DB)
  - [ ] Persist filters in URL

**Status:** 🟡 Needs API Connection

#### 3.4.3 Recommendations Page

- [x] **Page:** [`/recommendations`](src/app/recommendations/page.tsx)
  - [x] Three tabs UI implemented
  - [x] Match score display
  - [x] Market insights sidebar
  - [x] Activity stats sidebar
  - [x] Using mock data
  - [ ] Connect "For You" tab to `GET /api/recommendations/for-you`
  - [ ] Connect "Trending" tab to `GET /api/recommendations/trending`
  - [ ] Connect "Similar" tab to `GET /api/recommendations/similar`
  - [ ] Connect market insights to `GET /api/analytics/market-insights`
  - [ ] Connect activity stats to `GET /api/analytics/employer`

**Status:** 🟡 Needs API Connection

#### 3.4.4 Send Proposal Page

- [x] **Page:** [`/send-proposal/[talentId]`](src/app/send-proposal/[talentId]/page.tsx)
  - [x] Form UI implemented (all fields)
  - [x] Talent sidebar display
  - [x] Using mock talent data
  - [ ] Fetch talent by ID from `GET /api/talents/:id`
  - [ ] Pre-fill company name from employer profile
  - [ ] Connect to `POST /api/proposals`
  - [ ] Add form validation
  - [ ] Redirect to `/proposal-success` on success

**Status:** 🟡 Needs API Connection

#### 3.4.5 Proposal Success Page

- [x] **Page:** [`/proposal-success`](src/app/proposal-success/page.tsx)
  - [x] Success message UI
  - [x] Timeline cards
  - [x] Tips section
  - [x] Action buttons

**Status:** ✅ Fully Implemented (static content)

#### 3.4.6 Employer Dashboard

- [x] **Page:** [`/employer/dashboard`](src/app/employer/dashboard/page.tsx)
  - [x] Overview tab with stats cards
  - [x] Quick actions
  - [x] Recent activity
  - [x] Proposals tab with filtering
  - [x] Saved talent tab
  - [x] Analytics tab
  - [x] Using mock data
  - [ ] Connect stats to `GET /api/analytics/employer`
  - [ ] Connect proposals to `GET /api/proposals?employerId={userId}`
  - [ ] Connect saved talents to `GET /api/saved-talents`
  - [ ] Implement save/unsave functionality
  - [ ] Implement proposal filtering by status

**Status:** 🟡 Needs API Connection

#### 3.4.7 Company Profile Page

- [x] **Page:** [`/employer/profile`](src/app/employer/profile/page.tsx)
  - [x] Form UI implemented (all fields)
  - [x] Benefits and tech stack management
  - [x] Using mock pre-filled data
  - [ ] Fetch existing profile from `GET /api/companies/:userId`
  - [ ] Connect create to `POST /api/companies`
  - [ ] Connect update to `PUT /api/companies/:id`
  - [ ] Add form validation
  - [ ] Show success notification

**Status:** 🟡 Needs API Connection

---

### 3.5 Shared Components & Features

#### 3.5.1 Auth Context & Hook

- [ ] **Create AuthContext** (`src/contexts/AuthContext.tsx`)
  - Manage user session state
  - Provide `useAuth()` hook
  - Handle login/logout
  - Persist user data
  - Fetch current user on mount

**Status:** ❌ Not Implemented

#### 3.5.2 Protected Routes Middleware

- [ ] **Create middleware** (`src/middleware.ts`)
  - Check authentication on protected routes
  - Redirect to `/login` if not authenticated
  - Check user role for role-specific pages
  - Redirect TALENT away from employer pages and vice versa

**Status:** ❌ Not Implemented

#### 3.5.3 API Client/Helper Functions

- [ ] **Create API utilities** (`src/lib/api.ts`)
  - Create reusable fetch wrapper
  - Handle authentication headers
  - Handle error responses
  - Type-safe API calls

**Status:** ❌ Not Implemented

#### 3.5.4 Save Talent Feature

- [ ] **Add save button to talent cards**
  - Add heart/bookmark icon to all talent cards
  - Connect to `POST /api/saved-talents` (save)
  - Connect to `DELETE /api/saved-talents/:id` (unsave)
  - Update UI state immediately (optimistic update)
  - Show saved indicator on saved talents

**Status:** ❌ Not Implemented

---

## Phase 4: Testing & Quality Assurance

### 4.1 API Testing

- [ ] **Test all API endpoints**
  - Test authentication flow (signup, login, logout)
  - Test profile creation and updates
  - Test proposal flow (send, view, accept/decline)
  - Test search and filtering
  - Test saved talents functionality
  - Test error handling and validation

**Status:** ❌ Not Started

### 4.2 Frontend Integration Testing

- [ ] **Test user flows**
  - Talent journey: signup → profile → proposals → respond
  - Employer journey: signup → profile → browse → proposal → track
  - Test role-based access control
  - Test form validations
  - Test error states and loading states

**Status:** ❌ Not Started

### 4.3 Manual Testing Checklist

- [ ] **Test on different browsers**
  - Chrome, Firefox, Safari, Edge
- [ ] **Test responsive design**
  - Mobile (320px, 375px, 414px)
  - Tablet (768px, 1024px)
  - Desktop (1280px, 1920px)
- [ ] **Test edge cases**
  - Empty states (no proposals, no saved talents)
  - Long text content
  - Large skill/benefit arrays
  - Invalid input data

**Status:** ❌ Not Started

---

## Phase 5: Deployment Preparation

### 5.1 Environment Configuration

- [ ] **Set up production environment variables**
  - Production DATABASE_URL
  - Production JWT_SECRET
  - Production API URLs
- [ ] **Configure production database**
  - Set up production PostgreSQL instance
  - Run migrations on production DB
  - Set up backup strategy

**Status:** ❌ Not Started

### 5.2 Build & Deploy

- [ ] **Build for production**
  ```bash
  npm run build
  ```
- [ ] **Test production build locally**
  ```bash
  npm run start
  ```
- [ ] **Deploy to hosting platform**
  - Vercel/Netlify for frontend
  - Railway/Render/Heroku for database

**Status:** ❌ Not Started

---

## Phase 6: Future Enhancements (Post-MVP)

### 6.1 Messaging System

- [ ] Create Message model in Prisma
- [ ] Implement real-time chat (WebSockets or Pusher)
- [ ] Create messaging UI
- [ ] Add notification system

**Status:** ❌ Not Started

### 6.2 Notifications

- [ ] Create Notification model
- [ ] Implement email notifications (SendGrid/Resend)
- [ ] Add in-app notification center
- [ ] Push notifications (optional)

**Status:** ❌ Not Started

### 6.3 Reviews & Ratings

- [ ] Create Review model
- [ ] Allow employers to rate talent after project
- [ ] Allow talent to rate employers
- [ ] Display reviews on profiles

**Status:** ❌ Not Started

### 6.4 Advanced Features

- [ ] Video introduction uploads
- [ ] Interview scheduling
- [ ] Contract management
- [ ] Payment processing
- [ ] AI-powered matching

**Status:** ❌ Not Started

---

## Status Legend

- ✅ **Fully Implemented** - Complete and working
- 🟡 **Partially Implemented** - UI done, needs API connection
- ❌ **Not Implemented** - Not started or needs work

---

## Current Priority Tasks

### Immediate (Phase 1-2):

1. Update Prisma schema to match frontend requirements
2. Run migrations
3. Implement talent profile API endpoints
4. Implement proposal API endpoints
5. Connect create profile page to API

### Short-term (Phase 3):

6. Connect all talent pages to APIs
7. Connect all employer pages to APIs
8. Implement auth context and protected routes
9. Add save talent functionality

### Medium-term (Phase 4-5):

10. Comprehensive testing
11. Bug fixes and polish
12. Production deployment

---

## Notes

- Frontend is mostly complete with mock data
- Backend API needs to be built
- Database schema needs updates before proceeding
- Focus on MVP features first (messaging, notifications later)
- Use TypeScript for type safety throughout
- Follow the data models in STORIES.md for consistency

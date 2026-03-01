# TalentFirst - User Stories & Technical Overview

## Application Overview

TalentFirst is a **reverse job board platform** where talented professionals create profiles showcasing their skills, and employers browse these profiles to send personalized job proposals directly to candidates. This flips the traditional job application model - instead of talent applying to jobs, employers compete for talent's attention.

---

## Core Data Models (Minimal FE Fields)

### User Model

```typescript
{
  id: string;
  email: string;
  password: string(hashed);
  name: string;
  role: "TALENT" | "EMPLOYER";
  createdAt: Date;
}
```

### TalentProfile Model

```typescript
{
  id: string
  userId: string (FK to User)
  name: string
  title: string
  bio: string
  location: string
  skills: string[]
  experience: string
  rate: number
  availability: string
  rating: number
  reviewCount: number
  portfolio?: string
  linkedin?: string
  github?: string
  website?: string
  openToRemote: boolean
  openToContract: boolean
}
```

### EmployerProfile Model

```typescript
{
  id: string
  userId: string (FK to User)
  companyName: string
  industry: string
  size: string
  location: string
  website?: string
  description: string
  culture?: string
  benefits: string[]
  techStack: string[]
  remotePolicy: "remote" | "hybrid" | "onsite"
  isHiring: boolean
  foundedYear?: string
  linkedin?: string
  twitter?: string
  logo?: string
}
```

### Proposal Model

```typescript
{
  id: string
  employerId: string (FK to User)
  talentId: string (FK to User)
  companyId: string (FK to EmployerProfile)
  position: string
  budget: string
  budgetType: "hourly" | "fixed" | "salary"
  location: string
  remote: "Fully Remote" | "Hybrid" | "On-site"
  duration: string
  startDate: string
  status: "pending" | "viewed" | "accepted" | "declined"
  message: string
  requirements?: string
  benefits?: string
  sentDate: Date
  // Populated fields for UI display
  company: {
    name: string
    logo?: string
    industry: string
  }
  talent?: {
    name: string
    title: string
  }
}
```

### SavedTalent Model

```typescript
{
  id: string
  employerId: string (FK to User)
  talentId: string (FK to TalentProfile)
  savedDate: Date
}
```

---

## Public Pages

### 1. Landing Page (`/`)

**Story:** As a visitor, I want to understand what TalentFirst is and how it works, so I can decide whether to sign up as talent or an employer.

**Page:** [`src/app/page.tsx`](src/app/page.tsx)

**Features:**

- Hero section explaining reverse job board concept
- Featured talent profiles showcase (3 sample cards)
- "How It Works" section (3 steps)
- Search bar for quick exploration
- CTA buttons for talent and employers

**Data Requirements:**

- Featured `TalentProfile[]` (3-6 profiles with: name, title, location, skills, experience, rate, rating)
- No backend calls required initially (can use static/mock data)

**Navigation:**

- [`/create-profile`](src/app/create-profile/page.tsx) - For talent
- [`/for-employers`](src/app/for-employers/paget.tsx) - For employers
- [`/browse-talent`](src/app/browse-talent/page.tsx) - View all talent
- [`/how-it-works`](#) - Detailed explanation (not yet implemented)
- [`/login`](src/app/login/page.tsx) & [`/signup`](src/app/signup/page.tsx) - Authentication

---

### 2. How It Works Page (`/how-it-works`)

**Story:** As a potential user (talent or employer), I want to understand the platform's process step-by-step, so I can see how it benefits me.

**Status:** Not yet implemented (referenced but page doesn't exist)

**Features:**

- Separate workflows for talent and employers
- Visual step-by-step guides
- Benefits comparison
- FAQ section
- Success metrics

**Sections:**

- **For Talent:** Create profile → Get discovered → Review proposals → Choose role
- **For Employers:** Browse talent → Send proposals → Hire

**Data Requirements:**

- Static content only
- Success statistics (can be hardcoded initially)

---

### 3. For Employers Page (`/for-employers`)

**Story:** As an employer, I want to learn about TalentFirst's benefits for hiring, so I can decide if it's the right platform for my company.

**Page:** [`src/app/for-employers/paget.tsx`](src/app/for-employers/paget.tsx)

**Features:**

- Employer-specific benefits showcase
- "How it works" for employers (3-step process)
- Success stories/testimonials (2 sample companies)
- Feature highlights (6 benefit cards)
- CTAs to browse talent or create company profile

**Data Requirements:**

- Static content with testimonials
- No backend integration needed

**Key CTAs:**

- Browse Talent → [`/browse-talent`](src/app/browse-talent/page.tsx)
- Create Company Profile → [`/signup`](src/app/signup/page.tsx) with EMPLOYER role

---

## Authentication Pages

### 4. Sign Up Page (`/signup`)

**Story:** As a new user, I want to create an account by selecting my role (talent/employer), so I can access platform features.

**Page:** [`src/app/signup/page.tsx`](src/app/signup/page.tsx)

**Form Fields:**

- Role selection: "TALENT" | "EMPLOYER" (visual toggle buttons)
- Name (full name)
- Email
- Password (min 8 characters, with show/hide toggle)

**API Endpoint:** `POST /api/auth/signup` (implemented in [`src/app/api/auth/signup/route.ts`](#))

**Data Flow:**

1. Validate form inputs
2. Create `User` record with role
3. Hash password before storage
4. Create session/JWT token
5. Redirect based on role:
   - TALENT → [`/create-profile`](src/app/create-profile/page.tsx)
   - EMPLOYER → [`/employer/profile`](src/app/employer/profile/page.tsx)

**Validation:**

- Email format validation
- Password minimum 8 characters
- All fields required
- Email uniqueness check

---

### 5. Login Page (`/login`)

**Story:** As an existing user, I want to log into my account, so I can access my dashboard and features.

**Page:** [`src/app/login/page.tsx`](src/app/login/page.tsx)

**Form Fields:**

- Email
- Password (with show/hide toggle)

**API Endpoint:** `POST /api/auth/login` (implemented in [`src/app/api/auth/login/route.ts`](src/app/api/auth/login/route.ts))

**Data Flow:**

1. Validate credentials
2. Compare hashed password
3. Create session/JWT token
4. Fetch user data with role
5. Redirect based on role:
   - EMPLOYER → [`/employer/dashboard`](src/app/employer/dashboard/page.tsx)
   - TALENT → [`/recommendations`](src/app/recommendations/page.tsx)

**Features:**

- "Forgot password?" link → [`/forgot-password`](src/app/forgot-password/page.tsx)
- "Don't have an account? Sign up" link → [`/signup`](src/app/signup/page.tsx)
- Error handling for invalid credentials

---

### 6. Forgot Password Page (`/forgot-password`)

**Story:** As a user who forgot their password, I want to request a reset link, so I can regain access to my account.

**Page:** [`src/app/forgot-password/page.tsx`](src/app/forgot-password/page.tsx)

**Form Fields:**

- Email address

**Features:**

- Email input and validation
- Send reset link button
- Success state confirmation
- Resend option (after 1 minute)
- Back to login link

**Data Flow:**

1. Validate email exists in system
2. Generate password reset token
3. Send reset email (future implementation)
4. Show success message

**API Endpoint:** `POST /api/auth/forgot-password` (to be implemented)

---

## Talent Pages

### 7. Create Profile Page (`/create-profile`)

**Story:** As talent, I want to create a comprehensive profile showcasing my skills and experience, so employers can find and contact me.

**Page:** [`src/app/create-profile/page.tsx`](src/app/create-profile/page.tsx)

**Form Sections:**

**Basic Information:**

- Professional Title (e.g., "Senior Full-Stack Developer")
- Bio (textarea, compelling description)
- Location (e.g., "San Francisco, CA")
- Years of Experience (dropdown: 0-1, 2-3, 4-5, 6-8, 9-12, 13+)

**Skills & Expertise:**

- Skills (dynamic array - add/remove chips)
- Input field + "Add" button
- Display as removable badges

**Rate & Availability:**

- Availability (dropdown: full-time, part-time, contract, freelance)
- Hourly Rate in USD (number input with $ icon)

**Work Preferences:**

- Open to Remote Work (switch/toggle)
- Open to Contract Work (switch/toggle)

**Portfolio Links:**

- Portfolio URL
- LinkedIn URL
- GitHub URL
- Personal Website URL

**API Endpoint:** `POST /api/talents` (to be implemented)

**Data Model:** Creates `TalentProfile` record

**Validation:**

- Title, bio, location, experience, hourlyRate required
- At least 3 skills recommended
- URL format validation for links
- Rate must be positive number

**Post-Submit:**

- Redirect to [`/proposals`](src/app/proposals/page.tsx) or profile preview
- Success notification

---

### 8. Proposals Page (`/proposals`)

**Story:** As talent, I want to view all proposals sent to me, so I can review and respond to opportunities.

**Page:** [`src/app/proposals/page.tsx`](src/app/proposals/page.tsx)

**Layout:**

- Tabs: All | Pending | Viewed | Accepted | Declined
- Stats cards: Total Proposals, Pending, Response Rate, Avg. Rate
- Proposal list with cards

**Proposal Card Display:**

- Company name, logo, industry
- Position title
- Budget and type
- Location and remote status
- Duration
- Sent date
- Status badge
- Message preview (truncated)
- "View Details" button

**Proposal Details (Dialog/Modal):**
Shows full proposal information:

- Company section: Name, description, industry
- Position details: Title, budget, location, work style, duration, start date
- Full message from employer
- Key requirements
- Benefits offered
- Response section (if pending):
  - Optional message textarea
  - "Accept Proposal" button
  - "Decline Proposal" button

**API Endpoints:**

- `GET /api/proposals?talentId={userId}&status={filter}` (fetch proposals)
- `PUT /api/proposals/:id` (accept/decline response)

**Data Requirements:**

- `Proposal[]` filtered by `talentId` (logged-in user)
- Populated with `company` details from `EmployerProfile`
- Filter by status for tabs

**Actions:**

1. View proposal details (opens dialog)
2. Accept proposal:
   - Update status to "accepted"
   - Optional response message
   - Send notification to employer
3. Decline proposal:
   - Update status to "declined"
   - Optional response message

---

### 9. Talent Profile View Page (`/profile/[id]`)

**Story:** As anyone (talent or employer), I want to view a talent's complete profile, so I can assess their skills and experience.

**Page:** [`src/app/profile/[id]/page.tsx`](src/app/profile/[id]/page.tsx)

**Layout:** 2-column (main content + sidebar)

**Main Content:**

**Profile Header:**

- Avatar/photo
- Name (h1)
- Title
- Location, experience, rating with stars

**Hourly Rate Display:**

- Large prominent rate (e.g., "$120/hour")
- Availability status

**About Section:**

- Full bio text

**Skills & Expertise:**

- Skills as badges (all skills displayed)

**Work Preferences:**

- Remote work (Yes/No)
- Contract work (Yes/No)

**Portfolio Links:**

- Portfolio, LinkedIn, GitHub, Website icons
- External links that open in new tab

**Sidebar:**

**Quick Actions Card:**

- "Send Proposal" button → [`/send-proposal/[talentId]`](src/app/send-proposal/[talentId]/page.tsx) (employers only)
- "Send Message" button (future feature)

**Profile Stats Card:**

- Member since (e.g., "March 2024")
- Response time (e.g., "Usually responds within 2 hours")
- Projects completed (e.g., "15")
- Success rate (e.g., "98%")

**Similar Talent Card:**

- 3 mini-cards with: name, title, rate
- "View More" button

**API Endpoint:** `GET /api/talents/:id`

**Data Requirements:**

- Full `TalentProfile` by ID
- Similar talents (based on skills matching)

**Access Control:**

- Public view for all authenticated users
- Talent can view own profile with edit option

---

## Employer Pages

### 10. Browse Talent Page (`/browse-talent`)

**Story:** As an employer, I want to search and filter talent profiles, so I can find candidates matching my requirements.

**Page:** [`src/app/browse-talent/page.tsx`](src/app/browse-talent/page.tsx)

**Layout:**

**Search & Filters Bar:**

- Search input (searches name, title, skills)
- Skills filter (multi-select)
- Sort dropdown: Relevant | Rating | Rate (Low to High) | Rate (High to Low) | Experience

**Results Grid:**

- Talent cards in 3-column grid (responsive)
- Each card shows:
  - Avatar
  - Name, title
  - Rating with star icon
  - Location
  - Skills (first 3 + count)
  - Rate per hour
  - Availability badge
  - Bio (truncated to 2 lines)
- "View Profile" and "Send Proposal" buttons on each card

**Results Info:**

- Count of results found
- Average rate across results

**API Endpoint:** `GET /api/talents?search={query}&skills={skills}&sort={sortBy}`

**Filter Options:**

```typescript
{
  searchQuery: string
  selectedSkills: string[]
  sortBy: "relevant" | "rating" | "rate-low" | "rate-high" | "experience"
}
```

**Data Requirements:**

- `TalentProfile[]` with filters applied
- Search matches against: name, title, skills, bio
- Client-side filtering for initial implementation

**Actions:**

- Click card → [`/profile/[id]`](src/app/profile/[id]/page.tsx)
- "Send Proposal" → [`/send-proposal/[talentId]`](src/app/send-proposal/[talentId]/page.tsx)

---

### 11. Advanced Search Page (`/search`)

**Story:** As an employer, I want advanced search capabilities with detailed filters, so I can find highly specific talent matches.

**Page:** [`src/app/search/page.tsx`](src/app/search/page.tsx)

**Search Features:**

- Main search bar with suggestions (shows as you type)
- "Advanced Filters" toggle button

**Filters Panel (when expanded):**

**Skills:**

- Selected skills as removable chips
- Add skill input

**Location:**

- Location text input
- Remote work toggle

**Experience:**

- Slider: 0-15+ years range

**Hourly Rate:**

- Slider: $50-$200+ range

**Availability:**

- Dropdown: All | Available | Not Available | Considering Offers

**Additional Filters:**

- Minimum Rating dropdown: Any | 4+ | 4.5+ | 4.8+
- Response Time: All | Fast (<2hr) | Medium (<6hr) | Any
- Languages (multi-select checkboxes)
- Industries (multi-select checkboxes)
- Contract work available (toggle)

**Sort Options:**

- Relevance | Highest Rated | Lowest Rate | Highest Rate | Most Experience | Recently Active

**Saved Searches:**

- "Save Search" button
- List of saved search presets

**Results Display:**

- Same as Browse Talent (3-column grid)
- Results count and average rate

**API Endpoint:** `GET /api/talents/search` with query params

**Filter State:**

```typescript
{
  searchQuery: string
  skills: string[]
  location: string
  experienceMin: number
  experienceMax: number
  rateMin: number
  rateMax: number
  availability: string
  remote: boolean
  contract: boolean
  rating: number
  responseTime: string
  languages: string[]
  industries: string[]
}
```

**Features:**

- Real-time result count updates
- Clear all filters button
- Filter state persisted in URL params
- Search suggestions dropdown

---

### 12. Recommendations Page (`/recommendations`)

**Story:** As an employer, I want personalized talent recommendations based on my company profile and past behavior, so I can discover great matches efficiently.

**Page:** [`src/app/recommendations/page.tsx`](src/app/recommendations/page.tsx)

**Layout:** Main content + Sidebar

**Tabs:**

1. **For You** - Personalized matches
2. **Trending** - High-demand talent
3. **Similar Hires** - Based on saved/contacted talent

**Tab: For You**

Shows talent with match scores (AI/algorithm-based):

- Match score badge (e.g., "95% Match")
- Talent card with standard info
- "Why this is a great match" section with 3 bullet points:
  - "Skills match your requirements"
  - "Located in your preferred area"
  - "Available for full-time work"
- Skills badges
- "View Profile" and "Send Proposal" buttons

**Tab: Trending**

Shows trending/in-demand talent:

- Trending badge
- Trending reason (e.g., "High demand in cloud infrastructure")
- Standard talent card info
- Rating, rate, skills
- Call-out badge for trending status

**Tab: Similar Hires**

Based on employers' saved talent:

- "Companies like yours often hire" indicator
- Standard talent card
- Similar to saved talent explanation

**Sidebar Cards:**

**Market Insights:**

- Top 4 in-demand skills
- Each shows:
  - Skill name
  - Demand progress bar (0-100%)
  - Growth percentage badge
  - Average rate

**Your Activity:**

- Profile views count
- Proposals sent count
- Response rate percentage
- Average response time

**API Endpoints:**

- `GET /api/recommendations/for-you?employerId={userId}`
- `GET /api/recommendations/trending`
- `GET /api/recommendations/similar?employerId={userId}`
- `GET /api/analytics/market-insights`

**Match Score Algorithm Factors:**

```typescript
{
  skillsMatch: number; // % of matching skills
  budgetFit: number; // Rate within range
  availabilityMatch: number; // Availability fits needs
  locationMatch: number; // Location preference match
  overallScore: number; // Weighted average
}
```

**Data Requirements:**

- Recommended `TalentProfile[]` with match scores
- Trending `TalentProfile[]` with trend reasons
- Similar `TalentProfile[]` based on saved history
- Market insights data
- Employer activity stats

---

### 13. Send Proposal Page (`/send-proposal/[talentId]`)

**Story:** As an employer, I want to send a personalized proposal to talent, so I can present my opportunity attractively.

**Page:** [`src/app/send-proposal/[talentId]/page.tsx`](src/app/send-proposal/[talentId]/page.tsx)

**Layout:** 2-column (form + talent summary sidebar)

**Sidebar - Sending Proposal To:**

- Talent avatar, name, title
- Rating and review count
- Location
- Hourly rate
- Skills (first 5 as badges + show more)
- Bio snippet

**Main Form Sections:**

**Basic Information:**

- Position Title (e.g., "Senior React Developer")
- Company Name (pre-filled from employer profile)
- Project Type (dropdown: Full-time | Part-time | Contract | Freelance)

**Budget & Timeline:**

- Budget Amount (number input)
- Budget Type (dropdown: Hourly | Fixed | Annual Salary)
- Start Date (date picker)
- Duration (text input, e.g., "6 months", "Ongoing")

**Work Details:**

- Location (text input)
- Work Arrangement (dropdown: Fully Remote | Hybrid | On-site)

**Message & Details:**

- Personal Message (textarea, 6 rows)
  - Placeholder suggests personalization
  - "Dear {name}, We've reviewed your profile..."
- Key Requirements (textarea)
  - Bullet points format
  - E.g., "• 5+ years React experience"
- Benefits/What We Offer (textarea)
  - E.g., "• Competitive salary + equity"

**Actions:**

- "Send Proposal" button (primary)
- "Cancel" link

**API Endpoint:** `POST /api/proposals`

**Request Payload:**

```typescript
{
  employerId: string;
  talentId: string;
  position: string;
  budget: string;
  budgetType: string;
  location: string;
  remote: string;
  duration: string;
  startDate: string;
  message: string;
  requirements: string;
  benefits: string;
}
```

**Data Requirements:**

- Talent profile info (from route param `talentId`)
- Employer profile (pre-fill company name)

**Validation:**

- Position, budget, location, message required
- Start date must be valid date
- Budget must be positive number

**Post-Submit:**

- Redirect to [`/proposal-success`](src/app/proposal-success/page.tsx)
- Create `Proposal` record with status "pending"
- Send notification to talent (future)

---

### 14. Proposal Success Page (`/proposal-success`)

**Story:** As an employer who just sent a proposal, I want confirmation and next steps, so I know what to expect.

**Page:** [`src/app/proposal-success/page.tsx`](src/app/proposal-success/page.tsx)

**Layout:** Centered success page

**Success Message:**

- Large checkmark icon
- "Proposal Sent Successfully!" heading
- Confirmation text: "Your proposal has been sent to {talent name}. They'll receive a notification and can respond directly."

**What Happens Next (Timeline Cards):**

1. **Talent Reviews**

   - Icon: Eye
   - "The talent will review your proposal and company profile."

2. **You Get Notified**

   - Icon: Message
   - "You'll receive a notification when they respond or have questions."

3. **Start Collaborating**
   - Icon: Check
   - "Once accepted, you can arrange interviews, contracts, and start working together."

**Tips Card:**

- "Tips for Better Response Rates"
- 4 bullet points:
  - Personalize by mentioning specific skills
  - Be clear about role and expectations
  - Offer competitive compensation matching their rate
  - Follow up politely if no response within a week

**Action Buttons:**

- "Back to Dashboard" (primary) → [`/employer/dashboard`](src/app/employer/dashboard/page.tsx)
- "Browse More Talent" (secondary) → [`/browse-talent`](src/app/browse-talent/page.tsx)

**Data Requirements:**

- None (static success page)
- Could fetch recently sent proposal for display (optional)

---

### 15. Employer Dashboard (`/employer/dashboard`)

**Story:** As an employer, I want a dashboard overview of my hiring activity, so I can track proposals and manage candidates.

**Page:** [`src/app/employer/dashboard/page.tsx`](src/app/employer/dashboard/page.tsx)

**Layout:**

**Header:**

- Company logo, name
- Industry, size, location
- "View Public Profile" link

**Tabs:**

- Overview | Proposals | Saved Talent | Analytics

---

**Tab: Overview**

**Stats Cards (4 metrics):**

1. Profile Views - Eye icon
2. Proposals Sent - Send icon
3. Response Rate % - TrendingUp icon (green)
4. Active Proposals - MessageSquare icon

**Quick Actions Card:**
3 large button tiles:

1. "Browse Talent" → [`/browse-talent`](src/app/browse-talent/page.tsx)
2. "Post Job Opening" → (future feature)
3. "Update Company Profile" → [`/employer/profile`](src/app/employer/profile/page.tsx)

**Recent Activity:**

- Last 3 proposals sent
- Each shows:
  - Talent avatar, name, title
  - Position offered
  - Status badge
  - Sent date
  - "View Talent" and "Follow Up" buttons

---

**Tab: Proposals**

**Filter Tabs:**

- All | Pending | Viewed | Accepted | Declined

**Proposal List:**
Each proposal card shows:

- Talent info (avatar, name, title, location)
- Position title
- Budget
- Status badge (color-coded)
- Sent date
- Message preview
- Action buttons:
  - "View Profile"
  - "Send Follow-Up" (if pending)
  - "Message" (if accepted)

**Proposal Details (Expandable):**

- Full message sent
- Requirements listed
- Benefits offered
- View full talent profile link

---

**Tab: Saved Talent**

**Saved Collection:**

- Grid of saved talent cards
- Each card:
  - Talent avatar, name, title
  - Location, skills (3 shown)
  - Rate and availability badge
  - "View Profile" and "Send Proposal" buttons
  - "Unsave" icon/button

**Empty State:**

- "No saved talent yet"
- "Browse talent and save profiles you're interested in"
- CTA button → Browse Talent

---

**Tab: Analytics**

**Engagement Metrics Card:**

- Response Rate
- Acceptance Rate
- Average Response Time (days)

**Profile Insights Card:**

- Profile Views (this month)
- Search Appearances
- Profile Completion % (if incomplete)

**Performance Over Time:**

- Line chart showing proposals sent per week (future implementation)
- Response rate trend

**API Endpoints:**

- `GET /api/employer/stats?employerId={userId}`
- `GET /api/proposals?employerId={userId}&status={filter}`
- `GET /api/saved-talents?employerId={userId}`
- `GET /api/employer/analytics?employerId={userId}`

**Data Requirements:**

- Employer stats (views, proposals count, response rate)
- `Proposal[]` sent by employer with talent details
- `SavedTalent[]` with populated talent profiles
- Analytics data

---

### 16. Company Profile Page (`/employer/profile`)

**Story:** As an employer, I want to create and manage my company profile, so talent can learn about my company when reviewing proposals.

**Page:** [`src/app/employer/profile/page.tsx`](src/app/employer/profile/page.tsx)

**Form Sections:**

**Basic Information Card:**

- Company Name
- Industry (dropdown: Technology, Healthcare, Finance, etc.)
- Company Size (dropdown: 1-10, 11-50, 51-200, 201-500, 500+)
- Location
- Founded Year
- Website URL

**About Company Card:**

- Company Description (textarea, 4 rows)
  - "Tell talent about your company, mission, and what makes you unique"
- Company Culture (textarea, 3 rows)
  - "Describe your work environment and values"

**Benefits Card:**

- Add benefits input + button
- Benefits list as removable badges
- Examples: Health insurance, 401k, Remote work, Learning budget

**Tech Stack Card:**

- Add technology input + button
- Tech list as removable badges
- Examples: React, Node.js, AWS, Docker

**Work Preferences Card:**

- Remote Policy (dropdown: Fully Remote | Hybrid | On-site Only)
- Currently Hiring (toggle switch)
  - Description: "Show that you're actively looking for talent"

**Social Links Card:**

- LinkedIn URL
- Twitter URL
- (Optional: Facebook, Instagram)

**Form Actions:**

- "Save Changes" button (primary)
- "Cancel" link

**API Endpoint:**

- `GET /api/companies/:userId` (fetch existing)
- `POST /api/companies` (create)
- `PUT /api/companies/:id` (update)

**Data Model:** Creates/Updates `EmployerProfile`

**Validation:**

- Company name, industry, size, location, description required
- URL format validation
- Founded year must be valid (1900-current year)

**Features:**

- Pre-populate if profile exists
- "Add Benefit/Tech" on Enter key
- Remove items with X button on badges
- Loading state during save
- Success notification on save

---

## Additional Features & Components

### 17. Market Insights (Sidebar Component)

**Purpose:** Show real-time market trends for skills and rates to help employers make competitive offers.

**Displayed On:**

- [`/recommendations`](src/app/recommendations/page.tsx) sidebar
- [`/search`](src/app/search/page.tsx) (optional)

**Data Structure:**

```typescript
{
  skill: string;
  demand: number(0 - 100); // shown as progress bar
  avgRate: number; // average hourly rate
  growth: string; // e.g., "+12%"
}
```

**Display (Top 4 Skills):**

- Skill name
- Demand progress bar (color-coded: green = high)
- Growth badge (e.g., "+15%")
- Average rate (e.g., "Avg: $115/hr")

**API Endpoint:** `GET /api/analytics/market-insights`

**Source:** Calculated from all active `TalentProfile` data

---

### 18. Saved Talent Feature

**Purpose:** Allow employers to bookmark talent profiles for later review.

**Actions:**

- Save talent (heart/bookmark icon on cards)
- Unsave talent
- View saved collection (Dashboard → Saved Talent tab)
- Add private notes to saved profiles (future)

**Data Model:** `SavedTalent`

**API Endpoints:**

- `POST /api/saved-talents` (save)
- `DELETE /api/saved-talents/:id` (unsave)
- `GET /api/saved-talents?employerId={userId}` (fetch collection)

**UI Integration:**

- Save icon on talent cards (all browse/search pages)
- Saved indicator (filled heart icon)
- Count badge in dashboard sidebar

---

## Search & Filter Implementation

### Talent Search Algorithm (Client-Side Initially)

**Text Search:**

```typescript
// Matches against multiple fields
searchQuery.toLowerCase() matches in:
- talent.name
- talent.title
- talent.bio
- talent.skills (array)
```

**Filters Applied Sequentially:**

1. Skills filter (if skills selected, talent must have all)
2. Location filter (contains search)
3. Experience range (min/max years)
4. Rate range (min/max hourly)
5. Availability status match
6. Remote work preference
7. Contract work preference
8. Rating minimum
9. Languages (if selected)
10. Industries (if selected)

**Sorting Options:**

- `relevance` - Text match score (default)
- `rating` - Highest rating first
- `rate-low` - Lowest rate first
- `rate-high` - Highest rate first
- `experience` - Most years first
- `recent` - Recently active (requires lastActive field)

---

### Recommendation Algorithm (Server-Side)

**For You Tab - Match Score Calculation:**

```typescript
matchScore = weighted average of:
- Skills Match (40%): Count of matching skills / total required
- Budget Fit (25%): Talent rate within employer's range
- Location Match (15%): Same location or remote available
- Availability Match (10%): Availability matches job type
- Rating (10%): Talent rating (4.5+ prioritized)
```

**Trending Tab - Criteria:**

- Skills in high demand (most searched/hired recently)
- High engagement (profile views, proposals received)
- Newly joined with strong profiles
- Skills with growing market rates

**Similar Hires Tab - Based On:**

- Saved talent skills overlap
- Previously contacted talent skills
- Accepted proposals talent skills
- Other employers in same industry hired

---

## Key User Flows

### Talent User Journey

1. **Sign Up** [`/signup`](src/app/signup/page.tsx) → Select "Talent" role
2. **Create Profile** [`/create-profile`](src/app/create-profile/page.tsx) → Fill comprehensive profile
3. **View Proposals** [`/proposals`](src/app/proposals/page.tsx) → Browse incoming offers
4. **Review Proposal** → Open detail dialog, see company info
5. **Respond** → Accept or decline with optional message
6. **Get Hired** → Connect with employer (messaging feature)

### Employer User Journey

1. **Sign Up** [`/signup`](src/app/signup/page.tsx) → Select "Employer" role
2. **Create Company Profile** [`/employer/profile`](src/app/employer/profile/page.tsx) → Build company page
3. **Browse Talent** [`/browse-talent`](src/app/browse-talent/page.tsx) or [`/recommendations`](src/app/recommendations/page.tsx)
4. **View Full Profile** [`/profile/[id]`](src/app/profile/[id]/page.tsx) → Assess fit
5. **Send Proposal** [`/send-proposal/[talentId]`](src/app/send-proposal/[talentId]/page.tsx) → Craft offer
6. **Track Status** [`/employer/dashboard`](src/app/employer/dashboard/page.tsx) → Monitor responses
7. **Connect** → Interview and hire (messaging feature)

---

## Technical Implementation Notes

### Authentication Flow

- JWT-based tokens stored in HTTP-only cookies
- Session validation on protected routes
- Role-based access control (RBAC):
  - TALENT can access: proposals, profile edit
  - EMPLOYER can access: dashboard, browse talent, send proposals
- Middleware checks authentication before rendering pages

**Auth API Routes:**

- [`POST /api/auth/signup`](#) - Create account
- [`POST /api/auth/login`](src/app/api/auth/login/route.ts) - Authenticate
- [`POST /api/auth/logout`](#) - Clear session
- [`GET /api/auth/me`](src/app/api/auth/me/route.ts) - Get current user

---

### State Management Strategy

**User Session:**

- React Context (`AuthContext`) for current user
- Persisted via JWT in cookies
- `useAuth()` hook for components

**Form State:**

- Local `useState` for form inputs
- Controlled components
- Validation on submit

**List/Collection State:**

- `useState` for filters and sort
- Local filtering/sorting for performance
- Pagination with "Load More" (20 per page)

**Proposal State:**

- Local state in dashboard/proposals page
- Refetch on actions (accept/decline/send)

**Consider Zustand/Redux if:**

- Shared state across many pages
- Complex state updates
- Need for middleware (logging, persistence)

---

### API Endpoints Structure (Future Backend)

**Authentication:**

```
POST   /api/auth/signup       - Create user account
POST   /api/auth/login        - Authenticate user
POST   /api/auth/logout       - Clear session
POST   /api/auth/forgot-password - Request reset link
GET    /api/auth/me           - Get current user
```

**Talent Profiles:**

```
GET    /api/talents           - List talents (with filters)
GET    /api/talents/:id       - Get single talent
POST   /api/talents           - Create talent profile
PUT    /api/talents/:id       - Update own profile
GET    /api/talents/search    - Advanced search with filters
```

**Employer Profiles:**

```
GET    /api/companies/:userId - Get company profile
POST   /api/companies         - Create company profile
PUT    /api/companies/:id     - Update company profile
```

**Proposals:**

```
GET    /api/proposals                    - List proposals (filtered by user)
GET    /api/proposals/:id                - Get single proposal
POST   /api/proposals                    - Send proposal
PUT    /api/proposals/:id                - Update status (accept/decline)
GET    /api/proposals?talentId={id}      - Proposals for talent
GET    /api/proposals?employerId={id}    - Proposals from employer
```

**Saved Talents:**

```
GET    /api/saved-talents?employerId={id} - Get saved collection
POST   /api/saved-talents                 - Save a talent
DELETE /api/saved-talents/:id             - Unsave a talent
```

**Recommendations:**

```
GET    /api/recommendations/for-you?employerId={id}   - Personalized matches
GET    /api/recommendations/trending                  - Trending talent
GET    /api/recommendations/similar?employerId={id}   - Similar hires
```

**Analytics:**

```
GET    /api/analytics/market-insights           - Market trends data
GET    /api/analytics/employer?employerId={id}  - Employer stats
```

---

### Database Schema Relationships

**Prisma Schema Reference:** [`prisma/schema.prisma`](prisma/schema.prisma)

```
User (1) ←→ (1) TalentProfile
User (1) ←→ (1) EmployerProfile
User (1 Employer) → (Many) Proposal (as sender)
User (1 Talent) → (Many) Proposal (as receiver)
User (1 Employer) → (Many) SavedTalent
TalentProfile (1) ← (Many) SavedTalent
Proposal → (1) EmployerProfile (for company details)
```

**Key Constraints:**

- User.role determines which profile exists (TALENT or EMPLOYER)
- One-to-one: User ↔ TalentProfile, User ↔ EmployerProfile
- Cascade delete: Deleting user deletes their profile and proposals
- Proposal.status enum enforces valid states

---

## Pages Checklist

### Implemented Pages

✅ [`/`](src/app/page.tsx) - Landing Page
✅ [`/signup`](src/app/signup/page.tsx) - Sign Up
✅ [`/login`](src/app/login/page.tsx) - Login
✅ [`/forgot-password`](src/app/forgot-password/page.tsx) - Password Reset
✅ [`/create-profile`](src/app/create-profile/page.tsx) - Create Talent Profile
✅ [`/proposals`](src/app/proposals/page.tsx) - View Proposals (Talent)
✅ [`/profile/[id]`](src/app/profile/[id]/page.tsx) - View Talent Profile
✅ [`/browse-talent`](src/app/browse-talent/page.tsx) - Browse Talent
✅ [`/search`](src/app/search/page.tsx) - Advanced Search
✅ [`/recommendations`](src/app/recommendations/page.tsx) - Recommendations
✅ [`/send-proposal/[talentId]`](src/app/send-proposal/[talentId]/page.tsx) - Send Proposal
✅ [`/proposal-success`](src/app/proposal-success/page.tsx) - Success Confirmation
✅ [`/employer/dashboard`](src/app/employer/dashboard/page.tsx) - Employer Dashboard
✅ [`/employer/profile`](src/app/employer/profile/page.tsx) - Company Profile
✅ [`/for-employers`](src/app/for-employers/paget.tsx) - For Employers Landing

### Not Yet Implemented

❌ `/how-it-works` - How It Works (referenced but doesn't exist)

---

## Future Enhancements

### Messaging System

- Real-time chat between employers and talent
- Proposal thread discussions
- File sharing (contracts, portfolios)
- Read receipts and typing indicators

**Data Model:**

```typescript
Message {
  id: string
  proposalId: string
  senderId: string
  receiverId: string
  content: string
  sentAt: Date
  readAt?: Date
}
```

### Notifications System

**Types:**

- proposal_received (talent)
- proposal_viewed (employer)
- proposal_accepted (employer)
- proposal_declined (employer)
- message_received (both)

**Data Model:**

```typescript
Notification {
  id: string
  userId: string
  type: NotificationType
  relatedId: string // proposalId, messageId
  message: string
  read: boolean
  createdAt: Date
}
```

### Enhanced Features

- Video introduction uploads for talent profiles
- Interview scheduling integration
- Contract management system
- Payment processing integration
- Two-way review and rating system
- Referral program
- API for third-party integrations
- Email notifications
- Mobile app (React Native)

### Advanced Analytics

- Proposal success rate analysis
- Best times to send proposals
- Skill demand forecasting
- Salary benchmarking tools
- Talent engagement metrics

---

## Component Library

**UI Components:** Shadcn/ui (Radix UI based)

**Core Components Used:**

- [`Button`](src/components/ui/button.tsx)
- [`Card`](src/components/ui/card.tsx)
- `Input`, `Textarea`, `Label`
- `Select`, `Switch`, `Slider`
- [`Badge`](src/components/ui/badge.tsx)
- [`Avatar`](src/components/ui/avatar.tsx)
- `Dialog`, `Tabs`, `Separator`

**Icons:** Lucide React

- `User`, `Building2`, `Users`, `Search`
- `Star`, `MapPin`, `DollarSign`, `Clock`
- `Send`, `Eye`, `Check`, `X`

---

## Styling & Design

**Framework:** Tailwind CSS
**Theme:** Next Themes (dark mode support)
**Fonts:** Geist Sans & Geist Mono
**Colors:**

- Primary: Brand color (blue/purple)
- Secondary: Accent color (yellow/orange)
- Muted: Backgrounds and borders
- Destructive: Error states

**Responsive Breakpoints:**

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## Key Insights from Page Analysis

### Critical Fields Identified

**For Talent Cards (Browse/Search/Recommendations):**

- name, title, location, skills (first 3-5), rate, rating, reviewCount, availability, bio (truncated)

**For Proposal Display:**

- position, budget, budgetType, location, remote, duration, message, status, sentDate
- company: { name, logo, industry }

**For Profile View:**

- All TalentProfile fields except non-essential metadata

**For Dashboard Stats:**

- Counts: proposals sent, proposals received, saved talent
- Percentages: response rate, success rate
- Aggregates: average rate, average response time

### Removed Non-Critical Fields

- ❌ `lastActive` - Not displayed anywhere in current UI
- ❌ `responseTime` - Calculated metric, not stored
- ❌ `completedProjects` - Future feature
- ❌ `successRate` - Future feature (needs proposal history)
- ❌ `languages` - Only in advanced search (optional)
- ❌ `timezone` - Only in advanced search (optional)
- ❌ `industries` - Only in advanced search (optional)
- ❌ `viewedDate`, `responseDate`, `responseMessage` - Future tracking fields

### Minimal Data Model Justification

The updated data models include only fields that are:

1. **Displayed in UI** - Shown on cards, profiles, or forms
2. **Used in Filters** - Part of search/filter criteria
3. **Required for Actions** - Needed to send proposals, save talent
4. **Core Business Logic** - Status tracking, user roles, relationships

This keeps the frontend simple and focused on MVP functionality while the schema maintains flexibility for future enhancements.

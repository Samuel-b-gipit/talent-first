# TalentFirst System Overview

## System Purpose and Functionality

TalentFirst is a reverse job board platform where talented professionals showcase their skills and employers compete for their attention with personalized proposals. The system flips the traditional job search process by putting talent in control, allowing them to create profiles and receive offers directly from interested employers rather than applying to job postings.

## Core Features

1. **Talent Profiles**: Professionals create comprehensive profiles showcasing their skills, experience, and career goals.
2. **Employer Discovery**: Companies can browse and search for talent based on skills, experience, and other criteria.
3. **Direct Proposal System**: Employers send personalized job proposals directly to talent.
4. **Talent Review Process**: Professionals review and respond to proposals from employers.
5. **Dashboard Management**: Both talent and employers have dedicated dashboards to manage their activities.

## Pages and Their Connections

### Home Page (`/`)

- **Purpose**: Main landing page introducing the platform concept
- **Key Elements**:
  - Navigation to main sections (Browse Talent, For Employers, How It Works)
  - CTA buttons for talent and employers
  - Featured talent showcase
  - Search functionality
  - Brief "How It Works" overview
- **Connects To**:
  - `/create-profile` (for talent)
  - `/for-employers` (for companies)
  - `/browse-talent` (for browsing professionals)

### Browse Talent Page (`/browse-talent`)

- **Purpose**: Directory of available professionals
- **Key Elements**:
  - Searchable and filterable talent listings
  - Talent cards with key information
  - Rating and skill indicators
- **Connects To**:
  - `/profile/[id]` (individual talent profiles)
  - `/search` (for refined searches)

### For Employers Page (`/for-employers`)

- **Purpose**: Landing page for companies interested in hiring
- **Key Elements**:
  - Value proposition for employers
  - How the platform works from employer perspective
  - Benefits of using TalentFirst
  - Success stories
- **Connects To**:
  - `/browse-talent` (to start searching)
  - `/signup` (to create employer account)
  - `/employer/dashboard` (for existing employers)

### How It Works Page (`/how-it-works`)

- **Purpose**: Detailed explanation of the platform's workflow
- **Key Elements**:
  - Process visualization for both talent and employers
  - Step-by-step guides
  - Benefits breakdown
- **Connects To**:
  - `/create-profile` (for talent)
  - `/for-employers` (for companies)

### Create Profile Page (`/create-profile`)

- **Purpose**: Talent profile creation form
- **Connects To**:
  - `/profile/[id]` (newly created profile)
  - `/recommendations` (after profile creation)

### Talent Profile Page (`/profile/[id]`)

- **Purpose**: Detailed view of an individual talent's profile
- **Key Elements**:
  - Professional information
  - Skills and experience
  - Portfolio items
  - Contact options
- **Connects To**:
  - `/send-proposal/[talentId]` (for employers to send proposals)

### Send Proposal Page (`/send-proposal/[talentId]`)

- **Purpose**: Form for employers to send personalized proposals to talent
- **Key Elements**:
  - Talent summary
  - Proposal form with job details
  - Terms and compensation fields
- **Connects To**:
  - `/proposal-success` (after submission)
  - `/profile/[id]` (back to talent profile)

### Proposal Success Page (`/proposal-success`)

- **Purpose**: Confirmation page after proposal submission
- **Connects To**:
  - `/employer/dashboard` (to view all proposals)
  - `/browse-talent` (to send more proposals)

### Employer Dashboard (`/employer/dashboard`)

- **Purpose**: Central management console for employers
- **Key Elements**:
  - Overview of active proposals
  - Saved talent profiles
  - Communication management
  - Analytics and statistics
- **Connects To**:
  - `/employer/profile` (company profile management)
  - `/browse-talent` (to find more talent)

### Employer Profile Page (`/employer/profile`)

- **Purpose**: Management of employer company details
- **Key Elements**:
  - Company information
  - Job postings
  - Account settings

### Login Page (`/login`)

- **Purpose**: Authentication for existing users
- **Connects To**:
  - User-specific dashboard based on account type
  - `/forgot-password` (for password recovery)

### Signup Page (`/signup`)

- **Purpose**: New user registration
- **Key Elements**:
  - Account type selection (talent or employer)
  - Registration form
- **Connects To**:
  - `/create-profile` (for talent)
  - `/employer/profile` (for employers)

### Proposals Page (`/proposals`)

- **Purpose**: For talent to view and manage received proposals
- **Key Elements**:
  - List of proposals with company info
  - Accept/decline options
  - Communication thread

### Recommendations Page (`/recommendations`)

- **Purpose**: Personalized recommendations for talent
- **Key Elements**:
  - Suggested opportunities
  - Saved items
  - "For You" section

## Data Models

### User Model

- Common fields for both talent and employers:
  - `id`: Unique identifier
  - `email`: Email address (for authentication)
  - `password`: Encrypted password
  - `name`: Full name
  - `createdAt`: Account creation timestamp
  - `updatedAt`: Last update timestamp
  - `role`: Either "talent" or "employer"

### Talent Profile Model

- `userId`: Reference to User model
- `title`: Professional title (e.g., "Senior Full-Stack Developer")
- `location`: Geographic location
- `skills`: Array of skills (e.g., ["React", "Node.js", "TypeScript"])
- `experience`: Years of experience (e.g., "5+ years")
- `rate`: Hourly or salary rate (e.g., "$120/hour")
- `availability`: Availability status (e.g., "Available now", "Available in 2 weeks")
- `bio`: Detailed professional description
- `education`: Array of education history
- `workHistory`: Array of work experience
- `portfolio`: Array of portfolio items/projects
- `rating`: Average rating from employers (e.g., 4.9)

### Employer/Company Profile Model

- `userId`: Reference to User model
- `companyName`: Name of the company
- `industry`: Industry sector
- `size`: Company size (e.g., "1-10", "11-50", "51-200")
- `logo`: Company logo URL
- `website`: Company website
- `location`: Company headquarters location
- `description`: Company description
- `foundedYear`: Year the company was founded
- `socialMediaLinks`: Object with social media URLs

### Proposal Model

- `id`: Unique identifier
- `employerId`: Reference to the employer User ID
- `talentId`: Reference to the talent User ID
- `jobTitle`: Title of the position
- `projectDescription`: Description of the job/project
- `compensationDetails`: Salary, hourly rate, or other compensation information
- `startDate`: Proposed start date
- `duration`: Expected project/job duration
- `location`: Work location (remote, on-site, hybrid)
- `status`: Proposal status (e.g., "pending", "accepted", "declined", "negotiating")
- `message`: Personalized message to the talent
- `createdAt`: When the proposal was sent
- `updatedAt`: Last update timestamp

### Message Model

- `id`: Unique identifier
- `proposalId`: Reference to associated Proposal
- `senderId`: User ID of the sender
- `receiverId`: User ID of the recipient
- `content`: Message text
- `read`: Boolean indicating if message has been read
- `createdAt`: Timestamp

## Flow and User Journey

### Talent Journey

1. User visits the homepage and clicks "I'm Looking for Opportunities"
2. Creates an account via `/signup` with the "talent" role
3. Completes profile on `/create-profile`
4. Reviews recommendations on `/recommendations`
5. Receives proposals from employers
6. Reviews and responds to proposals on `/proposals`
7. Communicates with interested employers
8. Accepts preferred opportunities

### Employer Journey

1. User visits the homepage and clicks "I'm Hiring Talent" or navigates to `/for-employers`
2. Creates an account via `/signup` with the "employer" role
3. Sets up company profile on `/employer/profile`
4. Browses talent on `/browse-talent`
5. Views detailed profiles on `/profile/[id]`
6. Sends proposals to promising candidates via `/send-proposal/[talentId]`
7. Manages proposals and communications through `/employer/dashboard`
8. Finalizes hiring process with accepted talent

## System Architecture Notes

The application is built using:

- Next.js for the frontend and routing
- React with TypeScript
- Shadcn UI components for the interface
- Likely has or plans to have a backend API for data persistence
- Uses file-based routing following Next.js App Router conventions

This reverse job board approach differentiates TalentFirst from traditional job boards by putting talented professionals in control of their career opportunities and allowing employers to compete for top talent through personalized proposals.

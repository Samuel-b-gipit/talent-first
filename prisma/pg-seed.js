require("dotenv").config();
const { Client } = require("pg");
const bcrypt = require("bcryptjs");
const { randomUUID } = require("crypto");

const client = new Client({ connectionString: process.env.DATABASE_URL });

// ─── Data pools ───────────────────────────────────────────────────────────────

const firstNames = [
  "James",
  "Olivia",
  "Liam",
  "Emma",
  "Noah",
  "Ava",
  "Ethan",
  "Sophia",
  "Mason",
  "Isabella",
  "Logan",
  "Mia",
  "Lucas",
  "Charlotte",
  "Aiden",
  "Amelia",
  "Jackson",
  "Harper",
  "Elijah",
  "Evelyn",
  "Sebastian",
  "Abigail",
  "Mateo",
  "Emily",
  "Henry",
  "Elizabeth",
  "Alexander",
  "Avery",
  "Daniel",
  "Sofia",
  "Michael",
  "Ella",
  "Benjamin",
  "Madison",
  "Owen",
  "Lily",
  "Carter",
  "Scarlett",
  "Wyatt",
  "Victoria",
  "Jack",
  "Aria",
  "Luke",
  "Grace",
  "Dylan",
  "Chloe",
  "Gabriel",
  "Penelope",
  "Jayden",
  "Layla",
  "Lincoln",
  "Riley",
  "Joshua",
  "Lillian",
  "Christopher",
  "Zoey",
  "Andrew",
  "Nora",
  "Theodore",
  "Mila",
  "Joseph",
  "Aubrey",
  "Ryan",
  "Hannah",
  "Nathan",
  "Addison",
  "Samuel",
  "Ellie",
  "Christian",
  "Bella",
  "Caleb",
  "Stella",
  "Isaac",
  "Natalia",
  "Levi",
  "Camila",
  "Anthony",
  "Violet",
  "Eli",
  "Aurora",
  "Jordan",
  "Savannah",
  "Adrian",
  "Audrey",
  "Connor",
  "Brooklyn",
  "Cameron",
  "Claire",
  "Hunter",
  "Skylar",
  "Zachary",
  "Paisley",
  "Grayson",
  "Naomi",
  "Cole",
  "Elena",
  "Nolan",
  "Anna",
  "Dominic",
  "Maya",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Wilson",
  "Taylor",
  "Martinez",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Thompson",
  "Lewis",
  "Walker",
  "Robinson",
  "Hall",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Green",
  "Baker",
  "Adams",
  "Nelson",
  "Carter",
  "Mitchell",
  "Perez",
  "Roberts",
  "Turner",
  "Phillips",
  "Campbell",
  "Parker",
  "Evans",
  "Collins",
  "Edwards",
  "Stewart",
  "Morris",
  "Rogers",
  "Reed",
  "Cook",
  "Morgan",
  "Rivera",
  "Bell",
  "Murphy",
  "Bailey",
  "Cooper",
  "Richardson",
  "Cox",
  "Howard",
  "Ward",
  "Patterson",
  "Gray",
  "James",
  "Watson",
  "Brooks",
  "Kelly",
  "Sanders",
  "Price",
  "Bennett",
  "Wood",
  "Barnes",
  "Ross",
  "Henderson",
  "Coleman",
  "Jenkins",
  "Perry",
  "Powell",
  "Long",
  "Hughes",
  "Flores",
  "Washington",
  "Butler",
  "Simmons",
  "Foster",
  "Gonzales",
  "Bryant",
  "Alexander",
  "Russell",
  "Griffin",
  "Diaz",
  "Hayes",
  "Myers",
  "Ford",
  "Hamilton",
  "Graham",
  "Sullivan",
  "Wallace",
  "Woods",
  "Cole",
  "West",
  "Jordan",
  "Owens",
  "Reynolds",
  "Fisher",
];

const jobTitles = [
  "Senior Frontend Engineer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "UI/UX Designer",
  "Mobile App Developer",
  "Data Engineer",
  "Machine Learning Engineer",
  "Cloud Architect",
  "Product Designer",
  "Software Engineer",
  "Platform Engineer",
  "Site Reliability Engineer",
  "QA Automation Engineer",
  "Security Engineer",
  "Blockchain Developer",
  "iOS Developer",
  "Android Developer",
  "React Native Developer",
  "Python Developer",
  "Go Developer",
  "Rust Developer",
  "Java Developer",
  ".NET Developer",
  "Ruby on Rails Developer",
  "PHP Developer",
  "Technical Lead",
  "Staff Engineer",
  "Principal Engineer",
  "Data Scientist",
];

const skillSets = [
  ["React", "TypeScript", "GraphQL", "Next.js"],
  ["Node.js", "PostgreSQL", "API Design", "Express"],
  ["React", "Node.js", "AWS", "MongoDB"],
  ["Docker", "Kubernetes", "CI/CD", "Terraform"],
  ["Figma", "Sketch", "User Research", "Prototyping"],
  ["React Native", "Swift", "Kotlin", "Flutter"],
  ["Python", "Pandas", "Spark", "SQL"],
  ["TensorFlow", "PyTorch", "Scikit-learn", "NLP"],
  ["AWS", "GCP", "Azure", "Serverless"],
  ["Vue.js", "Nuxt", "CSS", "Sass"],
  ["Go", "gRPC", "Microservices", "Redis"],
  ["Java", "Spring Boot", "Hibernate", "MySQL"],
  ["Rust", "WebAssembly", "C++", "LLVM"],
  [".NET", "C#", "Azure", "Entity Framework"],
  ["Ruby on Rails", "PostgreSQL", "Sidekiq", "Redis"],
  ["PHP", "Laravel", "MySQL", "Vue.js"],
  ["Solidity", "Web3.js", "Hardhat", "Ethers.js"],
  ["Cypress", "Jest", "Playwright", "Testing Library"],
  ["Kubernetes", "Helm", "ArgoCD", "GitOps"],
  ["Supabase", "Firebase", "PlanetScale", "Edge Functions"],
];

const experienceLevels = ["1-2", "2-3", "4-5", "6-8", "8-10", "10+"];
const availabilities = ["full-time", "part-time", "contract"];

const locations = [
  "Remote",
  "San Francisco, CA",
  "Austin, TX",
  "New York, NY",
  "Seattle, WA",
  "Denver, CO",
  "Chicago, IL",
  "Boston, MA",
  "Los Angeles, CA",
  "Portland, OR",
  "Miami, FL",
  "Atlanta, GA",
  "Dallas, TX",
  "San Diego, CA",
  "Nashville, TN",
  "Toronto, Canada",
  "London, UK",
  "Berlin, Germany",
  "Singapore",
  "Sydney, Australia",
];

const bioPhrases = [
  "Passionate engineer with a track record of delivering scalable solutions in fast-paced environments.",
  "Detail-oriented developer who loves turning complex problems into elegant, maintainable code.",
  "Product-minded engineer with a strong background in building user-facing features.",
  "Full-cycle developer comfortable from architecture to deployment.",
  "Collaborative technologist who thrives at the intersection of design and engineering.",
  "Systems thinker with a knack for performance optimisation and reliability engineering.",
  "Open-source contributor and lifelong learner with a focus on developer experience.",
  "Remote-first professional with years of experience collaborating across distributed teams.",
  "Builder at heart — I enjoy taking ideas from 0 to 1 and iterating quickly.",
  "Experienced engineer transitioning into tech leadership with a strong IC foundation.",
];

// ─── Employer pools ───────────────────────────────────────────────────────────

const companyData = [
  {
    name: "Innovatek",
    industry: "Technology",
    size: "201-500",
    location: "San Francisco, CA",
    desc: "Building the future of AI-driven SaaS.",
    policy: "hybrid",
  },
  {
    name: "MediGen",
    industry: "Healthcare",
    size: "51-200",
    location: "Boston, MA",
    desc: "Revolutionising digital health solutions.",
    policy: "onsite",
  },
  {
    name: "FinEdge",
    industry: "Finance",
    size: "501-1000",
    location: "New York, NY",
    desc: "Next-generation fintech for modern banking.",
    policy: "hybrid",
  },
  {
    name: "Cloudify",
    industry: "Cloud Services",
    size: "11-50",
    location: "Remote",
    desc: "Cloud-native infrastructure for scale-ups.",
    policy: "remote",
  },
  {
    name: "EduStream",
    industry: "EdTech",
    size: "11-50",
    location: "Austin, TX",
    desc: "Personalised learning powered by AI.",
    policy: "remote",
  },
  {
    name: "RetailIQ",
    industry: "E-Commerce",
    size: "201-500",
    location: "Seattle, WA",
    desc: "Data-driven retail intelligence platform.",
    policy: "hybrid",
  },
  {
    name: "GreenLoop",
    industry: "CleanTech",
    size: "51-200",
    location: "Denver, CO",
    desc: "Sustainability software for net-zero enterprises.",
    policy: "remote",
  },
  {
    name: "LaunchpadIO",
    industry: "Startup Studio",
    size: "11-50",
    location: "Chicago, IL",
    desc: "We build and scale B2B SaaS products.",
    policy: "hybrid",
  },
  {
    name: "CyberShield",
    industry: "Cybersecurity",
    size: "51-200",
    location: "Dallas, TX",
    desc: "Protecting enterprises from modern cyber threats.",
    policy: "onsite",
  },
  {
    name: "DataPulse",
    industry: "Analytics",
    size: "51-200",
    location: "Miami, FL",
    desc: "Real-time analytics for data-first companies.",
    policy: "remote",
  },
];

const proposalPositions = [
  "Senior Frontend Engineer",
  "Backend Developer",
  "Full Stack Engineer",
  "Lead DevOps Engineer",
  "Product Designer",
  "Mobile Developer",
  "Data Engineer",
  "ML Engineer",
  "Cloud Architect",
  "QA Lead",
  "React Developer",
  "Node.js Developer",
  "Platform Engineer",
  "Site Reliability Engineer",
  "Technical Lead",
];

const proposalMessages = [
  "We came across your profile and were genuinely impressed. We'd love to have you join our team.",
  "Your experience aligns perfectly with what we're building. Would love to discuss further.",
  "We're scaling fast and need someone with your exact skill set. Excited to connect.",
  "After reviewing your work, we believe you'd be a great cultural and technical fit.",
  "Your background in this area stands out — we'd like to extend this opportunity to you.",
  "We've been looking for someone with your combination of skills for a while now.",
  "This is a high-impact role and your profile convinced us you're the right person.",
  "Our team is growing and we'd love a sharp engineer like you on board.",
  "You were referred to us by a mutual connection — we think you'd thrive here.",
  "We're building something meaningful and need people who care deeply about quality.",
];

const proposalRequirements = [
  "3+ years of relevant experience, strong communication skills, ability to work async.",
  "5+ years in the field, experience with distributed systems preferred.",
  "Proficiency with modern tooling, CI/CD familiarity, collaborative mindset.",
  "Strong problem-solving skills, experience in fast-paced startup environments.",
  "Portfolio demonstrating past work, willingness to mentor junior developers.",
];

const proposalBenefits = [
  "Competitive salary, health insurance, 401k, fully remote options.",
  "Equity package, flexible hours, annual learning stipend, generous PTO.",
  "Health + dental, home office budget, team retreats twice a year.",
  "Stock options, unlimited PTO, top-of-market compensation.",
  "Remote-first culture, async-friendly environment, generous parental leave.",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pickAt = (arr, i) => arr[i % arr.length];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randRating = () => parseFloat((3.5 + Math.random() * 1.5).toFixed(1));

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  await client.connect();
  console.log("✅ Connected to PostgreSQL!");

  const hashedPassword = await bcrypt.hash("password1234", 10);

  // ── Wipe all tables (explicit order to satisfy FK constraints) ─────────────
  await client.query("DELETE FROM messages");
  await client.query("DELETE FROM saved_talents");
  await client.query("DELETE FROM sessions");
  await client.query("DELETE FROM proposals");
  await client.query("DELETE FROM talent_profiles");
  await client.query("DELETE FROM employer_profiles");
  await client.query("DELETE FROM users");
  // Drop stale column that was removed from the Prisma schema (no-op if already gone)
  await client.query("ALTER TABLE talent_profiles DROP COLUMN IF EXISTS name");
  console.log("🗑️  Cleared all tables.");

  // ── Seed 10 employers ──────────────────────────────────────────────────────
  const employerIds = [];

  for (let i = 0; i < companyData.length; i++) {
    const c = companyData[i];
    const uid = randomUUID();
    const pid = randomUUID();
    const fn = pick(firstNames);
    const ln = pick(lastNames);
    const email = `${fn.toLowerCase()}.${ln.toLowerCase()}@${c.name.toLowerCase().replace(/[^a-z]/g, "")}.com`;
    const skillPair = pickAt(skillSets, i);

    await client.query(
      `INSERT INTO users (id, email, password, name, role, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, 'EMPLOYER', NOW(), NOW())`,
      [uid, email, hashedPassword, `${fn} ${ln}`],
    );

    await client.query(
      `INSERT INTO employer_profiles
         (id, "userId", "companyName", industry, size, location, description,
          culture, benefits, "techStack", "remotePolicy", "isHiring", "createdAt", "updatedAt")
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,true,NOW(),NOW())`,
      [
        pid,
        uid,
        c.name,
        c.industry,
        c.size,
        c.location,
        c.desc,
        "Collaborative, inclusive, and results-oriented.",
        `{"Health insurance","401k","Flexible PTO"}`,
        `{"${skillPair[0]}","${skillPair[1]}"}`,
        c.policy,
      ],
    );

    employerIds.push(uid);
  }
  console.log(`✅ Seeded ${employerIds.length} employers.`);

  // ── Seed 100 talents + proposals ───────────────────────────────────────────
  let totalProposals = 0;

  for (let i = 0; i < 100; i++) {
    const fn = pickAt(firstNames, i);
    const ln = pickAt(lastNames, i + 13); // offset to vary name combos
    const uid = randomUUID();
    const pid = randomUUID();
    const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@gmail.com`;

    const title = pickAt(jobTitles, i);
    const skillSet = pickAt(skillSets, i);
    const skillsLit = `{${skillSet.map((s) => `"${s}"`).join(",")}}`;
    const experience = pickAt(experienceLevels, i);
    const rate = randInt(60, 200);
    const availability = pickAt(availabilities, i);
    const location = pickAt(locations, i);
    const bio = pick(bioPhrases);
    const rating = randRating();
    const reviewCount = randInt(0, 40);

    await client.query(
      `INSERT INTO users (id, email, password, name, role, "createdAt", "updatedAt")
       VALUES ($1,$2,$3,$4,'TALENT',NOW(),NOW())`,
      [uid, email, hashedPassword, `${fn} ${ln}`],
    );

    await client.query(
      `INSERT INTO talent_profiles
         (id, "userId", title, location, skills, experience, rate, availability, bio,
          "openToRemote", "openToContract", rating, "reviewCount", "createdAt", "updatedAt")
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,true,$10,$11,$12,NOW(),NOW())`,
      [
        pid,
        uid,
        title,
        location,
        skillsLit,
        experience,
        rate,
        availability,
        bio,
        i % 3 !== 0,
        rating,
        reviewCount,
      ],
    );

    // 2-4 proposals per talent; the last one is always PENDING
    const numProposals = 2 + (i % 3); // cycles 2, 3, 4, 2, 3, 4 …
    const earlierStatuses = ["VIEWED", "ACCEPTED", "DECLINED"];
    const usedEmployerIdx = new Set();

    for (let j = 0; j < numProposals; j++) {
      // Spread employers across proposals without repeating for the same talent
      let empIdx = (i + j) % employerIds.length;
      let safety = 0;
      while (usedEmployerIdx.has(empIdx) && safety < employerIds.length) {
        empIdx = (empIdx + 1) % employerIds.length;
        safety++;
      }
      usedEmployerIdx.add(empIdx);

      const isLast = j === numProposals - 1;
      const status = isLast ? "PENDING" : pick(earlierStatuses);
      const propId = randomUUID();
      // Older proposals have a larger daysAgo; the latest (PENDING) lands today
      const daysAgo = (numProposals - 1 - j) * 7;

      await client.query(
        `INSERT INTO proposals
           (id, "employerId", "talentId", position, budget, "budgetType",
            location, remote, duration, "startDate", status,
            message, requirements, benefits, "createdAt", "updatedAt")
         VALUES ($1,$2,$3,$4,$5,'hourly',$6,$7,'12 months','2026-04-01',
                 $8::"ProposalStatus",$9,$10,$11,
                 NOW() - ($12 || ' days')::interval,
                 NOW() - ($12 || ' days')::interval)`,
        [
          propId,
          employerIds[empIdx],
          uid,
          pickAt(proposalPositions, i + j),
          `$${randInt(80, 180)}/hour`,
          pickAt(locations, i + j),
          j % 2 === 0 ? "Fully Remote" : "Hybrid",
          status,
          pick(proposalMessages),
          pickAt(proposalRequirements, j),
          pickAt(proposalBenefits, j),
          daysAgo,
        ],
      );

      totalProposals++;
    }
  }

  console.log(`✅ Seeded 100 talents and ${totalProposals} proposals.`);
  await client.end();
  console.log("Connection closed.");
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  client.end();
  process.exit(1);
});

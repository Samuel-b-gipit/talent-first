require('dotenv').config();
const { Client } = require('pg');
const bcrypt = require('bcryptjs');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL!');

    const hashedPassword = await bcrypt.hash('password1234', 10);

    // Delete all users (cascade to related tables)
    await client.query('DELETE FROM users');
    console.log('🗑️  Deleted all users and related data.');

    // Realistic employers
    await client.query(`
      INSERT INTO users (id, email, password, name, role, "createdAt", "updatedAt") VALUES
        ('employer-1', 'susan@innovatek.com', $1, 'Susan Lee', 'EMPLOYER', NOW(), NOW()),
        ('employer-2', 'david@medigen.com', $1, 'David Kim', 'EMPLOYER', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    `, [hashedPassword]);
    await client.query(`
      INSERT INTO employer_profiles (id, "userId", "companyName", industry, size, location, description, culture, benefits, "techStack", "remotePolicy", "isHiring", "website", linkedin, "createdAt", "updatedAt") VALUES
        ('emp-profile-1', 'employer-1', 'Innovatek', 'Technology', '201-500', 'San Francisco, CA', 'Building the future of AI-driven SaaS.', 'Fast-paced, collaborative, and innovative.', '{"Health insurance","401k","Remote work"}', '{"React","Node.js","AWS"}', 'hybrid', true, 'https://innovatek.com', 'https://linkedin.com/company/innovatek', NOW(), NOW()),
        ('emp-profile-2', 'employer-2', 'MediGen', 'Healthcare', '51-200', 'Boston, MA', 'Revolutionizing digital health solutions.', 'Mission-driven, diverse, and supportive.', '{"Health insurance","Paid time off"}', '{"Python","Django","Azure"}', 'onsite', true, 'https://medigen.com', 'https://linkedin.com/company/medigen', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    `);

    // Realistic talents
    const talents = [
      {
        id: 'talent-1',
        email: 'jane.doe@gmail.com',
        name: 'Jane Doe',
        title: 'Senior Frontend Engineer',
        location: 'Remote',
        skills: '{"React","TypeScript","GraphQL"}',
        experience: '6-8',
        rate: 120,
        openToContract: true,
        rating: 4.8,
        reviewCount: 22,
        bio: 'Frontend specialist with 8+ years building scalable web apps.',
        portfolio: 'https://janedoe.dev',
        linkedin: 'https://linkedin.com/in/janedoe',
        github: 'https://github.com/janedoe',
        website: 'https://janedoe.dev',
      },
      {
        id: 'talent-2',
        email: 'michael.smith@gmail.com',
        name: 'Michael Smith',
        title: 'Backend Developer',
        location: 'Austin, TX',
        skills: '{"Node.js","PostgreSQL","API Design"}',
        experience: '6-8',
        rate: 110,
        openToContract: false,
        rating: 4.6,
        reviewCount: 18,
        bio: 'API and database expert with a passion for scalable systems.',
        portfolio: 'https://michaelsmith.dev',
        linkedin: 'https://linkedin.com/in/michaelsmith',
        github: 'https://github.com/michaelsmith',
        website: 'https://michaelsmith.dev',
      },
      {
        id: 'talent-3',
        email: 'emily.chen@gmail.com',
        name: 'Emily Chen',
        title: 'Full Stack Developer',
        location: 'Seattle, WA',
        skills: '{"React","Node.js","AWS"}',
        experience: '4-5',
        rate: 105,
        openToContract: true,
        rating: 4.7,
        reviewCount: 15,
        bio: 'Full stack engineer with a love for cloud infrastructure.',
        portfolio: 'https://emilychen.dev',
        linkedin: 'https://linkedin.com/in/emilychen',
        github: 'https://github.com/emilychen',
        website: 'https://emilychen.dev',
      },
      {
        id: 'talent-4',
        email: 'daniel.jones@gmail.com',
        name: 'Daniel Jones',
        title: 'DevOps Engineer',
        location: 'Denver, CO',
        skills: '{"Docker","Kubernetes","CI/CD"}',
        experience: '6-8',
        rate: 115,
        openToContract: false,
        rating: 4.5,
        reviewCount: 12,
        bio: 'DevOps and automation enthusiast with 7 years of experience.',
        portfolio: 'https://danieljones.dev',
        linkedin: 'https://linkedin.com/in/danieljones',
        github: 'https://github.com/danieljones',
        website: 'https://danieljones.dev',
      },
      {
        id: 'talent-5',
        email: 'sophia.wilson@gmail.com',
        name: 'Sophia Wilson',
        title: 'UI/UX Designer',
        location: 'Remote',
        skills: '{"Figma","Sketch","User Research"}',
        experience: '4-5',
        rate: 100,
        openToContract: true,
        rating: 4.9,
        reviewCount: 25,
        bio: 'Award-winning designer focused on delightful user experiences.',
        portfolio: 'https://sophiawilson.design',
        linkedin: 'https://linkedin.com/in/sophiawilson',
        github: 'https://github.com/sophiawilson',
        website: 'https://sophiawilson.design',
      },
      {
        id: 'talent-6',
        email: 'alex.martin@gmail.com',
        name: 'Alex Martin',
        title: 'Mobile App Developer',
        location: 'Chicago, IL',
        skills: '{"React Native","Swift","Kotlin"}',
        experience: '2-3',
        rate: 95,
        openToContract: false,
        rating: 4.4,
        reviewCount: 8,
        bio: 'Mobile developer with cross-platform expertise.',
        portfolio: 'https://alexmartin.dev',
        linkedin: 'https://linkedin.com/in/alexmartin',
        github: 'https://github.com/alexmartin',
        website: 'https://alexmartin.dev',
      },
    ];
    for (const t of talents) {
      await client.query(`
        INSERT INTO users (id, email, password, name, role, "createdAt", "updatedAt") VALUES
          ($1, $2, $4, $3, 'TALENT', NOW(), NOW())
        ON CONFLICT (id) DO NOTHING;
      `, [t.id, t.email, t.name, hashedPassword]);
      await client.query(`
        INSERT INTO talent_profiles (id, "userId", name, title, location, skills, experience, rate, availability, bio, portfolio, linkedin, github, website, "openToRemote", "openToContract", rating, "reviewCount", "createdAt", "updatedAt") VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, 'full-time', $9, $10, $11, $12, $13, true, $14, $15, $16, NOW(), NOW())
        ON CONFLICT (id) DO NOTHING;
      `, [
        `talent-profile-${t.id}`,
        t.id,
        t.name,
        t.title,
        t.location,
        t.skills,
        t.experience,
        t.rate,
        t.bio,
        t.portfolio,
        t.linkedin,
        t.github,
        t.website,
        t.openToContract,
        t.rating,
        t.reviewCount
      ]);
    }

    // Proposals
    await client.query(`
      INSERT INTO proposals (id, "employerId", "talentId", position, budget, "budgetType", location, remote, duration, "startDate", status, message, requirements, benefits, "createdAt", "updatedAt") VALUES
        ('proposal-1', 'employer-1', 'talent-1', 'Lead Frontend Engineer', '$140/hour', 'hourly', 'Remote', 'Fully Remote', '12 months', '2026-03-01', 'PENDING', 'Jane, we love your portfolio and would like you to lead our new SaaS project.', '7+ years React, TypeScript, leadership', 'Health insurance, 401k, remote work', NOW(), NOW()),
        ('proposal-2', 'employer-2', 'talent-2', 'Senior Backend Developer', '$130/hour', 'hourly', 'Austin, TX', 'Hybrid', '6 months', '2026-04-01', 'PENDING', 'Michael, your API work is impressive. Join MediGen to build next-gen health platforms.', 'Node.js, PostgreSQL, API design', 'Health insurance, paid time off', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    `);

    console.log('✅ Seeded realistic employers, talents, and proposals!');
  } catch (err) {
    console.error('❌ Error during seeding:', err);
  } finally {
    await client.end();
    console.log('Connection closed.');
  }
}

main();

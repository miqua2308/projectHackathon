// const mongoose = require('mongoose');
// const JobModel = require('../models/JobModel');

// // Sample job data
// const sampleJobs = [
//   {
//     client_id: 'client123', // You might want to replace this with an actual user ID
//     job_id: 'job1',
//     title: 'Web Developer Needed',
//     description: 'Looking for an experienced web developer to build a modern e-commerce website.',
//     responsibilities: 'Design and implement responsive web interfaces\nOptimize application for maximum speed and scalability\nEnsure cross-browser compatibility',
//     requirements: '3+ years of experience in web development\nProficient in React.js and Node.js\nExperience with MongoDB\nStrong understanding of HTML5 and CSS3',
//     required_skills: ['react', 'nodejs', 'mongodb', 'html', 'css'],
//     budget: 5000,
//     job_type: 'Full-time',
//     experience_level: 'Mid-level',
//     duration: '6 months',
//     image: 'https://example.com/web-dev.jpg',
//     deadline: new Date('2025-06-30'),
//     status: 'open'
//   },
//   {
//     client_id: 'client123',
//     job_id: 'job2',
//     title: 'Blockchain Developer',
//     description: 'Seeking a skilled blockchain developer for Solana-based dApp development.',
//     responsibilities: 'Design and implement smart contracts\nDevelop blockchain-based applications\nIntegrate with Solana network',
//     requirements: '2+ years of blockchain development experience\nSolid understanding of Solana ecosystem\nExperience with Rust programming\nKnowledge of web3 technologies',
//     required_skills: ['solana', 'rust', 'web3', 'blockchain'],
//     budget: 8000,
//     job_type: 'Contract',
//     experience_level: 'Senior',
//     duration: '3 months',
//     image: 'https://example.com/blockchain.jpg',
//     deadline: new Date('2025-07-30'),
//     status: 'open'
//   }
// ];

// async function seedJobs() {
//   try {
//     // Clear existing jobs
//     // await JobModel.deleteMany({});
//     // console.log('Existing jobs cleared');

//     // Insert sample jobs
//     const createdJobs = await JobModel.insertMany(sampleJobs);
//     console.log(`Successfully created ${createdJobs.length} jobs`);

//     return createdJobs;
//   } catch (error) {
//     console.error('Error seeding jobs:', error);
//     throw error;
//   }
// }

// module.exports = seedJobs;

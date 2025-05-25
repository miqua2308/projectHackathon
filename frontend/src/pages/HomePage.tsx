import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Statistic, Card, Tag, Divider } from "antd";
import { ArrowRightOutlined, StarFilled } from "@ant-design/icons";
import { useWallet } from "@solana/wallet-adapter-react";
// Import Ant Design styles
import "antd/dist/reset.css";
// Import Tailwind CSS
import "../styles/index.css";
// Import wallet styles
import "../styles/wallet.css";
// Import components
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchSection from "../components/SearchSection";
import JobDetailsModal from "../components/JobDetailsModal";

interface Job {
  title: string;
  skills: string[];
  budget: string;
  rating: number;
  image: string;
}

const HomePage: React.FC = () => {
  const {} = useWallet();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Initialize jobs data
    const initialJobs: Job[] = [
      {
        title: "Solana dApp Developer",
        skills: ["Rust", "Solana", "React"],
        budget: "0.3-0.5 SOL",
        rating: 4.9,
        image:
          "https://readdy.ai/api/search-image?query=Abstract%20digital%20representation%20of%20blockchain%20development%20with%20code%20elements%20and%20Solana%20logo%2C%20professional%20tech%20illustration%20with%20clean%20minimal%20background%2C%20high%20quality%203D%20render%20with%20subtle%20lighting&width=400&height=250&seq=2&orientation=landscape",
      },
      {
        title: "NFT Collection Designer",
        skills: ["Illustration", "NFT", "Blockchain"],
        budget: "0.4-0.7 SOL",
        rating: 4.8,
        image:
          "https://readdy.ai/api/search-image?query=Modern%20digital%20art%20creation%20studio%20with%20NFT%20artwork%20displays%2C%20professional%20creative%20workspace%20with%20digital%20tablets%20and%20screens%20showing%20colorful%20abstract%20designs%2C%20clean%20minimal%20background%20with%20subtle%20lighting&width=400&height=250&seq=3&orientation=landscape",
      },
      {
        title: "Smart Contract Auditor",
        skills: ["Security", "Solidity", "Audit"],
        budget: "0.6-1.0 SOL",
        rating: 5.0,
        image:
          "https://readdy.ai/api/search-image?query=Cybersecurity%20concept%20with%20digital%20locks%20and%20code%20inspection%2C%20professional%20tech%20security%20visualization%20with%20blockchain%20elements%2C%20clean%20minimal%20background%20with%20blue%20digital%20elements&width=400&height=250&seq=4&orientation=landscape",
      },
      {
        title: "Web3 Marketing Specialist",
        skills: ["Marketing", "Discord", "Web3"],
        budget: "0.3-0.6 SOL",
        rating: 4.7,
        image:
          "https://readdy.ai/api/search-image?query=Digital%20marketing%20workspace%20with%20analytics%20dashboards%20and%20social%20media%20elements%2C%20professional%20marketing%20visualization%20with%20cryptocurrency%20symbols%2C%20clean%20minimal%20background%20with%20subtle%20lighting&width=400&height=250&seq=5&orientation=landscape",
      },
    ];
    setJobs(initialJobs);
  }, []);

  const handleSearch = (searchTerm: string, skills: string) => {
    // Filter jobs based on search term and skills
    const filteredJobs = jobs.filter((job) => {
      const matchesSearch = job.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesSkills = skills
        ? job.skills.some((skill) =>
            skill.toLowerCase().includes(skills.toLowerCase())
          )
        : true;
      return matchesSearch && matchesSkills;
    });
    setJobs(filteredJobs);
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedJob(null);
  };

  const handleEnroll = (job: Job) => {
    // TODO: Implement enrollment logic
    console.log("Enrolling in job:", job.title);
    handleModalClose();
  };

  const handleFindWork = () => {
    navigate("/browse-job");
  };

  return (
    <div className="min-h-screen w-full bg-black">
      <Navbar />
      <Hero />
      <SearchSection onSearch={handleSearch} jobs={jobs} showDropdown={true} />

      {/* Key Features Section */}
      <div className="py-20 bg-gray-50 w-full">
        <div className="w-full px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Lancelot
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines the best of Web3 technology with freelancing
              to create a seamless, secure, and profitable experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-indigo-600 mb-4 text-4xl">
                <i className="fas fa-bolt custom-green-icon"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Instant Crypto Payments
              </h3>
              <p className="text-gray-600">
                Get paid instantly in SOL or other cryptocurrencies. No more
                waiting for bank transfers or payment processors.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-indigo-600 mb-4 text-4xl">
                <i className="fas fa-shield-alt custom-green-icon"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Secure Smart Contracts
              </h3>
              <p className="text-gray-600">
                All agreements are secured by Solana smart contracts, ensuring
                transparent and trustless transactions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-indigo-600 mb-4 text-4xl">
                <i className="fas fa-percentage custom-green-icon"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Zero Platform Fees
              </h3>
              <p className="text-gray-600">
                We charge minimal gas fees for transactions. Keep more of what
                you earn compared to traditional platforms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-work" className="py-20 bg-white w-full">
        <div className="w-full px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started with SolanceWork is simple. Follow these steps to
              begin your Web3 freelancing journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="text-green-500 mb-4 text-3xl">
                  <i className="fas fa-wallet"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Connect Wallet
                </h3>
                <p className="text-gray-600">
                  Link your Phantom wallet to create your profile and access the
                  platform.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="text-green-500 mb-4 text-3xl">
                  <i className="fas fa-user-edit custom-green-icon"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Create Profile
                </h3>
                <p className="text-gray-600">
                  Build your professional profile showcasing your skills and
                  experience.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="text-green-500 mb-4 text-3xl">
                  <i className="fas fa-tasks custom-green-icon"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Find Projects
                </h3>
                <p className="text-gray-600">
                  Browse and apply for projects that match your skills and
                  interests.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="text-green-500 mb-4 text-3xl">
                  <i className="fas fa-coins custom-green-icon"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Get Paid
                </h3>
                <p className="text-gray-600">
                  Complete work and receive instant payments directly to your
                  wallet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Bar */}
      <div className="py-16 bg-gradient-to-r from-black to-gray-900 text-white w-full">
        <div className="w-full px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <Statistic
                title={
                  <span className="text-white opacity-80">
                    Total Value Locked
                  </span>
                }
                value={2.5}
                precision={1}
                suffix="M SOL"
                valueStyle={{
                  color: "white",
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                }}
              />
            </div>
            <div>
              <Statistic
                title={
                  <span className="text-white opacity-80">
                    Active Freelancers
                  </span>
                }
                value={12450}
                valueStyle={{
                  color: "white",
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                }}
              />
            </div>
            <div>
              <Statistic
                title={
                  <span className="text-white opacity-80">
                    Completed Projects
                  </span>
                }
                value={28795}
                valueStyle={{
                  color: "white",
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                }}
              />
            </div>
            <div>
              <Statistic
                title={
                  <span className="text-white opacity-80">
                    Average Hourly Rate
                  </span>
                }
                value={45}
                prefix="$"
                valueStyle={{
                  color: "white",
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className="py-20 bg-white w-full">
        <div className="w-full px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
            <Link
              to="/browse-job"
              className="text-green-500 hover:text-green-600 font-medium flex items-center cursor-pointer whitespace-nowrap"
            >
              View All <ArrowRightOutlined className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Solana dApp Developer",
                skills: ["Rust", "Solana", "React"],
                budget: "0.3-0.5 SOL",
                rating: 4.9,
                image:
                  "https://readdy.ai/api/search-image?query=Abstract%20digital%20representation%20of%20blockchain%20development%20with%20code%20elements%20and%20Solana%20logo%2C%20professional%20tech%20illustration%20with%20clean%20minimal%20background%2C%20high%20quality%203D%20render%20with%20subtle%20lighting&width=400&height=250&seq=2&orientation=landscape",
              },
              {
                title: "NFT Collection Designer",
                skills: ["Illustration", "NFT", "Blockchain"],
                budget: "0.4-0.7 SOL",
                rating: 4.8,
                image:
                  "https://readdy.ai/api/search-image?query=Modern%20digital%20art%20creation%20studio%20with%20NFT%20artwork%20displays%2C%20professional%20creative%20workspace%20with%20digital%20tablets%20and%20screens%20showing%20colorful%20abstract%20designs%2C%20clean%20minimal%20background%20with%20subtle%20lighting&width=400&height=250&seq=3&orientation=landscape",
              },
              {
                title: "Smart Contract Auditor",
                skills: ["Security", "Solidity", "Audit"],
                budget: "0.6-1.0 SOL",
                rating: 5.0,
                image:
                  "https://readdy.ai/api/search-image?query=Cybersecurity%20concept%20with%20digital%20locks%20and%20code%20inspection%2C%20professional%20tech%20security%20visualization%20with%20blockchain%20elements%2C%20clean%20minimal%20background%20with%20blue%20digital%20elements&width=400&height=250&seq=4&orientation=landscape",
              },
              {
                title: "Web3 Marketing Specialist",
                skills: ["Marketing", "Discord", "Web3"],
                budget: "0.3-0.6 SOL",
                rating: 4.7,
                image:
                  "https://readdy.ai/api/search-image?query=Digital%20marketing%20workspace%20with%20analytics%20dashboards%20and%20social%20media%20elements%2C%20professional%20marketing%20visualization%20with%20cryptocurrency%20symbols%2C%20clean%20minimal%20background%20with%20subtle%20lighting&width=400&height=250&seq=5&orientation=landscape",
              },
            ].map((job, index) => (
              <Card
                key={index}
                hoverable
                onClick={() => handleJobClick(job)}
                cover={
                  <div className="h-48 overflow-hidden">
                    <img
                      alt={job.title}
                      src={job.image}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                }
                className="shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {job.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {job.skills.map((skill, idx) => (
                    <Tag
                      key={idx}
                      className="rounded-full px-3 py-1 bg-gray-100 text-gray-800"
                    >
                      {skill}
                    </Tag>
                  ))}
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-gray-600">
                    <i className="fas fa-coins text-yellow-500 mr-2 custom-green-icon"></i>
                    {job.budget}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <StarFilled className="text-yellow-500 mr-1" />
                    {job.rating}
                  </div>
                </div>
                <Button
                  type="primary"
                  block
                  className="!rounded-button bg-green-500 border-none hover:bg-green-600 cursor-pointer whitespace-nowrap"
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Job Details Modal */}
      <JobDetailsModal
        job={selectedJob}
        visible={isModalVisible}
        onClose={handleModalClose}
        onEnroll={handleEnroll}
      />

      {/* Categories Section */}
      <div className="py-20 bg-gray-50 w-full">
        <div className="w-full px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore opportunities across various Web3 domains and find your
              perfect match.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Blockchain Development", icon: "fas fa-code-branch" },
              { name: "NFT Creation", icon: "fas fa-palette" },
              { name: "DeFi Projects", icon: "fas fa-chart-line" },
              { name: "Smart Contracts", icon: "fas fa-file-contract" },
              { name: "Web3 Marketing", icon: "fas fa-bullhorn" },
              { name: "Crypto Research", icon: "fas fa-search-dollar" },
              { name: "Community Management", icon: "fas fa-users" },
              { name: "UI/UX Design", icon: "fas fa-pencil-ruler" },
              { name: "Technical Writing", icon: "fas fa-pen-fancy" },
              { name: "Tokenomics", icon: "fas fa-coins" },
              { name: "Metaverse", icon: "fas fa-vr-cardboard" },
              { name: "Security Audits", icon: "fas fa-shield-alt" },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer"
              >
                <div className="text-green-500 mb-4 text-3xl">
                  <i className={category.icon}></i>
                </div>
                <h3 className="text-gray-900 font-medium">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-white w-full">
        <div className="w-full px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from freelancers and clients who have experienced the power
              of Web3 freelancing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Solana Developer",
                quote:
                  "SolanceWork has transformed my freelancing career. I'm earning more than ever and getting paid instantly in SOL. The smart contract system ensures I always get paid for my work.",
                avatar:
                  "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20male%20developer%20with%20short%20dark%20hair%20and%20glasses%2C%20neutral%20expression%2C%20clean%20studio%20background%20with%20soft%20lighting%2C%20high%20quality%20portrait&width=100&height=100&seq=6&orientation=squarish",
              },
              {
                name: "Sarah Williams",
                role: "NFT Artist",
                quote:
                  "As an artist transitioning to NFTs, I found the perfect marketplace for my skills. The platform connects me with clients who value digital art and understand blockchain technology.",
                avatar:
                  "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20female%20artist%20with%20medium%20length%20hair%2C%20creative%20style%2C%20neutral%20expression%2C%20clean%20studio%20background%20with%20soft%20lighting%2C%20high%20quality%20portrait&width=100&height=100&seq=7&orientation=squarish",
              },
              {
                name: "Michael Chen",
                role: "DeFi Startup Founder",
                quote:
                  "Finding qualified Web3 talent was a challenge until I discovered SolanceWork. Now we can quickly scale our team with pre-vetted blockchain specialists who understand our vision.",
                avatar:
                  "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20an%20Asian%20male%20entrepreneur%20in%20business%20casual%20attire%2C%20confident%20expression%2C%20clean%20studio%20background%20with%20soft%20lighting%2C%20high%20quality%20portrait&width=100&height=100&seq=8&orientation=squarish",
              },
              {
                name: "Emily Rodriguez",
                role: "Smart Contract Auditor",
                quote:
                  "The platform's reputation system helps me showcase my security expertise. Clients trust my work because they can see my verified history of successful audits on the blockchain.",
                avatar:
                  "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20latina%20female%20cybersecurity%20specialist%20with%20long%20dark%20hair%2C%20serious%20expression%2C%20clean%20studio%20background%20with%20soft%20lighting%2C%20high%20quality%20portrait&width=100&height=100&seq=9&orientation=squarish",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow border border-gray-100 h-full flex flex-col transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-indigo-600 mb-4 text-4xl">
                  <i className="fas fa-quote-left custom-green-icon"></i>
                </div>
                <p className="text-gray-600 mb-6 flex-grow">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover object-top"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-black text-white relative overflow-hidden w-full">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('https://readdy.ai/api/search-image?query=Abstract%20blockchain%20network%20pattern%20with%20connecting%20nodes%20and%20digital%20elements%2C%20futuristic%20technology%20background%20with%20subtle%20purple%20and%20blue%20elements%2C%20minimal%20clean%20design&width=1440&height=500&seq=10&orientation=landscape')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="w-full px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Join the Web3 Revolution?
          </h2>
          <p className="text-xl text-indigo-200 mb-10 max-w-3xl mx-auto">
            Whether you're looking to hire top blockchain talent or showcase
            your skills to earn crypto, SolanceWork connects you to the future
            of work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="large"
              className="!rounded-button bg-green-500 text-white border-none hover:bg-green-600 text-lg h-12 px-8 flex items-center justify-center cursor-pointer whitespace-nowrap"
              onClick={handleFindWork}
            >
              <i className="fas fa-search mr-2"></i> Find Work
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 w-full">
        <div className="w-full px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Lancelot</h3>
              <p className="mb-4">
                The premier Web3 freelancing platform powered by Solana
                blockchain technology.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="https://github.com/SnowAceAlex/Lancelot-Solana-Hackathon.git"
                  className="text-gray-400 hover:text-white text-xl cursor-pointer"
                >
                  <i className="fab fa-github"></i>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Resources</h3>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Legal</h3>
              <a href="#" className="hover:text-white cursor-pointer">
                Terms of Service
              </a>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Subscribe</h3>
              <p className="mb-4">
                Stay updated with the latest opportunities and platform news.
              </p>
              <div className="flex">
                <Input
                  placeholder="Your email"
                  className="rounded-l-lg border-gray-700 bg-gray-800 text-white placeholder:text-white"
                />
                <Button
                  type="primary"
                  className="!rounded-button !rounded-l-none bg-green-500 border-none hover:bg-green-600 cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </div>
              <div className="mt-6">
                <p className="text-sm">Payment Methods</p>
                <div className="flex space-x-3 mt-2">
                  <i className="fab fa-cc-visa text-2xl"></i>
                  <i className="fab fa-cc-mastercard text-2xl"></i>
                  <i className="fab fa-cc-paypal text-2xl"></i>
                  <i className="fab fa-bitcoin text-2xl"></i>
                </div>
              </div>
            </div>
          </div>
          <Divider className="border-gray-700 mt-12 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Lancelot. All rights reserved.</p>
            <p className="mt-4 md:mt-0">
              Built on <span className="text-green-500">Solana</span> blockchain
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

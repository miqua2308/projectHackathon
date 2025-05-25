// import React, { useEffect, useState } from "react";
import { Button, Input, Divider } from "antd";
import { Link } from "react-router-dom";
// Import Ant Design styles
import "antd/dist/reset.css";
// Import Tailwind CSS
import "../styles/index.css";
// Import wallet styles
import "../styles/wallet.css";
// Import components
import Navbar from "../components/Navbar";
import TeamCardContainer from "../components/TeamCardContainer";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-black">
      <Navbar />

      {/* Team section */}
      <div className="relative overflow-hidden from-white-900 to-white-800 pt-20">
        <header className="bg-gray-1000 text-white py-16 px-4 text-center relative ">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-5 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Meet out team
          </h1>
          <h3 className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto text-center">
            \Who we are\
          </h3>
          <p className="text-lg sm:text-x1 text-gray-400 max-w-3xl mx-auto text-center">
            We are a group of passionate developers and designers dedicated to
            building the future of freelancing
          </p>
          <p>
            We are comming from <span className="font-bold">HCMIU</span>
          </p>
        </header>
        {/* Team members */}
        <div
          id="our-team"
          className="flex flex-col items-center justify-center py-16"
        >
          <TeamCardContainer />
        </div>
      </div>

      {/* Project section*/}
      <div
        id="our-project"
        className="relative overflow-hidden bg-white-900 pt-20 pb-20"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Our Project
        </h2>
        <p className="text-lg sm:text-xl text-white-900 max-w-3xl mx-auto text-center mb-16">
          Lancelot is a decentralized freelancing platform built on the Solana
          blockchain, connecting freelancers and clients in a secure and
          efficient manner.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="relative bg-white-900 border border-black-200 rounded-xl p-6 shadow-md hover:shadow-cyan-500/30 transition-shadow duration-300">
            <h3 className="text-xl font-bold text-white">
              Decentralized Platform
            </h3>
            <p className="text-gray-1100">
              Leverages blockchain for transparency and security in all
              transactions.
            </p>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/10 to-purple-500/10 opacity-0 hover:opacity-100 transition duration-300 pointer-events-none" />
          </div>

          {/* Card 2 */}
          <div className="relative bg-white-900 border border-gray-1000 rounded-xl p-6 shadow-md hover:shadow-cyan-500/30 transition-shadow duration-300">
            <h3 className="text-xl font-bold text-white pb-6">
              Smart Contracts
            </h3>
            <p className="text-gray-1100">
              Automates agreements between freelancers and clients for trustless
              execution.
            </p>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/10 to-purple-500/10 opacity-0 hover:opacity-100 transition duration-300 pointer-events-none" />
          </div>

          {/* Card 3 */}
          <div className="relative bg-white-900 border border-gray-1000 rounded-xl p-6 shadow-md hover:shadow-cyan-500/30 transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-3 text-white pb-6">
              Fast Transactions
            </h3>
            <p className="text-gray-1100">
              Powered by Solana for lightning-speed execution and minimal fees.
            </p>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/10 to-purple-500/10 opacity-0 hover:opacity-100 transition duration-300 pointer-events-none" />
          </div>

          {/* Card 4 */}
          <div className="relative bg-white-900 border border-gray-1000 rounded-xl p-6 shadow-md hover:shadow-cyan-500/30 transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-3 text-white pb-6">
              Community Driven
            </h3>
            <p className="text-gray-1100">
              Built around community values, empowering both freelancers and
              clients.
            </p>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/10 to-purple-500/10 opacity-0 hover:opacity-100 transition duration-300 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div
        id="how-it-work"
        className="py-10 bg-white-700 w-full pt-50"
      >
        <div className="w-full px-4 ">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent pt-4">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto text-center mb-16">
              Getting started with Lancelot is simple. Follow these steps to
              begin your Web3 freelancing journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="text-center">
              <div className=" bg-white text-black w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <div className="relative bg-black border border-gray-1000 rounded-xl p-6 shadow-md hover:shadow-green-500 transition-shadow duration-300">
                <div className="text-green-500 mb-4 text-3xl">
                  <i className="fas fa-wallet"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-1000 mb-3">
                  Connect Wallet
                </h3>
                <p className="text-white-600">
                  Link your Phantom wallet to create your profile and access the
                  platform.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white text-black w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <div className="brelative bg-black border border-gray-1000 rounded-xl p-6 shadow-md hover:shadow-green-500 transition-shadow duration-300">
                <div className="text-green-500 mb-4 text-3xl">
                  <i className="fas fa-user-edit custom-green-icon"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-1000 mb-3">
                  Create Profile
                </h3>
                <p className="text-white-600">
                  Build your professional profile showcasing your skills and
                  experience.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white text-black w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <div className="relative bg-black border border-gray-1000 rounded-xl p-6 shadow-md hover:shadow-green-500 transition-shadow duration-300">
                <div className="text-green-500 mb-4 text-3xl">
                  <i className="fas fa-tasks custom-green-icon"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-1000 mb-3">
                  Find Projects
                </h3>
                <p className="text-white-600">
                  Browse and apply for projects that match your skills and
                  interests.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white text-black w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <div className="relative bg-black border border-gray-1000 rounded-xl p-6 shadow-md hover:shadow-green-500 transition-shadow duration-300">
                <div className="text-green-500 mb-4 text-3xl">
                  <i className="fas fa-coins custom-green-icon"></i>
                </div>
                <h3 className="text-lg font-bold text-gray-1000 mb-3">
                  Get Paid
                </h3>
                <p className="text-white-600">
                  Complete work and receive instant payments directly to your
                  wallet.
                </p>
              </div>
            </div>
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

export default AboutPage;

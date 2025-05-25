import React from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-16 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://readdy.ai/api/search-image?query=A%20minimalist%20black%20and%20white%20digital%20landscape%20with%20subtle%20geometric%20patterns%20and%20clean%20lines%2C%20modern%20professional%20aesthetic%20with%20abstract%20elements%20creating%20depth%20and%20dimension%2C%20high%20contrast%20monochromatic%20design&width=1440&height=600&seq=1&orientation=landscape')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent"></div>
      </div>
      <div className="w-full px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-24">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4 px-4">
              Web3 Freelancing, <br />
              Powered by Solana
            </h1>
            <p className="text-xl text-gray-300 mb-8 px-4">
              Connect, Create, and Get Paid in Crypto. <br />
              The future of work is decentralized.
            </p>
            <div className="flex flex-wrap gap-4 px-4">
              <Button
                size="large"
                className="!rounded-button !bg-green-500 text-white border-2 border-green-500 hover:!bg-green-500 hover:text-white text-lg h-12 px-8 flex items-center cursor-pointer whitespace-nowrap transition-all"
                onClick={() => navigate("/browse-job")}
              >
                <span>Start Earning</span>
                <ArrowRightOutlined className="ml-2" />
              </Button>
              <Button
                size="large"
                className="!rounded-button bg-transparent text-white border-2 border-white hover:bg-green-500 hover:text-white text-lg h-12 px-8 flex items-center cursor-pointer whitespace-nowrap transition-all"
              >
                <Link to="/about" className="flex items-center">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center">
            {/* This is intentionally left empty as the background image serves as the right column content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

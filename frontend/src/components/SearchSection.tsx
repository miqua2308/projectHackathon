import React, { useState, useEffect, useRef } from "react";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SearchResultsDropdown from "./SearchResultsDropdown";

interface Job {
  title: string;
  skills: string[];
  budget: string;
  rating: number;
  image: string;
}

interface SearchSectionProps {
  onSearch: (searchTerm: string, skills: string) => void;
  jobs: Job[];
  showDropdown?: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  onSearch,
  jobs,
  showDropdown = false,
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [skills, setSkills] = useState("");
  const [searchResults, setSearchResults] = useState<Job[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (showDropdown) {
      navigate(
        `/browse-job?search=${encodeURIComponent(
          searchTerm
        )}&skills=${encodeURIComponent(skills)}`
      );
    } else {
      onSearch(searchTerm, skills);
    }
    setShowResults(false);
  };

  const handleInputChange = (value: string, isSkills: boolean = false) => {
    if (isSkills) {
      setSkills(value);
    } else {
      setSearchTerm(value);
      if (showDropdown && value) {
        const filtered = jobs.filter(
          (job) =>
            job.title.toLowerCase().includes(value.toLowerCase()) ||
            job.skills.some((skill) =>
              skill.toLowerCase().includes(value.toLowerCase())
            )
        );
        setSearchResults(filtered);
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleJobSelect = (job: Job) => {
    setSearchTerm(job.title);
    setShowResults(false);
    if (showDropdown) {
      navigate(
        `/browse-job?search=${encodeURIComponent(
          job.title
        )}&skills=${encodeURIComponent("")}`
      );
    } else {
      onSearch(job.title, "");
    }
  };

  return (
    <div className="bg-white py-8">
      <div className="w-full px-4">
        <div className="bg-white shadow-lg rounded-xl p-4 md:p-6 -mt-16 relative z-20 mx-4 md:mx-16">
          <div className="flex flex-col md:flex-row gap-4" ref={searchRef}>
            <div className="relative flex-1">
              <Input
                size="large"
                placeholder="Search for jobs..."
                prefix={<SearchOutlined className="text-gray-400" />}
                className="w-full border-gray-300 rounded-lg"
                value={searchTerm}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() =>
                  showDropdown && searchTerm && setShowResults(true)
                }
              />
              {showDropdown && showResults && searchResults.length > 0 && (
                <SearchResultsDropdown
                  results={searchResults}
                  onSelect={handleJobSelect}
                />
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:w-auto">
              <Input
                size="large"
                placeholder="Skills"
                prefix={
                  <i className="fas fa-code text-gray-400 mr-2 custom-green-icon"></i>
                }
                className="w-full md:w-64 border-gray-300 rounded-lg"
                value={skills}
                onChange={(e) => handleInputChange(e.target.value, true)}
                onKeyPress={handleKeyPress}
              />
              <Button
                type="primary"
                size="large"
                className="!rounded-button bg-green-500 border-none hover:bg-green-600 h-10 px-8 flex items-center justify-center cursor-pointer whitespace-nowrap w-full md:w-auto"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;

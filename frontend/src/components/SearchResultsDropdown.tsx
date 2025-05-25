import React from "react";
import { Link } from "react-router-dom";

interface Job {
  title: string;
  skills: string[];
  budget: string;
  rating: number;
  image: string;
}

interface SearchResultsDropdownProps {
  results: Job[];
  onSelect: (job: Job) => void;
}

const SearchResultsDropdown: React.FC<SearchResultsDropdownProps> = ({
  results,
  onSelect,
}) => {
  if (results.length === 0) return null;

  return (
    <div className="absolute w-full bg-white rounded-lg shadow-lg mt-2 z-50 max-h-96 overflow-y-auto">
      {results.map((job, index) => (
        <Link
          key={index}
          to="/browse-job"
          onClick={() => onSelect(job)}
          className="block p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-16 h-16">
              <img
                src={job.image}
                alt={job.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {job.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {job.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <span className="flex items-center">
                  <i className="fas fa-coins text-yellow-500 mr-1"></i>
                  {job.budget}
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <i className="fas fa-star text-yellow-500 mr-1"></i>
                  {job.rating}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResultsDropdown;

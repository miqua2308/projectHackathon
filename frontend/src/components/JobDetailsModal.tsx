import React from "react";
import { Modal, Button, Tag, Divider } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface Job { // This is the type used by JobDetailsModal internally and for its props
  _id: string; // Added to align with ModalJob and for navigation state
  title: string;
  skills: string[];
  budget: string;
  rating: number;
  image: string;
  description?: string;
  responsibilities?: string;
  requirements?: string;
  jobType?: string;
  experienceLevel?: string;
  duration?: string;
}


interface JobDetailsModalProps {
  job: Job | null;
  visible: boolean;
  onClose: () => void;
  onEnroll: (job: Job) => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  visible,
  onClose,
  onEnroll,
}) => {
  const navigate = useNavigate();

  if (!job) return null;

  const handleEnroll = () => {
    onEnroll(job);
    navigate("/create-contract", { state: { jobDetails: job } });
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      className="job-details-modal"
    >
      <div className="p-4">
        <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
          <img
            src={job.image}
            alt={job.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <i className="fas fa-coins text-yellow-500 mr-2"></i>
                <span>{job.budget}</span>
              </div>
              <div className="flex items-center">
                <StarFilled className="text-yellow-500 mr-1" />
                <span>{job.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, idx) => (
                <Tag
                  key={idx}
                  className="rounded-full px-3 py-1 bg-gray-100 text-gray-800"
                >
                  {skill}
                </Tag>
              ))}
            </div>
          </div>

          <Divider />

          <div>
            <h3 className="text-lg font-semibold mb-3">Job Description</h3>
            <p className="text-gray-600 whitespace-pre-line">
              {job.description || `We are looking for a skilled ${job.title} to join our team. The
              ideal candidate should have experience in ${job.skills.join(", ")}
              and be passionate about blockchain technology.`}
            </p>
          </div>

          {job.responsibilities && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {job.responsibilities
                  .split('\n')
                  .filter(item => item.trim() !== '')
                  .map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))}
              </ul>
            </div>
          )}

          {job.requirements && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {job.requirements
                  .split('\n')
                  .filter(item => item.trim() !== '')
                  .map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {job.jobType && (
              <div>
                <h4 className="font-medium text-gray-700">Job Type</h4>
                <p className="text-gray-600">{job.jobType}</p>
              </div>
            )}
            {job.experienceLevel && (
              <div>
                <h4 className="font-medium text-gray-700">Experience Level</h4>
                <p className="text-gray-600">{job.experienceLevel}</p>
              </div>
            )}
            {job.duration && (
              <div>
                <h4 className="font-medium text-gray-700">Duration</h4>
                <p className="text-gray-600">{job.duration}</p>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              size="large"
              onClick={onClose}
              className="!rounded-button border-gray-300"
            >
              Close
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={handleEnroll}
              className="!rounded-button bg-green-500 border-none hover:bg-green-600"
            >
              Enroll Now
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default JobDetailsModal;

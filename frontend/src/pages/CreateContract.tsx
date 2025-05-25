import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Input,
  Form,
  notification,
  Card,
  Steps,
  Descriptions,
  Tag,
} from "antd";
import { useWallet } from "@solana/wallet-adapter-react";
import { StarFilled } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import WalletConnectionAlert from "../components/WalletConnectionAlert";
import proposalService from "../services/proposalService";
 // Import proposal service

const { TextArea } = Input;
const { Step } = Steps;

interface Job { // This is the type for jobDetails received from navigation state
  _id: string; // Added to access the job's ID
  title: string;
  skills: string[];
  budget: string;
  rating: number;
  image: string;
}

interface ContractFormData {
  [key: string]: any;  // Add index signature to allow string indexing
  proposal: string;  // This will be mapped to proposalText in the API call
  estimatedTime: string;
  availability: string;
}

const CreateContract: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { connected, publicKey } = useWallet(); // Get publicKey for freelancerId
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get job details from location state
  const jobDetails = location.state?.jobDetails as Job;

  if (!jobDetails) {
    navigate("/browse-job");
    return null;
  }

  const handleSubmit = async (formValues: ContractFormData) => {
    console.log('Form values received:', formValues);
    
    if (!publicKey || !jobDetails?._id) {
      notification.error({
        message: "Application Failed",
        description: "User not connected or job details are missing.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Map form field names to backend field names
      const values = {
        proposal: formValues.proposal || '',
        estimatedTime: formValues.estimatedTime || '',
        availability: formValues.availability || ''
      };

      console.log('Processed values:', values);

      // Simple validation - just check if fields have any content
      const errors = [];
      if (!values.proposal.trim()) errors.push('proposal');
      if (!values.estimatedTime.trim()) errors.push('estimated time');
      if (!values.availability.trim()) errors.push('availability');

      if (errors.length > 0) {
        throw new Error(`Please fill in all required fields: ${errors.join(', ')}`);
      }

      // Map to backend expected format
      const proposalData = {
        jobId: jobDetails._id,
        freelancerId: publicKey.toString(),
        proposalText: values.proposal.trim(),
        estimatedTime: values.estimatedTime.trim(),
        availability: values.availability.trim(),
      };

      console.log('Submitting proposal with data:', proposalData);

      console.log("Submitting proposal with data:", proposalData);

      const response = await proposalService.createProposal(proposalData);
      console.log('Proposal created:', response);

      notification.success({
        message: "Application Submitted Successfully!",
        description: "Your application has been sent to the employer. You will be notified when they review it.",
        duration: 5,
      });

      // Navigate back to browse jobs
      navigate("/browse-job");
    } catch (error: any) {
      console.error('Error submitting proposal:', error);
      notification.error({
        message: "Application Failed",
        description: error.message || "There was an error submitting your application. Please try again.",
        duration: 5,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsData = [
    { title: "Job Details" },
    { title: "Your Proposal" },
    { title: "Review & Submit" },
  ];

  // Always render all form fields, but hide those not in the current step
  const renderStepContent = (step: number) => (
    <>
      {/* Step 0: Job Details */}
      <div style={{ display: step === 0 ? 'block' : 'none' }}>
        <div className="space-y-6">
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={jobDetails.image}
              alt={jobDetails.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-2xl font-bold mb-2">{jobDetails.title}</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <i className="fas fa-coins text-yellow-500 mr-2"></i>
                  <span>{jobDetails.budget}</span>
                </div>
                <div className="flex items-center">
                  <StarFilled className="text-yellow-500 mr-1" />
                  <span>{jobDetails.rating}</span>
                </div>
              </div>
            </div>
          </div>

          <Descriptions title="Job Information" bordered>
            <Descriptions.Item label="Required Skills" span={3}>
              <div className="flex flex-wrap gap-2">
                {jobDetails.skills.map((skill, idx) => (
                  <Tag
                    key={idx}
                    className="rounded-full px-3 py-1 bg-gray-100 text-gray-800"
                  >
                    {skill}
                  </Tag>
                ))}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Budget" span={3}>
              {jobDetails.budget}
            </Descriptions.Item>
            <Descriptions.Item label="Rating" span={3}>
              {jobDetails.rating} / 5.0
            </Descriptions.Item>
          </Descriptions>

          <Card className="bg-gray-50">
            <h4 className="font-semibold mb-2">Smart Contract Features</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Escrow-based payment system</li>
              <li>Automated milestone releases</li>
              <li>Dispute resolution mechanism</li>
              <li>Secure fund storage</li>
            </ul>
          </Card>
        </div>
      </div>
      {/* Step 1: Your Proposal */}
      <div style={{ display: step === 1 ? 'block' : 'none' }}>
        <div className="space-y-6">
          <Form.Item
            name="proposal"
            label="Your Proposal"
            rules={[{ required: true, message: "Please enter your proposal" }]}
          >
            <TextArea
              rows={6}
              placeholder="Describe why you're the best fit for this job and how you plan to approach it"
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="estimatedTime"
            label="Estimated Time to Complete"
            rules={[{ required: true, message: "Please enter estimated time" }]}
          >
            <Input 
              placeholder="e.g., 2 weeks, 1 month, 3 days, etc." 
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="availability"
            label="Your Availability"
            rules={[{ required: true, message: "Please enter your availability" }]}
          >
            <TextArea
              rows={3}
              placeholder="Describe your availability and working hours"
              allowClear
            />
          </Form.Item>
        </div>
      </div>
      {/* Step 2: Review & Submit */}
      <div style={{ display: step === 2 ? 'block' : 'none' }}>
        <div className="space-y-6">
          <Card className="bg-gray-50">
            <h4 className="font-semibold mb-4">Contract Terms</h4>
            <div className="space-y-4">
              <p className="text-gray-600">
                By submitting this application, you agree to the following
                terms:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  The employer will review your proposal and may request
                  additional information
                </li>
                <li>
                  If accepted, funds will be held in escrow until project
                  completion
                </li>
                <li>Payment will be released according to agreed milestones</li>
                <li>Both parties can raise disputes if terms are not met</li>
              </ul>
            </div>
          </Card>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">
              Smart Contract Benefits
            </h4>
            <ul className="list-disc list-inside text-green-700 space-y-1">
              <li>Secure payment through Solana blockchain</li>
              <li>Transparent milestone tracking</li>
              <li>Automated payment releases</li>
              <li>Built-in dispute resolution</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );

  const next = () => {
    let fieldsToValidate: string[] = [];
    if (currentStep === 1) { // "Your Proposal" step
      fieldsToValidate = ['proposal', 'estimatedTime', 'availability'];
    }

    // If there are specific fields to validate for the current step, validate them.
    // Otherwise, (e.g., moving from "Job Details"), just proceed.
    if (fieldsToValidate.length > 0) {
      form.validateFields(fieldsToValidate)
        .then(() => {
          setCurrentStep(currentStep + 1);
        })
        .catch(info => {
          console.log('Validation Failed:', info);
          // Optionally, provide user feedback about validation errors
          notification.error({
            message: "Validation Failed",
            description: "Please fill in all required fields for the current step.",
          });
        });
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  if (!connected) {
    return (
      <WalletConnectionAlert message="Please connect your wallet to apply for this job" />
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Apply for {jobDetails.title}
          </h1>

          <Steps current={currentStep} className="mb-8">
            {stepsData.map((item: { title: string }) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            {/* Always render all fields, but only show the current step */}
            {renderStepContent(currentStep)}

            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <Button
                  size="large"
                  onClick={prev}
                  className="!rounded-button border-gray-300"
                >
                  Previous
                </Button>
              )}
              {currentStep < stepsData.length - 1 ? (
                <Button
                  type="primary"
                  size="large"
                  onClick={next}
                  className="!rounded-button bg-green-500 border-none hover:bg-green-600 ml-auto"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={isSubmitting}
                  className="!rounded-button bg-green-500 border-none hover:bg-green-600 ml-auto"
                >
                  Submit Application
                </Button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateContract;

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import Navbar from "../components/Navbar";
import WalletConnectionAlert from "../components/WalletConnectionAlert";
import jobService from "../services/jobService";

const { TextArea } = Input;
const { Option } = Select;

interface JobFormData {
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  skills: string[];
  budget: number;
  jobType: string;
  experienceLevel: string;
  duration: string;
  image?: string;
  clientId?: string;
}

const PostWork: React.FC = () => {
  const navigate = useNavigate();
  const { publicKey } = useWallet();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleImageUpload = async () => {
    try {
      // Generate a sample image URL based on the job title
      const jobTitle = form.getFieldValue("title") || "blockchain";
      const encodedTitle = encodeURIComponent(jobTitle);
      const sampleImage = `https://readdy.ai/api/search-image?query=${encodedTitle}%20development%20workspace%20with%20code%20and%20blockchain%20elements%2C%20professional%20tech%20illustration%20with%20clean%20minimal%20background%2C%20high%20quality%203D%20render%20with%20subtle%20lighting&width=400&height=250&seq=2&orientation=landscape`;

      setImageUrl(sampleImage);
      message.success("Sample image generated successfully");
      return false; // Prevent default upload behavior
    } catch (error) {
      message.error("Failed to generate sample image");
      return false;
    }
  };

  const onFinish = async (values: JobFormData) => {
    if (!publicKey) {
      message.error("Please connect your wallet first");
      return;
    }

    setLoading(true);
    try {
      const defaultImage =
        "https://readdy.ai/api/search-image?query=Abstract%20digital%20representation%20of%20blockchain%20development%20with%20code%20elements%20and%20Solana%20logo%2C%20professional%20tech%20illustration%20with%20clean%20minimal%20background%2C%20high%20quality%203D%20render%20with%20subtle%20lighting&width=400&height=250&seq=2&orientation=landscape";

      const jobData: JobFormData = {
        title: values.title,
        description: values.description,
        responsibilities: values.responsibilities,
        requirements: values.requirements,
        skills: values.skills,
        budget: values.budget,
        jobType: values.jobType,
        experienceLevel: values.experienceLevel,
        duration: values.duration,
        image: imageUrl || defaultImage,
        clientId: publicKey.toString(),
      };

      await jobService.createJob(jobData);

      message.success("Job posted successfully!");
      navigate("/browse-job");
    } catch (error) {
      console.error("Error posting job:", error);
      message.error("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!publicKey) {
    return (
      <WalletConnectionAlert message="Please connect your wallet to post a new job" />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12 mt-16">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Post a New Job
          </h1>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-6"
          >
            <Form.Item
              name="title"
              label="Job Title"
              rules={[{ required: true, message: "Please enter job title" }]}
            >
              <Input
                placeholder="e.g., Solana Smart Contract Developer"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Job Description"
              rules={[
                { required: true, message: "Please enter job description" },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Provide a brief overview of the job and its purpose..."
              />
            </Form.Item>

            <Form.Item
              name="responsibilities"
              label="Responsibilities"
              rules={[
                {
                  required: true,
                  message: "Please enter job responsibilities",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="List the main responsibilities and duties of the role..."
              />
            </Form.Item>

            <Form.Item
              name="requirements"
              label="Requirements"
              rules={[
                { required: true, message: "Please enter job requirements" },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="List the required qualifications, experience, and skills..."
              />
            </Form.Item>

            <Form.Item
              name="skills"
              label="Required Skills"
              rules={[
                { required: true, message: "Please select required skills" },
              ]}
            >
              <Select
                mode="tags"
                size="large"
                placeholder="Select or type skills"
                tokenSeparators={[","]}
              >
                <Option value="Rust">Rust</Option>
                <Option value="Solana">Solana</Option>
                <Option value="React">React</Option>
                <Option value="Solidity">Solidity</Option>
                <Option value="Web3">Web3</Option>
                <Option value="TypeScript">TypeScript</Option>
                <Option value="Smart Contracts">Smart Contracts</Option>
                <Option value="DeFi">DeFi</Option>
                <Option value="NFT">NFT</Option>
              </Select>
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name="budget"
                label="Budget (SOL)"
                rules={[{ required: true, message: "Please enter budget" }]}
              >
                <InputNumber
                  min={0}
                  step={0.1}
                  size="large"
                  className="w-full"
                  placeholder="e.g., 2.5"
                />
              </Form.Item>

              <Form.Item
                name="jobType"
                label="Job Type"
                rules={[{ required: true, message: "Please select job type" }]}
              >
                <Select size="large" placeholder="Select job type">
                  <Option value="Full-time">Full-time</Option>
                  <Option value="Part-time">Part-time</Option>
                  <Option value="Hourly">Hourly</Option>
                  <Option value="Project-based">Project-based</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name="experienceLevel"
                label="Experience Level"
                rules={[
                  { required: true, message: "Please select experience level" },
                ]}
              >
                <Select size="large" placeholder="Select experience level">
                  <Option value="Entry level">Entry Level</Option>
                  <Option value="Intermediate">Intermediate</Option>
                  <Option value="Expert">Expert</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="duration"
                label="Duration"
                rules={[{ required: true, message: "Please select duration" }]}
              >
                <Select size="large" placeholder="Select duration">
                  <Option value="Less than 1 month">Less than 1 month</Option>
                  <Option value="1-3 months">1-3 months</Option>
                  <Option value="3-6 months">3-6 months</Option>
                  <Option value="More than 6 months">More than 6 months</Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item name="image" label="Job Image (Optional)">
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={handleImageUpload}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Generate Sample Image</Button>
              </Upload>
              {imageUrl && (
                <div className="mt-2">
                  <img
                    src={imageUrl}
                    alt="Job preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </Form.Item>

            <div className="flex justify-end space-x-4">
              <Button
                size="large"
                onClick={() => navigate("/browse-job")}
                className="!rounded-button border-gray-300"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                className="!rounded-button bg-green-500 border-none hover:bg-green-600"
              >
                Post Job
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PostWork;

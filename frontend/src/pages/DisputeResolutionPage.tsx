import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Steps,
  Timeline,
  Button,
  Upload,
  message,
  Progress,
  Tag,
  Space,
  Divider,
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  UploadOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Navbar from "../components/Navbar";

// Custom hook for countdown timer
const useCountdownTimer = (initialTimeInSeconds: number) => {
  const [timeRemaining, setTimeRemaining] =
    React.useState(initialTimeInSeconds);
  const [isRunning, setIsRunning] = React.useState(true);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeRemaining]);

  const stopTimer = () => {
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return {
    timeRemaining: formatTime(timeRemaining),
    stopTimer,
    isRunning,
  };
};

const DisputeResolutionPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [jurySelectionStarted, setJurySelectionStarted] = React.useState(false);
  const [selectedCount, setSelectedCount] = React.useState(0);
  const [evidenceProgress, setEvidenceProgress] = React.useState(0);
  const [evidenceDescription, setEvidenceDescription] = React.useState("");
  const [votingProgress, setVotingProgress] = React.useState(0);
  const [freelancerVotes, setFreelancerVotes] = React.useState(0);
  const [employerVotes, setEmployerVotes] = React.useState(0);
  const [needMoreInfoVotes, setNeedMoreInfoVotes] = React.useState(0);
  const [resolutionProgress, setResolutionProgress] = React.useState(0);
  const [releasingFunds, setReleasingFunds] = React.useState(false);
  const [updatingReputation, setUpdatingReputation] = React.useState(false);
  const [recordingOnChain, setRecordingOnChain] = React.useState(false);
  const [resolutionDescription, setResolutionDescription] = React.useState("");
  const [isAppealed, setIsAppealed] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);

  // Initialize countdown timer with 24 hours in seconds
  const { timeRemaining, stopTimer } = useCountdownTimer(24 * 60 * 60);

  // Mock data for the dispute
  const disputeData = {
    jobTitle: "Frontend Development",
    client: "0x1357...2468",
    budget: "2.5 SOL",
    issue: "Payment Delayed",
    status: "Under Review",
    evidenceSubmitted: 2,
    totalEvidenceRequired: 3,
    votingProgress: 4,
    totalVotes: 7,
    timeRemaining,
    juryMembers: [
      "0xA1B2...C3D4",
      "0xE5F6...7890",
      "0x1234...5678",
      "0x9ABC...DEF0",
      "0x2468...1357",
      "0xAAAA...BBBB",
      "0xCCCC...DDDD",
    ],
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (
      jurySelectionStarted &&
      selectedCount < disputeData.juryMembers.length
    ) {
      timer = setTimeout(() => {
        setSelectedCount((prev) => prev + 1);
      }, 800); // 0.8s per member for demo
    }
    return () => clearTimeout(timer);
  }, [jurySelectionStarted, selectedCount, disputeData.juryMembers.length]);

  // Add effect for evidence collection animation
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentStep === 1) {
      // Evidence Collection step
      setEvidenceProgress(0);
      setEvidenceDescription("Initializing evidence collection...");

      const descriptions = [
        "Analyzing submitted documents...",
        "Verifying timestamps and metadata...",
        "Cross-referencing with blockchain records...",
        "Preparing evidence summary...",
      ];

      let progress = 0;
      timer = setInterval(() => {
        progress += 2;
        if (progress >= 100) {
          clearInterval(timer);
          setEvidenceProgress(100);
          setEvidenceDescription(descriptions[3]);
          return;
        }

        setEvidenceProgress(progress);

        // Update description based on progress
        if (progress < 25) {
          setEvidenceDescription(descriptions[0]);
        } else if (progress < 50) {
          setEvidenceDescription(descriptions[1]);
        } else if (progress < 75) {
          setEvidenceDescription(descriptions[2]);
        } else {
          setEvidenceDescription(descriptions[3]);
        }
      }, 50);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentStep]);

  // Add effect for voting period animation
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentStep === 3) {
      // Voting Period step
      setVotingProgress(0);
      setFreelancerVotes(0);
      setEmployerVotes(0);
      setNeedMoreInfoVotes(0);

      let voteCount = 0;
      const totalVotes = 7; // 5 freelancer + 1 employer + 1 need more info
      let voteTimer = 0;

      timer = setInterval(() => {
        setVotingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 2;
        });

        // Increment votes more gradually
        voteTimer += 50;
        if (voteCount < totalVotes && voteTimer >= 350) {
          // New vote every 350ms
          voteCount++;
          voteTimer = 0;
          if (voteCount <= 5) {
            setFreelancerVotes(voteCount);
          } else if (voteCount === 6) {
            setEmployerVotes(1);
          } else if (voteCount === 7) {
            setNeedMoreInfoVotes(1);
          }
        }
      }, 50);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentStep]);

  // Add effect for resolution phase animation
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentStep === 4) {
      // Resolution step
      setResolutionProgress(0);
      setReleasingFunds(false);
      setUpdatingReputation(false);
      setRecordingOnChain(false);
      setResolutionDescription("Initializing resolution process...");

      const descriptions = [
        "Preparing to release funds...",
        "Calculating final amounts...",
        "Updating reputation scores...",
        "Recording transaction on blockchain...",
        "Finalizing resolution...",
      ];

      let stepTimer = 0;

      timer = setInterval(() => {
        setResolutionProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            // Set all checkmarks to green when complete
            setReleasingFunds(true);
            setUpdatingReputation(true);
            setRecordingOnChain(true);
            return 100;
          }
          return prev + 2;
        });

        // Update status based on progress
        stepTimer += 50;
        if (stepTimer >= 500) {
          // Change status every 500ms
          stepTimer = 0;
          if (resolutionProgress < 30) {
            setResolutionDescription(descriptions[0]);
          } else if (resolutionProgress < 50) {
            setResolutionDescription(descriptions[1]);
          } else if (resolutionProgress < 70) {
            setResolutionDescription(descriptions[2]);
          } else if (resolutionProgress < 90) {
            setResolutionDescription(descriptions[3]);
          } else {
            setResolutionDescription(descriptions[4]);
          }
        }
      }, 50);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentStep]);

  const handleAppealSubmit = () => {
    stopTimer(); // Stop the timer when appeal is submitted
    setIsAppealed(true);
    setIsCompleted(false);
    message.success({
      content:
        "Appeal submitted successfully! The case is now under review by the DAO council.",
      duration: 5,
      style: {
        marginTop: "20vh",
      },
    });
  };

  const handleNoAppeal = () => {
    stopTimer(); // Stop the timer when no appeal is submitted
    setIsCompleted(true);
    setIsAppealed(false);
    message.success({
      content: "Case marked as completed.",
      duration: 5,
      style: {
        marginTop: "20vh",
      },
    });
  };

  const steps = [
    {
      title: "Dispute Triggered",
      description: "Job flagged as disputed",
      content: (
        <Card className="mt-4">
          <Timeline
            items={[
              {
                color: "red",
                children: (
                  <div>
                    <h4 className="font-medium">Dispute Initiated</h4>
                    <p className="text-gray-600">
                      Job flagged as disputed due to payment delay
                    </p>
                    <p className="text-gray-400 text-sm">2 hours ago</p>
                  </div>
                ),
              },
              {
                color: "blue",
                children: (
                  <div>
                    <h4 className="font-medium">Initial Evidence Submitted</h4>
                    <p className="text-gray-600">
                      Screenshots of communication and work deliverables
                    </p>
                    <p className="text-gray-400 text-sm">1 hour ago</p>
                  </div>
                ),
              },
            ]}
          />
        </Card>
      ),
    },
    {
      title: "Evidence Collection",
      description: "Gathering supporting materials",
      content: (
        <Card className="mt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Evidence Progress</h4>
              <Tag color="blue">
                {Math.round(evidenceProgress / 25)}/
                {disputeData.totalEvidenceRequired} Submitted
              </Tag>
            </div>
            <Progress
              percent={evidenceProgress}
              status={evidenceProgress === 100 ? "success" : "active"}
              strokeColor={evidenceProgress === 100 ? "#52c41a" : undefined}
            />
            <p className="text-gray-600 italic">{evidenceDescription}</p>
            <Upload>
              <Button icon={<UploadOutlined />}>Upload Evidence</Button>
            </Upload>
            <p className="text-gray-500 text-sm">
              Time remaining: {disputeData.timeRemaining}
            </p>
          </div>
        </Card>
      ),
    },
    {
      title: "DAO Jury Formation",
      description: "Selecting jury members",
      content: (
        <Card className="mt-4">
          <div className="space-y-4">
            <h4 className="font-medium">Jury Selection in Progress</h4>
            <p className="text-gray-600">
              Randomly selecting 7 DAO token holders to form the jury
            </p>
            {!jurySelectionStarted ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-2"
                onClick={() => {
                  setJurySelectionStarted(true);
                  setSelectedCount(0);
                }}
              >
                Start Jury Selection
              </button>
            ) : null}
            <Progress
              percent={Math.round(
                (selectedCount / disputeData.juryMembers.length) * 100
              )}
              status={
                selectedCount < disputeData.juryMembers.length
                  ? "active"
                  : "success"
              }
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>
                {selectedCount}/{disputeData.juryMembers.length} Members
                Selected
              </span>
              <span>
                {selectedCount < disputeData.juryMembers.length
                  ? `Selecting...`
                  : "Selection Complete"}
              </span>
            </div>
            <div className="mt-2">
              <h5 className="font-medium mb-1">Selected Jury Members:</h5>
              <ul>
                {disputeData.juryMembers.slice(0, selectedCount).map((id) => (
                  <li key={id} className="text-gray-700 text-sm mb-1">
                    <span className="inline-block bg-gray-100 rounded px-2 py-1 mr-2 font-mono">
                      {id}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      ),
    },
    {
      title: "Voting Period",
      description: "Jury members casting votes",
      content: (
        <Card className="mt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Voting Progress</h4>
              <Tag color="blue">
                {Math.round(votingProgress / 14.28)}/{disputeData.totalVotes}{" "}
                Votes
              </Tag>
            </div>
            <Progress
              percent={votingProgress}
              status={votingProgress === 100 ? "success" : "active"}
              strokeColor={votingProgress === 100 ? "#52c41a" : undefined}
            />
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Tag color="green" className="text-lg">
                  {freelancerVotes}
                </Tag>
                <p className="text-sm text-gray-600">For Freelancer</p>
              </div>
              <div className="text-center">
                <Tag color="red" className="text-lg">
                  {employerVotes}
                </Tag>
                <p className="text-sm text-gray-600">For Employer</p>
              </div>
              <div className="text-center">
                <Tag color="gold" className="text-lg">
                  {needMoreInfoVotes}
                </Tag>
                <p className="text-sm text-gray-600">Need More Info</p>
              </div>
            </div>
          </div>
        </Card>
      ),
    },
    {
      title: "Resolution",
      description: "Finalizing the decision",
      content: (
        <Card className="mt-4">
          <div className="space-y-4">
            <h4 className="font-medium">Resolution in Progress</h4>
            <p className="text-gray-600 italic">{resolutionDescription}</p>
            <Progress
              percent={resolutionProgress}
              status={resolutionProgress === 100 ? "success" : "active"}
              strokeColor={resolutionProgress === 100 ? "#52c41a" : undefined}
            />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Releasing funds</span>
                {releasingFunds ? (
                  <CheckCircleOutlined className="text-green-500" />
                ) : (
                  <ClockCircleOutlined className="text-blue-500" />
                )}
              </div>
              <div className="flex justify-between">
                <span>Updating reputation</span>
                {updatingReputation ? (
                  <CheckCircleOutlined className="text-green-500" />
                ) : (
                  <ClockCircleOutlined className="text-blue-500" />
                )}
              </div>
              <div className="flex justify-between">
                <span>Recording on-chain</span>
                {recordingOnChain ? (
                  <CheckCircleOutlined className="text-green-500" />
                ) : (
                  <ClockCircleOutlined className="text-blue-500" />
                )}
              </div>
            </div>
          </div>
        </Card>
      ),
    },
    {
      title: "Appeal",
      description: "Optional appeal process",
      content: (
        <Card className="mt-4">
          <div className="space-y-4">
            <h4 className="font-medium">Appeal Process</h4>
            <p className="text-gray-600">
              If you disagree with the decision, you can appeal to the DAO
              council
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium mb-2">Appeal Requirements:</h5>
              <ul className="list-disc list-inside text-gray-600">
                <li>New evidence not previously considered</li>
                <li>Appeal fee: 0.005 SOL</li>
                <li>Must be submitted within 24 hours</li>
              </ul>
            </div>
            {isAppealed ? (
              <div className="flex items-center space-x-2">
                <Tag color="orange">Under Appeal</Tag>
                <span className="text-gray-600">
                  Appeal submitted and under review
                </span>
              </div>
            ) : isCompleted ? (
              <div className="flex items-center space-x-2">
                <Tag color="green">Completed</Tag>
                <span className="text-gray-600">Case has been resolved</span>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Button type="primary" danger onClick={handleAppealSubmit}>
                  Submit Appeal
                </Button>
                <Button
                  type="primary"
                  style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
                  onClick={handleNoAppeal}
                >
                  Do Not Appeal
                </Button>
              </div>
            )}
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            Back to Profile
          </Button>

          <Card className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {disputeData.jobTitle}
                </h1>
                <p className="text-gray-600">Client: {disputeData.client}</p>
              </div>
              <Space>
                <Tag color="red">{disputeData.issue}</Tag>
                {isAppealed ? (
                  <Tag color="orange">Under Appeal</Tag>
                ) : isCompleted ? (
                  <Tag color="green">Completed</Tag>
                ) : (
                  <Tag color="blue">{disputeData.status}</Tag>
                )}
              </Space>
            </div>
            <Divider />
            <div className="flex justify-between text-gray-600">
              <div>
                <span className="font-medium">Budget:</span>{" "}
                {disputeData.budget}
              </div>
              <div>
                <span className="font-medium">Time Remaining:</span>{" "}
                {disputeData.timeRemaining}
              </div>
            </div>
          </Card>

          <Steps
            current={currentStep}
            onChange={setCurrentStep}
            items={steps.map((step) => ({
              title: step.title,
            }))}
            className="custom-dispute-steps"
          />

          <div className="mt-6">
            <div className="text-gray-600 mb-4 text-lg font-medium">
              {steps[currentStep].description}
            </div>
            {steps[currentStep].content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeResolutionPage;
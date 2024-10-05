import { Modal, Text, Grid, Col, Button } from "@mantine/core";
import { useState } from "react";

interface ProblemDirectionModalProps {
  isOpen: boolean;
  close: () => void;
}

const ProblemDirectionModal = ({
  isOpen,
  close,
}: ProblemDirectionModalProps) => {
  const [problemType, setProblemType] = useState<string | null>(null);

  // Problem categories for the user to select
  const problemCategories = [
    { value: "road_issues", label: "Road and Traffic Problems" },
    { value: "waste_management", label: "Waste Management" },
    { value: "public_safety", label: "Public Safety and Crime" },
    { value: "other", label: "Other" },
  ];

  // Instruction text based on selected problem type
  const getInstructions = () => {
    switch (problemType) {
      case "road_issues":
        return "Report road-related issues to the Ministry of Transport via hotline or their website.";
      case "waste_management":
        return "Waste management complaints should go to your local city council.";
      case "public_safety":
        return "Public safety concerns should be reported to the police or your local safety office.";
      default:
        return "Please select a problem type to get the correct instructions.";
    }
  };

  return (
    <Modal opened={isOpen} onClose={close} title="Problem Direction" centered>
      <div>
        <h2>Select the Problem Category</h2>
        {/* Problem Categories Grid */}
        <Grid>
          <Col span={4}>
            <Text
              onClick={() => setProblemType("road_issues")}
              style={{ cursor: "pointer" }}
            >
              Road and Traffic Problems
            </Text>
            <Text
              onClick={() => setProblemType("waste_management")}
              style={{ cursor: "pointer" }}
            >
              Waste Management
            </Text>
          </Col>
          <Col span={4}>
            <Text
              onClick={() => setProblemType("public_safety")}
              style={{ cursor: "pointer" }}
            >
              Public Safety and Crime
            </Text>
            <Text
              onClick={() => setProblemType("other")}
              style={{ cursor: "pointer" }}
            >
              Other
            </Text>
          </Col>
        </Grid>

        {/* Instructions Section */}
        <div style={{ marginTop: 20 }}>
          <h3>Instructions</h3>
          <Text>{getInstructions()}</Text>
        </div>

        {/* Close Modal Button */}
        <div style={{ marginTop: 20 }}>
          <Button onClick={close}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProblemDirectionModal;

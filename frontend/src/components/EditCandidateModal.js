import React from "react";
import Modal from "react-modal";
import "./EditCandidateModal.css";
import { statusOptions } from "./helpers";

const EditCandidateModal = ({ isModalOpen, closeModal, candidateData, setCandidateData,handleInputChange,handleUpdateCandidate }) => {
 
  

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Candidate"
      className="EditCandidateModal"
      overlayClassName="Overlay"
    >
      <h2 className="ModalTitle">Edit Candidate</h2>
      {candidateData && (
        <div>
          <label className="FormLabel">
            Name:
            <input
              type="text"
              value={candidateData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="FormInput"
            />
          </label>
          <label className="FormLabel">
            Email:
            <input
              type="text"
              value={candidateData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="FormInput"
            />
          </label>
          <label className="FormLabel">
            Phone:
            <input
              type="text"
              value={candidateData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="FormInput"
            />
          </label>
          <label className="FormLabel">
            Skills:
            <textarea
              value={candidateData.skills}
              onChange={(e) => handleInputChange("skills", e.target.value)}
              className="FormTextarea"
            />
          </label>
          <label className="FormLabel">
            Status:
            <select
              value={candidateData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="FormInput"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <label className="FormLabel">
            Expected Salary:
            <input
              type="number"
              value={candidateData.expected_salary}
              onChange={(e) =>
                handleInputChange("expected_salary", e.target.value)
              }
              className="FormInput"
            />
          </label>
          <label className="FormLabel">
            Node Experience:
            <input
              type="number"
              value={candidateData.node_experience}
              onChange={(e) =>
                handleInputChange("node_experience", e.target.value)
              }
              className="FormInput"
            />
          </label>
          <label className="FormLabel">
            React Experience:
            <input
              type="number"
              value={candidateData.react_experience}
              onChange={(e) =>
                handleInputChange("react_experience", e.target.value)
              }
              className="FormInput"
            />
          </label>
          <button onClick={handleUpdateCandidate} className="FormButton">
            Update Candidate
          </button>
          <button onClick={closeModal} className="CloseButton">
            Close
          </button>
        </div>
      )}
    </Modal>
  );
};

export default EditCandidateModal;

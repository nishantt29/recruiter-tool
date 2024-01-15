import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import EditCandidateModal from "./EditCandidateModal";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  //   const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [candidateData, setCandidateData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    status: "",
    expected_salary: 0,
    node_experience: 0,
    react_experience: 0,
  });

  const handleInputChange = (field, value) => {
    console.log(value, "val");
    setCandidateData({
      ...candidateData,
      [field]: value,
    });
  };
  const handleUpdateCandidate = () => {
    axios
      .put(`http://localhost:5002/candidates/${candidateData.id}`, {
        name: candidateData.name,
        email: candidateData.email,
        phone: candidateData.phone,
        skills: candidateData.skills,
        status: candidateData.status,
        expectedSalary: candidateData.expected_salary,
        nodeExperience: candidateData.node_experience,
        reactExperience: candidateData.react_experience,
      })
      .then((response) => {
        console.log("Candidate updated:", response.data);
        toast.success('Candidate updated successfully');
        handleGetCandidateList();
        closeModal();
      })
      .catch((error) => {
        console.error("Error updating candidate:", error);
        toast.error('Error updating candidate');
      });
  };

  const handleDeleteCandidate = (id) => {
    axios
      .delete(`http://localhost:5002/candidates/${id}`)
      .then((response) => {
        console.log("Candidate deleted:", response.data);
        toast.success('Candidate deleted successfully');
        handleGetCandidateList();
      })
      .catch((error) => {
        console.error("Error deleting candidate:", error);
        toast.error('Error deleting candidate');
      });
  };
  const handleGetCandidateList = () => {
    axios
      .get("http://localhost:5002/candidates")
      .then((response) => setCandidates(response.data))
      .catch((error) => console.error("Error fetching candidates:", error));
  };

  useEffect(() => {
    handleGetCandidateList();
  }, []);

  const openModal = (candidate) => {
    setCandidateData(candidate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCandidateData(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Candidates Lists</h2>
      {!candidates[0]&&<div>No candidate in List Please add candidate</div>}
    {candidates[0]&&(<table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ border: "1px solid #dddddd" }}>
            <th
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              ID
            </th>
            <th
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Name
            </th>
            <th
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Email
            </th>
            <th
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Phone
            </th>
            <th
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Skills
            </th>
            <th
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Status
            </th>
            <th
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Expected Salary
            </th>
            <th
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Node Experience
            </th>
            <th
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              React Experience
            </th>
            <th
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Total Score
            </th>
            <th
              style={{
                border: "1px solid #dddddd",
                padding: "8px",
                textAlign: "left",
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id} style={{ border: "1px solid #dddddd" }}>
              <td style={{ border: "1px solid #dddddd", padding: "8px" }}>
                {candidate.id}
              </td>
              <td style={{ border: "1px solid #dddddd", padding: "8px" }}>
                {candidate.name}
              </td>
              <td style={{ border: "1px solid #dddddd", padding: "8px" }}>
                {candidate.email}
              </td>
              <td style={{ border: "1px solid #dddddd", padding: "8px" }}>
                {candidate.phone}
              </td>
              <td style={{ border: "1px solid #dddddd", padding: "8px" }}>
                {candidate.skills}
              </td>
              <td style={{ border: "1px solid #dddddd", padding: "8px" }}>
                {candidate.status}
              </td>
              <td style={{ border: "1px solid #dddddd", padding: "8px" }}>
                {candidate.expected_salary}
              </td>
              <td style={{ border: "1px solid #dddddd", padding: "8px" }}>
                {candidate.node_experience}
              </td>
              <td style={{ border: "1px solid #dddddd", padding: "8px" }}>
                {candidate.react_experience}
              </td>
              <td style={{ border: "1px solid #dddddd", padding: "8px" }}>
                {candidate.total_score}
              </td>
              <td style={{ border: "1px solid #dddddd", padding: "8px" }}>
                <button onClick={() => openModal(candidate)}>Edit</button>
                <button onClick={() => handleDeleteCandidate(candidate.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>)}

      <EditCandidateModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        candidateData={candidateData}
        setCandidateData={setCandidateData}
        handleInputChange={handleInputChange}
        handleUpdateCandidate={handleUpdateCandidate}
      />
       <ToastContainer />
    </div>
  );
}

export default CandidateList;

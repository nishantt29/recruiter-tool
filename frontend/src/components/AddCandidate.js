import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddCandidate.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCandidate() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    status: "",
    expectedSalary: "",
    nodeExperience: "",
    reactExperience: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const validateForm = () => {
    const {
      name,
      email,
      phone,
      skills,
      status,
      expectedSalary,
      nodeExperience,
      reactExperience,
    } = formData;

    if (!name || !email || !phone || !skills || !status || !expectedSalary || !nodeExperience || !reactExperience) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };






  const handleAddCandidate = () => {
    if (validateForm()) {
      axios
        .post("http://localhost:5002/candidates", formData)
        .then((response) => {
          toast.success("Candidate added successfully");
          navigate("/");
        })
        .catch((error) => {
          toast.error("Error while adding candidate");
          console.error("Error while adding candidate:", error);
        });
    }
  };

  return (
    <div className="div-conatainer" style={{ width: "700px" }}>
      <h2>Add Candidate</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Skills:
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="">Select Status</option>
            <option value="Contacted">Contacted</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Offer Extended">Offer Extended</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>
        <label>
          Expected Salary:
          <input
            type="text"
            name="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Node.js Experience:
          <input
            type="text"
            name="nodeExperience"
            value={formData.nodeExperience}
            onChange={handleInputChange}
          />
        </label>
        <label>
          React Experience:
          <input
            type="text"
            name="reactExperience"
            value={formData.reactExperience}
            onChange={handleInputChange}
          />
        </label>
        <button className="add-btn" type="button" onClick={handleAddCandidate}>
          Add Candidate
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddCandidate;

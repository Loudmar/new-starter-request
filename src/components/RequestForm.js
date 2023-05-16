import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import RequestList from "./RequestList";
import "./RequestForm.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function RequestForm() {
  const [latestId, setLatestId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [lineManager, setLineManager] = useState("");
  const [startDate, setStartDate] = useState("");
  const [businessArea, setBusinessArea] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    //To load from local storage when component mounts
    const storedRequests = localStorage.getItem("requests");

    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    }

    //Find the ID from the last entry

    const parsedRequests = JSON.parse(storedRequests);

    if (parsedRequests && parsedRequests.length > 0) {
      const maxId = Math.max(...parsedRequests.map((request) => request.id));

      setLatestId(maxId);
      //console.log(setLatestId(maxId));
    }
  }, []);

  useEffect(() => {
    //Saving requests local storage
    localStorage.setItem("requests", JSON.stringify(requests));
  }, [requests]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Adding form validation

    if (
      !firstName ||
      !lastName ||
      !jobTitle ||
      !lineManager ||
      !startDate ||
      !businessArea
    ) {
      setErrorMessage("All fields are required!");
      return;
    }

    const newRequest = {
      id: latestId + 1,
      firstName,
      lastName,
      jobTitle,
      lineManager,
      startDate,
      businessArea,
      completed: false,
    };

    //console.log(data.push(newRequest));
    //Updating the UI table
    const updatedRequests = [...requests, newRequest];
    setRequests(updatedRequests);
    localStorage.setItem("requests", JSON.stringify(updatedRequests));

    //Updating the ID

    setLatestId(latestId + 1);

    setFirstName("");
    setLastName("");
    setJobTitle("");
    setLineManager("");
    setStartDate("");
    setBusinessArea("");
    setErrorMessage("");

    setShowModal(false);
  };

  return (
    <div>
      <h2>Create New Starter Request</h2>
      <button className="new-request-button" onClick={() => setShowModal(true)}>
        Add New Request
      </button>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Create New Request."
        style={customStyles}
      >
        <div className="modal-header">
          <h2>Create Request</h2>
          <span
            className="close"
            onClick={() => setShowModal(false)}
            title="Close"
          >
            &times;
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-input">
            <label>First Name: </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>

          <div className="modal-input">
            <label>Last Name: </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>

          <div className="modal-input">
            <label>Job Title: </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            ></input>
          </div>

          <div className="modal-input">
            <label>Line Manager: </label>
            <input
              type="text"
              value={lineManager}
              onChange={(e) => setLineManager(e.target.value)}
            ></input>
          </div>

          <div className="modal-input">
            <label>Start Date: </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            ></input>
          </div>

          <div className="modal-input">
            <label>Business Area: </label>
            <select
              value={businessArea}
              onChange={(e) => setBusinessArea(e.target.value)}
              required
            >
              <option value="">Select Business Area</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
              <option value="Housing">Housing</option>
              <option value="Care">Care</option>
            </select>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="modal-button" type="submit">
            Submit
          </button>
        </form>
      </Modal>
      <RequestList requests={requests} />
    </div>
  );
}

export default RequestForm;

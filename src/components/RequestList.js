import React, { useState, useEffect } from "react";
import "./RequestList.css";

function RequestList(props) {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [businessAreaFilter, setBusinessAreaFilter] = useState("");
  const [completedFilter, setCompletedFilter] = useState("");

  useEffect(() => {
    /* const storedRequests = localStorage.getItem("requests");
    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    } */
    setRequests(props.requests);
  }, [props.requests]);

  //Filters

  useEffect(() => {
    let filteredData = [...requests];

    if (businessAreaFilter) {
      filteredData = filteredData.filter(
        (request) => request.businessArea === businessAreaFilter
      );
    }

    if (completedFilter !== "") {
      const isCompleted = completedFilter === "true";
      filteredData = filteredData.filter(
        (request) => request.completed === isCompleted
      );
    }

    setFilteredRequests(filteredData);
  }, [requests, businessAreaFilter, completedFilter]);

  //Tick box for completed tasks

  const handleCompleteToggle = (id) => {
    const updateRequests = requests.map((request) => {
      if (request.id === id) {
        return {
          ...request,
          completed: !request.completed,
        };
      }
      return request;
    });

    //Updating the request on local storage and UI

    setRequests(updateRequests);
    localStorage.setItem("requests", JSON.stringify(updateRequests));
  };

  // Deleting a request

  const handleDelete = (id) => {
    const updateRequests = requests.filter((request) => request.id !== id);
    // Updating the UI list
    setRequests(updateRequests);
    localStorage.setItem("requests", JSON.stringify(updateRequests));
  };

  const tableHead = [
    "First Name",
    "Last Name",
    "Job Title",
    "Line Manager",
    "Start Date",
  ];

  return (
    <div>
      <h2 className="request-list-header">Request List</h2>
      <table>
        <thead>
          <tr>
            {tableHead.map((el, i) => (
              <th key={i}>{el}</th>
            ))}
            {/* <th>First Name</th>
            <th>Last Name</th>
            <th>Job Title</th>
            <th>Line Manager</th>
            <th>Start Date</th> */}
            <th>
              Business Area
              <select
                value={businessAreaFilter}
                onChange={(e) => setBusinessAreaFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="HR">HR</option>
                <option value="Housing">Housing</option>
                <option value="Care">Care</option>
              </select>
            </th>
            <th className="table-list-dropdown">
              Completed
              <select
                value={completedFilter}
                onChange={(e) => setCompletedFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="true">Completed</option>
                <option value="false">Not Completed</option>
              </select>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr
              key={request.id}
              className={request.completed ? "completed" : ""}
            >
              <td>{request.firstName}</td>
              <td>{request.lastName}</td>
              <td>{request.jobTitle}</td>
              <td>{request.lineManager}</td>
              <td>{request.startDate}</td>
              <td>{request.businessArea}</td>
              <td>
                <input
                  className="table-list-checkbox"
                  type="checkbox"
                  checked={request.completed}
                  onChange={() => handleCompleteToggle(request.id)}
                ></input>
              </td>
              <td>
                <button
                  className="request-list-delete-button"
                  onClick={() => handleDelete(request.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestList;

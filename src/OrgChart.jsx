import React, { useEffect, useState } from "react";

const OrgChart = () => {
  const [orgData, setOrgData] = useState([]);

  const fetchOrgData = () => {
    fetch("http://localhost:8080/org-chart")
      .then((res) => res.json())
      .then((data) => setOrgData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    // Fetch data initially
    fetchOrgData();

    // Set up polling every 2 seconds (2000 milliseconds)
    const intervalId = setInterval(fetchOrgData, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const renderOrgTree = (node) => (
    <li key={node.full_name}>
      <strong>{node.title}:</strong> {node.full_name}
      {node.reports && node.reports.length > 0 && (
        <ul>{node.reports.map(renderOrgTree)}</ul>
      )}
    </li>
  );

  return (
    <div>
      <h2>Organization Chart</h2>
      <ul>{orgData.map(renderOrgTree)}</ul>
    </div>
  );
};

export default OrgChart;

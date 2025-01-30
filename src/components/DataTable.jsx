import React, { useEffect, useState } from "react";

const DynamicTable = () => {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://ceo-backend-33u8.onrender.com/api/all"
        );
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging API response
        setTeamData(data.data); // Ensure data structure is correct
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const convertToCSV = (data) => {
    const header = [
      "Full Name",
      "Phone Number",
      "Email Address",
      "College Name",
      "College Year",
      "Pandemic Supply Chain Response",
      "Conflicting Advice Decision",
      "New Market Product Strategy",
      "Cybersecurity Breach Response",
      "EV Market Estimation",
    ];

    const rows = data.map((team) => [
      team.name, // Updated from fullName
      team.phone, // Updated from phoneNumber
      team.email,
      team.question1, // Updated from pandemicResponse
      team.question2, // Updated from conflictingAdviceDecision
      team.question3, // Updated from newMarketStrategy
      team.question4, // Updated from cybersecurityResponse
      team.question5,
    ]);

    const csvContent = [
      header.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    return csvContent;
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(teamData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "team_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}
      >
        Team Data
      </h2>
      <button
        onClick={downloadCSV}
        style={{
          marginBottom: "10px",
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Download CSV
      </button>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
          border: "1px solid #ddd",
        }}
      >
        <thead style={{ backgroundColor: "#f4f4f4" }}>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Full Name
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Phone Number
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Email Address
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              College Name
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              College Year
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Pandemic Supply Chain Response
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Conflicting Advice Decision
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              New Market Product Strategy
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Cybersecurity Breach Response
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              EV Market Estimation
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Competitor Differentiation
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Cash Runway Extension
            </th>
          </tr>
        </thead>
        <tbody>
          {teamData && teamData.length > 0 ? (
            teamData.map((team, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.name}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.phone}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.email}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.question1}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.question2}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.question3}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.question4}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.question5}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="12"
                style={{
                  padding: "10px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                No team data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;

import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const DashboardHome = () => {
  const [mates, setMates] = useState([]);

  useEffect(() => {
    axios.get("/mates").then((res) => setMates(res.data || []));
  }, []);

  const subjects = [...new Set(mates.map((m) => m.subject || "Other"))];
  const dataset = subjects.map((s) => mates.filter((m) => m.subject === s).length);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-fuchsia-900 mb-6">
        Dashboard Overview
      </h1>

      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-2xl shadow border border-fuchsia-100 text-center">
          <div className="text-fuchsia-800 text-2xl font-bold">{mates.length}</div>
          <div className="text-gray-600">Total Partners</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow border border-fuchsia-100 text-center">
          <div className="text-fuchsia-800 text-2xl font-bold">
            {subjects.length}
          </div>
          <div className="text-gray-600">Subjects</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow border border-fuchsia-100 text-center">
          <div className="text-fuchsia-800 text-2xl font-bold">
            {(mates.reduce((acc, m) => acc + (m.rating || 0), 0) / mates.length || 0).toFixed(1)}
          </div>
          <div className="text-gray-600">Avg Rating</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow border border-fuchsia-100 text-center">
          <div className="text-fuchsia-800 text-2xl font-bold">
            {mates.reduce((acc, m) => acc + (m.partnerCount || 0), 0)}
          </div>
          <div className="text-gray-600">Total Partner Count</div>
        </div>
      </div>

      
      <div className="grid lg:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-6 rounded-2xl shadow border border-fuchsia-100">
          <h2 className="text-xl font-semibold text-fuchsia-900 mb-2">
            Partners by Subject
          </h2>
          <Bar
            data={{
              labels: subjects,
              datasets: [
                {
                  label: "Partners",
                  data: dataset,
                  backgroundColor: "rgba(192, 38, 211, 0.5)",
                },
              ],
            }}
            options={{
              scales: { y: { beginAtZero: true } },
            }}
          />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border border-fuchsia-100">
          <h2 className="text-xl font-semibold text-fuchsia-900 mb-2">
            Experience Distribution
          </h2>
          <Pie
            data={{
              labels: ["Beginner", "Intermediate", "Expert"],
              datasets: [
                {
                  data: [
                    mates.filter((m) => m.experienceLevel === "Beginner").length,
                    mates.filter((m) => m.experienceLevel === "Intermediate").length,
                    mates.filter((m) => m.experienceLevel === "Expert").length,
                  ],
                  backgroundColor: [
                    "rgba(236, 72, 153, 0.6)",
                    "rgba(192, 38, 211, 0.6)",
                    "rgba(147, 51, 234, 0.6)",
                  ],
                },
              ],
            }}
          />
        </div>
      </div>

      
      <div className="mt-10 bg-white p-6 rounded-2xl shadow border border-fuchsia-100 overflow-x-auto">
        <h2 className="text-xl font-semibold text-fuchsia-900 mb-4">
          Partner Data Table
        </h2>
        <table className="table w-full">
          <thead>
            <tr className="bg-fuchsia-100 text-fuchsia-900">
              <th>Name</th>
              <th>Subject</th>
              <th>Mode</th>
              <th>Rating</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {mates.map((m) => (
              <tr key={m._id}>
                <td>{m.name}</td>
                <td>{m.subject}</td>
                <td>{m.studyMode}</td>
                <td>{m.rating}</td>
                <td>{m.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
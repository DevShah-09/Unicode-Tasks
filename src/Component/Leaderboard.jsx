import React, { useState, useEffect } from "react";

const SPREADSHEET_ID = "1pAc8AlCdPFduk1cblYitu9fz3eg8_05OfFsQg2GF48I";
const RANGE = "A2:B";
const API_KEY = "AIzaSyAz29IHMSH1ZUUzMNn3rtq4FApM28TsBN4";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const info = await response.json();
      console.log("Response from google sheets ", info);
      const rows = info.values || [];
      const structured = rows
        .map((val) => ({
          name: val[0],
          score: Number(val[1] || 0),
        }))
        .sort((a, b) => b.score - a.score);

      setTeams(structured);
    } catch (e) {
      console.error("Error occurred while fetching the leaderboard.");
    }
  };

  useEffect(() => {
    let check_mounted = true;
    const repeat = async () => {
      if (!check_mounted) return;
      await fetchData();
      setTimeout(repeat, 5000);
    };
    repeat();
    return () => {
      check_mounted = false;
    };
  }, []);

  const getMedalEmoji = (idx) => {
    if (idx === 0) return "🥇";
    if (idx === 1) return "🥈";
    if (idx === 2) return "🥉";
    return "";
  };

  const rank_color = (idx) => {
    if (idx === 0) return "bg-gradient-to-r from-yellow-700 to-yellow-500";
    if (idx === 1) return "bg-gradient-to-r from-gray-600 to-gray-400";
    if (idx === 2) return "bg-gradient-to-r from-orange-700 to-orange-500";
    return "bg-slate-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black py-8 px-4 text-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-cyan-400 mb-2 drop-shadow-lg">
            🏆 Live Leaderboard
          </h1>
        </div>

        <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-800 via-indigo-600 to-indigo-800 px-6 py-4">
            <div className="flex justify-between items-center text-2xl font-bold text-indigo-100">
              <span className="w-18">Rank</span>
              <span className="flex-1 text-left">Team Name</span>
              <span className="w-24 text-right">Score</span>
            </div>
          </div>

          <div className="divide-y divide-slate-700">
            {teams.map((team, idx) => (
              <div
                key={team.name}
                className={`${rank_color(
                  idx
                )} transition-all duration-300 hover:scale-[1.01] hover:shadow-xl`}
              >
                <div className="px-6 py-4 flex justify-between items-center">
                  <div className="w-18 flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-100">
                      {idx + 1}
                    </span>
                    <span className="text-2xl">{getMedalEmoji(idx)}</span>
                  </div>

                  <div className="flex-1 text-left">
                    <span className="text-xl font-semibold text-cyan-300">
                      {team.name}
                    </span>
                  </div>

                  <div className="w-24 text-right">
                    <span className="text-2xl font-bold text-gray-100">
                      {team.score}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {teams.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-400">
              <p className="text-lg">Loading leaderboard data...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

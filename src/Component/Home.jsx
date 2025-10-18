import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-gray-900 to-black text-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-extrabold text-cyan-400 drop-shadow-lg">
          Welcome!!!
        </h1>
        <p className="text-gray-400 text-2xl">
          Explore the latest scores.
        </p>

        <Link
          to="./leaderboard"
          className="inline-block px-6 py-3 mt-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 shadow-xl">
          View Leaderboard 🏆
        </Link>
      </div>
    </div>
  );
};

export default Home;

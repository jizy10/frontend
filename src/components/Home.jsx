import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [tenders, setTenders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTenders(currentPage);
  }, [currentPage]);

  const fetchTenders = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`https://backend-gules-nu.vercel.app/api/tenders/page/${page}`);
      const data = await response.json();
      if (data.success) {
        setTenders(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching  tenders:", error);
    }
    setLoading(false);
  };

  return (
    <div className="lg:w-[80%] m-auto text-black px-6 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">📜 All Tenders</h2>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <div>
          {tenders.map((tender) => (
            <div key={tender._id} className="border rounded-lg shadow-md p-5 bg-white mb-4">
              
              {/* Clickable Tender Title */}
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
  <Link to={`/tender/${tender._id}`} className="hover:underline">
    {tender.title || "No Title"}
  </Link>
</h3>

              {/* Tender Details */}
              <table className="w-full mt-4 border-collapse text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="font-semibold text-gray-700 py-2">📅 Bid Closing:</td>
                    <td>{tender["Bid closing date"]}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="font-semibold text-gray-700 py-2">📂 Bid Opening:</td>
                    <td>{tender["Bid opening date"]}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-gray-700 py-2">📄 Published on:</td>
                    <td>{tender["Published on"]}</td>
                  </tr>
                </tbody>
              </table>

              {/* <p className="text-right text-gray-500 text-sm mt-2">
                Posted {tender["Posted (Relative)"]}
              </p> */}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded-l-md hover:bg-gray-300 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ◀ Previous
        </button>
        <span className="px-4 py-2 bg-gray-100 font-semibold">{currentPage} / {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-200 rounded-r-md hover:bg-gray-300 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default Home;

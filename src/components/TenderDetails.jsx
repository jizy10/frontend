import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const TenderDetails = () => {
  const { id } = useParams();
  const [tender, setTender] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTenderDetails();
  }, []);

  const fetchTenderDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://backend-gules-nu.vercel.app/api/tenders/${id}`);
      const data = await response.json();
      if (data.success) {
        setTender(data.data);
      }
    } catch (error) {
      console.error("Error fetching tender details:", error);
    }
    setLoading(false);
  };

  // Function to render categories and subcategories recursively
  const renderCategoryTree = (categories, level = 0) => {
    return (
      <ul className="list-none ml-4">
        {categories.map((category) => (
          <li key={category.id} className="my-1">
            <div style={{ marginLeft: `${level * 20}px` }} className="flex items-center">
              {level > 0 && <span className="text-gray-400">└─ </span>}
              <a
                href={category.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {category.name}
              </a>
            </div>

            {/* Recursively render subcategories if they exist */}
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="ml-4">{renderCategoryTree(category.subcategories, level + 1)}</div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  if (!tender) return <p className="text-center text-lg text-red-500">Tender not found.</p>;

  return (
    <div className="lg:w-[60%] m-auto text-black px-6 py-6">
      <Link to="/" className="text-blue-500 hover:underline text-sm">⬅ Back to Tenders</Link>

      <h1 className="text-2xl font-bold mt-4 mb-6">{tender.title}</h1>

      {/* Original Source Link */}
      {/* {tender.source_url && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
          <h3 className="text-md font-semibold mb-2">Original Source:</h3>
          <a 
            href={tender.source_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {tender.source_url}
          </a>
        </div>
      )} */}

      {/* Display Tender Details */}
      <table className="w-full border-collapse text-sm">
        <tbody>
          {Object.entries(tender).map(([key, value]) => {
            if (typeof value === "string" && 
                key !== "complete_html" && 
                key !== "_id" && 
                key !== "source_url" &&
                key !== "title" &&
                key !== "Region URL") {  
              return (
                <tr key={key} className="border-b">
                  <td className="font-semibold text-gray-700 py-2 capitalize w-1/4">
                    {key.replace(/_/g, " ")}:
                  </td>
                  <td className="text-gray-800 py-2">
  {key === "Region" ? (
    value  // Display as plain text, without embedding a link
  ) : (
    value
  )}
</td>

                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>

      {/* Render Tender HTML Content */}
      <div className="mt-6">
        <div className="border rounded-md p-4 bg-white shadow-sm">
          <div dangerouslySetInnerHTML={{ __html: tender.complete_html }}></div>
        </div>
      </div>

      {/* Categories Section */}
      {tender.categories && tender.categories.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Fields Under:</h3>
          <div className="bg-gray-50 p-4 rounded-lg border">
            {renderCategoryTree(tender.categories)}
          </div>
        </div>
      )}
    </div>
  );
};

export default TenderDetails;

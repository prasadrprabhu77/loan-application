import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const getProgress = (status) => {
  switch (status) {
    case "Submitted":
      return { percent: 25, color: "bg-yellow-500" };
    case "Under Review":
      return { percent: 50, color: "bg-yellow-500" };
    case "Approved":
      return { percent: 100, color: "bg-green-500" };
    case "Denied":
      return { percent: 100, color: "bg-red-500" };
    default:
      return { percent: 0, color: "bg-gray-400" };
  }
};

const MyLoans = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const loansRef = collection(db, "users", user.uid, "loans");
        const snapshot = await getDocs(loansRef);
        const loanData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoans(loanData);
      } catch (err) {
        console.error("Error fetching loans:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchLoans();
  }, [user]);

  if (loading) {
    return <p className="text-center mt-10">Loading your loans...</p>;
  }

  if (loans.length === 0) {
    return <p className="text-center mt-10">You have not applied for any loans yet.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">My Loans</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {loans.map((loan) => {
          const { percent, color } = getProgress(loan.status || "Submitted");

          return (
            <div
              key={loan.id}
              className="border rounded-xl shadow-md p-6 bg-white"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Loan Amount: ₹{loan.loanAmount}
              </h3>
              <p className="text-gray-600 mb-1">
                Purpose: {loan.loanPurpose || "Not specified"}
              </p>
              <p
                className={`mb-3 font-medium ${
                  loan.status === "Approved"
                    ? "text-green-600"
                    : loan.status === "Denied"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                Status: {loan.status || "Submitted"}
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${color}`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>

              {/* View Details */}
              <Link
                to={`/loan/${loan.id}`}
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyLoans;

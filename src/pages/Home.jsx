import React, { useState, useEffect } from "react";
import LoanForm from "../components/LoanForm";
import { useAuth } from "../context/AuthProvider";
import { db } from "../config/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const Home = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [loans, setLoans] = useState([]);
  const [loadingLoans, setLoadingLoans] = useState(true);

  const handleApplyClick = () => {
    setShowForm(true);
  };

  // Fetch user loans
  useEffect(() => {
    if (!user) return;

    const fetchLoans = async () => {
      setLoadingLoans(true);
      try {
        const loansRef = collection(db, "users", user.uid, "loans");
        const q = query(loansRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setLoans(data);
      } catch (err) {
        console.error("Failed to fetch loans:", err);
      } finally {
        setLoadingLoans(false);
      }
    };

    fetchLoans();
  }, [user]);

  // Function to map status to progress bar color
  const getStatusColor = (status) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-500";
      case "Under Review":
        return "bg-yellow-500";
      case "Approved":
        return "bg-green-500";
      case "Denied":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Quick Loan</h1>
        <p className="text-lg md:text-xl mb-8">
          Get instant loans with minimal documentation. Fast, secure, and convenient.
        </p>
        <button
          onClick={handleApplyClick}
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Apply for Loan
        </button>
      </section>

      {/* Loan Form Section */}
      {showForm && (
        <section className="py-16 px-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Loan Application Form</h2>
          <LoanForm />
          <button className="bg-red-300 p-1 hover:font-semibold rounded-md border-2 border-red-500 text-red-600" onClick={() => setShowForm(false)}>Close Form</button>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Quick Loan?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
            <p>Get your loan approved within 24 hours.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Minimal Documentation</h3>
            <p>Submit only the essential documents to get your loan.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Flexible Repayment</h3>
            <p>Choose a repayment plan that suits your financial needs.</p>
          </div>
        </div>
      </section>

      {/* Loan Progress Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Your Loan Progress</h2>

        {loadingLoans ? (
          <p className="text-center">Loading your loan applications...</p>
        ) : loans.length === 0 ? (
          <p className="text-center">You have not applied for any loans yet.</p>
        ) : (
          <div className="space-y-6">
            {loans.map((loan, index) => (
              <div key={loan.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Loan Amount: ₹{loan.loanAmount}</span>
                  <span
                    className={`font-semibold text-white px-2 py-1 rounded ${getStatusColor(
                      loan.status || "Submitted"
                    )}`}
                  >
                    {loan.status || "Submitted"}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                  <div
                    className={`h-4 ${getStatusColor(loan.status || "Submitted")}`}
                    style={{
                      width:
                        loan.status === "Submitted"
                          ? "25%"
                          : loan.status === "Under Review"
                          ? "50%"
                          : loan.status === "Approved"
                          ? "100%"
                          : loan.status === "Denied"
                          ? "100%"
                          : "0%",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;

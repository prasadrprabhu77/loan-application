import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthProvider";

const LoanDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const loanRef = doc(db, "users", user.uid, "loans", id);
        const snapshot = await getDoc(loanRef);
        if (snapshot.exists()) {
          setLoan({ id: snapshot.id, ...snapshot.data() });
        } else {
          setLoan(null);
        }
      } catch (err) {
        console.error("Error fetching loan details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchLoan();
  }, [id, user]);

  // Function to calculate EMI
  const calculateEMI = (loanAmount, tenure, purpose) => {
    if (!loanAmount || !tenure) return 0;

    // Interest rate logic
    const annualRate =
      purpose === "Vehicle" ||
      purpose === "Education" ||
      purpose === "Business"
        ? 12
        : 9;

    const monthlyRate = annualRate / 12 / 100;
    const months = parseInt(tenure, 10);

    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    return emi.toFixed(2);
  };

  if (loading) {
    return <p className="text-center mt-10">Loading loan details...</p>;
  }

  if (!loan) {
    return <p className="text-center mt-10 text-red-600">Loan not found.</p>;
  }

  const emi = calculateEMI(
    Number(loan.loanAmount),
    loan.tenure,
    loan.loanPurpose
  );

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-8 mb-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Loan Details
      </h2>

      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold">Loan Amount:</span> ₹
          {loan.loanAmount}
        </p>
        <p>
          <span className="font-semibold">Purpose:</span>{" "}
          {loan.loanPurpose}
        </p>
        <p>
          <span className="font-semibold">Tenure:</span>{" "}
          {loan.tenure} months
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          {loan.status || "Submitted"}
        </p>
        <p>
          <span className="font-semibold">Applied On:</span>{" "}
          {loan.createdAt?.toDate
            ? loan.createdAt.toDate().toLocaleDateString()
            : "N/A"}
        </p>
      </div>

      {/* EMI Calculation */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          EMI Details
        </h3>
        <p>
          <span className="font-semibold">Interest Rate:</span>{" "}
          {loan.loanPurpose === "Vehicle" ||
          loan.loanPurpose === "Education" ||
          loan.loanPurpose === "Business"
            ? "12%"
            : "9%"}{" "}
          per annum
        </p>
        <p>
          <span className="font-semibold">Monthly EMI:</span> ₹{emi}
        </p>
        <p>
          <span className="font-semibold">Total Payable:</span> ₹
          {(emi * loan.tenure).toFixed(2)}
        </p>
      </div>

      <div className="mt-6">
        <Link
          to="/myloans"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to My Loans
        </Link>
      </div>
    </div>
  );
};

export default LoanDetails;

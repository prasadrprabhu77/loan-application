import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { db, storage } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
 

const LoanForm = () => {
  const { user, profile } = useAuth();

  const [formData, setFormData] = useState({
    fullName: profile?.name || "",
    dob: "",
    gender: "",
    mobile: "",
    permanentAddress: "",
    currentAddress: "",
    idType: "",
    idNumber: "",
    employmentType: "",
    companyName: "",
    jobTitle: "",
    experience: "",
    income: "",
    employerAddress: "",
    loanAmount: "",
    loanPurpose: "",
    tenure: "",
    repaymentMode: "",
    bankName: "",
    accountNumber: "",
    ifsc: "",
    accountType: "",
    declare: false,
    status:""
  });

   

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file change
   

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (!formData.declare) {
    setError("You must declare that information is correct.");
    return;
  }

  try {
    setLoading(true);

    // Save form data to Firestore under user's loans subcollection
    const loansRef = collection(db, "users", user.uid, "loans");
    await addDoc(loansRef, {
      ...formData,
      email: user.email,
      createdAt: serverTimestamp(),
    });

    setSuccess("Loan application submitted successfully!");

    // Reset form
    setFormData({
      fullName: profile?.name || "",
      dob: "",
      gender: "",
      mobile: "",
      permanentAddress: "",
      currentAddress: "",
      idType: "",
      idNumber: "",
      employmentType: "",
      companyName: "",
      jobTitle: "",
      experience: "",
      income: "",
      employerAddress: "",
      loanAmount: "",
      loanPurpose: "",
      tenure: "",
      repaymentMode: "",
      bankName: "",
      accountNumber: "",
      ifsc: "",
      accountType: "",
      declare: false,
      status:""
    });

  } catch (err) {
    console.error(err);
    setError("Failed to submit loan application.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6 mb-10">
      <h2 className="text-2xl font-bold mb-4">Loan Application Form</h2>

       
      {success && <p className="bg-green-100 text-green-600 p-2 rounded mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label>Permanent Address</label>
          <textarea
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label>Current Address (if different)</label>
          <textarea
            name="currentAddress"
            value={formData.currentAddress}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>ID Proof Type</label>
            <select
              name="idType"
              value={formData.idType}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select</option>
              <option value="Aadhaar">Aadhaar</option>
              <option value="PAN">PAN</option>
              <option value="Passport">Passport</option>
              <option value="Voter ID">Voter ID</option>
            </select>
          </div>
          <div>
            <label>ID Number</label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Employment Details */}
        <div>
          <label>Employment Type</label>
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select</option>
            <option value="Salaried">Salaried</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Student">Student</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Company / Business Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label>Job Title / Profession</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Work Experience (years)</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label>Monthly / Annual Income</label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div>
          <label>Employer Address & Contact (optional)</label>
          <textarea
            name="employerAddress"
            value={formData.employerAddress}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Loan Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Loan Amount Requested</label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label>Loan Purpose</label>
            <select
              name="loanPurpose"
              value={formData.loanPurpose}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select</option>
              <option value="Education">Education</option>
              <option value="Business">Business</option>
              <option value="Medical">Medical</option>
              <option value="Personal">Personal</option>
              <option value="Vehicle">Vehicle</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Preferred Loan Tenure (Months/Years)</label>
            <input
              type="text"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. 12 months / 1 year"
            />
          </div>
          <div>
            <label>Repayment Mode</label>
            <select
              name="repaymentMode"
              value={formData.repaymentMode}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select</option>
              <option value="Monthly EMI">Monthly EMI</option>
              <option value="Bullet">Bullet</option>
            </select>
          </div>
        </div>

        {/* Banking Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label>Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>IFSC Code</label>
            <input
              type="text"
              name="ifsc"
              value={formData.ifsc}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label>Account Type</label>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select</option>
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>
          </div>
        </div>

        {/* Declaration */}
        <div className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            name="declare"
            checked={formData.declare}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label>I hereby declare that the information provided is true and correct.</label>
        </div>

        {error && <p className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4"
        >
          {loading ? "Submitting..." : "Submit Loan Application"}
        </button>
      </form>
    </div>
  );
};

export default LoanForm;

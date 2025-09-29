# Loan App

A **React + Firebase Loan Management Application** that allows users to
apply for loans, track their loan progress, and view loan details with
EMI calculation.

------------------------------------------------------------------------

## 🚀 Features

-   **Homepage**
    -   Standard loan app homepage with an **Apply Loan** button.
    -   Displays a **progress bar** for each loan showing status:
        -   Submitted
        -   Under Review
        -   Approved
        -   Denied
-   **Loan Application Form**
    -   Collects necessary details:
        -   Full Name
        -   Email
        -   Phone Number
        -   Loan Amount
        -   Loan Type (Vehicle, Education, Business, Personal, Other)
        -   Loan Tenure (in months)
        -   Address
-   **My Loans Page**
    -   Fetches loan data from **Firestore**.
    -   Displays list of loans with progress bar and status.
    -   Each loan links to **Loan Details** page.
-   **Loan Details Page**
    -   Shows complete loan details.
    -   Calculates **EMI** dynamically based on loan type, amount,
        interest, and tenure:
        -   Vehicle, Education, Business → **12% interest**
        -   Other → **9% interest**
-   **Static Pages**
    -   About Page
    -   Contact Page

------------------------------------------------------------------------

## 🛠️ Tech Stack

-   **Frontend:** React.js
-   **Backend & Database:** Firebase Firestore
-   **Authentication:** Firebase Auth (optional extension)
-   **Styling:** CSS

------------------------------------------------------------------------

## 📂 Project Structure

    src/
    │── components/
    │   ├── LoanForm.jsx
    │   ├── Layout.jsx.jsx
    │   ├── Navbar.jsx
    │   ├── PrivateRoute.jsx
    │── pages/
    │   ├── Home.jsx
    │   ├── MyLoans.jsx
    │   ├── LoanDetails.jsx
    │   ├── About.jsx
    │   ├── Contact.jsx
    │   ├── Login.jsx
    │   ├── Signup.jsx
    │── config/
    │   ├── firebase.jsx
    │── App.js
    │── index.js

------------------------------------------------------------------------

## ⚡ Installation & Setup

1.  Clone the repo:

    ``` bash
    git clone https://github.com/your-username/loan-app.git
    cd loan-app
    ```

2.  Install dependencies:

    ``` bash
    npm install
    ```

3.  Setup **Firebase**:

    -   Create a Firebase project.
    -   Enable Firestore Database.
    -   Add Firebase config in `firebase.js`.

4.  Run the app:

    ``` bash
    npm run dev
    ```

------------------------------------------------------------------------

## 📊 Loan Status Progress Flow

1.  **Submitted** → Initial stage when user applies.
2.  **Under Review** → Loan is being verified.
3.  **Approved** → Loan request accepted.
4.  **Denied** → Loan request rejected.

------------------------------------------------------------------------

## 📖 Future Enhancements

-   Add **user authentication** with Firebase Auth.


------------------------------------------------------------------------

## 👨‍💻 Author

Developed by **Prasad**

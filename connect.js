// Import Firebase SDKs (v12)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7deMPfPe2tD5QzIt_TOvl61t5826NXso",
  authDomain: "vaibhav-portfolio-917a9.firebaseapp.com",
  projectId: "vaibhav-portfolio-917a9",
  storageBucket: "vaibhav-portfolio-917a9.firebasestorage.app",
  messagingSenderId: "906198813981",
  appId: "1:906198813981:web:d035936e843814666425f4",
  measurementId: "G-9149SXZZY5"
};

// Initialize Firebase Services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// DOM Content Loaded Event Handler
document.addEventListener("DOMContentLoaded", () => {
  
  // --- 1. Mobile Navigation Menu Toggle ---
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      document.body.classList.toggle("nav-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove("open");
          document.body.classList.remove("nav-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --- 2. Active Page Link Highlighting ---
  (() => {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const normalized = href.replace("./", "");
      if (normalized === currentPage || (currentPage === "" && normalized === "index.html")) {
        link.classList.add("active");
      }
    });
  })();

  // --- 3. Contact / Hire Form Handling with Firebase ---
  const hireForm = document.getElementById("hireForm") || document.getElementById("contact-form");

  if (hireForm) {
    hireForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const nameEl = document.getElementById("clientName") || document.getElementById("name");
      const emailEl = document.getElementById("clientEmail") || document.getElementById("email");
      const typeEl = document.getElementById("projectType") || document.getElementById("subject");
      const descEl = document.getElementById("projectDescription") || document.getElementById("message");

      const name = nameEl ? nameEl.value.trim() : "";
      const email = emailEl ? emailEl.value.trim() : "";
      const type = typeEl ? typeEl.value.trim() : "General";
      const description = descEl ? descEl.value.trim() : "";

      // Default Password Logic: First Name + @123 (e.g., Vaibhav@123)
      const firstName = name.split(" ")[0] || "User";
      const defaultPassword = `${firstName}@123`;

      const submitBtn = hireForm.querySelector("button[type='submit']");
      const originalBtnText = submitBtn ? submitBtn.innerText : "Send Proposal";

      if (submitBtn) {
        submitBtn.innerText = "Creating Account...";
        submitBtn.disabled = true;
      }

      try {
        // 1. Create Firebase Auth Account (Auto-Registration)
        try {
          await createUserWithEmailAndPassword(auth, email, defaultPassword);
        } catch (authError) {
          // If account already exists (auth/email-already-in-use), log and continue to store proposal
          console.log("User account already exists or could not be created:", authError.code);
        }

        // 2. Add Proposal to Firestore
        await addDoc(collection(db, "proposals"), {
          clientName: name,
          clientEmail: email,
          projectType: type,
          details: description,
          status: "pending",
          timestamp: serverTimestamp()
        });

        alert(`Proposal Sent Successfully!\n\nEmail: ${email}\nPassword: ${defaultPassword}`);

        // Reset form without changing the page
        hireForm.reset();

      } catch (e) {
        console.error("Error submitting form: ", e);
        alert("Error sending proposal: " + e.message);
      } finally {
        if (submitBtn) {
          submitBtn.innerText = originalBtnText;
          submitBtn.disabled = false;
        }
      }
    });
  }
});
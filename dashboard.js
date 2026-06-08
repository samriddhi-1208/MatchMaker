// Global variable to hold our data
let profiles = [
  { id: 1, fname: "Ishita", lname: "Sharma", age: 25, city: "Pune", profession: "Engineer", compatibility: 80 },
  { id: 2, fname: "Riya", lname: "Kapoor", age: 24, city: "Mumbai", profession: "Teacher", compatibility: 72 },
  { id: 3, fname: "Ananya", lname: "Jain", age: 27, city: "Delhi", profession: "Doctor", compatibility: 90 }
];

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("profileContainer");
    if (container) renderProfiles(profiles);
});

function renderProfiles(data) {
    const container = document.getElementById("profileContainer");
    container.innerHTML = "";
    data.forEach(profile => {
        container.innerHTML += `
            <div class="profile-card">
                <h2>${profile.fname} ${profile.lname || ''}</h2>
                <p>Profession: ${profile.profession}</p>
                <p>City: ${profile.city}</p>
                <p><strong>${profile.compatibility}% Compatibility</strong></p>
                <button onclick="openProfile(${profile.id})">View Profile</button>
            </div>
        `;
    });
}

function openProfile(id) {
    const selected = profiles.find(p => p.id === id);
    if (selected) {
        // Save the chosen profile to browser memory
        localStorage.setItem("selectedProfile", JSON.stringify(selected));
        window.location.href = "profile-view.html";
    }
}

function handleLogout() {
    localStorage.removeItem("customer");
    window.location.href = "index.html";
}
import { db } from './firebase-config.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

async function fetchProfiles() {
    const querySnapshot = await getDocs(collection(db, "profiles"));
    let profiles = [];
    querySnapshot.forEach((doc) => {
        profiles.push(doc.data());
    });
    renderProfiles(profiles); // Use your existing render function
}

// Call this when the page loads
fetchProfiles();
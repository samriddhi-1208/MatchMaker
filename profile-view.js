window.onload = function () {
  const user = JSON.parse(localStorage.getItem("selectedProfile"));

  // Check if profile exists in storage
  if (!user) {
    document.getElementById("profileContent").innerHTML = `
      <div style="text-align: center; padding: 50px; background: white; border-radius: 20px; box-shadow: var(--shadow-md);">
        <h2 style="color: var(--purple-dark); margin-bottom: 15px;">No Profile Selected</h2>
        <p style="color: var(--text-muted); margin-bottom: 25px;">Please return to the dashboard and select a candidate profile to view details.</p>
        <button class="btn-primary" onclick="history.back()">Go Back</button>
      </div>
    `;
    return;
  }

  // 1. Initial Avatar Rendering
  const firstInitial = user.fname ? user.fname[0].toUpperCase() : "";
  const lastInitial = user.lname ? user.lname[0].toUpperCase() : "";
  document.getElementById("viewAvatar").innerText = firstInitial + lastInitial || "👤";

  // 2. Full Name
  document.getElementById("viewName").innerText = `${user.fname || ""} ${user.lname || ""}`.trim() || "Anonymous Profile";

  // 3. Subtitle Description Row
  const ageStr = user.age ? `${user.age} yrs` : "Age N/A";
  const heightStr = user.height ? `${user.height} cm` : "Height N/A";
  const cityStr = user.city ? `${user.city}${user.country ? ', ' + user.country : ''}` : "Location N/A";
  document.getElementById("viewSubtitle").innerText = `${ageStr} • ${heightStr} • ${cityStr}`;

  // 4. Header Badge Tags (Compatibility, Status, and Denomination)
  let tagsHtml = "";
  if (user.compatibility) {
    tagsHtml += `<span class="tag match-score">✨ ${user.compatibility}% AI Match</span>`;
  }
  if (user.marital) {
    tagsHtml += `<span class="tag">${user.marital}</span>`;
  } else if (user.status) {
    tagsHtml += `<span class="tag">${user.status}</span>`;
  }
  if (user.religion) {
    tagsHtml += `<span class="tag">${user.religion}${user.caste ? " - " + user.caste : ""}</span>`;
  }
  document.getElementById("viewTags").innerHTML = tagsHtml || `<span class="tag">Active Candidate</span>`;

  // 5. Professional Section Mapping
  const finalProfession = user.designation && user.profession 
    ? `${user.designation} (${user.profession})` 
    : (user.profession || "Not Specified");
  document.getElementById("viewProfession").innerText = finalProfession;
  document.getElementById("viewCompany").innerText = user.company || "Not Disclosed";
  
  // Format numeric income neatly
  if (user.income) {
    document.getElementById("viewIncome").innerText = typeof user.income === 'number' || !isNaN(user.income) 
      ? `₹${user.income} LPA` 
      : user.income;
  } else {
    document.getElementById("viewIncome").innerText = "Not Disclosed";
  }
  document.getElementById("viewEducation").innerText = user.degree || user.college || "Higher Education";

  // 6. Lifestyle Section Mapping
  document.getElementById("viewReligion").innerText = user.religion 
    ? `${user.religion}${user.caste ? ' (' + user.caste + ')' : ''}` 
    : "Not Disclosed";
  document.getElementById("viewKids").innerText = user.kids || "Not Specified";
  document.getElementById("viewPets").innerText = user.pets || "Not Specified";
  document.getElementById("viewRelocate").innerText = user.relocate || "Not Specified";

  // 7. Family Background Section Mapping (NEW)
  document.getElementById("viewFamilyType").innerText = user.familyType || "Not Disclosed";
  document.getElementById("viewFather").innerText = user.father || "Not Disclosed";
  document.getElementById("viewMother").innerText = user.mother || "Not Disclosed";
  document.getElementById("viewSiblings").innerText = user.siblings || "None / Not Disclosed";

  // 8. Personal Attributes Section Mapping (NEW)
  document.getElementById("viewLanguages").innerText = user.languages || "Not Disclosed";
  document.getElementById("viewWeight").innerText = user.weight ? `${user.weight} kg` : "Not Disclosed";
  document.getElementById("viewComplexion").innerText = user.complexion || "Not Disclosed";
  document.getElementById("viewMaritalStatus").innerText = user.marital || "Never Married";

  // 9. About / Personal Bio Block
  document.getElementById("viewAboutName").innerText = user.fname || "Candidate";
  if (user.about) {
    document.getElementById("viewAbout").innerText = `"${user.about}"`;
  } else {
    document.getElementById("viewAbout").innerText = `"${user.fname || 'This user'} hasn't authored a personal statement yet, but matches core baseline structural compatibility standards."`;
  }

  // 10. AI Insight Messaging
  const candidateName = user.fname || "Candidate";
  const comp = user.compatibility || 75;
  let summaryText = `<strong>AI Insight:</strong> `;
  if (comp >= 85) {
    summaryText += `Excellent match! High correlation in professional trajectories, community roots, and long-term family lifestyle preferences.`;
  } else if (comp >= 75) {
    summaryText += `Strong pairing recommendation based on structural compatibility values, location flexibility, and stable criteria paths.`;
  } else {
    summaryText += `Moderate match. Consider initiating conversation to cross-verify open lifestyle outlooks and personal alignments.`;
  }
  document.getElementById("viewAiInsight").innerHTML = summaryText;

  // 11. Custom Submission Queue Action
  document.getElementById("viewActionBtn").onclick = function () {
    alert(`Success! A match profile proposal has been officially logged and queued for ${candidateName}.`);
  };
};
// --- CureWell Script.js (Fully Rewritten & Fixed) ---



document.addEventListener("DOMContentLoaded", () => {
  const finishButton = document.getElementById("finish-btn"); // The finish button
  const modal = document.getElementById("healthFlowModal"); // The modal element

  // Close the modal when the finish button is clicked
  finishButton.addEventListener("click", () => {
    modal.classList.remove("show"); // Remove 'show' class to trigger fade-out
    setTimeout(() => {
      modal.style.display = "none"; // Hide the modal completely after transition
    }, 300); // Wait for transition duration (0.3s) before hiding
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("healthFlowModal"); // The modal you want to display
  const closeButton = modal.querySelector(".close-button"); // The close button in the modal
  const simulateLoginBtn = document.getElementById("simulateLoginBtn"); // The button to trigger the modal

  // Show the modal when the button is clicked
  simulateLoginBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default behavior (navigation)
    modal.style.display = "flex"; // Display the modal
  });

  // Close the modal when the close button is clicked
  closeButton.addEventListener("click", () => {
    modal.style.display = "none"; // Hide the modal
  });
});



simulateLoginBtn.addEventListener("click", () => {
  modal.style.display = "flex"; // or "block" depending on your CSS
});



document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("healthFlowModal");
  const closeButton = modal.querySelector(".close-button");
  const form = document.getElementById("healthFlowForm");
  const steps = Array.from(modal.querySelectorAll(".flow-step"));
  const simulateLoginBtn = document.getElementById("simulateLoginBtn");
  const recommendationContentEl = document.getElementById("recommendation-content");
  const recommendationActionsEl = document.getElementById("recommendation-actions");

  let currentStepIndex = 0;
  let formData = {};
  let stepHistory = [];
  const stepMap = {};
  steps.forEach((step, index) => (stepMap[step.id] = index));

  function showStep(index) {
    if (index < 0 || index >= steps.length) return;
    steps.forEach((step, i) => (step.style.display = i === index ? "block" : "none"));
    currentStepIndex = index;
    modal.querySelector(".modal-content").scrollTop = 0;
  }

  function openModal() {
    formData = {};
    stepHistory = [stepMap["step-1"]];
    form.reset();
    showStep(stepMap["step-1"]);
    modal.classList.remove("hidden");
    modal.classList.add("visible");
  }

  function closeModal() {
    modal.classList.remove("visible");
    modal.classList.add("hidden");
  }

  function collectData(index) {
    const inputs = steps[index].querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      if (input.type === "radio" && input.checked) formData[input.name] = input.value;
      if (input.type === "checkbox") {
        if (!formData[input.name]) formData[input.name] = [];
        if (input.checked) formData[input.name].push(input.value);
      }
      if (input.tagName === "TEXTAREA" && input.value.trim() !== "") formData[input.name] = input.value.trim();
    });
  }

  function generateRecommendation() {
    const feeling = formData.feeling || "unknown";
    const symptoms = formData.symptoms || [];
    const helpNeeded = formData.help_needed || "none";

    const aiData = buildAIRecommendations(symptoms);
    let html = "";
    recommendationActionsEl.innerHTML = "";

    if (helpNeeded === "ai" || helpNeeded === "both") {
      html += `<h3>💊 Medicines:</h3><ul>${aiData.medicine.map(m => `<li>${m}</li>`).join("")}</ul>`;
      html += `<h3>🥗 Diet:</h3><ul>${aiData.diet.map(d => `<li>${d}</li>`).join("")}</ul>`;
      html += `<h3>🏃 Exercises:</h3><ul>${aiData.exercise.map(e => `<li>${e}</li>`).join("")}</ul>`;
      html += `<h3>⚠ Precautions:</h3><ul>${aiData.precautions.map(p => `<li>${p}</li>`).join("")}</ul>`;
    }

    if ((helpNeeded === "local" || helpNeeded === "both") && aiData.specialists.length > 0) {
      aiData.specialists.forEach((spec) => {
        const matched = doctorsDB.filter(doc => doc.specialty === spec);
        if (matched.length) {
          html += `<h3>👨‍⚕ Recommended ${spec}:</h3><ul>` +
            matched.map(doc => `<li><strong>${doc.name}</strong> – 📍 ${doc.location} – 📞 ${doc.contact}</li>`).join("") +
            `</ul>`;
        }
      });
    }

    if (!html) {
      html = `<p>No specific recommendation found. Please try again with different symptoms.</p>`;
    }

    recommendationContentEl.innerHTML = html;
  }

  function buildAIRecommendations(symptoms) {
    let medicine = new Set(), diet = new Set(), exercise = new Set(), precautions = new Set(), specialists = new Set();
    symptoms.forEach((symptom) => {
      const rec = healthRecommendations[symptom];
      if (rec) {
        rec.medicine.forEach((m) => medicine.add(m));
        rec.diet.forEach((d) => diet.add(d));
        rec.exercise.forEach((e) => exercise.add(e));
        rec.precautions.forEach((p) => precautions.add(p));
        specialists.add(rec.specialist);
      }
    });
    return {
      medicine: [...medicine],
      diet: [...diet],
      exercise: [...exercise],
      precautions: [...precautions],
      specialists: [...specialists]
    };
  }

  // simulateLoginBtn.addEventListener("click", openModal); (disabled manual trigger)
  openModal(); // Automatically open the modal on page load
  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  modal.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  form.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches(".next-btn")) {
      event.preventDefault();
      collectData(currentStepIndex);

      let nextStepId = null;
      switch (steps[currentStepIndex].id) {
        case "step-1": nextStepId = "step-2"; break;
        case "step-2": nextStepId = formData.feeling === "good" ? "step-3a" : "step-3c"; break;
        case "step-3a": nextStepId = formData.wellness_choice === "tips" ? "step-3b" : "step-final"; break;
        case "step-3b": nextStepId = "step-final"; break;
        case "step-3c": nextStepId = "step-4"; break;
        case "step-4": nextStepId = "step-5"; break;
        case "step-5": nextStepId = "step-6"; break;
        case "step-6": nextStepId = "step-7"; break;
        case "step-7": nextStepId = "step-8"; break;
        case "step-8": nextStepId = "step-9"; break;
        case "step-9": nextStepId = "step-10"; break;
        case "step-10": nextStepId = "step-11"; break;
        case "step-11": nextStepId = "step-12"; generateRecommendation(); break;
        case "step-12": nextStepId = "step-final"; break;
      }

      if (nextStepId && stepMap[nextStepId] !== undefined) {
        stepHistory.push(currentStepIndex);
        showStep(stepMap[nextStepId]);
      }
    }
    if (target.matches(".prev-btn")) {
      event.preventDefault();
      if (stepHistory.length > 0) {
        showStep(stepHistory.pop());
      }
    }
  });
});

const healthRecommendations = {
  fever: {
    medicine: ["Paracetamol 500mg", "Ibuprofen"],
    diet: ["Soups", "Fruits"],
    exercise: ["Rest"],
    precautions: ["Stay warm"],
    specialist: "General Physician"
  },
  headache: {
    medicine: ["Paracetamol"],
    diet: ["Hydration"],
    exercise: ["Yoga"],
    precautions: ["Sleep well"],
    specialist: "Neurologist"
  },
  anxiety: {
    medicine: ["Consult before meds"],
    diet: ["Chamomile tea", "Oats"],
    exercise: ["Meditation"],
    precautions: ["Avoid caffeine"],
    specialist: "Psychiatrist"
  },
  nausea: {
    medicine: ["ORS"],
    diet: ["BRAT diet"],
    exercise: ["Rest"],
    precautions: ["Avoid oily food"],
    specialist: "General Physician"
  },
  cough_cold: {
    medicine: ["Cough syrup"],
    diet: ["Honey water"],
    exercise: ["Rest"],
    precautions: ["Avoid chilled drinks"],
    specialist: "ENT Specialist"
  },
  sore_throat: {
    medicine: ["Throat lozenges"],
    diet: ["Warm liquids"],
    exercise: ["Rest"],
    precautions: ["Avoid sour foods"],
    specialist: "ENT Specialist"
  },
  runny_nose: {
    medicine: ["Antihistamines"],
    diet: ["Spicy soup"],
    exercise: ["Light walk"],
    precautions: ["Use tissues"],
    specialist: "ENT Specialist"
  },
  fatigue: {
    medicine: ["Multivitamins"],
    diet: ["Iron-rich foods"],
    exercise: ["Stretching"],
    precautions: ["Sleep on time"],
    specialist: "General Physician"
  },
  breathing_difficulty: {
    medicine: ["Inhaler"],
    diet: ["Soft foods"],
    exercise: ["Deep breathing"],
    precautions: ["Avoid allergens"],
    specialist: "Pulmonologist"
  }
};

const doctorsDB = [
  { name: "Dr. Aisha Sharma", specialty: "General Physician", location: "Delhi", contact: "9876543210" },
  { name: "Dr. Rahul Mehta", specialty: "Neurologist", location: "Mumbai", contact: "9123456780" },
  { name: "Dr. Sneha Patil", specialty: "Psychiatrist", location: "Bangalore", contact: "9988776655" },
  { name: "Dr. Akash Jain", specialty: "ENT Specialist", location: "Chennai", contact: "9090909090" },
  { name: "Dr. Ramesh Gupta", specialty: "Pulmonologist", location: "Hyderabad", contact: "9876512345" },
  { name: "Dr. Alok Kumar", specialty: "General Physician", location: "Patna", contact: "9871234567" },
  { name: "Dr. Neha Verma", specialty: "Psychiatrist", location: "Patna", contact: "9843217890" },
  { name: "Dr. Arjun Sinha", specialty: "Neurologist", location: "Kolkata", contact: "9832456781" },
  { name: "Dr. Priya Joshi", specialty: "ENT Specialist", location: "Ahmedabad", contact: "9823456712" },
  { name: "Dr. Vinod Rao", specialty: "Pulmonologist", location: "Pune", contact: "9812345678" },
  { name: "Dr. Meera Das", specialty: "General Physician", location: "Guwahati", contact: "9876540000" },
  { name: "Dr. Rajeev Ranjan", specialty: "ENT Specialist", location: "Patna", contact: "9811122233" },
  { name: "Dr. Sanjana Kapoor", specialty: "Neurologist", location: "Lucknow", contact: "9822211122" },
  { name: "Dr. Kavita Iyer", specialty: "Psychiatrist", location: "Nagpur", contact: "9845671234" }
];

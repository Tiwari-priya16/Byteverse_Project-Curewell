
    // FAQs And Review JS -->
    const faqItems = document.querySelectorAll('.faq-item');
  
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        // Close others if one is opened (optional)
        faqItems.forEach(faq => {
          if (faq !== item) faq.classList.remove('active');
        });
        // Toggle this one
        item.classList.toggle('active');
      });
    });
    const reviewForm = document.getElementById('reviewForm');
  const thankYouMsg = document.getElementById('thankYouMsg');

  reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // You can add more logic here to store or send the review
    reviewForm.reset();
    thankYouMsg.style.display = 'block';

    // Hide the message after 3 seconds
    setTimeout(() => {
      thankYouMsg.style.display = 'none';
    }, 3000);
  });

  const stars = document.querySelectorAll('.star-rating .star');
const ratingInput = document.getElementById('rating');

stars.forEach((star, index) => {
  star.addEventListener('mouseover', () => {
    highlightStars(index);
  });

  star.addEventListener('mouseout', () => {
    highlightStars(getSelectedRating() - 1);
  });

  star.addEventListener('click', () => {
    ratingInput.value = star.dataset.value;
    highlightStars(index);
  });
});

function highlightStars(index) {
  stars.forEach((star, i) => {
    if (i <= index) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
}

function getSelectedRating() {
  return parseInt(ratingInput.value) || 0;
}
//First Aid Guide -->
const guides = {
  burns: `
    <h3>Burns</h3>
    <ul>
      <li>Cool the burn under running water for 10–15 minutes.</li>
      <li>Cover with a clean, non-stick bandage.</li>
      <li>Do not apply ice or toothpaste.</li>
      <li>Seek medical help if severe.</li>
    </ul>
  `,
  cuts: `
    <h3>Cuts & Bleeding</h3>
    <ul>
      <li>Apply pressure with a clean cloth to stop bleeding.</li>
      <li>Clean the wound with clean water.</li>
      <li>Apply antiseptic and cover with a sterile bandage.</li>
      <li>Seek help if bleeding doesn’t stop.</li>
    </ul>
  `,
  choking: `
    <h3>Choking</h3>
    <ul>
      <li>Ask if the person can speak or cough.</li>
      <li>If not, give 5 back blows between the shoulder blades.</li>
      <li>Then give 5 abdominal thrusts (Heimlich maneuver).</li>
      <li>Call emergency services if needed.</li>
    </ul>
  `,
  fractures: `
    <h3>Fractures</h3>
    <ul>
      <li>Keep the injured area still and supported.</li>
      <li>Apply a splint if trained to do so.</li>
      <li>Use an ice pack to reduce swelling.</li>
      <li>Seek medical help immediately.</li>
    </ul>
  `,
  fainting: `
    <h3>Fainting</h3>
    <ul>
      <li>Lay the person on their back and elevate their legs.</li>
      <li>Loosen tight clothing.</li>
      <li>Ensure fresh air flow.</li>
      <li>Do not give food or drink until fully conscious.</li>
    </ul>
  `
};

function showGuide(type) {
  document.getElementById("guide").innerHTML = guides[type];
}
// BMI Calculator -->
function calculateBMI() {
  const height = parseFloat(document.getElementById("height").value) / 100;
  const weight = parseFloat(document.getElementById("weight").value);

  const resultBox = document.getElementById("result-box");
  const resultText = document.getElementById("result");

  if (!height || !weight) {
    resultBox.style.display = "block";
    resultText.innerText = "Please enter both height and weight.";
    return;
  }

  const bmi = (weight / (height * height)).toFixed(2);
  let category = "";

  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 24.9) category = "Normal weight";
  else if (bmi < 29.9) category = "Overweight";
  else category = "Obesity";

  resultBox.style.display = "block";
  resultText.innerText = `Your BMI is ${bmi} (${category}).`;
}
  //Symptom Checker -->
  const symptomDatabase = {
    fever: ["Flu", "COVID-19", "Malaria"],
    cough: ["Cold", "COVID-19", "Bronchitis"],
    headache: ["Migraine", "Tension Headache", "Dehydration"],
    fatigue: ["Anemia", "Thyroid issues", "Lack of sleep"],
    soreThroat: ["Strep Throat", "Flu", "Tonsillitis"]
  };

  const conditionInfo = {
    "Flu": "Rest, drink fluids, and consider OTC meds.",
    "COVID-19": "Isolate and consult a healthcare provider.",
    "Malaria": "Needs diagnosis and antimalarial treatment.",
    "Cold": "Rest and stay hydrated.",
    "Bronchitis": "Use a humidifier and drink fluids.",
    "Migraine": "Rest in a dark room and stay hydrated.",
    "Tension Headache": "Try relaxation techniques and hydration.",
    "Dehydration": "Increase fluid intake and rest.",
    "Anemia": "Eat iron-rich foods and consult a doctor.",
    "Thyroid issues": "Get blood tests and medical advice.",
    "Lack of sleep": "Try to improve sleep hygiene.",
    "Strep Throat": "See a doctor for antibiotics.",
    "Tonsillitis": "Gargle with saltwater and rest."
  };

  document.getElementById("symptomForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const selectedSymptoms = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(cb => cb.value);
    
    let conditions = [];
    selectedSymptoms.forEach(symptom => {
      if (symptomDatabase[symptom]) {
        conditions = conditions.concat(symptomDatabase[symptom]);
      }
    });

    const conditionCount = {};
    conditions.forEach(cond => {
      conditionCount[cond] = (conditionCount[cond] || 0) + 1;
    });

    const sortedConditions = Object.entries(conditionCount).sort((a, b) => b[1] - a[1]);
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<h3>Possible Conditions:</h3>";

    if (sortedConditions.length === 0) {
      resultDiv.innerHTML += "<p>No conditions matched your symptoms.</p>";
    } else {
      sortedConditions.forEach(([cond]) => {
        resultDiv.innerHTML += `<div><strong>${cond}</strong>: ${conditionInfo[cond] || "No info available."}</div>`;
      });
    }

    localStorage.setItem("symptomResults", JSON.stringify(sortedConditions));
  });

  document.getElementById("goalForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const weight = document.getElementById("goalWeight").value;
    const steps = document.getElementById("goalSteps").value;
    const water = document.getElementById("goalWater").value;

    const goals = { weight, steps, water };
    localStorage.setItem("dailyGoals", JSON.stringify(goals));

    document.getElementById("goalDisplay").innerHTML = `
      <p><strong>Target Weight:</strong> ${weight} kg</p>
      <p><strong>Steps Goal:</strong> ${steps}</p>
      <p><strong>Water Goal:</strong> ${water} ml</p>
    `;
  });

  document.getElementById("logForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const steps = document.getElementById("logSteps").value;
    const water = document.getElementById("logWater").value;
    const mealName = document.getElementById("mealName").value;
    const calories = document.getElementById("mealCalories").value;

    const log = { steps, water, mealName, calories };
    const logs = JSON.parse(localStorage.getItem("activityLog")) || [];
    logs.push(log);
    localStorage.setItem("activityLog", JSON.stringify(logs));

    let logHTML = "";
    logs.forEach((entry, i) => {
      logHTML += `<p><strong>Entry ${i + 1}:</strong> Walked ${entry.steps} steps, Drank ${entry.water}ml water, Ate ${entry.mealName} (${entry.calories} cal)</p>`;
    });
    document.getElementById("logDisplay").innerHTML = logHTML;
  });

  // Load saved goals on page load
  window.onload = function() {
    const savedGoals = JSON.parse(localStorage.getItem("dailyGoals"));
    if (savedGoals) {
      document.getElementById("goalDisplay").innerHTML = `
        <p><strong>Target Weight:</strong> ${savedGoals.weight} kg</p>
        <p><strong>Steps Goal:</strong> ${savedGoals.steps}</p>
        <p><strong>Water Goal:</strong> ${savedGoals.water} ml</p>
      `;
    }

    const savedLogs = JSON.parse(localStorage.getItem("activityLog")) || [];
    let logHTML = "";
    savedLogs.forEach((entry, i) => {
      logHTML += `<p><strong>Entry ${i + 1}:</strong> Walked ${entry.steps} steps, Drank ${entry.water}ml water, Ate ${entry.mealName} (${entry.calories} cal)</p>`;
    });
    document.getElementById("logDisplay").innerHTML = logHTML;
  };



  // diet planner

  document.getElementById("dietForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const age = +document.getElementById("age").value;
    const weight = +document.getElementById("weight").value;
    const height = +document.getElementById("height").value;
    const goal = document.getElementById("goal").value;
  
    let bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    let calories = bmr * 1.2;
  
    if (goal === "lose") calories -= 500;
    else if (goal === "gain") calories += 500;
  
    const result = document.getElementById("result");
    result.classList.remove("hidden");
  
    // 🍽 Meal ideas by goal
    const meals = {
      lose: {
        breakfast: ["Oats with berries", "Boiled eggs + toast", "Greek yogurt + nuts"],
        lunch: ["Grilled chicken + salad", "Brown rice + dal + sabzi", "Quinoa + veggies"],
        snack: ["Apple slices + peanut butter", "Cucumber sticks", "Protein shake"],
        dinner: ["Soup + salad", "Grilled paneer + veggies", "1 roti + sabzi"],
      },
      maintain: {
        breakfast: ["Paratha + curd", "Fruit smoothie + granola", "Bread + omelet"],
        lunch: ["Rice + dal + veg + salad", "Chicken curry + roti", "Paneer tikka + rice"],
        snack: ["Mixed dry fruits", "Banana + nut butter", "Milkshake"],
        dinner: ["Khichdi + curd", "Stuffed roti + sabzi", "Fish curry + rice"],
      },
      gain: {
        breakfast: ["Peanut butter toast + banana", "Oats + whole milk + nuts", "Paneer bhurji + roti"],
        lunch: ["Rice + rajma + ghee", "Chicken biryani", "Paratha + paneer + salad"],
        snack: ["Protein shake + banana", "Boiled eggs + nuts", "Milk + laddoo"],
        dinner: ["Rice + chicken curry", "Roti + paneer + curd", "Vegetable pulao + dal"],
      }
    };
  
    // 🍴 Randomizer
    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
    const goalMeals = meals[goal];
  
    result.innerHTML = `
      <h4>Your Daily Calories: <span style="color:green">${Math.round(calories)}</span> kcal</h4>
      <p><strong>Suggested Plan (randomized):</strong></p>
      <ul>
        <li>🥣 Breakfast: ${getRandom(goalMeals.breakfast)}</li>
        <li>🍱 Lunch: ${getRandom(goalMeals.lunch)}</li>
        <li>🥪 Snack: ${getRandom(goalMeals.snack)}</li>
        <li>🍛 Dinner: ${getRandom(goalMeals.dinner)}</li>
      </ul>
      <small>🔁 Refresh the form to get new suggestions</small>
    `;
  });
  //floating emergency button 
    function toggleSupportOverlay() {
  const overlay = document.getElementById("emergencyOverlay");
  overlay.style.display = (overlay.style.display === "block") ? "none" : "block";
}
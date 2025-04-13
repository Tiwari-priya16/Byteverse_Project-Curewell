//----------sympton checker-------------------------
document.addEventListener('DOMContentLoaded', function () {

    const symptomForm = document.getElementById('symptomForm');
    const resultArea = document.getElementById('resultArea');

    symptomForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const checkedSymptoms = symptomForm.querySelectorAll('input[name="symptoms"]:checked');

        const selectedSymptoms = [];
        checkedSymptoms.forEach(checkbox => {
            selectedSymptoms.push(checkbox.value);
        });

        // --- Determine the advice based on selected symptoms ---
        let advice = "";
        const has = (symptom) => selectedSymptoms.includes(symptom); // Helper function

        if (selectedSymptoms.length === 0) {
            advice = "Please select at least one symptom.";
        } else if (has('fever') && has('cough') && has('fatigue')) {
            advice = "Fever, cough, and fatigue are common signs of the flu or other respiratory infections. It's important to rest, stay well-hydrated, and monitor your symptoms. Consider over-the-counter medications for relief.";
        } else if (has('fever') && has('cough')) {
            advice = "Fever and cough often indicate a cold or respiratory infection. Focus on rest and fluids. Over-the-counter cough suppressants or expectorants might help.";
        } else if (has('soreThroat') && has('cough')) {
            advice = "A sore throat accompanied by a cough could be due to a viral infection like a cold. Try warm liquids (tea with honey), throat lozenges, and rest.";
        } else if (has('headache') && has('fatigue')) {
            advice = "Headache and fatigue can be linked to various things like stress, dehydration, or lack of sleep. Ensure you are resting adequately and drinking enough water. Over-the-counter pain relievers may help with the headache.";
        } else if (has('fever')) {
            advice = "A fever suggests your body is fighting an infection. Rest is crucial. Drink plenty of fluids to prevent dehydration. Monitor your temperature.";
        } else if (has('cough')) {
            advice = "For a cough, stay hydrated. Honey (for adults/older children) or over-the-counter cough drops/syrups might provide relief depending on the type of cough (dry or productive).";
        } else if (has('headache')) {
            advice = "For a headache, try resting in a quiet, dark room. Ensure you are hydrated. Over-the-counter pain relievers like ibuprofen or acetaminophen can often help.";
        } else if (has('soreThroat')) {
            advice = "Soothe a sore throat with warm salt water gargles, throat lozenges, or warm beverages like tea with honey. Rest your voice.";
        } else if (has('fatigue')) {
            advice = "Fatigue can have many causes. Prioritize sleep, manage stress, and ensure a balanced diet. If fatigue persists, it's worth discussing with a doctor.";
        }
        else {
            advice = "Based on your selection, focus on general self-care: get adequate rest, stay hydrated, and eat well. Monitor your symptoms.";
        }

        if (selectedSymptoms.length > 0) {
            advice += "<br><br><strong>Disclaimer:</strong> This tool provides general information and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.";
        }


        resultArea.innerHTML = advice;
    });

});






// -----------------------------Health tracker Features-----------------------------------------------------------------------------------------------------------------------------


// ----------------daily goals-----------------------------




document.addEventListener('DOMContentLoaded', () => {

    // Get references to the form elements and feedback area
    const goalForm = document.getElementById('goalForm');
    const targetWeightInput = document.getElementById('targetWeight');
    const stepsGoalInput = document.getElementById('stepsGoal');
    const waterGoalInput = document.getElementById('waterGoal');
    const goalFeedback = document.getElementById('goalFeedback');

    // --- Function to Load Saved Goals (optional but nice) ---
    function loadSavedGoals() {
        const savedWeight = localStorage.getItem('dailyTargetWeight');
        const savedSteps = localStorage.getItem('dailyStepsGoal');
        const savedWater = localStorage.getItem('dailyWaterGoal');

        if (savedWeight !== null) {
            targetWeightInput.value = savedWeight;
        }
        if (savedSteps !== null) {
            stepsGoalInput.value = savedSteps;
        }
        if (savedWater !== null) {
            waterGoalInput.value = savedWater;
        }

        // Give initial feedback if goals were loaded
        if (savedWeight || savedSteps || savedWater) {
            goalFeedback.textContent = 'Previously saved goals loaded.';
            goalFeedback.className = ''; 
            setTimeout(() => {
                if (goalFeedback.textContent === 'Previously saved goals loaded.') {
                    goalFeedback.textContent = 'Set or update your goals!';
                }
            }, 3000);
        } else {
            goalFeedback.textContent = 'Set your goals for today!';
            goalFeedback.className = '';
        }
    }

    // --- Event Listener for Form Submission ---
    goalForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const weightGoal = targetWeightInput.value.trim(); 
        const stepsGoal = stepsGoalInput.value.trim();
        const waterGoal = waterGoalInput.value.trim();

        const isValidNumberOrEmpty = (val) => val === '' || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0);

        if (!isValidNumberOrEmpty(weightGoal) || !isValidNumberOrEmpty(stepsGoal) || !isValidNumberOrEmpty(waterGoal)) {
            goalFeedback.textContent = 'Please enter valid positive numbers or leave fields empty.';
            goalFeedback.className = 'error'; 
            setTimeout(() => {
                if (goalFeedback.classList.contains('error')) {
                    goalFeedback.textContent = 'Set or update your goals!';
                    goalFeedback.className = '';
                }
            }, 4000);
            return; 
        }

        localStorage.setItem('dailyTargetWeight', weightGoal);
        localStorage.setItem('dailyStepsGoal', stepsGoal);
        localStorage.setItem('dailyWaterGoal', waterGoal);

        goalFeedback.textContent = 'Goals saved successfully!';
        goalFeedback.className = ''; 

        setTimeout(() => {
            if (goalFeedback.textContent === 'Goals saved successfully!') {
                goalFeedback.textContent = 'Goals are saved. You can update them anytime.';
            }
        }, 3000);

        console.log('Goals Saved:', {
            weight: weightGoal,
            steps: stepsGoal,
            water: waterGoal
        });
    });

    loadSavedGoals();

});






// ------------------------------------------------------------------------------------------------------------------------------



//--------fitness diet planner--------------------

document.addEventListener('DOMContentLoaded', () => {

    const logForm = document.getElementById('logForm');
    const stepsInput = document.getElementById('stepsWalked');
    const waterInput = document.getElementById('waterDrank');
    const mealInput = document.getElementById('mealName');
    const caloriesInput = document.getElementById('calories');
    const logFeedback = document.getElementById('logFeedback');
    const logEntriesDiv = document.getElementById('logEntries');

    const STORAGE_KEY = 'fitnessDietLogs'; 

    function getLogs() {
        const logsJson = localStorage.getItem(STORAGE_KEY);
        try {
            return logsJson ? JSON.parse(logsJson) : [];
        } catch (e) {
            console.error("Error parsing logs from localStorage:", e);
            return []; // Return empty array on error
        }
    }

    function saveLogs(logs) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    }

    function displayLogs() {
        const logs = getLogs();
        logEntriesDiv.innerHTML = '<h3>Today\'s Logs</h3>';

        if (logs.length === 0) {
            logEntriesDiv.innerHTML += '<p>No logs added yet for today.</p>';
            return;
        }

        
        logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        logs.forEach(log => {
            const logElement = document.createElement('div');
            logElement.classList.add('log-item');

            let content = '';
            if (log.steps) content += `👣 Steps: ${log.steps} `;
            if (log.water) content += `💧 Water: ${log.water}ml `;
            if (log.meal) content += `🍽️ Meal: ${log.meal} `;
            if (log.calories) content += `🔥 Calories: ${log.calories} `;

            // Add timestamp
            const logTime = new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            content += `<small>Logged at: ${logTime}</small>`;

            logElement.innerHTML = content.trim(); 
            logEntriesDiv.appendChild(logElement); 
        });
    }

    logForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const steps = stepsInput.value.trim() ? parseFloat(stepsInput.value) : null;
        const water = waterInput.value.trim() ? parseFloat(waterInput.value) : null;
        const meal = mealInput.value.trim() || null; 
        const calories = caloriesInput.value.trim() ? parseFloat(caloriesInput.value) : null;

        if (steps === null && water === null && meal === null && calories === null) {
            logFeedback.textContent = 'Please enter at least one value (steps, water, meal, or calories).';
            setTimeout(() => { logFeedback.textContent = 'Enter your activity or meal details.'; }, 3000);
            return; 
        }



        const newLog = {
            steps: (steps !== null && steps >= 0) ? steps : null, 
            water: (water !== null && water >= 0) ? water : null, 
            meal: meal,
            calories: (calories !== null && calories >= 0) ? calories : null, 
            timestamp: new Date().toISOString() 
        };

        const currentLogs = getLogs();
        currentLogs.push(newLog);
        saveLogs(currentLogs);

        displayLogs();

        logFeedback.textContent = 'Log added successfully!';

        stepsInput.value = '';
        waterInput.value = '';
        mealInput.value = '';
        caloriesInput.value = '';

        setTimeout(() => { logFeedback.textContent = 'Enter your activity or meal details.'; }, 2500);

    });

    
    displayLogs();
    // Set initial feedback based on whether logs exist
    if (getLogs().length > 0) {
        logFeedback.textContent = 'Previous logs loaded. Add more below.';
    } else {
        logFeedback.textContent = 'Enter your activity or meal details.';
    }


});





// ------------------------Health Monitering & sos service---------------------------------------------------------------------------------



// ------first aid----------



const guideDisplay = document.getElementById('guide');

const firstAidInfo = {
    burns: `
        <h3>Minor Burns (First Degree)</h3>
        <ul>
            <li>Cool the burn immediately with cool (not cold) running water for 10-20 minutes or until pain subsides.</li>
            <li>Remove rings or tight items gently before the area swells.</li>
            <li>Cover loosely with a sterile gauze bandage. Do not use cotton wool.</li>
            <li>Take over-the-counter pain relievers if needed.</li>
        </ul>
        <p><strong>Seek medical attention for severe burns (second/third degree), large burns, burns on face, hands, feet, genitals, or major joints, or electrical/chemical burns.</strong></p>
        <hr>
        <p><strong>Disclaimer:</strong> This is basic guidance. Always prioritize professional medical help in emergencies.</p>
    `,
    cuts: `
        <h3>Minor Cuts & Scrapes</h3>
        <ul>
            <li>Wash your hands thoroughly.</li>
            <li>Stop the bleeding by applying gentle, direct pressure with a clean cloth or bandage.</li>
            <li>Clean the wound with cool water. Gently pat dry.</li>
            <li>Apply an antibiotic ointment (optional).</li>
            <li>Cover the wound with a sterile bandage or dressing. Change daily or if wet/dirty.</li>
        </ul>
        <p><strong>Seek medical attention if bleeding is severe or doesn't stop after 10-15 minutes of pressure, the wound is deep/gaping, caused by a dirty/rusty object, or shows signs of infection (redness, swelling, pus, increased pain).</strong></p>
        <hr>
        <p><strong>Disclaimer:</strong> This is basic guidance. Always prioritize professional medical help in emergencies.</p>
    `,
    choking: `
        <h3>Choking (Adult/Child - Conscious)</h3>
        <p>If the person can cough forcefully, encourage them to keep coughing.</p>
        <p>If they cannot cough, speak, or breathe, perform the Heimlich maneuver:</p>
        <ul>
            <li>Stand behind the person. Wrap your arms around their waist.</li>
            <li>Make a fist with one hand. Place the thumb side just above their navel, below the rib cage.</li>
            <li>Grasp your fist with your other hand.</li>
            <li>Perform quick, upward abdominal thrusts.</li>
            <li>Continue until the object is expelled or the person becomes unconscious.</li>
        </ul>
        <p><strong>If the person becomes unconscious, call emergency services immediately and start CPR if trained. For infants, use back blows and chest thrusts.</strong></p>
        <hr>
        <p><strong>Disclaimer:</strong> This requires proper training. Seek training and always call emergency services immediately in a choking situation.</p>
    `,
    fractures: `
        <h3>Suspected Fractures (Broken Bones)</h3>
        <ul>
            <li>Call emergency services immediately, especially for major fractures (e.g., leg, hip, head, spine).</li>
            <li>Do NOT try to straighten the limb or push back any bone sticking out.</li>
            <li>Keep the person still and calm. Immobilize the injured area if possible using splints (e.g., rolled magazines, boards) padded with cloth, extending beyond the joints above and below the break. Do NOT tie too tightly.</li>
            <li>Apply ice packs wrapped in cloth to reduce swelling and pain (do not apply ice directly to skin).</li>
            <li>Treat for shock if necessary (lie down, elevate legs slightly if no head/neck/back injury, keep warm).</li>
        </ul>
        <p><strong>Do not give the person anything to eat or drink.</strong></p>
        <hr>
        <p><strong>Disclaimer:</strong> Improper handling can worsen injury. Prioritize calling emergency services and keeping the person still.</p>
    `,
    fainting: `
        <h3>Fainting (Syncope)</h3>
        <ul>
            <li>If you feel faint: Lie down or sit down immediately. Place your head between your knees if sitting.</li>
            <li>If someone else faints: Position them on their back. Check for breathing.</li>
            <li>If breathing and no spinal injury suspected, elevate their legs about 12 inches (30 cm) above heart level.</li>
            <li>Loosen tight clothing (collars, belts).</li>
            <li>Ensure they have fresh air.</li>
            <li>They should regain consciousness quickly (within a minute). If not, call emergency services.</li>
            <li>Once awake, have them rest for a while before slowly getting up.</li>
        </ul>
        <p><strong>Call emergency services if the person doesn't regain consciousness quickly, has fallen and may be injured, is pregnant, diabetic, over 50, has chest pain, irregular heartbeat, or shortness of breath.</strong></p>
        <hr>
        <p><strong>Disclaimer:</strong> This is basic guidance. Seek medical evaluation to determine the cause of fainting.</p>
    `
};

// The function called by the buttons
function showGuide(topic) {
    if (firstAidInfo[topic]) {
        guideDisplay.innerHTML = firstAidInfo[topic];
    } else {
        guideDisplay.innerHTML = '<p>Information for this topic is not available yet.</p>';
    }
}






// -------------------------------------------------------------------------------------------------------------------------------------



// -------bmi-------------




window.calculateBMI = function() {
    const heightInput = document.getElementById('bmiHeight'); 
    const weightInput = document.getElementById('bmiWeight'); 
    const resultDisplay = document.getElementById('bmiResult'); 
    const resultBox = document.getElementById('result-box');

    // Check if elements exist before proceeding
    if (!heightInput || !weightInput || !resultDisplay || !resultBox) {
         console.error("BMI Calculator elements not found!");
         return;
    }

    const heightCm = parseFloat(heightInput.value);
    const weightKg = parseFloat(weightInput.value);

    resultDisplay.textContent = '';
    resultBox.className = 'bmi-result'; // Reset classes

    if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
        resultDisplay.textContent = 'Please enter valid positive height (cm) and weight (kg).';
        resultBox.classList.add('error');
        return;
    }

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    let category = '';
    let categoryClass = '';

    if (bmi < 18.5) { category = 'Underweight'; categoryClass = 'underweight'; }
    else if (bmi <= 24.9) { category = 'Normal weight'; categoryClass = 'normal'; }
    else if (bmi <= 29.9) { category = 'Overweight'; categoryClass = 'overweight'; }
    else { category = 'Obese'; categoryClass = 'obese'; }

    resultDisplay.textContent = `Your BMI is: ${bmi.toFixed(1)} (${category})`;
    resultBox.classList.add(categoryClass);
}




//--------------------------------------------------------------------------------------------------------------

// -------------- Diet Planner ----------



const dietForm1 = document.getElementById('dietForm1');
const dietAgeInput = document.getElementById('dietAge');       
const dietWeightInput = document.getElementById('dietWeight'); 
const dietHeightInput = document.getElementById('dietHeight'); 
const goal1Select = document.getElementById('goal1');
const dietResultDiv = document.getElementById('diet-result');

if (dietForm1 && dietAgeInput && dietWeightInput && dietHeightInput && goal1Select && dietResultDiv) {
    dietForm1.addEventListener('submit', function(event) {
        event.preventDefault();

        const age = parseInt(dietAgeInput.value); 
        const weight = parseFloat(dietWeightInput.value); 
        const height = parseFloat(dietHeightInput.value); 
        const goal = goal1Select.value;

        dietResultDiv.innerHTML = '';
        dietResultDiv.classList.remove('error', 'hidden');

        if (isNaN(age) || isNaN(weight) || isNaN(height) || age <= 0 || weight <= 0 || height <= 0 || goal === "") {
            dietResultDiv.innerHTML = 'Please fill in all fields with valid positive numbers and select a goal.';
            dietResultDiv.classList.add('error');
            return;
        }

        const bmr = (10 * weight) + (6.25 * height) - (5 * age) - 78;
        const activityFactor = 1.375;
        const tdee = bmr * activityFactor;
        let targetCalories;
        let advice = '';

        switch (goal) {
            case 'lose':
                targetCalories = tdee - 500;
                advice = `<h3>Weight Loss Plan</h3><p>Aim for ~<strong>${Math.round(targetCalories)} calories/day</strong>.</p><ul><li>Focus on nutrient-dense foods.</li><li>Control portions.</li><li>Increase activity.</li></ul>`;
                break;
            case 'gain':
                targetCalories = tdee + 500;
                advice = `<h3>Weight Gain Plan</h3><p>Aim for ~<strong>${Math.round(targetCalories)} calories/day</strong>.</p><ul><li>Focus on healthy calorie-dense foods.</li><li>Eat frequently.</li><li>Include strength training.</li></ul>`;
                break;
            case 'maintain':
            default:
                targetCalories = tdee;
                advice = `<h3>Weight Maintenance Plan</h3><p>Aim for ~<strong>${Math.round(targetCalories)} calories/day</strong>.</p><ul><li>Eat a balanced diet.</li><li>Maintain activity.</li><li>Listen to hunger cues.</li></ul>`;
                break;
        }

        if (targetCalories < 1200) {
            advice += `<p><strong style="color: red;">Warning:</strong> Calculated target (${Math.round(targetCalories)}) is very low. Consult a professional.</p>`;
        }

        dietResultDiv.innerHTML = advice;
        dietResultDiv.classList.remove('hidden');
    });
} else {
     console.error("Diet Planner elements not found!");
}



// ----------------------------------------------------------------------------------------------------------------------------------------


//----------faq-----------------------------

document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const answer = button.nextElementSibling;

            button.classList.toggle('active');

          

            if (button.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null; // Reset to CSS default (0)
            }
        });
    });
});




// ----------------------------------------------------------------------------------------------------------------------



// -----------review starts


document.addEventListener('DOMContentLoaded', () => {
    const starRatingContainer = document.getElementById('starRating'); 
    const stars = starRatingContainer.querySelectorAll('.star');     
    const ratingInput = document.getElementById('ratingValue');
    let currentRating = 0; 

    const updateStarDisplay = (ratingValue, stateClass) => {
        stars.forEach(star => {
            if (parseInt(star.dataset.value) <= ratingValue) {
                star.classList.add(stateClass);
            } else {
                star.classList.remove(stateClass);
            }
        });
    };


    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            updateStarDisplay(0, 'selected');
            updateStarDisplay(parseInt(star.dataset.value), 'hover');
        });

        star.addEventListener('click', () => {
            currentRating = parseInt(star.dataset.value); 
            ratingInput.value = currentRating;            
            updateStarDisplay(currentRating, 'selected'); 
        });
    });

    starRatingContainer.addEventListener('mouseleave', () => {
        updateStarDisplay(0, 'hover');
        updateStarDisplay(currentRating, 'selected');
    });


    const reviewForm = document.getElementById('reviewForm');
    const thankYouMsg = document.getElementById('thankYouMsg');

    if (reviewForm) {
        reviewForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            if (currentRating === 0) {
                alert('Please select a star rating.');
                return; 
            }



            const name = document.getElementById('reviewName').value;
            const review = document.getElementById('reviewText').value;
            console.log('Submitting Review:', { name, rating: currentRating, review });
           
            reviewForm.style.display = 'none';
            thankYouMsg.style.display = 'block';

        });
    }

    updateStarDisplay(currentRating, 'selected');

});


// -----------------------------------------------------------------------------------------



// --- Mobile Menu Toggle ---
// function toggleMenu() {
//     const mobileNav = document.getElementById('mobileNav');
//     if (mobileNav) {
//         mobileNav.classList.toggle('active');
//     }
// }

// document.querySelectorAll('.mobile-nav a').forEach(link => {
//     link.addEventListener('click', () => {
//         const mobileNav = document.getElementById('mobileNav');
//         if (mobileNav && mobileNav.classList.contains('active')) {
//             mobileNav.classList.remove('active');
//         }
//     });
// });

// document.addEventListener('click', function(event) {
//     const mobileNav = document.getElementById('mobileNav');
//     const menuButton = document.querySelector('.mobile-menu-btn');
//     if (mobileNav && menuButton && !mobileNav.contains(event.target) && !menuButton.contains(event.target) && mobileNav.classList.contains('active')) {
//         mobileNav.classList.remove('active');
//     }
// });


function toggleMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
      mobileNav.classList.toggle('active');
    }
  }
  
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      const mobileNav = document.getElementById('mobileNav');
      if (mobileNav && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
      }
    });
  });
  
  document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const menuButton = document.querySelector('.mobile-menu-btn');
    if (
      mobileNav &&
      menuButton &&
      !mobileNav.contains(event.target) &&
      !menuButton.contains(event.target) &&
      mobileNav.classList.contains('active')
    ) {
      mobileNav.classList.remove('active');
    }
  });
  




// ----------------------------------------------------------------------------------------------



//------sos btn-----------------------------------

function toggleSupportOverlay() {
    const overlay = document.getElementById("emergencyOverlay");
    overlay.style.display = (overlay.style.display === "block") ? "none" : "block";
  }
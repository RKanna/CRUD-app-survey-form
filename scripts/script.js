"use strict";
function submitRun() {
    const name = document.getElementById("only-name").value;
    const email = document.getElementById("only-email").value;
const selectedCountryRadio = document.querySelector('input[name="economy"]:checked');
const selectedCountry = selectedCountryRadio ? selectedCountryRadio.nextElementSibling.textContent : "";
const selectedPoliticalParty = document.getElementById("political-party").value;
    const selectedGovernmentRanks = [];
    const checkboxes = document.querySelectorAll('.check-btn:checked');
    checkboxes.forEach(checkbox => {
      selectedGovernmentRanks.push(checkbox.nextElementSibling.textContent);
    });
  
    const insertElement = document.querySelector(".insert-element");
    const newEntry = document.createElement("div");
    newEntry.className = "internal-line-div";
  
    newEntry.innerHTML = `
      <div class="split-one split">
        <h3>${name}</h3>
      </div>
      <div class="split-two split">
        <h3>${email}</h3>
      </div>
      <div class="split-three split">
        <h3>${selectedCountry}</h3>
      </div>
      <div class="split-four split">
        <h3>${selectedPoliticalParty}</h3>
      </div>
      <div class="split-five split">
        <h3>${selectedGovernmentRanks.join(", ")}</h3>
      </div>
      <div class="split-six split">
        <a href="#" class="edit-link">
          <img src="/icons/edit-solid.svg" alt="Edit" class="edit-img">
        </a>
      </div>
    `;
  
    insertElement.appendChild(newEntry);
    document.getElementById("only-name").value = "";
    document.getElementById("only-email").value = "";
    document.querySelector('input[name="economy"]:checked').checked = false;
    document.getElementById("political-party").value = "";
    checkboxes.forEach(checkbox => checkbox.checked = false);
  }

"use strict";




const checkboxes = document.querySelectorAll('.check-btn');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            checkboxes.forEach(cb => {
                if (cb !== checkbox) {
                    cb.checked = false;
                }
            });
        });
    });

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


    if (name === "" || email === "" || !selectedCountry || selectedPoliticalParty === "" || selectedGovernmentRanks.length === 0) {
        alert("Please fill in all fields before submitting.");
        return; // Stop execution if any field is empty
      }
  
    


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
  
    // Append the new entry to the beginning of insertElement
    insertElement.prepend(newEntry);
  
    // Clear form fields after submission
    document.getElementById("only-name").value = "";
    document.getElementById("only-email").value = "";
    document.querySelector('input[name="economy"]:checked').checked = false;
    document.getElementById("political-party").value = "";
    checkboxes.forEach(checkbox => checkbox.checked = false);
    
  }

  // Add an event listener to the dynamically generated "Edit" buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit-img')) {
      const entry = event.target.closest('.internal-line-div');
      populateFormFields(entry);
      
    }
  });
  
  function updateEntry(entry) {
    // Get the updated data from form fields
    const name = document.getElementById('only-name').value;
    const email = document.getElementById('only-email').value;
    const selectedCountryRadio = document.querySelector('input[name="economy"]:checked');
    const selectedCountry = selectedCountryRadio ? selectedCountryRadio.nextElementSibling.textContent : '';
    const selectedPoliticalParty = document.getElementById('political-party').value;
    const selectedGovernmentRanks = [];
    document.querySelectorAll('.check-btn:checked').forEach(checkbox => {
      selectedGovernmentRanks.push(checkbox.nextElementSibling.textContent);
    });
  
    // Update the entry with the updated data
    entry.querySelector('.split-one h3').textContent = name;
    entry.querySelector('.split-two h3').textContent = email;
    entry.querySelector('.split-three h3').textContent = selectedCountry;
    entry.querySelector('.split-four h3').textContent = selectedPoliticalParty;
    entry.querySelector('.split-five h3').textContent = selectedGovernmentRanks.join(', ');
    populateFormFields(entry);

    
  }
  
function populateFormFields(entry) {
    // Clear form fields before populating with new data
    document.getElementById('only-name').value = "";
    document.getElementById('only-email').value = "";
    document.querySelectorAll('input[name="economy"]').forEach(radio => {
      radio.checked = false;
    });
    document.getElementById('political-party').value = "";
    document.querySelectorAll('.check-btn').forEach(checkbox => {
      checkbox.checked = false;
    });
  
    // Populate form fields with existing data from the selected entry
    const name = entry.querySelector('.split-one h3').textContent;
    const email = entry.querySelector('.split-two h3').textContent;
    const selectedCountry = entry.querySelector('.split-three h3').textContent;
    const selectedPoliticalParty = entry.querySelector('.split-four h3').textContent;
    const selectedGovernmentRanks = entry.querySelector('.split-five h3').textContent.split(', ');
  
    document.getElementById('only-name').value = name;
    document.getElementById('only-email').value = email;
    document.querySelectorAll('input[name="economy"]').forEach(radio => {
      if (radio.nextElementSibling.textContent === selectedCountry) {
        radio.checked = true;
      }
    });
    document.getElementById('political-party').value = selectedPoliticalParty;
    document.querySelectorAll('.check-btn').forEach(checkbox => {
      if (selectedGovernmentRanks.includes(checkbox.nextElementSibling.textContent)) {
        checkbox.checked = true;
      }
    });
  
    // Change the button to "Edit" mode temporarily
    const submitBtn = document.getElementById("submit-btn-ele");
    submitBtn.value = 'Edit';
    submitBtn.removeEventListener('click', submitRun);
    submitBtn.addEventListener('click', function() {
      updateEntry(entry); // Update the existing entry with the edited data
      submitBtn.value = 'Submit';
      submitBtn.removeEventListener('click', updateEntry);
      submitBtn.addEventListener('click', submitRun);
 

    });
  }
  



 


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


let editedEntry = null;
const updateBtn = document.getElementById("update-btn-ele");
const submitBtn = document.getElementById("submit-btn-ele");

function submitRun(event) {
  event.preventDefault();

  

  
  
  // Capture form inputs
  const name = document.getElementById("only-name").value;
  const email = document.getElementById("only-email").value;
  const selectedCountryRadio = document.querySelector('input[name="economy"]:checked');
  const selectedCountry = selectedCountryRadio ? selectedCountryRadio.nextElementSibling.textContent : '';
  const selectedPoliticalParty = document.getElementById("political-party").value;
  const selectedGovernmentRanks = Array.from(document.querySelectorAll('.check-btn:checked')).map(checkbox => checkbox.nextElementSibling.textContent);

//preventing empty row adding
  if (name === "" || email === "" || !selectedCountryRadio || selectedPoliticalParty === "" || selectedGovernmentRanks.length === 0) {
    alert("Please fill in all fields before submitting.");
    return;
  }

  // Create a new row
  const newEntry = document.createElement("div");
  newEntry.className = "internal-line-div";
  newEntry.innerHTML = `
    <div class="split-one split bg-clr">
      <h3>${name}</h3>
    </div>
    <div class="split-two split bg-clr">
      <h3>${email}</h3>
    </div>
    <div class="split-three split bg-clr">
      <h3>${selectedCountry}</h3>
    </div>
    <div class="split-four split bg-clr">
      <h3>${selectedPoliticalParty}</h3>
    </div>
    <div class="split-five split bg-clr">
      <h3>${selectedGovernmentRanks.join(", ")}</h3>
    </div>
    <div class="split-six split bg-clr">
      <a href="#" class="edit-link">
        <img src="/icons/edit-solid.svg" alt="Edit" class="edit-img">
      </a>
      <a href="#" class="edit-link">
        <img src="/icons/trash-solid.svg" alt="Delete" class="delete-img">
      </a>
    </div>
  `;

  // Append the new entry to the insertElement section
  const insertElement = document.querySelector(".insert-element");
  insertElement.appendChild(newEntry);

  // Clear form fields
  document.getElementById("only-name").value = '';
  document.getElementById("only-email").value = '';
  const countryRadios = document.querySelectorAll('input[name="economy"]');
  countryRadios.forEach(radio => radio.checked = false);
  document.getElementById("political-party").value = '';
  const governmentRankCheckboxes = document.querySelectorAll('.check-btn');
  governmentRankCheckboxes.forEach(checkbox => checkbox.checked = false);
}

// Add event listener to your submit button
const submitButton = document.getElementById("submit-btn-ele");
submitButton.addEventListener("click", submitRun);

// Function to populate form fields for editing
function populateFormForEdit(entry) {
  editedEntry = entry;
  const splitElements = entry.getElementsByClassName("split");

  // Extract data from split elements
  const name = splitElements[0].querySelector("h3").textContent;
  const email = splitElements[1].querySelector("h3").textContent;
  const selectedCountry = splitElements[2].querySelector("h3").textContent;
  const selectedPoliticalParty = splitElements[3].querySelector("h3").textContent;
  const selectedGovernmentRanks = splitElements[4].querySelector("h3").textContent.split(", ");

  // Populate form fields
  document.getElementById("only-name").value = name;
  document.getElementById("only-email").value = email;

  // Populate radio buttons
  const countryRadios = document.querySelectorAll('input[name="economy"]');
  countryRadios.forEach(radio => {
    if (radio.nextElementSibling.textContent === selectedCountry) {
      radio.checked = true;
    } else {
      radio.checked = false;
    }
  });

  // Populate political party input
  document.getElementById("political-party").value = selectedPoliticalParty;

  // Populate government rank checkboxes
  const governmentRankCheckboxes = document.querySelectorAll('.check-btn');
  governmentRankCheckboxes.forEach(checkbox => {
    if (selectedGovernmentRanks.includes(checkbox.nextElementSibling.textContent)) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
}

function handleEditButtonClick(event) {
  console.log("Edit button clicked");
  const entry = event.target.closest(".internal-line-div");
  if (entry) {
    console.log("Entry found:", entry);
    populateFormForEdit(entry);
  }
}

// Event handling
const insertElement = document.querySelector(".insert-element");
insertElement.addEventListener("click", function(event) {
  if (event.target.classList.contains("edit-img")) {
    handleEditButtonClick(event);
    updateBtn.classList.add("dynamic-update-btn");
    submitBtn.classList.add("dynamic-submit-btn");
  }
});

function updateRun() {
  // Capture form inputs
  const name = document.getElementById("only-name").value;
  const email = document.getElementById("only-email").value;
  const selectedCountryRadio = document.querySelector('input[name="economy"]:checked');
  const selectedCountry = selectedCountryRadio ? selectedCountryRadio.nextElementSibling.textContent : '';
  const selectedPoliticalParty = document.getElementById("political-party").value;
  const selectedGovernmentRanks = Array.from(document.querySelectorAll('.check-btn:checked')).map(checkbox => checkbox.nextElementSibling.textContent);

  // creating a row using dynamic HTML structure
  const newEntry = document.createElement("div");
  newEntry.className = "internal-line-div";
  newEntry.innerHTML = `
    <div class="split-one split bg-clr">
      <h3>${name}</h3>
    </div>
    <div class="split-two split bg-clr">
      <h3>${email}</h3>
    </div>
    <div class="split-three split bg-clr">
      <h3>${selectedCountry}</h3>
    </div>
    <div class="split-four split bg-clr">
      <h3>${selectedPoliticalParty}</h3>
    </div>
    <div class="split-five split bg-clr">
      <h3>${selectedGovernmentRanks.join(", ")}</h3>
    </div>
    <div class="split-six split bg-clr">
      <a href="#" class="edit-link">
        <img src="/icons/edit-solid.svg" alt="Edit" class="edit-img">
      </a>
      <a href="#" class="edit-link">
        <img src="/icons/trash-solid.svg" alt="Delete" class="delete-img">
      </a>
    </div>
  `;

  if (editedEntry) {
    editedEntry.replaceWith(newEntry);

    document.getElementById("only-name").value = '';
    document.getElementById("only-email").value = '';
    const countryRadios = document.querySelectorAll('input[name="economy"]');
    countryRadios.forEach(radio => radio.checked = false);
    document.getElementById("political-party").value = '';
    const governmentRankCheckboxes = document.querySelectorAll('.check-btn');
    governmentRankCheckboxes.forEach(checkbox => checkbox.checked = false);

    editedEntry = null;
    updateBtn.classList.remove("dynamic-update-btn");
    submitBtn.classList.remove("dynamic-submit-btn");
  }

  // replace
  const entryToReplace = document.querySelector(".internal-line-div.dynamic-update-entry");
  entryToReplace.replaceWith(newEntry);

  // for clearing the form fields
  document.getElementById("only-name").value = '';
  document.getElementById("only-email").value = '';
  const countryRadios = document.querySelectorAll('input[name="economy"]');
  countryRadios.forEach(radio => radio.checked = false);
  document.getElementById("political-party").value = '';
  const governmentRankCheckboxes = document.querySelectorAll('.check-btn');
  governmentRankCheckboxes.forEach(checkbox => checkbox.checked = false);

  updateBtn.classList.remove("dynamic-update-btn");
  submitBtn.classList.remove("dynamic-submit-btn");
}

// Add event listener to the update button
updateBtn.addEventListener("click", updateRun);


// function for delete
function deleteEntry(entry) {
  const insertElement = document.querySelector(".insert-element");
  insertElement.removeChild(entry);
}

// For Deleting the Row
insertElement.addEventListener("click", function(event) {
  if (event.target.classList.contains("delete-img")) {
    const entry = event.target.closest(".internal-line-div");
    if (entry) {
      deleteEntry(entry);
    }
  }
});

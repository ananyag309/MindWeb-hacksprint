document.addEventListener("DOMContentLoaded", () => {
    const editProfileBtn = document.getElementById("edit-profile-btn");
    const saveProfileBtn = document.getElementById("save-profile-btn");
    const cancelProfileBtn = document.getElementById("cancel-profile-btn");
    const modal = document.getElementById("edit-profile-modal");

    const usernameDisplay = document.getElementById("usernameDisplay");
    const nameDisplay = document.getElementById("nameDisplay");
    const ageDisplay = document.getElementById("ageDisplay");
    const hobbiesDisplay = document.getElementById("hobbiesDisplay");

    const editUsername = document.getElementById("edit-username");
    const editAge = document.getElementById("edit-age");
    const editHobbies = document.getElementById("edit-hobbies");

    // Show modal
    editProfileBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    // Save profile changes
    saveProfileBtn.addEventListener("click", () => {
        nameDisplay.textContent = editUsername.value || "Guest";
        ageDisplay.textContent = editAge.value || "N/A";
        hobbiesDisplay.textContent = editHobbies.value || "N/A";

        modal.classList.add("hidden");
    });

    // Cancel modal
    cancelProfileBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
});

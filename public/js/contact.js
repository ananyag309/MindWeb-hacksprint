document.getElementById('contactForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission to allow validation

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert('Your message has been sent. Thank you for reaching out!');
        document.getElementById('contactForm').reset(); // Reset the form fields
    } else {
        alert('Please fill in all fields before submitting.');
    }
});

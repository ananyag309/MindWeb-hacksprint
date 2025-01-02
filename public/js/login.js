document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Mock validation
    if (email === localStorage.getItem('email') && password === localStorage.getItem('password')) {
        alert('Login successful');
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials');
    }
});

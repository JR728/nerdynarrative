// Sign-up form handler
// public/js/signup.js

async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    try {
        console.log('Fetching /api/users/signup');
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const responseData = await response.json();

            // Check for the redirect property in the JSON response
            if (responseData.redirect) {
                document.location.replace(responseData.redirect);
            } else {
                alert('Unexpected response from the server');
            }
        } else {
            alert(response.statusText);
        }
    } catch (error) {
        alert(error.message);
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);


  
// Sign-in form handler
async function signinFormHandler(event) {
    event.preventDefault();
  
    // Gather the data from the form elements on the page:
    const username = document.querySelector('#username-signin').value.trim();
    const password = document.querySelector('#password-signin').value.trim();
  
    if (username && password) {
        console.log('Fetching /api/users/signin');
        const response = await fetch('/api/users/signin', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
            console.log('Sign-in successful. Redirecting to /dashboard.');
            document.location.replace('/dashboard'); // Redirect to dashboard upon successful sign-in
        } else {
            console.log('Sign-in failed:', response.statusText);
            alert(response.statusText);
        }
    }
};
  

document.querySelector('.signin-form').addEventListener('submit', signinFormHandler);
  
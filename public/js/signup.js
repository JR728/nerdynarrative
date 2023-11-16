// public/js/signup.js

document.addEventListener('DOMContentLoaded', () => {
    // Sign-up form handler
    document.querySelector('.signup-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.querySelector('#username-signup').value.trim();
        const password = document.querySelector('#password-signup').value.trim();

        // Check if the password meets the length requirement
        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return;
        }

        try {
            console.log('Fetching /api/users/signup');
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            console.log('Server response:', response);

            if (response.ok) {
                // Check for HTML response
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('text/html')) {
                    // Handle HTML response (e.g., redirect to /dashboard)
                    document.location.replace(response.url);
                    return;
                }

                try {
                    const responseData = await response.json();
                    // Check for the redirect property in the JSON response
                    if (responseData.redirect) {
                        document.location.replace(responseData.redirect);
                    } else {
                        alert('Unexpected response from the server');
                    }
                } catch (jsonError) {
                    console.error('Error parsing JSON:', jsonError);
                    alert('Unexpected response format from the server');
                }
            } else {
                // Handle non-OK responses
                console.error('Non-OK response from server:', response);
                alert('Sign-up failed. Please check your username and password.');
            }
        } catch (error) {
            console.error('An error occurred during the sign-up request:', error);
            alert('An unexpected error occurred during the sign-up request.');
        }
    });

    // Sign-in form handler
    document.querySelector('.signin-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        // Gather the data from the form elements on the page:
        const username = document.querySelector('#username-signin').value.trim();
        const password = document.querySelector('#password-signin').value.trim();

        if (username && password) {
            try {
                console.log('Fetching /api/users/signin');
                const response = await fetch('/api/users/signin', {
                    method: 'POST',
                    body: JSON.stringify({ username, password }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    console.log('Sign-in successful. Redirecting to /dashboard.');
                    document.location.replace('/dashboard'); // Redirect to dashboard upon successful sign-in
                } else {
                    try {
                        const responseData = await response.json();
                        if (responseData.message) {
                            alert(responseData.message);
                        } else {
                            alert('Sign-in failed. Please check your username and password.');
                        }
                    } catch (jsonError) {
                        console.error('Error parsing JSON:', jsonError);
                        alert('Unexpected response format from the server');
                    }
                }
            } catch (error) {
                console.log('An error occurred during the sign-in request:', error);
                alert('An unexpected error occurred during the sign-in request.');
            }
        }
    });
});

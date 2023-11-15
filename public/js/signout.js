document.addEventListener('DOMContentLoaded', () => {
    // Your signout page JavaScript logic goes here
    console.log('Signout page loaded');
  
    // You can add event listeners, perform actions, etc.
    async function signout() {
      const response = await fetch('/api/users/signout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  
    // Check if the element with id 'signout' exists before adding an event listener
    const signoutButton = document.querySelector('#signout');
    if (signoutButton) {
      signoutButton.addEventListener('click', signout);
    }
});

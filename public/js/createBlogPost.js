document.addEventListener('DOMContentLoaded', () => {
    // Your create blog post page JavaScript logic goes here
    console.log('Create Blog Post page loaded');
  
    // You can add event listeners, perform actions, etc.
    async function postFormHandler(event) {
      event.preventDefault();
  
      const title = document.querySelector('#title').value.trim();
      const postText = document.querySelector('#post_text').value.trim(); // Change to match the ID in your HTML

      console.log('Title:', title);
      console.log('Post Text:', postText);

  
      const response = await fetch('/api/blogposts/create', {
        method: 'POST',
        body: JSON.stringify({ title, post_text: postText }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  
    document.querySelector('.new-post-form').addEventListener('submit', postFormHandler);
});

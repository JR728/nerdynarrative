// public/js/createBlogPost.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Create Blog Post page loaded');

    async function postFormHandler(event) {
        event.preventDefault();

        const title = document.querySelector('#title').value.trim();
        const postText = document.querySelector('#post_text').value.trim();

        console.log('Title:', title);
        console.log('Post Text:', postText);

        try {
            const response = await fetch('/api/blogposts/create', {
                method: 'POST',
                body: JSON.stringify({ title, post_text: postText }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                // Optionally handle a successful response here
                console.log('Post created successfully');
            } else {
                // Optionally handle an unsuccessful response here
                alert('Failed to create post');
            }
        } catch (error) {
            console.error('Error during POST request:', error);
            alert('An error occurred during the request.');
        }
    }

    
});

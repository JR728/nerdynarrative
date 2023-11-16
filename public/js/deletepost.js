document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to the delete buttons
    const deleteButtons = document.querySelectorAll('.delete-post-btn');
  
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
  
            const postId = event.target.dataset.postId;
  
            try {
                const response = await fetch(`/api/blogposts/${postId}/delete`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
  
                if (response.ok) {
                    // If successful, reload the dashboard page
                    window.location.reload();
                } else {
                    console.error('Failed to delete post');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        });
    });
});
  
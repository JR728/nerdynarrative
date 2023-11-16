// editBlogPost.js
document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.edit-post-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();

            const postId = event.target.dataset.postId;

            // Redirect to the edit page
            window.location.href = `/api/blogposts/${postId}/edit`;
        });
    });

    // Additional code for handling form submission if needed
    const editForm = document.querySelector('.edit-post-form');
    if (editForm) {
        editForm.addEventListener('submit', async (formEvent) => {
            formEvent.preventDefault();

            // Gather form data
            const formData = new FormData(editForm);

            try {
                const postId = formData.get('postId');
                const updateResponse = await fetch(`/api/blogposts/${postId}/update`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(Object.fromEntries(formData)),
                });

                if (updateResponse.ok) {
                    // Redirect to the dashboard after successful update
                    window.location.href = '/dashboard';
                } else {
                    console.error('Failed to update blog post');
                }
            } catch (error) {
                console.error('Error updating blog post:', error);
            }
        });
    }
});

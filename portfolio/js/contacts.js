document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation using regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Show sending message
            showFormMessage('Sending message...', 'info');
            
            // Normally here you would send the form data to a server
            // For this demo, we'll simulate a successful submission after a delay
            setTimeout(() => {
                // In a real application, you would replace this with actual form submission code
                // For example using fetch() to submit to a backend endpoint
                
                // Reset the form
                contactForm.reset();
                
                // Show success message
                showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            }, 1500);
        });
    }
    
    // Function to show form messages
    function showFormMessage(message, type) {
        // Check if message element already exists
        let messageElement = document.querySelector('.form-message');
        
        // If not, create one
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'form-message';
            contactForm.parentNode.insertBefore(messageElement, contactForm.nextSibling);
        }
        
        // Set message and styling based on type
        messageElement.textContent = message;
        messageElement.className = 'form-message';
        
        // Add appropriate class based on message type
        if (type === 'error') {
            messageElement.classList.add('error-message');
        } else if (type === 'success') {
            messageElement.classList.add('success-message');
        } else {
            messageElement.classList.add('info-message');
        }
        
        // Add to the DOM and animate
        messageElement.classList.add('shake');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            messageElement.classList.remove('shake');
        }, 500);
        
        // For success and error messages, remove after 5 seconds
        if (type === 'success' || type === 'error') {
            setTimeout(() => {
                messageElement.classList.add('fade-out');
                setTimeout(() => {
                    if (messageElement.parentNode) {
                        messageElement.parentNode.removeChild(messageElement);
                    }
                }, 500);
            }, 5000);
        }
    }
    
    // Add these styles to your CSS (in style.css)
    const style = document.createElement('style');
    style.textContent = `
        .form-message {
            padding: 10px 15px;
            margin: 15px 0;
            border-radius: var(--border-radius);
            font-weight: 500;
        }
        
        .error-message {
            background-color: #ffebee;
            color: #c62828;
            border-left: 4px solid #c62828;
        }
        
        .success-message {
            background-color: #e8f5e9;
            color: #2e7d32;
            border-left: 4px solid #2e7d32;
        }
        
        .info-message {
            background-color: #e3f2fd;
            color: #1565c0;
            border-left: 4px solid #1565c0;
        }
        
        .fade-out {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});
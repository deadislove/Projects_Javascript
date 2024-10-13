class LoadingPanel {
    constructor() {
        // Create the loading panel and inject it into the DOM
        this.createLoadingPanel();
        this.timeoutId = null; // Store timeout ID for cancellation
    }

    // Method to create the loading panel
    createLoadingPanel() {
        // Create the overlay div
        this.loadingPanel = document.createElement('div');
        this.loadingPanel.id = 'loading-panel';
        this.loadingPanel.style.display = 'none'; // Hide it initially

        // Create the spinner div
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';

        // Create a text element under the spinner
        this.loadingText = document.createElement('div');
        this.loadingText.className = 'loading-text';
        this.loadingText.style.color = '#fff'; // White text color

        // Append spinner and text to the panel
        this.loadingPanel.appendChild(spinner);
        this.loadingPanel.appendChild(this.loadingText);

        // Append the panel to the body
        document.body.appendChild(this.loadingPanel);

        // Inject the CSS styles for the loading panel, spinner, and text
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            #loading-panel {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
                z-index: 9999; /* Ensure it's on top */
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column; /* Arrange spinner and text vertically */
            }

            .loading-spinner {
                border: 8px solid #f3f3f3;
                border-top: 8px solid #3498db;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                animation: spin 1s linear infinite;
                margin-bottom: 20px; /* Space between spinner and text */
            }

            .loading-text {
                font-size: 16px;
                text-align: center;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        // Append the styles to the head
        document.head.appendChild(style);
    }

    // Method to show the loading panel with optional text
    show(text = 'Loading...') {
        this.loadingText.innerText = text; // Set the loading text
        this.loadingPanel.style.display = 'flex'; // Show the panel
    }

    // Method to hide the loading panel
    hide() {
        this.loadingPanel.style.display = 'none';
    }

    // Cancel any active timeout
    cancelTimeout() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
}

// Create a global instance of the LoadingPanel
const loadingPanel = new LoadingPanel();

// Global function to control the loading panel with optional text, timeout, and action
window.customLoadingPanel = function(show, text = 'Loading...', timeout = 3000, action = null, onTimeout = null) {
    if (show) {
        loadingPanel.show(text); // Show the loading panel with text

        // If an action (function) is provided, execute it
        if (typeof action === 'function') {
            action({
                hide: () => loadingPanel.hide(),           // Method to hide the loading panel
                cancelTimeout: () => loadingPanel.cancelTimeout(), // Method to cancel timeout
                keepRunning: () => {} // Define if needed
            });
        }

        // Apply timeout if the user did not pass null
        if (timeout !== null) {
            loadingPanel.timeoutId = setTimeout(() => {
                loadingPanel.hide(); // Hide the loading panel after the timeout

                if (typeof onTimeout === 'function') {
                    onTimeout(); // Execute the onTimeout function
                }

            }, timeout);
        }
    } else {
        loadingPanel.hide(); // Hide the loading panel immediately
        loadingPanel.cancelTimeout(); // Cancel any ongoing timeout
    }
};

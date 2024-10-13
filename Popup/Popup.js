class Popup {
    constructor(title, body, buttons = [], buttonSort = false, CloseBtnTxt = 'Close') {
        this.title = title;
        this.body = body;
        this.buttons = buttons;
        this.buttonSort = buttonSort;
        this.CloseBtnTxt = CloseBtnTxt;
        this.initPopup();
    }

    // initial
    initPopup() {
        // Create popup windows
        this.popupContainer = document.createElement('div');
        this.popupContainer.classList.add('popup-container');

        const popupBox = document.createElement('div');
        popupBox.classList.add('popup-box');

        const popupTitle = document.createElement('div');
        popupTitle.classList.add('popup-title');
        popupTitle.innerText = this.title;

        const popupBody = document.createElement('div');
        popupBody.classList.add('popup-body');
        popupBody.innerText = this.body;

        const closeButton = document.createElement('button');
        closeButton.classList.add('popup-button');
        closeButton.innerText = CloseBtnTxt ?? 'Close';

        // Close window
        closeButton.addEventListener('click', () => {
            this.hide();
            this.resolvePromise( CloseBtnTxt ?? 'Close');
        });

        // Append the default close button and custom buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        // Add any extra buttons passed in the constructor
        this.buttons.forEach(button => {
            const customButton = document.createElement('button');
            customButton.classList.add('popup-button');
            customButton.innerText = button.label;

            // Attach the custom action to the button
            customButton.addEventListener('click', () => {
                button.action(); // Execute the custom action
                this.hide();
                this.resolvePromise(button.label);  // Resolve the promise with the button label
            });

            buttonContainer.appendChild(customButton);
        });

        console.log('buttonSort: ', this.buttonSort)
        // Add the close button based on buttonSort
        if (this.buttonSort) {
            // Add close button at the end
            buttonContainer.appendChild(closeButton);
        } else {
            // Add close button at the beginning
            buttonContainer.insertBefore(closeButton, buttonContainer.firstChild);
        }

        // Combine window
        popupBox.appendChild(popupTitle);
        popupBox.appendChild(popupBody);
        popupBox.appendChild(buttonContainer);
        this.popupContainer.appendChild(popupBox);

        // hide outside window
        window.addEventListener('click', (event) => {
            if (event.target === this.popupContainer) {
                this.hide();
                this.resolvePromise('outside');  // Resolve when clicking outside
            }
        });

        // Adding CSS
        this.addStyles();

        // Adding DOM
        document.body.appendChild(this.popupContainer);

        // Initialize promise
        this.promise = new Promise((resolve) => {
            this.resolvePromise = resolve;
        });
    }

    // Display window
    show() {
        this.popupContainer.style.display = 'block';
    }

    // Hide window
    hide() {
        this.popupContainer.style.display = 'none';
    }

    // CSS part
    addStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            .popup-container {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        }
        .popup-box {
            background-color: white;
            margin: 20% auto;
            padding: 20px;
            border-radius: 8px;
            width: 90%;
            max-width: 300px;
            box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
            text-align: center;
        }
        .popup-title {
            font-size: 18px;
            margin-bottom: 10px;
        }
        .popup-body {
            margin-bottom: 20px;
        }
        .popup-button {
            padding: 10px 20px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .popup-button:hover {
            background-color: #0056b3;
        }
        .button-container {
                display: flex;
                justify-content: center;
                gap: 10px;
            }

        /* Responsive Design */
        @media only screen and (min-width: 320px) and (max-width: 700px) {
            .popup-box {
                width: 80%;
                padding: 15px;
            }
            .popup-title {
                font-size: 16px;
            }
            .popup-body {
                font-size: 14px;
            }
        }

        @media only screen and (min-width: 601px) and (max-width: 700px) {
            .popup-box {
                margin-top: 40%;
            }
        }

        @media only screen and (min-width: 501px) and (max-width: 600px) {
            .popup-box {
                margin-top: 50%;
            }
        }

        @media only screen and (min-width: 320px) and (max-width: 500px) {
            .popup-box {
                margin-top: 60%;
            }
        }

        @media only screen and (max-width: 319px) {
            .popup-box {
                margin-top: 80%;
            }
        }

        @media only screen and (max-width: 300px) {
            .popup-box {
                margin-top: 100%;
            }
        }

        @media only screen and (orientation: landscape) {
            .popup-box {
                width: 60%;
            }
        }
        `;
        document.head.appendChild(style);
    }
}

// Global Popup keyword
/**
 * On-us custom popup
 * @param {*} title windows title
 * @param {*} body  windows body
 * @param {*} buttons windows button array
 * @param {*} buttonSort windows button order by
 * @returns 
 */
window.customPopup = function (title, body, buttons = [], buttonSort = false, CloseBtnTxt = 'Close') {
    const popup = new Popup(title, body, buttons, buttonSort, CloseBtnTxt);
    popup.show();
    return popup.promise;
}

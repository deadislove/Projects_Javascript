import React, { useState, useEffect } from 'react';
import './Popup.css'; 

const Popup = ({ title, body, buttons = [], buttonSort = false, CloseBtnTxt = 'Close', onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => {
      // Cleanup on unmount
    };
  }, []);

  const closePopup = (result) => {
    setIsVisible(false);
    if (onClose) {
      onClose(result);
    }
  };

  // Handle the outside click to close the popup
  const handleClickOutside = (e) => {
    if (e.target.classList.contains('popup-container')) {
      closePopup('outside');
    }
  };

  return (
    <>
      {isVisible && (
        <div className="popup-container" onClick={handleClickOutside}>
          <div className="popup-box">
            <div className="popup-title">{title}</div>
            <div className="popup-body">{body}</div>
            <div className="button-container">
              {/* Display custom buttons */}
              {buttons.map((button, index) => (
                <button
                  key={index}
                  className="popup-button"
                  onClick={() => {
                    button.action(); // Execute the custom action
                    closePopup(button.label); // Close popup after action
                  }}
                >
                  {button.label}
                </button>
              ))}

              {/* Close button */}
              {buttonSort ? (
                <button className="popup-button" onClick={() => closePopup(CloseBtnTxt)}>
                  {CloseBtnTxt}
                </button>
              ) : (
                <button className="popup-button" onClick={() => closePopup(CloseBtnTxt)}>
                  {CloseBtnTxt}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;

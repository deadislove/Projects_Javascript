import React, { useState, useEffect } from 'react';
import './Popup.css';

interface Button {
  label: string;
  action: () => void;
}

interface PopupProps {
  title: string;
  body: string;
  buttons?: Button[];
  buttonSort?: boolean;
  CloseBtnTxt?: string;
  onClose: (result: string) => void;
}

const Popup: React.FC<PopupProps> = ({
  title,
  body,
  buttons = [],
  buttonSort = false,
  CloseBtnTxt = 'Close',
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
    return () => {
      // Cleanup if needed when unmounting
    };
  }, []);

  const closePopup = (result: string) => {
    setIsVisible(false);
    onClose(result);
  };

  // Handle the outside click to close the popup
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.classList.contains('popup-container')) {
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
              {/* Render custom buttons */}
              {buttons.map((button, index) => (
                <button
                  key={index}
                  className="popup-button"
                  onClick={() => {
                    button.action(); // Execute custom action
                    closePopup(button.label); // Close popup after action
                  }}
                >
                  {button.label}
                </button>
              ))}

              {/* Render Close button */}
              <button
                className="popup-button"
                onClick={() => closePopup(CloseBtnTxt)}
              >
                {CloseBtnTxt}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;

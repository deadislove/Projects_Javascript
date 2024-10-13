import React, { useState, useEffect } from 'react';
import './LoadingPanel.css'; 

interface LoadingPanelProps {
  show: boolean;
  text?: string;
  timeout?: number | null;
  action?: (control: { hide: () => void; cancelTimeout: () => void; keepRunning: () => void }) => void;
  onTimeout?: () => void;
}

const LoadingPanel: React.FC<LoadingPanelProps> = ({
  show,
  text = 'Loading...',
  timeout = 3000,
  action,
  onTimeout,
}) => {
  const [visible, setVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (show) {
      setVisible(true); // Show the loading panel

      // If action is provided, call it
      if (action) {
        action({
          hide: () => setVisible(false),
          cancelTimeout: () => cancelTimeout(),
          keepRunning: () => {}, // Optional: implement if needed
        });
      }

      // Apply timeout if it's not null
      if (timeout !== null) {
        const id = setTimeout(() => {
          setVisible(false); // Hide after timeout
          if (onTimeout) {
            onTimeout(); // Run the onTimeout function
          }
        }, timeout);
        setTimeoutId(id); // Store timeout ID for possible cancellation
      }
    } else {
      setVisible(false); // Hide immediately if `show` is false
      cancelTimeout(); // Cancel any active timeout
    }

    return () => {
      cancelTimeout(); // Clean up timeout on component unmount
    };
  }, [show, action, timeout, onTimeout]);

  const cancelTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  };

  return (
    visible && (
      <div id="loading-panel">
        <div className="loading-spinner"></div>
        <div className="loading-text">{text}</div>
      </div>
    )
  );
};

export default LoadingPanel;

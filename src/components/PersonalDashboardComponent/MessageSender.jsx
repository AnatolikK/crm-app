import React, { useState } from 'react';

const MessageSender = () => {
  const [messengerNotification, setMessengerNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);

  const handleMessengerToggle = () => {
    setMessengerNotification(!messengerNotification);
  };

  const handleEmailToggle = () => {
    setEmailNotification(!emailNotification);
  };

  return (
    <div className="message-sender">
      <h3>Рассылка сообщений</h3>
      <div>
        <label>
          Получать уведомление в мессенджере?
          <input type="checkbox" checked={messengerNotification} onChange={handleMessengerToggle} />
        </label>
      </div>
      <div>
        <label>
          Получать уведомление по Email?
          <input type="checkbox" checked={emailNotification} onChange={handleEmailToggle} />
        </label>
      </div>
    </div>
  );
};

export default MessageSender;

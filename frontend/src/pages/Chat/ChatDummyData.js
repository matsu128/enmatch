const chatDummyData = [
    {
      id: 1,
      icon: '🧑',
      userName: 'User A',
      lastMessage: 'Hello!',
      timestamp: '10:30',
      messages: [
        { content: 'Hello!', isSentByUser: false },
        { content: 'Hi! How are you?', isSentByUser: true },
      ],
    },
    {
      id: 2,
      icon: '👩',
      userName: 'User B',
      lastMessage: 'How are you?',
      timestamp: '11:00',
      messages: [
        { content: 'How are you?', isSentByUser: false },
        { content: 'I am good, thanks!', isSentByUser: true },
      ],
    },
    {
      id: 3,
      icon: '🧔',
      userName: 'User C',
      lastMessage: 'Good morning!',
      timestamp: '09:00',
      messages: [
        { content: 'Good morning!', isSentByUser: false },
        { content: 'Good morning to you too!', isSentByUser: true },
      ],
    },
  ];
  
  export default chatDummyData;
  
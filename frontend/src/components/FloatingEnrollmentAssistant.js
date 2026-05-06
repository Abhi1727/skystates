import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  CreditCard,
  HelpCircle,
  CheckCircle,
  Clock,
  BookOpen,
  Award,
  Users
} from 'lucide-react';

const FloatingEnrollmentAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: '👋 Hi! I\'m your enrollment assistant. I can help you choose the right course, answer questions about pricing, or guide you through the enrollment process. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userStep, setUserStep] = useState('greeting');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    interests: [],
    experience: ''
  });
  const messagesEndRef = useRef(null);

  const quickActions = [
    { id: 1, text: 'Course Recommendations', icon: BookOpen, action: 'recommendations' },
    { id: 2, text: 'Pricing & Payment', icon: CreditCard, action: 'pricing' },
    { id: 3, text: 'Career Outcomes', icon: Award, action: 'careers' },
    { id: 4, text: 'Schedule Call', icon: Calendar, action: 'schedule' }
  ];

  const courseRecommendations = {
    beginner: [
      { name: 'Data Science Fundamentals', duration: '3 months', price: '₹45,000', level: 'Beginner' },
      { name: 'Cyber Security Basics', duration: '2 months', price: '₹35,000', level: 'Beginner' }
    ],
    intermediate: [
      { name: 'Advanced Data Science', duration: '6 months', price: '₹85,000', level: 'Intermediate' },
      { name: 'DevOps Engineering', duration: '4 months', price: '₹65,000', level: 'Intermediate' }
    ],
    advanced: [
      { name: 'AI & Machine Learning', duration: '8 months', price: '₹1,20,000', level: 'Advanced' },
      { name: 'Advanced Cyber Security', duration: '6 months', price: '₹95,000', level: 'Advanced' }
    ]
  };

  const careerOutcomes = {
    'Data Science': {
      averageSalary: '₹12-25 LPA',
      jobTitles: ['Data Scientist', 'ML Engineer', 'Data Analyst', 'AI Researcher'],
      growth: '+35% YoY',
      companies: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys']
    },
    'Cyber Security': {
      averageSalary: '₹8-20 LPA',
      jobTitles: ['Security Analyst', 'Penetration Tester', 'Security Consultant', 'CISO'],
      growth: '+42% YoY',
      companies: ['IBM', 'Cisco', 'Palo Alto Networks', 'Wipro', 'HCL']
    },
    'DevOps': {
      averageSalary: '₹10-22 LPA',
      jobTitles: ['DevOps Engineer', 'Cloud Architect', 'SRE', 'Infrastructure Engineer'],
      growth: '+38% YoY',
      companies: ['AWS', 'Azure', 'Google Cloud', 'Accenture', 'Capgemini']
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Course recommendations
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('which course')) {
      return {
        type: 'assistant',
        content: 'I\'d be happy to recommend courses! To give you the best suggestions, could you tell me:\n\n1. What\'s your current experience level? (beginner/intermediate/advanced)\n2. Which field interests you most? (Data Science, Cyber Security, or DevOps)\n3. What are your career goals?',
        quickReplies: ['Beginner - Data Science', 'Intermediate - DevOps', 'Advanced - Cyber Security']
      };
    }

    // Pricing questions
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('payment') || lowerMessage.includes('emi')) {
      return {
        type: 'assistant',
        content: 'We offer flexible payment options to make learning accessible:\n\n💰 **Pricing Options:**\n• Data Science Programs: ₹45,000 - ₹1,20,000\n• Cyber Security Programs: ₹35,000 - ₹95,000\n• DevOps Programs: ₹40,000 - ₹85,000\n\n💳 **Payment Methods:**\n• One-time payment (5% discount)\n• Monthly EMI (0% interest)\n• Credit/Debit cards\n• Net banking\n• Digital wallets\n\n🎓 **Scholarships:**\nMerit-based scholarships up to 30% off available!',
        quickReplies: ['View Course Catalog', 'Apply for Scholarship', 'Payment Plans']
      };
    }

    // Career questions
    if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('salary')) {
      return {
        type: 'assistant',
        content: 'Great question! Our programs have excellent career outcomes:\n\n📈 **Placement Stats:**\n• 92% placement rate within 3 months\n• Average salary: ₹8-25 LPA\n• 500+ hiring partners\n\n🏢 **Top Recruiters:**\nGoogle, Microsoft, Amazon, IBM, TCS, Infosys, and many more!\n\nWould you like detailed career information for a specific field?',
        quickReplies: ['Data Science Careers', 'Cyber Security Jobs', 'DevOps Opportunities']
      };
    }

    // Schedule call
    if (lowerMessage.includes('call') || lowerMessage.includes('talk') || lowerMessage.includes('schedule')) {
      return {
        type: 'assistant',
        content: 'I\'d love to connect you with our career counselor! Please share:\n\n📅 **Preferred Time:**\n• Morning (9 AM - 12 PM)\n• Afternoon (12 PM - 5 PM)\n• Evening (5 PM - 8 PM)\n\n📞 **Contact Info:**\nYour phone number and email address\n\nOur counselor will call you within 24 hours to discuss your learning goals!',
        quickReplies: ['Schedule Morning Call', 'Schedule Afternoon Call', 'Schedule Evening Call']
      };
    }

    // Default response
    return {
      type: 'assistant',
      content: 'I\'m here to help! You can ask me about:\n\n📚 Course recommendations and curriculum\n💰 Pricing and payment options\n🎓 Career outcomes and job placements\n📅 Schedule a call with our counselors\n🔧 Technical requirements and prerequisites\n\nWhat would you like to know more about?',
      quickReplies: ['Course Recommendations', 'Pricing & Payment', 'Career Outcomes', 'Schedule Call']
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(inputMessage);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        ...response,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    let message = '';
    switch (action) {
      case 'recommendations':
        message = 'Can you recommend courses for me?';
        break;
      case 'pricing':
        message = 'What are the pricing options and payment plans?';
        break;
      case 'careers':
        message = 'What are the career outcomes and salary expectations?';
        break;
      case 'schedule':
        message = 'I would like to schedule a call with a counselor';
        break;
      default:
        message = action;
    }
    setInputMessage(message);
    handleSendMessage();
  };

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
    handleSendMessage();
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, #f97316, #fb923c)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 25px rgba(249, 115, 22, 0.4)',
          zIndex: 1000
        }}
      >
        <MessageCircle size={28} color="white" />
        
        {/* Notification Dot */}
        <div style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          width: '12px',
          height: '12px',
          background: '#ef4444',
          borderRadius: '50%',
          border: '2px solid white',
          animation: 'pulse 2s infinite'
        }} />
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '30px',
              width: '380px',
              height: '600px',
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #f97316, #fb923c)',
              color: 'white',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <HelpCircle size={24} color="#f97316" />
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '1rem' }}>
                    Enrollment Assistant
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                    🟢 Online - Typically replies instantly
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '24px',
                  cursor: 'pointer',
                  opacity: 0.8,
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '1'}
                onMouseLeave={(e) => e.target.style.opacity = '0.8'}
              >
                ×
              </button>
            </div>

            {/* Quick Actions */}
            <div style={{
              padding: '15px',
              background: '#f9fafb',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px'
              }}>
                {quickActions.map(action => {
                  const IconComponent = action.icon;
                  return (
                    <motion.button
                      key={action.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickAction(action.action)}
                      style={{
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '10px',
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: '#374151',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#fef3c7';
                        e.target.style.borderColor = '#f97316';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'white';
                        e.target.style.borderColor = '#e5e7eb';
                      }}
                    >
                      <IconComponent size={16} color="#f97316" />
                      {action.text}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Messages Area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    gap: '10px',
                    ...(message.type === 'user' ? { flexDirection: 'row-reverse' } : {})
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    background: message.type === 'user' ? '#f97316' : '#e5e7eb'
                  }}>
                    {message.type === 'user' ? (
                      <User size={18} color="white" />
                    ) : (
                      <HelpCircle size={18} color="#6b7280" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div style={{
                    maxWidth: '70%',
                    background: message.type === 'user' ? '#f97316' : '#f3f4f6',
                    color: message.type === 'user' ? 'white' : '#1f2937',
                    padding: '12px 16px',
                    borderRadius: message.type === 'user' ? 
                      '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                    whiteSpace: 'pre-line'
                  }}>
                    {message.content}
                    
                    {/* Quick Replies */}
                    {message.quickReplies && (
                      <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {message.quickReplies.map((reply, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuickReply(reply)}
                            style={{
                              background: message.type === 'user' ? 'white' : '#f97316',
                              color: message.type === 'user' ? '#f97316' : 'white',
                              border: 'none',
                              padding: '6px 12px',
                              borderRadius: '15px',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            {reply}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', gap: '10px' }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <HelpCircle size={18} color="#6b7280" />
                  </div>
                  <div style={{
                    background: '#f3f4f6',
                    padding: '12px 16px',
                    borderRadius: '18px 18px 18px 4px'
                  }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#9ca3af',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s infinite ease-in-out both'
                      }} />
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#9ca3af',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s infinite ease-in-out both',
                        animationDelay: '0.16s'
                      }} />
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#9ca3af',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s infinite ease-in-out both',
                        animationDelay: '0.32s'
                      }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{
              padding: '15px',
              background: 'white',
              borderTop: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
              }}>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '25px',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#f97316'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  style={{
                    width: '44px',
                    height: '44px',
                    background: 'linear-gradient(135deg, #f97316, #fb923c)',
                    border: 'none',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default FloatingEnrollmentAssistant;

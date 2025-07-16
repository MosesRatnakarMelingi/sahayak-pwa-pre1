import React, { useState, useEffect, useRef } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Assuming firebase.js is correctly configured
import './App.css';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import remarkGfm from 'remark-gfm'; // Import remark-gfm for GitHub Flavored Markdown

// Import constants from the new config.js file
import { languageOptions, featureCards, featureTranslations, viewContentTranslations } from './config';

// Import the new AI service function
import { callGeminiApi } from './services/aiService';


function App() {
  const [user, setUser] = useState(null);
  const [prompt, setPrompt] = useState('');
  // State to store the entire conversation history
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  // lastSubmittedPrompt is no longer strictly needed for AI context, but can be kept for UI if desired
  const [lastSubmittedPrompt, setLastSubmittedPrompt] = useState(''); 

  const [currentView, setCurrentView] = useState('dashboard');

  // Language States
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    return localStorage.getItem('userLanguage') || 'English';
  });
  const [showLanguageSetup, setShowLanguageSetup] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const languageDropdownRef = useRef(null);

  // Derived state for current view texts and feature translations
  const currentViewTexts = viewContentTranslations[selectedLanguage] || viewContentTranslations['English'];
  const currentFeatureTranslations = featureTranslations[selectedLanguage] || featureTranslations['English'];


  // 1. Effect for Authentication State Changes
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // If user logs out, reset relevant states
      if (!currentUser) {
        // Clear conversation on sign out
        setConversation([]);
        setPrompt('');
        setLastSubmittedPrompt(''); // Clear last submitted prompt on sign out
        setCurrentView('dashboard'); // Go to dashboard on sign out
        setSelectedLanguage('English'); // Reset to default English
        localStorage.removeItem('userLanguage');
        setShowLanguageSetup(false); // Ensure language setup is not shown if logged out
      }
    });

    return () => unsubscribeAuth(); // Cleanup auth listener on component unmount
  }, []); // Empty dependency array: runs only ONCE on mount

  // 2. Effect for Initial Language Preference (Runs ONCE on mount or when user state changes for first time)
  useEffect(() => {
    // Only check language setup if user is loaded and it's the first time
    if (user) { // Only proceed if user state is determined
      const savedLanguage = localStorage.getItem('userLanguage');
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
        setShowLanguageSetup(false); // Hide setup if language already saved
      } else {
        setShowLanguageSetup(true); // Show setup if no language saved and user is logged in
      }
    } else if (user === null) { // User is not logged in initially
        const savedLanguage = localStorage.getItem('userLanguage');
        if (savedLanguage) {
            setSelectedLanguage(savedLanguage);
            setShowLanguageSetup(false);
        } else {
            setShowLanguageSetup(false); // Default to false for unauthenticated, user will be prompted on sign-in
        }
    }
  }, [user]); // Depends on 'user' to run after auth state is known

  // Removed: Effect to clear conversation when selectedLanguage changes
  // This is no longer needed as the AI will respond to the query language,
  // and the dropdown will be hidden in feature views.

  // 3. Effect for Language Dropdown Click Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Language setup will be handled by the useEffect after user state updates
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("Error signing in. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error signing out. Please try again.");
    }
  };

  // Function to save language preference
  const saveLanguagePreference = (langName) => {
    setSelectedLanguage(langName);
    localStorage.setItem('userLanguage', langName); // Keep this for user preference
    setShowLanguageSetup(false);
    setShowLanguageDropdown(false);
  };

  // Clipboard handler using navigator.clipboard.writeText
  const handleCopyResponse = async (textToCopy) => {
    if (textToCopy) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        alert(currentViewTexts.copySuccess);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy. Your browser might not support automatic clipboard access, or you denied permission.');
      }
    }
  };

  const handleGenerateContent = async () => {
    if (!prompt.trim()) {
      alert('Please enter your query!');
      setLoading(false);
      return;
    }
    
    const currentPromptValue = prompt;
    setLastSubmittedPrompt(currentPromptValue); 
    setPrompt(''); 

    // Add the user's message to the conversation immediately
    setConversation(prevConversation => [
      ...prevConversation,
      { sender: 'user', text: currentPromptValue }
    ]);

    setLoading(true);

    // Handle 'under development' features - these will still show a message directly
    if (['artify', 'adaptify', 'lensAI', 'readify'].includes(currentView)) {
      setConversation(prevConversation => [
        ...prevConversation,
        { sender: 'ai', text: currentViewTexts[`${currentView}UnderDevelopment`] }
      ]);
      setLoading(false);
      return;
    }

    try {
      // Call the updated aiService function, passing the full conversation, current view, and selected language
      // The backend will now handle the specific prompt instructions based on featureId and language
      const text = await callGeminiApi(conversation.concat({ sender: 'user', text: currentPromptValue }), currentView, selectedLanguage);
      
      // Add the AI's response to the conversation
      setConversation(prevConversation => [
        ...prevConversation,
        { sender: 'ai', text: text }
      ]);

    } catch (error) {
      console.error("Error generating content:", error);
      // Add an error message to the conversation if something goes wrong
      setConversation(prevConversation => [
        ...prevConversation,
        { sender: 'ai', text: "I'm sorry, there was an error processing your request." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    // Clear the entire conversation when clearing
    setConversation([]);
    setLastSubmittedPrompt('');
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="app-container">
      {/* Language Setup Modal (First-time login) */}
      {user && showLanguageSetup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="language-setup-modal">
            <h2>{currentViewTexts.chooseLanguageTitle}</h2>
            <div className="language-options-grid">
              {languageOptions.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => saveLanguagePreference(lang.name)}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <header className="app-header">
        <h1 className="app-title">Sahayak</h1>
        <div className="header-controls">
          {user ? (
            <>
              <span className="welcome-text">Welcome, {user.displayName}!</span>
              {/* Language Chooser Dropdown - Only visible on Dashboard */}
              {currentView === 'dashboard' && (
                <div className="language-dropdown-container" ref={languageDropdownRef}>
                  <button
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    className="language-dropdown-button"
                    title="Change Language"
                  >
                    {selectedLanguage} <span className="ml-2">&#9662;</span>
                  </button>
                  {showLanguageDropdown && (
                    <div className="language-dropdown-menu">
                      {languageOptions.map((lang) => (
                        <button
                          key={lang.id}
                          onClick={() => saveLanguagePreference(lang.name)}
                          className={selectedLanguage === lang.name ? 'selected' : ''}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <button
                onClick={handleSignOut}
                className="button-primary button-red"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              className="button-primary button-blue"
            >
              Sign In with Google
            </button>
          )}
        </div>
      </header>

      <main className="main-content">
        {user ? (
          <>
            {currentView === 'dashboard' ? (
              <div className="dashboard-view">
                <h2 className="dashboard-title">{currentViewTexts.dashboardTitle}</h2>
                <div className="feature-cards-grid">
                  {featureCards.map((card) => {
                    const icon = card.icon;
                    const featureData = featureTranslations[selectedLanguage]?.[card.id] || card;
                    // Corrected: Check card.id instead of currentView to properly show "Under Development"
                    const isUnderDevelopment = ['artify', 'adaptify', 'lensAI', 'readify'].includes(card.id);

                    return (
                      <button
                        key={card.id}
                        onClick={() => {
                          setCurrentView(card.id);
                          // Clear conversation when switching modules
                          setConversation([]);
                          setPrompt('');
                          setLastSubmittedPrompt('');
                        }}
                        className={`feature-card ${isUnderDevelopment ? 'under-development' : ''}`}
                      >
                        <span className="feature-card-icon">{icon}</span>
                        <h3>{featureData.name || featureData.title || card.id}</h3>
                        <p>{featureData.description || 'Description not available.'}</p>
                        {isUnderDevelopment && (
                            <span className="development-status">
                                {(currentViewTexts[`${card.id}UnderDevelopment`] || 'Under Development').split('.')[0]}
                            </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="feature-view-container">
                <button
                  onClick={() => {
                    setCurrentView('dashboard');
                    handleClear();
                  }}
                  className="back-button"
                >
                  <span>&larr;</span> {currentViewTexts.backButton}
                </button>

                <h2 className="feature-view-title">
                  {currentViewTexts[`${currentView}Title`] || featureTranslations[selectedLanguage]?.[currentView]?.name || currentView}
                </h2>

                {['artify', 'adaptify', 'lensAI', 'readify'].includes(currentView) ? (
                  <div className="under-development-message">
                    <p>{currentViewTexts[`${currentView}UnderDevelopment`]}</p>
                  </div>
                ) : (
                  <>
                    <div className="input-field-container">
                      <textarea
                        className="text-input"
                        placeholder={
                          currentView === 'askAI'
                            ? currentViewTexts.askAIPlaceholder
                            : currentView === 'storyfy'
                              ? currentViewTexts.storyfyPlaceholder
                              : currentView === 'explainify'
                                ? currentViewTexts.explainifyPlaceholder
                                : currentView === 'gamify'
                                  ? currentViewTexts.gamifyPlaceholder
                                  : ''
                        }
                        value={prompt}
                        onChange={handlePromptChange}
                        disabled={loading}
                      ></textarea>
                    </div>

                    <div className="button-group">
                      <button
                        onClick={handleGenerateContent}
                        className={`button-primary button-green ${loading ? 'disabled' : ''}`}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner"></span> {currentViewTexts.generating}
                          </>
                        ) : (
                          currentViewTexts.generateButton
                        )}
                      </button>
                      <button
                        onClick={handleClear}
                        className="button-primary button-secondary"
                        disabled={loading}
                      >
                        {currentViewTexts.clearButton}
                      </button>
                    </div>

                    {/* NEW: Render the entire conversation */}
                    <div className="ai-response-container">
                      {conversation.map((message, index) => (
                        <div key={index} className={`message-block ${message.sender}`}>
                          {message.sender === 'user' ? (
                            <>
                              <h4>{currentViewTexts.yourQueryHeading || 'Your Query:'}</h4>
                              <p>{message.text}</p>
                            </>
                          ) : (
                            <>
                              <h3>
                                {currentViewTexts.aiResponseHeading}
                                <button
                                  onClick={() => handleCopyResponse(message.text)}
                                  className="copy-button"
                                  title="Copy to Clipboard"
                                >
                                  📋
                                </button>
                              </h3>
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
                            </>
                          )}
                        </div>
                      ))}
                      {loading && (
                        <div className="message-block ai loading">
                          <p>Thinking...</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="signin-message">{currentViewTexts.signInMessage}</p>
        )}
      </main>
    </div>
  );
}

export default App;

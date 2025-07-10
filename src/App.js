import React, { useState, useEffect, useRef } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Assuming firebase.js is correctly configured
import './App.css';

// Import constants from the new config.js file
import { languageOptions, featureCards, featureTranslations, viewContentTranslations } from './config';

// Import the new AI service function
import { callGeminiApi } from './services/aiService';


function App() {
  const [user, setUser] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false); // Corrected this line

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
        setAiResponse('');
        setPrompt('');
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
    localStorage.setItem('userLanguage', langName);
    setShowLanguageSetup(false);
    setShowLanguageDropdown(false);
  };

  // NEW Clipboard handler using navigator.clipboard.writeText
  const handleCopyResponse = async () => {
    if (aiResponse) {
      try {
        await navigator.clipboard.writeText(aiResponse);
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
    setLoading(true);
    setAiResponse(''); // Clear response at the start of new generation

    let finalPrompt = prompt;

    // Handle 'under development' features
    // Removed 'gamify' from this check as it's now implemented
    if (['artify', 'adaptify', 'lensAI', 'readify'].includes(currentView)) {
      setAiResponse(currentViewTexts[`${currentView}UnderDevelopment`]);
      setLoading(false);
      return;
    }

    switch (currentView) {
      case 'askAI':
        // Revised prompt for AskAI
        finalPrompt = `You are Sahayak, a helpful teaching assistant for teachers in India. Your responses must always be factual, simple, easy to understand, and appropriate for children aged 15 and under. When responding to a query:
        1. Provide direct, factual answers.
        2. Use language that is kid-friendly and avoids complex jargon.
        3. Keep explanations concise and to the point.
        4. If a specific country is mentioned, adjust context accordingly; otherwise, maintain an Indian context.

        Query: "${prompt}"`;
        break;
      case 'storyfy':
        finalPrompt = `Turn the following concept or question into a simple, understandable, engaging story for elementary school children in India: "${prompt}"`;
        break;
      case 'explainify':
        finalPrompt = `You are explaining concepts to a young child (age 6-10). Explain the following concept or question very simply, accurately, and clearly. Your explanation should be **very brief** (1-3 short sentences/paragraphs). Crucially, include **only one, very clear, and highly relatable analogy** that a child would immediately understand (e.g., for electricity, "like water flowing in pipes"). Do NOT use complex words or multiple analogies. Explain this concept in ${selectedLanguage}: "${prompt}"`;
        break;
      case 'gamify': // Added Gamify logic
        finalPrompt = `Generate a simple, text-based interactive game or quiz based on the following topic for elementary school children. The game should be playable directly through text. Provide clear instructions for the user to play. Ensure the content is appropriate for an Indian context. Topic: "${prompt}"`;
        break;
      default:
        alert("Please select an option from the home screen.");
        setLoading(false);
        return;
    }

    // Only add language prefix if not Explainify and not English
    // Explainify already handles language internally. For Gamify, we explicitly ask for Indian context.
    if (currentView !== 'explainify' && currentView !== 'gamify' && selectedLanguage !== 'English') {
        finalPrompt = `Respond in ${selectedLanguage}: ${finalPrompt}`;
    }

    try {
      // Use the new callGeminiApi function from aiService.js
      const text = await callGeminiApi(finalPrompt);
      setAiResponse(text);
    } catch (error) {
      console.error("Error generating content:", error);
      // The error message from aiService.js is already user-friendly
      setAiResponse("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setAiResponse('');
  };

  // Handles manual text input changing the prompt
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
                  {/* Removed icon span */}
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
              {/* Language Chooser Dropdown */}
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
                        {/* Removed icon span */}
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
                    // Use the icon directly from the featureCards array
                    const icon = card.icon;
                    const featureData = featureTranslations[selectedLanguage]?.[card.id] || card; // Fallback to card itself if translation not found

                    // Determine if the card is "under development"
                    const isUnderDevelopment = ['artify', 'adaptify', 'lensAI', 'readify'].includes(card.id);

                    return (
                      <button
                        key={card.id}
                        onClick={() => setCurrentView(card.id)}
                        className={`feature-card ${isUnderDevelopment ? 'under-development' : ''}`}
                      >
                        <span className="feature-card-icon">{icon}</span>
                        <h3>{featureData.name || featureData.title || card.id}</h3>
                        <p>{featureData.description || 'Description not available.'}</p>
                        {/* Conditionally show development status for remaining features */}
                        {isUnderDevelopment && (
                            <span className="development-status">
                                {/* Safely access the string before splitting, providing a fallback */}
                                {(currentViewTexts[`${card.id}UnderDevelopment`] || 'Under Development').split('.')[0]}
                            </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Feature-specific view
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

                {/* Conditional rendering for "under development" message */}
                {/* Removed 'gamify' from this check */}
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
                                : currentView === 'gamify' // Added gamify placeholder
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

                    {aiResponse && (
                      <div className="ai-response-container">
                        <h3>
                          {currentViewTexts.aiResponseHeading}
                           <button
                             onClick={handleCopyResponse}
                             className="copy-button"
                             title="Copy to Clipboard"
                           >
                             📋
                           </button>
                        </h3>
                        <p>{aiResponse}</p>
                      </div>
                    )}
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
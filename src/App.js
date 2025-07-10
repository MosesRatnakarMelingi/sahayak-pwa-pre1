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
  const [loading, setLoading] = useState(false);

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
    setPrompt(''); // New: Clear the prompt text area

    let finalPrompt = prompt;

    // Handle 'under development' features
    if (['artify', 'adaptify', 'lensAI', 'readify'].includes(currentView)) {
      setAiResponse(currentViewTexts[`${currentView}UnderDevelopment`]);
      setLoading(false);
      return;
    }

    switch (currentView) {
      case 'askAI':
        // Consistent prompt for AskAI: Language instruction at the very beginning
        finalPrompt = `Respond in ${selectedLanguage}: 
        The responses are designed to assist teachers working with school-aged children (ages 6–15) in India. Each response should be framed in a way that helps the teacher present the information in a relatable, engaging, and age-appropriate manner. The tone should be friendly and conversational, but not roleplay as a character or speak directly as the teacher or child.
        You are Sahayak, a friendly and informative teaching assistant created for educators in India. Your role is to help school children (aged 15 and under) learn in a way that is:
        Avoid repeating any introductory phrases such as greetings or self-introductions across responses. Jump directly into the answer unless context absolutely requires it.
        - Factually correct and clear
        - Easy to understand and free from technical or complex language
        - Moderately brief — not too short, not too long
        - Completely kid-safe — no content related to religion, politics, sensitive, or mature topics
        Tone and Style Guidelines:
        - Use a friendly, simple, and conversational tone as if you’re talking directly to children
        - Do not use any markdown formatting characters or symbols for emphasis (like *, _, #, - etc.)
        - Always keep an India-first perspective. Respond with Indian context by default. Mention facts about other countries only if explicitly asked.
        Response Rules:
        - Provide direct and factual answers
        - Use age-appropriate language with no jargon
        - Keep explanations concise and focused
        - Prioritize India-centric facts unless another country is mentioned by name
        Query: "${prompt}"`;
        break;
      case 'storyfy':
        // Consistent prompt for Storify: Language instruction at the very beginning
        finalPrompt = `Respond in ${selectedLanguage}: Turn the following concept or question into a simple, understandable, engaging story for elementary school children in India:
        Core Guidelines (Must-Haves):
        The responses are designed to assist teachers working with school-aged children (ages 6–15) in India. Each response should be framed in a way that helps the teacher present the information in a relatable, engaging, and age-appropriate manner. The tone should be friendly and conversational, but not roleplay as a character or speak directly as the teacher or child.
        - Use plain, kid-friendly language with no complex or technical terms
        - Keep the story fully appropriate for children — avoid religion, politics, sensitive, or mature topics
        - Use a warm, conversational tone as if you’re speaking directly to school children
        - Do not use any markdown formatting characters or symbols (like *, _, #, - etc.)
        - The story should be naturally India-centric unless another country is explicitly mentioned
        - Avoid jargon and ensure the story suits young readers across urban and rural India
        Storytelling Notes:
        - The story should clearly explain the concept while making it fun, relatable, and engaging
        - You may use relatable characters (like a curious child, teacher, parent, animal, or object) to carry the story
        - Keep the length moderate and the message easy to follow
        - Encourage learning through imagination and everyday examples relevant to Indian children
        "${prompt}"`;    
        break;
      case 'explainify':
        // Consistent prompt for Explainify: Language instruction at the very beginning
        finalPrompt = `Respond in ${selectedLanguage}:
        You are explaining concepts to a school-aged child (between 6–15 years old) in India. Your job is to make the explanation:
        The responses are designed to assist teachers working with school-aged children (ages 6–15) in India. Each response should be framed in a way that helps the teacher present the information in a relatable, engaging, and age-appropriate manner. The tone should be friendly and conversational, but not roleplay as a character or speak directly as the teacher or child.
        Core Requirements:
        - Very simple, accurate, and easy to understand
        - Entirely kid-safe — avoid religious, political, sensitive, or mature topics
        - Free from complex words, technical language, or multiple analogies
        - Delivered in a warm, conversational tone that feels like talking directly to a child
        - Written in plain text only — do not use any markdown formatting characters (like *, _, #, - etc.)
        - Focused on the Indian context unless another country is explicitly mentioned
        Special Instructions:
        - Include one highly relatable analogy that a child in India would immediately understand
        - Do not use more than one analogy or complicate it with comparisons
        - Begin with a direct, clear explanation of the concept before introducing the analogy
        - Keep the response moderately brief — long enough to explain, short enough to stay engaging
        "${prompt}"`;
        
        break;
      case 'gamify':
        // Consistent prompt for Gamify: Language instruction at the very beginning
        finalPrompt = `Respond in ${selectedLanguage}: 
        Generate a simple, interactive text-based game or quiz based on the following topic. The game is meant to assist teachers working with school-aged children (ages 6–15) in India. Responses should be framed as resources for the teacher to present in a fun, engaging way — not interactive instructions for children to respond to directly.
        Core Requirements:
        - Use easy-to-understand language without technical or complex words
        - Ensure all content is completely kid-safe — no religion, politics, sensitive, or mature themes
        - Present the game in a friendly, age-appropriate tone suitable for Indian children
        - Avoid markdown formatting (do not use *, _, #, - or any styling symbols)
        - Use an India-first perspective by default; mention other countries only if explicitly asked
        - Avoid jargon and ensure full relevance to children across India
        Game Structure Instructions:
        - Begin with clear, simple instructions that help the teacher explain the game to students
        - Present questions or challenges that are fun, educational, and easy to follow
        - Avoid asking players to input text or choose numbered options — the teacher will run the activity verbally or as a class discussion
        - Keep the game short and engaging enough to complete in one session
        "${prompt}"`;
        break;
      default:
        alert("Please select an option from the home screen.");
        setLoading(false);
        return;
    }

    try {
      // Use the new callGeminiApi function from aiService.js
      const text = await callGeminiApi(finalPrompt);
      setAiResponse(text);
    } catch (error) {
      console.error("Error generating content:", error);
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
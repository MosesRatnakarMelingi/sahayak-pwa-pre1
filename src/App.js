import React, { useState, useEffect, useRef } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { textModel } from './gemini';
// import { visionModel } from './gemini'; // Uncomment if you add multimodal capabilities for image input
import './App.css';

// --- START: GLOBAL/CONSTANT DATA DEFINITIONS (outside the App component) ---

const languageOptions = [
  { id: 'english', name: 'English', icon: '🇬🇧', langCode: 'en-US' },
  { id: 'hindi', name: 'हिंदी', icon: '🇮🇳', langCode: 'hi-IN' },
  { id: 'telugu', name: 'తెలుగు', icon: '🇮🇳', langCode: 'te-IN' },
  { id: 'tamil', name: 'தமிழ்', icon: '🇮🇳', langCode: 'ta-IN' },
  { id: 'kannada', name: 'ಕನ್ನಡ', icon: '🇮🇳', langCode: 'kn-IN' },
  { id: 'malayalam', name: 'മലയാളം', icon: '🇮🇳', langCode: 'ml-IN' },
  { id: 'bengali', name: 'বাংলা', icon: '🇮🇳', langCode: 'bn-IN' },
  { id: 'marathi', name: 'मराठी', icon: '🇮🇳', langCode: 'mr-IN' },
  { id: 'gujarati', name: 'ગુજરાતી', icon: '🇮🇳', langCode: 'gu-IN' },
  { id: 'punjabi', name: 'ਪੰਜਾਬੀ', icon: '🇮🇳', langCode: 'pa-IN' },
];

const featureCards = [
  { id: 'askAI', icon: '❓', title: 'AskAI', description: 'Get general queries or facts (India-focused).' },
  { id: 'storyfy', icon: '📖', title: 'Storyfy', description: 'Explain concepts simply as stories for kids.' },
  { id: 'explainify', icon: '💡', title: 'Explainify', description: 'Get concise, simple explanations with easy analogies.' },
  { id: 'gamify', icon: '🎮', title: 'Gamify', description: 'Generate simple, text-based games from any lesson or topic.' },
  { id: 'artify', icon: '🎨', title: 'Artify', description: 'Generate simple instructions for line drawings or charts from your descriptions.' },
  { id: 'adaptify', icon: '📝', title: 'Adaptify', description: 'Upload content (e.g., textbook page photo) to generate differentiated materials for various grade levels.' },
  { id: 'lensAI', icon: '🔍', title: 'LensAI', description: 'Upload diagrams or charts for AI-powered explanations of their components and concepts.' },
  { id: 'readify', icon: '🎧', title: 'Readify', description: 'Assess student reading fluency and pronunciation.' },
];

// --- END: GLOBAL/CONSTANT DATA DEFINITIONS ---

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

  // --- START: TRANSLATIONS (updated for cleaner titles) ---
  const translations = {
    english: {
      appName: "Sahayak",
      welcome: "Welcome",
      signIn: "Sign In with Google",
      signOut: "Sign Out",
      selectLanguage: "Select Your Language",
      saveSelection: "Save Selection",
      backToDashboard: "Back to Dashboard",
      signInMessage: "Please sign in to start using Sahayak.",
      dashboardTitle: "How can Sahayak help you today?",
      askAI: {
        title: "AskAI", // Clean title
        description: "Get general queries or facts (India-focused).",
        inputPlaceholder: "Ask anything about India (e.g., 'What are the main rivers in Karnataka?')",
        generateButton: "Generate Response",
        clearButton: "Clear",
        aiResponseHeading: "AI Response:",
        generating: "Generating...",
      },
      storyfy: {
        title: "Storyfy", // Clean title
        description: "Explain concepts simply as stories for kids.",
        inputPlaceholder: "Create a story about (e.g., 'the water cycle for 3rd graders')",
        generateButton: "Generate Story",
        clearButton: "Clear",
        aiResponseHeading: "Generated Story:",
        generating: "Generating...",
      },
      explainify: {
        title: "Explainify", // Clean title
        description: "Get concise, simple explanations with easy analogies.",
        inputPlaceholder: "Explain (e.g., 'Why is the sky blue?' to a 5-year-old)",
        generateButton: "Explain",
        clearButton: "Clear",
        aiResponseHeading: "Explanation:",
        generating: "Explaining...",
      },
      gamify: {
        title: "Gamify", // Clean title, underDevelopment property is separate
        description: "Generate simple, text-based games from any lesson or topic.",
        underDevelopment: "This feature is currently under development. Stay tuned for updates!",
      },
      artify: {
        title: "Artify", // Clean title
        description: "Generate simple instructions for line drawings or charts from your descriptions.",
        underDevelopment: "This feature is currently under development. Stay tuned for updates!",
      },
      adaptify: {
        title: "Adaptify", // Clean title
        description: "Upload content (e.g., textbook page photo) to generate differentiated materials for various grade levels.",
        underDevelopment: "This feature is currently under development. Stay tuned for updates!",
      },
      lensAI: {
        title: "LensAI", // Clean title
        description: "Upload diagrams or charts for AI-powered explanations of their components and concepts.",
        underDevelopment: "This feature is currently under development. Stay tuned for updates!",
      },
      readify: {
        title: "Readify", // Clean title
        description: "Upload student audio recordings to assess reading fluency and pronunciation. This feature will use advanced speech-to-text and AI analysis to provide feedback.",
        inputPlaceholder: "Upload audio file...",
        generateButton: "Analyze Audio",
        clearButton: "Clear",
        aiResponseHeading: "Assessment Results:",
        generating: "Analyzing...",
        underDevelopment: "This feature is currently under development. Stay tuned for updates!",
      },
    },
    // Add other languages here following the same structure, ensuring titles are clean
    hindi: {
      appName: "सहायक",
      welcome: "स्वागत है",
      signIn: "गूगल से साइन इन करें",
      signOut: "साइन आउट करें",
      selectLanguage: "अपनी भाषा चुनें",
      saveSelection: "चयन सहेजें",
      backToDashboard: "डैशबोर्ड पर वापस",
      signInMessage: "सहायक का उपयोग शुरू करने के लिए कृपया साइन इन करें।",
      dashboardTitle: "सहायक आज आपकी कैसे मदद कर सकता है?",
      askAI: {
        title: "आस्कएआई",
        description: "सामान्य प्रश्न या तथ्य प्राप्त करें (भारत-केंद्रित)।",
        inputPlaceholder: "भारत के बारे में कुछ भी पूछें (उदाहरण: 'कर्नाटक की मुख्य नदियाँ कौन सी हैं?')",
        generateButton: "प्रतिक्रिया उत्पन्न करें",
        clearButton: "स्पष्ट करें",
        aiResponseHeading: "एआई प्रतिक्रिया:",
        generating: "उत्पन्न हो रहा है...",
      },
      storyfy: {
        title: "स्टोरीफ़ाई",
        description: "अवधारणाओं को बच्चों के लिए कहानियों के रूप में समझाएं।",
        inputPlaceholder: "एक कहानी बनाएं (उदाहरण: 'तीसरी कक्षा के बच्चों के लिए जल चक्र के बारे में')",
        generateButton: "कहानी उत्पन्न करें",
        clearButton: "स्पष्ट करें",
        aiResponseHeading: "उत्पन्न कहानी:",
        generating: "उत्पन्न हो रहा है...",
      },
      explainify: {
        title: "एक्सप्लेनिफ़ाई",
        description: "सरल उपमाओं के साथ संक्षिप्त, सरल स्पष्टीकरण प्राप्त करें।",
        inputPlaceholder: "समझाएं (उदाहरण: 'आकाश नीला क्यों है?' 5 साल के बच्चे को)",
        generateButton: "समझाएं",
        clearButton: "स्पष्ट करें",
        aiResponseHeading: "स्पष्टीकरण:",
        generating: "समझा रहा है...",
      },
      gamify: {
        title: "गेमिफ़ाई", // Clean title
        description: "किसी भी पाठ या विषय से सरल, पाठ-आधारित गेम बनाएं।",
        underDevelopment: "यह सुविधा वर्तमान में विकास अधीन है। अपडेट के लिए बने रहें!",
      },
      artify: {
        title: "आर्टिफ़ाई", // Clean title
        description: "अपने विवरण से सरल रेखाचित्रों या चार्टों के लिए निर्देश उत्पन्न करें।",
        underDevelopment: "यह सुविधा वर्तमान में विकास अधीन है। अपडेट के लिए बने रहें!",
      },
      adaptify: {
        title: "अनुकूलन करें", // Clean title
        description: "विभिन्न ग्रेड स्तरों के लिए भिन्न सामग्री उत्पन्न करने के लिए सामग्री (उदाहरण: पाठ्यपुस्तक पृष्ठ फोटो) अपलोड करें।",
        underDevelopment: "यह सुविधा वर्तमान में विकास अधीन है। अपडेट के लिए बने रहें!",
      },
      lensAI: {
        title: "लेंसएआई", // Clean title
        description: "आरेख या चार्ट अपलोड करें ताकि उनके घटकों और अवधारणाओं के एआई-पावर्ड स्पष्टीकरण मिल सकें।",
        underDevelopment: "यह सुविधा वर्तमान में विकास अधीन है। अपडेट के लिए बने रहें!",
      },
      readify: {
        title: "रीडिफ़ाई", // Clean title
        description: "पढ़ने की प्रवाह और उच्चारण का आकलन करने के लिए छात्र ऑडियो रिकॉर्डिंग अपलोड करें। यह सुविधा प्रतिक्रिया प्रदान करने के लिए उन्नत स्पीच-टू-टेक्स्ट और एआई विश्लेषण का उपयोग करेगी।",
        inputPlaceholder: "ऑडियो फ़ाइल अपलोड करें...",
        generateButton: "ऑडियो का विश्लेषण करें",
        clearButton: "स्पष्ट करें",
        aiResponseHeading: "मूल्यांकन के परिणाम:",
        generating: "विश्लेषण हो रहा है...",
        underDevelopment: "यह सुविधा वर्तमान में विकास अधीन है। अपडेट के लिए बने रहें!",
      },
    },
    // TELUGU
    telugu: {
      appName: "సహాయక్",
      welcome: "స్వాగతం",
      signIn: "Google తో సైన్ ఇన్ చేయండి",
      signOut: "సైన్ అవుట్ చేయండి",
      selectLanguage: "మీ భాషను ఎంచుకోండి",
      saveSelection: "ఎంపికను సేవ్ చేయండి",
      backToDashboard: "డాష్‌బోర్డ్‌కు తిరిగి వెళ్ళు",
      signInMessage: "సహాయక్ ఉపయోగించడం ప్రారంభించడానికి దయచేసి సైన్ ఇన్ చేయండి.",
      dashboardTitle: "సహాయక్ ఈ రోజు మీకు ఎలా సహాయం చేయగలదు?",
      askAI: {
        title: "ఆస్క్‌ఎఐ",
        description: "సాధారణ ప్రశ్నలు లేదా వాస్తవాలను పొందండి (భారతదేశం-కేంద్రీకృత).",
        inputPlaceholder: "భారతదేశం గురించి ఏదైనా అడగండి (ఉదా: 'కర్ణాటకలోని ప్రధాన నదులు ఏవి?')",
        generateButton: "ప్రతిస్పందనను రూపొందించండి",
        clearButton: "క్లియర్ చేయండి",
        aiResponseHeading: "AI ప్రతిస్పందన:",
        generating: "ఉత్పన్నం అవుతోంది...",
      },
      storyfy: {
        title: "స్టోరీఫై",
        description: "పిల్లల కోసం కథలుగా భావనలను సులభంగా వివరించండి.",
        inputPlaceholder: "గురించి ఒక కథను సృష్టించండి (ఉదా: '3వ తరగతి విద్యార్థుల కోసం జల చక్రం గురించి')",
        generateButton: "కథను రూపొందించండి",
        clearButton: "క్లియర్ చేయండి",
        aiResponseHeading: "రూపొందించబడిన కథ:",
        generating: "ఉత్పన్నం అవుతోంది...",
      },
      explainify: {
        title: "ఎక్స్‌ప్లెయిన్‌ఫై",
        description: "సులభమైన పోలికలతో సంక్షిప్త, సరళమైన వివరణలను పొందండి.",
        inputPlaceholder: "వివరించండి (ఉదా: 'ఆకాశం నీలం రంగులో ఎందుకు ఉంటుంది?' 5 సంవత్సరాల పిల్లవాడికి)",
        generateButton: "వివరించండి",
        clearButton: "క్లియర్ చేయండి",
        aiResponseHeading: "వివరణ:",
        generating: "వివరిస్తోంది...",
      },
      gamify: {
        title: "గేమిఫై", // Clean title
        description: "ఏదైనా పాఠం లేదా అంశం నుండి సాధారణ, టెక్స్ట్ ఆధారిత గేమ్‌లను రూపొందించండి.",
        underDevelopment: "ఈ ఫీచర్ ప్రస్తుతం అభివృద్ధిలో ఉంది. అప్‌డేట్‌ల కోసం చూస్తూ ఉండండి!",
      },
      artify: {
        title: "ఆర్టిఫై", // Clean title
        description: "మీ వివరణల నుండి లైన్ డ్రాయింగ్‌లు లేదా చార్ట్‌ల కోసం సాధారణ సూచనలను రూపొందించండి.",
        underDevelopment: "ఈ ఫీచర్ ప్రస్తుతం అభివృద్ధిలో ఉంది. అప్‌డేట్‌ల కోసం చూస్తూ ఉండండి!",
      },
      adaptify: {
        title: "అడాప్టిఫై", // Clean title
        description: "వివిధ గ్రేడ్ స్థాయిల కోసం భిన్నమైన పదార్థాలను రూపొందించడానికి కంటెంట్‌ను (ఉదా: పాఠ్యపుస్తక పేజీ ఫోటో) అప్‌లోడ్ చేయండి.",
        underDevelopment: "ఈ ఫీచర్ ప్రస్తుతం అభివృద్ధిలో ఉంది. అప్‌డేట్‌ల కోసం చూస్తూ ఉండండి!",
      },
      lensAI: {
        title: "లెన్స్ఎఐ", // Clean title
        description: "డయాగ్రామ్‌లు లేదా చార్ట్‌లను అప్‌లోడ్ చేయండి, వాటి భాగాలు మరియు భావనల గురించి AI-శక్తితో వివరణల కోసం.",
        underDevelopment: "ఈ ఫీచర్ ప్రస్తుతం అభివృద్ధిలో ఉంది. అప్‌డేట్‌ల కోసం చూస్తూ ఉండండి!",
      },
      readify: {
        title: "రీడిఫై", // Clean title
        description: "చదువుతున్న వేగం మరియు ఉచ్చారణను అంచనా వేయడానికి విద్యార్థుల ఆడియో రికార్డింగ్‌లను అప్‌లోడ్ చేయండి. ఈ ఫీచర్ అభిప్రాయాన్ని అందించడానికి అధునాతన స్పీచ్-టు-టెక్స్ట్ మరియు AI విశ్లేషణను ఉపయోగిస్తుంది.",
        inputPlaceholder: "ఆడియో ఫైల్ అప్‌లోడ్ చేయండి...",
        generateButton: "ఆడియోను విశ్లేషించండి",
        clearButton: "క్లియర్ చేయండి",
        aiResponseHeading: "అంచనా ఫలితాలు:",
        generating: "విశ్లేషిస్తోంది...",
        underDevelopment: "ఈ ఫీచర్ ప్రస్తుతం అభివృద్ధిలో ఉంది. అప్‌డేట్‌ల కోసం చూస్తూ ఉండండి!",
      },
    },
    // TAMIL
    tamil: {
      appName: "சஹாயக்",
      welcome: "வரவேற்பு",
      signIn: "Google உடன் உள்நுழைக",
      signOut: "வெளியேறு",
      selectLanguage: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
      saveSelection: "தேர்வைச் சேமி",
      backToDashboard: "டாஷ்போர்டுக்குத் திரும்பு",
      signInMessage: "சஹாயக்கைப் பயன்படுத்தத் தொடங்க Google உடன் உள்நுழையவும்.",
      dashboardTitle: "இன்று சஹாயக் உங்களுக்கு எப்படி உதவ முடியும்?",
      askAI: {
        title: "ஆஸ்க்ஏஐ",
        description: "பொதுவான கேள்விகள் அல்லது உண்மைகளைப் பெறுங்கள் (இந்தியா-மையப்படுத்தப்பட்டது).",
        inputPlaceholder: "இந்தியா பற்றி எதையாவது கேளுங்கள் (எ.கா., 'கர்நாடகாவில் உள்ள முக்கிய நதிகள் யாவை?')",
        generateButton: "பதிலைத் உருவாக்கு",
        clearButton: "அழி",
        aiResponseHeading: "AI பதில்:",
        generating: "உருவாக்குகிறது...",
      },
      storyfy: {
        title: "ஸ்டோரிஃபை",
        description: "குழந்தைகளுக்கான கதைகளாக கருத்துக்களை எளிமையாக விளக்குங்கள்.",
        inputPlaceholder: "பற்றி ஒரு கதையை உருவாக்குங்கள் (எ.கா., '3 ஆம் வகுப்பு மாணவர்களுக்கான நீர் சுழற்சி பற்றி')",
        generateButton: "கதையை உருவாக்கு",
        clearButton: "அழி",
        aiResponseHeading: "உருவாக்கப்பட்ட கதை:",
        generating: "உருவாக்குகிறது...",
      },
      explainify: {
        title: "விளக்கு (Explainify)",
        description: "எளிதான ஒப்புமைகளுடன் சுருக்கமான, எளிய விளக்கங்களைப் பெறுங்கள்.",
        inputPlaceholder: "விளக்கவும் (எ.கா., 'வானம் ஏன் நீலமாக இருக்கிறது?' ஒரு 5 வயது குழந்தைக்கு)",
        generateButton: "விளக்கு",
        clearButton: "அழி",
        aiResponseHeading: "விளக்கம்:",
        generating: "விளக்குகிறது...",
      },
      gamify: {
        title: "கேமிஃபை", // Clean title
        description: "எந்தவொரு பாடம் அல்லது தலைப்பிலிருந்தும் எளிய, உரை அடிப்படையிலான கேம்களை உருவாக்குங்கள்.",
        underDevelopment: "இந்த அம்சம் தற்போது மேம்பாட்டில் உள்ளது. புதுப்பிப்புகளுக்கு காத்திருங்கள்!",
      },
      artify: {
        title: "ஆர்ட்டிஃபை", // Clean title
        description: "உங்கள் விளக்கங்களிலிருந்து எளிய கோட்டுப்படங்கள் அல்லது விளக்கப்படங்களுக்கான வழிமுறைகளை உருவாக்குங்கள்.",
        underDevelopment: "இந்த அம்சம் தற்போது மேம்பாட்டில் உள்ளது. புதுப்பிப்புகளுக்கு காத்திருங்கள்!",
      },
      adaptify: {
        title: "அடாப்டிஃபை", // Clean title
        description: "பல்வேறு வகுப்பு நிலைகளுக்கான வேறுபட்ட பொருட்களை உருவாக்க உள்ளடக்கத்தைப் (எ.கா., பாடநூல் பக்க புகைப்படம்) பதிவேற்றவும்.",
        underDevelopment: "இந்த அம்சம் தற்போது மேம்பாட்டில் உள்ளது. புதுப்பிப்புகளுக்கு காத்திருங்கள்!",
      },
      lensAI: {
        title: "லென்ஸ்ஏஐ", // Clean title
        description: "வரைபடங்கள் அல்லது விளக்கப்படங்களைப் பதிவேற்றுங்கள், அவற்றின் கூறுகள் மற்றும் கருத்துகளின் AI-இயங்கும் விளக்கங்களுக்கு.",
        underDevelopment: "இந்த அம்சம் தற்போது மேம்பாட்டில் உள்ளது. புதுப்பிப்புகளுக்கு காத்திருங்கள்!",
      },
      readify: {
        title: "ரீடிஃபை", // Clean title
        description: "மாணவர்களின் வாசிப்பு சரளம் மற்றும் உச்சரிப்பை மதிப்பிடுவதற்கு மாணவர்களின் ஆடியோ பதிவுகளைப் பதிவேற்றவும். இந்த அம்சம் கருத்துக்களை வழங்க மேம்பட்ட பேச்சு-உரை மற்றும் AI பகுப்பாய்வைப் பயன்படுத்தும்.",
        inputPlaceholder: "ஆடியோ கோப்பை பதிவேற்றவும்...",
        generateButton: "ஆடியோவை பகுப்பாய்வு செய்",
        clearButton: "அழி",
        aiResponseHeading: "மதிப்பீட்டு முடிவுகள்:",
        generating: "பகுப்பாய்வு செய்கிறது...",
        underDevelopment: "இந்த அம்சம் தற்போது மேம்பாட்டில் உள்ளது. புதுப்பிப்புகளுக்கு காத்திருங்கள்!",
      },
    },
    // KANNADA
    kannada: {
      appName: "ಸಹಾಯಕ್",
      welcome: "ಸ್ವಾಗತ",
      signIn: "Google ನೊಂದಿಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ",
      signOut: "ಸೈನ್ ಔಟ್ ಮಾಡಿ",
      selectLanguage: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      saveSelection: "ಆಯ್ಕೆಯನ್ನು ಉಳಿಸಿ",
      backToDashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ",
      signInMessage: "ಸಹಾಯಕ್ ಬಳಸಲು ಪ್ರಾರಂಭಿಸಲು ದಯವಿಟ್ಟು ಸೈನ್ ಇನ್ ಮಾಡಿ.",
      dashboardTitle: "ಸಹಾಯಕ್ ಇಂದು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
      askAI: {
        title: "ಆಸ್ಕ್‌ಎಐ",
        description: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು ಅಥವಾ ಸಂಗತಿಗಳನ್ನು ಪಡೆಯಿರಿ (ಭಾರತ-ಕೇಂದ್ರಿತ).",
        inputPlaceholder: "ಭಾರತದ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ (ಉದಾ: 'ಕರ್ನಾಟಕದ ಮುಖ್ಯ ನದಿಗಳು ಯಾವುವು?')",
        generateButton: "ಪ್ರತಿಕ್ರಿಯೆ ರಚಿಸಿ",
        clearButton: "ತೆರವುಗೊಳಿಸಿ",
        aiResponseHeading: "AI ಪ್ರತಿಕ್ರಿಯೆ:",
        generating: "ರಚಿಸಲಾಗುತ್ತಿದೆ...",
      },
      storyfy: {
        title: "ಸ್ಟೋರಿಫೈ",
        description: "ಮಕ್ಕಳಿಗಾಗಿ ಕಥೆಗಳ ರೂಪದಲ್ಲಿ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ಸರಳವಾಗಿ ವಿವರಿಸಿ.",
        inputPlaceholder: "ಬಗ್ಗೆ ಒಂದು ಕಥೆಯನ್ನು ರಚಿಸಿ (ಉದಾ: '3ನೇ ತರಗತಿಯ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಜಲಚಕ್ರದ ಬಗ್ಗೆ')",
        generateButton: "ಕಥೆ ರಚಿಸಿ",
        clearButton: "ತೆರವುಗೊಳಿಸಿ",
        aiResponseHeading: "ರಚಿಸಲಾದ ಕಥೆ:",
        generating: "ರಚಿಸಲಾಗುತ್ತಿದೆ...",
      },
      explainify: {
        title: "ಎಕ್ಸ್‌ಪ್ಲೈನ್‌ಫೈ",
        description: "ಸುಲಭವಾದ ಹೋಲಿಕೆಗಳೊಂದಿಗೆ ಸಂಕ್ಷಿಪ್ತ, ಸರಳ ವಿವರಣೆಗಳನ್ನು ಪಡೆಯಿರಿ.",
        inputPlaceholder: "ವಿವರಿಸಿ (ಉದಾ: 'ಆಕಾಶ ಏಕೆ ನೀಲಿ ಬಣ್ಣದ್ದಾಗಿದೆ?' 5 ವರ್ಷದ ಮಗುವಿಗೆ)",
        generateButton: "ವಿವರಿಸಿ",
        clearButton: "ತೆರವುಗೊಳಿಸಿ",
        aiResponseHeading: "ವಿವರಣೆ:",
        generating: "ವಿವರಿಸಲಾಗುತ್ತಿದೆ...",
      },
      gamify: {
        title: "ಗೇಮಿಫೈ", // Clean title
        description: "ಯಾವುದೇ ಪಾಠ ಅಥವಾ ವಿಷಯದಿಂದ ಸರಳ, ಪಠ್ಯ ಆಧಾರಿತ ಆಟಗಳನ್ನು ರಚಿಸಿ.",
        underDevelopment: "ಈ ವೈಶಿಷ್ಟ್ಯವು ಪ್ರಸ್ತುತ ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ. ನವೀಕರಣಗಳಿಗಾಗಿ ಕಾಯಿರಿ!",
      },
      artify: {
        title: "ಆರ್ಟಿಫೈ", // Clean title
        description: "ನಿಮ್ಮ ವಿವರಣೆಗಳಿಂದ ಸರಳ ರೇಖಾಚಿತ್ರಗಳು ಅಥವಾ ಚಾರ್ಟ್‌ಗಳಿಗಾಗಿ ಸೂಚನೆಗಳನ್ನು ರಚಿಸಿ.",
        underDevelopment: "ಈ ವೈಶಿಷ್ಟ್ಯವು ಪ್ರಸ್ತುತ ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ. ನವೀಕರಣಗಳಿಗಾಗಿ ಕಾಯಿರಿ!",
      },
      adaptify: {
        title: "ಅಡಾಪ್ಟಿಫೈ", // Clean title
        description: "ವಿವಿಧ ದರ್ಜೆಯ ಮಟ್ಟಗಳಿಗಾಗಿ ಭಿನ್ನವಾದ ವಸ್ತುಗಳನ್ನು ರಚಿಸಲು ವಿಷಯವನ್ನು (ಉದಾ: ಪಠ್ಯಪುಸ್ತಕ ಪುಟದ ಫೋಟೋ) ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
        underDevelopment: "ಈ ವೈಶಿಷ್ಟ್ಯವು ಪ್ರಸ್ತುತ ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ. ನವೀಕರಣಗಳಿಗಾಗಿ ಕಾಯಿರಿ!",
      },
      lensAI: {
        title: "ಲೆನ್ಸ್ಎಐ", // Clean title
        description: "ರೇಖಾಚಿತ್ರಗಳು ಅಥವಾ ಚಾರ್ಟ್‌ಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ, ಅವುಗಳ ಘಟಕಗಳು ಮತ್ತು ಪರಿಕಲ್ಪನೆಗಳ AI-ಚಾಲಿತ ವಿವರಣೆಗಳಿಗಾಗಿ.",
        underDevelopment: "ಈ ವೈಶಿಷ್ಟ್ಯವು ಪ್ರಸ್ತುತ ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ. ನವೀಕರಣಗಳಿಗಾಗಿ ಕಾಯಿರಿ!",
      },
      readify: {
        title: "ರೀಡಿಫೈ", // Clean title
        description: "ವಿದ್ಯಾರ್ಥಿಯ ಓದುವ fluency ಮತ್ತು ಉಚ್ಚಾರಣೆಯನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಲು ವಿದ್ಯಾರ್ಥಿ ಆಡಿಯೋ ರೆಕಾರ್ಡಿಂಗ್‌ಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. ಈ ವೈಶಿಷ್ಟ್ಯವು ಪ್ರತಿಕ್ರಿಯೆ ನೀಡಲು ಸುಧಾರಿತ ಸ್ಪೀಚ್-ಟು-ಟೆಕ್ಸ್ಟ್ ಮತ್ತು AI ವಿಶ್ಲೇಷಣೆಯನ್ನು ಬಳಸುತ್ತದೆ.",
        inputPlaceholder: "ಆಡಿಯೋ ಫೈಲ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ...",
        generateButton: "ಆಡಿಯೋ ವಿಶ್ಲೇಷಿಸಿ",
        clearButton: "ತೆರವುಗೊಳಿಸಿ",
        aiResponseHeading: "ಮೌಲ್ಯಮಾಪನ ಫಲಿತಾಂಶಗಳು:",
        generating: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
        underDevelopment: "ಈ ವೈಶಿಷ್ಟ್ಯವು ಪ್ರಸ್ತುತ ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ. ನವೀಕರಣಗಳಿಗಾಗಿ ಕಾಯಿರಿ!",
      },
    },
    // MALAYALAM
    malayalam: {
      appName: "സഹായക്",
      welcome: "സ്വാഗതം",
      signIn: "Google ഉപയോഗിച്ച് സൈൻ ഇൻ ചെയ്യുക",
      signOut: "സൈൻ ഔട്ട് ചെയ്യുക",
      selectLanguage: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക",
      saveSelection: "തിരഞ്ഞെടുക്കൽ സംരക്ഷിക്കുക",
      backToDashboard: "ഡാഷ്‌ബോർഡിലേക്ക് തിരികെ പോകുക",
      signInMessage: "സഹായക് ഉപയോഗിക്കാൻ തുടങ്ങാൻ ദയവായി സൈൻ ഇൻ ചെയ്യുക.",
      dashboardTitle: "സഹായകിന് ഇന്ന് നിങ്ങളെ എങ്ങനെ സഹായിക്കാൻ കഴിയും?",
      askAI: {
        title: "ആസ്ക്എഐ",
        description: "പൊതുവായ ചോദ്യങ്ങളോ വസ്തുതകളോ നേടുക (ഇന്ത്യ-അധിഷ്ഠിതം).",
        inputPlaceholder: "ഇന്ത്യയെക്കുറിച്ച് എന്തെങ്കിലും ചോദിക്കുക (ഉദാ: 'കർണ്ണാടകയിലെ പ്രധാന നദികൾ ഏവ?')",
        generateButton: "പ്രതികരണം സൃഷ്ടിക്കുക",
        clearButton: "മായ്ക്കുക",
        aiResponseHeading: "AI പ്രതികരണം:",
        generating: "സൃഷ്ടിക്കുന്നു...",
      },
      storyfy: {
        title: "സ്റ്റോറിഫൈ",
        description: "കുട്ടികൾക്കായി ലളിതമായ കഥകളായി ആശയങ്ങൾ വിശദീകരിക്കുക.",
        inputPlaceholder: "ഒരു കഥ ഉണ്ടാക്കുക (ഉദാ: 'മൂന്നാം ക്ലാസിലെ കുട്ടികൾക്ക് ജലചക്രത്തെക്കുറിച്ച്')",
        generateButton: "കഥ സൃഷ്ടിക്കുക",
        clearButton: "മായ്ക്കുക",
        aiResponseHeading: "സൃഷ്ടിച്ച കഥ:",
        generating: "സൃഷ്ടിക്കുന്നു...",
      },
      explainify: {
        title: "എക്സ്പ്ലൈനിഫൈ",
        description: "ലളിതമായ ഉദാഹരണങ്ങളോടുകൂടിയ സംക്ഷിപ്തവും ലളിതവുമായ വിശദീകരണങ്ങൾ നേടുക.",
        inputPlaceholder: "വിശദീകരിക്കുക (ഉദാ: 'ആകാശം നീലയായിരിക്കുന്നത് എന്തുകൊണ്ട്?' ഒരു 5 വയസ്സുകാരനോട്)",
        generateButton: "വിശദീകരിക്കുക",
        clearButton: "മായ്ക്കുക",
        aiResponseHeading: "വിശദീകരണം:",
        generating: "വിശദീകരിക്കുന്നു...",
      },
      gamify: {
        title: "ഗെയിംയിഫൈ", // Clean title
        description: "ഏത് പാഠത്തിൽ നിന്നോ വിഷയത്തിൽ നിന്നോ ലളിതമായ, ടെക്സ്റ്റ് അധിഷ്ഠിത ഗെയിമുകൾ സൃഷ്ടിക്കുക.",
        underDevelopment: "ഈ ഫീച്ചർ നിലവിൽ വികസനത്തിലാണ്. അപ്‌ഡേറ്റുകൾക്കായി കാത്തിരിക്കുക!",
      },
      artify: {
        title: "ആർട്ടിഫൈ", // Clean title
        description: "നിങ്ങളുടെ വിവരണങ്ങളിൽ നിന്ന് ലളിതമായ രേഖാചിത്രങ്ങളോ ചാർട്ടുകളോ ഉണ്ടാക്കുന്നതിനുള്ള നിർദ്ദേശങ്ങൾ സൃഷ്ടിക്കുക.",
        underDevelopment: "ഈ ഫീച്ചർ നിലവിൽ വികസനത്തിലാണ്. അപ്‌ഡേറ്റുകൾക്കായി കാത്തിരിക്കുക!",
      },
      adaptify: {
        title: "അഡാപ്റ്റിഫൈ", // Clean title
        description: "വിവിധ ഗ്രേഡ് തലങ്ങൾക്കായി വ്യത്യസ്തമായ പഠന സാമഗ്രികൾ ഉണ്ടാക്കുന്നതിന് ഉള്ളടക്കം (ഉദാ: പാഠപുസ്തക പേജിന്റെ ഫോട്ടോ) അപ്‌ലോഡ് ചെയ്യുക.",
        underDevelopment: "ഈ ഫീച്ചർ നിലവിൽ വികസനത്തിലാണ്. അപ്‌ഡേറ്റുകൾക്കായി കാത്തിരിക്കുക!",
      },
      lensAI: {
        title: "ലെൻസ്എഐ", // Clean title
        description: "രേഖാചിത്രങ്ങളോ ചാർട്ടുകളോ അപ്‌ലോഡ് ചെയ്യുക, അവയുടെ ഘടകങ്ങളെയും ആശയങ്ങളെയും കുറിച്ചുള്ള AI-അധിഷ്ഠിത വിശദീകരണങ്ങൾക്കായി.",
        underDevelopment: "ഈ ഫീച്ചർ നിലവിൽ വികസനത്തിലാണ്. അപ്‌ഡേറ്റുകൾക്കായി കാത്തിരിക്കുക!",
      },
      readify: {
        title: "റീഡിഫൈ", // Clean title
        description: "വിദ്യാർത്ഥികളുടെ വായനയുടെ ഒഴുക്കും ഉച്ചാരണവും വിലയിരുത്താൻ വിദ്യാർത്ഥി ഓഡിയോ റെക്കോർഡിംഗുകൾ അപ്‌ലോഡ് ചെയ്യുക. ഈ ഫീച്ചർ പ്രതികരണം നൽകുന്നതിന് നൂതന സ്പീച്ച്-ടു-ടെക്സ്റ്റ്, AI വിശകലനം എന്നിവ ഉപയോഗിക്കും.",
        inputPlaceholder: "ഓഡിയോ ഫയൽ അപ്‌ലോഡ് ചെയ്യുക...",
        generateButton: "ഓഡിയോ വിശകലനം ചെയ്യുക",
        clearButton: "മായ്ക്കുക",
        aiResponseHeading: "വിലയിരുത്തൽ ഫലങ്ങൾ:",
        generating: "വിശകലനം ചെയ്യുന്നു...",
        underDevelopment: "ഈ ഫീച്ചർ നിലവിൽ വികസനത്തിലാണ്. അപ്‌ഡേറ്റുകൾക്കായി കാത്തിരിക്കുക!",
      },
    },
    // BENGALI
    bengali: {
      appName: "সহায়ক",
      welcome: "স্বাগতম",
      signIn: "Google দিয়ে সাইন ইন করুন",
      signOut: "সাইন আউট করুন",
      selectLanguage: "আপনার ভাষা নির্বাচন করুন",
      saveSelection: "নির্বাচন সংরক্ষণ করুন",
      backToDashboard: "ড্যাশবোর্ডে ফিরে যান",
      signInMessage: "সহায়ক ব্যবহার শুরু করতে দয়া করে সাইন ইন করুন।",
      dashboardTitle: "সহায়ক আজ আপনাকে কিভাবে সাহায্য করতে পারে?",
      askAI: {
        title: "আস্কএআই",
        description: "সাধারণ প্রশ্ন বা তথ্য পান (ভারত-কেন্দ্রিক)।",
        inputPlaceholder: "ভারত সম্পর্কে কিছু জিজ্ঞাসা করুন (যেমন, 'কর্ণাটকের প্রধান নদীগুলি কী কী?')",
        generateButton: "প্রতিক্রিয়া তৈরি করুন",
        clearButton: "পরিষ্কার করুন",
        aiResponseHeading: "এআই প্রতিক্রিয়া:",
        generating: "তৈরি হচ্ছে...",
      },
      storyfy: {
        title: "স্টোরিফাই",
        description: "শিশুদের জন্য গল্প হিসাবে ধারণাগুলি সহজভাবে ব্যাখ্যা করুন।",
        inputPlaceholder: "সম্পর্কে একটি গল্প তৈরি করুন (যেমন, 'তৃতীয় শ্রেণির শিক্ষার্থীদের জন্য জলচক্র সম্পর্কে')",
        generateButton: "গল্প তৈরি করুন",
        clearButton: "পরিষ্কার করুন",
        aiResponseHeading: "তৈরি করা গল্প:",
        generating: "তৈরি হচ্ছে...",
      },
      explainify: {
        title: "এক্সপ্লেইনিফাই",
        description: "সহজ উপমা সহ সংক্ষিপ্ত, সরল ব্যাখ্যা পান।",
        inputPlaceholder: "ব্যাখ্যা করুন (যেমন, 'আকাশ নীল কেন?' 5 বছরের শিশুকে)",
        generateButton: "ব্যাখ্যা করুন",
        clearButton: "পরিষ্কার করুন",
        aiResponseHeading: "ব্যাখ্যা:",
        generating: "ব্যাখ্যা করছে...",
      },
      gamify: {
        title: "গ্যামিফাই", // Clean title
        description: "যে কোনও পাঠ বা বিষয় থেকে সরল, পাঠ্য-ভিত্তিক গেম তৈরি করুন।",
        underDevelopment: "এই বৈশিষ্ট্যটি বর্তমানে উন্নয়নাধীন। আপডেটের জন্য সাথে থাকুন!",
      },
      artify: {
        title: "আর্টিফাই", // Clean title
        description: "আপনার বর্ণনা থেকে সরল রেখাচিত্র বা চার্ট তৈরির নির্দেশাবলী তৈরি করুন।",
        underDevelopment: "এই বৈশিষ্ট্যটি বর্তমানে উন্নয়নাধীন। আপডেটের জন্য সাথে থাকুন!",
      },
      adaptify: {
        title: "অ্যাডাপ্টিফাই", // Clean title
        description: "বিভিন্ন গ্রেড স্তরের জন্য ভিন্ন ভিন্ন উপকরণ তৈরি করতে বিষয়বস্তু (যেমন, পাঠ্যপুস্তকের পৃষ্ঠার ছবি) আপলোড করুন।",
        underDevelopment: "এই বৈশিষ্ট্যটি বর্তমানে উন্নয়নাধীন। আপডেটের জন্য সাথে থাকুন!",
      },
      lensAI: {
        title: "লেন্সএআই", // Clean title
        description: "ডায়াগ্রাম বা চার্ট আপলোড করুন, তাদের উপাদান এবং ধারণাগুলির AI-চালিত ব্যাখ্যার জন্য।",
        underDevelopment: "এই বৈশিষ্ট্যটি বর্তমানে উন্নয়নাধীন। আপডেটের জন্য সাথে থাকুন!",
      },
      readify: {
        title: "রিডিফাই", // Clean title
        description: "শিক্ষার্থীর পড়ার সাবলীলতা এবং উচ্চারণ মূল্যায়ন করতে শিক্ষার্থীর অডিও রেকর্ডিং আপলোড করুন। এই বৈশিষ্ট্যটি প্রতিক্রিয়া প্রদানের জন্য উন্নত স্পীচ-টু-টেক্সট এবং এআই বিশ্লেষণ ব্যবহার করবে।"
        ,inputPlaceholder: "অডিও ফাইল আপলোড করুন...",
        generateButton: "অডিও বিশ্লেষণ করুন",
        clearButton: "পরিষ্কার করুন",
        aiResponseHeading: "মূল্যায়ন ফলাফল:",
        generating: "বিশलेषण করছে...",
        underDevelopment: "এই বৈশিষ্ট্যটি বর্তমানে উন্নয়নাধীন। আপডেটের জন্য সাথে থাকুন!",
      },
    },
    // MARATHI
    marathi: {
      appName: "सहायक",
      welcome: "स्वागत आहे",
      signIn: "Google सह साइन इन करा",
      signOut: "साइन आउट करा",
      selectLanguage: "आपली भाषा निवडा",
      saveSelection: "निवड जतन करा",
      backToDashboard: "डॅशबोर्डवर परत जा",
      signInMessage: "सहायक वापरणे सुरू करण्यासाठी कृपया साइन इन करा.",
      dashboardTitle: "सहायक आज तुम्हाला कशी मदत करू शकतो?",
      askAI: {
        title: "आस्कएआय",
        description: "सामान्य प्रश्न किंवा तथ्ये मिळवा (भारत-केंद्रित).",
        inputPlaceholder: "भारताबद्दल काहीही विचारा (उदा. 'कर्नाटकातील मुख्य नद्या कोणत्या आहेत?')",
        generateButton: "प्रतिसाद निर्माण करा",
        clearButton: "साफ करा",
        aiResponseHeading: "एआय प्रतिसाद:",
        generating: "निर्माण होत आहे...",
      },
      storyfy: {
        title: "स्टोरीफाय",
        description: "मुलांसाठी कथांच्या स्वरूपात संकल्पना सोप्या पद्धतीने समजावून सांगा.",
        inputPlaceholder: "बद्दल एक कथा तयार करा (उदा. 'तिसऱ्या इयत्तेतील मुलांसाठी जलचक्राबद्दल')",
        generateButton: "कथा निर्माण करा",
        clearButton: "साफ करा",
        aiResponseHeading: "निर्माण केलेली कथा:",
        generating: "निर्माण होत आहे...",
      },
      explainify: {
        title: "एक्सप्लेनिफाय",
        description: "सोप्या उपमांसह संक्षिप्त, सोपी स्पष्टीकरणे मिळवा.",
        inputPlaceholder: "समजावून सांगा (उदा. 'आकाश निळे का दिसते?' 5 वर्षाच्या मुलाला)",
        generateButton: "समजावून सांगा",
        clearButton: "साफ करा",
        aiResponseHeading: "स्पष्टीकरण:",
        generating: "समजावून सांगत आहे...",
      },
      gamify: {
        title: "गेमिफाय", // Clean title
        description: "कोणत्याही धड्यावरून किंवा विषयावरून सोपे, मजकूर-आधारित गेम तयार करा.",
        underDevelopment: "हे वैशिष्ट्य सध्या विकासाधीन आहे. अद्यतनांसाठी संपर्कात रहा!",
      },
      artify: {
        title: "आर्टिफाय", // Clean title
        description: "आपल्या वर्णनांवरून सोपे रेषाचित्र किंवा आलेखांसाठी सूचना तयार करा.",
        underDevelopment: "हे वैशिष्ट्य सध्या विकासाधीन आहे. अद्यतनांसाठी संपर्कात रहा!",
      },
      adaptify: {
        title: "ॲडॅप्टिफाय", // Clean title
        description: "विविध ग्रेड स्तरांसाठी भिन्न साहित्य तयार करण्यासाठी सामग्री (उदा. पाठ्यपुस्तक पानाचा फोटो) अपलोड करा.",
        underDevelopment: "हे वैशिष्ट्य सध्या विकासाधीन आहे. अद्यतनांसाठी संपर्कात रहा!",
      },
      lensAI: {
        title: "लेन्सएआय", // Clean title
        description: "आकृत्या किंवा चार्ट अपलोड करा, त्यांच्या घटकांबद्दल आणि संकल्पनांबद्दल एआय-शक्तीवर आधारित स्पष्टीकरणांसाठी.",
        underDevelopment: "हे वैशिष्ट्य सध्या विकासाधीन आहे. अद्यतनांसाठी संपर्कात रहा!",
      },
      readify: {
        title: "रीडिफ़ाय", // Clean title
        description: "विद्यार्थ्यांची वाचन क्षमता आणि उच्चारण तपासण्यासाठी विद्यार्थ्यांचे ऑडिओ रेकॉर्डिंग अपलोड करा. हे वैशिष्ट्य प्रतिक्रिया देण्यासाठी प्रगत स्पीच-टू-टेक्स्ट आणि एआय विश्लेषण वापरेल.",
        inputPlaceholder: "ऑडिओ फाइल अपलोड करा...",
        generateButton: "ऑडिओचे विश्लेषण करा",
        clearButton: "साफ करा",
        aiResponseHeading: "मूल्यांकन परिणाम:",
        generating: "विश्लेषण करत आहे...",
        underDevelopment: "हे वैशिष्ट्य सध्या विकासाधीन आहे. अद्यतनांसाठी संपर्कात रहा!",
      },
    },
    // GUJARATI
    gujarati: {
      appName: "સહાયક",
      welcome: "સ્વાગત છે",
      signIn: "Google સાથે સાઇન ઇન કરો",
      signOut: "સાઇન આઉટ કરો",
      selectLanguage: "તમારી ભાષા પસંદ કરો",
      saveSelection: "પસંદગી સાચવો",
      backToDashboard: "ડેશબોર્ડ પર પાછા જાઓ",
      signInMessage: "સહાયકનો ઉપયોગ શરૂ કરવા માટે કૃપા કરીને સાઇન ઇન કરો.",
      dashboardTitle: "સહાયક આજે તમને કેવી રીતે મદદ કરી શકે છે?",
      askAI: {
        title: "આસ્કએઆઈ",
        description: "સામાન્ય પ્રશ્નો અથવા હકીકતો મેળવો (ભારત-કેન્દ્રિત).",
        inputPlaceholder: "ભારત વિશે કંઈપણ પૂછો (દા.ત., 'કર્ણાટકની મુખ્ય નદીઓ કઈ છે?')",
        generateButton: "પ્રતિસાદ બનાવો",
        clearButton: "સાફ કરો",
        aiResponseHeading: "AI પ્રતિસાદ:",
        generating: "બનાવી રહ્યું છે...",
      },
      storyfy: {
        title: "સ્ટોરીફાય",
        description: "બાળકો માટે વાર્તાઓ તરીકે સરળતાથી વિભાવનાઓ સમજાવો.",
        inputPlaceholder: "વિશે વાર્તા બનાવો (દા.ત., 'ત્રીજા ધોરણના વિદ્યાર્થીઓ માટે જળ ચક્ર વિશે')",
        generateButton: "વાર્તા બનાવો",
        clearButton: "સાફ કરો",
        aiResponseHeading: "બનાવેલી વાર્તા:",
        generating: "બનાવી રહ્યું છે...",
      },
      explainify: {
        title: "એક્સપ્લેઇનફાય",
        description: "સરળ સરખામણીઓ સાથે સંક્ષિપ્ત, સરળ સમજૂતીઓ મેળવો.",
        inputPlaceholder: "સમજાવો (દા.ત., 'આકાશ વાદળી કેમ છે?' 5 વર્ષના બાળકને)",
        generateButton: "સમજાવો",
        clearButton: "સાફ કરો",
        aiResponseHeading: "સમજૂતી:",
        generating: "સમજાવી રહ્યું છે...",
      },
      gamify: {
        title: "ગેમિફાય", // Clean title
        description: "કોઈપણ પાઠ અથવા વિષયમાંથી સરળ, ટેક્સ્ટ-આધારિત રમતો બનાવો.",
        underDevelopment: "આ સુવિધા હાલમાં વિકાસ હેઠળ છે. અપડેટ્સ માટે જોડાયેલા રહો!",
      },
      artify: {
        title: "આર્ટિફાય", // Clean title
        description: "તમારા વર્ણનોમાંથી સરળ રેખાંકનો અથવા ચાર્ટ્સ માટે સૂચનાઓ બનાવો.",
        underDevelopment: "આ સુવિધા હાલમાં વિકાસ હેઠળ છે. અપડેટ્સ માટે જોડાયેલા રહો!",
      },
      adaptify: {
        title: "એડેપ્ટિફાય", // Clean title
        description: "વિવિધ ગ્રેડ સ્તર માટે ભિન્ન સામગ્રી બનાવવા માટે સામગ્રી (દા.ત., પાઠ્યપુસ્તકના પૃષ્ઠનો ફોટો) અપલોડ કરો.",
        underDevelopment: "આ સુવિધા હાલમાં વિકાસ હેઠળ છે. અપડેટ્સ માટે જોડાયેલા રહો!",
      },
      lensAI: {
        title: "લેન્સએઆઈ", // Clean title
        description: "રેખાંકનો અથવા ચાર્ટ્સ અપલોડ કરો, તેમના ઘટકો અને ખ્યાલો વિશે AI-સંચાલિત સમજૂતીઓ માટે.",
        underDevelopment: "આ સુવિધા હાલમાં વિકાસ હેઠળ છે. અપડેટ્સ માટે જોડાયેલા રહો!",
      },
      readify: {
        title: "રીડીફાય", // Clean title
        description: "વિદ્યાર્થીઓની વાંચન પ્રવાહિતા અને ઉચ્ચારણનું મૂલ્યાંકન કરવા માટે વિદ્યાર્થીના ઑડિઓ રેકોર્ડિંગ્સ અપલોડ કરો. આ સુવિધા પ્રતિસાદ આપવા માટે અદ્યતન સ્પીચ-ટુ-ટેક્સ્ટ અને AI વિશ્લેષણનો ઉપયોગ કરશે.",
        inputPlaceholder: "ઑડિઓ ફાઇલ અપલોડ કરો...",
        generateButton: "ઑડિઓનું વિશ્લેષણ કરો",
        clearButton: "સાફ કરો",
        aiResponseHeading: "મૂલ્યાંકન પરિણામો:",
        generating: "વિશ્લેષણ કરી રહ્યું છે...",
        underDevelopment: "આ સુવિધા હાલમાં વિકાસ હેઠળ છે. અપડેટ્સ માટે જોડાયેલા રહો!",
      },
    },
    // PUNJABI
    punjabi: {
      appName: "ਸਹਾਇਕ",
      welcome: "ਜੀ ਆਇਆਂ ਨੂੰ",
      signIn: "ਗੂਗਲ ਨਾਲ ਸਾਈਨ ਇਨ ਕਰੋ",
      signOut: "ਸਾਈਨ ਆਉਟ ਕਰੋ",
      selectLanguage: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ",
      saveSelection: "ਚੋਣ ਸੁਰੱਖਿਅਤ ਕਰੋ",
      backToDashboard: "ਡੈਸ਼ਬੋਰਡ 'ਤੇ ਵਾਪਸ",
      signInMessage: "ਸਹਾਇਕ ਦੀ ਵਰਤੋਂ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਸਾਈਨ ਇਨ ਕਰੋ।",
      dashboardTitle: "ਸਹਾਇਕ ਅੱਜ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹੈ?",
      askAI: {
        title: "ਆਸਕਏਆਈ",
        description: "ਆਮ ਸਵਾਲ ਜਾਂ ਤੱਥ ਪ੍ਰਾਪਤ ਕਰੋ (ਭਾਰਤ-ਕੇਂਦਰਿਤ)।",
        inputPlaceholder: "ਭਾਰਤ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ (ਜਿਵੇਂ ਕਿ, 'ਕਰਨਾਟਕ ਦੀਆਂ ਮੁੱਖ ਨਦੀਆਂ ਕਿਹੜੀਆਂ ਹਨ?')",
        generateButton: "ਜਵਾਬ ਤਿਆਰ ਕਰੋ",
        clearButton: "ਸਾਫ਼ ਕਰੋ",
        aiResponseHeading: "AI ਜਵਾਬ:",
        generating: "ਤਿਆਰ ਹੋ ਰਿਹਾ ਹੈ...",
      },
      storyfy: {
        title: "ਸਟੋਰੀਫਾਈ",
        description: "ਬੱਚਿਆਂ ਲਈ ਕਹਾਣੀਆਂ ਦੇ ਰੂਪ ਵਿੱਚ ਸੰਕਲਪਾਂ ਨੂੰ ਸਰਲ ਤਰੀਕੇ ਨਾਲ ਸਮਝਾਓ।",
        inputPlaceholder: "ਬਾਰੇ ਇੱਕ ਕਹਾਣੀ ਬਣਾਓ (ਜਿਵੇਂ ਕਿ, 'ਤੀਜੀ ਜਮਾਤ ਦੇ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਜਲ ਚੱਕਰ ਬਾਰੇ')",
        generateButton: "ਕਹਾਣੀ ਤਿਆਰ ਕਰੋ",
        clearButton: "ਸਾਫ਼ ਕਰੋ",
        aiResponseHeading: "ਤਿਆਰ ਕੀਤੀ ਕਹਾਣੀ:",
        generating: "ਤਿਆਰ ਹੋ ਰਿਹਾ ਹੈ...",
      },
      explainify: {
        title: "ਐਕਸਪਲੇਨੀਫਾਈ",
        description: "ਸਰਲ ਉਦਾਹਰਣਾਂ ਨਾਲ ਸੰਖੇਪ, ਸਰਲ ਵਿਆਖਿਆਵਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।",
        inputPlaceholder: "ਸਮਝਾਓ (ਜਿਵੇਂ ਕਿ, 'ਅਸਮਾਨ ਨੀਲਾ ਕਿਉਂ ਹੈ?' 5 ਸਾਲ ਦੇ ਬੱਚੇ ਨੂੰ)",
        generateButton: "ਸਮਝਾਓ",
        clearButton: "ਸਾਫ਼ ਕਰੋ",
        aiResponseHeading: "ਵਿਆਖਿਆ:",
        generating: "ਸਮਝਾ ਰਿਹਾ ਹੈ...",
      },
      gamify: {
        title: "ਗੇਮੀਫਾਈ", // Clean title
        description: "ਕਿਸੇ ਵੀ ਪਾਠ ਜਾਂ ਵਿਸ਼ੇ ਤੋਂ ਸਰਲ, ਟੈਕਸਟ-ਅਧਾਰਿਤ ਗੇਮਾਂ ਤਿਆਰ ਕਰੋ।",
        underDevelopment: "ਇਹ ਵਿਸ਼ੇਸ਼ਤਾ ਵਰਤਮਾਨ ਵਿੱਚ ਵਿਕਾਸ ਅਧੀਨ ਹੈ। ਅਪਡੇਟਾਂ ਲਈ ਜੁੜੇ ਰਹੋ!",
      },
      artify: {
        title: "ਆਰਟੀਫਾਈ", // Clean title
        description: "ਤੁਹਾਡੇ ਵਰਣਨ ਤੋਂ ਸਰਲ ਰੇਖਾ ਚਿੱਤਰਾਂ ਜਾਂ ਚਾਰਟਾਂ ਲਈ ਨਿਰਦੇਸ਼ ਤਿਆਰ ਕਰੋ।",
        underDevelopment: "ਇਹ ਵਿਸ਼ੇਸ਼ਤਾ ਵਰਤਮਾਨ ਵਿੱਚ ਵਿਕਾਸ ਅਧੀਨ ਹੈ। ਅਪਡੇਟਾਂ ਲਈ ਜੁੜੇ ਰਹੋ!",
      },
      adaptify: {
        title: "ਅਡੈਪਟੀਫਾਈ", // Clean title
        description: "ਵੱਖ-ਵੱਖ ਗ੍ਰੇਡ ਪੱਧਰਾਂ ਲਈ ਵੱਖਰੀ ਸਮੱਗਰੀ ਤਿਆਰ ਕਰਨ ਲਈ ਸਮੱਗਰੀ (ਜਿਵੇਂ ਕਿ, ਪਾਠ ਪੁਸਤਕ ਪੰਨੇ ਦੀ ਫੋਟੋ) ਅਪਲੋਡ ਕਰੋ।",
        underDevelopment: "ਇਹ ਵਿਸ਼ੇਸ਼ਤਾ ਵਰਤਮਾਨ ਵਿੱਚ ਵਿਕਾਸ ਅਧੀਨ ਹੈ। ਅਪਡੇਟਾਂ ਲਈ ਜੁੜੇ ਰਹੋ!",
      },
      lensAI: {
        title: "ਲੈਂਸਏਆਈ", // Clean title
        description: "ਡਾਇਗ੍ਰਾਮ ਜਾਂ ਚਾਰਟ ਅਪਲੋਡ ਕਰੋ, ਉਹਨਾਂ ਦੇ ਭਾਗਾਂ ਅਤੇ ਸੰਕਲਪਾਂ ਬਾਰੇ AI-ਸੰਚਾਲਿਤ ਵਿਆਖਿਆਵਾਂ ਲਈ।",
        underDevelopment: "ਇਹ ਵਿਸ਼ੇਸ਼ਤਾ ਵਰਤਮਾਨ ਵਿੱਚ ਵਿਕਾਸ ਅਧੀਨ ਹੈ। ਅਪਡੇਟਾਂ ਲਈ ਜੁੜੇ ਰਹੋ!",
      },
      readify: {
        title: "ਰੀਡਿਫਾਈ", // Clean title
        description: "ਵਿਦਿਆਰਥੀ ਦੇ ਪੜ੍ਹਨ ਦੀ ਰਵਾਨਗੀ ਅਤੇ ਉਚਾਰਨ ਦਾ ਮੁਲਾਂਕਣ ਕਰਨ ਲਈ ਵਿਦਿਆਰਥੀ ਆਡੀਓ ਰਿਕਾਰਡਿੰਗਾਂ ਨੂੰ ਅਪਲੋਡ ਕਰੋ। ਇਹ ਵਿਸ਼ੇਸ਼ਤਾ ਫੀਡਬੈਕ ਪ੍ਰਦਾਨ ਕਰਨ ਲਈ ਉੱਨਤ ਸਪੀਚ-ਟੂ-ਟੈਕਸਟ ਅਤੇ AI ਵਿਸ਼ਲੇਸ਼ਣ ਦੀ ਵਰਤੋਂ ਕਰੇਗੀ।",
        inputPlaceholder: "ਆਡੀਓ ਫਾਈਲ ਅਪਲੋਡ ਕਰੋ...",
        generateButton: "ਆਡੀਓ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
        clearButton: "ਸਾਫ਼ ਕਰੋ",
        aiResponseHeading: "ਮੁਲਾਂਕਣ ਦੇ ਨਤੀਜੇ:",
        generating: "ਵਿਸ਼ਲੇਸ਼ਣ ਕਰ ਰਿਹਾ ਹੈ...",
        underDevelopment: "ਇਹ ਵਿਸ਼ੇਸ਼ਤਾ ਵਰਤਮਾਨ ਵਿੱਚ ਵਿਕਾਸ ਅਧੀਨ ਹੈ। ਅਪਡੇਟਾਂ ਲਈ ਜੁੜੇ ਰਹੋ!",
      },
    },
  };
  // --- END: TRANSLATIONS ---

  const currentViewTexts = translations[selectedLanguage.toLowerCase()] || translations.english;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && !localStorage.getItem('userLanguage')) {
        setShowLanguageSetup(true);
      }
    });
    return () => unsubscribe();
  }, []);

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

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Language setup will be triggered by useEffect if it's a new user
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentView('dashboard'); // Go back to dashboard on sign out
      setPrompt('');
      setAiResponse('');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleLanguageSelect = (langId) => {
    const selected = languageOptions.find(opt => opt.id === langId);
    if (selected) {
      setSelectedLanguage(selected.name);
      localStorage.setItem('userLanguage', selected.name);
      setShowLanguageSetup(false);
      setShowLanguageDropdown(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setAiResponse('');

    let fullPrompt = "";
    try {
      // Logic for different features
      if (currentView === 'askAI') {
        fullPrompt = `You are an AI assistant for Indian teachers. Answer the following general query or fact about India in ${selectedLanguage} language, ensuring the response is concise and easy for primary school teachers to understand:\n\nQuery: ${prompt}`;
      } else if (currentView === 'storyfy') {
        fullPrompt = `You are an AI assistant for Indian teachers. Create a simple story for primary school children (suitable for multi-grade classrooms) in ${selectedLanguage} language based on the following topic, explaining concepts clearly:\n\nTopic: ${prompt}`;
      } else if (currentView === 'explainify') {
        fullPrompt = `You are an AI assistant for Indian teachers. Explain the following concept in ${selectedLanguage} language using simple terms and easy-to-understand analogies suitable for primary school children in a rural Indian context:\n\nConcept: ${prompt}`;
      }
      // Add more else if conditions for other functional features if they were added here
      else {
        // Fallback or error for unimplemented features
        setAiResponse("This feature is under development. Please try a functional one.");
        setLoading(false);
        return;
      }

      const result = await textModel.generateContent(fullPrompt);
      const response = await result.response;
      setAiResponse(response.text());
    } catch (error) {
      console.error("Error generating content:", error);
      setAiResponse("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setAiResponse('');
  };

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(aiResponse);
    alert('Response copied to clipboard!');
  };

  const handleSpeakResponse = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageOptions.find(lang => lang.name === selectedLanguage)?.langCode || 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech not supported in your browser.");
    }
  };


  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">{currentViewTexts.appName}</h1>
        <div className="header-controls">
          {user && <span className="welcome-text">{currentViewTexts.welcome}, {user.displayName || user.email}!</span>}
          <div className="language-dropdown-container" ref={languageDropdownRef}>
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="language-dropdown-button"
            >
              {languageOptions.find(opt => opt.name === selectedLanguage)?.icon} {selectedLanguage} ▼
            </button>
            {showLanguageDropdown && (
              <div className="language-dropdown-menu">
                {languageOptions.map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => handleLanguageSelect(lang.id)}
                    className={selectedLanguage === lang.name ? 'selected' : ''}
                  >
                    {lang.icon} {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          {user ? (
            <button onClick={handleSignOut} className="button-primary button-red">
              {currentViewTexts.signOut}
            </button>
          ) : (
            <button onClick={handleSignIn} className="button-primary button-blue">
              {currentViewTexts.signIn}
            </button>
          )}
        </div>
      </header>

      <main className="main-content">
        {showLanguageSetup && user && (
          <div className="language-setup-modal">
            <h2>{currentViewTexts.selectLanguage}</h2>
            <div className="language-options-grid">
              {languageOptions.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => handleLanguageSelect(lang.id)}
                >
                  <span className="language-setup-modal-icon">{lang.icon}</span>
                  {lang.name}
                </button>
              ))}
            </div>
            {/* Removed "Save Selection" button as selection is saved on click */}
          </div>
        )}

        {!showLanguageSetup && user ? (
          <>
            {currentView === 'dashboard' ? (
              <div className="dashboard-view">
                <h2 className="dashboard-title">{currentViewTexts.dashboardTitle}</h2>
                <div className="feature-cards-grid">
                  {featureCards.map((card) => (
                    <button
                      key={card.id}
                      className="feature-card"
                      onClick={() => setCurrentView(card.id)}
                    >
                      <span className="feature-card-icon">{card.icon}</span>
                      {/* Displaying clean title from translations */}
                      <h3>{currentViewTexts[card.id].title}</h3>
                      <p>{currentViewTexts[card.id].description}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="feature-view-container">
                <button onClick={() => setCurrentView('dashboard')} className="back-button">
                  <span>&larr;</span> {currentViewTexts.backToDashboard}
                </button>
                <h2 className="feature-view-title">{currentViewTexts[currentView].title}</h2>

                {/* Render specific feature content or "Under Development" message */}
                {currentViewTexts[currentView].underDevelopment ? (
                  <div className="under-development-message">
                    {currentViewTexts[currentView].underDevelopment}
                  </div>
                ) : (
                  <>
                    <div className="input-field-container">
                      <textarea
                        className="text-input"
                        placeholder={currentViewTexts[currentView].inputPlaceholder}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows="6"
                        disabled={loading}
                      ></textarea>
                    </div>

                    <div className="button-group">
                      <button
                        onClick={handleGenerate}
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
                             onClick={() => handleSpeakResponse(aiResponse)}
                             className="speak-button"
                             title="Listen to Response"
                           >
                             🔊
                           </button>
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
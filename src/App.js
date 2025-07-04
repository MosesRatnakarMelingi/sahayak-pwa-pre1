import React, { useState, useEffect, useRef } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { textModel } from './gemini';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const [currentView, setCurrentView] = useState('dashboard');

  // Language States
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageSetup, setShowLanguageSetup] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const languageDropdownRef = useRef(null);

  // Speech recognition states
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [triggerVoiceOutput, setTriggerVoiceOutput] = useState(false);

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
    { id: 'askMeAnything' },
    { id: 'storyfy' },
    { id: 'instantKnowledgeBase' }, // This ID maps to 'SimplyExplain' in translations
  ];

  // Define translations for feature cards
  const featureTranslations = {
    'English': {
      'askMeAnything': {
        name: 'Ask Me Anything',
        description: 'Get general queries or facts (India-focused).'
      },
      'storyfy': {
        name: 'Storyfy',
        description: 'Explain concepts simply as stories for kids.'
      },
      'instantKnowledgeBase': { // Refers to the SimplyExplain feature
        name: 'SimplyExplain',
        description: 'Get concise, simple explanations with easy analogies.'
      }
    },
    'हिंदी': {
      'askMeAnything': {
        name: 'कुछ भी पूछो',
        description: 'सामान्य प्रश्न या स्थानीय तथ्य (भारत-केंद्रित) प्राप्त करें।'
      },
      'storyfy': {
        name: 'कहानियां बनाओ',
        description: 'अवधारणाओं को बच्चों के लिए कहानियों के रूप में समझाएं।'
      },
      'instantKnowledgeBase': {
        name: 'सरल समझाओ',
        description: 'आसान उपमाओं के साथ संक्षिप्त, सरल स्पष्टीकरण प्राप्त करें।'
      }
    },
    'తెలుగు': {
      'askMeAnything': {
        name: 'ఏదైనా అడగండి',
        description: 'సాధారణ ప్రశ్నలకు లేదా స్థానిక వాస్తవాలకు (భారతదేశం-కేంద్రీకృత) సమాధానాలు పొందండి.'
      },
      'storyfy': {
        name: 'కథలుగా మార్చండి',
        description: 'పిల్లల కోసం భావనలను కథలుగా సులభంగా వివరించండి.'
      },
      'instantKnowledgeBase': {
        name: 'సులభంగా వివరించండి',
        description: 'సులభమైన పోలికలతో సంక్షిప్త, సాధారణ వివరణలను పొందండి.'
      }
    },
    'தமிழ்': {
      'askMeAnything': {
        name: 'எதுவும் கேளுங்கள்',
        description: 'பொதுவான கேள்விகள் அல்லது உள்ளூர் தகவல்களை (இந்தியா சார்ந்தது) பெறுங்கள்.'
      },
      'storyfy': {
        name: 'கதையாக்குங்கள்',
        description: 'குழந்தைகளுக்கான கதைகளாக கருத்துக்களை எளிமையாக விளக்குங்கள்.'
      },
      'instantKnowledgeBase': {
        name: 'எளிமையாக விளக்கு',
        description: 'எளிதான ஒப்புமைகளுடன் சுருக்கமான, எளிய விளக்கங்களைப் பெறுங்கள்.'
      }
    },
    'ಕನ್ನಡ': {
      'askMeAnything': {
        name: 'ಏನಾದರೂ ಕೇಳಿ',
        description: 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು ಅಥವಾ ಸ್ಥಳೀಯ ಸಂಗತಿಗಳನ್ನು (ಭಾರತ-ಕೇಂದ್ರಿತ) ಪಡೆಯಿರಿ।'
      },
      'storyfy': {
        name: 'ಕಥೆಯಾಗಿ',
        description: 'ಮಕ್ಕಳಿಗಾಗಿ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ಸರಳ ಕಥೆಗಳಾಗಿ ವಿವರಿಸಿ।'
      },
      'instantKnowledgeBase': {
        name: 'ಸರಳವಾಗಿ ವಿವರಿಸಿ',
        description: 'ಸುಲಭ ಹೋಲಿಕೆಗಳೊಂದಿಗೆ ಸಂಕ್ಷಿಪ್ತ, ಸರಳ ವಿವರಣೆಗಳನ್ನು ಪಡೆಯಿರಿ.'
      }
    },
    'മലയാളം': {
      'askMeAnything': {
        name: 'എന്തും ചോദിക്കൂ',
        description: 'പൊതുവായ ചോദ്യങ്ങൾക്കോ പ്രാദേശിക വിവരങ്ങൾക്കോ (ഇന്ത്യൻ-അധിഷ്ഠിതം) ഉത്തരം നേടുക।'
      },
      'storyfy': {
        name: 'കഥയാക്കൂ',
        description: 'കുട്ടികൾക്കായി ആശയങ്ങളെ ലളിതമായ കഥകളാക്കി മാറ്റുക।'
      },
      'instantKnowledgeBase': {
        name: 'ലളിതമായി വിശദീകരിക്കുക',
        description: 'ലളിതമായ സാമ്യങ്ങളോടുകൂടിയ സംക്ഷിപ്തവും ലളിതവുമായ വിശദീകരണങ്ങൾ നേടുക.'
      }
    },
    'বাংলা': {
      'askMeAnything': {
        name: 'যেকোন কিছু জিজ্ঞাসা করুন',
        description: 'সাধারণ প্রশ্ন বা স্থানীয় তথ্য (ভারত-কেন্দ্রিক) পান।'
      },
      'storyfy': {
        name: 'গল্প তৈরি করুন',
        description: 'বাচ্চাদের জন্য ধারণাগুলিকে সহজ গল্পে ব্যাখ্যা করুন।'
      },
      'instantKnowledgeBase': {
        name: 'সহজেই বোঝান',
        description: 'সহজ উপমা সহ সংক্ষিপ্ত, সরল ব্যাখ্যা পান।'
      }
    },
    'মराठी': {
      'askMeAnything': {
        name: 'काहीही विचारा',
        description: 'सामान्य प्रश्न किंवा स्थानिक तथ्ये (भारत-केंद्रित) मिळवा।'
      },
      'storyfy': {
        name: 'कथा बनवा',
        description: 'मुलांसाठी संकल्पनांना सोप्या कथांमध्ये समजावून सांगा।'
      },
      'instantKnowledgeBase': {
        name: 'सोपे समजावून सांगा',
        description: 'सोप्या उपमांसह संक्षिप्त, सोपी स्पष्टीकरणे मिळवा.'
      }
    },
    'ગુજરાતી': {
      'askMeAnything': {
        name: 'કંઈપણ પૂછો',
        description: 'સામાન્ય પ્રશ્નો અથવા સ્થાનિક તથ્યો (ભારત-કેન્દ્રિત) મેળવો।'
      },
      'storyfy': {
        name: 'વાર્તા બનાવો',
        description: 'બાળકો માટે ખ્યાલોને સરળ વાર્તાઓમાં સમજાવો।'
      },
      'instantKnowledgeBase': {
        name: 'સરળતાથી સમજાવો',
        description: 'સરળ સરખામણીઓ સાથે સંક્ષિપ્ત, સરળ સમજૂતીઓ મેળવો.'
      }
    },
    'પੰਜਾਬੀ': {
      'askMeAnything': {
        name: 'ਕੁਝ ਵੀ ਪੁੱਛੋ',
        description: 'ਆਮ ਸਵਾਲਾਂ ਜਾਂ ਸਥਾਨਕ ਤੱਥਾਂ (ਭਾਰਤ-ਕੇਂਦਰਿਤ) ਦੇ ਜਵਾਬ ਪ੍ਰਾਪਤ ਕਰੋ।'
      },
      'storyfy': {
        name: 'ਕਹਾਣੀ ਬਣਾਓ',
        description: 'ਬੱਚਿਆਂ ਲਈ ਸੰਕਲਪਾਂ ਨੂੰ ਸਰਲ ਕਹਾਣੀਆਂ ਵਿੱਚ ਸਮਝਾਓ।'
      },
      'instantKnowledgeBase': {
        name: 'ਸਰਲਤਾ ਨਾਲ ਸਮਝਾਓ',
        description: 'ਸਰਲ ਸਮਾਨਤਾਵਾਂ ਨਾਲ ਸੰਖੇਪ, ਸਰਲ ਵਿਆਖਿਆਵਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।'
      }
    }
  };

  // Define translations for the content inside the feature views
  const viewContentTranslations = {
    'English': {
      'dashboardTitle': 'What would you like to do today?',
      'askMeAnythingTitle': 'Ask Me Anything',
      'askMeAnythingPlaceholder': "Enter your query (e.g., 'What are the main rivers in India?', 'Tell me about the history of cricket in England').",
      'storyfyTitle': 'Storyfy',
      'storyfyPlaceholder': "Enter a concept or question to 'Storyfy' (e.g., 'Explain photosynthesis', 'Why do stars twinkle?').",
      'instantKnowledgeBaseTitle': 'SimplyExplain',
      'instantKnowledgeBasePlaceholder': "Ask a student question (e.g., 'Why is the sky blue?', 'What is electricity?').",
      'generateButton': 'Generate',
      'clearButton': 'Clear',
      'backButton': 'Back to Home',
      'aiResponseHeading': 'AI Response:',
      'signInMessage': 'Please sign in to use Sahayak.',
      'chooseLanguageTitle': 'Choose Your Preferred Language',
      'listening': 'Listening...',
      'generating': 'Generating Response...',
      'copySuccess': 'Copied!'
    },
    'हिंदी': {
      'dashboardTitle': 'आज आप क्या करना चाहेंगे?',
      'askMeAnythingTitle': 'कुछ भी पूछो',
      'askMeAnythingPlaceholder': "अपनी क्वेरी दर्ज करें (उदाहरण: 'भारत की प्रमुख नदियाँ क्या हैं?', 'इंग्लैंड में क्रिकेट का इतिहास बताएं।').",
      'storyfyTitle': 'कहानियां बनाओ',
      'storyfyPlaceholder': "किसी अवधारणा या प्रश्न को 'कहानियां बनाओ' (उदाहरण: 'प्रकाश संश्लेषण समझाएं', 'तारे क्यों टिमटिमाते हैं?') में दर्ज करें।",
      'instantKnowledgeBaseTitle': 'सरल समझाओ',
      'instantKnowledgeBasePlaceholder': "छात्र प्रश्न पूछें (उदाहरण: 'आकाश नीला क्यों है?', 'बिजली क्या है?').",
      'generateButton': 'उत्पन्न करें',
      'clearButton': 'साफ़ करें',
      'backButton': 'होम पर वापस जाएं',
      'aiResponseHeading': 'एआई प्रतिक्रिया:',
      'signInMessage': 'सहायक का उपयोग करने के लिए कृपया साइन इन करें।',
      'chooseLanguageTitle': 'अपनी पसंदीदा भाषा चुनें',
      'listening': 'सुन रहा है...',
      'generating': 'प्रतिक्रिया उत्पन्न हो रही है...',
      'copySuccess': 'कॉपी किया गया!'
    },
    'తెలుగు': {
      'dashboardTitle': 'ఈరోజు మీరు ఏమి చేయాలనుకుంటున్నారు?',
      'askMeAnythingTitle': 'ఏదైనా అడగండి',
      'askMeAnythingPlaceholder': "మీ ప్రశ్నను నమోదు చేయండి (ఉదా: 'భారతదేశంలోని ప్రధాన నదులు ఏమిటి?', 'ఇంగ్లాండ్‌లో క్రికెట్ చరిత్ర గురించి చెప్పండి.').",
      'storyfyTitle': 'కథలుగా మార్చండి',
      'storyfyPlaceholder': "కథగా మార్చడానికి ఒక భావన లేదా ప్రశ్నను నమోదు చేయండి (ఉదా: 'కిరణజన్య సంయోగక్రియను వివరించండి', 'నక్షత్రాలు ఎందుకు మెరుస్తాయి?').",
      'instantKnowledgeBaseTitle': 'సులభంగా వివరించండి',
      'instantKnowledgeBasePlaceholder': "విద్యార్థి ప్రశ్న అడగండి (ఉదా: 'ఆకాశం ఎందుకు నీలం?', 'విద్యుత్ అంటే ఏమిటి?').",
      'generateButton': 'ఉత్పన్నం చేయండి',
      'clearButton': 'శుభ్రం చేయండి',
      'backButton': 'హోమ్‌కి తిరిగి వెళ్ళండి',
      'aiResponseHeading': 'AI ప్రతిస్పందన:',
      'signInMessage': 'సహాయక్ ఉపయోగించడానికి దయచేసి సైన్ ఇన్ చేయండి.',
      'chooseLanguageTitle': 'మీకు నచ్చిన భాషను ఎంచుకోండి',
      'listening': 'వినబడుతోంది...',
      'generating': 'ప్రతిస్పందన ఉత్పత్తి అవుతోంది...',
      'copySuccess': 'కాపీ చేయబడింది!'
    },
    'தமிழ்': {
      'dashboardTitle': 'இன்று நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?',
      'askMeAnythingTitle': 'எதுவும் கேளுங்கள்',
      'askMeAnythingPlaceholder': "உங்கள் கேள்வியை உள்ளிடவும் (எ.கா: 'இந்தியாவின் முக்கிய நதிகள் யாவை?', 'இங்கிலாந்தில் கிரிக்கெட் வரலாறு பற்றிச் சொல்லுங்கள்').",
      'storyfyTitle': 'கதையாக்குங்கள்',
      'storyfyPlaceholder': "கதையாக மாற்ற ஒரு கருத்து அல்லது கேள்வியை உள்ளிடவும் (எ.கா: 'ஒளிச்சேர்க்கையை விளக்குங்கள்', 'நட்சத்திரங்கள் ஏன் மின்னுகின்றன?').",
      'instantKnowledgeBaseTitle': 'எளிமையாக விளக்கு',
      'instantKnowledgeBasePlaceholder': "மாணவர் கேள்வியைக் கேளுங்கள் (எ.கா: 'வானம் ஏன் நீலமாக இருக்கிறது?', 'மின்சாரம் என்றால் என்ன?').",
      'generateButton': 'உருவாக்குங்கள்',
      'clearButton': 'அழி',
      'backButton': 'முகப்புக்குத் திரும்பு',
      'aiResponseHeading': 'AI பதில்:',
      'signInMessage': 'சஹாயக்கை பயன்படுத்த உள்நுழையவும்.',
      'chooseLanguageTitle': 'உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
      'listening': 'கேட்கிறது...',
      'generating': 'பதில் உருவாக்கப்படுகிறது...',
      'copySuccess': 'நகலெடுக்கப்பட்டது!'
    },
    'ಕನ್ನಡ': {
      'dashboardTitle': 'ಇಂದು ನೀವು ಏನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?',
      'askMeAnythingTitle': 'ಏನಾದರೂ ಕೇಳಿ',
      'askMeAnythingPlaceholder': "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ನಮೂದಿಸಿ (ಉದಾ: 'ಭಾರತದ ಪ್ರಮುಖ ನದಿಗಳು ಯಾವುವು?', 'ಇಂಗ್ಲೆಂಡ್‌ನಲ್ಲಿ ಕ್ರಿಕೆಟ್ ಇತಿಹಾಸದ ಬಗ್ಗೆ ಹೇಳಿ').",
      'storyfyTitle': 'ಕಥೆಯಾಗಿ',
      'storyfyPlaceholder': "ಕಥೆಯಾಗಿ ಮಾಡಲು ಒಂದು ಪರಿಕಲ್ಪನೆ ಅಥವಾ ಪ್ರಶ್ನೆಯನ್ನು ನಮೂದಿಸಿ (ಉದಾ: 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯನ್ನು ವಿವರಿಸಿ', 'ನಕ್ಷತ್ರಗಳು ಏಕೆ ಮಿನುಗುತ್ತವೆ?').",
      'instantKnowledgeBaseTitle': 'ಸರಳವಾಗಿ ವಿವರಿಸಿ',
      'instantKnowledgeBasePlaceholder': "ವಿದ್ಯಾರ್ಥಿ ಪ್ರಶ್ನೆ ಕೇಳಿ (ಉದಾ: 'ಆಕಾಶ ಏಕೆ ನೀಲಿ ಬಣ್ಣದ್ದಾಗಿದೆ?', 'ವಿದ್ಯುತ್ ಎಂದರೇನು?').",
      'generateButton': 'ರಚಿಸಿ',
      'clearButton': 'ತೆರವುಗೊಳಿಸಿ',
      'backButton': 'ಮನೆಗೆ ಹಿಂತಿರುಗಿ',
      'aiResponseHeading': 'AI ಪ್ರತಿಕ್ರಿಯೆ:',
      'signInMessage': 'ಸಹಾಯಕ ಬಳಸಲು ದಯವಿಟ್ಟು ಸೈನ್ ಇನ್ ಮಾಡಿ.',
      'chooseLanguageTitle': 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆರಿಸಿ',
      'listening': 'ಕೇಳಲಾಗುತ್ತಿದೆ...',
      'generating': 'ಪ್ರತಿಕ್ರಿಯೆ ರಚಿಸಲಾಗುತ್ತಿದೆ...',
      'copySuccess': 'ನಕಲಿಸಲಾಗಿದೆ!'
    },
    'മലയാളം': {
      'dashboardTitle': 'ഇന്ന് നിങ്ങൾ എന്തുചെയ്യാൻ ആഗ്രഹിക്കുന്നു?',
      'askMeAnythingTitle': 'എന്തും ചോദിക്കൂ',
      'askMeAnythingPlaceholder': "നിങ്ങളുടെ ചോദ്യം നൽകുക (ഉദാ: 'ഇന്ത്യയിലെ പ്രധാന നദികൾ ഏതെല്ലാമാണ്?', 'ഇംഗ്ലണ്ടിലെ ക്രിക്കറ്റിന്റെ ചരിത്രം പറയുക.').",
      'storyfyTitle': 'കഥയാക്കൂ',
      'storyfyPlaceholder': "കഥയാക്കാൻ ഒരു ആശയം അല്ലെങ്കിൽ ചോദ്യം നൽകുക (ഉദാ: 'പ്രകാശസംശ്ലേഷണം വിശദീകരിക്കുക', 'നക്ഷത്രങ്ങൾ എന്തിന് തിളങ്ങുന്നു?').",
      'instantKnowledgeBaseTitle': 'ലളിതമായി വിശദീകരിക്കുക',
      'instantKnowledgeBasePlaceholder': "വിദ്യാർത്ഥി ചോദ്യം ചോദിക്കുക (ഉദാ: 'ആകാശം നീലയായിരിക്കുന്നത് എന്തുകൊണ്ട്?', 'വൈദ്യുതി എന്നാൽ എന്ത്?').",
      'generateButton': 'ഉണ്ടാക്കുക',
      'clearButton': 'മായ്ക്കുക',
      'backButton': 'ഹോമിലേക്ക് മടങ്ങുക',
      'aiResponseHeading': 'AI പ്രതികരണം:',
      'signInMessage': 'സഹായക് ഉപയോഗിക്കാൻ ദയവായി സൈൻ ഇൻ ചെയ്യുക.',
      'chooseLanguageTitle': 'നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട ഭാഷ തിരഞ്ഞെടുക്കുക',
      'listening': 'കേൾക്കുന്നു...',
      'generating': 'പ്രതികരണം ഉണ്ടാക്കുന്നു...',
      'copySuccess': 'പകർത്തുക!'
    },
    'বাংলা': {
      'dashboardTitle': 'আজ আপনি কি করতে চান?',
      'askMeAnythingTitle': 'যেকোন কিছু জিজ্ঞাসা করুন',
      'askMeAnythingPlaceholder': "আপনার প্রশ্ন লিখুন (যেমন: 'ভারতের প্রধান নদীগুলি কী কী?', 'ইংল্যান্ডে ক্রিকেটের ইতিহাস বলুন।').",
      'storyfyTitle': 'গল্প তৈরি করুন',
      'storyfyPlaceholder': "গল্প তৈরি করতে একটি ধারণা বা প্রশ্ন লিখুন (যেমন: 'সালোকসংশ্লেষণ ব্যাখ্যা করুন', 'তারা কেন ঝিকমিক করে?').",
      'instantKnowledgeBaseTitle': 'সহজেই বোঝান',
      'instantKnowledgeBasePlaceholder': "ছাত্র প্রশ্ন জিজ্ঞাসা করুন (যেমন: 'আকাশ নীল কেন?', 'বিদ্যুৎ কি?').",
      'generateButton': 'তৈরি করুন',
      'clearButton': 'পরিষ্কার করুন',
      'backButton': 'হোমে ফিরে যান',
      'aiResponseHeading': 'এআই প্রতিক্রিয়া:',
      'signInMessage': 'সহায়ক ব্যবহার করতে অনুগ্রহ করে সাইন ইন করুন।',
      'chooseLanguageTitle': 'আপনার পছন্দের ভাষা নির্বাচন করুন',
      'listening': 'শুনছি...',
      'generating': 'প্রতিক্রিয়া তৈরি হচ্ছে...',
      'copySuccess': 'অনুলিপি করা হয়েছে!'
    },
    'মराठी': {
      'dashboardTitle': 'आज तुम्हाला काय करायचे आहे?',
      'askMeAnythingTitle': 'काहीही विचारा',
      'askMeAnythingPlaceholder': "तुमची क्वेरी प्रविष्ट करा (उदा. 'भारतातील प्रमुख नद्या कोणत्या आहेत?', 'इंग्लंडमधील क्रिकेटचा इतिहास सांगा.').",
      'storyfyTitle': 'कथा बनवा',
      'storyfyPlaceholder': "'कथा बनवा' करण्यासाठी एखादी संकल्पना किंवा प्रश्न प्रविष्ट करा (उदा. 'प्रकाशसंश्लेषण समजावून सांगा', 'तारे का चमकतात?').",
      'instantKnowledgeBaseTitle': 'सोपे समजावून सांगा',
      'instantKnowledgeBasePlaceholder': "विद्यार्थी प्रश्न विचारा (उदा. 'आकाश निळा का आहे?', 'वीज म्हणजे काय?').",
      'generateButton': 'व्युत्पन्न करा',
      'clearButton': 'साफ करा',
      'backButton': 'मुख्यपृष्ठावर परत जा',
      'aiResponseHeading': 'AI प्रतिसाद:',
      'signInMessage': 'सहायक वापरण्यासाठी कृपया साइन इन करा.',
      'chooseLanguageTitle': 'आपली पसंतीची भाषा निवडा',
      'listening': 'ऐकत आहे...',
      'generating': 'प्रतिसाद तयार करत आहे...',
      'copySuccess': 'कॉपी केले!'
    },
    'ગુજરાતી': {
      'dashboardTitle': 'આજે તમે શું કરવા માંગો છો?',
      'askMeAnythingTitle': 'કંઈપણ પૂછો',
      'askMeAnythingPlaceholder': "તમારી ક્વેરી દાખલ કરો (દા.ત. 'ભારતની મુખ્ય નદીઓ કઈ છે?', 'ઇંગ્લેન્ડમાં ક્રિકેટનો ઇતિહાસ કહો.').",
      'storyfyTitle': 'વાર્તા બનાવો',
      'storyfyPlaceholder': "'વાર્તા બનાવો' કરવા માટે ખ્યાલ અથવા પ્રશ્ન દાખલ કરો (દા.ત. 'પ્રકાશસંશ્લેષણ સમજાવો', 'તારાઓ કેમ ચમકે છે?').",
      'instantKnowledgeBaseTitle': 'સરળતાથી સમજાવો',
      'instantKnowledgeBasePlaceholder': "વિદ્યાર્થી પ્રશ્ન પૂછો (દા.ત. 'આકાશ વાદળી કેમ છે?', 'વીજળી શું છે?').",
      'generateButton': 'ઉત્પન્ન કરો',
      'clearButton': 'સાફ કરો',
      'backButton': 'હોમ પર પાછા જાઓ',
      'aiResponseHeading': 'AI પ્રતિભાવ:',
      'signInMessage': 'સહાયક વાપરવા માટે કૃપા કરીને સાઇન ઇન કરો.',
      'chooseLanguageTitle': 'તમારી પસંદગીની ભાષા પસંદ કરો',
      'listening': 'સાંભળી રહ્યા છીએ...',
      'generating': 'પ્રતિભાવ જનરેટ કરી રહ્યું છે...',
      'copySuccess': 'કૉપિ કર્યું!'
    },
    'પੰਜਾਬੀ': {
      'dashboardTitle': 'ਅੱਜ ਤੁਸੀਂ ਕੀ ਕਰਨਾ ਚਾਹੋਗੇ?',
      'askMeAnythingTitle': 'ਕੁਝ ਵੀ ਪੁੱਛੋ',
      'askMeAnythingPlaceholder': "ਆਪਣੀ ਪ੍ਰਸ਼ਨ ਦਰਜ ਕਰੋ (ਉਦਾਹਰਨ ਲਈ, 'ਭਾਰਤ ਦੀਆਂ ਮੁੱਖ ਨਦੀਆਂ ਕਿਹੜੀਆਂ ਹਨ?', 'ਇੰਗਲੈਂਡ ਵਿੱਚ ਕ੍ਰਿਕਟ ਦਾ ਇਤਿਹਾਸ ਦੱਸੋ।').",
      'storyfyTitle': 'ਕਹਾਣੀ ਬਣਾਓ',
      'storyfyPlaceholder': "ਕਹਾਣੀ ਬਣਾਉਣ ਲਈ ਇੱਕ ਸੰਕਲਪ ਜਾਂ ਪ੍ਰਸ਼ਨ ਦਰਜ ਕਰੋ (ਉਦਾਹਰਨ ਲਈ, 'ਪ੍ਰਕਾਸ਼ ਸੰਸ਼ਲੇਸ਼ਣ ਬਾਰੇ ਦੱਸੋ', 'ਤਾਰੇ ਕਿਉਂ ਚਮਕਦੇ ਹਨ?').",
      'instantKnowledgeBaseTitle': 'ਸਰਲਤਾ ਨਾਲ ਸਮਝਾਓ',
      'instantKnowledgeBasePlaceholder': "ਵਿਦਿਆਰਥੀ ਸਵਾਲ ਪੁੱਛੋ (ਉਦਾਹਰਨ ਲਈ, 'ਅਕਾਸ਼ ਨੀਲਾ ਕਿਉਂ ਹੈ?', 'ਬਿਜਲੀ ਕੀ ਹੈ?').",
      'generateButton': 'ਤਿਆਰ ਕਰੋ',
      'clearButton': 'ਸਾਫ਼ ਕਰੋ',
      'backButton': 'ਘਰ ਵਾਪਸ ਜਾਓ',
      'aiResponseHeading': 'AI ਜਵਾਬ:',
      'signInMessage': 'ਸਹਾਇਕ ਦੀ ਵਰਤੋਂ ਕਰਨ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਸਾਈਨ ਇਨ ਕਰੋ।',
      'chooseLanguageTitle': 'ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ',
      'listening': 'ਸੁਣ ਰਿਹਾ ਹੈ...',
      'generating': 'ਜਵਾਬ ਬਣਾ ਰਿਹਾ ਹੈ...',
      'copySuccess': 'ਕਾਪੀ ਕੀਤਾ ਗਿਆ!'
    }
  };

  // Helper to get the current language code
  const getCurrentLangCode = () => {
    const lang = languageOptions.find(opt => opt.name === selectedLanguage);
    return lang ? lang.langCode : 'en-US'; // Default to English US
  };

  // Effect for Authentication and Language Preference Loading
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const savedLanguage = localStorage.getItem('userLanguage');
        if (savedLanguage) {
          setSelectedLanguage(savedLanguage);
        } else {
          setShowLanguageSetup(true);
        }
      } else {
        setAiResponse('');
        setPrompt('');
        setCurrentView('dashboard');
        setSelectedLanguage('English');
        localStorage.removeItem('userLanguage');
      }
    });

    // Close language dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    // Initialize SpeechRecognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false; // Listen for a single utterance
      recognitionRef.current.interimResults = false; // Only return final results

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setPrompt(transcript);
        setIsListening(false);
        setTriggerVoiceOutput(true);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setTriggerVoiceOutput(false);
        alert("Speech recognition error: " + event.error);
      };

      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended. Current prompt:', prompt);
        setIsListening(false);
        setTimeout(() => {
          console.log('Prompt value after timeout in onend:', prompt);
          if (prompt.trim()) {
            console.log('Attempting to auto-generate content from speech end.');
            handleGenerateContent();
          } else {
            console.log('No prompt detected, not auto-generating.');
            setTriggerVoiceOutput(false);
          }
        }, 100);
      };
    } else {
      console.warn("Speech Recognition API not supported in this browser.");
    }

    // Log available voices to console for debugging TTS issues
    if ('speechSynthesis' in window) {
      speechSynthesis.onvoiceschanged = () => {
        console.log("Available TTS voices:", speechSynthesis.getVoices().map(voice => ({
          name: voice.name,
          lang: voice.lang,
          default: voice.default
        })));
      };
      if (speechSynthesis.getVoices().length > 0) {
        console.log("Available TTS voices (on load):", speechSynthesis.getVoices().map(voice => ({
          name: voice.name,
          lang: voice.lang,
          default: voice.default
        })));
      }
    }

    return () => {
      unsubscribeAuth();
      document.removeEventListener('mousedown', handleClickOutside);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, [prompt]);

  // Speak AI response when it changes, ONLY if triggerVoiceOutput is true
  useEffect(() => {
    if (aiResponse && !loading && triggerVoiceOutput) {
      handleSpeakResponse(aiResponse);
    }
  }, [aiResponse, loading, triggerVoiceOutput]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
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

  // Speech-to-Text handler
  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.lang = getCurrentLangCode();
      recognitionRef.current.start();
      setIsListening(true);
      setPrompt('');
      setAiResponse('');
      setTriggerVoiceOutput(true);
    }
  };

  // Text-to-Speech handler
  const handleSpeakResponse = (textToSpeak) => {
    if (!'speechSynthesis' in window) {
      alert("Text-to-Speech is not supported in your browser.");
      return;
    }
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = getCurrentLangCode();

    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      voice => voice.lang === getCurrentLangCode() && voice.default
    ) || voices.find(
      voice => voice.lang.startsWith(getCurrentLangCode().substring(0, 2))
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
      console.log(`Using voice: ${preferredVoice.name} (${preferredVoice.lang}) for language code ${getCurrentLangCode()}`);
    } else {
      console.warn(`No specific voice found for ${getCurrentLangCode()}. Using browser default.`);
      utterance.lang = getCurrentLangCode();
    }

    speechSynthesis.speak(utterance);
  };

  // Copy to Clipboard handler
  const handleCopyResponse = () => {
    if (aiResponse) {
      navigator.clipboard.writeText(aiResponse)
        .then(() => {
          alert(currentViewTexts.copySuccess);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
          alert('Failed to copy text. Please try again.');
        });
    }
  };

  const handleGenerateContent = async () => {
    if (!prompt.trim()) {
      alert('Please enter your query!');
      setLoading(false);
      setTriggerVoiceOutput(false);
      return;
    }
    setLoading(true);
    setAiResponse('');
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    let finalPrompt = prompt;

    switch (currentView) {
      case 'askMeAnything':
        finalPrompt = `As a helpful teaching assistant from India, respond to the following request. If a specific country is mentioned, adjust context accordingly, otherwise, keep an Indian context: ${prompt}`;
        break;
      case 'storyfy':
        finalPrompt = `Turn the following concept or question into a simple, understandable, engaging story for elementary school children in India: "${prompt}"`;
        break;
      case 'instantKnowledgeBase': // This is the 'SimplyExplain' feature
        finalPrompt = `You are explaining concepts to a young child (age 6-10). Explain the following concept or question very simply, accurately, and clearly. Your explanation should be **very brief** (1-3 short sentences/paragraphs). Crucially, include **only one, very clear, and highly relatable analogy** that a child would immediately understand (e.g., for electricity, "like water flowing in pipes"). Do NOT use complex words or multiple analogies. Explain this concept in ${selectedLanguage}: "${prompt}"`;
        break;
      default:
        alert("Please select an option from the home screen.");
        setLoading(false);
        setTriggerVoiceOutput(false);
        return;
    }

    // Only add language prefix if not SimplyExplain and not English
    if (currentView !== 'instantKnowledgeBase' && selectedLanguage !== 'English') {
        finalPrompt = `Respond in ${selectedLanguage}: ${finalPrompt}`;
    }

    try {
      const result = await textModel.generateContent(finalPrompt);
      const response = await result.response;
      const text = response.text();
      setAiResponse(text);
    } catch (error) {
      console.error("Error generating content:", error);
      setAiResponse("Error: Could not generate content. Please try again. " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setAiResponse('');
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    setTriggerVoiceOutput(false);
  };

  // Handles manual text input changing the prompt
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    setTriggerVoiceOutput(false);
  };

  // Get translated texts for the current view content
  const currentViewTexts = viewContentTranslations[selectedLanguage] || viewContentTranslations['English'];

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
                  <span className="language-setup-modal-icon">{lang.icon}</span> {lang.name}
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
                        <span className="mr-2">{lang.icon}</span> {lang.name}
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
                  {(() => {
                    const currentLanguageFeatures = featureTranslations[selectedLanguage] || featureTranslations['English'];
                    return featureCards.map((card) => (
                      <button
                        key={card.id}
                        onClick={() => setCurrentView(card.id)}
                        className="feature-card"
                      >
                        <span className="feature-card-icon">
                          {card.id === 'askMeAnything' ? '💬' :
                           card.id === 'storyfy' ? '📚' :
                           card.id === 'instantKnowledgeBase' ? '💡' : // Icon for SimplyExplain
                           '✨'}
                        </span>
                        <h3>{currentLanguageFeatures[card.id].name}</h3>
                        <p>{currentLanguageFeatures[card.id].description}</p>
                      </button>
                    ));
                  })()}
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
                  {currentView === 'askMeAnything' ? currentViewTexts.askMeAnythingTitle :
                   currentView === 'storyfy' ? currentViewTexts.storyfyTitle :
                   currentView === 'instantKnowledgeBase' ? currentViewTexts.instantKnowledgeBaseTitle : // Title for SimplyExplain
                   ''}
                </h2>

                <div className="input-with-voice-button">
                  <textarea
                    className="text-input"
                    placeholder={
                      currentView === 'askMeAnything'
                        ? currentViewTexts.askMeAnythingPlaceholder
                        : currentView === 'storyfy'
                          ? currentViewTexts.storyfyPlaceholder
                          : currentView === 'instantKnowledgeBase'
                            ? currentViewTexts.instantKnowledgeBasePlaceholder // Placeholder for SimplyExplain
                            : ''
                    }
                    value={prompt}
                    onChange={handlePromptChange}
                    disabled={loading || isListening}
                  ></textarea>
                  <button
                    onClick={handleVoiceInput}
                    className={`voice-input-button ${isListening ? 'listening' : ''}`}
                    title={isListening ? currentViewTexts.listening : 'Voice Input'}
                    disabled={loading}
                  >
                    🎤
                  </button>
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
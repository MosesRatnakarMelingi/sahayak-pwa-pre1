// src/config.js

// --- GLOBAL/CONSTANT DATA DEFINITIONS ---

export const languageOptions = [
  { id: 'english', name: 'English', langCode: 'en-US' },
  { id: 'hindi', name: 'हिंदी', langCode: 'hi-IN' },
  { id: 'telugu', name: 'తెలుగు', langCode: 'te-IN' },
  { id: 'tamil', name: 'தமிழ்', langCode: 'ta-IN' },
  { id: 'kannada', name: 'ಕನ್ನಡ', langCode: 'kn-IN' },
  { id: 'malayalam', name: 'മലയാളം', langCode: 'ml-IN' },
  { id: 'bengali', name: 'বাংলা', langCode: 'bn-IN' },
  { id: 'marathi', name: 'मराठी', langCode: 'mr-IN' },
  { id: 'gujarati', name: 'ગુજરાતી', langCode: 'gu-IN' },
  { id: 'punjabi', name: 'ਪੰਜਾਬੀ', langCode: 'pa-IN' },
];

// Define the modes available within the main AI Assistant feature
export const aiModes = [
  { id: 'askAI', name: 'AskAI', icon: '❓', placeholderKey: 'askAIPlaceholder', description: 'Get general queries or facts (India-focused).' },
  { id: 'storyfy', name: 'Storify', icon: '📖', placeholderKey: 'storyfyPlaceholder', description: 'Explain concepts simply as stories for kids.' },
  { id: 'explainify', icon: '💡', placeholderKey: 'explainifyPlaceholder', description: 'Get concise, simple explanations with easy analogies.' },
  { id: 'gamify', name: 'Gamify', icon: '🎲', placeholderKey: 'gamifyPlaceholder', description: 'Generate simple, text-based games from any lesson or topic.' },
];

export const featureCards = [
  // Combined AI Assistant card
  { id: 'aiAssistant', icon: '✨', title: 'AI Assistant', description: 'Get help with general queries, stories, explanations, or games.' },
  { id: 'skillPlay', icon: '🎭', title: 'SkillPlay', description: 'Generate role-play scenarios and dialogues to develop life skills beyond academics.' }, // Updated feature
  { id: 'adaptify', icon: '📝', title: 'Adaptify', description: 'Upload content (e.g., textbook page photo) to generate differentiated materials for various grade levels.' },
  { id: 'lensAI', icon: '🔍', title: 'LensAI', description: 'Upload diagrams or charts for AI-powered explanations of their components and concepts.' },
  { id: 'readify', icon: '🎧', title: 'Readify', description: 'Assess student reading fluency and pronunciation.' },
];

export const featureTranslations = {
  'English': {
    'aiAssistant': {
      name: 'AI Assistant',
      description: 'Get help with general queries, stories, explanations, or games.'
    },
    'askAI': {
      name: 'AskAI',
      description: 'Get general queries or facts (India-focused).'
    },
    'storyfy': {
      name: 'Storify',
      description: 'Explain concepts simply as stories for kids.'
    },
    'explainify': {
      name: 'Explainify',
      description: 'Get concise, simple explanations with easy analogies.'
    },
    'gamify': {
      name: 'Gamify',
      description: 'Generate simple, text-based games from any lesson or topic.'
    },
    'skillPlay': { // Updated
      name: 'SkillPlay',
      description: 'Generate role-play scenarios and dialogues to develop life skills beyond academics.'
    },
    'adaptify': {
      name: 'Adaptify',
      description: 'Upload content (e.g., textbook page photo) to generate differentiated materials for various grade levels.'
    },
    'lensAI': {
      name: 'LensAI',
      description: 'Upload diagrams or charts for AI-powered explanations of their components and concepts.'
    },
    'readify': {
      name: 'Readify',
      description: 'Assess student reading fluency and pronunciation.'
    },
  },
  'हिंदी': {
    'aiAssistant': {
      name: 'एआई सहायक',
      description: 'सामान्य प्रश्नों, कहानियों, स्पष्टीकरणों या खेलों में सहायता प्राप्त करें।'
    },
    'askAI': {
      name: 'आस्कएआई',
      description: 'सामान्य प्रश्न या स्थानीय तथ्य (भारत-केंद्रित) प्राप्त करें।'
    },
    'storyfy': {
      name: 'कहानियां बनाओ',
      description: 'अवधारणाओं को बच्चों के लिए कहानियों के रूप में समझाएं।'
    },
    'explainify': {
      name: 'एक्सप्लेनिफ़ाई',
      description: 'आसान उपमाओं के साथ संक्षिप्त, सरल स्पष्टीकरण प्राप्त करें।'
    },
    'gamify': {
      name: 'गेमिफ़ाई',
      description: 'किसी भी पाठ या विषय से सरल, पाठ-आधारित गेम बनाएं।'
    },
    'skillPlay': { // Updated
      name: 'स्किलप्ले',
      description: 'शैक्षणिक शिक्षा से परे जीवन कौशल विकसित करने के लिए भूमिका-निभाने की स्थितियां और संवाद उत्पन्न करें।'
    },
    'adaptify': {
      name: 'अनुकूलन करें',
      description: 'विभिन्न ग्रेड स्तरों के लिए भिन्न सामग्री बनाने के लिए सामग्री (उदा. पाठ्यपुस्तक पृष्ठ फोटो) अपलोड करें।'
    },
    'lensAI': {
      name: 'लेंसएआई',
      description: 'आरेख या चार्ट अपलोड करें ताकि उनके घटकों और अवधारणाओं की एआई-संचालित व्याख्या मिल सके।'
    },
    'readify': {
      name: 'रीडिफ़ाई',
      description: 'छात्रों की पढ़ने की प्रवाह और उच्चारण का आकलन करें।'
    },
  },
  'తెలుగు': {
    'aiAssistant': {
      name: 'AI అసిస్టెంట్',
      description: 'సాధారణ ప్రశ్నలు, కథలు, వివరణలు లేదా ఆటలతో సహాయం పొందండి।'
    },
    'askAI': {
      name: 'ఆస్క్‌ఏఐ',
      description: 'సాధారణ ప్రశ్నలకు లేదా స్థానిక వాస్తవాలకు (భారతదేశం-కేంద్రీకృత) సమాధానాలు పొందండి।'
    },
    'storyfy': {
      name: 'కథలుగా మార్చండి',
      description: 'పిల్లల కోసం భావనలను కథలుగా సులభంగా వివరించండి।'
    },
    'explainify': {
      name: 'ఎక్స్‌ప్లెయిన్‌ఫై',
      description: 'సులభమైన పోలికలతో సంక్షిప్త, సాధారణ వివరణలను పొందండి।'
    },
    'gamify': {
      name: 'గేమిఫై',
      description: 'ఏ పాఠం లేదా అంశం నుండి అయినా సాధారణ, వచన-ఆధారిత ఆటలను రూపొందించండి।'
    },
    'skillPlay': { // Updated
      name: 'స్కిల్‌ప్లే',
      description: 'విద్యాభ్యాసానికి మించి జీవిత నైపుణ్యాలను అభివృద్ధి చేయడానికి పాత్ర-పోషణ దృశ్యాలు మరియు సంభాషణలను రూపొందించండి।'
    },
    'adaptify': {
      name: 'అడాప్టిఫై',
      description: 'వివిధ గ్రేడ్ స్థాయిల కోసం భేదాత్మక పదార్థాలను రూపొందించడానికి కంటెంట్‌ను (ఉదా. పాఠ్యపుస్తక పేజీ ఫోటో) అప్‌లోడ్ చేయండి।'
    },
    'lensAI': {
      name: 'లెన్స్ఏఐ',
      description: 'రేఖాచిత్రాలు లేదా చార్ట్‌లను అప్‌లోడ్ చేయండి, వాటి భాగాలు మరియు భావనల AI-ఆధారిత వివరణల కోసం।'
    },
    'readify': {
      name: 'రీడిఫై',
      description: 'విద్యార్థుల చదివే సామర్థ్యం మరియు ఉచ్చారణలను అంచనా వేయండి।'
    },
  },
  'தமிழ்': {
    'aiAssistant': {
      name: 'AI உதவியாளர்',
      description: 'பொதுவான கேள்விகள், கதைகள், விளக்கங்கள் அல்லது விளையாட்டுகளில் உதவி பெறுங்கள்।'
    },
    'askAI': {
      name: 'ஆஸ்க்ஏஐ',
      description: 'பொதுவான கேள்விகள் அல்லது உள்ளூர் தகவல்களை (இந்தியா சார்ந்தது) பெறுங்கள்।'
    },
    'storyfy': {
      name: 'கதையாக்குங்கள்',
      description: 'குழந்தைகளுக்கான கதைகளாக கருத்துக்களை எளிமையாக விளக்குங்கள்।'
    },
    'explainify': {
      name: 'எக்ஸ்பிளைனிஃபை',
      description: 'எளிதான ஒப்புமைகளுடன் சுருக்கமான, எளிய விளக்கங்களைப் பெறுங்கள்।'
    },
    'gamify': {
      name: 'கேமிஃபை',
      description: 'எந்தவொரு பாடம் அல்லது தலைப்பிலிருந்தும் எளிய, உரை அடிப்படையிலான விளையாட்டுகளை உருவாக்குங்கள்।'
    },
    'skillPlay': { // Updated
      name: 'ஸ்கில்ப்ளே',
      description: 'கல்விக்கு அப்பாற்பட்ட வாழ்க்கை திறன்களை வளர்க்கும் வகையில் ரோல்-ப்ளே காட்சிகள் மற்றும் உரையாடல்களை உருவாக்குங்கள்.'
    },
    'adaptify': {
      name: 'அடாப்டிஃபை',
      description: 'பல்வேறு தர நிலைகளுக்கு வேறுபட்ட உள்ளடக்கங்களை உருவாக்க உள்ளடக்கத்தை (எ.கா., பாடநூல் பக்க புகைப்படம்) பதிவேற்றவும்।'
    },
    'lensAI': {
      name: 'லென்ஸ்ஏஐ',
      description: 'வரைபடங்கள் அல்லது விளக்கப்படங்களைப் பதிவேற்றி, அவற்றின் கூறுகள் மற்றும் கருத்துகளை AI மூலம் விளக்கங்களைப் பெற உங்களுக்கு உதவும்।'
    },
    'readify': {
      name: 'ரீடிஃபை',
      description: 'மாணவர்களின் வாசிப்பு சரளம் மற்றும் உச்சரிப்புகளை மதிப்பிடவும்।'
    },
  },
  'கನ್ನಡ': {
    'aiAssistant': {
      name: 'AI ಸಹಾಯಕ',
      description: 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು, ಕಥೆಗಳು, ವಿವರಣೆಗಳು ಅಥವಾ ಆಟಗಳೊಂದಿಗೆ ಸಹಾಯ ಪಡೆಯಿರಿ।'
    },
    'askAI': {
      name: 'ಆಸ್ಕ್‌ಎಐ',
      description: 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು ಅಥವಾ ಸ್ಥಳೀಯ ಸಂಗತಿಗಳನ್ನು (ಭಾರತ-ಕೇಂದ್ರಿತ) ಪಡೆಯಿರಿ।'
    },
    'storyfy': {
      name: 'ಕಥೆಯಾಗಿ',
      description: 'ಮಕ್ಕಳಿಗಾಗಿ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ಸರಳ ಕಥೆಗಳಾಗಿ ವಿವರಿಸಿ।'
    },
    'explainify': {
      name: 'ಎಕ್ಸ್‌ಪ್ಲೈನ್‌ಫೈ',
      description: 'ಸುಲಭ ಹೋಲಿಕೆಗಳೊಂದಿಗೆ ಸಂಕ್ಷಿಪ್ತ, ಸರಳ ವಿವರಣೆಗಳನ್ನು ಪಡೆಯಿರಿ।'
    },
    'gamify': {
      name: 'ಗೇಮಿಫೈ',
      description: 'ಯಾವುದೇ ಪಾಠ ಅಥವಾ ವಿಷಯದಿಂದ ಸರಳ, ಪಠ್ಯ-ಆಧಾರಿತ ಆಟಗಳನ್ನು ರಚಿಸಿ।'
    },
    'skillPlay': { // Updated
      name: 'ಸ್ಕಿಲ್‌ಪ್ಲೇ',
      description: 'ಶೈಕ್ಷಣಿಕ ವಿಷಯಗಳ ಹೊರತಾಗಿ ಜೀವನ ಕೌಶಲ್ಯಗಳನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸಲು ರೋಲ್-ಪ್ಲೇ ಸನ್ನಿವೇಶಗಳು ಮತ್ತು ಸಂಭಾಷಣೆಗಳನ್ನು ರಚಿಸಿ।'
    },
    'adaptify': {
      name: 'ಅಡಾಪ್ಟಿಫೈ',
      description: 'ವಿವಿಧ ದರ್ಜೆಯ ಹಂತಗಳಿಗೆ ವಿಭಿನ್ನ ವಸ್ತುಗಳನ್ನು ರಚಿಸಲು ವಿಷಯವನ್ನು (ಉದಾ. ಪಾಠಪುಸ್ತಕ ಪುಟದ ಫೋಟೋ) ಅಪ್‌ಲೋಡ್ ಮಾಡಿ।'
    },
    'lensAI': {
      name: 'ಲೆನ್ಸ್‌ಎಐ',
      description: 'AI-ಚಾಲಿತ ವಿವರಣೆಗಳಿಗಾಗಿ ರೇಖಾಚಿತ್ರಗಳು ಅಥವಾ ಚಾರ್ಟ್‌ಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ।'
    },
    'readify': {
      name: 'ರೀಡಿಫೈ',
      description: 'ವಿದ್ಯಾರ್ಥಿಗಳ ಓದುವ ಹರಿವು ಮತ್ತು ಉಚ್ಚಾರಣೆಗಳನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಿ।'
    },
  },
  'മലയാളം': {
    'aiAssistant': {
      name: 'AI അസിസ്റ്റന്റ്',
      description: 'പൊതുവായ ചോദ്യങ്ങൾ, കഥകൾ, വിശദീകരണങ്ങൾ അല്ലെങ്കിൽ ഗെയിമുകൾ എന്നിവയിൽ സഹായം നേടുക।'
    },
    'askAI': {
      name: 'ആസ്ക്എഐ',
      description: 'പൊതുവായ ചോദ്യങ്ങൾക്കോ പ്രാദേശിക വിവരങ്ങൾക്കോ (ഇന്ത്യൻ-അധിഷ്ഠിതം) ഉത്തരം നേടുക।'
    },
    'storyfy': {
      name: 'കഥയാക്കൂ',
      description: 'കുട്ടികൾക്കായി ആശയങ്ങളെ ലളിതമായ കഥകളാക്കി മാറ്റുക।'
    },
    'explainify': {
      name: 'എക്സ്പ്ലൈനിഫൈ',
      description: 'ലളിതമായ സാമ്യങ്ങളോടുകൂടിയ സംക്ഷിപ്തവും ലളിതവുമായ വിശദീകരണങ്ങൾ നേടുക।'
    },
    'gamify': {
      name: 'ഗെയിമിഫൈ',
      description: 'ഏത് പാഠത്തിൽ നിന്നോ വിഷയത്തിൽ നിന്നോ ലളിതമായ, ടെക്സ്റ്റ് അധിഷ്ഠിത ഗെയിമുകൾ ഉണ്ടാക്കുക।'
    },
    'skillPlay': { // Updated
      name: 'സ്കിൽപ്ലേ',
      description: 'വിദ്യാഭ്യാസത്തിനപ്പുറം ജീവിത നൈപുണ്യങ്ങൾ വികസിപ്പിക്കുന്നതിന് റോൾ-പ്ലേ സാഹചര്യങ്ങളും സംഭാഷണങ്ങളും ഉണ്ടാക്കുക।'
    },
    'adaptify': {
      name: 'അഡാപ്റ്റിഫൈ',
      description: 'വിവിധ ഗ്രേഡ് തലങ്ങളിലേക്ക് വ്യത്യസ്തമായ പഠന സാമഗ്രികൾ ഉണ്ടാക്കാൻ ഉള്ളടക്കം (ഉദാ: പാഠപുസ്തക പേജിന്റെ ഫോട്ടോ) അപ്ലോഡ് ചെയ്യുക।'
    },
    'lensAI': {
      name: 'ലെൻസ്എഐ',
      description: 'ഡയഗ്രമുകളോ ചാർട്ടുകളോ അപ്‌ലോഡ് ചെയ്യുക, അവയുടെ ഘടകങ്ങളെയും ആശയങ്ങളെയും കുറിച്ചുള്ള AI-അധിഷ്ഠിത വിശദീകരണങ്ങൾക്കായി।'
    },
    'readify': {
      name: 'റീഡിഫൈ',
      description: 'വിദ്യാർത്ഥികളുടെ വായനയുടെ ഒഴുക്കും ഉച്ചാരണങ്ങളും വിലയിരുത്തുക।'
    },
  },
  'বাংলা': {
    'aiAssistant': {
      name: 'এআই অ্যাসিস্ট্যান্ট',
      description: 'সাধারণ প্রশ্ন, গল্প, ব্যাখ্যা বা গেমগুলির সাথে সহায়তা পান।'
    },
    'askAI': {
      name: 'আস্কএআই',
      description: 'সাধারণ প্রশ্ন বা স্থানীয় তথ্য (ভারত-কেন্দ্রিক) পান।'
    },
    'storyfy': {
      name: 'গল্প তৈরি করুন',
      description: 'বাচ্চাদের জন্য ধারণাগুলিকে সহজ গল্পে ব্যাখ্যা করুন।'
    },
    'explainify': {
      name: 'এক্সপ্লেইনফাই',
      description: 'সহজ উপমা সহ সংক্ষিপ্ত, সরল ব্যাখ্যা পান।'
    },
    'gamify': {
      name: 'গেম তৈরি করুন',
      description: 'যেকোনো পাঠ বা বিষয় থেকে সহজ, পাঠ-ভিত্তিক গেম তৈরি করুন।'
    },
    'skillPlay': { // Updated
      name: 'স্কিলপ্লে',
      description: 'শিক্ষাগত শিক্ষার বাইরে জীবন দক্ষতা বিকাশের জন্য ভূমিকা-পালনের পরিস্থিতি এবং সংলাপ তৈরি করুন।'
    },
    'adaptify': {
      name: 'অভিযোজন করুন',
      description: 'বিভিন্ন গ্রেড স্তরের জন্য ভিন্ন ভিন্ন উপকরণ তৈরি করতে বিষয়বস্তু (যেমন, পাঠ্যপুস্তকের পৃষ্ঠার ছবি) আপলোড করুন।'
    },
    'lensAI': {
      name: 'লেন্সএআই',
      description: 'আঁকা বা চার্ট আপলোড করুন তাদের উপাদান এবং ধারণাগুলির এআই-চালিত ব্যাখ্যার জন্য।'
    },
    'readify': {
      name: 'রিডিফাই',
      description: 'শিক্ষার্থীদের পড়ার সাবলীলতা এবং উচ্চারণের মূল্যায়ন করুন।'
    },
  },
  'মराठी': {
    'aiAssistant': {
      name: 'एआय असिस्टंट',
      description: 'सामान्य प्रश्न, कथा, स्पष्टीकरण किंवा गेमसह मदत मिळवा।'
    },
    'askAI': {
      name: 'आस्कएआय',
      description: 'सामान्य प्रश्न किंवा स्थानिक तथ्ये (भारत-केंद्रित) मिळवा।'
    },
    'storyfy': {
      name: 'कथा बनवा',
      description: 'मुलांसाठी संकल्पनांना सोप्या कथांमध्ये समजावून सांगा।'
    },
    'explainify': {
      name: 'एक्सप्लेनिफाय',
      description: 'सोप्या उपमांसह संक्षिप्त, सोपी स्पष्टीकरणे मिळवा।'
    },
    'gamify': {
      name: 'गेमिफाय',
      description: 'कोणत्याही धड्यातून किंवा विषयातून साधे, मजकूर-आधारित गेम तयार करा।'
    },
    'skillPlay': { // Updated
      name: 'स्किलप्ले',
      description: 'शैक्षणिक शिक्षणापलीकडील जीवन कौशल्ये विकसित करण्यासाठी भूमिका-खेळण्याच्या परिस्थिती आणि संवाद तयार करा।'
    },
    'adaptify': {
      name: 'अ‍ॅडॅप्टिफाय',
      description: 'विविध ग्रेड स्तरांसाठी भिन्न सामग्री तयार करण्यासाठी सामग्री (उदा. पाठ्यपुस्तक पृष्ठाचा फोटो) अपलोड करण्यास मदत करेल।'
    },
    'lensAI': {
      name: 'लेन्सएआय',
      description: 'आकडेवारी किंवा तक्त्यांच्या घटकांचे आणि संकल्पनांचे AI-आधारित स्पष्टीकरण मिळवण्यासाठी ते अपलोड करण्यास मदत करेल।'
    },
    'readify': {
      name: 'रीडीफाय',
      description: 'विद्यार्थ्यांच्या वाचनाची ओघ आणि उच्चारणांचे मूल्यांकन करा।'
    },
  },
  'ગુજરાતી': {
    'aiAssistant': {
      name: 'AI આસિસ્ટન્ટ',
      description: 'સામાન્ય પ્રશ્નો, વાર્તાઓ, સમજૂતીઓ અથવા રમતો સાથે મદદ મેળવો।'
    },
    'askAI': {
      name: 'આસ્કએઆઈ',
      description: 'સામાન્ય પ્રશ્નો અથવા સ્થાનિક તથ્યો (ભારત-કેન્દ્રિત) મેળવો।'
    },
    'storyfy': {
      name: 'વાર્તા બનાવો',
      description: 'બાળકો માટે ખ્યાલોને સરળ વાર્તાઓમાં સમજાવો।'
    },
    'explainify': {
      name: 'એક્સપ્લેનિફાય',
      description: 'સરળ સરખામણીઓ સાથે સંક્ષિપ્ત, સરળ સમજૂતીઓ મેળવો।'
    },
    'gamify': {
      name: 'ગેમિફાય',
      description: 'કોઈપણ પાઠ અથવા વિષયમાંથી સરળ, ટેક્સ્ટ-આધારિત રમતો બનાવવામાં મદદ કરે છે।'
    },
    'skillPlay': { // Updated
      name: 'સ્કિલપ્લે',
      description: 'શૈક્ષણિક બાબતો ઉપરાંત જીવન કૌશલ્યો વિકસાવવા માટે ભૂમિકા ભજવવાના દૃશ્યો અને સંવાદો બનાવો.'
    },
    'adaptify': {
      name: 'અડેપ્ટીફાય',
      description: 'વિવિધ ગ્રેડ સ્તરો માટે ભિન્ન સામગ્રી બનાવવા માટે સામગ્રી (દા.ત., પાઠ્યપુસ્તક પૃષ્ઠનો ફોટો) અપલોડ કરવામાં મદદ કરશે।'
    },
    'lensAI': {
      name: 'લેન્સએઆઈ',
      description: 'રેખાકૃતિઓ અથવા ચાર્ટ્સ અપલોડ કરવામાં મદદ કરશે, તેમના ઘટકો અને ખ્યાલોના AI-સંચાલિત સ્પષ્ટતા માટે।'
    },
    'readify': {
      name: 'રીડીફાય',
      description: 'વિદ્યાર્થીઓની વાંચનની પ્રવાહિતા અને ઉચ્ચારણોનું મૂલ્યાંકન કરો।'
    },
  },
  'પੰਜਾਬੀ': {
    'aiAssistant': {
      name: 'AI ਅਸਿਸਟੈਂਟ',
      description: 'ਆਮ ਪ੍ਰਸ਼ਨਾਂ, ਕਹਾਣੀਆਂ, ਵਿਆਖਿਆਵਾਂ ਜਾਂ ਖੇਡਾਂ ਨਾਲ ਮਦਦ ਪ੍ਰਾਪਤ ਕਰੋ।'
    },
    'askAI': {
      name: 'ਆਸਕਏਆਈ',
      description: "ਆਪਣੀ ਪ੍ਰਸ਼ਨ ਦਰਜ ਕਰੋ (ਉਦਾਹਰਨ ਲਈ, 'ਭਾਰਤ ਦੀਆਂ ਮੁੱਖ ਨਦੀਆਂ ਕਿਹੜੀਆਂ ਹਨ?', 'ਇੰਗਲੈਂਡ ਵਿੱਚ ਕ੍ਰਿਕਟ ਦਾ ਇਤਿਹਾਸ ਦੱਸੋ।')."
    },
    'storyfy': {
      name: 'ਕਹਾਣੀ ਬਣਾਓ',
      description: 'ਬੱਚਿਆਂ ਲਈ ਸੰਕਲਪਾਂ ਨੂੰ ਸਰਲ ਕਹਾਣੀਆਂ ਵਿੱਚ ਸਮਝਾਓ।'
    },
    'explainify': {
      name: 'ਐਕਸਪਲੇਨੀਫਾਈ',
      description: 'ਸਰਲ ਸਮਾਨਤਾਵਾਂ ਨਾਲ ਸੰਖੇਪ, ਸਰਲ ਵਿਆਖਿਆਵਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।'
    },
    'gamify': {
      name: 'ਗੇਮੀਫਾਈ',
      description: "ਕਿਸੇ ਵੀ ਪਾਠ ਜਾਂ ਵਿਸ਼ੇ ਤੋਂ ਸਰਲ, ਟੈਕਸਟ-ਅਧਾਰਤ ਗੇਮਾਂ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।"
    },
    'skillPlay': { // Updated
      name: 'ਸਕਿਲਪਲੇ',
      description: 'ਸਿੱਖਿਆ ਤੋਂ ਪਰੇ ਜੀਵਨ ਦੇ ਹੁਨਰਾਂ ਨੂੰ ਵਿਕਸਤ ਕਰਨ ਲਈ ਭੂਮਿਕਾ-ਨਿਭਾਉਣ ਦੇ ਦ੍ਰਿਸ਼ ਅਤੇ ਸੰਵਾਦ ਤਿਆਰ ਕਰੋ।'
    },
    'adaptify': {
      name: 'ਅਡੈਪਟੀਫਾਈ',
      description: "ਵੱਖ-ਵੱਖ ਗ੍ਰੇਡ ਪੱਧਰਾਂ ਲਈ ਵੱਖਰੀ ਸਮੱਗਰੀ ਤਿਆਰ ਕਰਨ ਲਈ ਸਮੱਗਰੀ (ਜਿਵੇਂ ਕਿ ਪਾਠ ਪੁਸਤਕ ਪੰਨੇ ਦੀ ਫੋਟੋ) ਅੱਪਲੋਡ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰੇਗਾ।"
    },
    'lensAI': {
      name: 'ਲੈਂਸਏਆਈ',
      description: "AI-ਸੰਚਾਲਿਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਡਾਇਗ੍ਰਾਮ ਜਾਂ ਚਾਰਟ ਅੱਪਲੋਡ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰੇਗਾ."
    },
    'readify': {
      name: 'ਰੀਡੀਫਾਈ',
      description: 'ਵਿਦਿਆਰਥੀਆਂ ਦੀ ਪੜ੍ਹਨ ਦੀ ਰਵਾਨਗੀ ਅਤੇ ਉਚਾਰਨ ਦਾ ਮੁਲਾਂਕਣ ਕਰੋ।'
    },
  }
};

export const viewContentTranslations = {
  'English': {
    'appTitle': 'Sahayak PWA',
    'homeButton': 'Home',
    'setupLanguage': 'Setup Language',
    'selectLanguage': 'Select your preferred language:',
    'saveButton': 'Save',
    'welcomeMessage': 'Welcome to Sahayak PWA! Please sign in.',
    'signInButton': 'Sign In with Google',
    'signOutButton': 'Sign Out',
    'dashboardTitle': 'What would you like to do today?',
    'aiAssistantTitle': 'AI Assistant', // New title for the combined feature
    'askAIPlaceholder': "Enter your query (e.g., 'What are the main rivers in India?', 'Tell me about the history of cricket in England').",
    'storyfyPlaceholder': "Enter a concept or question to 'Storify' (e.g., 'Explain photosynthesis', 'Why do stars twinkle?').",
    'explainifyPlaceholder': "Ask a student question (e.g., 'Why is the sky blue?', 'What is electricity?').",
    'gamifyPlaceholder': "Enter a topic or lesson to generate a text-based game (e.g., 'planets in our solar system', 'Indian history facts').",
    'skillPlayTitle': 'SkillPlay', // Removed (Under Development)
    'skillPlayPlaceholder': "Enter a scenario or skill for role-play (e.g., 'resolving a conflict with a friend', 'ordering food at a restaurant').", // New placeholder
    'adaptifyTitle': 'Adaptify (Under Development)',
    'lensAITitle': 'LensAI (Under Development)',
    'readifyTitle': 'Readify (Under Development)',
    'generateButton': 'Generate',
    'clearButton': 'Clear',
    'backButton': 'Back to Home',
    'aiResponseHeading': 'AI Response:',
    'signInMessage': 'Please sign in to use Sahayak.',
    'chooseLanguageTitle': 'Choose Your Preferred Language',
    'generating': 'Generating Response...',
    'copySuccess': 'Copied!',
    'yourQueryHeading': 'Your Query:', // Added for clarity in AI response section
    'gamifyUnderDevelopment': '', // This is no longer 'under development' as it's part of aiAssistant
    'skillPlayUnderDevelopment': 'Under Development. You will be notified once it is completed. SkillPlay helps generate role-play scenarios and dialogues to develop life skills beyond academics.', // Updated
    'adaptifyUnderDevelopment': 'Under Development. You will be notified once it is completed. Adaptify will help upload content (e.g., textbook page photo) to generate differentiated materials for various grade levels.',
    'lensAIUnderDevelopment': 'Under Development. You will be notified once it is completed. LensAI will help you upload diagrams or charts for AI-powered explanations of their components and concepts.',
    'readifyUnderDevelopment': 'Under Development. You will be notified once it is completed..Readify helps you to upload student voice recordings to assess reading fluency and pronunciation',
    'copyFailed': 'Failed to copy. Your browser might not support automatic clipboard access, or you denied permission.', // New message for copy failure
    'enterQuery': 'Please enter your query!', // New message for empty query
  },
  'हिंदी': {
    'appTitle': 'सहायक पीडब्ल्यूए',
    'homeButton': 'होम',
    'setupLanguage': 'भाषा सेट करें',
    'selectLanguage': 'अपनी पसंदीदा भाषा चुनें:',
    'saveButton': 'सहेजें',
    'welcomeMessage': 'सहायक पीडब्ल्यूए में आपका स्वागत है! कृपया साइन इन करें।',
    'signInButton': 'गूगल के साथ साइन इन करें',
    'signOutButton': 'साइन आउट करें',
    'dashboardTitle': 'आज आप क्या करना चाहेंगे?',
    'aiAssistantTitle': 'एआई सहायक', // New title for the combined feature
    'askAIPlaceholder': "अपनी क्वेरी दर्ज करें (उदाहरण: 'भारत की प्रमुख नदियाँ क्या हैं?', 'इंग्लैंड में क्रिकेट का इतिहास बताएं।').",
    'storyfyPlaceholder': "किसी अवधारणा या प्रश्न को 'कहानियां बनाओ' (उदाहरण: 'प्रकाश संश्लेषण समझाएं', 'तारे क्यों टिमटिमाते हैं?') में दर्ज करें।",
    'explainifyPlaceholder': "छात्र प्रश्न पूछें (उदाहरण: 'आकाश नीला क्यों है?', 'बिजली क्या है?').",
    'gamifyPlaceholder': "पाठ-आधारित गेम बनाने के लिए कोई विषय या पाठ दर्ज करें (उदाहरण: 'हमारे सौर मंडल के ग्रह', 'भारतीय इतिहास के तथ्य').",
    'skillPlayTitle': 'स्किलप्ले', // Removed (विकास के अधीन)
    'skillPlayPlaceholder': "भूमिका-निभाने के लिए एक परिदृश्य या कौशल दर्ज करें (उदाहरण: 'एक दोस्त के साथ विवाद सुलझाना', 'एक रेस्तरां में खाना ऑर्डर करना').", // New placeholder
    'adaptifyTitle': 'अनुकूलन करें (विकास के अधीन)',
    'lensAITitle': 'लेंसएआई (विकास के अधीन)',
    'readifyTitle': 'रीडिफ़ाई (विकास के अधीन)',
    'generateButton': 'उत्पन्न करें',
    'clearButton': 'साफ़ करें',
    'backButton': 'होम पर वापस जाएं',
    'aiResponseHeading': 'एआई प्रतिक्रिया:',
    'signInMessage': 'सहायक का उपयोग करने के लिए कृपया साइन इन करें।',
    'chooseLanguageTitle': 'अपनी पसंदीदा भाषा चुनें',
    'generating': 'प्रतिक्रिया उत्पन्न हो रही है...',
    'copySuccess': 'कॉपी किया गया!',
    'yourQueryHeading': 'आपकी क्वेरी:',
    'gamifyUnderDevelopment': '',
    'skillPlayUnderDevelopment': 'यह सुविधा विकास के अधीन है।. पूरा होने पर आपको सूचित किया जाएगा। स्किलप्ले शैक्षणिक शिक्षा से परे जीवन कौशल विकसित करने के लिए भूमिका-निभाने की स्थितियां और संवाद उत्पन्न करने में मदद करता है।', // Updated
    'adaptifyUnderDevelopment': 'यह सुविधा विकास के अधीन है।. पूरा होने पर आपको सूचित किया जाएगा। अनुकूलन विभिन्न ग्रेड स्तरों के लिए भिन्न सामग्री बनाने के लिए सामग्री (उदा. पाठ्यपुस्तक पृष्ठ फोटो) अपलोड करने में मदद करेगा।',
    'lensAIUnderDevelopment': 'यह सुविधा विकास के अधीन है।. पूरा होने पर आपको सूचित किया जाएगा। लेंसएआई आपको आरेख या चार्ट अपलोड करने में मदद करेगा ताकि उनके घटकों और अवधारणाओं की एआई-संचालित व्याख्या मिल सके।',
    'readifyUnderDevelopment': 'यह सुविधा विकास के अधीन है।. अपडेट के लिए बने रहें!',
    'copyFailed': 'कॉपी करने में विफल। आपका ब्राउज़र स्वचालित क्लिपबोर्ड एक्सेस का समर्थन नहीं कर सकता है, या आपने अनुमति से इनकार कर दिया है।',
    'enterQuery': 'कृपया अपनी क्वेरी दर्ज करें!',
  },
  'తెలుగు': {
    'appTitle': 'సహాయక్ పీడబ్ల్యూఏ',
    'homeButton': 'హోమ్',
    'setupLanguage': 'భాషను సెటప్ చేయండి',
    'selectLanguage': 'మీకు నచ్చిన భాషను ఎంచుకోండి:',
    'saveButton': 'సేవ్ చేయండి',
    'welcomeMessage': 'సహాయక్ పీడబ్ల్యూఏకు స్వాగతం! దయచేసి సైన్ ఇన్ చేయండి.',
    'signInButton': 'గూగుల్‌తో సైన్ ఇన్ చేయండి',
    'signOutButton': 'సైన్ అవుట్ చేయండి',
    'dashboardTitle': 'ఈరోజు మీరు ఏమి చేయాలనుకుంటున్నారు?',
    'aiAssistantTitle': 'AI అసిస్టెంట్',
    'askAIPlaceholder': "మీ ప్రశ్నను నమోదు చేయండి (ఉదా: 'భారతదేశంలోని ప్రధాన నదులు ఏమిటి?', 'ఇంగ్లాండ్‌లో క్రికెట్ చరిత్ర గురించి చెప్పండి.').",
    'storyfyPlaceholder': "కథగా మార్చడానికి ఒక భావన లేదా ప్రశ్నను నమోదు చేయండి (ఉదా: 'కిరణజన్య సంయోగక్రియను వివరించండి', 'నక్షత్రాలు ఎందుకు మెరుస్తాయి?').",
    'explainifyPlaceholder': "విద్యార్థి ప్రశ్న అడగండి (ఉదా: 'ఆకాశం ఎందుకు నీలం?', 'విద్యుత్ అంటే ఏమిటి?').",
    'gamifyPlaceholder': "వచన-ఆధారిత ఆటను రూపొందించడానికి ఒక అంశం లేదా పాఠాన్ని నమోదు చేయండి (ఉదా: 'మన సౌర వ్యవస్థలోని గ్రహాలు', 'భారత చరిత్ర వాస్తవాలు').",
    'skillPlayTitle': 'స్కిల్‌ప్లే', // Removed (అభివృద్ధిలో ఉంది)
    'skillPlayPlaceholder': "పాత్ర-పోషణ కోసం ఒక దృశ్యం లేదా నైపుణ్యాన్ని నమోదు చేయండి (ఉదా: 'స్నేహితుడితో వివాదాన్ని పరిష్కరించడం', 'రెస్టారెంట్‌లో ఆహారం ఆర్డర్ చేయడం').", // New placeholder
    'adaptifyTitle': 'అడాప్టిఫై (అభివృద్ధిలో ఉంది)',
    'lensAITitle': 'లెన్స్ఏఐ (అభివృద్ధిలో ఉంది)',
    'readifyTitle': 'రీడిఫై (అభివృద్ధిలో ఉంది)',
    'generateButton': 'ఉత్పన్నం చేయండి',
    'clearButton': 'శుభ్రం చేయండి',
    'backButton': 'హోమ్‌కి తిరిగి వెళ్ళండి',
    'aiResponseHeading': 'AI ప్రతిస్పందన:',
    'signInMessage': 'సహాయక్ ఉపయోగించడానికి దయచేసి సైన్ ఇన్ చేయండి.',
    'chooseLanguageTitle': 'మీకు నచ్చిన భాషను ఎంచుకోండి',
    'generating': 'ప్రతిస్పందన ఉత్పత్తి అవుతోంది...',
    'copySuccess': 'కాపీ చేయబడింది!',
    'yourQueryHeading': 'మీ ప్రశ్న:',
    'gamifyUnderDevelopment': '',
    'skillPlayUnderDevelopment': 'ఈ ఫీచర్ అభివృద్ధిలో ఉంది. పూర్తయిన తర్వాత మీకు తెలియజేయబడుతుంది. స్కిల్‌ప్లే విద్యాభ్యాసానికి మించి జీవిత నైపుణ్యాలను అభివృద్ధి చేయడానికి పాత్ర-పోషణ దృశ్యాలు మరియు సంభాషణలను రూపొందించడంలో సహాయపడుతుంది।', // Updated
    'lensAIUnderDevelopment': 'ఈ ఫీచర్ అభివృద్ధిలో ఉంది. పూర్తయిన తర్వాత మీకు తెలియజేయబడుతుంది. లెన్స్ఏఐ రేఖాచిత్రాలు లేదా చార్ట్‌లను అప్‌లోడ్ చేయడంలో మీకు సహాయపడుతుంది, వాటి భాగాలు మరియు భావనల AI-ఆధారిత వివరణల కోసం।',
    'readifyUnderDevelopment': 'ఈ ఫీచర్ అభివృద్ధిలో ఉంది. అప్‌డేట్‌ల కోసం చూస్తూ ఉండండి!',
    'copyFailed': 'కాపీ చేయడంలో విఫలమైంది. మీ బ్రౌజర్ ఆటోమేటిక్ క్లిప్‌బోర్డ్ యాక్సెస్‌కు మద్దతు ఇవ్వకపోవచ్చు లేదా మీరు అనుమతిని నిరాకరించారు.',
    'enterQuery': 'దయచేసి మీ ప్రశ్నను నమోదు చేయండి!',
  },
  'தமிழ்': {
    'appTitle': 'சஹாயக் பிடபிள்யூஏ',
    'homeButton': 'முகப்பு',
    'setupLanguage': 'மொழியை அமைக்கவும்',
    'selectLanguage': 'உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்:',
    'saveButton': 'சேமி',
    'welcomeMessage': 'சஹாயக் பிடபிள்யூஏ-க்கு வரவேற்கிறோம்! உள்நுழையவும்.',
    'signInButton': 'Google உடன் உள்நுழையவும்',
    'signOutButton': 'வெளியேறு',
    'dashboardTitle': 'இன்று நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?',
    'aiAssistantTitle': 'AI உதவியாளர்',
    'askAIPlaceholder': "உங்கள் கேள்வியை உள்ளிடவும் (எ.கா: 'இந்தியாவின் முக்கிய நதிகள் யாவை?', 'இங்கிலாந்தில் கிரிக்கெட் வரலாறு பற்றிச் சொல்லுங்கள்').",
    'storyfyPlaceholder': "கதையாக மாற்ற ஒரு கருத்து அல்லது கேள்வியை உள்ளிடவும் (எ.கா: 'ஒளிச்சேர்க்கையை விளக்குங்கள்', 'நட்சத்திரங்கள் ஏன் மின்னுகின்றன?').",
    'explainifyPlaceholder': "மாணவர் கேள்வியைக் கேளுங்கள் (எ.கா: 'வானம் ஏன் நீலமாக இருக்கிறது?', 'மின்சாரம் என்றால் என்ன?').",
    'gamifyPlaceholder': "உரை அடிப்படையிலான விளையாட்டை உருவாக்க ஒரு தலைப்பு அல்லது பாடத்தை உள்ளிடவும் (எ.கா: 'நமது சூரிய குடும்பத்தில் உள்ள கிரகங்கள்', 'இந்திய வரலாற்று உண்மைகள்').",
    'skillPlayTitle': 'ஸ்கில்ப்ளே', // Removed (உருவாக்கத்தில் உள்ளது)
    'skillPlayPlaceholder': "ரோல்-ப்ளேக்கான ஒரு காட்சி அல்லது திறனை உள்ளிடவும் (எ.கா: 'நண்பருடன் மோதலைத் தீர்ப்பது', 'ஒரு உணவகத்தில் உணவு ஆர்டர் செய்வது').", // New placeholder
    'adaptifyTitle': 'அடாப்டிஃபை (உருவாக்கத்தில் உள்ளது)',
    'lensAITitle': 'லென்ஸ்ஏஐ (உருவாக்கத்தில் உள்ளது)',
    'readifyTitle': 'ரீடிஃபை (உருவாக்கத்தில் உள்ளது)',
    'generateButton': 'உருவாக்குங்கள்',
    'clearButton': 'அழி',
    'backButton': 'முகப்புக்குத் திரும்பு',
    'aiResponseHeading': 'AI பதில்:',
    'signInMessage': 'சஹாயக்கை பயன்படுத்த உள்நுழையவும்.',
    'chooseLanguageTitle': 'உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
    'generating': 'பதில் உருவாக்கப்படுகிறது...',
    'copySuccess': 'நகலெடுக்கப்பட்டது!',
    'yourQueryHeading': 'உங்கள் கேள்வி:',
    'gamifyUnderDevelopment': '',
    'lensAIUnderDevelopment': 'இந்த அம்சம் உருவாக்கத்தில் உள்ளது. இது முடிந்ததும் உங்களுக்கு அறிவிக்கப்படும். லென்ஸ்ஏஐ வரைபடங்கள் அல்லது விளக்கப்படங்களைப் பதிவேற்றி, அவற்றின் கூறுகள் மற்றும் கருத்துகளை AI மூலம் விளக்கங்களைப் பெற உங்களுக்கு உதவும்.',
    'readifyUnderDevelopment': 'இந்த அம்சம் உருவாக்கத்தில் உள்ளது. புதுப்பிப்புகளுக்கு காத்திருங்கள்!',
    'copyFailed': 'நகலெடுக்க முடியவில்லை. உங்கள் உலாவி தானியங்கி கிளிப்போர்டு அணுகலை ஆதரிக்காமல் இருக்கலாம் அல்லது நீங்கள் அனுமதியை மறுத்துவிட்டீர்கள்.',
    'enterQuery': 'தயவுசெய்து உங்கள் கேள்வியை உள்ளிடவும்!',
  },
  'கನ್ನಡ': {
    'appTitle': 'ಸಹಾಯಕ್ ಪಿಡಬ್ಲ್ಯೂಎ',
    'homeButton': 'ಮುಖಪುಟ',
    'setupLanguage': 'ಭಾಷೆ ಹೊಂದಿಸಿ',
    'selectLanguage': 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
    'saveButton': 'ಉಳಿಸಿ',
    'welcomeMessage': 'ಸಹಾಯಕ್ ಪಿಡಬ್ಲ್ಯೂಎಗೆ ಸುಸ್ವಾಗತ! ದಯವಿಟ್ಟು ಸೈನ್ ಇನ್ ಮಾಡಿ.',
    'signInButton': 'Google ನೊಂದಿಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ',
    'signOutButton': 'ಸೈನ್ ಔಟ್ ಮಾಡಿ',
    'dashboardTitle': 'ನೀವು ಇಂದು ಏನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?',
    'aiAssistantTitle': 'AI ಸಹಾಯಕ',
    'askAIPlaceholder': "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ನಮೂದಿಸಿ (ಉದಾ: 'ಭಾರತದ ಪ್ರಮುಖ ನದಿಗಳು ಯಾವುವು?', 'ಇಂಗ್ಲೆಂಡ್‌ನಲ್ಲಿ ಕ್ರಿಕೆಟ್ ಇತಿಹಾಸದ ಬಗ್ಗೆ ಹೇಳಿ').",
    'storyfyPlaceholder': "ಕಥೆಯಾಗಿ ಮಾಡಲು ಒಂದು ಪರಿಕಲ್ಪನೆ ಅಥವಾ ಪ್ರಶ್ನೆಯನ್ನು ನಮೂದಿಸಿ (ಉದಾ: 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯನ್ನು ವಿವರಿಸಿ', 'ನಕ್ಷತ್ರಗಳು ಏಕೆ ಮಿನುಗುತ್ತವೆ?').",
    'explainifyPlaceholder': "ವಿದ್ಯಾರ್ಥಿ ಪ್ರಶ್ನೆ ಕೇಳಿ (ಉದಾ: 'ಆಕಾಶ ಏಕೆ ನೀಲಿ ಬಣ್ಣದ್ದಾಗಿದೆ?', 'ವಿದ್ಯುತ್ ಎಂದರೇನು?').",
    'gamifyPlaceholder': "ಪಠ್ಯ-ಆಧಾರಿತ ಆಟವನ್ನು ರಚಿಸಲು ಒಂದು ವಿಷಯ ಅಥವಾ ಪಾಠವನ್ನು ನಮೂದಿಸಿ (ಉದಾ: 'ನಮ್ಮ ಸೌರಮಂಡಲದ ಗ್ರಹಗಳು', 'ಭಾರತೀಯ ಇತಿಹಾಸದ ಸಂಗತಿಗಳು').",
    'skillPlayTitle': 'ಸ್ಕಿಲ್‌ಪ್ಲೇ', // Updated
    'skillPlayPlaceholder': "ಪಾತ್ರಾಭಿನಯಕ್ಕಾಗಿ ಒಂದು ಸನ್ನಿವೇಶ ಅಥವಾ ಕೌಶಲ್ಯವನ್ನು ನಮೂದಿಸಿ (ಉದಾ: 'ಸ್ನೇಹಿತನೊಂದಿಗೆ ಸಂಘರ್ಷವನ್ನು ಪರಿಹರಿಸುವುದು', 'ರೆಸ್ಟೋರೆಂಟ್‌ನಲ್ಲಿ ಆಹಾರವನ್ನು ಆರ್ಡರ್ ಮಾಡುವುದು').", // New placeholder
    'adaptifyTitle': 'ಅಡಾಪ್ಟಿಫೈ (ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ)',
    'lensAITitle': 'ಲೆನ್ಸ್‌ಎಐ (ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ)',
    'readifyTitle': 'ರೀಡಿಫೈ (ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ)',
    'generateButton': 'ರಚಿಸಿ',
    'clearButton': 'ತೆರವುಗೊಳಿಸಿ',
    'backButton': 'ಮನೆಗೆ ಹಿಂತಿರುಗಿ',
    'aiResponseHeading': 'AI ಪ್ರತಿಕ್ರಿಯೆ:',
    'signInMessage': 'ಸಹಾಯಕ ಬಳಸಲು ದಯವಿಟ್ಟು ಸೈನ್ ಇನ್ ಮಾಡಿ.',
    'chooseLanguageTitle': 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    'generating': 'ಪ್ರತಿಕ್ರಿಯೆ ರಚಿಸಲಾಗುತ್ತಿದೆ...',
    'copySuccess': 'ನಕಲಿಸಲಾಗಿದೆ!',
    'yourQueryHeading': 'ನಿಮ್ಮ ಪ್ರಶ್ನೆ:',
    'gamifyUnderDevelopment': '',
    'skillPlayUnderDevelopment': 'ಈ ವೈಶಿಷ್ಟ್ಯವು ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ. ಇದು ಪೂರ್ಣಗೊಂಡ ನಂತರ ನಿಮಗೆ ತಿಳಿಸಲಾಗುವುದು. ಸ್ಕಿಲ್‌ಪ್ಲೇ ಶೈಕ್ಷಣಿಕ ವಿಷಯಗಳ ಹೊರತಾಗಿ ಜೀವನ ಕೌಶಲ್ಯಗಳನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸಲು ರೋಲ್-ಪ್ಲೇ ಸನ್ನಿವೇಶಗಳು ಮತ್ತು ಸಂಭಾಷಣೆಗಳನ್ನು ರಚಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ।', // Updated
    'adaptifyUnderDevelopment': 'ಈ ವೈಶಿಷ್ಟ್ಯವು ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ. ಇದು ಪೂರ್ಣಗೊಂಡ ನಂತರ ನಿಮಗೆ ತಿಳಿಸಲಾಗುವುದು. ಅಡಾಪ್ಟಿಫೈ ವಿವಿಧ ದರ್ಜೆಯ ಹಂತಗಳಿಗೆ ವಿಭಿನ್ನ ವಸ್ತುಗಳನ್ನು ರಚಿಸಲು ವಿಷಯವನ್ನು (ಉದಾ. ಪಾಠಪುಸ್ತಕ ಪುಟದ ಫೋಟೋ) ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ।',
    'lensAIUnderDevelopment': 'ಈ ವೈಶಿಷ್ಟ್ಯವು ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ. ಇದು ಪೂರ್ಣಗೊಂಡ ನಂತರ ನಿಮಗೆ ತಿಳಿಸಲಾಗುವುದು. ಲೆನ್ಸ್‌ಎಐ AI-ಚಾಲಿತ ವಿವರಣೆಗಳಿಗಾಗಿ ರೇಖಾಚಿತ್ರಗಳು ಅಥವಾ ಚಾರ್ಟ್‌ಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ।',
    'readifyUnderDevelopment': 'ಈ ವೈಶಿಷ್ಟ್ಯವು ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ. ನವೀಕರಣಗಳಿಗಾಗಿ ನಿರೀಕ್ಷಿಸಿ!',
    'copyFailed': 'ಪಠ್ಯವನ್ನು ನಕಲಿಸಲು ವಿಫಲವಾಗಿದೆ. ನಿಮ್ಮ ಬ್ರೌಸರ್ ಸ್ವಯಂಚಾಲಿತ ಕ್ಲಿಪ್‌ಬೋರ್ಡ್ ಪ್ರವೇಶವನ್ನು ಬೆಂಬಲಿಸದಿರಬಹುದು, ಅಥವಾ ನೀವು ಅನುಮತಿಯನ್ನು ನಿರಾಕರಿಸಿದ್ದೀರಿ.',
    'enterQuery': 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ನಮೂದಿಸಿ!',
  },
  'മലയാളം': {
    'appTitle': 'സഹായക് പിഡബ്ല്യുഎ',
    'homeButton': 'ഹോം',
    'setupLanguage': 'ഭാഷ സജ്ജമാക്കുക',
    'selectLanguage': 'നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട ഭാഷ തിരഞ്ഞെടുക്കുക:',
    'saveButton': 'സംരക്ഷിക്കുക',
    'welcomeMessage': 'സഹായക് പിഡബ്ല്യുഎയിലേക്ക് സ്വാഗതം! ദയവായി സൈൻ ഇൻ ചെയ്യുക.',
    'signInButton': 'ഗൂഗിൾ ഉപയോഗിച്ച് സൈൻ ഇൻ ചെയ്യുക',
    'signOutButton': 'സൈൻ ഔട്ട് ചെയ്യുക',
    'dashboardTitle': 'ഇന്ന് നിങ്ങൾ എന്തുചെയ്യാൻ ആഗ്രഹിക്കുന്നു?',
    'aiAssistantTitle': 'AI അസിസ്റ്റന്റ്',
    'askAIPlaceholder': "നിങ്ങളുടെ ചോദ്യം നൽകുക (ഉദാ: 'ഇന്ത്യയിലെ പ്രധാന നദികൾ ഏതെല്ലാമാണ്?', 'ഇംഗ്ലണ്ടിലെ ക്രിക്കറ്റിന്റെ ചരിത്രം പറയുക.').",
    'storyfyPlaceholder': "കുട്ടികൾക്കായി ആശയങ്ങളെ ലളിതമായ കഥകളാക്കി മാറ്റുക.'പ്രകാശസംശ്ലേഷണം വിശദീകരിക്കുക', 'നക്ഷത്രങ്ങൾ എന്തിന് തിളങ്ങുന്നു?').",
    'explainifyPlaceholder': "വിദ്യാർത്ഥി ചോദ്യം ചോദിക്കുക (ഉദാ: 'ആകാശം നീലയായിരിക്കുന്നത് എന്തുകൊണ്ട്?', 'വൈദ്യുതി എന്നാൽ എന്ത്?').",
    'gamifyPlaceholder': "ടെക്സ്റ്റ് അധിഷ്ഠിത ഗെയിം ഉണ്ടാക്കാൻ ഒരു വിഷയം അല്ലെങ്കിൽ പാഠം നൽകുക (ഉദാ: 'നമ്മുടെ സൗരയൂഥത്തിലെ ഗ്രഹങ്ങൾ', 'ഇന്ത്യൻ ചരിത്ര വസ്തുതകൾ').",
    'skillPlayTitle': 'സ്കിൽപ്ലേ', // Removed (വികസനത്തിൽ)
    'skillPlayPlaceholder': "റോൾ-പ്ലേക്കായി ഒരു സാഹചര്യം അല്ലെങ്കിൽ കഴിവ് നൽകുക (ഉദാ: 'ഒരു സുഹൃത്തുമായി തർക്കം പരിഹരിക്കുക', 'ഒരു റെസ്റ്റോറന്റിൽ ഭക്ഷണം ഓർഡർ ചെയ്യുക').", // New placeholder
    'adaptifyTitle': 'അഡാപ്റ്റിഫൈ (വികസനത്തിൽ)',
    'lensAITitle': 'ലെൻസ്എഐ (വികസനത്തിൽ)',
    'readifyTitle': 'റീഡിഫൈ (വികസനത്തിൽ)',
    'generateButton': 'ഉണ്ടാക്കുക',
    'clearButton': 'മായ്ക്കുക',
    'backButton': 'ഹോമിലേക്ക് മടങ്ങുക',
    'aiResponseHeading': 'AI പ്രതികരണം:',
    'signInMessage': 'സഹായക് ഉപയോഗിക്കാൻ ദയവായി സൈൻ ഇൻ ചെയ്യുക.',
    'chooseLanguageTitle': 'നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട ഭാഷ തിരഞ്ഞെടുക്കുക',
    'generating': 'പ്രതികരണം ഉണ്ടാക്കുന്നു...',
    'copySuccess': 'പകർത്തുക!',
    'yourQueryHeading': 'നിങ്ങളുടെ ചോദ്യം:',
    'gamifyUnderDevelopment': '',
    'skillPlayUnderDevelopment': 'ഈ സവിശേഷത വികസനത്തിലാണ്. പൂർത്തിയാകുമ്പോൾ നിങ്ങളെ അറിയിക്കും. സ്കിൽപ്ലേ വിദ്യാഭ്യാസത്തിനപ്പുറം ജീവിത നൈപുണ്യങ്ങൾ വികസിപ്പിക്കുന്നതിന് റോൾ-പ്ലേ സാഹചര്യങ്ങളും സംഭാഷണങ്ങളും ഉണ്ടാക്കാൻ സഹായിക്കുന്നു.', // Updated
    'adaptifyUnderDevelopment': 'ഈ സവിശേഷത വികസനത്തിലാണ്. പൂർത്തിയാകുമ്പോൾ നിങ്ങളെ അറിയിക്കും. അഡാപ്റ്റിഫൈ വിവിധ ഗ്രേഡ് തലങ്ങളിലേക്ക് വ്യത്യസ്തമായ പഠന സാമഗ്രികൾ ഉണ്ടാക്കാൻ ഉള്ളടക്കം (ഉദാ: പാഠപുസ്തക പേജിന്റെ ഫോട്ടോ) അപ്ലോഡ് ചെയ്യാൻ സഹായിക്കും.',
    'lensAIUnderDevelopment': 'ഈ സവിശേഷത വികസനത്തിലാണ്. പൂർത്തിയാകുമ്പോൾ നിങ്ങളെ അറിയിക്കും. ലെൻസ്എഐ ഡയഗ്രമുകളോ ചാർട്ടുകളോ അപ്‌ലോഡ് ചെയ്യാനായി സഹായിക്കും, അവയുടെ ഘടകങ്ങളെയും ആശയങ്ങളെയും കുറിച്ചുള്ള AI-അധിഷ്ഠിത വിശദീകരണങ്ങൾക്കായി।',
    'readifyUnderDevelopment': 'ഈ സവിശേഷത വികസനത്തിലാണ്. അപ്‌ഡേറ്റുകൾക്കായി കാത്തിരിക്കുക!',
    'copyFailed': 'പകർത്തുന്നതിൽ പരാജയപ്പെട്ടു. നിങ്ങളുടെ ബ്രൗസർ സ്വയമേവയുള്ള ക്ലിപ്‌ബോർഡ് ആക്‌സസ് പിന്തുണയ്‌ക്കുന്നില്ലായിരിക്കാം, അല്ലെങ്കിൽ നിങ്ങൾ അനുമതി നിഷേധിച്ചു.',
    'enterQuery': 'ദയവായി നിങ്ങളുടെ ചോദ്യം നൽകുക!',
  },
  'বাংলা': {
    'appTitle': 'সহায়ক পিডব্লিউএ',
    'homeButton': 'হোম',
    'setupLanguage': 'ভাষা সেটআপ করুন',
    'selectLanguage': 'আপনার পছন্দের ভাষা নির্বাচন করুন:',
    'saveButton': 'সংরক্ষণ করুন',
    'welcomeMessage': 'সহায়ক পিডব্লিউএ-তে স্বাগতম! দয়া করে সাইন ইন করুন।',
    'signInButton': 'গুগল দিয়ে সাইন ইন করুন',
    'signOutButton': 'সাইন আউট করুন',
    'dashboardTitle': 'আজ আপনি কি করতে চান?',
    'aiAssistantTitle': 'এআই অ্যাসিস্ট্যান্ট',
    'askAIPlaceholder': "আপনার প্রশ্ন লিখুন (যেমন: 'ভারতের প্রধান নদীগুলি কী কী?', 'ইংল্যান্ডের ক্রিকেট ইতিহাস বলুন।').",
    'storyfyPlaceholder': "গল্প তৈরি করতে একটি ধারণা বা প্রশ্ন লিখুন (যেমন: 'সালোকসংশ্লেষণ ব্যাখ্যা করুন', 'তারা কেন ঝিকমিক করে?').",
    'explainifyPlaceholder': "ছাত্র প্রশ্ন জিজ্ঞাসা করুন (যেমন: 'আকাশ নীল কেন?', 'বিদ্যুৎ কি?').",
    'gamifyPlaceholder': "পাঠ-ভিত্তিক গেম তৈরি করতে একটি বিষয় বা পাঠ লিখুন (যেমন: 'আমাদের সৌরজগতের গ্রহ', 'ভারতীয় ইতিহাসের তথ্য').",
    'skillPlayTitle': 'স্কিলপ্লে', // Removed (উন্নয়নাধীন)
    'skillPlayPlaceholder': "ভূমিকা-পালনের জন্য একটি পরিস্থিতি বা দক্ষতা লিখুন (যেমন: 'বন্ধুর সাথে বিরোধ সমাধান করা', 'একটি রেস্তোরাঁয় খাবার অর্ডার করা').", // New placeholder
    'adaptifyTitle': 'অভিযোজন করুন (উন্নয়নাধীন)',
    'lensAITitle': 'লেন্সএআই (উন্নয়নাধীন)',
    'readifyTitle': 'রিডিফাই (উন্নয়নাধীন)',
    'generateButton': 'তৈরি করুন',
    'clearButton': 'পরিষ্কার করুন',
    'backButton': 'হোমে ফিরে যান',
    'aiResponseHeading': 'এআই প্রতিক্রিয়া:',
    'signInMessage': 'সহায়ক ব্যবহার করতে অনুগ্রহ করে সাইন ইন করুন।',
    'chooseLanguageTitle': 'আপনার পছন্দের ভাষা নির্বাচন করুন',
    'generating': 'প্রতিক্রিয়া তৈরি হচ্ছে...',
    'copySuccess': 'অনুলিপি করা হয়েছে!',
    'yourQueryHeading': 'আপনার প্রশ্ন:',
    'gamifyUnderDevelopment': '',
    'skillPlayUnderDevelopment': 'এই বৈশিষ্ট্যটি উন্নয়নাধীন।. এটি সম্পূর্ণ হলে আপনাকে অবহিত করা হবে। স্কিলপ্লে শিক্ষাগত শিক্ষার বাইরে জীবন দক্ষতা বিকাশের জন্য ভূমিকা-পালনের পরিস্থিতি এবং সংলাপ তৈরি করতে সাহায্য করে।', // Updated
    'adaptifyUnderDevelopment': 'এই বৈশিষ্ট্যটি উন্নয়নাধীন।. এটি সম্পূর্ণ হলে আপনাকে অবহিত করা হবে। অভিযোজন বিভিন্ন গ্রেড স্তরের জন্য ভিন্ন ভিন্ন উপকরণ তৈরি করতে বিষয়বস্তু (যেমন, পাঠ্যপুস্তকের পৃষ্ঠার ছবি) আপলোড করতে সাহায্য করবে।',
    'lensAIUnderDevelopment': 'এই বৈশিষ্ট্যটি উন্নয়নাধীন।. এটি সম্পূর্ণ হলে আপনাকে অবহিত করা হবে। লেন্সএআই আপনাকে আঁকা বা চার্ট আপলোড করতে সাহায্য করবে তাদের উপাদান এবং ধারণাগুলির এআই-চালিত ব্যাখ্যার জন্য।',
    'readifyUnderDevelopment': 'এই বৈশিষ্ট্যটি উন্নয়নাধীন।. আপডেটের জন্য সাথে থাকুন!',
    'copyFailed': 'টেক্সট কপি করতে ব্যর্থ হয়েছে। আপনার ব্রাউজার স্বয়ংক্রিয় ক্লিপবোর্ড অ্যাক্সেস সমর্থন নাও করতে পারে, অথবা আপনি অনুমতি অস্বীকার করেছেন।',
    'enterQuery': 'দয়া করে আপনার প্রশ্ন লিখুন!',
  },
  'মराठी': {
    'appTitle': 'सहायक पीडब्ल्यूए',
    'homeButton': 'होम',
    'setupLanguage': 'भाषा सेट करा',
    'selectLanguage': 'तुमची पसंतीची भाषा निवडा:',
    'saveButton': 'जतन करा',
    'welcomeMessage': 'सहायक पीडब्ल्यूएमध्ये आपले स्वागत आहे! कृपया साइन इन करा।',
    'signInButton': 'गुगलसह साइन इन करा',
    'signOutButton': 'साइन आउट करा',
    'dashboardTitle': 'आज तुम्हाला काय करायचे आहे?',
    'aiAssistantTitle': 'एआय असिस्टंट',
    'askAIPlaceholder': "तुमची क्वेरी प्रविष्ट करा (उदा. 'भारतातील प्रमुख नद्या कोणत्या आहेत?', 'इंग्लंडमधील क्रिकेटचा इतिहास सांगा.').",
    'storyfyPlaceholder': "एखादी संकल्पना किंवा प्रश्न 'कथा बनवा' मध्ये प्रविष्ट करा (उदा. 'प्रकाशसंश्लेषण समजावून सांगा', 'तारे का चमकतात?').",
    'explainifyPlaceholder': "विद्यार्थ्यांचा प्रश्न विचारा (उदा. 'आकाश निळे का आहे?', 'वीज म्हणजे काय?').",
    'gamifyPlaceholder': "मजकूर-आधारित गेम तयार करण्यासाठी एखादा विषय किंवा धडा प्रविष्ट करा (उदा. 'आपल्या सौर मंडळातील ग्रह', 'भारतीय इतिहासाची तथ्ये').",
    'skillPlayTitle': 'स्किलप्ले', // Removed (विकासाधीन)
    'skillPlayPlaceholder': "भूमिका-खेळण्यासाठी एक परिस्थिती किंवा कौशल्य प्रविष्ट करा (उदा. 'मित्रासोबतचा वाद सोडवणे', 'रेस्टॉरंटमध्ये जेवण ऑर्डर करणे').", // New placeholder
    'adaptifyTitle': 'अ‍ॅडॅप्टिफाय (विकासाधीन)',
    'lensAITitle': 'लेन्सएआय (विकासाधीन)',
    'readifyTitle': 'रीडीफाय (विकासाधीन)',
    'generateButton': 'व्युत्पन्न करा',
    'clearButton': 'साफ करा',
    'backButton': 'मुख्यपृष्ठावर परत जा',
    'aiResponseHeading': 'एआय प्रतिसाद:',
    'signInMessage': 'सहायक वापरण्यासाठी कृपया साइन इन करा।',
    'chooseLanguageTitle': 'आपली पसंतीची भाषा निवडा',
    'generating': 'प्रतिसाद तयार करत आहे...',
    'copySuccess': 'कॉपी केले!',
    'yourQueryHeading': 'आपली क्वेरी:',
    'gamifyUnderDevelopment': '',
    'skillPlayUnderDevelopment': 'हे वैशिष्ट्य विकासाधीन आहे. ते पूर्ण झाल्यावर तुम्हाला सूचित केले जाईल. स्किलप्ले शैक्षणिक शिक्षणापलीकडील जीवन कौशल्ये विकसित करण्यासाठी भूमिका-खेळण्याच्या परिस्थिती आणि संवाद तयार करण्यास मदत करते।', // Updated
    'adaptifyUnderDevelopment': 'हे वैशिष्ट्य विकासाधीन आहे. ते पूर्ण झाल्यावर तुम्हाला सूचित केले जाईल. अ‍ॅडॅप्टिफाय विविध ग्रेड स्तरांसाठी भिन्न सामग्री तयार करण्यासाठी सामग्री (उदा. पाठ्यपुस्तक पृष्ठाचा फोटो) अपलोड करण्यास मदत करेल।',
    'lensAIUnderDevelopment': 'हे वैशिष्ट्य विकासाधीन आहे. ते पूर्ण झाल्यावर तुम्हाला सूचित केले जाईल. लेन्सएआय तुम्हाला आकडेवारी किंवा तक्त्यांच्या घटकांचे आणि संकल्पनांचे AI-आधारित स्पष्टीकरण मिळवण्यासाठी ते अपलोड करण्यास मदत करेल।',
    'readifyUnderDevelopment': 'हे वैशिष्ट्य विकासाधीन आहे. अद्यतनांसाठी संपर्कात रहा!',
    'copyFailed': 'कॉपी करण्यात अयशस्वी. तुमचा ब्राउझर स्वयंचलित क्लिपबोर्ड प्रवेशास समर्थन देत नाही, किंवा तुम्ही परवानगी नाकारली आहे.',
    'enterQuery': 'कृपया तुमची क्वेरी प्रविष्ट करा!',
  },
  'ગુજરાતી': {
    'appTitle': 'સહાયક પીડબ્લ્યુએ',
    'homeButton': 'હોમ',
    'setupLanguage': 'ભાષા સેટ કરો',
    'selectLanguage': 'તમારી પસંદગીની ભાષા પસંદ કરો:',
    'saveButton': 'સાચવો',
    'welcomeMessage': 'સહાયક પીડબ્લ્યુએમાં આપનું સ્વાગત છે! કૃપા કરીને સાઇન ઇન કરો.',
    'signInButton': 'Google સાથે સાઇન ઇન કરો',
    'signOutButton': 'સાઇન આઉટ કરો',
    'dashboardTitle': 'આજે તમે શું કરવા માંગો છો?',
    'aiAssistantTitle': 'AI આસિસ્ટન્ટ',
    'askAIPlaceholder': "તમારી ક્વેરી દાખલ કરો (દા.ત., 'ભારતની મુખ્ય નદીઓ કઈ છે?', 'ઇંગ્લેન્ડમાં ક્રિકેટનો ઇતિહાસ કહો.').",
    'storyfyPlaceholder': "વાર્તા બનાવવા માટે એક ખ્યાલ અથવા પ્રશ્ન દાખલ કરો (દા.ત., 'પ્રકાશસંશ્લેષણ સમજાવો', 'તારાઓ શા માટે ચમકે છે?').",
    'explainifyPlaceholder': "વિદ્યાર્થી પ્રશ્ન પૂછો (દા.ત., 'આકાશ વાદળી કેમ છે?', 'વીજળી શું છે?').",
    'gamifyPlaceholder': "ટેક્સ્ટ-આધારિત રમત બનાવવા માટે કોઈ વિષય અથવા પાઠ દાખલ કરો (દા.ત., 'આપણા સૌરમંડળના ગ્રહો', 'ભારતીય ઇતિહાસના તથ્યો').",
    'skillPlayTitle': 'સ્કિલપ્લે', // Removed (વિકાસ હેઠળ)
    'skillPlayPlaceholder': "ભૂમિકા ભજવવા માટે એક દૃશ્ય અથવા કૌશલ્ય દાખલ કરો (દા.ત., 'મિત્ર સાથેના સંઘર્ષનું નિરાકરણ', 'રેસ્ટોરન્ટમાં ખોરાક ઓર્ડર કરવો').", // New placeholder
    'adaptifyTitle': 'અડેપ્ટીફાય (વિકાસ હેઠળ)',
    'lensAITitle': 'લેન્સએઆઈ (વિકાસ હેઠળ)',
    'readifyTitle': 'રીડીફાય (વિકાસ હેઠળ)',
    'generateButton': 'ઉત્પન્ન કરો',
    'clearButton': 'સાફ કરો',
    'backButton': 'હોમ પર પાછા જાઓ',
    'aiResponseHeading': 'AI પ્રતિભાવ:',
    'signInMessage': 'સુવિધાઓનો ઉપયોગ કરવા માટે કૃપા કરીને સાઇન ઇન કરો.',
    'chooseLanguageTitle': 'તમારી પસંદગીની ભાષા પસંદ કરો',
    'generating': 'પ્રતિભાવ જનરેટ કરી રહ્યું છે...',
    'copySuccess': 'કૉપિ કર્યું!',
    'yourQueryHeading': 'તમારી ક્વેરી:',
    'gamifyUnderDevelopment': '',
    'skillPlayUnderDevelopment': 'આ સુવિધા વિકાસ હેઠળ છે. તે પૂર્ણ થયા પછી તમને સૂચિત કરવામાં આવશે. સ્કિલપ્લે શૈક્ષણિક બાબતો ઉપરાંત જીવન કૌશલ્યો વિકસાવવા માટે ભૂમિકા ભજવવાના દૃશ્યો અને સંવાદો બનાવવામાં મદદ કરે છે.', // Updated
    'adaptifyUnderDevelopment': 'આ સુવિધા વિકાસ હેઠળ છે. તે પૂર્ણ થયા પછી તમને સૂચિત કરવામાં આવશે. અડેપ્ટીફાય વિવિધ ગ્રેડ સ્તરો માટે ભિન્ન સામગ્રી બનાવવા માટે સામગ્રી (દા.ત., પાઠ્યપુસ્તક પૃષ્ઠનો ફોટો) અપલોડ કરવામાં મદદ કરશે।',
    'lensAIUnderDevelopment': 'આ સુવિધા વિકાસ હેઠળ છે. તે પૂર્ણ થયા પછી તમને સૂચિત કરવામાં આવશે. લેન્સએઆઈ તમને રેખાકૃતિઓ અથવા ચાર્ટ્સ અપલોડ કરવામાં મદદ કરશે, તેમના ઘટકો અને ખ્યાલોના AI-સંચાલિત સ્પષ્ટતા માટે।',
    'readifyUnderDevelopment': 'આ સુવિધા વિકાસ હેઠળ છે. અપડેટ્સ માટે જોડાયેલા રહો!',
    'copyFailed': 'કૉપિ કરવામાં નિષ્ફળ. તમારું બ્રાઉઝર સ્વચાલિત ક્લિપબોર્ડ ઍક્સેસને સમર્થન આપી શકતું નથી, અથવા તમે પરવાનગી નકારી દીધી છે.',
    'enterQuery': 'કૃપા કરીને તમારી ક્વેરી દાખલ કરો!',
  },
  'પੰਜਾਬੀ': {
    'aiAssistant': {
      name: 'AI ਅਸਿਸਟੈਂਟ',
      description: 'ਆਮ ਪ੍ਰਸ਼ਨਾਂ, ਕਹਾਣੀਆਂ, ਵਿਆਖਿਆਵਾਂ ਜਾਂ ਖੇਡਾਂ ਨਾਲ ਮਦਦ ਪ੍ਰਾਪਤ ਕਰੋ।'
    },
    'askAI': {
      name: 'ਆਸਕਏਆਈ',
      description: "ਆਪਣੀ ਪ੍ਰਸ਼ਨ ਦਰਜ ਕਰੋ (ਉਦਾਹਰਨ ਲਈ, 'ਭਾਰਤ ਦੀਆਂ ਮੁੱਖ ਨਦੀਆਂ ਕਿਹੜੀਆਂ ਹਨ?', 'ਇੰਗਲੈਂਡ ਵਿੱਚ ਕ੍ਰਿਕਟ ਦਾ ਇਤਿਹਾਸ ਦੱਸੋ।')."
    },
    'storyfy': {
      name: 'ਕਹਾਣੀ ਬਣਾਓ',
      description: 'ਬੱਚਿਆਂ ਲਈ ਸੰਕਲਪਾਂ ਨੂੰ ਸਰਲ ਕਹਾਣੀਆਂ ਵਿੱਚ ਸਮਝਾਓ।'
    },
    'explainify': {
      name: 'ਐਕਸਪਲੇਨੀਫਾਈ',
      description: 'ਸਰਲ ਸਮਾਨਤਾਵਾਂ ਨਾਲ ਸੰਖੇਪ, ਸਰਲ ਵਿਆਖਿਆਵਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।'
    },
    'gamify': {
      name: 'ਗੇਮੀਫਾਈ',
      description: "ਕਿਸੇ ਵੀ ਪਾਠ ਜਾਂ ਵਿਸ਼ੇ ਤੋਂ ਸਰਲ, ਟੈਕਸਟ-ਅਧਾਰਤ ਗੇਮਾਂ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।"
    },
    'skillPlay': { // Updated
      name: 'ਸਕਿਲਪਲੇ',
      description: 'ਸਿੱਖਿਆ ਤੋਂ ਪਰੇ ਜੀਵਨ ਦੇ ਹੁਨਰਾਂ ਨੂੰ ਵਿਕਸਤ ਕਰਨ ਲਈ ਭੂਮਿਕਾ-ਨਿਭਾਉਣ ਦੇ ਦ੍ਰਿਸ਼ ਅਤੇ ਸੰਵਾਦ ਤਿਆਰ ਕਰੋ।'
    },
    'adaptify': {
      name: 'ਅਡੈਪਟੀਫਾਈ',
      description: "ਵੱਖ-ਵੱਖ ਗ੍ਰੇਡ ਪੱਧਰਾਂ ਲਈ ਵੱਖਰੀ ਸਮੱਗਰੀ ਤਿਆਰ ਕਰਨ ਲਈ ਸਮੱਗਰੀ (ਜਿਵੇਂ ਕਿ ਪਾਠ ਪੁਸਤਕ ਪੰਨੇ ਦੀ ਫੋਟੋ) ਅੱਪਲੋਡ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰੇਗਾ。"
    },
    'lensAI': {
      name: 'ਲੈਂਸਏਆਈ',
      description: "AI-ਸੰਚਾਲਿਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਡਾਇਗ੍ਰਾਮ ਜਾਂ ਚਾਰਟ ਅੱਪਲੋਡ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰੇਗਾ."
    },
    'readify': {
      name: 'ਰੀਡੀਫਾਈ',
      description: 'ਵਿਦਿਆਰਥੀਆਂ ਦੀ ਪੜ੍ਹਨ ਦੀ ਰਵਾਨਗੀ ਅਤੇ ਉਚਾਰਨ ਦਾ ਮੁਲਾਂਕਣ ਕਰੋ।'
    },
  }
};

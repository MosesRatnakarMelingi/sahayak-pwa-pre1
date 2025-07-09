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

export const featureCards = [
  { id: 'askAI', icon: '❓', title: 'AskAI', description: 'Get general queries or facts (India-focused).' },
  { id: 'storyfy', icon: '📖', title: 'Storyfy', description: 'Explain concepts simply as stories for kids.' },
  { id: 'explainify', icon: '💡', title: 'Explainify', description: 'Get concise, simple explanations with easy analogies.' },
  { id: 'gamify', icon: '🎲', title: 'Gamify', description: 'Generate simple, text-based games from any lesson or topic.' },
  { id: 'artify', icon: '🎨', title: 'Artify', description: 'Generate simple instructions for line drawings or charts from your descriptions.' },
  { id: 'adaptify', icon: '📝', title: 'Adaptify', description: 'Upload content (e.g., textbook page photo) to generate differentiated materials for various grade levels.' },
  { id: 'lensAI', icon: '🔍', title: 'LensAI', description: 'Upload diagrams or charts for AI-powered explanations of their components and concepts.' },
  { id: 'readify', icon: '🎧', title: 'Readify', description: 'Assess student reading fluency and pronunciation.' },
];

export const featureTranslations = {
  'English': {
    'askAI': {
      name: 'AskAI',
      description: 'Get general queries or facts (India-focused).'
    },
    'storyfy': {
      name: 'Storyfy',
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
    'artify': {
      name: 'Artify',
      description: 'Generate simple instructions for line drawings or charts from your descriptions.'
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
    'artify': {
      name: 'आर्टिफ़ाई',
      description: 'आपके विवरण से रेखा चित्र या चार्ट के लिए सरल निर्देश बनाएं।'
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
    'artify': {
      name: 'ఆర్టిఫై',
      description: 'మీ వివరణల నుండి లైన్ డ్రాయింగ్‌లు లేదా చార్ట్‌ల కోసం సాధారణ సూచనలను రూపొందించండి।'
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
    'artify': {
      name: 'ஆர்ட்டிஃபை',
      description: 'உங்கள் விளக்கங்களிலிருந்து கோடு வரைபடங்கள் அல்லது விளக்கப்படங்களுக்கான எளிய வழிமுறைகளை உருவாக்குங்கள்।'
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
    'artify': {
      name: 'ಆರ್ಟಿಫೈ',
      description: 'ನಿಮ್ಮ ವಿವರಣೆಗಳಿಂದ ರೇಖಾಚಿತ್ರಗಳು ಅಥವಾ ಚಾರ್ಟ್‌ಗಳಿಗಾಗಿ ಸರಳ ಸೂಚನೆಗಳನ್ನು ರಚಿಸಿ।'
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
    'artify': {
      name: 'ആർട്ടിഫൈ',
      description: 'നിങ്ങളുടെ വിവരണങ്ങളിൽ നിന്ന് ലൈൻ ഡ്രോയിംഗുകൾ അല്ലെങ്കിൽ ചാർട്ടുകൾക്കുള്ള ലളിതമായ നിർദ്ദേശങ്ങൾ ഉണ്ടാക്കുക।'
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
    'artify': {
      name: 'আর্টিফাই',
      description: 'আপনার বিবরণ থেকে রেখাচিত্র বা চার্টের জন্য সহজ নির্দেশাবলী তৈরি করুন।'
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
    'artify': {
      name: 'आर्टिफाय',
      description: 'तुमच्या वर्णनांवरून रेषाचित्रे किंवा आलेखांसाठी सोप्या सूचना तयार करा।'
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
    'artify': {
      name: 'આર્ટિફાય',
      description: 'તમારા વર્ણનોમાંથી રેખાંકનો અથવા ચાર્ટ્સ માટે સરળ સૂચનાઓ બનાવો।'
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
    'artify': {
      name: 'ਆਰਟੀਫਾਈ',
      description: "ਤੁਹਾਡੇ ਵਰਣਨਾਂ ਤੋਂ ਲਾਈਨ ਡਰਾਇੰਗਾਂ ਜਾਂ ਚਾਰਟਾਂ ਲਈ ਸਧਾਰਨ ਨਿਰਦੇਸ਼ ਤਿਆਰ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।"
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
    'askAITitle': 'AskAI',
    'askAIPlaceholder': "Enter your query (e.g., 'What are the main rivers in India?', 'Tell me about the history of cricket in England').",
    'storyfyTitle': 'Storyfy',
    'storyfyPlaceholder': "Enter a concept or question to 'Storyfy' (e.g., 'Explain photosynthesis', 'Why do stars twinkle?').",
    'explainifyTitle': 'Explainify',
    'explainifyPlaceholder': "Ask a student question (e.g., 'Why is the sky blue?', 'What is electricity?').",
    'gamifyTitle': 'Gamify',
    'gamifyPlaceholder': "Enter a topic or lesson to generate a text-based game (e.g., 'planets in our solar system', 'Indian history facts').",
    'artifyTitle': 'Artify (Under Development)',
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
    'gamifyUnderDevelopment': '',
    'artifyUnderDevelopment': 'This feature is under development. You will be notified once it is completed. Artify helps generate simple instructions for line drawings or charts from your descriptions.',
    'adaptifyUnderDevelopment': 'This feature is under development. You will be notified once it is completed. Adaptify will help upload content (e.g., textbook page photo) to generate differentiated materials for various grade levels.',
    'lensAIUnderDevelopment': 'This feature is under development. You will be notified once it is completed. LensAI will help you upload diagrams or charts for AI-powered explanations of their components and concepts.',
    'readifyUnderDevelopment': 'This feature is currently under development. Stay tuned for updates!',
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
    'askAITitle': 'आस्कएआई',
    'askAIPlaceholder': "अपनी क्वेरी दर्ज करें (उदाहरण: 'भारत की प्रमुख नदियाँ क्या हैं?', 'इंग्लैंड में क्रिकेट का इतिहास बताएं।').",
    'storyfyTitle': 'कहानियां बनाओ',
    'storyfyPlaceholder': "किसी अवधारणा या प्रश्न को 'कहानियां बनाओ' (उदाहरण: 'प्रकाश संश्लेषण समझाएं', 'तारे क्यों टिमटिमाते हैं?') में दर्ज करें।",
    'explainifyTitle': 'एक्सप्लेनिफ़ाई',
    'explainifyPlaceholder': "छात्र प्रश्न पूछें (उदाहरण: 'आकाश नीला क्यों है?', 'बिजली क्या है?').",
    'gamifyTitle': 'गेमिफ़ाई',
    'gamifyPlaceholder': "पाठ-आधारित गेम बनाने के लिए कोई विषय या पाठ दर्ज करें (उदाहरण: 'हमारे सौर मंडल के ग्रह', 'भारतीय इतिहास के तथ्य').",
    'artifyTitle': 'आर्टिफ़ाई (विकास के अधीन)',
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
    'gamifyUnderDevelopment': '',
    'artifyUnderDevelopment': 'यह सुविधा विकास के अधीन है। पूरा होने पर आपको सूचित किया जाएगा। आर्टिफ़ाई आपके विवरण से रेखा चित्र या चार्ट के लिए सरल निर्देश तैयार करने में मदद करता है।',
    'adaptifyUnderDevelopment': 'यह सुविधा विकास के अधीन है। पूरा होने पर आपको सूचित किया जाएगा। अनुकूलन विभिन्न ग्रेड स्तरों के लिए भिन्न सामग्री बनाने के लिए सामग्री (उदा. पाठ्यपुस्तक पृष्ठ फोटो) अपलोड करने में मदद करेगा।',
    'lensAIUnderDevelopment': 'यह सुविधा विकास के अधीन है। पूरा होने पर आपको सूचित किया जाएगा। लेंसएआई आपको आरेख या चार्ट अपलोड करने में मदद करेगा ताकि उनके घटकों और अवधारणाओं की एआई-संचालित व्याख्या मिल सके।',
    'readifyUnderDevelopment': 'यह सुविधा वर्तमान में विकास के अधीन है। अपडेट के लिए बने रहें!',
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
    'askAITitle': 'ఆస్క్‌ఏఐ',
    'askAIPlaceholder': "మీ ప్రశ్నను నమోదు చేయండి (ఉదా: 'భారతదేశంలోని ప్రధాన నదులు ఏమిటి?', 'ఇంగ్లాండ్‌లో క్రికెట్ చరిత్ర గురించి చెప్పండి.').",
    'storyfyTitle': 'కథలుగా మార్చండి',
    'storyfyPlaceholder': "కథగా మార్చడానికి ఒక భావన లేదా ప్రశ్నను నమోదు చేయండి (ఉదా: 'కిరణజన్య సంయోగక్రియను వివరించండి', 'నక్షత్రాలు ఎందుకు మెరుస్తాయి?').",
    'explainifyTitle': 'ఎక్స్‌ప్లెయిన్‌ఫై',
    'explainifyPlaceholder': "విద్యార్థి ప్రశ్న అడగండి (ఉదా: 'ఆకాశం ఎందుకు నీలం?', 'విద్యుత్ అంటే ఏమిటి?').",
    'gamifyTitle': 'గేమిఫై',
    'gamifyPlaceholder': "వచన-ఆధారిత ఆటను రూపొందించడానికి ఒక అంశం లేదా పాఠాన్ని నమోదు చేయండి (ఉదా: 'మన సౌర వ్యవస్థలోని గ్రహాలు', 'భారత చరిత్ర వాస్తవాలు').",
    'artifyTitle': 'ఆర్టిఫై (అభివృద్ధిలో ఉంది)',
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
    'gamifyUnderDevelopment': '',
    'artifyUnderDevelopment': 'ఈ ఫీచర్ అభివృద్ధిలో ఉంది. పూర్తయిన తర్వాత మీకు తెలియజేయబడుతుంది. ఆర్టిఫై మీ వివరణల నుండి లైన్ డ్రాయింగ్‌లు లేదా చార్ట్‌ల కోసం సాధారణ సూచనలను రూపొందించడంలో సహాయపడుతుంది।',
    'adaptifyUnderDevelopment': 'ఈ ఫీచర్ అభివృద్ధిలో ఉంది. పూర్తయిన తర్వాత మీకు తెలియజేయబడుతుంది. అడాప్టిఫై వివిధ గ్రేడ్ స్థాయిల కోసం భేదాత్మక పదార్థాలను రూపొందించడానికి కంటెంట్‌ను (ఉదా. పాఠ్యపుస్తక పేజీ ఫోటో) అప్‌లోడ్ చేయడంలో సహాయపడుతుంది।',
    'lensAIUnderDevelopment': 'ఈ ఫీచర్ అభివృద్ధిలో ఉంది. పూర్తయిన తర్వాత మీకు తెలియజేయబడుతుంది. లెన్స్ఏఐ రేఖాచిత్రాలు లేదా చార్ట్‌లను అప్‌లోడ్ చేయడంలో మీకు సహాయపడుతుంది, వాటి భాగాలు మరియు భావనల AI-ఆధారిత వివరణల కోసం।',
    'readifyUnderDevelopment': 'ఈ ఫీచర్ ప్రస్తుతం అభివృద్ధిలో ఉంది. అప్‌డేట్‌ల కోసం చూస్తూ ఉండండి!',
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
    'askAITitle': 'ஆஸ்க்ஏஐ',
    'askAIPlaceholder': "உங்கள் கேள்வியை உள்ளிடவும் (எ.கா: 'இந்தியாவின் முக்கிய நதிகள் யாவை?', 'இங்கிலாந்தில் கிரிக்கெட் வரலாறு பற்றிச் சொல்லுங்கள்').",
    'storyfyTitle': 'கதையாக்குங்கள்',
    'storyfyPlaceholder': "கதையாக மாற்ற ஒரு கருத்து அல்லது கேள்வியை உள்ளிடவும் (எ.கா: 'ஒளிச்சேர்க்கையை விளக்குங்கள்', 'நட்சத்திரங்கள் ஏன் மின்னுகின்றன?').",
    'explainifyTitle': 'எக்ஸ்பிளைனிஃபை',
    'explainifyPlaceholder': "மாணவர் கேள்வியைக் கேளுங்கள் (எ.கா: 'வானம் ஏன் நீலமாக இருக்கிறது?', 'மின்சாரம் என்றால் என்ன?').",
    'gamifyTitle': 'கேமிஃபை',
    'gamifyPlaceholder': "உரை அடிப்படையிலான விளையாட்டை உருவாக்க ஒரு தலைப்பு அல்லது பாடத்தை உள்ளிடவும் (எ.கா: 'நமது சூரிய குடும்பத்தில் உள்ள கிரகங்கள்', 'இந்திய வரலாற்று உண்மைகள்').",
    'artifyTitle': 'ஆர்ட்டிஃபை (உருவாக்கத்தில் உள்ளது)',
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
    'gamifyUnderDevelopment': '',
    'artifyUnderDevelopment': 'இந்த அம்சம் உருவாக்கத்தில் உள்ளது. இது முடிந்ததும் உங்களுக்கு அறிவிக்கப்படும். ஆர்ட்டிஃபை உங்கள் விளக்கங்களிலிருந்து கோடு வரைபடங்கள் அல்லது விளக்கப்படங்களுக்கான எளிய வழிமுறைகளை உருவாக்குகிறது.',
    'adaptifyUnderDevelopment': 'இந்த அம்சம் உருவாக்கத்தில் உள்ளது. இது முடிந்ததும் உங்களுக்கு அறிவிக்கப்படும். அடாப்டிஃபை பல்வேறு தர நிலைகளுக்கு வேறுபட்ட உள்ளடக்கங்களை உருவாக்க உள்ளடக்கத்தை (எ.கா., பாடநூல் பக்க புகைப்படம்) பதிவேற்ற உதவும்.',
    'lensAIUnderDevelopment': 'இந்த அம்சம் உருவாக்கத்தில் உள்ளது. இது முடிந்ததும் உங்களுக்கு அறிவிக்கப்படும். லென்ஸ்ஏஐ வரைபடங்கள் அல்லது விளக்கப்படங்களைப் பதிவேற்றி, அவற்றின் கூறுகள் மற்றும் கருத்துகளை AI மூலம் விளக்கங்களைப் பெற உங்களுக்கு உதவும்.',
    'readifyUnderDevelopment': 'இந்த அம்சம் தற்போது உருவாக்கத்தில் உள்ளது. புதுப்பிப்புகளுக்கு காத்திருங்கள்!',
  },
  'கನ್ನಡ': {
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
    'artify': {
      name: 'ಆರ್ಟಿಫೈ',
      description: 'ನಿಮ್ಮ ವಿವರಣೆಗಳಿಂದ ರೇಖಾಚಿತ್ರಗಳು ಅಥವಾ ಚಾರ್ಟ್‌ಗಳಿಗಾಗಿ ಸರಳ ಸೂಚನೆಗಳನ್ನು ರಚಿಸಿ।'
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
    'artify': {
      name: 'ആർട്ടിഫൈ',
      description: 'നിങ്ങളുടെ വിവരണങ്ങളിൽ നിന്ന് ലൈൻ ഡ്രോയിംഗുകൾ അല്ലെങ്കിൽ ചാർട്ടുകൾക്കുള്ള ലളിതമായ നിർദ്ദേശങ്ങൾ ഉണ്ടാക്കുക।'
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
    'artify': {
      name: 'আর্টিফাই',
      description: 'আপনার বিবরণ থেকে রেখাচিত্র বা চার্টের জন্য সহজ নির্দেশাবলী তৈরি করুন।'
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
    'artify': {
      name: 'आर्टिफाय',
      description: 'तुमच्या वर्णनांवरून रेषाचित्रे किंवा आलेखांसाठी सोप्या सूचना तयार करा।'
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
    'artify': {
      name: 'આર્ટિફાય',
      description: 'તમારા વર્ણનોમાંથી રેખાંકનો અથવા ચાર્ટ્સ માટે સરળ સૂચનાઓ બનાવો.'
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
    'artify': {
      name: 'ਆਰਟੀਫਾਈ',
      description: "ਤੁਹਾਡੇ ਵਰਣਨਾਂ ਤੋਂ ਲਾਈਨ ਡਰਾਇੰਗਾਂ ਜਾਂ ਚਾਰਟਾਂ ਲਈ ਸਧਾਰਨ ਨਿਰਦੇਸ਼ ਤਿਆਰ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।"
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

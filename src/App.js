import React, { useState, useEffect, useRef } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { textModel } from './gemini';
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

// UPDATED: Renamed 'askMeAnything' to 'askAI' and 'instantKnowledgeBase' to 'explainify'
const featureCards = [
  { id: 'askAI' },
  { id: 'storyfy' },
  { id: 'explainify' },
  { id: 'gamify' },
  { id: 'artify' },
  { id: 'adaptify' },
  { id: 'lensAI' },
];

// UPDATED: Renamed 'askMeAnything' to 'askAI' and 'instantKnowledgeBase' to 'explainify' in translations
const featureTranslations = {
  'English': {
    'askAI': { // Renamed
      name: 'AskAI',
      description: 'Get general queries or facts (India-focused).'
    },
    'storyfy': {
      name: 'Storyfy',
      description: 'Explain concepts simply as stories for kids.'
    },
    'explainify': { // Renamed
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
  },
  'हिंदी': {
    'askAI': { // Renamed
      name: 'आस्कएआई',
      description: 'सामान्य प्रश्न या स्थानीय तथ्य (भारत-केंद्रित) प्राप्त करें।'
    },
    'storyfy': {
      name: 'कहानियां बनाओ',
      description: 'अवधारणाओं को बच्चों के लिए कहानियों के रूप में समझाएं।'
    },
    'explainify': { // Renamed
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
  },
  'తెలుగు': {
    'askAI': { // Renamed
      name: 'ఆస్క్‌ఏఐ',
      description: 'సాధారణ ప్రశ్నలకు లేదా స్థానిక వాస్తవాలకు (భారతదేశం-కేంద్రీకృత) సమాధానాలు పొందండి।'
    },
    'storyfy': {
      name: 'కథలుగా మార్చండి',
      description: 'పిల్లల కోసం భావనలను కథలుగా సులభంగా వివరించండి।'
    },
    'explainify': { // Renamed
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
  },
  'தமிழ்': {
    'askAI': { // Renamed
      name: 'ஆஸ்க்ஏஐ',
      description: 'பொதுவான கேள்விகள் அல்லது உள்ளூர் தகவல்களை (இந்தியா சார்ந்தது) பெறுங்கள்।'
    },
    'storyfy': {
      name: 'கதையாக்குங்கள்',
      description: 'குழந்தைகளுக்கான கதைகளாக கருத்துக்களை எளிமையாக விளக்குங்கள்।'
    },
    'explainify': { // Renamed
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
  },
  'ಕನ್ನಡ': {
    'askAI': { // Renamed
      name: 'ಆಸ್ಕ್‌ಎಐ',
      description: 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು ಅಥವಾ ಸ್ಥಳೀಯ ಸಂಗತಿಗಳನ್ನು (ಭಾರತ-ಕೇಂದ್ರಿತ) ಪಡೆಯಿರಿ।'
    },
    'storyfy': {
      name: 'ಕಥೆಯಾಗಿ',
      description: 'ಮಕ್ಕಳಿಗಾಗಿ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ಸರಳ ಕಥೆಗಳಾಗಿ ವಿವರಿಸಿ।'
    },
    'explainify': { // Renamed
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
  },
  'മലയാളം': {
    'askAI': { // Renamed
      name: 'ആസ്ക്എഐ',
      description: 'പൊതുവായ ചോദ്യങ്ങൾക്കോ പ്രാദേശിക വിവരങ്ങൾക്കോ (ഇന്ത്യൻ-അധിഷ്ഠിതം) ഉത്തരം നേടുക।'
    },
    'storyfy': {
      name: 'കഥയാക്കൂ',
      description: 'കുട്ടികൾക്കായി ആശയങ്ങളെ ലളിതമായ കഥകളാക്കി മാറ്റുക।'
    },
    'explainify': { // Renamed
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
  },
  'বাংলা': {
    'askAI': { // Renamed
      name: 'আস্কএআই',
      description: 'সাধারণ প্রশ্ন বা স্থানীয় তথ্য (ভারত-কেন্দ্রিক) পান।'
    },
    'storyfy': {
      name: 'গল্প তৈরি করুন',
      description: 'বাচ্চাদের জন্য ধারণাগুলিকে সহজ গল্পে ব্যাখ্যা করুন।'
    },
    'explainify': { // Renamed
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
  },
  'মराठी': {
    'askAI': { // Renamed
      name: 'आस्कएआय',
      description: 'सामान्य प्रश्न किंवा स्थानिक तथ्ये (भारत-केंद्रित) मिळवा।'
    },
    'storyfy': {
      name: 'कथा बनवा',
      description: 'मुलांसाठी संकल्पनांना सोप्या कथांमध्ये समजावून सांगा।'
    },
    'explainify': { // Renamed
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
  },
  'ગુજરાતી': {
    'askAI': { // Renamed
      name: 'આસ્કએઆઈ',
      description: 'સામાન્ય પ્રશ્નો અથવા સ્થાનિક તથ્યો (ભારત-કેન્દ્રિત) મેળવો।'
    },
    'storyfy': {
      name: 'વાર્તા બનાવો',
      description: 'બાળકો માટે ખ્યાલોને સરળ વાર્તાઓમાં સમજાવો।'
    },
    'explainify': { // Renamed
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
  },
  'પੰਜਾਬੀ': {
    'askAI': { // Renamed
      name: 'ਆਸਕਏਆਈ',
      description: "ਆਪਣੀ ਪ੍ਰਸ਼ਨ ਦਰਜ ਕਰੋ (ਉਦਾਹਰਨ ਲਈ, 'ਭਾਰਤ ਦੀਆਂ ਮੁੱਖ ਨਦੀਆਂ ਕਿਹੜੀਆਂ ਹਨ?', 'ਇੰਗਲੈਂਡ ਵਿੱਚ ਕ੍ਰਿਕਟ ਦਾ ਇਤਿਹਾਸ ਦੱਸੋ।')."
    },
    'storyfy': {
      name: 'ਕਹਾਣੀ ਬਣਾਓ',
      description: 'ਬੱਚਿਆਂ ਲਈ ਸੰਕਲਪਾਂ ਨੂੰ ਸਰਲ ਕਹਾਣੀਆਂ ਵਿੱਚ ਸਮਝਾਓ।'
    },
    'explainify': { // Renamed
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
      description: "AI-ਸੰਚਾਲਿਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਡਾਇਗ੍ਰਾਮ ਜਾਂ ਚਾਰਟ ਅੱਪਲੋਡ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰੇਗਾ।"
    },
  }
};

// UPDATED: Renamed 'askMeAnythingTitle' to 'askAITitle' and 'instantKnowledgeBaseTitle' to 'explainifyTitle'
// Removed 'listening' text as voice input is gone
const viewContentTranslations = {
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
    'askAITitle': 'AskAI', // Renamed
    'askAIPlaceholder': "Enter your query (e.g., 'What are the main rivers in India?', 'Tell me about the history of cricket in England').", // Renamed
    'storyfyTitle': 'Storyfy',
    'storyfyPlaceholder': "Enter a concept or question to 'Storyfy' (e.g., 'Explain photosynthesis', 'Why do stars twinkle?').",
    'explainifyTitle': 'Explainify', // Renamed
    'explainifyPlaceholder': "Ask a student question (e.g., 'Why is the sky blue?', 'What is electricity?').", // Renamed
    'gamifyTitle': 'Gamify (Under Development)',
    'artifyTitle': 'Artify (Under Development)',
    'adaptifyTitle': 'Adaptify (Under Development)',
    'lensAITitle': 'LensAI (Under Development)',
    'generateButton': 'Generate',
    'clearButton': 'Clear',
    'backButton': 'Back to Home',
    'aiResponseHeading': 'AI Response:',
    'signInMessage': 'Please sign in to use Sahayak.',
    'chooseLanguageTitle': 'Choose Your Preferred Language',
    // 'listening': 'Listening...', // Removed
    'generating': 'Generating Response...',
    'copySuccess': 'Copied!',
    'gamifyUnderDevelopment': 'This feature is under development. You will be notified once it is completed. Gamify helps generate simple, text-based games from any lesson or topic.',
    'artifyUnderDevelopment': 'This feature is under development. You will be notified once it is completed. Artify helps generate simple instructions for line drawings or charts from your descriptions.',
    'adaptifyUnderDevelopment': 'This feature is under development. You will be notified once it is completed. Adaptify will help upload content (e.g., textbook page photo) to generate differentiated materials for various grade levels.',
    'lensAIUnderDevelopment': 'This feature is under development. You will be notified once it is completed. LensAI will help you upload diagrams or charts for AI-powered explanations of their components and concepts.',
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
    'askAITitle': 'आस्कएआई', // Renamed
    'askAIPlaceholder': "अपनी क्वेरी दर्ज करें (उदाहरण: 'भारत की प्रमुख नदियाँ क्या हैं?', 'इंग्लैंड में क्रिकेट का इतिहास बताएं।').", // Renamed
    'storyfyTitle': 'कहानियां बनाओ',
    'storyfyPlaceholder': "किसी अवधारणा या प्रश्न को 'कहानियां बनाओ' (उदाहरण: 'प्रकाश संश्लेषण समझाएं', 'तारे क्यों टिमटिमाते हैं?') में दर्ज करें।",
    'explainifyTitle': 'एक्सप्लेनिफ़ाई', // Renamed
    'explainifyPlaceholder': "छात्र प्रश्न पूछें (उदाहरण: 'आकाश नीला क्यों है?', 'बिजली क्या है?').", // Renamed
    'gamifyTitle': 'गेमिफ़ाई (विकास के अधीन)',
    'artifyTitle': 'आर्टिफ़ाई (विकास के अधीन)',
    'adaptifyTitle': 'अनुकूलन करें (विकास के अधीन)',
    'lensAITitle': 'लेंसएआई (विकास के अधीन)',
    'generateButton': 'उत्पन्न करें',
    'clearButton': 'साफ़ करें',
    'backButton': 'होम पर वापस जाएं',
    'aiResponseHeading': 'एआई प्रतिक्रिया:',
    'signInMessage': 'सहायक का उपयोग करने के लिए कृपया साइन इन करें।',
    // 'listening': 'सुन रहा है...', // Removed
    'chooseLanguageTitle': 'अपनी पसंदीदा भाषा चुनें',
    // 'listening': 'सुन रहा है...', // Removed
    'generating': 'प्रतिक्रिया उत्पन्न हो रही है...',
    'copySuccess': 'कॉपी किया गया!',
    'gamifyUnderDevelopment': 'यह सुविधा विकास के अधीन है। पूरा होने पर आपको सूचित किया जाएगा। गेमिफ़ाई किसी भी पाठ या विषय से सरल, पाठ-आधारित गेम बनाने में मदद करता है।',
    'artifyUnderDevelopment': 'यह सुविधा विकास के अधीन है। पूरा होने पर आपको सूचित किया जाएगा। आर्टिफ़ाई आपके विवरण से रेखा चित्र या चार्ट के लिए सरल निर्देश तैयार करने में मदद करता है।',
    'adaptifyUnderDevelopment': 'यह सुविधा विकास के अधीन है। पूरा होने पर आपको सूचित किया जाएगा। अनुकूलन विभिन्न ग्रेड स्तरों के लिए भिन्न सामग्री बनाने के लिए सामग्री (उदा. पाठ्यपुस्तक पृष्ठ फोटो) अपलोड करने में मदद करेगा।',
    'lensAIUnderDevelopment': 'यह सुविधा विकास के अधीन है। पूरा होने पर आपको सूचित किया जाएगा। लेंसएआई आपको आरेख या चार्ट अपलोड करने में मदद करेगा ताकि उनके घटकों और अवधारणाओं की एआई-संचालित व्याख्या मिल सके।',
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
    'askAITitle': 'ఆస్క్‌ఏఐ', // Renamed
    'askAIPlaceholder': "మీ ప్రశ్నను నమోదు చేయండి (ఉదా: 'భారతదేశంలోని ప్రధాన నదులు ఏమిటి?', 'ఇంగ్లాండ్‌లో క్రికెట్ చరిత్ర గురించి చెప్పండి.').", // Renamed
    'storyfyTitle': 'కథలుగా మార్చండి',
    'storyfyPlaceholder': "కథగా మార్చడానికి ఒక భావన లేదా ప్రశ్నను నమోదు చేయండి (ఉదా: 'కిరణజన్య సంయోగక్రియను వివరించండి', 'నక్షత్రాలు ఎందుకు మెరుస్తాయి?').",
    'explainifyTitle': 'ఎక్స్‌ప్లెయిన్‌ఫై', // Renamed
    'explainifyPlaceholder': "విద్యార్థి ప్రశ్న అడగండి (ఉదా: 'ఆకాశం ఎందుకు నీలం?', 'విద్యుత్ అంటే ఏమిటి?').", // Renamed
    'gamifyTitle': 'గేమిఫై (అభివృద్ధిలో ఉంది)',
    'artifyTitle': 'ఆర్టిఫై (అభివృద్ధిలో ఉంది)',
    'adaptifyTitle': 'అడాప్టిఫై (అభివృద్ధిలో ఉంది)',
    'lensAITitle': 'లెన్స్ఏఐ (అభివృద్ధిలో ఉంది)',
    'generateButton': 'ఉత్పన్నం చేయండి',
    'clearButton': 'శుభ్రం చేయండి',
    'backButton': 'హోమ్‌కి తిరిగి వెళ్ళండి',
    'aiResponseHeading': 'AI ప్రతిస్పందన:',
    'signInMessage': 'సహాయక్ ఉపయోగించడానికి దయచేసి సైన్ ఇన్ చేయండి.',
    // 'listening': 'వినబడుతోంది...', // Removed
    'generating': 'ప్రతిస్పందన ఉత్పత్తి అవుతోంది...',
    'copySuccess': 'కాపీ చేయబడింది!',
    'gamifyUnderDevelopment': 'ఈ ఫీచర్ అభివృద్ధిలో ఉంది. పూర్తయిన తర్వాత మీకు తెలియజేయబడుతుంది. గేమిఫై ఏ పాఠం లేదా అంశం నుండి అయినా సాధారణ, వచన-ఆధారిత ఆటలను రూపొందించడంలో సహాయపడుతుంది।',
    'artifyUnderDevelopment': 'ఈ ఫీచర్ అభివృద్ధిలో ఉంది. పూర్తయిన తర్వాత మీకు తెలియజేయబడుతుంది. ఆర్టిఫై మీ వివరణల నుండి లైన్ డ్రాయింగ్‌లు లేదా చార్ట్‌ల కోసం సాధారణ సూచనలను రూపొందించడంలో సహాయపడుతుంది।',
    'adaptifyUnderDevelopment': 'ఈ ఫీచర్ అభివృద్ధిలో ఉంది. పూర్తయిన తర్వాత మీకు తెలియజేయబడుతుంది. అడాప్టిఫై వివిధ గ్రేడ్ స్థాయిల కోసం భేదాత్మక పదార్థాలను రూపొందించడానికి కంటెంట్‌ను (ఉదా. పాఠ్యపుస్తక పేజీ ఫోటో) అప్‌లోడ్ చేయడంలో సహాయపడుతుంది।',
    'lensAIUnderDevelopment': 'ఈ ఫీచర్ అభివృద్ధిలో ఉంది. పూర్తయిన తర్వాత మీకు తెలియజేయబడుతుంది. లెన్స్ఏఐ రేఖాచిత్రాలు లేదా చార్ట్‌లను అప్‌లోడ్ చేయడంలో మీకు సహాయపడుతుంది, వాటి భాగాలు మరియు భావనల AI-ఆధారిత వివరణల కోసం।',
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
    'askAITitle': 'ஆஸ்க்ஏஐ', // Renamed
    'askAIPlaceholder': "உங்கள் கேள்வியை உள்ளிடவும் (எ.கா: 'இந்தியாவின் முக்கிய நதிகள் யாவை?', 'இங்கிலாந்தில் கிரிக்கெட் வரலாறு பற்றிச் சொல்லுங்கள்').", // Renamed
    'storyfyTitle': 'கதையாக்குங்கள்',
    'storyfyPlaceholder': "கதையாக மாற்ற ஒரு கருத்து அல்லது கேள்வியை உள்ளிடவும் (எ.கா: 'ஒளிச்சேர்க்கையை விளக்குங்கள்', 'நட்சத்திரங்கள் ஏன் மின்னுகின்றன?').",
    'explainifyTitle': 'எக்ஸ்பிளைனிஃபை', // Renamed
    'explainifyPlaceholder': "மாணவர் கேள்வியைக் கேளுங்கள் (எ.கா: 'வானம் ஏன் நீலமாக இருக்கிறது?', 'மின்சாரம் என்றால் என்ன?').", // Renamed
    'gamifyTitle': 'கேமிஃபை (உருவாக்கத்தில் உள்ளது)',
    'artifyTitle': 'ஆர்ட்டிஃபை (உருவாக்கத்தில் உள்ளது)',
    'adaptifyTitle': 'அடாப்டிஃபை (உருவாக்கத்தில் உள்ளது)',
    'lensAITitle': 'லென்ஸ்ஏஐ (உருவாக்கத்தில் உள்ளது)',
    'generateButton': 'உருவாக்குங்கள்',
    'clearButton': 'அழி',
    'backButton': 'முகப்புக்குத் திரும்பு',
    'aiResponseHeading': 'AI பதில்:',
    'signInMessage': 'சஹாயக்கை பயன்படுத்த உள்நுழையவும்.',
    'chooseLanguageTitle': 'உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
    // 'listening': 'கேட்கிறது...', // Removed
    'generating': 'பதில் உருவாக்கப்படுகிறது...',
    'copySuccess': 'நகலெடுக்கப்பட்டது!',
    'gamifyUnderDevelopment': 'இந்த அம்சம் உருவாக்கத்தில் உள்ளது. இது முடிந்ததும் உங்களுக்கு அறிவிக்கப்படும். கேமிஃபை எந்தவொரு பாடம் அல்லது தலைப்பிலிருந்தும் எளிய, உரை அடிப்படையிலான விளையாட்டுகளை உருவாக்க உதவுகிறது.',
    'artifyUnderDevelopment': 'இந்த அம்சம் உருவாக்கத்தில் உள்ளது. இது முடிந்ததும் உங்களுக்கு அறிவிக்கப்படும். ஆர்ட்டிஃபை உங்கள் விளக்கங்களிலிருந்து கோடு வரைபடங்கள் அல்லது விளக்கப்படங்களுக்கான எளிய வழிமுறைகளை உருவாக்குகிறது.',
    'adaptifyUnderDevelopment': 'இந்த அம்சம் உருவாக்கத்தில் உள்ளது. இது முடிந்ததும் உங்களுக்கு அறிவிக்கப்படும். அடாப்டிஃபை பல்வேறு தர நிலைகளுக்கு வேறுபட்ட உள்ளடக்கங்களை உருவாக்க உள்ளடக்கத்தை (எ.கா., பாடநூல் பக்க புகைப்படம்) பதிவேற்ற உதவும்.',
    'lensAIUnderDevelopment': 'இந்த அம்சம் உருவாக்கத்தில் உள்ளது. இது முடிந்ததும் உங்களுக்கு அறிவிக்கப்படும். லென்ஸ்ஏஐ வரைபடங்கள் அல்லது விளக்கப்படங்களைப் பதிவேற்றி, அவற்றின் கூறுகள் மற்றும் கருத்துகளை AI மூலம் விளக்கங்களைப் பெற உங்களுக்கு உதவும்.',
  },
  'ಕನ್ನಡ': {
    'appTitle': 'ಸಹಾಯಕ್ ಪಿಡಬ್ಲ್ಯೂಎ',
    'homeButton': 'ಹೋಮ್',
    'setupLanguage': 'ಭಾಷೆ ಹೊಂದಿಸಿ',
    'selectLanguage': 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
    'saveButton': 'ಉಳಿಸಿ',
    'welcomeMessage': 'ಸಹಾಯಕ್ ಪಿಡಬ್ಲ್ಯೂಎಗೆ ಸುಸ್ವಾಗತ! ದಯವಿಟ್ಟು ಸೈನ್ ಇನ್ ಮಾಡಿ.',
    'signInButton': 'Google ನೊಂದಿಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ',
    'signOutButton': 'ಸೈನ್ ಔಟ್ ಮಾಡಿ',
    'dashboardTitle': 'ಇಂದು ನೀವು ಏನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?',
    'askAITitle': 'ಆಸ್ಕ್‌ಎಐ', // Renamed
    'askAIPlaceholder': "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ನಮೂದಿಸಿ (ಉದಾ: 'ಭಾರತದ ಪ್ರಮುಖ ನದಿಗಳು ಯಾವುವು?', 'ಇಂಗ್ಲೆಂಡ್‌ನಲ್ಲಿ ಕ್ರಿಕೆಟ್ ಇತಿಹಾಸದ ಬಗ್ಗೆ ಹೇಳಿ').", // Renamed
    'storyfyTitle': 'ಕಥೆಯಾಗಿ',
    'storyfyPlaceholder': "ಕಥೆಯಾಗಿ ಮಾಡಲು ಒಂದು ಪರಿಕಲ್ಪನೆ ಅಥವಾ ಪ್ರಶ್ನೆಯನ್ನು ನಮೂದಿಸಿ (ಉದಾ: 'ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆಯನ್ನು ವಿವರಿಸಿ', 'ನಕ್ಷತ್ರಗಳು ಏಕೆ ಮಿನುಗುತ್ತವೆ?').",
    'explainifyTitle': 'ಎಕ್ಸ್‌ಪ್ಲೈನ್‌ಫೈ', // Renamed
    'explainifyPlaceholder': "ವಿದ್ಯಾರ್ಥಿ ಪ್ರಶ್ನೆ ಕೇಳಿ (ಉದಾ: 'ಆಕಾಶ ಏಕೆ ನೀಲಿ ಬಣ್ಣದ್ದಾಗಿದೆ?', 'ವಿದ್ಯುತ್ ಎಂದರೇನು?').", // Renamed
    'gamifyTitle': 'ಗೇಮಿಫೈ (ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ)',
    'artifyTitle': 'ಆರ್ಟಿಫೈ (ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ)',
    'adaptifyTitle': 'ಅಡಾಪ್ಟಿಫೈ (ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ)',
    'lensAITitle': 'ಲೆನ್ಸ್‌ಎಐ (ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ)',
    'generateButton': 'ರಚಿಸಿ',
    'clearButton': 'ತೆರವುಗೊಳಿಸಿ',
    'backButton': 'ಮನೆಗೆ ಹಿಂತಿರುಗಿ',
    'aiResponseHeading': 'AI ಪ್ರತಿಕ್ರಿಯೆ:',
    'signInMessage': 'ಸಹಾಯಕ ಬಳಸಲು ದಯವಿಟ್ಟು ಸೈನ್ ಇನ್ ಮಾಡಿ.',
    // 'listening': 'ಕೇಳಲಾಗುತ್ತಿದೆ...', // Removed
    'chooseLanguageTitle': 'ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    // 'listening': 'ಕೇಳಲಾಗುತ್ತಿದೆ...', // Removed
    'generating': 'ಪ್ರತಿಕ್ರಿಯೆ ರಚಿಸಲಾಗುತ್ತಿದೆ...',
    'copySuccess': 'ನಕಲಿಸಲಾಗಿದೆ!',
    'gamifyUnderDevelopment': 'ಈ ವೈಶಿಷ್ಟ್ಯವು ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ. ಇದು ಪೂರ್ಣಗೊಂಡ ನಂತರ ನಿಮಗೆ ತಿಳಿಸಲಾಗುವುದು. ಗೇಮಿಫೈ ಯಾವುದೇ ಪಾಠ ಅಥವಾ ವಿಷಯದಿಂದ ಸರಳ, ಪಠ್ಯ-ಆಧಾರಿತ ಆಟಗಳನ್ನು ರಚಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ।',
    'artifyUnderDevelopment': 'ಈ ವೈಶಿಷ್ಟ್ಯವು ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ. ಇದು ಪೂರ್ಣಗೊಂಡ ನಂತರ ನಿಮಗೆ ತಿಳಿಸಲಾಗುವುದು. ಆರ್ಟಿಫೈ ನಿಮ್ಮ ವಿವರಣೆಗಳಿಂದ ರೇಖಾಚಿತ್ರಗಳು ಅಥವಾ ಚಾರ್ಟ್‌ಗಳಿಗಾಗಿ ಸರಳ ಸೂಚನೆಗಳನ್ನು ರಚಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ।',
    'adaptifyUnderDevelopment': 'ಈ ವೈಶಿಷ್ಟ್ಯವು ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ. ಇದು ಪೂರ್ಣಗೊಂಡ ನಂತರ ನಿಮಗೆ ತಿಳಿಸಲಾಗುವುದು. ಅಡಾಪ್ಟಿಫೈ ವಿವಿಧ ದರ್ಜೆಯ ಹಂತಗಳಿಗೆ ವಿಭಿನ್ನ ವಸ್ತುಗಳನ್ನು ರಚಿಸಲು ವಿಷಯವನ್ನು (ಉದಾ. ಪಾಠಪುಸ್ತಕ ಪುಟದ ಫೋಟೋ) ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ।',
    'lensAIUnderDevelopment': 'ಈ ವೈಶಿಷ್ಟ್ಯವು ಅಭಿವೃದ್ಧಿಯಲ್ಲಿದೆ. ಇದು ಪೂರ್ಣಗೊಂಡ ನಂತರ ನಿಮಗೆ ತಿಳಿಸಲಾಗುವುದು. ಲೆನ್ಸ್‌ಎಐ AI-ಚಾಲಿತ ವಿವರಣೆಗಳಿಗಾಗಿ ರೇಖಾಚಿತ್ರಗಳು ಅಥವಾ ಚಾರ್ಟ್‌ಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ।',
  },
  'മലയാളം': {
    'appTitle': 'സഹായക് പിഡബ്ല്യുഎ',
    'homeButton': 'ഹോം',
    'setupLanguage': 'ഭാഷ സജ്ജമാക്കുക',
    'selectLanguage': 'നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട ഭാഷ തിരഞ്ഞെടുക്കുക:',
    'saveButton': 'സംരക്ഷിക്കുക',
    'welcomeMessage': 'സഹായക് പിഡബ്ല്യുഎയിലേക്ക് സ്വാഗതം! ദയവായി സൈൻ ഇൻ ചെയ്യുക.',
    'signInButton': 'Google ഉപയോഗിച്ച് സൈൻ ഇൻ ചെയ്യുക',
    'signOutButton': 'സൈൻ ഔട്ട് ചെയ്യുക',
    'dashboardTitle': 'ഇന്ന് നിങ്ങൾ എന്തുചെയ്യാൻ ആഗ്രഹിക്കുന്നു?',
    'askAITitle': 'ആസ്ക്എഐ', // Renamed
    'askAIPlaceholder': "നിങ്ങളുടെ ചോദ്യം നൽകുക (ഉദാ: 'ഇന്ത്യയിലെ പ്രധാന നദികൾ ഏതെല്ലാമാണ്?', 'ഇംഗ്ലണ്ടിലെ ക്രിക്കറ്റിന്റെ ചരിത്രം പറയുക.').", // Renamed
    'storyfyTitle': 'കഥയാക്കൂ',
    'storyfyPlaceholder': "കുട്ടികൾക്കായി ആശയങ്ങളെ ലളിതമായ കഥകളാക്കി മാറ്റുക.'പ്രകാശസംശ്ലേഷണം വിശദീകരിക്കുക', 'നക്ഷത്രങ്ങൾ എന്തിന് തിളങ്ങുന്നു?').",
    'explainifyTitle': 'എക്സ്പ്ലൈനിഫൈ', // Renamed
    'explainifyPlaceholder': "വിദ്യാർത്ഥി ചോദ്യം ചോദിക്കുക (ഉദാ: 'ആകാശം നീലയായിരിക്കുന്നത് എന്തുകൊണ്ട്?', 'വൈദ്യുതി എന്നാൽ എന്ത്?').", // Renamed
    'gamifyTitle': 'ഗെയിമിഫൈ (വികസനത്തിൽ)',
    'artifyTitle': 'ആർട്ടിഫൈ (വികസനത്തിൽ)',
    'adaptifyTitle': 'അഡാപ്റ്റിഫൈ (വികസനത്തിൽ)',
    'lensAITitle': 'ലെൻസ്എഐ (വികസനത്തിൽ)',
    'generateButton': 'ഉണ്ടാക്കുക',
    'clearButton': 'മായ്ക്കുക',
    'backButton': 'ഹോമിലേക്ക് മടങ്ങുക',
    'aiResponseHeading': 'AI പ്രതികരണം:',
    'signInMessage': 'സഹായക് ഉപയോഗിക്കാൻ ദയവായി സൈൻ ഇൻ ചെയ്യുക.',
    // 'listening': 'കേൾക്കുന്നു...', // Removed
    'chooseLanguageTitle': 'നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട ഭാഷ തിരഞ്ഞെടുക്കുക',
    // 'listening': 'കേൾക്കുന്നു...', // Removed
    'generating': 'പ്രതികരണം ഉണ്ടാക്കുന്നു...',
    'copySuccess': 'പകർത്തുക!',
    'gamifyUnderDevelopment': 'ഈ സവിശേഷത വികസനത്തിലാണ്. പൂർത്തിയാകുമ്പോൾ നിങ്ങളെ അറിയിക്കും. ഗെയിമിഫൈ ഏതൊരു പാഠത്തിൽ നിന്നോ വിഷയത്തിൽ നിന്നോ ലളിതമായ, ടെക്സ്റ്റ് അധിഷ്ഠിത ഗെയിമുകൾ ഉണ്ടാക്കാൻ സഹായിക്കുന്നു.',
    'artifyUnderDevelopment': 'ഈ സവിശേഷത വികസനത്തിലാണ്. പൂർത്തിയാകുമ്പോൾ നിങ്ങളെ അറിയിക്കും. ആർട്ടിഫൈ നിങ്ങളുടെ വിവരണങ്ങളിൽ നിന്ന് ലൈൻ ഡ്രോയിംഗുകൾ അല്ലെങ്കിൽ ചാർട്ടുകൾക്കുള്ള ലളിതമായ നിർദ്ദേശങ്ങൾ ഉണ്ടാക്കാൻ സഹായിക്കുന്നു.',
    'adaptifyUnderDevelopment': 'ഈ സവിശേഷത വികസനത്തിലാണ്. പൂർത്തിയാകുമ്പോൾ നിങ്ങളെ അറിയിക്കും. അഡാപ്റ്റിഫൈ വിവിധ ഗ്രേഡ് തലങ്ങളിലേക്ക് വ്യത്യസ്തമായ പഠന സാമഗ്രികൾ ഉണ്ടാക്കാൻ ഉള്ളടക്കം (ഉദാ: പാഠപുസ്തക പേജിന്റെ ഫോട്ടോ) അപ്ലോഡ് ചെയ്യാൻ സഹായിക്കും.',
    'lensAIUnderDevelopment': 'ഈ സവിശേഷത വികസനത്തിലാണ്. പൂർത്തിയാകുമ്പോൾ നിങ്ങളെ അറിയിക്കും. ലെൻസ്എഐ ഡയഗ്രമുകളോ ചാർട്ടുകളോ അപ്‌ലോഡ് ചെയ്യാനായി സഹായിക്കും, അവയുടെ ഘടകങ്ങളെയും ആശയങ്ങളെയും കുറിച്ചുള്ള AI-അധിഷ്ഠിത വിശദീകരണങ്ങൾക്കായി।',
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
    'askAITitle': 'আস্কএআই', // Renamed
    'askAIPlaceholder': "আপনার প্রশ্ন লিখুন (যেমন: 'ভারতের প্রধান নদীগুলি কী কী?', 'ইংল্যান্ডে ক্রিকেটের ইতিহাস বলুন।').", // Renamed
    'storyfyTitle': 'গল্প তৈরি করুন',
    'storyfyPlaceholder': "গল্প তৈরি করতে একটি ধারণা বা প্রশ্ন লিখুন (যেমন: 'সালোকসংশ্লেষণ ব্যাখ্যা করুন', 'তারা কেন ঝিকমিক করে?').",
    'explainifyTitle': 'এক্সপ্লেইনফাই', // Renamed
    'explainifyPlaceholder': "ছাত্র প্রশ্ন জিজ্ঞাসা করুন (যেমন: 'আকাশ নীল কেন?', 'বিদ্যুৎ কি?').", // Renamed
    'gamifyTitle': 'গেম তৈরি করুন (উন্নয়নাধীন)',
    'artifyTitle': 'আর্টিফাই (উন্নয়নাধীন)',
    'adaptifyTitle': 'অভিযোজন করুন (উন্নয়নাধীন)',
    'lensAITitle': 'লেন্সএআই (উন্নয়নাধীন)',
    'generateButton': 'তৈরি করুন',
    'clearButton': 'পরিষ্কার করুন',
    'backButton': 'হোমে ফিরে যান',
    'aiResponseHeading': 'এআই প্রতিক্রিয়া:',
    'signInMessage': 'সহায়ক ব্যবহার করতে অনুগ্রহ করে সাইন ইন করুন।',
    // 'listening': 'শুনছি...', // Removed
    'chooseLanguageTitle': 'আপনার পছন্দের ভাষা নির্বাচন করুন',
    // 'listening': 'শুনছি...', // Removed
    'generating': 'প্রতিক্রিয়া তৈরি হচ্ছে...',
    'copySuccess': 'অনুলিপি করা হয়েছে!',
    'gamifyUnderDevelopment': 'এই বৈশিষ্ট্যটি উন্নয়নাধীন। এটি সম্পূর্ণ হলে আপনাকে জানানো হবে। গেম তৈরি করুন যেকোনো পাঠ বা বিষয় থেকে সহজ, পাঠ-ভিত্তিক গেম তৈরি করতে সাহায্য করে।',
    'artifyUnderDevelopment': 'এই বৈশিষ্ট্যটি উন্নয়নাধীন। এটি সম্পূর্ণ হলে আপনাকে জানানো হবে। আর্টিফাই আপনার বিবরণ থেকে রেখাচিত্র বা চার্টের জন্য সহজ নির্দেশাবলী তৈরি করতে সাহায্য করে।',
    'adaptifyUnderDevelopment': 'এই বৈশিষ্ট্যটি উন্নয়নাধীন। এটি সম্পূর্ণ হলে আপনাকে জানানো হবে। অভিযোজন বিভিন্ন গ্রেড স্তরের জন্য ভিন্ন ভিন্ন উপকরণ তৈরি করতে বিষয়বস্তু (যেমন, পাঠ্যপুস্তকের পৃষ্ঠার ছবি) আপলোড করতে সাহায্য করবে।',
    'lensAIUnderDevelopment': 'এই বৈশিষ্ট্যটি উন্নয়নাধীন। এটি সম্পূর্ণ হলে আপনাকে জানানো হবে। লেন্সএআই আপনাকে আঁকা বা চার্ট আপলোড করতে সাহায্য করবে তাদের উপাদান এবং ধারণাগুলির এআই-চালিত ব্যাখ্যার জন্য।',
  },
  'মराठी': {
    'appTitle': 'सहायक पीडब्ल्यूए',
    'homeButton': 'होम',
    'setupLanguage': 'भाषा सेट करा',
    'selectLanguage': 'आपली पसंतीची भाषा निवडा:',
    'saveButton': 'सेव्ह करा',
    'welcomeMessage': 'सहायक पीडब्ल्यूएमध्ये आपले स्वागत आहे! कृपया साइन इन करा.',
    'signInButton': 'गुगलने साइन इन करा',
    'signOutButton': 'साइन आउट करा',
    'dashboardTitle': 'आज तुम्हाला काय करायचे आहे?',
    'askAITitle': 'आस्कएआय', // Renamed
    'askAIPlaceholder': "तुमची क्वेरी प्रविष्ट करा (उदा. 'भारतातील प्रमुख नद्या कोणत्या आहेत?', 'इंग्लंडमधील क्रिकेटचा इतिहास सांगा.').", // Renamed
    'storyfyTitle': 'कथा बनवा',
    'storyfyPlaceholder': "'कथा बनवा' करण्यासाठी एखादी संकल्पना किंवा प्रश्न प्रविष्ट करा (उदा. 'प्रकाशसंश्लेषण समजावून सांगा', 'तारे का चमकतात?').",
    'explainifyTitle': 'एक्सप्लेनिफाय', // Renamed
    'explainifyPlaceholder': "विद्यार्थी प्रश्न विचारा (उदा. 'आकाश निळा का आहे?', 'वीज म्हणजे काय?').", // Renamed
    'gamifyTitle': 'गेमिफाय (विकासाधीन)',
    'artifyTitle': 'आर्टिफाय (विकासाधीन)',
    'adaptifyTitle': 'अ‍ॅडॅप्टिफाय (विकासाधीन)',
    'lensAITitle': 'लेन्सएआय (विकासाधीन)',
    'generateButton': 'व्युत्पन्न करा',
    'clearButton': 'साफ करा',
    'backButton': 'मुख्यपृष्ठावर परत जा',
    'aiResponseHeading': 'AI प्रतिसाद:',
    'signInMessage': 'सहायक वापरण्यासाठी कृपया साइन इन करा।',
    // 'listening': 'ऐकत आहे...', // Removed
    'chooseLanguageTitle': 'आपली पसंतीची भाषा निवडा',
    // 'listening': 'ऐकत आहे...', // Removed
    'generating': 'प्रतिसाद तयार करत आहे...',
    'copySuccess': 'कॉपी केले!',
    'gamifyUnderDevelopment': 'हे वैशिष्ट्य विकासाधीन आहे. ते पूर्ण झाल्यावर तुम्हाला सूचित केले जाईल. गेमिफाय कोणत्याही धड्यातून किंवा विषयातून साधे, मजकूर-आधारित गेम तयार करण्यास मदत करते.',
    'artifyUnderDevelopment': 'हे वैशिष्ट्य विकासाधीन आहे. ते पूर्ण झाल्यावर तुम्हाला सूचित केले जाईल. आर्टिफाय तुमच्या वर्णनांवरून रेषाचित्रे किंवा आलेखांसाठी सोप्या सूचना तयार करण्यास मदत करते.',
    'adaptifyUnderDevelopment': 'हे वैशिष्ट्य विकासाधीन आहे. ते पूर्ण झाल्यावर तुम्हाला सूचित केले जाईल. अ‍ॅडॅप्टिफाय विविध ग्रेड स्तरांसाठी भिन्न सामग्री तयार करण्यासाठी सामग्री (उदा. पाठ्यपुस्तक पृष्ठाचा फोटो) अपलोड करण्यास मदत करेल.',
    'lensAIUnderDevelopment': 'हे वैशिष्ट्य विकासाधीन आहे. ते पूर्ण झाल्यावर तुम्हाला सूचित केले जाईल. लेन्सएआय तुम्हाला आकडेवारी किंवा तक्त्यांच्या घटकांचे आणि संकल्पनांचे AI-आधारित स्पष्टीकरण मिळवण्यासाठी ते अपलोड करण्यास मदत करेल।',
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
    'askAITitle': 'આસ્કએઆઈ', // Renamed
    'askAIPlaceholder': "તમારી ક્વેરી દાખલ કરો (દા.ત. 'ભારતની મુખ્ય નદીઓ કઈ છે?', 'ઇંગ્લેન્ડમાં ક્રિકેટનો ઇતિહાસ કહો.').", // Renamed
    'storyfyTitle': 'વાર્તા બનાવો',
    'storyfyPlaceholder': "'વાર્તા બનાવો' કરવા માટે ખ્યાલ અથવા પ્રશ્ન દાખલ કરો (દા.ત. 'પ્રકાશસંશ્લેષણ સમજાવો', 'તારાઓ કેમ ચમકે છે?').",
    'explainifyTitle': 'એક્સપ્લેનિફાય', // Renamed
    'explainifyPlaceholder': "વિદ્યાર્થી પ્રશ્ન પૂછો (દા.ત. 'આકાશ વાદળી કેમ છે?', 'વીજળી શું છે?').", // Renamed
    'gamifyTitle': 'ગેમિફાય (વિકાસ હેઠળ)',
    'artifyTitle': 'આર્ટિફાય (વિકાસ હેઠળ)',
    'adaptifyTitle': 'અડેપ્ટીફાય (વિકાસ હેઠળ)',
    'lensAITitle': 'લેન્સએઆઈ (વિકાસ હેઠળ)',
    'generateButton': 'ઉત્પન્ન કરો',
    'clearButton': 'સાફ કરો',
    'backButton': 'હોમ પર પાછા જાઓ',
    'aiResponseHeading': 'AI પ્રતિભાવ:',
    'signInMessage': 'સુવિધાઓનો ઉપયોગ કરવા માટે કૃપા કરીને સાઇન ઇન કરો.',
    // 'listening': 'સાંભળી રહ્યા છીએ...', // Removed
    'chooseLanguageTitle': 'તમારી પસંદગીની ભાષા પસંદ કરો',
    // 'listening': 'સાંભળી રહ્યા છીએ...', // Removed
    'generating': 'પ્રતિભાવ જનરેટ કરી રહ્યું છે...',
    'copySuccess': 'કૉપિ કર્યું!',
    'gamifyUnderDevelopment': 'આ સુવિધા વિકાસ હેઠળ છે. તે પૂર્ણ થયા પછી તમને સૂચિત કરવામાં આવશે. ગેમિફાય કોઈપણ પાઠ અથવા વિષયમાંથી સરળ, ટેક્સ્ટ-આધારિત રમતો બનાવવામાં મદદ કરે છે.',
    'artifyUnderDevelopment': 'આ સુવિધા વિકાસ હેઠળ છે. તે પૂર્ણ થયા પછી તમને સૂચિત કરવામાં આવશે. આર્ટિફાય તમારા વર્ણનોમાંથી રેખાંકનો અથવા ચાર્ટ્સ માટે સરળ સૂચનાઓ બનાવવામાં મદદ કરે છે.',
    'adaptifyUnderDevelopment': 'આ સુવિધા વિકાસ હેઠળ છે. તે પૂર્ણ થયા પછી તમને સૂચિત કરવામાં આવશે. અડેપ્ટીફાય વિવિધ ગ્રેડ સ્તરો માટે ભિન્ન સામગ્રી બનાવવા માટે સામગ્રી (દા.ત., પાઠ્યપુસ્તક પૃષ્ઠનો ફોટો) અપલોડ કરવામાં મદદ કરશે.',
    'lensAIUnderDevelopment': 'આ સુવિધા વિકાસ હેઠળ છે. તે પૂર્ણ થયા પછી તમને સૂચિત કરવામાં આવશે. લેન્સએઆઈ તમને રેખાકૃતિઓ અથવા ચાર્ટ્સ અપલોડ કરવામાં મદદ કરશે, તેમના ઘટકો અને ખ્યાલોના AI-સંચાલિત સ્પષ્ટતા માટે।',
  },
  'પੰਜਾਬੀ': {
    'appTitle': 'ਸਹായਕ ਪੀਡਬਲਿਊਏ',
    'homeButton': 'ਹੋਮ',
    'setupLanguage': 'ਭਾਸ਼ਾ ਸੈਟ ਕਰੋ',
    'selectLanguage': 'ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ:',
    'saveButton': 'ਸੇਵ ਕਰੋ',
    'welcomeMessage': 'ਸਹਾਇਕ ਪੀਡਬਲਿਊਏ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ! ਕਿਰਪਾ ਕਰਕੇ ਸਾਈਨ ਇਨ ਕਰੋ।',
    'signInButton': 'ਗੂਗਲ ਨਾਲ ਸਾਈਨ ਇਨ ਕਰੋ',
    'signOutButton': 'ਸਾਈਨ ਆਉਟ ਕਰੋ',
    'dashboardTitle': 'ਅੱਜ ਤੁਸੀਂ ਕੀ ਕਰਨਾ ਚਾਹੋਗੇ?',
    'askAITitle': 'ਆਸਕਏਆਈ', // Renamed
    'askAIPlaceholder': "ਆਪਣੀ ਪ੍ਰਸ਼ਨ ਦਰਜ ਕਰੋ (ਉਦਾਹਰਨ ਲਈ, 'ਭਾਰਤ ਦੀਆਂ ਮੁੱਖ ਨਦੀਆਂ ਕਿਹੜੀਆਂ ਹਨ?', 'ਇੰਗਲੈਂਡ ਵਿੱਚ ਕ੍ਰਿਕਟ ਦਾ ਇਤਿਹਾਸ ਦੱਸੋ।').", // Renamed
    'storyfyTitle': 'ਕਹਾਣੀ ਬਣਾਓ',
    'storyfyPlaceholder': "ਕਹਾਣੀ ਬਣਾਉਣ ਲਈ ਇੱਕ ਸੰਕਲਪ ਜਾਂ ਪ੍ਰਸ਼ਨ ਦਰਜ ਕਰੋ (ਉਦਾਹਰਨ ਲਈ, 'ਪ੍ਰਕਾਸ਼ ਸੰਸ਼ਲੇਸ਼ਣ ਬਾਰੇ ਦੱਸੋ', 'ਤਾਰੇ ਕਿਉਂ ਚਮਕਦੇ ਹਨ?').",
    'explainifyTitle': 'ਐਕਸਪਲੇਨੀਫਾਈ', // Renamed
    'explainifyPlaceholder': "ਸਵਾਲ ਪੁੱਛੋ (ਉਦਾਹਰਨ ਲਈ, 'ਅਕਾਸ਼ ਨੀਲਾ ਕਿਉਂ ਹੈ?', 'ਬਿਜਲੀ ਕੀ ਹੈ?').", // Renamed
    'gamifyTitle': 'ਗੇਮੀਫਾਈ (ਵਿਕਾਸ ਅਧੀਨ)',
    'artifyTitle': 'ਆਰਟੀਫਾਈ (ਵਿਕਾਸ ਅਧੀਨ)',
    'adaptifyTitle': 'ਅਡੈਪਟੀਫਾਈ (ਵਿਕਾਸ ਅਧੀਨ)',
    'lensAITitle': 'ਲੈਂਸਏਆਈ (ਵਿਕਾਸ ਅਧੀਨ)',
    'generateButton': 'ਤਿਆਰ ਕਰੋ',
    'clearButton': 'ਸਾਫ਼ ਕਰੋ',
    'backButton': 'ਘਰ ਵਾਪਸ ਜਾਓ',
    'aiResponseHeading': 'AI ਜਵਾਬ:',
    'signInMessage': 'ਸਹਾਇਕ ਦੀ ਵਰਤੋਂ ਕਰਨ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਸਾਈਨ ਇਨ ਕਰੋ।',
    // 'listening': 'ਸੁਣ ਰਿਹਾ ਹੈ...', // Removed
    'chooseLanguageTitle': 'ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ',
    // 'listening': 'ਸੁਣ ਰਿਹਾ ਹੈ...', // Removed
    'generating': 'ਜਵਾਬ ਬਣਾ ਰਿਹਾ ਹੈ...',
    'copySuccess': 'ਕਾਪੀ ਕੀਤਾ ਗਿਆ!',
    'gamifyUnderDevelopment': 'ਇਹ ਫੀਚਰ ਵਿਕਾਸ ਅਧੀਨ ਹੈ। ਤੁਹਾਨੂੰ ਪੂਰਾ ਹੋਣ \'ਤੇ ਸੂਚਿਤ ਕੀਤਾ ਜਾਵੇਗਾ। ਗੇਮੀਫਾਈ ਕਿਸੇ ਵੀ ਪਾਠ ਜਾਂ ਵਿਸ਼ੇ ਤੋਂ ਸਰਲ, ਟੈਕਸਟ-ਅਧਾਰਤ ਗੇਮਾਂ ਬਣਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।',
    'artifyUnderDevelopment': 'ਇਹ ਫੀਚਰ ਵਿਕਾਸ ਅਧੀਨ ਹੈ। ਤੁਹਾਨੂੰ ਪੂਰਾ ਹੋਣ \'ਤੇ ਸੂਚਿਤ ਕੀਤਾ ਜਾਵੇਗਾ। ਆਰਟੀਫਾਈ ਤੁਹਾਡੇ ਵਰਣਨਾਂ ਤੋਂ ਲਾਈਨ ਡਰਾਇੰਗਾਂ ਜਾਂ ਚਾਰਟਾਂ ਲਈ ਸਧਾਰਨ ਨਿਰਦੇਸ਼ ਤਿਆਰ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।',
    'adaptifyUnderDevelopment': 'ਇਹ ਫੀਚਰ ਵਿਕਾਸ ਅਧੀਨ ਹੈ। ਤੁਹਾਨੂੰ ਪੂਰਾ ਹੋਣ \'ਤੇ ਸੂਚਿਤ ਕੀਤਾ ਜਾਵੇਗਾ। ਅਡੈਪਟੀਫਾਈ ਵੱਖ-ਵੱਖ ਗ੍ਰੇਡ ਪੱਧਰਾਂ ਲਈ ਵੱਖਰੀ ਸਮੱਗਰੀ ਤਿਆਰ ਕਰਨ ਲਈ ਸਮੱਗਰੀ (ਜਿਵੇਂ ਕਿ ਪਾਠ ਪੁਸਤਕ ਪੰਨੇ ਦੀ ਫੋਟੋ) ਅੱਪਲੋਡ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰੇਗਾ।',
    'lensAIUnderDevelopment': 'ਇਹ ਫੀਚਰ ਵਿਕਾਸ ਅਧੀਨ ਹੈ। ਤੁਹਾਨੂੰ ਪੂਰਾ ਹੋਣ \'ਤੇ ਸੂਚਿਤ ਕੀਤਾ ਜਾਵੇਗਾ। ਲੈਂਸਏਆਈ ਤੁਹਾਨੂੰ AI-ਸੰਚਾਲਿਤ ਵਿਆਖਿਆਵਾਂ ਲਈ ਡਾਇਗ੍ਰਾਮ ਜਾਂ ਚਾਰਟ ਅੱਪਲੋਡ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰੇਗਾ।',
  }
};

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

  // Removed speech recognition states
  // const [isListening, setIsListening] = useState(false);
  // const recognitionRef = useRef(null);

  // Derived state for current view texts and feature translations
  const currentViewTexts = viewContentTranslations[selectedLanguage] || viewContentTranslations['English'];

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
      return;
    }
    setLoading(true);
    setAiResponse(''); // Clear response at the start of new generation
    // Removed speechSynthesis.cancel()

    let finalPrompt = prompt;

    // UPDATED: Handle new features as "under development"
    if (['gamify', 'artify', 'adaptify', 'lensAI'].includes(currentView)) {
      setAiResponse(currentViewTexts[`${currentView}UnderDevelopment`]);
      setLoading(false);
      return;
    }

    // UPDATED: Renamed case 'askMeAnything' to 'askAI' and 'instantKnowledgeBase' to 'explainify'
    switch (currentView) {
      case 'askAI': // Renamed
        finalPrompt = `As a helpful teaching assistant from India, respond to the following request. If a specific country is mentioned, adjust context accordingly, otherwise, keep an Indian context: ${prompt}`;
        break;
      case 'storyfy':
        finalPrompt = `Turn the following concept or question into a simple, understandable, engaging story for elementary school children in India: "${prompt}"`;
        break;
      case 'explainify': // Renamed
        finalPrompt = `You are explaining concepts to a young child (age 6-10). Explain the following concept or question very simply, accurately, and clearly. Your explanation should be **very brief** (1-3 short sentences/paragraphs). Crucially, include **only one, very clear, and highly relatable analogy** that a child would immediately understand (e.g., for electricity, "like water flowing in pipes"). Do NOT use complex words or multiple analogies. Explain this concept in ${selectedLanguage}: "${prompt}"`;
        break;
      default:
        alert("Please select an option from the home screen.");
        setLoading(false);
        return;
    }

    // Only add language prefix if not Explainify and not English
    if (currentView !== 'explainify' && selectedLanguage !== 'English') {
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
    // Removed speechSynthesis.cancel()
  };

  // Handles manual text input changing the prompt
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  // Removed Voice input functionality
  // const handleVoiceInput = () => { ... }

  // Removed Voice output functionality
  // const handleSpeakResponse = (text) => { ... }


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
                  {featureCards.map((card) => {
                    const currentLanguageFeatures = featureTranslations[selectedLanguage] || featureTranslations['English'];
                    const featureData = currentLanguageFeatures[card.id];

                    // Determine icon based on feature ID
                    let icon = '✨'; // Default icon
                    switch (card.id) {
                      case 'askAI': icon = '💬'; break; // Renamed
                      case 'storyfy': icon = '📚'; break;
                      case 'explainify': icon = '💡'; break; // Renamed
                      case 'gamify': icon = '🎲'; break;
                      case 'artify': icon = '🎨'; break;
                      case 'adaptify': icon = '🧠'; break;
                      case 'lensAI': icon = '👁️'; break;
                      default: icon = '✨';
                    }

                    return (
                      <button
                        key={card.id}
                        onClick={() => setCurrentView(card.id)}
                        className="feature-card"
                      >
                        <span className="feature-card-icon">{icon}</span>
                        {/* Use featureData.name and featureData.description to display content */}
                        <h3>{featureData?.name || card.id}</h3>
                        <p>{featureData?.description || 'Description not available.'}</p>
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
                {['gamify', 'artify', 'adaptify', 'lensAI'].includes(currentView) ? (
                  <div className="under-development-message">
                    <p>{currentViewTexts[`${currentView}UnderDevelopment`]}</p>
                  </div>
                ) : (
                  <>
                    <div className="input-field-container"> {/* Renamed class from input-with-voice-button */}
                      <textarea
                        className="text-input"
                        placeholder={
                          currentView === 'askAI' // Renamed
                            ? currentViewTexts.askAIPlaceholder // Renamed
                            : currentView === 'storyfy'
                              ? currentViewTexts.storyfyPlaceholder
                              : currentView === 'explainify' // Renamed
                                ? currentViewTexts.explainifyPlaceholder // Renamed
                                : ''
                        }
                        value={prompt}
                        onChange={handlePromptChange}
                        disabled={loading}
                      ></textarea>
                      {/* Removed voice input button */}
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
                           {/* Removed speak button */}
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
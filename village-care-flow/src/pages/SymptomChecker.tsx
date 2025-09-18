import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Activity,
  AlertTriangle,
  CheckCircle,
  Phone,
  Camera,
  FileText,
  Bot,
  Mic,
  MicOff,
  Languages,
  Wifi,
  WifiOff,
  Upload,
  Download,
  RefreshCw,
  Shield
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  type: "single" | "multiple";
}

const SymptomChecker = () => {
  const { t, currentLanguage, setLanguage, speak } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: currentLanguage === 'hi' ? "आज आपकी मुख्य स्वास्थ्य चिंता क्या है?" : 
                currentLanguage === 'pa' ? "ਅੱਜ ਤੁਹਾਡੀ ਮੁੱਖ ਸਿਹਤ ਦੀ ਚਿੰਤਾ ਕੀ ਹੈ?" :
                "What is your main health concern today?",
      options: currentLanguage === 'hi' ? ["बुखार", "सिरदर्द", "पेट दर्द", "खांसी", "शरीर दर्द", "त्वचा की समस्या"] :
               currentLanguage === 'pa' ? ["ਬੁਖਾਰ", "ਸਿਰ ਦਰਦ", "ਪੇਟ ਦਰਦ", "ਖੰਘ", "ਸਰੀਰ ਦਰਦ", "ਚਮੜੀ ਦੀ ਸਮੱਸਿਆ"] :
               ["Fever", "Headache", "Stomach pain", "Cough", "Body ache", "Skin problem"],
      type: "single"
    },
    {
      id: 2,
      question: currentLanguage === 'hi' ? "आप इस लक्षण को कितने समय से अनुभव कर रहे हैं?" :
                currentLanguage === 'pa' ? "ਤੁਸੀਂ ਇਸ ਲੱਛਣ ਨੂੰ ਕਿੰਨੇ ਸਮੇਂ ਤੋਂ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ?" :
                "How long have you been experiencing this symptom?",
      options: currentLanguage === 'hi' ? ["1 दिन से कम", "1-3 दिन", "4-7 दिन", "1 सप्ताह से अधिक"] :
               currentLanguage === 'pa' ? ["1 ਦਿਨ ਤੋਂ ਘੱਟ", "1-3 ਦਿਨ", "4-7 ਦਿਨ", "1 ਹਫ਼ਤੇ ਤੋਂ ਵੱਧ"] :
               ["Less than 1 day", "1-3 days", "4-7 days", "More than 1 week"],
      type: "single"
    },
    {
      id: 3,
      question: currentLanguage === 'hi' ? "आपके लक्षण कितने गंभीर हैं?" :
                currentLanguage === 'pa' ? "ਤੁਹਾਡੇ ਲੱਛਣ ਕਿੰਨੇ ਗੰਭੀਰ ਹਨ?" :
                "How severe is your symptom?",
      options: currentLanguage === 'hi' ? ["हल्का (दैनिक गतिविधियों में बाधा नहीं)", "मध्यम (गतिविधियों में कुछ कठिनाई)", "गंभीर (सामान्य गतिविधियां नहीं कर सकते)"] :
               currentLanguage === 'pa' ? ["ਹਲਕਾ (ਰੋਜ਼ਾਨਾ ਗਤੀਵਿਧੀਆਂ ਵਿੱਚ ਰੁਕਾਵਟ ਨਹੀਂ)", "ਦਰਮਿਆਨਾ (ਗਤੀਵਿਧੀਆਂ ਵਿੱਚ ਕੁਝ ਮੁਸ਼ਕਲ)", "ਗੰਭੀਰ (ਸਾਧਾਰਣ ਗਤੀਵਿਧੀਆਂ ਨਹੀਂ ਕਰ ਸਕਦੇ)"] :
               ["Mild (doesn't interfere with daily activities)", "Moderate (some difficulty with activities)", "Severe (unable to do normal activities)"],
      type: "single"
    },
    {
      id: 4,
      question: currentLanguage === 'hi' ? "क्या आपके पास इनमें से कोई अतिरिक्त लक्षण हैं?" :
                currentLanguage === 'pa' ? "ਕੀ ਤੁਹਾਡੇ ਕੋਲ ਇਨ੍ਹਾਂ ਵਿੱਚੋਂ ਕੋਈ ਵਾਧੂ ਲੱਛਣ ਹਨ?" :
                "Do you have any of these additional symptoms?",
      options: currentLanguage === 'hi' ? ["मतली/उल्टी", "चक्कर आना", "भूख न लगना", "नींद में कठिनाई", "इनमें से कोई नहीं"] :
               currentLanguage === 'pa' ? ["ਮਤਲੀ/ਉਲਟੀ", "ਚੱਕਰ ਆਉਣਾ", "ਭੁੱਖ ਨਾ ਲੱਗਣੀ", "ਨੀਂਦ ਵਿੱਚ ਮੁਸ਼ਕਲ", "ਇਨ੍ਹਾਂ ਵਿੱਚੋਂ ਕੋਈ ਨਹੀਂ"] :
               ["Nausea/Vomiting", "Dizziness", "Loss of appetite", "Difficulty sleeping", "None of these"],
      type: "multiple"
    }
  ];

  const handleAnswer = (questionId: number, option: string, isMultiple: boolean) => {
    if (isMultiple) {
      const currentAnswers = answers[questionId] || [];
      const newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter(a => a !== option)
        : [...currentAnswers, option];
      setAnswers({ ...answers, [questionId]: newAnswers });
    } else {
      setAnswers({ ...answers, [questionId]: [option] });
    }
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getRecommendation = () => {
    const mainSymptom = answers[1]?.[0];
    const severity = answers[3]?.[0];
    
    if (severity === "Severe (unable to do normal activities)") {
      return {
        level: "urgent",
        title: "Immediate Medical Attention Recommended",
        description: "Based on your symptoms, we recommend you consult with a doctor immediately.",
        action: "Book Emergency Consultation",
        color: "destructive"
      };
    } else if (severity === "Moderate (some difficulty with activities)") {
      return {
        level: "moderate",
        title: "Medical Consultation Recommended",
        description: "Your symptoms suggest you should see a doctor within the next day or two.",
        action: "Book Consultation",
        color: "warning"
      };
    } else {
      return {
        level: "mild",
        title: "Home Care with Monitoring",
        description: "Your symptoms are mild. Try home remedies and monitor for changes.",
        action: "View Home Remedies", 
        color: "accent"
      };
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];
  const currentAnswers = answers[currentQuestion?.id] || [];
  const canProceed = currentAnswers.length > 0;

  if (showResults) {
    const recommendation = getRecommendation();
    
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="shadow-elevated">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Symptom Assessment Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={`p-6 rounded-lg border-l-4 ${
                recommendation.color === "destructive" ? "border-destructive bg-destructive/10" :
                recommendation.color === "warning" ? "border-warning bg-warning/10" :
                "border-accent bg-accent/10"
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  {recommendation.level === "urgent" ? (
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  ) : recommendation.level === "moderate" ? (
                    <Activity className="h-6 w-6 text-warning" />
                  ) : (
                    <CheckCircle className="h-6 w-6 text-accent" />
                  )}
                  <h3 className="text-xl font-semibold">{recommendation.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{recommendation.description}</p>
                
                {recommendation.level === "urgent" && (
                  <div className="bg-destructive text-destructive-foreground p-4 rounded-lg mb-4">
                    <div className="font-semibold mb-2">Warning Signs Present</div>
                    <div className="text-sm">If this is a medical emergency, call 108 immediately or go to the nearest hospital.</div>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {recommendation.level !== "mild" && (
                  <Link to="/book-appointment">
                    <Button size="lg" className="w-full">
                      <Phone className="h-5 w-5 mr-2" />
                      Book Video Consultation
                    </Button>
                  </Link>
                )}
                
                <Button variant="outline" size="lg" className="w-full">
                  <Camera className="h-5 w-5 mr-2" />
                  Upload Photo (Optional)
                </Button>
                
                <Button variant="outline" size="lg" className="w-full">
                  <FileText className="h-5 w-5 mr-2" />
                  Save to Health Records
                </Button>
                
                <Link to="/dashboard">
                  <Button variant="secondary" size="lg" className="w-full">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>

              {recommendation.level === "mild" && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Home Care Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Rest and adequate sleep</li>
                      <li>• Stay hydrated with water and fluids</li>
                      <li>• Monitor temperature if feverish</li>
                      <li>• Avoid strenuous activities</li>
                      <li>• Seek medical attention if symptoms worsen</li>
                    </ul>
                  </CardContent>
                </Card>
              )}

              <div className="text-center text-sm text-muted-foreground mt-6">
                This assessment is for informational purposes only and should not replace professional medical advice.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      
      {/* Status Bar */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {isOnline ? (
                  <Wifi className="h-4 w-4 text-green-600" />
                ) : (
                  <WifiOff className="h-4 w-4 text-orange-600" />
                )}
                <span className="text-sm text-muted-foreground">
                  {isOnline ? 'Online' : 'Offline Mode'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Secure Assessment</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Languages className="h-4 w-4" />
              <select 
                value={currentLanguage} 
                onChange={(e) => setLanguage(e.target.value)}
                className="px-2 py-1 border rounded text-sm bg-background"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="pa">ਪੰਜਾਬੀ</option>
              </select>
              <Button
                variant={isVoiceEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
              >
                {isVoiceEnabled ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {currentLanguage === 'hi' ? 'डैशबोर्ड पर वापस जाएं' : 
             currentLanguage === 'pa' ? 'ਡੈਸ਼ਬੋਰਡ ਤੇ ਵਾਪਸ ਜਾਓ' : 
             'Back to Dashboard'}
          </Link>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bot className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t('symptom.title')}
              </h1>
              <p className="text-muted-foreground">
                {t('symptom.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                {currentLanguage === 'hi' ? 'प्रगति' : 
                 currentLanguage === 'pa' ? 'ਤਰੱਕੀ' : 'Progress'}
              </span>
              <span className="text-sm text-muted-foreground">
                {currentStep + 1} {currentLanguage === 'hi' ? 'का' : 
                                  currentLanguage === 'pa' ? 'ਦਾ' : 'of'} {questions.length}
              </span>
            </div>
            <Progress value={progress} className="w-full" />
          </CardContent>
        </Card>

        {/* Question */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>
                {currentLanguage === 'hi' ? 'प्रश्न' : 
                 currentLanguage === 'pa' ? 'ਸਵਾਲ' : 'Question'} {currentStep + 1}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <h2 className="text-xl font-medium">{currentQuestion.question}</h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = currentAnswers.includes(option);
                return (
                  <Button
                    key={index}
                    variant={isSelected ? "default" : "outline"}
                    className={`w-full text-left justify-start h-auto p-4 transition-all ${
                      isSelected ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"
                    }`}
                    onClick={() => handleAnswer(currentQuestion.id, option, currentQuestion.type === "multiple")}
                  >
                    <div className="text-wrap">{option}</div>
                  </Button>
                );
              })}
            </div>

            {currentQuestion.type === "multiple" && (
              <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                {currentLanguage === 'hi' ? 'आप अपने लिए लागू होने वाले कई विकल्पों का चयन कर सकते हैं।' :
                 currentLanguage === 'pa' ? 'ਤੁਸੀਂ ਆਪਣੇ ਲਈ ਲਾਗੂ ਹੋਣ ਵਾਲੇ ਕਈ ਵਿਕਲਪਾਂ ਦਾ ਚੋਣ ਕਰ ਸਕਦੇ ਹੋ।' :
                 'You can select multiple options that apply to you.'}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {currentLanguage === 'hi' ? 'पिछला' : 
                 currentLanguage === 'pa' ? 'ਪਿਛਲਾ' : 'Previous'}
              </Button>
              
              <Button
                onClick={nextStep}
                disabled={!canProceed}
                className="px-6"
              >
                {currentStep === questions.length - 1 ? 
                  (currentLanguage === 'hi' ? 'परिणाम प्राप्त करें' : 
                   currentLanguage === 'pa' ? 'ਨਤੀਜੇ ਪ੍ਰਾਪਤ ਕਰੋ' : 'Get Results') : 
                  (currentLanguage === 'hi' ? 'अगला' : 
                   currentLanguage === 'pa' ? 'ਅਗਲਾ' : 'Next')}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="hover:shadow-elevated transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-medium text-sm">
                {currentLanguage === 'hi' ? 'डॉक्टर से बात करें' : 
                 currentLanguage === 'pa' ? 'ਡਾਕਟਰ ਨਾਲ ਗੱਲ ਕਰੋ' : 'Talk to Doctor'}
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-elevated transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="font-medium text-sm">
                {currentLanguage === 'hi' ? 'स्वास्थ्य रिकॉर्ड देखें' : 
                 currentLanguage === 'pa' ? 'ਸਿਹਤ ਰਿਕਾਰਡ ਵੇਖੋ' : 'View Health Records'}
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-elevated transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Camera className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="font-medium text-sm">
                {currentLanguage === 'hi' ? 'छवि अपलोड करें' : 
                 currentLanguage === 'pa' ? 'ਚਿੱਤਰ ਅਪਲੋਡ ਕਰੋ' : 'Upload Image'}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground bg-muted p-4 rounded-lg">
          <AlertTriangle className="h-4 w-4 inline mr-2" />
          {currentLanguage === 'hi' ? 'यह उपकरण केवल सामान्य मार्गदर्शन प्रदान करता है। आपातकाल के लिए, तुरंत 108 पर कॉल करें।' :
           currentLanguage === 'pa' ? 'ਇਹ ਟੂਲ ਸਿਰਫ਼ ਆਮ ਗਾਈਡੈਂਸ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ। ਜ਼ਰੂਰੀ ਸਥਿਤੀ ਲਈ, ਤੁਰੰਤ 108 ਤੇ ਕਾਲ ਕਰੋ।' :
           'This tool provides general guidance only. For emergencies, call 108 immediately.'}
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
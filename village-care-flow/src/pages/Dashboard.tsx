
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Stethoscope,
  Pill,
  FileText,
  MapPin,
  Calendar,
  Bell,
  Activity,
  Heart,
  User,
  Phone,
  Video,
  Clock,
  CheckCircle,
  AlertTriangle,
  Languages,
  Mic,
  Wifi,
  WifiOff,
  Shield,
  Download,
  Upload,
  RefreshCw
} from "lucide-react";

const Dashboard = () => {
  const { t, currentLanguage, setLanguage, speak } = useLanguage();
  const [isOnline, setIsOnline] = useState(true);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Rajesh Kumar',
      specialty: 'General Medicine',
      date: 'Today',
      time: '2:00 PM',
      type: 'Video Call',
      status: 'confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. Priya Sharma',
      specialty: 'Pediatrics',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'Audio Call',
      status: 'pending'
    }
  ];

  const recentMedications = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      dosage: '1 tablet, 3 times daily',
      nextDose: '2:00 PM',
      status: 'due',
      icon: '💊'
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      dosage: '1 capsule, twice daily',
      nextDose: '8:00 PM',
      status: 'taken',
      icon: '🧴'
    }
  ];

  const healthMetrics = [
    { label: 'Blood Pressure', value: '120/80', status: 'normal', icon: Activity, color: 'text-green-600' },
    { label: 'Heart Rate', value: '72 bpm', status: 'normal', icon: Heart, color: 'text-blue-600' },
    { label: 'Weight', value: '65 kg', status: 'stable', icon: User, color: 'text-purple-600' },
    { label: 'Blood Sugar', value: '95 mg/dL', status: 'normal', icon: Activity, color: 'text-orange-600' }
  ];

  const quickActions = [
    {
      title: t('nav.consultations'),
      description: 'Book a video or audio consultation',
      icon: Stethoscope,
      link: '/book-appointment',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: t('nav.medications'),
      description: 'View and manage medications',
      icon: Pill,
      link: '/medications',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: t('nav.records'),
      description: 'Access medical history and reports',
      icon: FileText,
      link: '/health-records',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: t('nav.pharmacies'),
      description: 'Locate nearby healthcare facilities',
      icon: MapPin,
      link: '/healthcare-map',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

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
                <span className="text-sm text-muted-foreground">Data Encrypted</span>
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
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-lg font-semibold">RS</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {t('dashboard.welcome')}
              </h1>
              <p className="text-muted-foreground">
                Rajesh Singh • Health ID: 1234-5678-9012
              </p>
              <p className="text-sm text-muted-foreground">
                Village: Bhadson, District: Nabha, Punjab
              </p>
            </div>
          </div>
        </div>

        {/* Quick Access Tiles */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <Card className={`hover:shadow-elevated transition-all duration-200 cursor-pointer border-2 hover:border-primary/20 ${action.bgColor}`}>
                  <CardContent className="p-6 text-center space-y-3">
                    <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${action.bgColor}`}>
                      <action.icon className={`h-6 w-6 ${action.color}`} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{action.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {action.description}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>{t('dashboard.upcoming_appointment')}</span>
                </div>
                <Badge variant="secondary">2</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border-l-4 border-primary pl-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{appointment.doctor}</div>
                    <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">{appointment.specialty}</div>
                  <div className="flex items-center space-x-2 text-xs">
                    <Clock className="h-3 w-3" />
                    <span>{appointment.date} • {appointment.time}</span>
                    {appointment.type.includes('Video') ? (
                      <Video className="h-3 w-3 text-blue-600" />
                    ) : (
                      <Phone className="h-3 w-3 text-green-600" />
                    )}
                  </div>
                </div>
              ))}
              <Link to="/book-appointment">
                <Button variant="outline" className="w-full">
                  Book New Appointment
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Health Metrics */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Health Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {healthMetrics.map((metric, index) => (
                  <div key={index} className="text-center p-3 bg-muted rounded-lg">
                    <metric.icon className={`h-6 w-6 mx-auto mb-2 ${metric.color}`} />
                    <div className="text-lg font-semibold">{metric.value}</div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {metric.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Update Metrics
              </Button>
            </CardContent>
          </Card>

          {/* Medicine Reminders */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Pill className="h-5 w-5 text-primary" />
                <span>Medicine Reminders</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentMedications.map((med) => (
                <div key={med.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="text-2xl">{med.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{med.name}</div>
                    <div className="text-xs text-muted-foreground">{med.dosage}</div>
                    <div className="text-xs text-muted-foreground">
                      Next: {med.nextDose}
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant={med.status === 'due' ? 'default' : 'outline'}
                    className="text-xs"
                  >
                    {med.status === 'due' ? 'Mark Taken' : <CheckCircle className="h-3 w-3" />}
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Manage Medicines
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Services */}
        <Card className="mt-8 bg-gradient-primary text-primary-foreground shadow-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Heart className="h-10 w-10" />
                <div>
                  <div className="text-xl font-semibold">Emergency Services</div>
                  <div className="text-primary-foreground/80">
                    For urgent medical assistance, call emergency services
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="secondary" size="lg">
                  Call 108
                </Button>
                <Button variant="outline" size="lg" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Nearest Hospital
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
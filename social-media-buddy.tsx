import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { User, Lock, Mail, ArrowRight, Clock, Target, Heart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

const usageData = [
  { day: 'Day 1', socialMedia: 4.5, hobbies: 0.5 },
  { day: 'Day 2', socialMedia: 4.2, hobbies: 0.8 },
  { day: 'Day 3', socialMedia: 3.8, hobbies: 1.2 },
  { day: 'Day 4', socialMedia: 3.5, hobbies: 1.5 },
  { day: 'Day 5', socialMedia: 3.2, hobbies: 1.8 },
  { day: 'Day 6', socialMedia: 2.8, hobbies: 2.2 },
  { day: 'Day 7', socialMedia: 2.5, hobbies: 2.5 },
];

const hobbyApps = {
  Reading: [
    { name: 'Goodreads', description: 'Track your reading, find new books' },
    { name: 'Kindle', description: 'Digital reading app' },
    { name: 'Medium', description: 'Articles and blogs' },
  ],
  Exercise: [
    { name: 'Strava', description: 'Track your workouts' },
    { name: 'Nike Training', description: 'Guided workouts' },
    { name: 'MyFitnessPal', description: 'Fitness tracking' },
  ],
  Music: [
    { name: 'GarageBand', description: 'Create your own music' },
    { name: 'Simply Piano', description: 'Learn piano' },
    { name: 'Yousician', description: 'Interactive music lessons' },
  ],
  Art: [
    { name: 'Procreate', description: 'Digital art creation' },
    { name: 'SketchAR', description: 'AR drawing assistant' },
    { name: 'Canva', description: 'Graphic design made easy' },
  ],
};

const AuthInput = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon className="absolute left-3 top-3 text-gray-400" size={20} />
    <Input className="pl-10" {...props} />
  </div>
);

const ProgressStep = ({ step, currentStep }) => (
  <div
    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
      ${step <= currentStep ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
  >
    {step}
  </div>
);

export default function SMBuddy() {
  const [currentView, setCurrentView] = useState('login');
  const [questionStep, setQuestionStep] = useState(1);
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  const renderAuth = () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-purple-600">
          {currentView === 'login' ? 'Welcome Back!' : 'Create Account'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentView === 'signup' && (
          <AuthInput icon={User} type="text" placeholder="Full Name" />
        )}
        <AuthInput icon={Mail} type="email" placeholder="Email" />
        <AuthInput icon={Lock} type="password" placeholder="Password" />
        
        <Button 
          className="w-full"
          onClick={() => setCurrentView('questionnaire')}
        >
          {currentView === 'login' ? 'Log In' : 'Sign Up'}
        </Button>

        <p className="text-center text-gray-600">
          {currentView === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setCurrentView(currentView === 'login' ? 'signup' : 'login')}
            className="text-purple-600 hover:underline"
          >
            {currentView === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </CardContent>
    </Card>
  );

  const renderQuestionnaire = () => (
    <Card className="w-full max-w-2xl">
      <CardContent className="p-6">
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <ProgressStep key={step} step={step} currentStep={questionStep} />
          ))}
        </div>

        {questionStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Social Media Usage</h2>
            {['Instagram', 'Facebook', 'Twitter', 'TikTok'].map((platform) => (
              <div key={platform} className="space-y-2">
                <label className="block text-gray-700">{platform} Daily Usage</label>
                <div className="flex gap-4">
                  <Input type="number" placeholder="Time" />
                  <Select>
                    <option>Hours</option>
                    <option>Minutes</option>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        )}

        {questionStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Goals</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Which app would you like to reduce time on?
                </label>
                <Select className="w-full">
                  {['Instagram', 'Facebook', 'Twitter', 'TikTok'].map(app => (
                    <option key={app}>{app}</option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Target reduction time per day
                </label>
                <div className="flex gap-4">
                  <Input type="number" placeholder="Time" />
                  <Select>
                    <option>Hours</option>
                    <option>Minutes</option>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}

        {questionStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Interests</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(hobbyApps).map((hobby) => (
                <button
                  key={hobby}
                  onClick={() => {
                    setSelectedHobbies(prev => 
                      prev.includes(hobby) 
                        ? prev.filter(h => h !== hobby)
                        : [...prev, hobby]
                    );
                  }}
                  className={`p-4 border rounded-lg transition-colors ${
                    selectedHobbies.includes(hobby)
                      ? 'bg-purple-600 text-white'
                      : 'hover:bg-purple-50'
                  }`}
                >
                  {hobby}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end mt-8">
          <Button
            onClick={() => {
              if (questionStep < 3) {
                setQuestionStep(prev => prev + 1);
              } else {
                setCurrentView('dashboard');
              }
            }}
          >
            {questionStep < 3 ? (
              <>
                Next <ArrowRight className="ml-2" size={20} />
              </>
            ) : (
              'Complete'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderDashboard = () => (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Your Progress Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Usage Trends</h3>
          <div className="w-full h-64">
            <LineChart width={800} height={250} data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="socialMedia"
                stroke="#9f7aea"
                name="Social Media (hours)"
              />
              <Line
                type="monotone"
                dataKey="hobbies"
                stroke="#48bb78"
                name="Hobby Time (hours)"
              />
            </LineChart>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-700">
            Recommended Apps Based on Your Interests
          </h3>
          
          {selectedHobbies.map((hobby) => (
            <div key={hobby} className="border rounded-lg p-6">
              <h4 className="text-lg font-medium text-purple-600 mb-4">{hobby}</h4>
              <div className="grid grid-cols-3 gap-4">
                {hobbyApps[hobby].map((app) => (
                  <div key={app.name} className="p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                      <img
                        src="/api/placeholder/48/48"
                        alt={app.name}
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                    <h5 className="font-medium text-gray-800">{app.name}</h5>
                    <p className="text-sm text-gray-600">{app.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-8">
      {currentView === 'login' || currentView === 'signup' 
        ? renderAuth()
        : currentView === 'questionnaire'
        ? renderQuestionnaire()
        : renderDashboard()}
    </div>
  );
}

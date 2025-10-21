import React from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3, 
  Target, 
  Briefcase,
  ArrowRight,
  Play,
  BookOpen,
  Award,
  Globe,
  Zap,
  Brain
} from 'lucide-react';
import { NavigationState } from '../App';

interface HomePageProps {
  onNavigate: (nav: NavigationState) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const subjects = [
    {
      id: 'operations',
      title: 'Operations Management',
      description: 'Master supply chain, production planning, and operational efficiency through real-world simulations',
      icon: BarChart3,
      color: 'blue',
      concepts: 12,
      simulations: 8,
      duration: '6 weeks',
      level: 'Intermediate'
    },
    {
      id: 'marketing',
      title: 'Marketing Strategy',
      description: 'Learn customer segmentation, brand positioning, and digital marketing through interactive campaigns',
      icon: Target,
      color: 'purple',
      concepts: 15,
      simulations: 10,
      duration: '8 weeks',
      level: 'Beginner'
    },
    {
      id: 'finance',
      title: 'Corporate Finance',
      description: 'Understand financial modeling, investment analysis, and capital structure decisions',
      icon: DollarSign,
      color: 'green',
      concepts: 18,
      simulations: 12,
      duration: '10 weeks',
      level: 'Advanced'
    },
    {
      id: 'trading',
      title: 'Financial Trading',
      description: 'Experience real-time trading scenarios, risk management, and portfolio optimization',
      icon: TrendingUp,
      color: 'orange',
      concepts: 10,
      simulations: 15,
      duration: '4 weeks',
      level: 'Advanced'
    },
    {
      id: 'hr',
      title: 'Human Resources',
      description: 'Practice talent acquisition, performance management, and organizational development',
      icon: Users,
      color: 'pink',
      concepts: 14,
      simulations: 9,
      duration: '7 weeks',
      level: 'Intermediate'
    },
    {
      id: 'strategy',
      title: 'Business Strategy',
      description: 'Develop strategic thinking through competitive analysis and market positioning exercises',
      icon: Briefcase,
      color: 'indigo',
      concepts: 16,
      simulations: 11,
      duration: '9 weeks',
      level: 'Advanced'
    }
  ];

  const stats = [
    { label: 'Active Students', value: '12,500+', icon: Users },
    { label: 'Course Completion', value: '94%', icon: Award },
    { label: 'Global Universities', value: '150+', icon: Globe },
    { label: 'Success Rate', value: '98%', icon: Zap }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
      purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      green: 'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
      orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      pink: 'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700',
      indigo: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
    };
    return colors[color as keyof typeof colors];
  };

  const getLevelColor = (level: string) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-700',
      'Intermediate': 'bg-yellow-100 text-yellow-700',
      'Advanced': 'bg-red-100 text-red-700'
    };
    return colors[level as keyof typeof colors];
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20`}></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <Brain className="h-5 w-5 text-purple-300" />
              <span className="text-purple-100 font-semibold">Next-Generation Business Education</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-black mb-8 leading-tight">
              Master Business Through
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Interactive Learning
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
              Experience real-world business challenges through immersive simulations, expert-led videos, 
              and hands-on practice across all MBA disciplines.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => onNavigate({ page: 'subject', subjectId: 'operations' })}
                className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 hover:scale-105 flex items-center space-x-3"
              >
                <Play className="h-5 w-5" />
                <span>Start Learning Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center space-x-3">
                <BookOpen className="h-5 w-5" />
                <span>Explore Curriculum</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-2">{value}</div>
                <div className="text-slate-600 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-800 mb-6">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Dive deep into specialized MBA subjects with expert-curated content, 
              interactive simulations, and real-world case studies.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {subjects.map(({ id, title, description, icon: Icon, color, concepts, simulations, duration, level }) => (
              <div
                key={id}
                onClick={() => onNavigate({ page: 'subject', subjectId: id })}
                className="group cursor-pointer bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                {/* Header */}
                <div className={`h-40 bg-gradient-to-br ${getColorClasses(color)} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-6 right-6">
                    <ArrowRight className="h-6 w-6 text-white/80 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-6 left-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-slate-700`}>
                      {level}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">{description}</p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">{concepts}</div>
                      <div className="text-xs text-slate-500 font-medium">Concepts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">{simulations}</div>
                      <div className="text-xs text-slate-500 font-medium">Simulations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">{duration}</div>
                      <div className="text-xs text-slate-500 font-medium">Duration</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-sm font-medium">Click to explore</span>
                    <div className="flex items-center space-x-2 text-indigo-600">
                      <Play className="h-4 w-4" />
                      <span className="text-sm font-semibold">Start Course</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-800 mb-6">
              Why Choose MBA Master?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with proven educational methodologies 
              to deliver an unparalleled learning experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Play className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Interactive Simulations</h3>
              <p className="text-slate-600 leading-relaxed">
                Practice real-world business scenarios in a risk-free environment with immediate feedback and detailed analytics.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Expert-Led Content</h3>
              <p className="text-slate-600 leading-relaxed">
                Learn from industry leaders and top MBA professors through high-quality video lectures and case studies.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Personalized Learning</h3>
              <p className="text-slate-600 leading-relaxed">
                Adaptive learning paths that adjust to your pace and learning style for maximum effectiveness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-8">
            Ready to Transform Your Business Knowledge?
          </h2>
          <p className="text-xl text-purple-100 mb-12 leading-relaxed">
            Join thousands of students who have accelerated their careers through our interactive learning platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-5 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 hover:scale-105">
              Start Free Trial
            </button>
            <button className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
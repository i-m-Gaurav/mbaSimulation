import React from 'react';
import { ArrowLeft, Play, BookOpen, Clock, Users, Star, ChevronRight } from 'lucide-react';
import { NavigationState } from '../App';

interface SubjectPageProps {
  subjectId: string;
  onNavigate: (nav: NavigationState) => void;
}

export function SubjectPage({ subjectId, onNavigate }: SubjectPageProps) {
  const subjectData = {
    operations: {
      title: 'Operations Management',
      description: 'Master the art of efficient business operations through comprehensive simulations and real-world case studies.',
      instructor: 'Dr. Sarah Chen',
      rating: 4.9,
      students: 2847,
      duration: '6 weeks',
      concepts: [
        {
          id: 'supply-chain',
          title: 'Supply Chain Management',
          description: 'Learn to optimize supply chains, manage inventory, and coordinate with suppliers through interactive simulations.',
          duration: '45 min',
          videos: 3,
          simulations: ['warehouse', 'factory', 'showroom'],
          difficulty: 'Intermediate'
        },
        {
          id: 'production-planning',
          title: 'Production Planning & Control',
          description: 'Master production scheduling, capacity planning, and quality control systems in manufacturing environments.',
          duration: '38 min',
          videos: 4,
          simulations: ['factory'],
          difficulty: 'Advanced'
        },
        {
          id: 'lean-operations',
          title: 'Lean Operations & Six Sigma',
          description: 'Implement lean principles and Six Sigma methodologies to eliminate waste and improve efficiency.',
          duration: '52 min',
          videos: 5,
          simulations: ['factory'],
          difficulty: 'Advanced'
        },
        {
          id: 'service-operations',
          title: 'Service Operations Management',
          description: 'Optimize service delivery, manage customer queues, and improve service quality in service industries.',
          duration: '41 min',
          videos: 3,
          simulations: ['showroom'],
          difficulty: 'Intermediate'
        }
      ]
    },
    marketing: {
      title: 'Marketing Strategy',
      description: 'Develop comprehensive marketing strategies through interactive campaigns and market analysis.',
      instructor: 'Prof. Michael Rodriguez',
      rating: 4.8,
      students: 3521,
      duration: '8 weeks',
      concepts: [
        {
          id: 'market-segmentation',
          title: 'Market Segmentation & Targeting',
          description: 'Learn to identify and target specific customer segments effectively through data-driven approaches.',
          duration: '42 min',
          videos: 4,
          simulations: ['marketing'],
          difficulty: 'Beginner'
        },
        {
          id: 'brand-positioning',
          title: 'Brand Positioning & Strategy',
          description: 'Create compelling brand positions and develop comprehensive brand architecture strategies.',
          duration: '48 min',
          videos: 5,
          simulations: ['marketing'],
          difficulty: 'Intermediate'
        },
        {
          id: 'digital-marketing',
          title: 'Digital Marketing & Analytics',
          description: 'Master digital channels, social media marketing, and performance analytics for modern businesses.',
          duration: '55 min',
          videos: 6,
          simulations: ['marketing'],
          difficulty: 'Intermediate'
        },
        {
          id: 'consumer-behavior',
          title: 'Consumer Behavior Analysis',
          description: 'Understand psychological factors that influence consumer decisions and purchasing patterns.',
          duration: '44 min',
          videos: 4,
          simulations: ['marketing'],
          difficulty: 'Advanced'
        }
      ]
    },
    finance: {
      title: 'Corporate Finance',
      description: 'Master financial analysis, investment decisions, and capital structure optimization.',
      instructor: 'Dr. Jennifer Walsh',
      rating: 4.9,
      students: 2156,
      duration: '10 weeks',
      concepts: [
        {
          id: 'financial-analysis',
          title: 'Financial Statement Analysis',
          description: 'Learn to analyze income statements, balance sheets, and cash flow statements for business insights.',
          duration: '50 min',
          videos: 5,
          simulations: ['finance'],
          difficulty: 'Intermediate'
        },
        {
          id: 'investment-valuation',
          title: 'Investment Valuation & NPV',
          description: 'Master DCF analysis, NPV calculations, and investment decision-making frameworks.',
          duration: '65 min',
          videos: 6,
          simulations: ['finance'],
          difficulty: 'Advanced'
        },
        {
          id: 'capital-structure',
          title: 'Capital Structure & Financing',
          description: 'Understand optimal capital structure decisions and various financing options for businesses.',
          duration: '58 min',
          videos: 5,
          simulations: ['finance'],
          difficulty: 'Advanced'
        },
        {
          id: 'risk-management',
          title: 'Financial Risk Management',
          description: 'Learn to identify, measure, and manage various types of financial risks in organizations.',
          duration: '47 min',
          videos: 4,
          simulations: ['finance'],
          difficulty: 'Advanced'
        }
      ]
    },
    trading: {
      title: 'Financial Trading',
      description: 'Experience real-time trading scenarios, risk management, and portfolio optimization.',
      instructor: 'Marcus Thompson',
      rating: 4.7,
      students: 1892,
      duration: '4 weeks',
      concepts: [
        {
          id: 'market-fundamentals',
          title: 'Market Fundamentals & Analysis',
          description: 'Understand market mechanics, order types, and fundamental analysis techniques.',
          duration: '35 min',
          videos: 3,
          simulations: ['trading'],
          difficulty: 'Beginner'
        },
        {
          id: 'technical-analysis',
          title: 'Technical Analysis & Charts',
          description: 'Master chart patterns, technical indicators, and trading signals for market timing.',
          duration: '48 min',
          videos: 5,
          simulations: ['trading'],
          difficulty: 'Intermediate'
        },
        {
          id: 'portfolio-management',
          title: 'Portfolio Management & Risk',
          description: 'Learn portfolio construction, diversification strategies, and risk management techniques.',
          duration: '52 min',
          videos: 4,
          simulations: ['trading'],
          difficulty: 'Advanced'
        },
        {
          id: 'derivatives-trading',
          title: 'Options & Derivatives Trading',
          description: 'Understand options, futures, and other derivative instruments for advanced trading strategies.',
          duration: '61 min',
          videos: 6,
          simulations: ['trading'],
          difficulty: 'Advanced'
        }
      ]
    },
    hr: {
      title: 'Human Resources Management',
      description: 'Master talent acquisition, performance management, and organizational development.',
      instructor: 'Dr. Amanda Foster',
      rating: 4.8,
      students: 2634,
      duration: '7 weeks',
      concepts: [
        {
          id: 'talent-acquisition',
          title: 'Talent Acquisition & Recruitment',
          description: 'Learn modern recruitment strategies, interviewing techniques, and candidate assessment methods.',
          duration: '43 min',
          videos: 4,
          simulations: ['hr'],
          difficulty: 'Beginner'
        },
        {
          id: 'performance-management',
          title: 'Performance Management Systems',
          description: 'Design and implement effective performance evaluation and improvement systems.',
          duration: '51 min',
          videos: 5,
          simulations: ['hr'],
          difficulty: 'Intermediate'
        },
        {
          id: 'employee-development',
          title: 'Employee Development & Training',
          description: 'Create comprehensive training programs and career development pathways for employees.',
          duration: '46 min',
          videos: 4,
          simulations: ['hr'],
          difficulty: 'Intermediate'
        },
        {
          id: 'organizational-behavior',
          title: 'Organizational Behavior & Culture',
          description: 'Understand team dynamics, leadership styles, and organizational culture development.',
          duration: '54 min',
          videos: 5,
          simulations: ['hr'],
          difficulty: 'Advanced'
        }
      ]
    },
    strategy: {
      title: 'Business Strategy',
      description: 'Develop strategic thinking through competitive analysis and market positioning exercises.',
      instructor: 'Prof. David Kim',
      rating: 4.9,
      students: 1987,
      duration: '9 weeks',
      concepts: [
        {
          id: 'competitive-analysis',
          title: 'Competitive Analysis & Porter\'s Five Forces',
          description: 'Master industry analysis using Porter\'s framework and competitive intelligence gathering.',
          duration: '49 min',
          videos: 4,
          simulations: ['marketing'],
          difficulty: 'Intermediate'
        },
        {
          id: 'strategic-planning',
          title: 'Strategic Planning & Execution',
          description: 'Learn to develop comprehensive strategic plans and execute them effectively.',
          duration: '56 min',
          videos: 5,
          simulations: ['finance'],
          difficulty: 'Advanced'
        },
        {
          id: 'innovation-strategy',
          title: 'Innovation & Digital Strategy',
          description: 'Understand how to drive innovation and develop digital transformation strategies.',
          duration: '52 min',
          videos: 5,
          simulations: ['marketing'],
          difficulty: 'Advanced'
        },
        {
          id: 'mergers-acquisitions',
          title: 'Mergers & Acquisitions Strategy',
          description: 'Learn M&A evaluation, due diligence processes, and post-merger integration strategies.',
          duration: '63 min',
          videos: 6,
          simulations: ['finance'],
          difficulty: 'Advanced'
        }
      ]
    }
  };

  const subject = subjectData[subjectId as keyof typeof subjectData];

  if (!subject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Subject Not Found</h1>
          <button
            onClick={() => onNavigate({ page: 'home' })}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-700',
      'Intermediate': 'bg-yellow-100 text-yellow-700',
      'Advanced': 'bg-red-100 text-red-700'
    };
    return colors[difficulty as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate({ page: 'home' })}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Subjects</span>
          </button>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-slate-800 mb-4">{subject.title}</h1>
                <p className="text-xl text-slate-600 mb-6 leading-relaxed">{subject.description}</p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">{subject.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-slate-600">{subject.rating} rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">{subject.duration} course</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 lg:mt-0 lg:ml-8">
                <div className="text-center">
                  <div className="text-sm text-slate-500 mb-2">Instructor</div>
                  <div className="font-semibold text-slate-800">{subject.instructor}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Concepts Grid */}
        <div className="grid gap-6">
          {subject.concepts.map((concept, index) => (
            <div
              key={concept.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">{concept.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(concept.difficulty)}`}>
                        {concept.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onNavigate({ page: 'concept', conceptId: concept.id, subjectId: subjectId })}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>Start Learning</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-slate-600 leading-relaxed mb-6">{concept.description}</p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <Play className="h-5 w-5 text-indigo-600" />
                      <span className="font-semibold text-slate-800">Video Content</span>
                    </div>
                    <div className="text-slate-600">
                      <div>{concept.videos} videos</div>
                      <div className="text-sm text-slate-500">{concept.duration} total</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <BookOpen className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold text-slate-800">Simulations</span>
                    </div>
                    <div className="text-slate-600">
                      <div>{concept.simulations.length} interactive</div>
                      <div className="text-sm text-slate-500">Hands-on practice</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <Clock className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-slate-800">Duration</span>
                    </div>
                    <div className="text-slate-600">
                      <div>Self-paced</div>
                      <div className="text-sm text-slate-500">Complete anytime</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
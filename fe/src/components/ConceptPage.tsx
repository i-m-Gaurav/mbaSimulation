import  { useState } from 'react';
import { ArrowLeft, Play, BookOpen, Clock, CheckCircle, Lock } from 'lucide-react';
import { NavigationState } from '../App';

interface ConceptPageProps {
  conceptId: string;
  subjectId: string;
  onNavigate: (nav: NavigationState) => void;
}

export function ConceptPage({ conceptId, subjectId, onNavigate }: ConceptPageProps) {
  const [activeTab, setActiveTab] = useState<'videos' | 'simulations'>('videos');
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);

  const conceptData: Record<string , object> = {
    'supply-chain': {
      title: 'Supply Chain Management',
      description: 'Master the complexities of modern supply chain operations through comprehensive video lessons and hands-on simulations.',
      videos: [
        {
          id: 'intro-supply-chain',
          title: 'Introduction to Supply Chain Management',
          duration: '12:34',
          description: 'Overview of supply chain components, stakeholders, and key performance indicators.',
          thumbnail: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'inventory-management',
          title: 'Inventory Management Strategies',
          duration: '15:22',
          description: 'Learn about EOQ, JIT, and ABC analysis for optimal inventory control.',
          thumbnail: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'supplier-relationships',
          title: 'Building Strong Supplier Relationships',
          duration: '18:45',
          description: 'Strategies for vendor selection, negotiation, and long-term partnerships.',
          thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      simulations: [
        {
          id: 'warehouse',
          title: 'Warehouse Operations Simulation',
          description: 'Manage inventory levels, quality control, and delivery logistics in a virtual warehouse environment.',
          difficulty: 'Intermediate',
          duration: '30-45 min',
          unlocked: true
        },
        {
          id: 'factory',
          title: 'Factory Production Simulation',
          description: 'Optimize production workflows, manage employees, and ensure quality standards.',
          difficulty: 'Advanced',
          duration: '45-60 min',
          unlocked: true
        },
        {
          id: 'showroom',
          title: 'Showroom & Sales Simulation',
          description: 'Design customer experiences, set pricing strategies, and manage product launches.',
          difficulty: 'Intermediate',
          duration: '25-35 min',
          unlocked: completedVideos.length >= 2
        }
      ]
    },
    'market-segmentation': {
      title: 'Market Segmentation & Targeting',
      description: 'Learn to identify and target specific customer segments effectively through data-driven approaches.',
      videos: [
        {
          id: 'segmentation-basics',
          title: 'Market Segmentation Fundamentals',
          duration: '14:20',
          description: 'Understanding demographic, psychographic, and behavioral segmentation methods.',
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'targeting-strategies',
          title: 'Targeting Strategies & Positioning',
          duration: '16:45',
          description: 'Learn differentiated, undifferentiated, and concentrated targeting approaches.',
          thumbnail: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'customer-personas',
          title: 'Creating Customer Personas',
          duration: '12:30',
          description: 'Develop detailed customer personas based on market research and data analysis.',
          thumbnail: 'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      simulations: [
        {
          id: 'marketing',
          title: 'Marketing Campaign Simulation',
          description: 'Design and execute marketing campaigns targeting specific customer segments.',
          difficulty: 'Beginner',
          duration: '25-35 min',
          unlocked: completedVideos.length >= 2
        }
      ]
    },
    'financial-analysis': {
      title: 'Financial Statement Analysis',
      description: 'Learn to analyze income statements, balance sheets, and cash flow statements for business insights.',
      videos: [
        {
          id: 'income-statement',
          title: 'Income Statement Analysis',
          duration: '18:30',
          description: 'Understanding revenue, expenses, and profitability metrics.',
          thumbnail: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'balance-sheet',
          title: 'Balance Sheet Fundamentals',
          duration: '16:20',
          description: 'Analyzing assets, liabilities, and equity for financial health assessment.',
          thumbnail: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'cash-flow',
          title: 'Cash Flow Statement Analysis',
          duration: '15:40',
          description: 'Understanding operating, investing, and financing cash flows.',
          thumbnail: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      simulations: [
        {
          id: 'finance',
          title: 'Corporate Finance Simulation',
          description: 'Analyze financial statements and make investment decisions.',
          difficulty: 'Intermediate',
          duration: '40-50 min',
          unlocked: completedVideos.length >= 2
        }
      ]
    },
    'market-fundamentals': {
      title: 'Market Fundamentals & Analysis',
      description: 'Understand market mechanics, order types, and fundamental analysis techniques.',
      videos: [
        {
          id: 'market-basics',
          title: 'Stock Market Fundamentals',
          duration: '13:45',
          description: 'Understanding how stock markets work and key market participants.',
          thumbnail: 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'order-types',
          title: 'Order Types and Execution',
          duration: '11:20',
          description: 'Learn about market orders, limit orders, and advanced order types.',
          thumbnail: 'https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'fundamental-analysis',
          title: 'Fundamental Analysis Techniques',
          duration: '19:30',
          description: 'Analyzing company financials and economic indicators for investment decisions.',
          thumbnail: 'https://images.pexels.com/photos/3184301/pexels-photo-3184301.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      simulations: [
        {
          id: 'trading',
          title: 'Stock Trading Simulation',
          description: 'Practice real-time stock trading with live market data.',
          difficulty: 'Beginner',
          duration: '30-40 min',
          unlocked: completedVideos.length >= 2
        }
      ]
    },
    'talent-acquisition': {
      title: 'Talent Acquisition & Recruitment',
      description: 'Learn modern recruitment strategies, interviewing techniques, and candidate assessment methods.',
      videos: [
        {
          id: 'recruitment-strategy',
          title: 'Modern Recruitment Strategies',
          duration: '15:30',
          description: 'Understanding talent sourcing, employer branding, and recruitment channels.',
          thumbnail: 'https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'interviewing-techniques',
          title: 'Effective Interviewing Techniques',
          duration: '17:45',
          description: 'Behavioral interviewing, competency-based questions, and assessment methods.',
          thumbnail: 'https://images.pexels.com/photos/3184303/pexels-photo-3184303.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'candidate-assessment',
          title: 'Candidate Assessment & Selection',
          duration: '14:20',
          description: 'Using psychometric tests, skills assessments, and reference checks.',
          thumbnail: 'https://images.pexels.com/photos/3184304/pexels-photo-3184304.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      simulations: [
        {
          id: 'hr',
          title: 'HR Management Simulation',
          description: 'Manage employee performance, satisfaction, and development.',
          difficulty: 'Beginner',
          duration: '35-45 min',
          unlocked: completedVideos.length >= 2
        }
      ]
    },
    'competitive-analysis': {
      title: 'Competitive Analysis & Porter\'s Five Forces',
      description: 'Master industry analysis using Porter\'s framework and competitive intelligence gathering.',
      videos: [
        {
          id: 'porters-five-forces',
          title: 'Porter\'s Five Forces Framework',
          duration: '16:30',
          description: 'Understanding competitive rivalry, supplier power, and market dynamics.',
          thumbnail: 'https://images.pexels.com/photos/3184305/pexels-photo-3184305.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'competitive-intelligence',
          title: 'Competitive Intelligence Gathering',
          duration: '14:45',
          description: 'Methods for collecting and analyzing competitor information.',
          thumbnail: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'industry-analysis',
          title: 'Industry Structure Analysis',
          duration: '18:20',
          description: 'Analyzing industry trends, growth patterns, and market opportunities.',
          thumbnail: 'https://images.pexels.com/photos/3184307/pexels-photo-3184307.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ],
      simulations: [
        {
          id: 'marketing',
          title: 'Strategic Marketing Simulation',
          description: 'Develop competitive strategies and market positioning.',
          difficulty: 'Intermediate',
          duration: '40-50 min',
          unlocked: completedVideos.length >= 2
        }
      ]
    }
  };

  const concept = conceptData[conceptId];

  if (!concept) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Concept Not Found</h1>
          <button
            onClick={() => onNavigate({ page: 'subject', subjectId })}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
          >
            Back to Subject
          </button>
        </div>
      </div>
    );
  }

  const toggleVideoCompletion = (videoId: string) => {
    setCompletedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-700',
      'Intermediate': 'bg-yellow-100 text-yellow-700',
      'Advanced': 'bg-red-100 text-red-700'
    };
    return colors[difficulty as keyof typeof colors];
  };

  const getSubjectTitle = (subjectId: string) => {
    const titles: Record<string, string> = {
      'operations': 'Operations Management',
      'marketing': 'Marketing Strategy',
      'finance': 'Corporate Finance',
      'trading': 'Financial Trading',
      'hr': 'Human Resources Management',
      'strategy': 'Business Strategy'
    };
    return titles[subjectId] || 'Subject';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate({ page: 'subject', subjectId })}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to {getSubjectTitle(subjectId)}</span>
          </button>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">{concept.title} </h1>
            <p className="text-xl text-slate-600 leading-relaxed">{concept.description}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex-1 px-8 py-4 text-center font-semibold transition-colors ${
                  activeTab === 'videos'
                    ? 'text-indigo-600 bg-indigo-50 border-b-2 border-indigo-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Video Lessons</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('simulations')}
                className={`flex-1 px-8 py-4 text-center font-semibold transition-colors ${
                  activeTab === 'simulations'
                    ? 'text-indigo-600 bg-indigo-50 border-b-2 border-indigo-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Interactive Simulations</span>
                </div>
              </button>
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'videos' && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Video Lessons</h2>
                  <p className="text-slate-600">Watch expert-led videos to understand key concepts and theories.</p>
                </div>

                <div className="grid gap-6">
                  {concept.videos.map((video: any, index: number) => (
                    <div
                      key={video.id}
                      className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex">
                        <div className="relative w-48 h-32 bg-slate-200">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                              <Play className="h-6 w-6 text-slate-800 ml-1" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                        </div>
                        
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                                  {index + 1}
                                </span>
                                <h3 className="text-xl font-bold text-slate-800">{video.title}</h3>
                              </div>
                              <p className="text-slate-600 mb-4">{video.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-slate-500">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{video.duration}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => toggleVideoCompletion(video.id)}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                  completedVideos.includes(video.id)
                                    ? 'bg-green-600 border-green-600 text-white'
                                    : 'border-slate-300 hover:border-green-400'
                                }`}
                              >
                                {completedVideos.includes(video.id) && <CheckCircle className="h-4 w-4" />}
                              </button>
                              <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                                Watch
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'simulations' && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Interactive Simulations</h2>
                  <p className="text-slate-600">Apply your knowledge through hands-on business simulations.</p>
                </div>

                <div className="grid gap-6">
                  {concept.simulations.map((simulation: any, index: number) => (
                    <div
                      key={simulation.id}
                      className={`bg-white rounded-xl border border-slate-200 p-6 transition-all duration-300 ${
                        simulation.unlocked 
                          ? 'hover:shadow-lg cursor-pointer' 
                          : 'opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            simulation.unlocked 
                              ? 'bg-gradient-to-br from-blue-100 to-indigo-100' 
                              : 'bg-slate-100'
                          }`}>
                            {simulation.unlocked ? (
                              <BookOpen className="h-6 w-6 text-blue-600" />
                            ) : (
                              <Lock className="h-6 w-6 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-1">{simulation.title}</h3>
                            <div className="flex items-center space-x-3 mb-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(simulation.difficulty)}`}>
                                {simulation.difficulty}
                              </span>
                              <span className="text-slate-500 text-sm">{simulation.duration}</span>
                            </div>
                            <p className="text-slate-600">{simulation.description}</p>
                          </div>
                        </div>
                        
                        <div>
                          {simulation.unlocked ? (
                            <button
                              onClick={() => {
                                // Clear any existing simulation data when starting a new simulation
                                window.localStorage.removeItem("simulationId");
                                window.localStorage.removeItem("lastOrderDetails");
                                onNavigate({ page: 'simulation', simulationId: simulation.id as any });
                              }}
                              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                              Start Simulation
                            </button>
                          ) : (
                            <div className="text-center">
                              <div className="text-slate-400 text-sm mb-1">Complete {2 - completedVideos.length} more videos</div>
                              <button
                                disabled
                                className="px-6 py-3 bg-slate-100 text-slate-400 font-semibold rounded-xl cursor-not-allowed"
                              >
                                Locked
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
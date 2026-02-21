import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@mdi/react';
import { colors } from '../theme';
import {
  mdiArrowLeft,
  mdiTrophy,
  mdiCricket,
  mdiChartBar,
  mdiCalendar,
  mdiEmail,
  mdiVideo,
  mdiDownload,
  mdiShare,
  mdiTrendingUp,
  mdiHistory
} from '@mdi/js';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend
} from 'recharts';

const playerData = {
  1: {
    id: 1,
    name: 'Rohit Sharma',
    role: 'Opening Batsman',
    battingStyle: 'Right-handed',
    age: 36,
    height: '173 cm',
    weight: '75 kg',
    matchesPlayed: 24,
    avgScore: 88,
    batSpeed: 92,
    consistency: 88,
    form: 90,
    injuryStatus: 'fit',
    joinDate: '2024-01-15',
    email: 'rohit.sharma@team.com',
    phone: '+91 98765 43210',
    bio: 'Experienced opening batsman known for his elegant stroke play and ability to score big hundreds.',
    recentSwings: [
      { date: '2024-02-20', type: 'Cover Drive', score: 94 },
      { date: '2024-02-19', type: 'Pull Shot', score: 88 },
      { date: '2024-02-18', type: 'Straight Drive', score: 92 },
      { date: '2024-02-17', type: 'Square Cut', score: 90 },
      { date: '2024-02-16', type: 'Front Foot Drive', score: 86 },
    ],
    performanceHistory: [
      { month: 'Jan', batSpeed: 88, consistency: 85, form: 82 },
      { month: 'Feb', batSpeed: 90, consistency: 87, form: 86 },
      { month: 'Mar', batSpeed: 91, consistency: 88, form: 88 },
      { month: 'Apr', batSpeed: 92, consistency: 89, form: 90 },
      { month: 'May', batSpeed: 92, consistency: 88, form: 90 },
      { month: 'Jun', batSpeed: 92, consistency: 88, form: 90 },
    ]
  },
  2: {
    id: 2,
    name: 'Virat Kohli',
    role: 'Top Order Batsman',
    battingStyle: 'Right-handed',
    age: 35,
    height: '175 cm',
    weight: '70 kg',
    matchesPlayed: 28,
    avgScore: 92,
    batSpeed: 89,
    consistency: 92,
    form: 88,
    injuryStatus: 'minor',
    joinDate: '2024-01-10',
    email: 'virat.kohli@team.com',
    phone: '+91 98765 43211',
    bio: 'World-class batsman with exceptional technique and consistency across all formats.',
    recentSwings: [
      { date: '2024-02-20', type: 'Cover Drive', score: 96 },
      { date: '2024-02-19', type: 'Flick Shot', score: 90 },
      { date: '2024-02-18', type: 'Straight Drive', score: 94 },
      { date: '2024-02-17', type: 'Pull Shot', score: 88 },
      { date: '2024-02-16', type: 'Late Cut', score: 92 },
    ],
    performanceHistory: [
      { month: 'Jan', batSpeed: 86, consistency: 90, form: 85 },
      { month: 'Feb', batSpeed: 87, consistency: 91, form: 86 },
      { month: 'Mar', batSpeed: 88, consistency: 92, form: 87 },
      { month: 'Apr', batSpeed: 89, consistency: 92, form: 88 },
      { month: 'May', batSpeed: 89, consistency: 92, form: 88 },
      { month: 'Jun', batSpeed: 89, consistency: 92, form: 88 },
    ]
  },
  3: {
    id: 3,
    name: 'KL Rahul',
    role: 'Wicket-keeper Batsman',
    battingStyle: 'Right-handed',
    age: 31,
    height: '180 cm',
    weight: '70 kg',
    matchesPlayed: 20,
    avgScore: 82,
    batSpeed: 87,
    consistency: 85,
    form: 82,
    injuryStatus: 'major',
    joinDate: '2024-01-20',
    email: 'kl.rahul@team.com',
    phone: '+91 98765 43212',
    bio: 'Versatile wicket-keeper batsman with solid technique and ability to play long innings.',
    recentSwings: [
      { date: '2024-02-15', type: 'Cover Drive', score: 84 },
      { date: '2024-02-14', type: 'Straight Drive', score: 80 },
      { date: '2024-02-13', type: 'Square Cut', score: 82 },
      { date: '2024-02-12', type: 'Pull Shot', score: 78 },
      { date: '2024-02-11', type: 'Flick Shot', score: 86 },
    ],
    performanceHistory: [
      { month: 'Jan', batSpeed: 85, consistency: 82, form: 80 },
      { month: 'Feb', batSpeed: 86, consistency: 84, form: 81 },
      { month: 'Mar', batSpeed: 87, consistency: 85, form: 82 },
      { month: 'Apr', batSpeed: 87, consistency: 85, form: 82 },
      { month: 'May', batSpeed: 87, consistency: 85, form: 82 },
      { month: 'Jun', batSpeed: 87, consistency: 85, form: 82 },
    ]
  },
  4: {
    id: 4,
    name: 'Shreyas Iyer',
    role: 'Middle Order Batsman',
    battingStyle: 'Right-handed',
    age: 29,
    height: '180 cm',
    weight: '75 kg',
    matchesPlayed: 18,
    avgScore: 84,
    batSpeed: 85,
    consistency: 83,
    form: 85,
    injuryStatus: 'fit',
    joinDate: '2024-02-01',
    email: 'shreyas.iyer@team.com',
    phone: '+91 98765 43213',
    bio: 'Aggressive middle-order batsman with excellent spin playing abilities.',
    recentSwings: [
      { date: '2024-02-20', type: 'Sweep Shot', score: 88 },
      { date: '2024-02-19', type: 'Pull Shot', score: 84 },
      { date: '2024-02-18', type: 'Cover Drive', score: 82 },
      { date: '2024-02-17', type: 'Straight Drive', score: 86 },
      { date: '2024-02-16', type: 'Cut Shot', score: 84 },
    ],
    performanceHistory: [
      { month: 'Feb', batSpeed: 83, consistency: 80, form: 82 },
      { month: 'Mar', batSpeed: 84, consistency: 82, form: 84 },
      { month: 'Apr', batSpeed: 85, consistency: 83, form: 85 },
      { month: 'May', batSpeed: 85, consistency: 83, form: 85 },
      { month: 'Jun', batSpeed: 85, consistency: 83, form: 85 },
      { month: 'Jul', batSpeed: 85, consistency: 83, form: 85 },
    ]
  },
  5: {
    id: 5,
    name: 'Hardik Pandya',
    role: 'All-rounder',
    battingStyle: 'Right-handed',
    age: 30,
    height: '186 cm',
    weight: '78 kg',
    matchesPlayed: 22,
    avgScore: 86,
    batSpeed: 94,
    consistency: 80,
    form: 87,
    injuryStatus: 'fit',
    joinDate: '2024-01-25',
    email: 'hardik.pandya@team.com',
    phone: '+91 98765 43214',
    bio: 'Dynamic all-rounder known for explosive batting and useful medium pace bowling.',
    recentSwings: [
      { date: '2024-02-20', type: 'Hook Shot', score: 92 },
      { date: '2024-02-19', type: 'Pull Shot', score: 88 },
      { date: '2024-02-18', type: 'Slog Sweep', score: 90 },
      { date: '2024-02-17', type: 'Straight Drive', score: 84 },
      { date: '2024-02-16', type: 'Cover Drive', score: 82 },
    ],
    performanceHistory: [
      { month: 'Jan', batSpeed: 92, consistency: 78, form: 84 },
      { month: 'Feb', batSpeed: 93, consistency: 79, form: 85 },
      { month: 'Mar', batSpeed: 94, consistency: 80, form: 86 },
      { month: 'Apr', batSpeed: 94, consistency: 80, form: 87 },
      { month: 'May', batSpeed: 94, consistency: 80, form: 87 },
      { month: 'Jun', batSpeed: 94, consistency: 80, form: 87 },
    ]
  },
  6: {
    id: 6,
    name: 'Rishabh Pant',
    role: 'Wicket-keeper Batsman',
    battingStyle: 'Left-handed',
    age: 26,
    height: '175 cm',
    weight: '70 kg',
    matchesPlayed: 19,
    avgScore: 87,
    batSpeed: 91,
    consistency: 86,
    form: 89,
    injuryStatus: 'fit',
    joinDate: '2024-02-05',
    email: 'rishabh.pant@team.com',
    phone: '+91 98765 43215',
    bio: 'Aggressive left-handed wicket-keeper batsman known for match-winning innings.',
    recentSwings: [
      { date: '2024-02-20', type: 'Reverse Sweep', score: 94 },
      { date: '2024-02-19', type: 'Pull Shot', score: 90 },
      { date: '2024-02-18', type: 'Cover Drive', score: 88 },
      { date: '2024-02-17', type: 'Straight Drive', score: 86 },
      { date: '2024-02-16', type: 'Flick Shot', score: 92 },
    ],
    performanceHistory: [
      { month: 'Feb', batSpeed: 89, consistency: 84, form: 86 },
      { month: 'Mar', batSpeed: 90, consistency: 85, form: 87 },
      { month: 'Apr', batSpeed: 91, consistency: 86, form: 88 },
      { month: 'May', batSpeed: 91, consistency: 86, form: 89 },
      { month: 'Jun', batSpeed: 91, consistency: 86, form: 89 },
      { month: 'Jul', batSpeed: 91, consistency: 86, form: 89 },
    ]
  }
};

const PlayerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const player = playerData[id as unknown as keyof typeof playerData] || playerData[1];
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'history'>('overview');

  if (!player) {
    return (
      <div className="fade-in">
        <div className="card" style={{ padding: 48, textAlign: 'center' }}>
          <h3>Player not found</h3>
          <button className="btn-primary" onClick={() => navigate('/team')} style={{ marginTop: 16 }}>
            <Icon path={mdiArrowLeft} size={0.75} style={{ marginRight: 8 }} />
            Back to Team
          </button>
        </div>
      </div>
    );
  }

  const overallRating = Math.round((player.batSpeed + player.consistency + player.form) / 3);

  const radarData = [
    { subject: 'Bat Speed', value: player.batSpeed, fullMark: 100 },
    { subject: 'Consistency', value: player.consistency, fullMark: 100 },
    { subject: 'Form', value: player.form, fullMark: 100 },
    { subject: 'Experience', value: Math.min(player.matchesPlayed * 3, 100), fullMark: 100 },
    { subject: 'Fitness', value: player.injuryStatus === 'fit' ? 95 : player.injuryStatus === 'minor' ? 70 : 50, fullMark: 100 },
    { subject: 'Technique', value: player.avgScore, fullMark: 100 },
  ];

  const getInjuryColor = (status: string) => {
    switch(status) {
      case 'fit': return colors.injuryFit;
      case 'minor': return colors.injuryMinor;
      case 'major': return colors.injuryMajor;
      default: return colors.injuryDefault;
    }
  };

  return (
    <div className="fade-in">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/team')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 16px',
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          marginBottom: 24,
          transition: 'all 0.3s ease'
        }}
      >
        <Icon path={mdiArrowLeft} size={0.75} />
        Back to Team
      </button>

      {/* Player Header */}
      <div className="card" style={{ padding: 32, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ 
            width: 120, 
            height: 120, 
            borderRadius: '50%', 
            background: 'var(--gradient-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            fontWeight: 700,
            color: 'var(--primary-color)',
            boxShadow: 'var(--shadow-accent)'
          }}>
            {player.name.split(' ').map(n => n[0]).join('')}
          </div>
          
          <div style={{ flex: 1, minWidth: 300 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h1 style={{ marginBottom: 8 }}>{player.name}</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>
                  {player.role} • {player.battingStyle}
                </p>
                <span 
                  className="badge"
                  style={{ 
                    background: getInjuryColor(player.injuryStatus) + '20',
                    color: getInjuryColor(player.injuryStatus),
                    textTransform: 'capitalize',
                    padding: '8px 16px'
                  }}
                >
                  {player.injuryStatus === 'fit' ? '✓ Fit to Play' : player.injuryStatus === 'minor' ? '⚠ Minor Injury' : '✕ Major Injury'}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--accent-color)' }}>
                  {overallRating}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Overall Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: '1px solid var(--border-color)', paddingBottom: 16 }}>
        {[
          { id: 'overview', label: 'Overview', icon: mdiTrophy },
          { id: 'analysis', label: 'Performance Analysis', icon: mdiChartBar },
          { id: 'history', label: 'Swing History', icon: mdiHistory }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            style={{
              padding: '10px 20px',
              background: activeTab === tab.id ? 'var(--gradient-accent)' : 'var(--card-bg)',
              border: activeTab === tab.id ? 'none' : '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              color: activeTab === tab.id ? 'var(--primary-color)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.3s ease'
            }}
          >
            <Icon path={tab.icon} size={0.75} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Player Info Grid */}
          <div className="grid-3" style={{ marginBottom: 24 }}>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <Icon path={mdiCalendar} size={1} color="var(--accent-color)" />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Personal Info</span>
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Age</div>
                  <div style={{ fontWeight: 600 }}>{player.age} years</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Height</div>
                  <div style={{ fontWeight: 600 }}>{player.height}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Weight</div>
                  <div style={{ fontWeight: 600 }}>{player.weight}</div>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <Icon path={mdiEmail} size={1} color="var(--accent-color)" />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Contact</span>
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Email</div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{player.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Phone</div>
                  <div style={{ fontWeight: 600 }}>{player.phone}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Joined</div>
                  <div style={{ fontWeight: 600 }}>{player.joinDate}</div>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <Icon path={mdiCricket} size={1} color="var(--accent-color)" />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Career Stats</span>
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Matches Played</div>
                  <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>{player.matchesPlayed}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Average Score</div>
                  <div style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--accent-color)' }}>{player.avgScore}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Batting Style</div>
                  <div style={{ fontWeight: 600 }}>{player.battingStyle}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid-4" style={{ marginBottom: 24 }}>
            {[
              { label: 'Bat Speed', value: player.batSpeed, unit: 'km/h', color: 'var(--accent-color)' },
              { label: 'Consistency', value: player.consistency, unit: '/100', color: 'var(--success-color)' },
              { label: 'Current Form', value: player.form, unit: '/100', color: 'var(--warning-color)' },
              { label: 'Avg Score', value: player.avgScore, unit: '', color: 'var(--primary-color)' }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{ padding: 20, textAlign: 'center' }}
              >
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase' }}>
                  {metric.label}
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: metric.color }}>
                  {metric.value}
                  <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginLeft: 4 }}>{metric.unit}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Performance Chart & Bio */}
          <div className="grid-2" style={{ marginBottom: 24 }}>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ marginBottom: 16 }}>
                <Icon path={mdiTrendingUp} size={1} style={{ marginRight: 8, verticalAlign: 'middle', color: 'var(--accent-color)' }} />
                Performance Trend
              </h3>
              <div style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={player.performanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.chartGridDark} />
                    <XAxis dataKey="month" stroke={colors.chartAxisLight} />
                    <YAxis stroke={colors.chartAxisLight} domain={[60, 100]} />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="batSpeed" name="Bat Speed" stroke={colors.chartSeries1} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="consistency" name="Consistency" stroke={colors.chartSeries2} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="form" name="Form" stroke={colors.chartSeries3} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ marginBottom: 16 }}>
                <Icon path={mdiTrophy} size={1} style={{ marginRight: 8, verticalAlign: 'middle', color: 'var(--accent-color)' }} />
                Player Profile
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 24 }}>
                {player.bio}
              </p>
              
              <h4 style={{ marginBottom: 12 }}>Skills Radar</h4>
              <div style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke={colors.chartGrid} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: colors.chartAxisLight, fontSize: 11 }} />
                    <Radar
                      name="Player Stats"
                      dataKey="value"
                      stroke={colors.chartSeries1}
                      strokeWidth={2}
                      fill={colors.chartSeries1}
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Swings */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ marginBottom: 16 }}>
              <Icon path={mdiVideo} size={1} style={{ marginRight: 8, verticalAlign: 'middle', color: 'var(--accent-color)' }} />
              Recent Swing Analysis
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Date</th>
                    <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Shot Type</th>
                    <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Score</th>
                    <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {player.recentSwings.map((swing, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: 16, color: 'var(--text-secondary)' }}>{swing.date}</td>
                      <td style={{ padding: 16, fontWeight: 500 }}>{swing.type}</td>
                      <td style={{ padding: 16 }}>
                        <span style={{ 
                          fontWeight: 700, 
                          color: swing.score >= 90 ? 'var(--success-color)' : 
                                 swing.score >= 85 ? 'var(--accent-color)' : 'var(--warning-color)'
                        }}>
                          {swing.score}
                        </span>
                      </td>
                      <td style={{ padding: 16 }}>
                        <div className="progress-bar" style={{ width: 150 }}>
                          <div 
                            className="progress-fill" 
                            style={{ 
                              width: `${swing.score}%`,
                              background: swing.score >= 90 ? 'var(--success-color)' : 
                                         swing.score >= 85 ? 'var(--accent-color)' : 'var(--warning-color)'
                            }} 
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'analysis' && (
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginBottom: 24 }}>
            <Icon path={mdiChartBar} size={1} style={{ marginRight: 8, verticalAlign: 'middle', color: 'var(--accent-color)' }} />
            Detailed Performance Analysis
          </h3>
          <div style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={player.performanceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.chartGridDark} />
                <XAxis dataKey="month" stroke={colors.chartAxisLight} />
                <YAxis stroke={colors.chartAxisLight} domain={[60, 100]} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)'
                  }}
                />
                <Legend />
                <Bar dataKey="batSpeed" name="Bat Speed" fill={colors.chartSeries1} radius={[4, 4, 0, 0]} />
                <Bar dataKey="consistency" name="Consistency" fill={colors.chartSeries2} radius={[4, 4, 0, 0]} />
                <Bar dataKey="form" name="Form" fill={colors.chartSeries3} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginBottom: 24 }}>
            <Icon path={mdiHistory} size={1} style={{ marginRight: 8, verticalAlign: 'middle', color: 'var(--accent-color)' }} />
            Complete Swing History
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Date</th>
                  <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Shot Type</th>
                  <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Score</th>
                  <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {player.recentSwings.map((swing, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: 16, color: 'var(--text-secondary)' }}>{swing.date}</td>
                    <td style={{ padding: 16, fontWeight: 500 }}>{swing.type}</td>
                    <td style={{ padding: 16 }}>
                      <span style={{ 
                        fontWeight: 700, 
                        color: swing.score >= 90 ? 'var(--success-color)' : 
                               swing.score >= 85 ? 'var(--accent-color)' : 'var(--warning-color)'
                      }}>
                        {swing.score}
                      </span>
                    </td>
                    <td style={{ padding: 16 }}>
                      <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>
                        <Icon path={mdiVideo} size={0.5} style={{ marginRight: 4 }} />
                        View Video
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <button className="btn-primary">
          <Icon path={mdiDownload} size={0.75} style={{ marginRight: 8 }} />
          Export Report
        </button>
        <button 
          style={{
            padding: '12px 24px',
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <Icon path={mdiShare} size={0.75} />
          Share
        </button>
      </div>
    </div>
  );
};

export default PlayerProfile;

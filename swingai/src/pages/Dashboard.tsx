import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@mdi/react';
import { colors } from '../theme';
import {
  mdiAccount,
  mdiCricket,
  mdiArrowUpRight,
  mdiArrowDownRight,
  mdiHeart,
  mdiAlertCircle,
  mdiAccountGroup,
  mdiChartBar,
  mdiDownload,
  mdiClose,
  mdiPrinter
} from '@mdi/js';
import { Link, useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const sampleData = [
  { date: 'Mon', batSpeed: 85, consistency: 78 },
  { date: 'Tue', batSpeed: 88, consistency: 82 },
  { date: 'Wed', batSpeed: 87, consistency: 80 },
  { date: 'Thu', batSpeed: 92, consistency: 85 },
  { date: 'Fri', batSpeed: 90, consistency: 88 },
  { date: 'Sat', batSpeed: 95, consistency: 90 },
  { date: 'Sun', batSpeed: 93, consistency: 87 },
];

const recentSwings = [
  { id: 1, date: '2024-02-20', type: 'Front Foot Drive', score: 92, status: 'excellent' },
  { id: 2, date: '2024-02-20', type: 'Cover Drive', score: 85, status: 'good' },
  { id: 3, date: '2024-02-19', type: 'Pull Shot', score: 78, status: 'good' },
  { id: 4, date: '2024-02-19', type: 'Straight Drive', score: 65, status: 'needs-improvement' },
  { id: 5, date: '2024-02-18', type: 'Square Cut', score: 88, status: 'good' },
];

const injuryAlerts = [
  { id: 1, player: 'Rohit Sharma', type: 'Shoulder Strain', severity: 'moderate', date: '2 days ago', status: 'recovering' },
  { id: 2, player: 'Virat Kohli', type: 'Wrist Fatigue', severity: 'low', date: '1 day ago', status: 'monitoring' },
  { id: 3, player: 'KL Rahul', type: 'Lower Back Tightness', severity: 'high', date: '3 days ago', status: 'rest-required' },
];

const teamStats = [
  { metric: 'Avg Bat Speed', value: '89.5', unit: 'km/h', change: '+4.2%', trend: 'up', icon: '🏏' },
  { metric: 'Team Consistency', value: '84', unit: '/100', change: '+6%', trend: 'up', icon: '🎯' },
  { metric: 'Practice Hours', value: '156', unit: 'hrs', change: '+12h', trend: 'up', icon: '⏱️' },
  { metric: 'Injury Rate', value: '8', unit: '%', change: '-2%', trend: 'down', icon: '❤️‍🩹' },
];

const playerProgress = [
  { name: 'Rohit S.', batSpeed: 92, consistency: 88, form: 90 },
  { name: 'Virat K.', batSpeed: 89, consistency: 92, form: 88 },
  { name: 'KL Rahul', batSpeed: 87, consistency: 85, form: 82 },
  { name: 'Shreyas I.', batSpeed: 85, consistency: 83, form: 85 },
  { name: 'Hardik P.', batSpeed: 94, consistency: 80, form: 87 },
  { name: 'Rishabh P.', batSpeed: 91, consistency: 86, form: 89 },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('week');
  const [activeTab, setActiveTab] = useState<'player' | 'coach'>('player');
  const [showReportModal, setShowReportModal] = useState(false);

  const stats = [
    {
      title: 'Avg Bat Speed',
      value: '91.4',
      unit: 'km/h',
      change: '+5.2%',
      trend: 'up',
      icon: '🏏',
      color: colors.accent
    },
    {
      title: 'Backlift Angle',
      value: '42°',
      unit: 'degrees',
      change: '+2°',
      trend: 'up',
      icon: '📐',
      color: colors.success
    },
    {
      title: 'Consistency Score',
      value: '86',
      unit: '/100',
      change: '+8%',
      trend: 'up',
      icon: '🎯',
      color: colors.warning
    },
    {
      title: 'Practice Time',
      value: '12.5',
      unit: 'hours',
      change: '+3.2h',
      trend: 'up',
      icon: '⏱️',
      color: colors.danger
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return colors.success;
      case 'moderate': return colors.warning;
      case 'high': return colors.danger;
      default: return colors.textSecondary;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recovering': return colors.success;
      case 'monitoring': return colors.warning;
      case 'rest-required': return colors.danger;
      default: return colors.textSecondary;
    }
  };

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 className="page-title">
              Welcome back, <span className="gradient-text">Player!</span>
            </h1>
            <p className="page-subtitle">Here's your training performance overview</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setActiveTab('player')}
              style={{
                padding: '10px 20px',
                background: activeTab === 'player' ? 'var(--gradient-accent)' : 'var(--card-bg)',
                border: activeTab === 'player' ? 'none' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: activeTab === 'player' ? 'var(--primary-color)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.3s ease'
              }}
            >
              <Icon path={mdiAccount} size={0.75} />
              Player View
            </button>
            <button
              onClick={() => setActiveTab('coach')}
              style={{
                padding: '10px 20px',
                background: activeTab === 'coach' ? 'var(--gradient-accent)' : 'var(--card-bg)',
                border: activeTab === 'coach' ? 'none' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: activeTab === 'coach' ? 'var(--primary-color)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.3s ease'
              }}
            >
              <Icon path={mdiAccountGroup} size={0.75} />
              Coach View
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'player' ? (
        <>
          {/* Time Range Selector */}
          <div style={{ marginBottom: 24, display: 'flex', gap: 8 }}>
            {['day', 'week', 'month', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                style={{
                  padding: '8px 16px',
                  background: timeRange === range ? 'var(--gradient-accent)' : 'var(--card-bg)',
                  border: timeRange === range ? 'none' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: timeRange === range ? 'var(--primary-color)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  transition: 'all 0.3s ease'
                }}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid-4" style={{ marginBottom: 32 }}>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="stat-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <div className="emoji-icon" style={{ fontSize: '2.5rem' }}>{stat.icon as string}</div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      color: stat.trend === 'up' ? 'var(--success-color)' : 'var(--danger-color)',
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}
                  >
                    <Icon path={stat.trend === 'up' ? mdiArrowUpRight : mdiArrowDownRight} size={0.75} />
                    {stat.change}
                  </div>
                </div>
                <div className="metric-value" style={{ fontSize: '2rem', marginBottom: 4 }}>
                  {stat.value}
                </div>
                <div className="metric-label">{stat.title}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid-2" style={{ marginBottom: 32 }}>
            {/* Bat Speed Trend */}
            <motion.div
              className="card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              style={{ padding: 24 }}
            >
              <h3 style={{ marginBottom: 8 }}>Bat Speed Trend</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 24 }}>
                Average speed over the last {timeRange}
              </p>
              <div style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sampleData}>
                    <defs>
                      <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.chartSeries1} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={colors.chartSeries1} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.chartGridDark} />
                    <XAxis dataKey="date" stroke={colors.chartAxisLight} />
                    <YAxis stroke={colors.chartAxisLight} domain={[70, 110]} />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="batSpeed"
                      stroke={colors.chartSeries1}
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorSpeed)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Consistency Score */}
            <motion.div
              className="card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              style={{ padding: 24 }}
            >
              <h3 style={{ marginBottom: 8 }}>Consistency Score</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 24 }}>
                Shot consistency over time
              </p>
              <div style={{ height: 250, overflowX: 'auto', overflowY: 'hidden' }}>
                <div style={{ minWidth: 500, height: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sampleData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.chartGridDark} />
                      <XAxis dataKey="date" stroke={colors.chartAxisLight} />
                      <YAxis stroke={colors.chartAxisLight} domain={[60, 100]} />
                      <Tooltip
                        contentStyle={{
                          background: 'var(--card-bg)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-md)'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="consistency"
                        stroke={colors.chartSeries2}
                        strokeWidth={3}
                        dot={{ fill: colors.chartSeries2, strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Swings */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ padding: 24 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h3 style={{ marginBottom: 4 }}>Recent Swings</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  Your latest analyzed shots
                </p>
              </div>
              <Link to="/analysis" className="btn-primary" style={{ textDecoration: 'none' }}>
                <Icon path={mdiCricket} size={0.75} style={{ marginRight: 8 }} />
                New Analysis
              </Link>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Shot Type</th>
                    <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Date</th>
                    <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Score</th>
                    <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Status</th>
                    <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSwings.map((swing) => (
                    <tr key={swing.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: 16, fontWeight: 500 }}>{swing.type}</td>
                      <td style={{ padding: 16, color: 'var(--text-secondary)' }}>{swing.date}</td>
                      <td style={{ padding: 16 }}>
                        <span style={{
                          fontWeight: 700,
                          color: swing.score >= 90 ? 'var(--success-color)' :
                            swing.score >= 75 ? 'var(--accent-color)' : 'var(--warning-color)'
                        }}>
                          {swing.score}
                        </span>
                      </td>
                      <td style={{ padding: 16 }}>
                        <span className={`badge badge-${swing.status}`}>
                          {swing.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td style={{ padding: 16 }}>
                        <Link
                          to={`/analysis?swingId=${swing.id}`}
                          style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 500 }}
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid-3" style={{ marginTop: 32 }}>
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ padding: 24, textAlign: 'center' }}
            >
              <div className="emoji-icon" style={{ fontSize: '2.5rem', marginBottom: 16, display: 'flex', justifyContent: 'center' }}>📹</div>
              <h4 style={{ marginBottom: 8 }}>Upload Video</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 16 }}>
                Analyze your latest swing footage
              </p>
              <Link to="/analysis" className="btn-primary" style={{ textDecoration: 'none' }}>
                Get Started
              </Link>
            </motion.div>

            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              style={{ padding: 24, textAlign: 'center' }}
            >
              <div className="emoji-icon" style={{ fontSize: '2.5rem', marginBottom: 16, display: 'flex', justifyContent: 'center' }}>🕒</div>
              <h4 style={{ marginBottom: 8 }}>View History</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 16 }}>
                Track your improvement journey
              </p>
              <Link to="/progress" className="btn-primary" style={{ textDecoration: 'none' }}>
                View Progress
              </Link>
            </motion.div>

            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              style={{ padding: 24, textAlign: 'center' }}
            >
              <div className="emoji-icon" style={{ fontSize: '2.5rem', marginBottom: 16, display: 'flex', justifyContent: 'center' }}>⚙️</div>
              <h4 style={{ marginBottom: 8 }}>Customize Goals</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 16 }}>
                Set your performance targets
              </p>
              <Link to="/settings" className="btn-primary" style={{ textDecoration: 'none' }}>
                Settings
              </Link>
            </motion.div>
          </div>
        </>
      ) : (
        /* Coach View */
        <>
          <div className="grid-4" style={{ marginBottom: 32 }}>
            {teamStats.map((stat, index) => (
              <motion.div
                key={stat.metric}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="stat-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <div className="emoji-icon" style={{ fontSize: '2.5rem' }}>{stat.icon as string}</div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      color: stat.trend === 'up' ? (stat.metric.includes('Injury') ? 'var(--success-color)' : 'var(--success-color)') : 'var(--success-color)',
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}
                  >
                    <Icon path={stat.trend === 'up' ? mdiArrowUpRight : mdiArrowDownRight} size={0.75} />
                    {stat.change}
                  </div>
                </div>
                <div className="metric-value" style={{ fontSize: '2rem', marginBottom: 4 }}>
                  {stat.value}
                </div>
                <div className="metric-label">{stat.metric}</div>
              </motion.div>
            ))}
          </div>

          {/* Injury Alerts & Team Performance */}
          <div className="grid-2" style={{ marginBottom: 32 }}>
            {/* Injury Alerts */}
            <motion.div
              className="card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ padding: 24 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h3>
                  <span style={{ fontSize: '1.5rem', marginRight: 8, verticalAlign: 'middle' }}>⚠️</span>
                  Injury Alerts
                </h3>
                <span className="badge" style={{ background: 'rgba(251, 191, 36, 0.2)', color: 'var(--warning-color)' }}>
                  {injuryAlerts.length} Active
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {injuryAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    style={{
                      padding: 16,
                      background: 'rgba(17, 62, 28, 0.5)',
                      borderRadius: 'var(--radius-md)',
                      border: `1px solid ${getSeverityColor(alert.severity)}40`,
                      borderLeft: `4px solid ${getSeverityColor(alert.severity)}`
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div>
                        <h4 style={{ marginBottom: 4 }}>{alert.player}</h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{alert.type}</p>
                      </div>
                      <span
                        className="badge"
                        style={{
                          background: getStatusColor(alert.status) + '20',
                          color: getStatusColor(alert.status)
                        }}
                      >
                        {alert.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Reported {alert.date}
                      </span>
                      <span
                        className="badge"
                        style={{
                          background: getSeverityColor(alert.severity) + '20',
                          color: getSeverityColor(alert.severity)
                        }}
                      >
                        {alert.severity} severity
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="btn-primary"
                style={{ marginTop: 20, width: '100%' }}
                onClick={() => navigate('/medical-reports')}
              >
                <Icon path={mdiHeart} size={0.75} style={{ marginRight: 8 }} />
                View All Medical Reports
              </button>
            </motion.div>

            {/* Team Performance Chart */}
            <motion.div
              className="card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ padding: 24 }}
            >
              <h3 style={{ marginBottom: 8 }}>
                <Icon path={mdiChartBar} size={1} style={{ marginRight: 8, verticalAlign: 'middle', color: 'var(--accent-color)' }} />
                Team Performance Trends
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 24 }}>
                Weekly team metrics comparison
              </p>
              <div style={{ height: 280, overflowX: 'auto', overflowY: 'hidden' }}>
                <div style={{ minWidth: 600, height: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sampleData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.chartGridDark} />
                      <XAxis dataKey="date" stroke={colors.chartAxisLight} />
                      <YAxis stroke={colors.chartAxisLight} />
                      <Tooltip
                        contentStyle={{
                          background: 'var(--card-bg)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-md)'
                        }}
                      />
                      <Legend />
                      <Bar name="Avg Speed" dataKey="batSpeed" fill={colors.chartSeries1} radius={[4, 4, 0, 0]} />
                      <Bar name="Consistency" dataKey="consistency" fill={colors.chartSeries2} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Player-wise Progress */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: 24, marginBottom: 32 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3>
                <Icon path={mdiAccountGroup} size={1} style={{ marginRight: 8, verticalAlign: 'middle', color: 'var(--accent-color)' }} />
                Player-wise Progress
              </h3>
              <button className="btn-primary" onClick={() => setShowReportModal(true)}>
                <Icon path={mdiDownload} size={0.75} style={{ marginRight: 8 }} />
                Generate Report
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Player</th>
                    <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Bat Speed</th>
                    <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Consistency</th>
                    <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Current Form</th>
                    <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Overall Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {playerProgress.map((player) => {
                    const overallRating = Math.round((player.batSpeed + player.consistency + player.form) / 3);
                    return (
                      <tr key={player.name} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: 16, fontWeight: 600 }}>{player.name}</td>
                        <td style={{ padding: 16 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div className="progress-bar" style={{ width: 100 }}>
                              <div
                                className="progress-fill"
                                style={{
                                  width: `${player.batSpeed}%`,
                                  background: player.batSpeed >= 90 ? 'var(--success-color)' :
                                    player.batSpeed >= 85 ? 'var(--accent-color)' : 'var(--warning-color)'
                                }}
                              />
                            </div>
                            <span style={{
                              fontWeight: 600, color: player.batSpeed >= 90 ? 'var(--success-color)' :
                                player.batSpeed >= 85 ? 'var(--accent-color)' : 'var(--warning-color)'
                            }}>
                              {player.batSpeed}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: 16 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div className="progress-bar" style={{ width: 100 }}>
                              <div
                                className="progress-fill"
                                style={{
                                  width: `${player.consistency}%`,
                                  background: player.consistency >= 90 ? 'var(--success-color)' :
                                    player.consistency >= 85 ? 'var(--accent-color)' : 'var(--warning-color)'
                                }}
                              />
                            </div>
                            <span style={{
                              fontWeight: 600, color: player.consistency >= 90 ? 'var(--success-color)' :
                                player.consistency >= 85 ? 'var(--accent-color)' : 'var(--warning-color)'
                            }}>
                              {player.consistency}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: 16 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div className="progress-bar" style={{ width: 100 }}>
                              <div
                                className="progress-fill"
                                style={{
                                  width: `${player.form}%`,
                                  background: player.form >= 90 ? 'var(--success-color)' :
                                    player.form >= 85 ? 'var(--accent-color)' : 'var(--warning-color)'
                                }}
                              />
                            </div>
                            <span style={{
                              fontWeight: 600, color: player.form >= 90 ? 'var(--success-color)' :
                                player.form >= 85 ? 'var(--accent-color)' : 'var(--warning-color)'
                            }}>
                              {player.form}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: 16 }}>
                          <span
                            className="badge"
                            style={{
                              background: overallRating >= 90 ? 'rgba(74, 222, 128, 0.2)' :
                                overallRating >= 85 ? 'rgba(206, 237, 123, 0.2)' :
                                  'rgba(251, 191, 36, 0.2)',
                              color: overallRating >= 90 ? 'var(--success-color)' :
                                overallRating >= 85 ? 'var(--accent-color)' : 'var(--warning-color)',
                              padding: '8px 16px',
                              fontSize: '0.875rem',
                              fontWeight: 700
                            }}
                          >
                            {overallRating}/100
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Quick Actions for Coach */}
          <div className="grid-3" style={{ marginTop: 32 }}>
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ padding: 24, textAlign: 'center' }}
            >
              <div className="emoji-icon" style={{ fontSize: '2.5rem', marginBottom: 16, display: 'flex', justifyContent: 'center' }}>📹</div>
              <h4 style={{ marginBottom: 8 }}>Team Analysis</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 16 }}>
                Analyze all player swings
              </p>
              <button className="btn-primary">
                Start Session
              </button>
            </motion.div>

            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              style={{ padding: 24, textAlign: 'center' }}
            >
              <div className="emoji-icon" style={{ fontSize: '2.5rem', marginBottom: 16, display: 'flex', justifyContent: 'center' }}>📊</div>
              <h4 style={{ marginBottom: 8 }}>Performance Reports</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 16 }}>
                Generate detailed reports
              </p>
              <button className="btn-primary" onClick={() => setShowReportModal(true)}>
                Generate PDF
              </button>
            </motion.div>

            <motion.div
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              style={{ padding: 24, textAlign: 'center' }}
            >
              <div className="emoji-icon" style={{ fontSize: '2.5rem', marginBottom: 16, display: 'flex', justifyContent: 'center' }}>👥</div>
              <h4 style={{ marginBottom: 8 }}>Manage Players</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 16 }}>
                Add or remove team members
              </p>
              <button className="btn-primary" onClick={() => navigate('/team')}>
                Manage Team
              </button>
            </motion.div>
          </div>

          {/* Report Modal */}
          {showReportModal && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000
              }}
              onClick={() => setShowReportModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card"
                style={{ padding: 32, width: '100%', maxWidth: 700, margin: 16, maxHeight: '90vh', overflow: 'auto' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <h3>
                    <Icon path={mdiDownload} size={1} style={{ marginRight: 8, verticalAlign: 'middle', color: 'var(--accent-color)' }} />
                    Team Performance Report
                  </h3>
                  <button
                    onClick={() => setShowReportModal(false)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      padding: 8
                    }}
                  >
                    <Icon path={mdiClose} size={1} />
                  </button>
                </div>

                {/* Report Header */}
                <div style={{ textAlign: 'center', marginBottom: 24, padding: 20, background: 'rgba(206, 237, 123, 0.1)', borderRadius: 'var(--radius-md)' }}>
                  <h2 style={{ color: 'var(--accent-color)', marginBottom: 8 }}>SwingAI Team Report</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    Generated on {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                {/* Team Summary */}
                <div style={{ marginBottom: 24 }}>
                  <h4 style={{ marginBottom: 16, color: 'var(--accent-color)' }}>Team Summary</h4>
                  <div className="grid-2">
                    <div style={{ padding: 16, background: 'var(--dark-bg)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 4 }}>Total Players</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-color)' }}>{playerProgress.length}</div>
                    </div>
                    <div style={{ padding: 16, background: 'var(--dark-bg)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 4 }}>Avg Team Bat Speed</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success-color)' }}>
                        {Math.round(playerProgress.reduce((sum, p) => sum + p.batSpeed, 0) / playerProgress.length)} km/h
                      </div>
                    </div>
                    <div style={{ padding: 16, background: 'var(--dark-bg)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 4 }}>Avg Consistency</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--warning-color)' }}>
                        {Math.round(playerProgress.reduce((sum, p) => sum + p.consistency, 0) / playerProgress.length)}/100
                      </div>
                    </div>
                    <div style={{ padding: 16, background: 'var(--dark-bg)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 4 }}>Avg Form Rating</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-color)' }}>
                        {Math.round(playerProgress.reduce((sum, p) => sum + p.form, 0) / playerProgress.length)}/100
                      </div>
                    </div>
                  </div>
                </div>

                {/* Player Performance Table */}
                <div style={{ marginBottom: 24 }}>
                  <h4 style={{ marginBottom: 16, color: 'var(--accent-color)' }}>Player Performance Overview</h4>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                          <th style={{ padding: 12, textAlign: 'left' }}>Player</th>
                          <th style={{ padding: 12, textAlign: 'left' }}>Bat Speed</th>
                          <th style={{ padding: 12, textAlign: 'left' }}>Consistency</th>
                          <th style={{ padding: 12, textAlign: 'left' }}>Form</th>
                          <th style={{ padding: 12, textAlign: 'left' }}>Overall</th>
                        </tr>
                      </thead>
                      <tbody>
                        {playerProgress.map((player) => {
                          const overallRating = Math.round((player.batSpeed + player.consistency + player.form) / 3);
                          return (
                            <tr key={player.name} style={{ borderBottom: '1px solid var(--border-color)' }}>
                              <td style={{ padding: 12, fontWeight: 600 }}>{player.name}</td>
                              <td style={{ padding: 12, color: player.batSpeed >= 90 ? 'var(--success-color)' : 'var(--text-secondary)' }}>
                                {player.batSpeed}
                              </td>
                              <td style={{ padding: 12, color: player.consistency >= 90 ? 'var(--success-color)' : 'var(--text-secondary)' }}>
                                {player.consistency}
                              </td>
                              <td style={{ padding: 12, color: player.form >= 90 ? 'var(--success-color)' : 'var(--text-secondary)' }}>
                                {player.form}
                              </td>
                              <td style={{ padding: 12 }}>
                                <span style={{
                                  fontWeight: 700,
                                  color: overallRating >= 85 ? 'var(--success-color)' :
                                    overallRating >= 75 ? 'var(--accent-color)' : 'var(--warning-color)'
                                }}>
                                  {overallRating}/100
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Injury Alerts Summary */}
                <div style={{ marginBottom: 24 }}>
                  <h4 style={{ marginBottom: 16, color: 'var(--warning-color)' }}>
                    <Icon path={mdiAlertCircle} size={0.75} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                    Injury Alerts Summary
                  </h4>
                  <div style={{ padding: 16, background: 'rgba(251, 191, 36, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
                      Current active injury alerts in the team:
                    </p>
                    <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      <li>Rohit Sharma - Shoulder Strain (Moderate) - Recovering</li>
                      <li>Virat Kohli - Wrist Fatigue (Low) - Monitoring</li>
                      <li>KL Rahul - Lower Back Tightness (High) - Rest Required</li>
                    </ul>
                  </div>
                </div>

                {/* Recommendations */}
                <div style={{ marginBottom: 24 }}>
                  <h4 style={{ marginBottom: 16, color: 'var(--accent-color)' }}>Coach Recommendations</h4>
                  <div style={{ padding: 16, background: 'var(--dark-bg)', borderRadius: 'var(--radius-md)' }}>
                    <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.8 }}>
                      <li>Focus on consistency training for Hardik Pandya to match his exceptional bat speed</li>
                      <li>KL Rahul requires medical clearance before returning to full practice</li>
                      <li>Rishabh Pant showing excellent form - consider promoting up the order</li>
                      <li>Team average bat speed improved by 4.2% this month - maintain current training regimen</li>
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div style={{ textAlign: 'center', padding: 16, borderTop: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                  <p>SwingAI - AI-Powered Cricket Swing Analysis</p>
                  <p>Report generated for coaching and performance review purposes</p>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                  <button
                    className="btn-primary"
                    style={{ flex: 1 }}
                    onClick={() => {
                      window.print();
                      setShowReportModal(false);
                    }}
                  >
                    <Icon path={mdiPrinter} size={0.75} style={{ marginRight: 8 }} />
                    Print Report
                  </button>
                  <button
                    className="btn-primary"
                    style={{ flex: 1 }}
                    onClick={() => {
                      alert('Report downloaded as PDF!');
                      setShowReportModal(false);
                    }}
                  >
                    <Icon path={mdiDownload} size={0.75} style={{ marginRight: 8 }} />
                    Download PDF
                  </button>
                  <button
                    style={{
                      padding: '12px 24px',
                      background: 'var(--card-bg)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                    onClick={() => setShowReportModal(false)}
                  >
                    <Icon path={mdiClose} size={0.75} />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </>
      )
      }
    </div >
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@mdi/react';
import { colors } from '../theme';
import {
  mdiTrophy,
  mdiTarget,
  mdiDownload,
  mdiFilter
} from '@mdi/js';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  ComposedChart,
  Area,
  Line
} from 'recharts';

const monthlyData = [
  { month: 'Jan', batSpeed: 78, consistency: 72, average: 75 },
  { month: 'Feb', batSpeed: 82, consistency: 76, average: 79 },
  { month: 'Mar', batSpeed: 85, consistency: 80, average: 82 },
  { month: 'Apr', batSpeed: 88, consistency: 82, average: 85 },
  { month: 'May', batSpeed: 90, consistency: 85, average: 87 },
  { month: 'Jun', batSpeed: 92, consistency: 88, average: 90 },
];

const shotTypeData = [
  { name: 'Front Foot Drive', count: 45, avgScore: 88 },
  { name: 'Cover Drive', count: 38, avgScore: 85 },
  { name: 'Pull Shot', count: 32, avgScore: 82 },
  { name: 'Square Cut', count: 28, avgScore: 86 },
  { name: 'Straight Drive', count: 35, avgScore: 84 },
  { name: 'Hook Shot', count: 22, avgScore: 78 },
  { name: 'Sweep Shot', count: 18, avgScore: 80 },
];

const weeklyActivity = [
  { day: 'Mon', swings: 12, minutes: 45 },
  { day: 'Tue', swings: 15, minutes: 55 },
  { day: 'Wed', swings: 10, minutes: 38 },
  { day: 'Thu', swings: 18, minutes: 62 },
  { day: 'Fri', swings: 14, minutes: 50 },
  { day: 'Sat', swings: 20, minutes: 75 },
  { day: 'Sun', swings: 8, minutes: 30 },
];

const achievements = [
  { id: 1, title: 'First Analysis', description: 'Completed your first swing analysis', icon: '🎯', unlocked: true, date: '2024-01-15' },
  { id: 2, title: 'Speed Demon', description: 'Achieved 90+ km/h bat speed', icon: '⚡', unlocked: true, date: '2024-03-20' },
  { id: 3, title: 'Consistency King', description: 'Maintained 85+ consistency for a week', icon: '👑', unlocked: true, date: '2024-04-10' },
  { id: 4, title: 'Century Club', description: 'Analyzed 100 swings', icon: '💯', unlocked: false, progress: 73 },
  { id: 5, title: 'Perfect Score', description: 'Achieved a perfect 100 score', icon: '🌟', unlocked: false, progress: 87 },
  { id: 6, title: 'Dedication', description: '30-day practice streak', icon: '🔥', unlocked: false, progress: 18 },
];

const milestones = [
  { id: 1, title: 'Joined SwingAI', date: '2024-01-01', description: 'Started your cricket journey' },
  { id: 2, title: 'First 10 Swings', date: '2024-01-15', description: 'Analyzed your first 10 swings' },
  { id: 3, title: 'Speed Milestone', date: '2024-02-20', description: 'Reached 85 km/h average bat speed' },
  { id: 4, title: '50 Swings Analyzed', date: '2024-03-15', description: 'Halfway to century' },
  { id: 5, title: 'Consistency Breakthrough', date: '2024-04-01', description: 'Achieved 80+ consistency score' },
];

const ProgressTracking: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');

  const stats = {
    totalSwings: 247,
    thisWeek: 45,
    avgScore: 84,
    bestScore: 96,
    practiceHours: 28.5,
    streak: 12
  };

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">
          <span className="gradient-text">Progress Tracking</span>
        </h1>
        <p className="page-subtitle">Monitor your improvement journey over time</p>
      </div>

      {/* Quick Stats */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: '2rem' }}>🏏</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Swings</span>
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem' }}>{stats.totalSwings}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success-color)', marginTop: 4 }}>
            +{stats.thisWeek} this week
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: '2rem' }}>🏆</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Average Score</span>
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem' }}>{stats.avgScore}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success-color)', marginTop: 4 }}>
            Best: {stats.bestScore}
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: '2rem' }}>📅</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Practice Time</span>
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem' }}>{stats.practiceHours}h</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            This month
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: '2rem' }}>📈</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Current Streak</span>
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem' }}>{stats.streak} days</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success-color)', marginTop: 4 }}>
            Keep it up! 🔥
          </div>
        </motion.div>
      </div>

      {/* Time Range & Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {['week', 'month', '3months', '6months', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              style={{
                padding: '8px 16px',
                background: timeRange === range ? 'var(--gradient-primary)' : 'var(--card-bg)',
                border: timeRange === range ? 'none' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: timeRange === range ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                textTransform: 'capitalize',
                transition: 'all 0.3s ease'
              }}
            >
              {range.replace('months', 'm').replace('year', '1y')}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            padding: '8px 16px',
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <Icon path={mdiFilter} size={0.75} />
            Filter
          </button>
          <button style={{
            padding: '8px 16px',
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <Icon path={mdiDownload} size={0.75} />
            Export
          </button>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid-2" style={{ marginBottom: 32 }}>
        {/* Performance Trend */}
        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ padding: 24 }}
        >
          <h3 style={{ marginBottom: 8 }}>Performance Trend</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 24 }}>
            Monthly progress overview
          </p>
          <div style={{ height: 300, overflowX: 'auto', overflowY: 'hidden' }}>
            <div style={{ minWidth: 600, height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorBatSpeed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors.legacyBlue} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={colors.legacyBlue} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.chartGrid} />
                  <XAxis dataKey="month" stroke={colors.chartAxis} />
                  <YAxis stroke={colors.chartAxis} domain={[60, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--card-bg)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="batSpeed"
                    name="Bat Speed"
                    stroke={colors.legacyBlue}
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorBatSpeed)"
                  />
                  <Line
                    type="monotone"
                    dataKey="consistency"
                    name="Consistency"
                    stroke={colors.legacyTeal}
                    strokeWidth={3}
                    dot={{ fill: colors.legacyTeal, strokeWidth: 2 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Weekly Activity */}
        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ padding: 24 }}
        >
          <h3 style={{ marginBottom: 8 }}>Weekly Activity</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 24 }}>
            Swings analyzed this week
          </p>
          <div style={{ height: 300, overflowX: 'auto', overflowY: 'hidden' }}>
            <div style={{ minWidth: 600, height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.chartGrid} />
                  <XAxis dataKey="day" stroke={colors.chartAxis} />
                  <YAxis stroke={colors.chartAxis} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--card-bg)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="swings" name="Swings" fill={colors.legacyBlue} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="minutes" name="Minutes" fill={colors.legacyTeal} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Shot Type Analysis */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: 24, marginBottom: 32 }}
      >
        <h3 style={{ marginBottom: 8 }}>Shot Type Analysis</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 24 }}>
          Performance by shot type
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Shot Type</th>
                <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Times Played</th>
                <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Avg Score</th>
                <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Performance</th>
              </tr>
            </thead>
            <tbody>
              {shotTypeData.map((shot) => (
                <tr key={shot.name} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: 16, fontWeight: 500 }}>{shot.name}</td>
                  <td style={{ padding: 16, color: 'var(--text-secondary)' }}>{shot.count}</td>
                  <td style={{ padding: 16 }}>
                    <span style={{
                      fontWeight: 700,
                      color: shot.avgScore >= 85 ? 'var(--success-color)' :
                        shot.avgScore >= 75 ? 'var(--primary-color)' : 'var(--warning-color)'
                    }}>
                      {shot.avgScore}
                    </span>
                  </td>
                  <td style={{ padding: 16 }}>
                    <div className="progress-bar" style={{ width: 150 }}>
                      <div
                        className="progress-fill"
                        style={{
                          width: `${shot.avgScore}%`,
                          background: shot.avgScore >= 85 ? 'var(--success-color)' :
                            shot.avgScore >= 75 ? 'var(--primary-color)' : 'var(--warning-color)'
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div >

      {/* Achievements & Milestones */}
      < div className="grid-2" style={{ marginBottom: 32 }}>
        {/* Achievements */}
        < motion.div
          className="card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ padding: 24 }}
        >
          <h3 style={{ marginBottom: 24 }}>
            <Icon path={mdiTrophy} size={1} style={{ marginRight: 8, verticalAlign: 'middle' }} />
            Achievements
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                style={{
                  padding: '8px 0',
                  opacity: achievement.unlocked ? 1 : 0.6
                }}
              >
                <div className="emoji-icon" style={{ fontSize: '2.5rem', marginBottom: 16 }}>{achievement.icon}</div>
                <h4 style={{ fontSize: '1rem', marginBottom: 6, color: achievement.unlocked ? 'var(--success-color)' : 'var(--text-primary)' }}>{achievement.title}</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
                  {achievement.description}
                </p>
                {!achievement.unlocked && achievement.progress !== undefined && (
                  <>
                    <div className="progress-bar" style={{ marginBottom: 4 }}>
                      <div className="progress-fill" style={{ width: `${achievement.progress}%` }} />
                    </div>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-secondary)' }}>
                      {achievement.progress}% complete
                    </span>
                  </>
                )}
                {achievement.unlocked && (
                  <span style={{ fontSize: '0.625rem', color: 'var(--success-color)' }}>
                    Unlocked {achievement.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div >

        {/* Milestones Timeline */}
        < motion.div
          className="card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ padding: 24 }}
        >
          <h3 style={{ marginBottom: 24 }}>
            <Icon path={mdiTarget} size={1} style={{ marginRight: 8, verticalAlign: 'middle' }} />
            Milestones
          </h3>
          <div style={{ position: 'relative', paddingLeft: 24 }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              left: 7,
              top: 0,
              bottom: 0,
              width: 2,
              background: 'var(--border-color)'
            }} />

            {milestones.map((milestone, index) => (
              <div key={milestone.id} style={{
                position: 'relative',
                marginBottom: 24,
                paddingBottom: index < milestones.length - 1 ? 0 : 0
              }}>
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: -24,
                  top: 0,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: 'var(--gradient-primary)',
                  border: '3px solid var(--card-bg)'
                }} />

                <div style={{ marginLeft: 16 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {milestone.date}
                  </span>
                  <h4 style={{ fontSize: '1rem', marginBottom: 4 }}>{milestone.title}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div >
      </div >

      {/* Goals Section */}
      < motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: 24 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3>Current Goals</h3>
          <button className="btn-primary">
            <Icon path={mdiTarget} size={0.75} style={{ marginRight: 8 }} />
            Set New Goal
          </button>
        </div>

        <div className="grid-3">
          <div style={{ padding: 20, background: 'var(--card-bg)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: '0.875rem' }}>Bat Speed Target</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--success-color)' }}>95 km/h</span>
            </div>
            <div className="progress-bar" style={{ marginBottom: 8 }}>
              <div className="progress-fill" style={{ width: '92%' }} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Current: 91.4 km/h
            </span>
          </div>

          <div style={{ padding: 20, background: 'var(--card-bg)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: '0.875rem' }}>Consistency Goal</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--primary-color)' }}>90/100</span>
            </div>
            <div className="progress-bar" style={{ marginBottom: 8 }}>
              <div className="progress-fill" style={{ width: '86%', background: 'var(--primary-color)' }} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Current: 86/100
            </span>
          </div>

          <div style={{ padding: 20, background: 'var(--card-bg)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: '0.875rem' }}>Weekly Practice</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--accent-color)' }}>15 hours</span>
            </div>
            <div className="progress-bar" style={{ marginBottom: 8 }}>
              <div className="progress-fill" style={{ width: '70%', background: 'var(--accent-color)' }} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Current: 10.5 hours
            </span>
          </div>
        </div>
      </motion.div >
    </div >
  );
};

export default ProgressTracking;

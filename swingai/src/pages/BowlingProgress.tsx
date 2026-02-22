import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@mdi/react';
import { colors } from '../theme';
import {
  mdiTrendingUp,
  mdiTrophy,
  mdiTarget,
  mdiCricket,
  mdiSpeedometer
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
  { month: 'Jan', bowlSpeed: 78, accuracy: 72, economy: 7.5 },
  { month: 'Feb', bowlSpeed: 80, accuracy: 75, economy: 7.2 },
  { month: 'Mar', bowlSpeed: 82, accuracy: 78, economy: 6.8 },
  { month: 'Apr', bowlSpeed: 84, accuracy: 80, economy: 6.5 },
  { month: 'May', bowlSpeed: 85, accuracy: 82, economy: 6.2 },
  { month: 'Jun', bowlSpeed: 86, accuracy: 85, economy: 6.0 },
];

const deliveryTypeData = [
  { name: 'Yorker', count: 45, accuracy: 82 },
  { name: 'Good Length', count: 68, accuracy: 88 },
  { name: 'Bouncer', count: 32, accuracy: 75 },
  { name: 'Full Toss', count: 18, accuracy: 65 },
  { name: 'Slower Ball', count: 25, accuracy: 78 },
  { name: 'Inswinger', count: 28, accuracy: 80 },
  { name: 'Outswinger', count: 30, accuracy: 82 },
];

const weeklyActivity = [
  { day: 'Mon', deliveries: 85, overs: 14 },
  { day: 'Tue', deliveries: 95, overs: 16 },
  { day: 'Wed', deliveries: 75, overs: 12 },
  { day: 'Thu', deliveries: 105, overs: 17 },
  { day: 'Fri', deliveries: 90, overs: 15 },
  { day: 'Sat', deliveries: 120, overs: 20 },
  { day: 'Sun', deliveries: 60, overs: 10 },
];

const achievements = [
  { id: 1, title: 'First Bowling Analysis', description: 'Completed your first bowling analysis', icon: '🎯', unlocked: true, date: '2024-01-15' },
  { id: 2, title: 'Speed Demon', description: 'Bowled at 90+ km/h', icon: '⚡', unlocked: true, date: '2024-03-20' },
  { id: 3, title: 'Accuracy King', description: 'Achieved 85%+ accuracy', icon: '👑', unlocked: true, date: '2024-04-10' },
  { id: 4, title: 'Century Club', description: 'Bowled 100 overs', icon: '💯', unlocked: false, progress: 68 },
  { id: 5, title: 'Maiden Master', description: 'Bowled a maiden over', icon: '🌟', unlocked: false, progress: 0 },
  { id: 6, title: 'Wicket Taker', description: 'Took 50 wickets in practice', icon: '🏏', unlocked: false, progress: 32 },
];

const BowlingProgress: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');

  const stats = {
    totalDeliveries: 1847,
    thisWeek: 320,
    avgSpeed: 84,
    bestSpeed: 92,
    oversBowled: 156,
    accuracy: 82,
    streak: 8
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-title">
          <span className="gradient-text" style={{ color: colors.bowling }}>Bowling Progress</span>
        </h1>
        <p className="page-subtitle">Track your bowling improvement over time</p>
      </div>

      <div className="grid-4" style={{ marginBottom: 32 }}>
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 40, height: 40,
              borderRadius: 'var(--radius-md)',
              background: colors.bowling + '20',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Icon path={mdiSpeedometer} size={1} color={colors.bowling} />
            </div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Avg Speed</span>
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem', color: colors.bowling }}>{stats.avgSpeed}</div>
          <div style={{ fontSize: '0.75rem', color: colors.success, marginTop: 4 }}>
            Best: {stats.bestSpeed} km/h
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 40, height: 40,
              borderRadius: 'var(--radius-md)',
              background: colors.success + '20',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Icon path={mdiTarget} size={1} color={colors.success} />
            </div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Accuracy</span>
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem', color: colors.success }}>{stats.accuracy}%</div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 40, height: 40,
              borderRadius: 'var(--radius-md)',
              background: colors.warning + '20',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Icon path={mdiCricket} size={1} color={colors.warning} />
            </div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Overs Bowled</span>
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem', color: colors.warning }}>{stats.oversBowled}</div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 40, height: 40,
              borderRadius: 'var(--radius-md)',
              background: colors.info + '20',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Icon path={mdiTrendingUp} size={1} color={colors.info} />
            </div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Current Streak</span>
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem', color: colors.info }}>{stats.streak} days</div>
        </motion.div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {(['week', 'month', '3months', '6months', 'year'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            style={{
              padding: '8px 16px',
              background: timeRange === range ? colors.bowling : 'var(--card-bg)',
              border: timeRange === range ? 'none' : '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              color: timeRange === range ? '#000' : 'var(--text-secondary)',
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

      <div className="grid-2" style={{ marginBottom: 32 }}>
        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ padding: 24 }}
        >
          <h3 style={{ marginBottom: 8, color: colors.bowling }}>Speed Trend</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 24 }}>
            Average bowling speed over time
          </p>
          <div style={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.bowling} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={colors.bowling} stopOpacity={0} />
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
                  dataKey="bowlSpeed"
                  name="Speed"
                  stroke={colors.bowling}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSpeed)"
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  name="Accuracy"
                  stroke={colors.success}
                  strokeWidth={3}
                  dot={{ fill: colors.success, strokeWidth: 2 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ padding: 24 }}
        >
          <h3 style={{ marginBottom: 8, color: colors.bowling }}>Weekly Activity</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 24 }}>
            Deliveries bowled this week
          </p>
          <div style={{ height: 250 }}>
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
                <Bar dataKey="deliveries" name="Deliveries" fill={colors.bowling} radius={[4, 4, 0, 0]} />
                <Bar dataKey="overs" name="Overs" fill={colors.bowlingLight} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: 24, marginBottom: 32 }}
      >
        <h3 style={{ marginBottom: 8, color: colors.bowling }}>Delivery Type Analysis</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 24 }}>
          Performance by delivery type
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Delivery Type</th>
                <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Times Bowled</th>
                <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Accuracy</th>
                <th style={{ padding: 12, textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600 }}>Performance</th>
              </tr>
            </thead>
            <tbody>
              {deliveryTypeData.map((delivery) => (
                <tr key={delivery.name} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: 16, fontWeight: 500 }}>{delivery.name}</td>
                  <td style={{ padding: 16, color: 'var(--text-secondary)' }}>{delivery.count}</td>
                  <td style={{ padding: 16 }}>
                    <span style={{
                      fontWeight: 700,
                      color: delivery.accuracy >= 85 ? colors.success :
                        delivery.accuracy >= 75 ? colors.bowling : colors.warning
                    }}>
                      {delivery.accuracy}%
                    </span>
                  </td>
                  <td style={{ padding: 16 }}>
                    <div className="progress-bar" style={{ width: 150 }}>
                      <div
                        className="progress-fill"
                        style={{
                          width: `${delivery.accuracy}%`,
                          background: delivery.accuracy >= 85 ? colors.success :
                            delivery.accuracy >= 75 ? colors.bowling : colors.warning
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="grid-2" style={{ marginBottom: 32 }}>
        <motion.div
          className="card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ padding: 24 }}
        >
          <h3 style={{ marginBottom: 24 }}>
            <Icon path={mdiTrophy} size={1} style={{ marginRight: 8, verticalAlign: 'middle', color: colors.bowling }} />
            Bowling Achievements
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                style={{
                  padding: 16,
                  background: achievement.unlocked ? colors.bowling + '15' : 'var(--card-bg)',
                  border: `1px solid ${achievement.unlocked ? colors.bowling : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius-md)',
                  opacity: achievement.unlocked ? 1 : 0.6
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 8 }}>{achievement.icon}</div>
                <h4 style={{ fontSize: '0.875rem', marginBottom: 4 }}>{achievement.title}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
                  {achievement.description}
                </p>
                {!achievement.unlocked && achievement.progress !== undefined && (
                  <>
                    <div className="progress-bar" style={{ marginBottom: 4 }}>
                      <div className="progress-fill" style={{ width: `${achievement.progress}%`, background: colors.bowling }} />
                    </div>
                    <span style={{ fontSize: '0.625rem', color: 'var(--text-secondary)' }}>
                      {achievement.progress}% complete
                    </span>
                  </>
                )}
                {achievement.unlocked && (
                  <span style={{ fontSize: '0.625rem', color: colors.success }}>
                    Unlocked {achievement.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ padding: 24 }}
        >
          <h3 style={{ marginBottom: 24 }}>
            <Icon path={mdiTarget} size={1} style={{ marginRight: 8, verticalAlign: 'middle', color: colors.bowling }} />
            Bowling Goals
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ padding: 16, background: 'var(--card-bg)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.875rem' }}>Target Speed</span>
                <span style={{ fontSize: '0.875rem', color: colors.bowling }}>90 km/h</span>
              </div>
              <div className="progress-bar" style={{ marginBottom: 8 }}>
                <div className="progress-fill" style={{ width: '93%', background: colors.bowling }} />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Current: 84 km/h
              </span>
            </div>

            <div style={{ padding: 16, background: 'var(--card-bg)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.875rem' }}>Accuracy Target</span>
                <span style={{ fontSize: '0.875rem', color: colors.success }}>85%</span>
              </div>
              <div className="progress-bar" style={{ marginBottom: 8 }}>
                <div className="progress-fill" style={{ width: '96%', background: colors.success }} />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Current: 82%
              </span>
            </div>

            <div style={{ padding: 16, background: 'var(--card-bg)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.875rem' }}>Weekly Overs</span>
                <span style={{ fontSize: '0.875rem', color: colors.warning }}>20 overs</span>
              </div>
              <div className="progress-bar" style={{ marginBottom: 8 }}>
                <div className="progress-fill" style={{ width: '80%', background: colors.warning }} />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Current: 16 overs
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BowlingProgress;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@mdi/react';
import { colors } from '../theme';
import {
  mdiAccount,
  mdiBell,
  mdiPalette,
  mdiShield,
  mdiDatabase,
  mdiHelpCircle,
  mdiInformation,
  mdiLogout,
  mdiChevronRight,
  mdiCamera,
  mdiCricket,
  mdiTrophy,
  mdiTarget
} from '@mdi/js';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weeklyReport: true,
    achievements: true,
    reminders: false
  });

  const [profile, setProfile] = useState({
    name: 'Jonathan Doeseph',
    email: 'john_doe@example.com',
    battingStyle: 'Right-handed',
    role: 'Top Order Batsman',
    experience: '5 years'
  });

  const [goals, setGoals] = useState({
    batSpeed: 95,
    consistency: 90,
    practiceHours: 15
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: mdiAccount },
    { id: 'goals', label: 'Goals', icon: mdiTarget },
    { id: 'notifications', label: 'Notifications', icon: mdiBell },
    { id: 'appearance', label: 'Appearance', icon: mdiPalette },
    { id: 'privacy', label: 'Privacy', icon: mdiShield },
    { id: 'data', label: 'Data', icon: mdiDatabase },
    { id: 'about', label: 'About', icon: mdiInformation },
  ];

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">
          <span className="gradient-text">Settings</span>
        </h1>
        <p className="page-subtitle">Customize your SwingAI experience</p>
      </div>

      <div className="grid-4" style={{ gap: 32 }}>
        {/* Sidebar Tabs */}
        <div style={{ gridColumn: 'span 1' }}>
          <div className="card" style={{ padding: 16 }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 14,
                  marginBottom: 4,
                  background: activeTab === tab.id ? 'var(--card-hover)' : 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s ease'
                }}
              >
                <Icon path={tab.icon} size={1} color={activeTab === tab.id ? 'var(--primary-color)' : 'var(--text-secondary)'} />
                <span style={{ fontWeight: 500 }}>{tab.label}</span>
                {activeTab === tab.id && (
                  <Icon path={mdiChevronRight} size={1} style={{ marginLeft: 'auto', color: 'var(--primary-color)' }} />
                )}
              </button>
            ))}

            <div style={{ borderTop: '1px solid var(--border-color)', marginTop: 16, paddingTop: 16 }}>
              <button
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 14,
                  background: 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--danger-color)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s ease'
                }}
              >
                <Icon path={mdiLogout} size={1} />
                <span style={{ fontWeight: 500 }}>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ gridColumn: 'span 3' }}>
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
              style={{ padding: 32 }}
            >
              <h3 style={{ marginBottom: 24 }}>Profile Settings</h3>
              
              {/* Profile Picture */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
                <div style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'var(--gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'white'
                }}>
                  JD
                </div>
                <div>
                  <button className="btn-primary" style={{ marginBottom: 8 }}>
                    <Icon path={mdiCamera} size={0.75} style={{ marginRight: 8 }} />
                    Change Photo
                  </button>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div style={{ display: 'grid', gap: 24 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: 14,
                      background: 'var(--card-bg)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: 14,
                      background: 'var(--card-bg)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div className="grid-2">
                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Batting Style</label>
                    <select
                      value={profile.battingStyle}
                      onChange={(e) => setProfile({ ...profile, battingStyle: e.target.value })}
                      style={{
                        width: '100%',
                        padding: 14,
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--text-primary)',
                        fontSize: '1rem',
                        cursor: 'pointer'
                      }}
                    >
                      <option>Right-handed</option>
                      <option>Left-handed</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Role</label>
                    <select
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      style={{
                        width: '100%',
                        padding: 14,
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--text-primary)',
                        fontSize: '1rem',
                        cursor: 'pointer'
                      }}
                    >
                      <option>Top Order Batsman</option>
                      <option>Middle Order Batsman</option>
                      <option>Finisher</option>
                      <option>All-rounder</option>
                      <option>Wicket-keeper Batsman</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Experience Level</label>
                  <select
                    value={profile.experience}
                    onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                    style={{
                      width: '100%',
                      padding: 14,
                      background: 'var(--card-bg)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    <option>Beginner (&lt;1 year)</option>
                    <option>Intermediate (1-3 years)</option>
                    <option>Advanced (3-5 years)</option>
                    <option>Expert (5+ years)</option>
                  </select>
                </div>

                <button className="btn-primary" style={{ marginTop: 16 }}>
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'goals' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
              style={{ padding: 32 }}
            >
              <h3 style={{ marginBottom: 8 }}>Performance Goals</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
                Set your targets and track your progress
              </p>
              
              <div style={{ display: 'grid', gap: 24 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <label style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Icon path={mdiCricket} size={0.75} color="var(--primary-color)" />
                      Target Bat Speed (km/h)
                    </label>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-color)' }}>
                      {goals.batSpeed}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="120"
                    value={goals.batSpeed}
                    onChange={(e) => setGoals({ ...goals, batSpeed: parseInt(e.target.value) })}
                    style={{ width: '100%', accentColor: 'var(--primary-color)' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>60 km/h</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>120 km/h</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <label style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Icon path={mdiTarget} size={0.75} color="var(--secondary-color)" />
                      Target Consistency Score
                    </label>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--secondary-color)' }}>
                      {goals.consistency}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={goals.consistency}
                    onChange={(e) => setGoals({ ...goals, consistency: parseInt(e.target.value) })}
                    style={{ width: '100%', accentColor: 'var(--secondary-color)' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>50</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>100</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <label style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Icon path={mdiTrophy} size={0.75} color="var(--accent-color)" />
                      Weekly Practice Hours
                    </label>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-color)' }}>
                      {goals.practiceHours}h
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={goals.practiceHours}
                    onChange={(e) => setGoals({ ...goals, practiceHours: parseInt(e.target.value) })}
                    style={{ width: '100%', accentColor: 'var(--accent-color)' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>1h</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>30h</span>
                  </div>
                </div>

                <button className="btn-primary" style={{ marginTop: 16 }}>
                  Update Goals
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
              style={{ padding: 32 }}
            >
              <h3 style={{ marginBottom: 8 }}>Notification Preferences</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
                Choose how you want to stay updated
              </p>
              
              <div style={{ display: 'grid', gap: 16 }}>
                {Object.entries(notifications).map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 16,
                      background: 'var(--card-bg)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <div>
                      <h4 style={{ marginBottom: 4, textTransform: 'capitalize' }}>
                        {key.replace(/([A-Z])/g, ' $1')}
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {key === 'email' && 'Receive analysis reports via email'}
                        {key === 'push' && 'Get instant notifications on your device'}
                        {key === 'weeklyReport' && 'Weekly progress summary every Monday'}
                        {key === 'achievements' && 'Celebrations when you unlock achievements'}
                        {key === 'reminders' && 'Daily practice reminders'}
                      </p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [key]: !value })}
                      style={{
                        width: 56,
                        height: 28,
                        borderRadius: 14,
                        background: value ? 'var(--gradient-primary)' : 'var(--border-color)',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: 3,
                          left: value ? 31 : 3,
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          background: 'white',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <button className="btn-primary" style={{ marginTop: 24 }}>
                Save Preferences
              </button>
            </motion.div>
          )}

          {activeTab === 'appearance' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
              style={{ padding: 32 }}
            >
              <h3 style={{ marginBottom: 8 }}>Appearance</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
                Customize how SwingAI looks
              </p>
              
              <div style={{ display: 'grid', gap: 24 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 12, fontWeight: 500 }}>Theme</label>
                  <div className="grid-3" style={{ gap: 16 }}>
                    <div
                      style={{
                        padding: 20,
                        background: 'var(--card-bg)',
                        border: '2px solid var(--primary-color)',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ width: 40, height: 40, background: colors.darkNeutral, borderRadius: '50%', margin: '0 auto 12px' }} />
                      <span>Dark</span>
                    </div>
                    <div
                      style={{
                        padding: 20,
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                        cursor: 'pointer',
                        opacity: 0.5
                      }}
                    >
                      <div style={{ width: 40, height: 40, background: colors.textPrimary, borderRadius: '50%', margin: '0 auto 12px' }} />
                      <span>Light</span>
                    </div>
                    <div
                      style={{
                        padding: 20,
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                        cursor: 'pointer',
                        opacity: 0.5
                      }}
                    >
                      <div style={{
                        width: 40,
                        height: 40,
                        background: `linear-gradient(135deg, ${colors.darkNeutral} 50%, ${colors.textPrimary} 50%)`,
                        borderRadius: '50%',
                        margin: '0 auto 12px'
                      }} />
                      <span>Auto</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 12, fontWeight: 500 }}>Accent Color</label>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {colors.colorPickerOptions.map((color) => (
                      <button
                        key={color}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          background: color,
                          border: color === colors.colorPickerOptions[0] ? '3px solid white' : '3px solid transparent',
                          cursor: 'pointer',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'privacy' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
              style={{ padding: 32 }}
            >
              <h3 style={{ marginBottom: 8 }}>Privacy Settings</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
                Control your data and privacy
              </p>
              
              <div style={{ display: 'grid', gap: 16 }}>
                <div
                  style={{
                    padding: 20,
                    background: 'var(--card-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <h4 style={{ marginBottom: 8 }}>Profile Visibility</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
                    Choose who can see your profile and statistics
                  </p>
                  <select
                    style={{
                      width: '100%',
                      padding: 12,
                      background: 'var(--dark-bg)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    <option>Private (Only me)</option>
                    <option>Friends Only</option>
                    <option>Public</option>
                  </select>
                </div>

                <div
                  style={{
                    padding: 20,
                    background: 'var(--card-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <h4 style={{ marginBottom: 8 }}>Share Analysis Data</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
                    Allow SwingAI to use your data for model improvement
                  </p>
                  <button
                    style={{
                      width: 56,
                      height: 28,
                      borderRadius: 14,
                      background: 'var(--gradient-primary)',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 3,
                        left: 31,
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: 'white',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </button>
                </div>

                <div
                  style={{
                    padding: 20,
                    background: 'var(--card-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <h4 style={{ marginBottom: 8 }}>Download My Data</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
                    Get a copy of all your swing analysis data
                  </p>
                  <button className="btn-primary">
                    <Icon path={mdiDatabase} size={0.75} style={{ marginRight: 8 }} />
                    Export Data
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'data' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
              style={{ padding: 32 }}
            >
              <h3 style={{ marginBottom: 8 }}>Data Management</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
                Manage your stored data and videos
              </p>
              
              <div style={{ display: 'grid', gap: 16 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 20,
                    background: 'var(--card-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div>
                    <h4>Storage Used</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      2.4 GB of 5 GB used
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="progress-bar" style={{ width: 150, marginBottom: 8 }}>
                      <div className="progress-fill" style={{ width: '48%' }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>48%</span>
                  </div>
                </div>

                <div
                  style={{
                    padding: 20,
                    background: 'var(--card-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <h4 style={{ marginBottom: 8 }}>Clear Cache</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
                    Remove temporary files to free up space
                  </p>
                  <button
                    style={{
                      padding: '10px 20px',
                      background: 'var(--card-bg)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    Clear Cache (245 MB)
                  </button>
                </div>

                <div
                  style={{
                    padding: 20,
                    background: 'var(--card-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <h4 style={{ marginBottom: 8, color: 'var(--danger-color)' }}>Delete All Data</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
                    Permanently delete all your swings, videos, and progress. This cannot be undone.
                  </p>
                  <button
                    style={{
                      padding: '10px 20px',
                      background: 'var(--danger-color)',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    Delete All Data
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
              style={{ padding: 32 }}
            >
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <div style={{
                  width: 100,
                  height: 100,
                  margin: '0 auto 24px',
                  background: 'var(--gradient-primary)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon path={mdiCricket} size={3} color="white" />
                </div>
                <h2 style={{ marginBottom: 8 }}>SwingAI</h2>
                <p style={{ color: 'var(--text-secondary)' }}>AI-Powered Cricket Swing Analysis</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 8 }}>
                  Version 1.0.0
                </p>
              </div>

              <div style={{ display: 'grid', gap: 16 }}>
                <a
                  href="#"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 16,
                    background: 'var(--card-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none'
                  }}
                >
                  <span>Help Center</span>
                  <Icon path={mdiChevronRight} size={1} color="var(--text-secondary)" />
                </a>

                <a
                  href="#"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 16,
                    background: 'var(--card-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none'
                  }}
                >
                  <span>Privacy Policy</span>
                  <Icon path={mdiChevronRight} size={1} color="var(--text-secondary)" />
                </a>

                <a
                  href="#"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 16,
                    background: 'var(--card-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none'
                  }}
                >
                  <span>Terms of Service</span>
                  <Icon path={mdiChevronRight} size={1} color="var(--text-secondary)" />
                </a>

                <a
                  href="#"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 16,
                    background: 'var(--card-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none'
                  }}
                >
                  <span>Rate on App Store</span>
                  <Icon path={mdiChevronRight} size={1} color="var(--text-secondary)" />
                </a>
              </div>

              <div style={{ marginTop: 32, textAlign: 'center', padding: 24, background: 'var(--card-bg)', borderRadius: 'var(--radius-md)' }}>
                <Icon path={mdiHelpCircle} size={2} color="var(--text-secondary)" style={{ marginBottom: 16 }} />
                <h4>Need Help?</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
                  Our support team is here to help you
                </p>
                <button className="btn-primary">
                  Contact Support
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@mdi/react';
import { colors } from '../theme';
import {
  mdiAccountGroup,
  mdiPlus,
  mdiTrashCan,
  mdiMagnify,
  mdiChevronRight,
  mdiClose,
  mdiCheck,
  mdiCricket,
  mdiChartBar
} from '@mdi/js';
import { useNavigate } from 'react-router-dom';

interface Player {
  id: number;
  name: string;
  role: string;
  battingStyle: string;
  age: number;
  matchesPlayed: number;
  avgScore: number;
  batSpeed: number;
  consistency: number;
  form: number;
  injuryStatus: 'fit' | 'minor' | 'major';
  joinDate: string;
  email: string;
  phone: string;
}

const initialPlayers: Player[] = [
  { 
    id: 1, 
    name: 'Rohit Sharma', 
    role: 'Opening Batsman', 
    battingStyle: 'Right-handed',
    age: 36,
    matchesPlayed: 24,
    avgScore: 88,
    batSpeed: 92,
    consistency: 88,
    form: 90,
    injuryStatus: 'fit',
    joinDate: '2024-01-15',
    email: 'rohit.sharma@team.com',
    phone: '+91 98765 43210'
  },
  { 
    id: 2, 
    name: 'Virat Kohli', 
    role: 'Top Order Batsman', 
    battingStyle: 'Right-handed',
    age: 35,
    matchesPlayed: 28,
    avgScore: 92,
    batSpeed: 89,
    consistency: 92,
    form: 88,
    injuryStatus: 'minor',
    joinDate: '2024-01-10',
    email: 'virat.kohli@team.com',
    phone: '+91 98765 43211'
  },
  { 
    id: 3, 
    name: 'KL Rahul', 
    role: 'Wicket-keeper Batsman', 
    battingStyle: 'Right-handed',
    age: 31,
    matchesPlayed: 20,
    avgScore: 82,
    batSpeed: 87,
    consistency: 85,
    form: 82,
    injuryStatus: 'major',
    joinDate: '2024-01-20',
    email: 'kl.rahul@team.com',
    phone: '+91 98765 43212'
  },
  { 
    id: 4, 
    name: 'Shreyas Iyer', 
    role: 'Middle Order Batsman', 
    battingStyle: 'Right-handed',
    age: 29,
    matchesPlayed: 18,
    avgScore: 84,
    batSpeed: 85,
    consistency: 83,
    form: 85,
    injuryStatus: 'fit',
    joinDate: '2024-02-01',
    email: 'shreyas.iyer@team.com',
    phone: '+91 98765 43213'
  },
  { 
    id: 5, 
    name: 'Hardik Pandya', 
    role: 'All-rounder', 
    battingStyle: 'Right-handed',
    age: 30,
    matchesPlayed: 22,
    avgScore: 86,
    batSpeed: 94,
    consistency: 80,
    form: 87,
    injuryStatus: 'fit',
    joinDate: '2024-01-25',
    email: 'hardik.pandya@team.com',
    phone: '+91 98765 43214'
  },
  { 
    id: 6, 
    name: 'Rishabh Pant', 
    role: 'Wicket-keeper Batsman', 
    battingStyle: 'Left-handed',
    age: 26,
    matchesPlayed: 19,
    avgScore: 87,
    batSpeed: 91,
    consistency: 86,
    form: 89,
    injuryStatus: 'fit',
    joinDate: '2024-02-05',
    email: 'rishabh.pant@team.com',
    phone: '+91 98765 43215'
  },
];

const TeamManagement: React.FC = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'fit' | 'minor' | 'major'>('all');

  const [newPlayer, setNewPlayer] = useState<Partial<Player>>({
    name: '',
    role: 'Batsman',
    battingStyle: 'Right-handed',
    age: 25,
    email: '',
    phone: ''
  });

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || player.injuryStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddPlayer = () => {
    const player: Player = {
      id: Math.max(...players.map(p => p.id)) + 1,
      name: newPlayer.name || 'New Player',
      role: newPlayer.role || 'Batsman',
      battingStyle: newPlayer.battingStyle || 'Right-handed',
      age: newPlayer.age || 25,
      matchesPlayed: 0,
      avgScore: 0,
      batSpeed: 70,
      consistency: 60,
      form: 50,
      injuryStatus: 'fit',
      joinDate: new Date().toISOString().split('T')[0],
      email: newPlayer.email || '',
      phone: newPlayer.phone || ''
    };
    setPlayers([...players, player]);
    setShowAddModal(false);
    setNewPlayer({ name: '', role: 'Batsman', battingStyle: 'Right-handed', age: 25, email: '', phone: '' });
  };

  const handleRemovePlayer = (id: number) => {
    if (confirm('Are you sure you want to remove this player from the team?')) {
      setPlayers(players.filter(p => p.id !== id));
    }
  };

  const getInjuryColor = (status: string) => {
    switch(status) {
      case 'fit': return colors.injuryFit;
      case 'minor': return colors.injuryMinor;
      case 'major': return colors.injuryMajor;
      default: return colors.injuryDefault;
    }
  };

  const getOverallRating = (player: Player) => {
    return Math.round((player.batSpeed + player.consistency + player.form) / 3);
  };

  const stats = {
    totalPlayers: players.length,
    fitPlayers: players.filter(p => p.injuryStatus === 'fit').length,
    avgTeamBatSpeed: Math.round(players.reduce((sum, p) => sum + p.batSpeed, 0) / players.length),
    avgTeamConsistency: Math.round(players.reduce((sum, p) => sum + p.consistency, 0) / players.length)
  };

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 className="page-title">
              <span className="gradient-text">Team Management</span>
            </h1>
            <p className="page-subtitle">Manage your team roster and player details</p>
          </div>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            <Icon path={mdiPlus} size={0.75} style={{ marginRight: 8 }} />
            Add Player
          </button>
        </div>
      </div>

      {/* Team Stats */}
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
              background: 'rgba(206, 237, 123, 0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Icon path={mdiAccountGroup} size={1} color="var(--accent-color)" />
            </div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Players</span>
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem' }}>{stats.totalPlayers}</div>
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
              background: 'rgba(74, 222, 128, 0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Icon path={mdiCheck} size={1} color="var(--success-color)" />
            </div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Fit Players</span>
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem' }}>{stats.fitPlayers}</div>
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
              background: 'rgba(206, 237, 123, 0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Icon path={mdiCricket} size={1} color="var(--accent-color)" />
            </div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Avg Bat Speed</span>
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem' }}>{stats.avgTeamBatSpeed}</div>
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
              background: 'rgba(74, 222, 128, 0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Icon path={mdiChartBar} size={1} color="var(--success-color)" />
            </div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Avg Consistency</span>
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem' }}>{stats.avgTeamConsistency}</div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 250 }}>
            <div style={{ position: 'relative' }}>
              <Icon 
                path={mdiMagnify} 
                size={0.75} 
                style={{ 
                  position: 'absolute', 
                  left: 12, 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: 'var(--text-secondary)'
                }} 
              />
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  background: 'var(--dark-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['all', 'fit', 'minor', 'major'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  padding: '10px 16px',
                  background: filterStatus === status ? 'var(--gradient-accent)' : 'var(--card-bg)',
                  border: filterStatus === status ? 'none' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: filterStatus === status ? 'var(--primary-color)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  transition: 'all 0.3s ease'
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid-3" style={{ marginBottom: 32 }}>
        <AnimatePresence>
          {filteredPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              style={{ padding: 24, cursor: 'pointer' }}
              onClick={() => navigate(`/team/${player.id}`)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: '50%', 
                  background: 'var(--gradient-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--primary-color)'
                }}>
                  {player.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span 
                  className="badge"
                  style={{ 
                    background: getInjuryColor(player.injuryStatus) + '20',
                    color: getInjuryColor(player.injuryStatus),
                    textTransform: 'capitalize'
                  }}
                >
                  {player.injuryStatus}
                </span>
              </div>

              <h3 style={{ marginBottom: 4 }}>{player.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 16 }}>
                {player.role} • {player.battingStyle}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Bat Speed</span>
                  <div style={{ fontWeight: 600, color: 'var(--accent-color)' }}>{player.batSpeed}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Consistency</span>
                  <div style={{ fontWeight: 600, color: 'var(--success-color)' }}>{player.consistency}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Form</span>
                  <div style={{ fontWeight: 600, color: 'var(--warning-color)' }}>{player.form}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Rating</span>
                  <div style={{ fontWeight: 700, color: getInjuryColor(getOverallRating(player) >= 85 ? 'fit' : getOverallRating(player) >= 70 ? 'minor' : 'major') }}>
                    {getOverallRating(player)}/100
                  </div>
                </div>
              </div>

              <div className="progress-bar" style={{ marginBottom: 16 }}>
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${getOverallRating(player)}%`,
                    background: getOverallRating(player) >= 85 ? 'var(--success-color)' : 
                               getOverallRating(player) >= 70 ? 'var(--accent-color)' : 'var(--warning-color)'
                  }} 
                />
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button 
                  className="btn-primary"
                  style={{ flex: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/team/${player.id}`);
                  }}
                >
                  <Icon path={mdiChevronRight} size={0.75} style={{ marginRight: 4 }} />
                  View Profile
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemovePlayer(player.id);
                  }}
                  style={{
                    padding: '10px 12px',
                    background: 'rgba(248, 113, 113, 0.2)',
                    border: '1px solid var(--danger-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--danger-color)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Icon path={mdiTrashCan} size={0.75} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredPlayers.length === 0 && (
        <div className="card" style={{ padding: 48, textAlign: 'center' }}>
          <Icon path={mdiAccountGroup} size={3} color="var(--text-secondary)" style={{ marginBottom: 16 }} />
          <h3>No players found</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
            {searchTerm ? 'Try adjusting your search or filters' : 'Add your first player to get started'}
          </p>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            <Icon path={mdiPlus} size={0.75} style={{ marginRight: 8 }} />
            Add Player
          </button>
        </div>
      )}

      {/* Add Player Modal */}
      {showAddModal && (
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
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card"
            style={{ padding: 32, width: '100%', maxWidth: 500, margin: 16 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3>Add New Player</h3>
              <button 
                onClick={() => setShowAddModal(false)}
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

            <div style={{ display: 'grid', gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Full Name</label>
                <input
                  type="text"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                  placeholder="Enter player name"
                  style={{
                    width: '100%',
                    padding: 12,
                    background: 'var(--dark-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div className="grid-2">
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Role</label>
                  <select
                    value={newPlayer.role}
                    onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}
                    style={{
                      width: '100%',
                      padding: 12,
                      background: 'var(--dark-bg)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    <option>Batsman</option>
                    <option>Opening Batsman</option>
                    <option>Top Order Batsman</option>
                    <option>Middle Order Batsman</option>
                    <option>Wicket-keeper Batsman</option>
                    <option>All-rounder</option>
                    <option>Bowler</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Batting Style</label>
                  <select
                    value={newPlayer.battingStyle}
                    onChange={(e) => setNewPlayer({ ...newPlayer, battingStyle: e.target.value })}
                    style={{
                      width: '100%',
                      padding: 12,
                      background: 'var(--dark-bg)',
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
              </div>

              <div className="grid-2">
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Age</label>
                  <input
                    type="number"
                    value={newPlayer.age}
                    onChange={(e) => setNewPlayer({ ...newPlayer, age: parseInt(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: 12,
                      background: 'var(--dark-bg)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Email</label>
                  <input
                    type="email"
                    value={newPlayer.email}
                    onChange={(e) => setNewPlayer({ ...newPlayer, email: e.target.value })}
                    placeholder="player@team.com"
                    style={{
                      width: '100%',
                      padding: 12,
                      background: 'var(--dark-bg)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>Phone</label>
                <input
                  type="tel"
                  value={newPlayer.phone}
                  onChange={(e) => setNewPlayer({ ...newPlayer, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  style={{
                    width: '100%',
                    padding: 12,
                    background: 'var(--dark-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <button className="btn-primary" onClick={handleAddPlayer} style={{ marginTop: 8 }}>
                <Icon path={mdiPlus} size={0.75} style={{ marginRight: 8 }} />
                Add Player
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;

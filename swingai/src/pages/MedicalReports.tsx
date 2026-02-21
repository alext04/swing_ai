import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@mdi/react';
import { colors } from '../theme';
import {
  mdiHeart,
  mdiArrowLeft,
  mdiMagnify,
  mdiDownload,
  mdiPrinter,
  mdiAccount,
  mdiFileDocument,
  mdiCheckCircle,
  mdiAlertCircle,
  mdiInformation
} from '@mdi/js';
import { useNavigate } from 'react-router-dom';

interface MedicalReport {
  id: number;
  player: string;
  playerId: number;
  injuryType: string;
  bodyPart: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  status: 'recovering' | 'monitoring' | 'rest-required' | 'cleared' | 'under-assessment';
  dateReported: string;
  restDuration: number; // in days
  restUnit: 'days' | 'weeks';
  expectedReturn: string;
  medicalNotes: string;
  treatmentPlan: string;
  doctorAssigned: string;
  lastUpdated: string;
  sessionsCompleted: number;
  totalSessions: number;
}

const medicalReportsData: MedicalReport[] = [
  {
    id: 1,
    player: 'Rohit Sharma',
    playerId: 1,
    injuryType: 'Shoulder Strain',
    bodyPart: 'Right Shoulder',
    severity: 'moderate',
    status: 'recovering',
    dateReported: '2024-02-18',
    restDuration: 2,
    restUnit: 'weeks',
    expectedReturn: '2024-03-04',
    medicalNotes: 'Grade 2 strain of the rotator cuff muscles. Patient reports pain during overhead movements and batting strokes. MRI shows no tear.',
    treatmentPlan: 'Physiotherapy 3x/week, ice therapy, anti-inflammatory medication, gradual strengthening exercises after week 1.',
    doctorAssigned: 'Dr. Rajesh Kumar',
    lastUpdated: '2024-02-20',
    sessionsCompleted: 3,
    totalSessions: 12
  },
  {
    id: 2,
    player: 'Virat Kohli',
    playerId: 2,
    injuryType: 'Wrist Fatigue',
    bodyPart: 'Left Wrist',
    severity: 'low',
    status: 'monitoring',
    dateReported: '2024-02-19',
    restDuration: 5,
    restUnit: 'days',
    expectedReturn: '2024-02-24',
    medicalNotes: 'Mild wrist fatigue reported after intensive practice session. No structural damage. Patient can perform light activities.',
    treatmentPlan: 'Rest from batting practice, wrist mobilization exercises, compression bandage during training.',
    doctorAssigned: 'Dr. Priya Mehta',
    lastUpdated: '2024-02-20',
    sessionsCompleted: 1,
    totalSessions: 3
  },
  {
    id: 3,
    player: 'KL Rahul',
    playerId: 3,
    injuryType: 'Lower Back Tightness',
    bodyPart: 'Lumbar Region',
    severity: 'high',
    status: 'rest-required',
    dateReported: '2024-02-17',
    restDuration: 3,
    restUnit: 'weeks',
    expectedReturn: '2024-03-10',
    medicalNotes: 'Acute lower back spasm with limited range of motion. X-ray rules out fracture. Likely due to repetitive flexion during wicket-keeping.',
    treatmentPlan: 'Complete rest for 1 week, followed by gradual mobility work. Core strengthening, lumbar stabilization exercises, massage therapy 2x/week.',
    doctorAssigned: 'Dr. Anil Desai',
    lastUpdated: '2024-02-20',
    sessionsCompleted: 2,
    totalSessions: 15
  },
  {
    id: 4,
    player: 'Hardik Pandya',
    playerId: 5,
    injuryType: 'Ankle Sprain',
    bodyPart: 'Right Ankle',
    severity: 'moderate',
    status: 'recovering',
    dateReported: '2024-02-10',
    restDuration: 2,
    restUnit: 'weeks',
    expectedReturn: '2024-02-25',
    medicalNotes: 'Grade 1 lateral ankle sprain. Mild swelling and tenderness. No ligament tear on ultrasound.',
    treatmentPlan: 'RICE protocol, ankle strengthening exercises, balance training, gradual return to running.',
    doctorAssigned: 'Dr. Rajesh Kumar',
    lastUpdated: '2024-02-19',
    sessionsCompleted: 6,
    totalSessions: 10
  },
  {
    id: 5,
    player: 'Shreyas Iyer',
    playerId: 4,
    injuryType: 'Hamstring Tightness',
    bodyPart: 'Left Hamstring',
    severity: 'low',
    status: 'cleared',
    dateReported: '2024-02-05',
    restDuration: 1,
    restUnit: 'weeks',
    expectedReturn: '2024-02-12',
    medicalNotes: 'Mild hamstring tightness after sprinting drill. No tear. Responded well to initial treatment.',
    treatmentPlan: 'Stretching exercises, sports massage, gradual return to running protocol completed.',
    doctorAssigned: 'Dr. Priya Mehta',
    lastUpdated: '2024-02-12',
    sessionsCompleted: 5,
    totalSessions: 5
  },
  {
    id: 6,
    player: 'Rishabh Pant',
    playerId: 6,
    injuryType: 'Finger Contusion',
    bodyPart: 'Right Index Finger',
    severity: 'low',
    status: 'cleared',
    dateReported: '2024-02-08',
    restDuration: 4,
    restUnit: 'days',
    expectedReturn: '2024-02-12',
    medicalNotes: 'Direct impact injury while wicket-keeping. X-ray negative for fracture. Mild soft tissue swelling.',
    treatmentPlan: 'Ice therapy, buddy taping, pain management. Cleared for full activity.',
    doctorAssigned: 'Dr. Anil Desai',
    lastUpdated: '2024-02-12',
    sessionsCompleted: 2,
    totalSessions: 2
  }
];

const MedicalReports: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('dateReported');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return colors.success;
      case 'moderate': return colors.warning;
      case 'high': return colors.danger;
      case 'critical': return '#dc2626';
      default: return colors.textSecondary;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recovering': return colors.success;
      case 'monitoring': return colors.warning;
      case 'rest-required': return colors.danger;
      case 'cleared': return colors.success;
      case 'under-assessment': return colors.warning;
      default: return colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'recovering': return mdiCheckCircle;
      case 'monitoring': return mdiInformation;
      case 'rest-required': return mdiAlertCircle;
      case 'cleared': return mdiCheckCircle;
      case 'under-assessment': return mdiFileDocument;
      default: return mdiInformation;
    }
  };

  const filteredReports = medicalReportsData
    .filter(report => {
      const matchesSearch = report.player.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.injuryType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeverity = filterSeverity === 'all' || report.severity === filterSeverity;
      const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
      return matchesSearch && matchesSeverity && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'dateReported') return new Date(b.dateReported).getTime() - new Date(a.dateReported).getTime();
      if (sortBy === 'severity') {
        const severityOrder = { critical: 4, high: 3, moderate: 2, low: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      }
      if (sortBy === 'expectedReturn') return new Date(a.expectedReturn).getTime() - new Date(b.expectedReturn).getTime();
      return 0;
    });

  const stats = {
    total: medicalReportsData.length,
    active: medicalReportsData.filter(r => r.status !== 'cleared').length,
    recovering: medicalReportsData.filter(r => r.status === 'recovering').length,
    cleared: medicalReportsData.filter(r => r.status === 'cleared').length
  };

  const getProgressPercentage = (report: MedicalReport) => {
    return Math.round((report.sessionsCompleted / report.totalSessions) * 100);
  };

  return (
    <div className="fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
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
        Back
      </button>

      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">
          <span className="gradient-text">Medical Reports</span>
        </h1>
        <p className="page-subtitle">Comprehensive injury tracking and recovery management</p>
      </div>

      {/* Summary Stats */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: '2rem' }}>🩺</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Reports</span>
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem' }}>{stats.total}</div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: '2rem' }}>⚠️</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Active Injuries</span>
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem', color: colors.warning }}>{stats.active}</div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: '2rem' }}>🔄</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Recovering</span>
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem', color: colors.success }}>{stats.recovering}</div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: '2rem' }}>✅</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Cleared</span>
          </div>
          <div className="metric-value" style={{ fontSize: '1.75rem', color: colors.success }}>{stats.cleared}</div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
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
                placeholder="Search by player or injury..."
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
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              style={{
                padding: '10px 16px',
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              <option value="all">All Severities</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '10px 16px',
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              <option value="all">All Statuses</option>
              <option value="recovering">Recovering</option>
              <option value="monitoring">Monitoring</option>
              <option value="rest-required">Rest Required</option>
              <option value="cleared">Cleared</option>
              <option value="under-assessment">Under Assessment</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '10px 16px',
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              <option value="dateReported">Sort by Date</option>
              <option value="severity">Sort by Severity</option>
              <option value="expectedReturn">Sort by Return Date</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="btn-primary"
              style={{ padding: '10px 16px' }}
              onClick={() => window.print()}
            >
              <Icon path={mdiPrinter} size={0.75} />
            </button>
            <button
              className="btn-primary"
              style={{ padding: '10px 16px' }}
              onClick={() => alert('Report exported as PDF!')}
            >
              <Icon path={mdiDownload} size={0.75} />
            </button>
          </div>
        </div>
      </div>

      {/* Medical Reports Table */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: 24 }}
      >
        <h3 style={{ marginBottom: 24 }}>
          <Icon path={mdiFileDocument} size={1} style={{ marginRight: 8, verticalAlign: 'middle', color: colors.accent }} />
          All Medical Reports
        </h3>

        {filteredReports.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 48 }}>
            <Icon path={mdiFileDocument} size={3} color="var(--text-secondary)" style={{ marginBottom: 16 }} />
            <h4>No reports found</h4>
            <p style={{ color: 'var(--text-secondary)' }}>Try adjusting your filters</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: 12, textAlign: 'left' }}>Player</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Injury</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Severity</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Date Reported</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Rest Period</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Expected Return</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Progress</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <React.Fragment key={report.id}>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: 16, fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{
                            width: 32, height: 32,
                            borderRadius: '50%',
                            background: 'var(--gradient-accent)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-color)'
                          }}>
                            {report.player.split(' ').map(n => n[0]).join('')}
                          </div>
                          {report.player}
                        </div>
                      </td>
                      <td style={{ padding: 16 }}>
                        <div style={{ fontWeight: 500 }}>{report.injuryType}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{report.bodyPart}</div>
                      </td>
                      <td style={{ padding: 16 }}>
                        <span
                          className="badge"
                          style={{
                            background: getSeverityColor(report.severity) + '20',
                            color: getSeverityColor(report.severity),
                            textTransform: 'capitalize'
                          }}
                        >
                          {report.severity}
                        </span>
                      </td>
                      <td style={{ padding: 16 }}>
                        <span
                          className="badge"
                          style={{
                            background: getStatusColor(report.status) + '20',
                            color: getStatusColor(report.status),
                            textTransform: 'capitalize',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          <Icon path={getStatusIcon(report.status)} size={0.5} />
                          {report.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td style={{ padding: 16, color: 'var(--text-secondary)' }}>
                        {new Date(report.dateReported).toLocaleDateString('en-IN', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </td>
                      <td style={{ padding: 16 }}>
                        <div style={{ fontWeight: 600 }}>{report.restDuration} {report.restUnit}</div>
                      </td>
                      <td style={{ padding: 16 }}>
                        <div style={{ fontWeight: 600, color: new Date(report.expectedReturn) < new Date() ? colors.warning : colors.success }}>
                          {new Date(report.expectedReturn).toLocaleDateString('en-IN', {
                            month: 'short', day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td style={{ padding: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="progress-bar" style={{ width: 100 }}>
                            <div
                              className="progress-fill"
                              style={{
                                width: `${getProgressPercentage(report)}%`,
                                background: getProgressPercentage(report) === 100 ? colors.success : colors.accent
                              }}
                            />
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            {report.sessionsCompleted}/{report.totalSessions}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: 16 }}>
                        <button
                          className="btn-primary"
                          style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                          onClick={() => {/* Could open detailed modal */ }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                    {/* Expanded Details Row */}
                    <tr style={{ background: 'rgba(17, 62, 28, 0.3)' }}>
                      <td colSpan={9} style={{ padding: '16px' }}>
                        <div className="grid-3" style={{ gap: 24 }}>
                          <div>
                            <h5 style={{ marginBottom: 8, color: colors.accent }}>
                              <Icon path={mdiInformation} size={0.75} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                              Medical Notes
                            </h5>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                              {report.medicalNotes}
                            </p>
                          </div>
                          <div>
                            <h5 style={{ marginBottom: 8, color: colors.accent }}>
                              <Icon path={mdiFileDocument} size={0.75} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                              Treatment Plan
                            </h5>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                              {report.treatmentPlan}
                            </p>
                          </div>
                          <div>
                            <h5 style={{ marginBottom: 8, color: colors.accent }}>
                              <Icon path={mdiAccount} size={0.75} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                              Medical Team
                            </h5>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
                              <strong>Doctor:</strong> {report.doctorAssigned}
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
                              <strong>Last Updated:</strong> {new Date(report.lastUpdated).toLocaleDateString('en-IN', {
                                year: 'numeric', month: 'short', day: 'numeric'
                              })}
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                              <strong>Next Review:</strong> {new Date(new Date(report.expectedReturn).getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                                month: 'short', day: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MedicalReports;

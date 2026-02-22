import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@mdi/react';
import { colors } from '../theme';
import {
  mdiUpload,
  mdiVideo,
  mdiPlay,
  mdiPause,
  mdiRewind,
  mdiFastForward,
  mdiCheckCircle,
  mdiAlertCircle,
  mdiInformation,
  mdiDownload,
  mdiShare,
  mdiTrashCan,
  mdiCricket,
  mdiAngleRight
} from '@mdi/js';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface BowlingMetrics {
  ballSpeed: number;
  armAngle: number;
  elbowExtension: number;
  releasePoint: number;
  followThrough: number;
  runupSpeed: number;
  balance: number;
  landingPosition: number;
}

interface AnalysisResult {
  overallScore: number;
  metrics: BowlingMetrics;
  strengths: string[];
  improvements: string[];
  deliveryType: string;
  bowlingAction: string;
  bowlingArm: string;
}

const BowlingAnalysis: React.FC = () => {
  const [_videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [selectedView, setSelectedView] = useState<'original' | 'overlay' | 'skeleton'>('overlay');

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockAnalysisResult: AnalysisResult = {
    overallScore: 85,
    metrics: {
      ballSpeed: 88,
      armAngle: 82,
      elbowExtension: 75,
      releasePoint: 86,
      followThrough: 84,
      runupSpeed: 80,
      balance: 82,
      landingPosition: 88
    },
    strengths: [
      'Excellent release point consistency',
      'Strong follow-through completion',
      'Good landing position near crease',
      'Consistent run-up rhythm'
    ],
    improvements: [
      'Elbow extension needs monitoring for no-ball compliance',
      'Arm angle could be more consistent',
      'Balance during delivery stride can be improved'
    ],
    deliveryType: 'Good Length',
    bowlingAction: 'Side-on',
    bowlingArm: 'Right-arm'
  };

  const radarData = [
    { subject: 'Ball Speed', A: mockAnalysisResult.metrics.ballSpeed, fullMark: 100 },
    { subject: 'Arm Angle', A: mockAnalysisResult.metrics.armAngle, fullMark: 100 },
    { subject: 'Elbow Extension', A: mockAnalysisResult.metrics.elbowExtension, fullMark: 100 },
    { subject: 'Release Point', A: mockAnalysisResult.metrics.releasePoint, fullMark: 100 },
    { subject: 'Follow Through', A: mockAnalysisResult.metrics.followThrough, fullMark: 100 },
    { subject: 'Run-up Speed', A: mockAnalysisResult.metrics.runupSpeed, fullMark: 100 },
    { subject: 'Balance', A: mockAnalysisResult.metrics.balance, fullMark: 100 },
    { subject: 'Landing', A: mockAnalysisResult.metrics.landingPosition, fullMark: 100 },
  ];

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setAnalysisComplete(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const resetAnalysis = () => {
    setVideoFile(null);
    setVideoUrl(null);
    setAnalysisComplete(false);
    setIsAnalyzing(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return colors.success;
    if (score >= 70) return colors.bowling;
    if (score >= 50) return colors.warning;
    return colors.danger;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Needs Work';
    return 'Poor';
  };

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">
          <span className="gradient-text" style={{ color: colors.bowling }}>Bowling Analysis</span>
        </h1>
        <p className="page-subtitle">Upload your bowling video for AI-powered analysis</p>
      </div>

      <AnimatePresence mode="wait">
        {!videoUrl ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div
              className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                style={{ display: 'none' }}
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              />
              <Icon path={mdiUpload} size={3} color={colors.bowling} />
              <h3 style={{ marginBottom: 8 }}>Drop your bowling video here</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
                or click to browse (MP4, MOV, AVI)
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <span className="badge" style={{ background: 'rgba(242, 181, 11, 0.2)', color: colors.bowling }}>Max 500MB</span>
                <span className="badge" style={{ background: 'rgba(242, 181, 11, 0.2)', color: colors.bowling }}>HD Recommended</span>
                <span className="badge" style={{ background: 'rgba(242, 181, 11, 0.2)', color: colors.bowling }}>Side/Rear View</span>
              </div>
            </div>

            <div className="grid-3" style={{ marginTop: 32 }}>
              <div className="card" style={{ padding: 24 }}>
                <Icon path={mdiVideo} size={1.5} color={colors.bowling} style={{ marginBottom: 12 }} />
                <h4 style={{ marginBottom: 8 }}>Recording Angle</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  Record from the side or rear for best results. Capture the full run-up and delivery stride.
                </p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <Icon path={mdiInformation} size={1.5} color={colors.bowling} style={{ marginBottom: 12 }} />
                <h4 style={{ marginBottom: 8 }}>Lighting</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  Good lighting is crucial. Ensure clear visibility of your arm action and release point.
                </p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <Icon path={mdiCricket} size={1.5} color={colors.bowling} style={{ marginBottom: 12 }} />
                <h4 style={{ marginBottom: 8 }}>Full Action</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  Capture your complete bowling action from run-up to follow-through for comprehensive analysis.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="analysis"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid-2" style={{ marginBottom: 24 }}>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3>Video Preview</h3>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {(['original', 'overlay', 'skeleton'] as const).map((view) => (
                      <button
                        key={view}
                        onClick={() => setSelectedView(view)}
                        style={{
                          padding: '6px 12px',
                          background: selectedView === view ? colors.bowling : 'var(--card-bg)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-sm)',
                          color: selectedView === view ? '#000' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        {view.charAt(0).toUpperCase() + view.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="video-container" style={{ position: 'relative' }}>
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    style={{ width: '100%', borderRadius: 'var(--radius-md)', display: 'block' }}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                  />

                  {selectedView === 'skeleton' && (
                    <svg
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none'
                      }}
                    >
                      <line x1="50%" y1="15%" x2="50%" y2="45%" stroke={colors.bowling} strokeWidth="3" />
                      <line x1="50%" y1="30%" x2="35%" y2="40%" stroke={colors.bowling} strokeWidth="3" />
                      <line x1="50%" y1="30%" x2="65%" y2="40%" stroke={colors.bowling} strokeWidth="3" />
                      <line x1="50%" y1="45%" x2="40%" y2="70%" stroke={colors.bowling} strokeWidth="3" />
                      <line x1="50%" y1="45%" x2="60%" y2="70%" stroke={colors.bowling} strokeWidth="3" />
                      <circle cx="50%" cy="15%" r="8" fill={colors.bowlingLight} />
                    </svg>
                  )}

                  {selectedView === 'overlay' && analysisComplete && (
                    <div style={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      background: 'rgba(0, 0, 0, 0.8)',
                      padding: 16,
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.75rem'
                    }}>
                      <div style={{ marginBottom: 8 }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Delivery: </span>
                        <span style={{ color: colors.bowling }}>{mockAnalysisResult.deliveryType}</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-secondary)' }}>Action: </span>
                        <span style={{ color: colors.bowling }}>{mockAnalysisResult.bowlingAction}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: 16 }}>
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    style={{
                      width: '100%',
                      marginBottom: 12,
                      accentColor: colors.bowling
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {formatTime(currentTime)}
                    </span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => videoRef.current && (videoRef.current.currentTime -= 5)}
                        style={controlButtonStyle}
                      >
                        <Icon path={mdiRewind} size={0.75} />
                      </button>
                      <button onClick={togglePlay} style={controlButtonStyle}>
                        <Icon path={isPlaying ? mdiPause : mdiPlay} size={1} />
                      </button>
                      <button
                        onClick={() => videoRef.current && (videoRef.current.currentTime += 5)}
                        style={controlButtonStyle}
                      >
                        <Icon path={mdiFastForward} size={0.75} />
                      </button>
                    </div>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {formatTime(duration)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                  {!analysisComplete && !isAnalyzing && (
                    <button onClick={handleAnalyze} className="btn-primary" style={{ flex: 1, background: colors.bowling, color: '#000' }}>
                      <Icon path={mdiCricket} size={0.75} style={{ marginRight: 8 }} />
                      Analyze Bowling
                    </button>
                  )}
                  <button
                    onClick={resetAnalysis}
                    style={{
                      padding: '12px 24px',
                      background: 'var(--card-bg)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    <Icon path={mdiTrashCan} size={0.75} />
                  </button>
                </div>
              </div>

              <div>
                {isAnalyzing ? (
                  <motion.div
                    className="card"
                    style={{ padding: 24, textAlign: 'center' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="spinner" style={{ margin: '0 auto 24px', borderTopColor: colors.bowling }} />
                    <h3>Analyzing your bowling...</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
                      Our AI is processing your bowling action
                    </p>
                    <div style={{ marginTop: 24 }}>
                      <div className="progress-bar" style={{ marginBottom: 8 }}>
                        <div className="progress-fill" style={{ width: '60%', background: colors.bowling }} />
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Detecting arm angle, release point, and delivery metrics...
                      </p>
                    </div>
                  </motion.div>
                ) : analysisComplete ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
                  >
                    <div
                      className={`analysis-card ${
                        mockAnalysisResult.overallScore >= 85 ? 'excellent' :
                        mockAnalysisResult.overallScore >= 70 ? 'good' :
                        mockAnalysisResult.overallScore >= 50 ? 'needs-improvement' : 'poor'
                      }`}
                      style={{ padding: 24, textAlign: 'center', borderColor: colors.bowling }}
                    >
                      <h3 style={{ marginBottom: 16 }}>Overall Score</h3>
                      <div style={{ fontSize: '4rem', fontWeight: 700, color: colors.bowling }}>
                        {mockAnalysisResult.overallScore}
                      </div>
                      <span className="badge" style={{
                        background: colors.bowling + '40',
                        color: colors.bowling,
                        padding: '8px 16px',
                        fontSize: '0.875rem'
                      }}>
                        {getScoreLabel(mockAnalysisResult.overallScore)}
                      </span>
                    </div>

                    <div className="card" style={{ padding: 24 }}>
                      <h4 style={{ marginBottom: 16, color: colors.bowling }}>Performance Metrics</h4>
                      <div style={{ height: 250 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={radarData}>
                            <PolarGrid stroke={colors.chartGrid} />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: colors.textSecondary, fontSize: 11 }} />
                            <Radar
                              name="Your Score"
                              dataKey="A"
                              stroke={colors.bowling}
                              strokeWidth={3}
                              fill={colors.bowling}
                              fillOpacity={0.3}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="card" style={{ padding: 24 }}>
                      <h4 style={{ marginBottom: 16, color: colors.success }}>
                        <Icon path={mdiCheckCircle} size={1} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                        Strengths
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {mockAnalysisResult.strengths.map((strength, index) => (
                          <li key={index} style={{
                            padding: '12px 0',
                            borderBottom: index < mockAnalysisResult.strengths.length - 1 ? '1px solid var(--border-color)' : 'none',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 12
                          }}>
                            <Icon path={mdiAngleRight} size={0.5} color={colors.success} style={{ marginTop: 4 }} />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="card" style={{ padding: 24 }}>
                      <h4 style={{ marginBottom: 16, color: colors.warning }}>
                        <Icon path={mdiAlertCircle} size={1} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                        Areas for Improvement
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {mockAnalysisResult.improvements.map((improvement, index) => (
                          <li key={index} style={{
                            padding: '12px 0',
                            borderBottom: index < mockAnalysisResult.improvements.length - 1 ? '1px solid var(--border-color)' : 'none',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 12
                          }}>
                            <Icon path={mdiAngleRight} size={0.5} color={colors.warning} style={{ marginTop: 4 }} />
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: 'flex', gap: 12 }}>
                      <button className="btn-primary" style={{ flex: 1, background: colors.bowling, color: '#000' }}>
                        <Icon path={mdiDownload} size={0.75} style={{ marginRight: 8 }} />
                        Export Report
                      </button>
                      <button
                        className="btn-accent"
                        style={{ flex: 1, background: colors.bowlingLight, color: '#000' }}
                      >
                        <Icon path={mdiShare} size={0.75} style={{ marginRight: 8 }} />
                        Share
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="card" style={{ padding: 24, textAlign: 'center' }}>
                    <Icon path={mdiVideo} size={3} color="var(--text-secondary)" style={{ marginBottom: 16 }} />
                    <h3>Ready to Analyze</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
                      Click "Analyze Bowling" to get AI-powered insights
                    </p>
                  </div>
                )}
              </div>
            </div>

            {analysisComplete && (
              <motion.div
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ padding: 24 }}
              >
                <h3 style={{ marginBottom: 24, color: colors.bowling }}>Detailed Metrics Breakdown</h3>
                <div className="grid-4">
                  {Object.entries(mockAnalysisResult.metrics).map(([key, value]) => (
                    <div key={key} style={{ textAlign: 'center' }}>
                      <div style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: `conic-gradient(${getScoreColor(value)} ${value}%, var(--border-color) ${value}%)`,
                        margin: '0 auto 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}>
                        <div style={{
                          width: 64,
                          height: 64,
                          borderRadius: '50%',
                          background: 'var(--card-bg)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column'
                        }}>
                          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: getScoreColor(value) }}>
                            {value}
                          </span>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const controlButtonStyle: React.CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: '50%',
  background: 'var(--card-bg)',
  border: '1px solid var(--border-color)',
  color: 'var(--text-primary)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease'
};

export default BowlingAnalysis;

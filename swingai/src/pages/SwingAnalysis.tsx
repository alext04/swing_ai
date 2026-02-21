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
  mdiDownload,
  mdiShare,
  mdiTrashCan,
  mdiCricket,
  mdiAngleRight
} from '@mdi/js';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface SwingMetrics {
  batSpeed: number;
  backliftAngle: number;
  elbowPosition: number;
  weightTransfer: number;
  followThrough: number;
  timing: number;
  balance: number;
  headPosition: number;
}

interface AnalysisResult {
  overallScore: number;
  metrics: SwingMetrics;
  strengths: string[];
  improvements: string[];
  shotType: string;
  stance: string;
}

const SwingAnalysis: React.FC = () => {
  const [, setVideoFile] = useState<File | null>(null);
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
    overallScore: 87,
    metrics: {
      batSpeed: 92,
      backliftAngle: 85,
      elbowPosition: 78,
      weightTransfer: 90,
      followThrough: 88,
      timing: 82,
      balance: 85,
      headPosition: 90
    },
    strengths: [
      'Excellent bat speed generation',
      'Perfect head position throughout the shot',
      'Great weight transfer from back to front foot',
      'Smooth follow-through completion'
    ],
    improvements: [
      'Elbow could be slightly higher during backlift',
      'Timing can be improved for better shot placement',
      'Consider adjusting stance width for better balance'
    ],
    shotType: 'Front Foot Drive',
    stance: 'Side-on'
  };

  const radarData = [
    { subject: 'Bat Speed', A: mockAnalysisResult.metrics.batSpeed, fullMark: 100 },
    { subject: 'Backlift', A: mockAnalysisResult.metrics.backliftAngle, fullMark: 100 },
    { subject: 'Elbow', A: mockAnalysisResult.metrics.elbowPosition, fullMark: 100 },
    { subject: 'Weight Transfer', A: mockAnalysisResult.metrics.weightTransfer, fullMark: 100 },
    { subject: 'Follow Through', A: mockAnalysisResult.metrics.followThrough, fullMark: 100 },
    { subject: 'Timing', A: mockAnalysisResult.metrics.timing, fullMark: 100 },
    { subject: 'Balance', A: mockAnalysisResult.metrics.balance, fullMark: 100 },
    { subject: 'Head Position', A: mockAnalysisResult.metrics.headPosition, fullMark: 100 },
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
    // Simulate AI analysis
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
    if (score >= 85) return 'var(--success-color)';
    if (score >= 70) return 'var(--primary-color)';
    if (score >= 50) return 'var(--warning-color)';
    return 'var(--danger-color)';
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
          <span className="gradient-text">Swing Analysis</span>
        </h1>
        <p className="page-subtitle">Upload your batting video for AI-powered analysis</p>
      </div>

      <AnimatePresence mode="wait">
        {!videoUrl ? (
          /* Upload Zone */
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
              <Icon path={mdiUpload} size={3} color="var(--primary-color)" />
              <h3 style={{ marginBottom: 8 }}>Drop your video here</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
                or click to browse (MP4, MOV, AVI)
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <span className="badge badge-primary">Max 500MB</span>
                <span className="badge badge-primary">HD Recommended</span>
                <span className="badge badge-primary">Side/Front View</span>
              </div>
            </div>

            {/* Tips Section */}
            <div className="grid-3" style={{ marginTop: 32 }}>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📹</div>
                <h4 style={{ marginBottom: 8 }}>Recording Angle</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  Record from the side or front for best results. Ensure the camera is at ground level.
                </p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>💡</div>
                <h4 style={{ marginBottom: 8 }}>Lighting</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  Good lighting is crucial. Avoid shadows on your body and ensure clear visibility.
                </p>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🏏</div>
                <h4 style={{ marginBottom: 8 }}>Full Swing</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  Capture your complete swing from stance to follow-through for comprehensive analysis.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Video Player & Analysis */
          <motion.div
            key="analysis"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid-2" style={{ marginBottom: 24 }}>
              {/* Video Player */}
              <div className="card" style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3>Video Preview</h3>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => setSelectedView('original')}
                      style={{
                        padding: '6px 12px',
                        background: selectedView === 'original' ? 'var(--primary-color)' : 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        color: selectedView === 'original' ? 'white' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: '0.75rem'
                      }}
                    >
                      Original
                    </button>
                    <button
                      onClick={() => setSelectedView('overlay')}
                      style={{
                        padding: '6px 12px',
                        background: selectedView === 'overlay' ? 'var(--primary-color)' : 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        color: selectedView === 'overlay' ? 'white' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: '0.75rem'
                      }}
                    >
                      Overlay
                    </button>
                    <button
                      onClick={() => setSelectedView('skeleton')}
                      style={{
                        padding: '6px 12px',
                        background: selectedView === 'skeleton' ? 'var(--primary-color)' : 'var(--card-bg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        color: selectedView === 'skeleton' ? 'white' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: '0.75rem'
                      }}
                    >
                      Skeleton
                    </button>
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

                  {/* Skeleton Overlay (simulated) */}
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
                      {/* Simulated skeleton tracking lines */}
                      <line x1="50%" y1="20%" x2="50%" y2="50%" stroke={colors.legacyTeal} strokeWidth="3" />
                      <line x1="50%" y1="35%" x2="30%" y2="45%" stroke={colors.legacyTeal} strokeWidth="3" />
                      <line x1="50%" y1="35%" x2="70%" y2="45%" stroke={colors.legacyTeal} strokeWidth="3" />
                      <line x1="50%" y1="50%" x2="40%" y2="70%" stroke={colors.legacyTeal} strokeWidth="3" />
                      <line x1="50%" y1="50%" x2="60%" y2="70%" stroke={colors.legacyTeal} strokeWidth="3" />
                      <circle cx="50%" cy="20%" r="8" fill={colors.legacyBlue} />
                    </svg>
                  )}

                  {/* Analysis Overlay */}
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
                        <span style={{ color: 'var(--text-secondary)' }}>Shot: </span>
                        <span style={{ color: 'var(--success-color)' }}>{mockAnalysisResult.shotType}</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-secondary)' }}>Stance: </span>
                        <span style={{ color: 'var(--success-color)' }}>{mockAnalysisResult.stance}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Controls */}
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
                      accentColor: 'var(--primary-color)'
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

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                  {!analysisComplete && !isAnalyzing && (
                    <button onClick={handleAnalyze} className="btn-primary" style={{ flex: 1 }}>
                      <Icon path={mdiCricket} size={0.75} style={{ marginRight: 8 }} />
                      Analyze Swing
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

              {/* Analysis Results */}
              <div>
                {isAnalyzing ? (
                  <motion.div
                    className="card"
                    style={{ padding: 24, textAlign: 'center' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="spinner" style={{ margin: '0 auto 24px' }} />
                    <h3>Analyzing your swing...</h3>
                    <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
                      Our AI is processing your technique
                    </p>
                    <div style={{ marginTop: 24 }}>
                      <div className="progress-bar" style={{ marginBottom: 8 }}>
                        <div className="progress-fill" style={{ width: '60%' }} />
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Detecting key points and measuring metrics...
                      </p>
                    </div>
                  </motion.div>
                ) : analysisComplete ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
                  >
                    {/* Overall Score Card */}
                    <div
                      className={`analysis-card ${mockAnalysisResult.overallScore >= 85 ? 'excellent' :
                        mockAnalysisResult.overallScore >= 70 ? 'good' :
                          mockAnalysisResult.overallScore >= 50 ? 'needs-improvement' : 'poor'
                        }`}
                      style={{ padding: 24, textAlign: 'center' }}
                    >
                      <h3 style={{ marginBottom: 16 }}>Overall Score</h3>
                      <div style={{ fontSize: '4rem', fontWeight: 700, color: getScoreColor(mockAnalysisResult.overallScore) }}>
                        {mockAnalysisResult.overallScore}
                      </div>
                      <span className="badge" style={{
                        background: getScoreColor(mockAnalysisResult.overallScore),
                        color: 'white',
                        padding: '8px 16px',
                        fontSize: '0.875rem'
                      }}>
                        {getScoreLabel(mockAnalysisResult.overallScore)}
                      </span>
                    </div>

                    {/* Radar Chart */}
                    <div className="card" style={{ padding: 24 }}>
                      <h4 style={{ marginBottom: 16 }}>Performance Metrics</h4>
                      <div style={{ height: 250 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={radarData}>
                            <PolarGrid stroke={colors.chartGrid} />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: colors.textMuted, fontSize: 12 }} />
                            <Radar
                              name="Your Score"
                              dataKey="A"
                              stroke={colors.legacyBlue}
                              strokeWidth={3}
                              fill={colors.legacyBlue}
                              fillOpacity={0.3}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="card" style={{ padding: 24 }}>
                      <h4 style={{ marginBottom: 16, color: 'var(--success-color)' }}>
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
                            <Icon path={mdiAngleRight} size={0.5} color="var(--success-color)" style={{ marginTop: 4 }} />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Areas for Improvement */}
                    <div className="card" style={{ padding: 24 }}>
                      <h4 style={{ marginBottom: 16, color: 'var(--warning-color)' }}>
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
                            <Icon path={mdiAngleRight} size={0.5} color="var(--warning-color)" style={{ marginTop: 4 }} />
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Export Options */}
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button className="btn-primary" style={{ flex: 1 }}>
                        <Icon path={mdiDownload} size={0.75} style={{ marginRight: 8 }} />
                        Export Report
                      </button>
                      <button
                        className="btn-accent"
                        style={{ flex: 1 }}
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
                      Click "Analyze Swing" to get AI-powered insights
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Detailed Metrics */}
            {analysisComplete && (
              <motion.div
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ padding: 24 }}
              >
                <h3 style={{ marginBottom: 24 }}>Detailed Metrics Breakdown</h3>
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

export default SwingAnalysis;

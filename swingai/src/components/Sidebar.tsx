import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '@mdi/react';
import { colors } from '../theme';
import {
  mdiCricket,
  mdiViewDashboard,
  mdiVideo,
  mdiChartTimelineVariant,
  mdiCog,
  mdiMenu,
  mdiClose,
  mdiTrophy,
  mdiAccountGroup,
  mdiHeart
} from '@mdi/js';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: mdiViewDashboard, label: 'Dashboard' },
    { path: '/analysis', icon: mdiVideo, label: 'Swing Analysis' },
    { path: '/progress', icon: mdiChartTimelineVariant, label: 'Progress Tracking' },
    { path: '/team', icon: mdiAccountGroup, label: 'Team Management' },
    { path: '/medical-reports', icon: mdiHeart, label: 'Medical Reports' },
    { path: '/settings', icon: mdiCog, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={() => onClose()}
        style={{
          display: 'none',
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1001,
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: 12,
          color: 'var(--accent-color)',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--card-hover)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'var(--card-bg)'}
      >
        <Icon path={open ? mdiClose : mdiMenu} size={1} />
      </button>

      <motion.aside 
        className="sidebar"
        initial={false}
        animate={{ x: 0 }}
      >
        <div className="sidebar-logo">
          <Icon path={mdiCricket} size={1.5} color={colors.primary} />
          <h1>SwingAI</h1>
        </div>

        <nav>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => onClose()}
              >
                <Icon path={item.icon} size={1} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    style={{
                      position: 'absolute',
                      right: 0,
                      width: 4,
                      height: '60%',
                      background: 'var(--gradient-accent)',
                      borderRadius: '4px 0 0 4px'
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div style={{ 
          marginTop: 'auto', 
          paddingTop: 32,
          borderTop: '1px solid var(--border-color)'
        }}>
          <div 
            className="stat-card" 
            style={{ 
              padding: 16,
              background: 'rgba(206, 237, 123, 0.1)',
              border: '1px solid rgba(206, 237, 123, 0.3)'
            }}
          >
            <p style={{ fontSize: '0.875rem', color: 'var(--accent-color)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon path={mdiTrophy} size={0.75} />
              Pro Tip
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Record your swing from multiple angles for comprehensive analysis.
            </p>
          </div>
        </div>
      </motion.aside>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
          .sidebar {
            transform: translateX(-100%) !important;
          }
          .sidebar.open {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;

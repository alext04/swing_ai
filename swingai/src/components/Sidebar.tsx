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
  mdiAccountGroup,
  mdiHeart,
  mdiSpeedometer,
  mdiTrophy
} from '@mdi/js';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle, onClose }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: mdiViewDashboard, label: 'Dashboard' },
    { path: '/analysis', icon: mdiVideo, label: 'Batting Analysis' },
    { path: '/bowling-analysis', icon: mdiSpeedometer, label: 'Bowling Analysis' },
    { path: '/progress', icon: mdiChartTimelineVariant, label: 'Batting Progress' },
    { path: '/bowling-progress', icon: mdiTrophy, label: 'Bowling Progress' },
    { path: '/team', icon: mdiAccountGroup, label: 'Team Management' },
    { path: '/medical-reports', icon: mdiHeart, label: 'Medical Reports' },
    { path: '/settings', icon: mdiCog, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => onToggle()}
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

      {/* Mobile Backdrop */}
      {open && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          style={{
            display: 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            backdropFilter: 'blur(4px)'
          }}
        />
      )}

      <motion.aside
        className={`sidebar ${open ? 'open' : ''}`}
        initial={false}
        animate={{ x: 0 }}
      >
        <div className="sidebar-logo">
          <Icon path={mdiCricket} size={1} color={colors.primaryLight} />
          <h1 style={{ position: 'relative', left: 1, fontSize: 20}}>Swing</h1><h1 style={{ color: colors.primaryLight, position: 'relative', right: 7, fontSize: 20.1, fontWeight: 400 }}>AI</h1>
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
                <Icon path={item.icon} size={0.75} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>


      </motion.aside>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
          .sidebar {
            transform: translateX(calc(-100% - 24px)) !important;
          }
          .sidebar.open {
            transform: translateX(0) !important;
          }
          .sidebar-backdrop {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;

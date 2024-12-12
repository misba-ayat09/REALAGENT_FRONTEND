// PostStatistics.tsx
import React from 'react';
import styles from './PostStatistics.module.css';

interface Statistics {
  likes: number;
  comments: number;
}

interface Platform {
  name: string;
  logo: string;
}

interface PostStatisticsProps {
  platform: Platform;
  statistics: Statistics;
  onClick?: () => void;
}

const PostStatistics: React.FC<PostStatisticsProps> = ({ platform, statistics, onClick }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const StatItem = ({ value, label }: { value: number; label: string }) => (
    <div className={styles.statItem}>
      <span className={styles.value}>{formatNumber(value)}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.platformInfo}>
        <img src={platform.logo} alt={platform.name} className={styles.platformLogo} />
        <span className={styles.platformName}>{platform.name}</span>
      </div>

      <div className={styles.statistics}>
        <StatItem value={statistics.likes} label="Likes" />
        <StatItem value={statistics.comments} label="Comments" />
      </div>
    </div>
  );
};

export default PostStatistics;

import type { StatItem } from "../../types/newsletter";

interface StatsGridProps {
  stats: StatItem[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-header">
            <div className="stat-icon-container">
              <stat.icon className="stat-icon" />
            </div>
            <span className="stat-change">{stat.change}</span>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
// TODO: Add hover effect to stat cards

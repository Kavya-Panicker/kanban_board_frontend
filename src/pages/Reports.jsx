import React, { useState } from 'react';
import styles from './Reports.module.css';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const projectStats = {
    total: 12,
    completed: 8,
    inProgress: 3,
    planning: 1
  };

  const taskStats = {
    total: 156,
    completed: 98,
    inProgress: 42,
    pending: 16
  };

  const teamPerformance = [
    { name: 'John Doe', tasks: 24, completed: 20, efficiency: 83 },
    { name: 'Jane Smith', tasks: 18, completed: 16, efficiency: 89 },
    { name: 'Mike Johnson', tasks: 22, completed: 19, efficiency: 86 },
    { name: 'Sarah Wilson', tasks: 15, completed: 12, efficiency: 80 },
    { name: 'Alex Brown', tasks: 20, completed: 17, efficiency: 85 }
  ];

  const monthlyProgress = [
    { month: 'Jan', completed: 12, total: 15 },
    { month: 'Feb', completed: 18, total: 22 },
    { month: 'Mar', completed: 15, total: 20 },
    { month: 'Apr', completed: 22, total: 25 },
    { month: 'May', completed: 19, total: 23 },
    { month: 'Jun', completed: 25, total: 28 }
  ];

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return '#10b981';
    if (efficiency >= 80) return '#3b82f6';
    if (efficiency >= 70) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className={styles.reports}>
      <div className={styles.header}>
        <h1>Reports & Analytics</h1>
        <div className={styles.periodSelector}>
          <label>Period:</label>
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className={styles.periodSelect}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <div className={styles.statsOverview}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3>Projects</h3>
            <span className={styles.statIcon}>📁</span>
          </div>
          <div className={styles.statNumbers}>
            <div className={styles.mainStat}>{projectStats.total}</div>
            <div className={styles.statBreakdown}>
              <span className={styles.completed}>{projectStats.completed} completed</span>
              <span className={styles.inProgress}>{projectStats.inProgress} in progress</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3>Tasks</h3>
            <span className={styles.statIcon}>✅</span>
          </div>
          <div className={styles.statNumbers}>
            <div className={styles.mainStat}>{taskStats.total}</div>
            <div className={styles.statBreakdown}>
              <span className={styles.completed}>{taskStats.completed} completed</span>
              <span className={styles.inProgress}>{taskStats.inProgress} in progress</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3>Completion Rate</h3>
            <span className={styles.statIcon}>📊</span>
          </div>
          <div className={styles.statNumbers}>
            <div className={styles.mainStat}>
              {Math.round((taskStats.completed / taskStats.total) * 100)}%
            </div>
            <div className={styles.statBreakdown}>
              <span>Overall completion rate</span>
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3>Team Members</h3>
            <span className={styles.statIcon}>👥</span>
          </div>
          <div className={styles.statNumbers}>
            <div className={styles.mainStat}>{teamPerformance.length}</div>
            <div className={styles.statBreakdown}>
              <span>Active team members</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <h2>Monthly Progress</h2>
          <div className={styles.chartContainer}>
            {monthlyProgress.map((data, index) => (
              <div key={index} className={styles.chartBar}>
                <div className={styles.barContainer}>
                  <div 
                    className={styles.barFill}
                    style={{ 
                      height: `${(data.completed / data.total) * 100}%`,
                      backgroundColor: data.completed === data.total ? '#10b981' : '#3b82f6'
                    }}
                  ></div>
                </div>
                <div className={styles.barLabel}>
                  <span className={styles.month}>{data.month}</span>
                  <span className={styles.percentage}>
                    {Math.round((data.completed / data.total) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.chartCard}>
          <h2>Team Performance</h2>
          <div className={styles.teamTable}>
            <div className={styles.tableHeader}>
              <span>Member</span>
              <span>Tasks</span>
              <span>Completed</span>
              <span>Efficiency</span>
            </div>
            {teamPerformance.map((member, index) => (
              <div key={index} className={styles.tableRow}>
                <span className={styles.memberName}>{member.name}</span>
                <span>{member.tasks}</span>
                <span>{member.completed}</span>
                <span 
                  className={styles.efficiency}
                  style={{ color: getEfficiencyColor(member.efficiency) }}
                >
                  {member.efficiency}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.insightsSection}>
        <h2>Key Insights</h2>
        <div className={styles.insightsGrid}>
          <div className={styles.insightCard}>
            <div className={styles.insightIcon}>📈</div>
            <h3>Productivity Trend</h3>
            <p>Team productivity has increased by 15% compared to last month, with an average task completion rate of 83%.</p>
          </div>
          
          <div className={styles.insightCard}>
            <div className={styles.insightIcon}>🎯</div>
            <h3>Project Success</h3>
            <p>67% of projects are completed on time, with the remaining projects showing good progress toward their deadlines.</p>
          </div>
          
          <div className={styles.insightCard}>
            <div className={styles.insightIcon}>⚡</div>
            <h3>Performance Highlights</h3>
            <p>John Doe and Jane Smith are the top performers this month, with efficiency rates above 85%.</p>
          </div>
          
          <div className={styles.insightCard}>
            <div className={styles.insightIcon}>📋</div>
            <h3>Areas for Improvement</h3>
            <p>Consider implementing better task prioritization to reduce the number of pending tasks (currently 16).</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 
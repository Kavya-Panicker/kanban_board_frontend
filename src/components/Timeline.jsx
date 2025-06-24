import React from 'react';
import styles from './Timeline.module.css';

const STATUS_COLORS = {
  todo: '#60a5fa', // blue
  inprogress: '#fbbf24', // yellow
  done: '#34d399', // green
};

const STATUS_LABELS = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
};

function getStatusCounts(tasks) {
  return tasks.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});
}

const RADIUS = 70;
const STROKE = 28;
const CIRCUM = 2 * Math.PI * RADIUS;

const Timeline = ({ tasks }) => {
  if (!tasks || tasks.length === 0) return null;
  const statusCounts = getStatusCounts(tasks);
  const total = tasks.length;
  let startAngle = 0;
  let offset = 0;

  // Prepare data for pie chart
  const segments = Object.keys(STATUS_COLORS).map((status) => {
    const value = statusCounts[status] || 0;
    const percent = value / total;
    const length = percent * CIRCUM;
    const segment = {
      status,
      value,
      percent,
      color: STATUS_COLORS[status],
      offset,
    };
    offset -= length;
    return segment;
  });

  return (
    <div className={styles.ganttWrapper}>
      <h3 className={styles.ganttTitle}>Task Status Overview</h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
        <svg width={180} height={180}>
          <g transform="rotate(-90 90 90)">
            {segments.map(seg => seg.value > 0 && (
              <circle
                key={seg.status}
                cx={90}
                cy={90}
                r={RADIUS}
                fill="none"
                stroke={seg.color}
                strokeWidth={STROKE}
                strokeDasharray={`${seg.percent * CIRCUM} ${CIRCUM}`}
                strokeDashoffset={seg.offset}
                strokeLinecap="round"
              />
            ))}
          </g>
          <text x="90" y="90" textAnchor="middle" dominantBaseline="middle" fontSize="1.5em" fill="#1f2937" fontWeight="bold">
            {total}
          </text>
          <text x="90" y="110" textAnchor="middle" fontSize="0.9em" fill="#6b7280">
            Tasks
          </text>
        </svg>
        <div>
          {segments.map(seg => (
            <div key={seg.status} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <span style={{
                display: 'inline-block',
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: seg.color,
                marginRight: 10,
              }} />
              <span style={{ fontWeight: 500, color: '#1f2937', minWidth: 90 }}>{STATUS_LABELS[seg.status]}</span>
              <span style={{ marginLeft: 8, color: '#6b7280' }}>{seg.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline; 
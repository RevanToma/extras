import { TransactionHistory } from '@/types';
import { useTheme } from 'next-themes';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';

const TransactionChart = ({
  transactions,
}: {
  transactions: TransactionHistory[];
}) => {
  const data = transactions.map((tx) => ({
    date: new Date(tx.date).toLocaleDateString(),
    amount: tx.amount * (tx.type === 'withdraw' ? -1 : 1),
  }));
  const { theme } = useTheme();

  const axisColor = theme === 'dark' ? '#f4f4f5' : '#1f2937',
    lineColor = theme === 'dark' ? '#38bdf8' : '#3b82f6';

  return (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={data}>
        <XAxis
          dataKey='date'
          tick={{ fill: axisColor }}
          axisLine={{ stroke: axisColor }}
        />
        <YAxis tick={{ fill: axisColor }} axisLine={{ stroke: axisColor }} />

        <Tooltip content={<CustomTooltip theme={theme} />} />
        <Line
          type='monotone'
          dataKey='amount'
          stroke={lineColor}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TransactionChart;

const CustomTooltip = ({
  active,
  payload,
  theme,
}: TooltipProps<number, string> & { theme: string | undefined }) => {
  if (!active || !payload || !payload.length) return null;

  const tooltipBg = theme === 'dark' ? '#1f2937' : '#ffffff',
    tooltipBorder = theme === 'dark' ? '#38bdf8' : '#3b82f6',
    tooltipTextColor = theme === 'dark' ? '#f4f4f5' : '#1f2937',
    dateColor = theme === 'dark' ? '#38bdf8' : '#3b82f6';

  return (
    <div
      className='p-2 rounded-md shadow-lg'
      style={{
        backgroundColor: tooltipBg,
        border: `1px solid ${tooltipBorder}`,
        color: tooltipTextColor,
      }}
    >
      <p style={{ color: dateColor, fontWeight: 'bold' }}>
        {payload[0].payload.date}
      </p>
      <p>{`Amount: $${payload[0]?.value?.toFixed(2)}`}</p>
    </div>
  );
};

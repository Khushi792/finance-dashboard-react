import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TopCategoriesChart = ({ data = [] }) => {

  // Generate colors
  const generateColors = (count) => {
    const colors = [];
    const hueStep = 360 / Math.max(1, count);

    for (let i = 0; i < count; i++) {
      const hue = i * hueStep;
      colors.push(`hsl(${hue}, 70%, 60%)`);
    }

    return colors;
  };

  // Prepare data
  const chartData = useMemo(() => {
    return data.map((item) => ({
      name: item.category,
      value: item.amount,
    }));
  }, [data]);

  const colors = generateColors(chartData.length);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const total = chartData.reduce((sum, d) => sum + d.value, 0);
      const value = payload[0].value;
      const percentage = Math.round((value / total) * 100);

      return (
        <div className="bg-white dark:bg-gray-800 p-2 rounded shadow text-sm">
          <p>{payload[0].name}</p>
          <p>₹{value.toLocaleString()} ({percentage}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow h-80">
      <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
        Spending by Category
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}   // 🔥 Doughnut style
              outerRadius={100}
              paddingAngle={3}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={colors[index]} />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopCategoriesChart;
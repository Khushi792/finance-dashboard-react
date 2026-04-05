import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const Insights = ({ transactions = [], theme = "light" }) => {

  const fmt = (num) => `₹${num.toLocaleString()}`;
  const fmtShort = (num) => `₹${Math.round(num).toLocaleString()}`;

  const getMonthKey = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  };

  const monthLabel = (key) => {
    const [y, m] = key.split("-");
    return new Date(y, m - 1).toLocaleString("default", {
      month: "short",
    });
  };

  // All calculations
  const {
    topCategory,
    topCategoryAmount,
    chartData,
    avgExpense,
    savingsRate,
    observations,
  } = useMemo(() => {
    const expTotals = {};
    const monthlyMap = {};

    transactions.forEach((t) => {
      const key = getMonthKey(t.date);

      if (!monthlyMap[key]) {
        monthlyMap[key] = { income: 0, expense: 0 };
      }

      monthlyMap[key][t.type] += t.amount;

      if (t.type === "expense") {
        expTotals[t.category] =
          (expTotals[t.category] || 0) + t.amount;
      }
    });

    const topCatEntry = Object.entries(expTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];

    const entries = Object.entries(monthlyMap).map(
      ([k, v]) => ({
        key: k,
        month: monthLabel(k),
        income: v.income,
        expense: v.expense,
        net: v.income - v.expense,
      })
    );

    const sorted = entries.sort((a, b) =>
      a.key.localeCompare(b.key)
    );

    const last6 = sorted.slice(-6);

    const avgExp =
      last6.length > 0
        ? last6.reduce((s, m) => s + m.expense, 0) /
          last6.length
        : 0;

    const now = new Date();
    const curKey = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;

    const cur = monthlyMap[curKey] || {
      income: 0,
      expense: 0,
    };

    const rate =
      cur.income > 0
        ? Math.round(
            ((cur.income - cur.expense) / cur.income) * 100
          )
        : 0;

    // Observations
    const obs = [];

    if (topCatEntry) {
      obs.push(
        `📊 Biggest expense: ${topCatEntry[0]} (${fmt(
          topCatEntry[1]
        )})`
      );
    }

    if (cur.income > 0) {
      if (rate >= 30)
        obs.push(`🎉 Great savings rate: ${rate}%`);
      else if (rate >= 0)
        obs.push(`💡 Savings rate: ${rate}% (aim 20%+)`);
      else obs.push(`⚠️ Spending exceeds income`);
    }

    if (avgExp > 0 && cur.expense > 0) {
      const diff =
        ((cur.expense - avgExp) / avgExp) * 100;

      if (diff > 15)
        obs.push(
          `🔺 Expenses ${Math.round(
            diff
          )}% higher than average`
        );
      else if (diff < -10)
        obs.push(
          `✅ Expenses ${Math.abs(
            Math.round(diff)
          )}% lower than average`
        );
    }

    if (!obs.length) obs.push("📌 Add data to see insights");

    return {
      topCategory: topCatEntry?.[0] || "—",
      topCategoryAmount: topCatEntry
        ? fmt(topCatEntry[1])
        : "",
      chartData: last6,
      avgExpense: avgExp,
      savingsRate: rate,
      observations: obs,
    };
  }, [transactions]);

  return (
    <section className="p-4 space-y-6">
<div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 text-center">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
    Insights
  </h1>
</div>
      {/* Insight Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <div className="text-sm text-gray-500">
            Highest Spending
          </div>
          <div className="text-lg font-bold">
            {topCategory}
          </div>
          <div className="text-sm">
            {topCategoryAmount}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <div className="text-sm text-gray-500">
            Avg Expense
          </div>
          <div className="text-lg font-bold">
            {fmtShort(avgExpense)}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <div className="text-sm text-gray-500">
            Savings Rate
          </div>
          <div className="text-lg font-bold">
            {savingsRate}%
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Net Savings */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow h-72">
          <h3 className="text-sm mb-2">Net Savings</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v) => fmt(v)} />
              <Bar dataKey="net" fill="#4ade80" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Income vs Expense */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow h-72">
          <h3 className="text-sm mb-2">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v) => fmt(v)} />
              <Legend />
              <Bar dataKey="income" fill="#22c55e" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Observations */}
      <div>
        <h3 className="font-bold mb-2">
          Smart Observations
        </h3>
        <div className="space-y-2">
          {observations.map((o, i) => (
            <div
              key={i}
              className="bg-gray-100 dark:bg-gray-700 p-2 rounded"
            >
              {o}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
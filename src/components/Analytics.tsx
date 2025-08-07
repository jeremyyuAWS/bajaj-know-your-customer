import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, MapPin, Target, Users, Activity, AlertCircle, CheckCircle } from 'lucide-react';
import analyticsData from '../data/analytics.json';

export const Analytics: React.FC = () => {
  const COLORS = {
    low: '#22c55e',
    medium: '#f59e0b', 
    high: '#ef4444',
    primary: '#000000',
    secondary: '#6b7280'
  };

  const pieColors = ['#22c55e', '#f59e0b', '#ef4444'];

  const totalAnalyses = analyticsData.monthly_analysis.reduce((sum, item) => sum + item.analyses, 0);
  const avgProcessingTime = analyticsData.monthly_analysis.reduce((sum, item) => sum + item.avg_processing_time, 0) / analyticsData.monthly_analysis.length;

  const kpiCards = [
    {
      title: 'Total Analyses',
      value: totalAnalyses.toString(),
      change: '+23%',
      icon: Target,
      positive: true
    },
    {
      title: 'Avg Processing Time',
      value: `${avgProcessingTime.toFixed(1)}s`,
      change: '-15%',
      icon: Clock,
      positive: true
    },
    {
      title: 'Success Rate',
      value: '98.6%',
      change: '+2%',
      icon: CheckCircle,
      positive: true
    },
    {
      title: 'Active Locations',
      value: '1,247',
      change: '+8%',
      icon: MapPin,
      positive: true
    }
  ];

  return (
    <div className="p-6 max-w-7xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">Analytics Dashboard</h2>
        <p className="text-gray-600">Insights and performance metrics for KYG risk assessments</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiCards.map(({ title, value, change, icon: Icon, positive }) => (
          <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-100 rounded-xl">
                <Icon className="h-6 w-6 stroke-black" />
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                positive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
              }`}>
                {change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-black mb-1">{value}</h3>
            <p className="text-gray-600 text-sm">{title}</p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Risk Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-6 flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Risk Level Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.risk_distribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                label={({ risk_level, percentage }) => `${risk_level}: ${percentage}%`}
              >
                {analyticsData.risk_distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Analysis Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Monthly Analysis Volume
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.monthly_analysis}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="analyses" 
                stroke={COLORS.primary} 
                strokeWidth={3}
                dot={{ fill: COLORS.primary, strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Top Analyzed Locations */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-6 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Top Analyzed Locations
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.top_locations}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="location" stroke="#6b7280" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="analyses" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Agent Performance */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-6 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Agent Performance
          </h3>
          <div className="space-y-4">
            {analyticsData.agent_performance.map((agent) => (
              <div key={agent.agent} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-medium text-black">{agent.agent}</h4>
                    <p className="text-sm text-gray-600">{agent.avg_time}s avg time</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-black">{agent.success_rate}%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Factors Impact Analysis */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold text-black mb-6 flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Processing Time Trends by Agent
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData.processing_trends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Line type="monotone" dataKey="geolocation" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', r: 4 }} />
            <Line type="monotone" dataKey="data_retrieval" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
            <Line type="monotone" dataKey="risk_scoring" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 4 }} />
            <Line type="monotone" dataKey="recommendation" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Geolocation Agent</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Data Retrieval Agent</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Risk Scoring Agent</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Recommendation Agent</span>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-black mb-6">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h4 className="font-medium text-black">Volume Growth</h4>
            </div>
            <p className="text-sm text-gray-700">Analysis volume increased 73% over the last 6 months, indicating growing adoption.</p>
          </div>

          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-green-600" />
              <h4 className="font-medium text-black">Processing Speed</h4>
            </div>
            <p className="text-sm text-gray-700">Average processing time improved 15% due to agent optimization and caching.</p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <h4 className="font-medium text-black">Risk Balance</h4>
            </div>
            <p className="text-sm text-gray-700">45% low risk, 40% medium risk, 15% high risk - healthy portfolio distribution.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Edit, Save, X, Eye, EyeOff, Shield, Lock, Search } from 'lucide-react';

interface AdminPanelProps {
  lastAnalysis: any;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ lastAnalysis }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState('');
  const [showRawData, setShowRawData] = useState(false);
  const [auditTrailEnabled, setAuditTrailEnabled] = useState(true);
  const [explainabilityEnabled, setExplainabilityEnabled] = useState(true);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedSummary(lastAnalysis?.recommendation || '');
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would update the analysis
    console.log('Updated summary:', editedSummary);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedSummary('');
  };

  const auditData = {
    timestamp: new Date().toISOString(),
    user_id: "underwriter_001",
    location_query: lastAnalysis?.location || "N/A",
    agents_involved: ["geolocation", "data-retrieval", "risk-scoring", "recommendation"],
    processing_time: "2.8s",
    data_sources: ["FBI UCR", "Census Bureau", "NOAA", "Internal Claims DB"],
    compliance_flags: []
  };

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">Admin & Human-in-the-Loop</h2>
        <p className="text-gray-600">Review, edit, and audit AI-generated assessments</p>
      </div>

      {/* Responsible AI Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Responsible AI Controls
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <Search className="h-5 w-5 text-gray-600" />
              <div>
                <div className="font-medium text-black">Audit Trail</div>
                <div className="text-sm text-gray-600">Log all decisions</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={auditTrailEnabled}
                onChange={(e) => setAuditTrailEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <Lock className="h-5 w-5 text-gray-600" />
              <div>
                <div className="font-medium text-black">No PII Stored</div>
                <div className="text-sm text-gray-600">Privacy protection</div>
              </div>
            </div>
            <div className="w-11 h-6 bg-green-200 rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-green-600 rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <Eye className="h-5 w-5 text-gray-600" />
              <div>
                <div className="font-medium text-black">Explainability</div>
                <div className="text-sm text-gray-600">Show reasoning</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={explainabilityEnabled}
                onChange={(e) => setExplainabilityEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>

      {lastAnalysis && (
        <div className="space-y-6">
          {/* Editable Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">AI Recommendation Review</h3>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            {isEditing ? (
              <textarea
                value={editedSummary}
                onChange={(e) => setEditedSummary(e.target.value)}
                className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Edit the AI recommendation..."
              />
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{lastAnalysis.recommendation}</p>
              </div>
            )}
          </div>

          {/* JSON Viewer */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Raw Analysis Data</h3>
              <button
                onClick={() => setShowRawData(!showRawData)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                {showRawData ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>{showRawData ? 'Hide' : 'Show'} JSON</span>
              </button>
            </div>

            {showRawData && (
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-sm max-h-96">
                {JSON.stringify(lastAnalysis, null, 2)}
              </pre>
            )}
          </div>

          {/* Audit Trail */}
          {auditTrailEnabled && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-black mb-4">Audit Trail</h3>
              <div className="space-y-3">
                {Object.entries(auditData).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0">
                    <span className="font-medium text-gray-600 capitalize">
                      {key.replace(/_/g, ' ')}:
                    </span>
                    <span className="text-black text-right max-w-md">
                      {Array.isArray(value) ? value.join(', ') : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!lastAnalysis && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
          <p className="text-gray-600">No analysis data available. Run a risk analysis first to see admin controls.</p>
        </div>
      )}
    </div>
  );
};
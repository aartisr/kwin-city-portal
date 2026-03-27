'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FilterAndExportProps {
  data: any[];
  dataType: 'evidence' | 'timeline' | 'sectors';
  title: string;
}

export default function FilterAndExport({ data, dataType, title }: FilterAndExportProps) {
  const [filterText, setFilterText] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');

  // Extract unique filter categories based on data type
  const getFilterOptions = () => {
    if (dataType === 'evidence') {
      return ['Verified', 'Pending', 'Contextual'];
    } else if (dataType === 'timeline') {
      return ['Infrastructure', 'Policy', 'Milestone', 'Data', 'Research'];
    } else if (dataType === 'sectors') {
      return ['Knowledge', 'Wellbeing', 'Innovation', 'Manufacturing', 'Green'];
    }
    return [];
  };

  // Filter data based on search and category filters
  const filteredData = data.filter((item) => {
    const matchesText = JSON.stringify(item).toLowerCase().includes(filterText.toLowerCase());
    const matchesFilter =
      selectedFilters.length === 0 ||
      selectedFilters.some((filter) =>
        JSON.stringify(item).toLowerCase().includes(filter.toLowerCase())
      );
    return matchesText && matchesFilter;
  });

  // Export to CSV
  const exportToCSV = () => {
    if (filteredData.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(filteredData[0]);
    const csvContent = [
      headers.join(','),
      ...filteredData.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            return typeof value === 'string' && value.includes(',')
              ? `"${value}"`
              : value;
          })
          .join(',')
      ),
    ].join('\n');

    downloadFile(csvContent, `${dataType}-export.csv`, 'text/csv');
  };

  // Export to JSON
  const exportToJSON = () => {
    if (filteredData.length === 0) {
      alert('No data to export');
      return;
    }

    const jsonContent = JSON.stringify(filteredData, null, 2);
    downloadFile(jsonContent, `${dataType}-export.json`, 'application/json');
  };

  // Helper function to download file
  const downloadFile = (content: string, filename: string, type: string) => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:${type};charset=utf-8,${encodeURIComponent(content)}`);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 mb-8 border border-slate-200"
    >
      <h3 className="text-lg font-bold text-slate-900 mb-4">Filter & Export {title}</h3>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by keyword..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category filters */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Filter by:</label>
        <div className="flex flex-wrap gap-2">
          {getFilterOptions().map((filter) => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedFilters.includes(filter)
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-300 hover:border-blue-500'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Export section */}
      <div className="flex items-center justify-between bg-white rounded-lg p-4 border border-slate-200">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-600">
            {filteredData.length} result{filteredData.length !== 1 ? 's' : ''}
          </span>
          <div className="flex gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="format"
                value="csv"
                checked={exportFormat === 'csv'}
                onChange={(e) => setExportFormat(e.target.value as 'csv' | 'json')}
                className="w-4 h-4"
              />
              <span className="text-sm text-slate-700">CSV</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="format"
                value="json"
                checked={exportFormat === 'json'}
                onChange={(e) => setExportFormat(e.target.value as 'csv' | 'json')}
                className="w-4 h-4"
              />
              <span className="text-sm text-slate-700">JSON</span>
            </label>
          </div>
        </div>

        <button
          onClick={exportFormat === 'csv' ? exportToCSV : exportToJSON}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <span>📥</span>
          Export
        </button>
      </div>
    </motion.div>
  );
}

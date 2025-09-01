import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Package {
  name: string;
  hits: number;
  bandwidth: number;
  hitsChange: number;
  bandwidthChange: number;
}

const mockPackages: Package[] = [
  { name: "react", hits: 3.59, bandwidth: 46.77, hitsChange: 29.88, bandwidthChange: -9.83 },
  { name: "webpack", hits: 2.29, bandwidth: 34.05, hitsChange: 29.00, bandwidthChange: 17.13 },
  { name: "express", hits: 9.56, bandwidth: 44.60, hitsChange: 27.89, bandwidthChange: 23.75 },
  { name: "lodash", hits: 7.10, bandwidth: 87.51, hitsChange: 24.38, bandwidthChange: 4.79 },
  { name: "vue", hits: 9.21, bandwidth: 37.26, hitsChange: 23.39, bandwidthChange: 0.15 },
  { name: "tailwindcss", hits: 1.69, bandwidth: 88.32, hitsChange: 22.75, bandwidthChange: 4.07 },
  { name: "chart.js", hits: 8.25, bandwidth: 49.61, hitsChange: 22.25, bandwidthChange: 2.49 },
  { name: "moment", hits: 6.52, bandwidth: 89.79, hitsChange: 18.16, bandwidthChange: 9.30 },
  { name: "jquery", hits: 3.83, bandwidth: 106.03, hitsChange: 15.03, bandwidthChange: 23.79 },
];

interface FilterState {
  isOpen: boolean;
  minHits: string;
  minBandwidth: string;
  region: string;
  specificMonth: string;
}

export default function PackagesList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<FilterState>({
    isOpen: false,
    minHits: "",
    minBandwidth: "",
    region: "Specific month",
    specificMonth: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredPackages = mockPackages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatNumber = (num: number) => {
    return num.toFixed(2);
  };

  const formatChange = (change: number) => {
    const isPositive = change > 0;
    return (
      <span className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? '+' : ''}{change.toFixed(2)}%
        {isPositive ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </span>
    );
  };

  const FilterContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`${isMobile ? 'p-6' : 'p-4'} space-y-6`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filter</h3>
        {isMobile && (
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Minimum Hits (Billions)
        </label>
        <select className="w-full p-2 border border-gray-200 rounded-md text-sm">
          <option>Filter by hits</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Minimum Bandwidth (GBs)
        </label>
        <select className="w-full p-2 border border-gray-200 rounded-md text-sm">
          <option>Filter by bandwidth</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Region
        </label>
        <div className="space-y-2">
          {["Day", "Week", "Month", "Quarter", "$ - month", "$ - quarter", "$ - year", "Specific month", "Specific quarter", "Specific year"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="region"
                value={option}
                checked={filter.region === option}
                onChange={(e) => setFilter(prev => ({ ...prev, region: e.target.value }))}
                className="mr-2"
              />
              <span className="text-sm">{option}</span>
              {option === "Specific month" && filter.region === option && (
                <div className="ml-auto w-4 h-4 bg-black rounded-full"></div>
              )}
            </label>
          ))}
        </div>
      </div>

      {filter.region === "Specific month" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specific month
          </label>
          <input
            type="text"
            placeholder="e.g., 2025-01"
            className="w-full p-2 border border-gray-200 rounded-md text-sm"
            value={filter.specificMonth}
            onChange={(e) => setFilter(prev => ({ ...prev, specificMonth: e.target.value }))}
          />
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button variant="outline" className="flex-1">Reset</Button>
        <Button className="flex-1">Apply</Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">GitHub Packages list</h1>
        <p className="text-gray-600">Explore information about different packages</p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            onClick={() => setIsMobileFilterOpen(true)}
            className="sm:hidden flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filter
            <ChevronDown className="w-4 h-4" />
          </Button>
          
          {/* Desktop Filter Button */}
          <Button
            variant="outline"
            onClick={() => setFilter(prev => ({ ...prev, isOpen: !prev.isOpen }))}
            className="hidden sm:flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filter
            <ChevronDown className="w-4 h-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M7 12h10m-7 6h4" />
            </svg>
          </Button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hits (Billions)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bandwidth (GBs)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hits Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bandwidth Change
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPackages.map((pkg, index) => (
                  <tr key={pkg.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      <Link
                        to={`/package/${pkg.name}`}
                        className="hover:text-blue-600 hover:underline cursor-pointer"
                      >
                        {pkg.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {formatNumber(pkg.hits)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {formatNumber(pkg.bandwidth)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatChange(pkg.hitsChange)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatChange(pkg.bandwidthChange)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredPackages.map((pkg) => (
              <div key={pkg.name} className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-3">{pkg.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hits (Billions):</span>
                    <span className="font-medium">{formatNumber(pkg.hits)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bandwidth (GBs):</span>
                    <span className="font-medium">{formatNumber(pkg.bandwidth)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hits Change:</span>
                    {formatChange(pkg.hitsChange)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bandwidth Change:</span>
                    {formatChange(pkg.bandwidthChange)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <span className="text-sm text-gray-600">
              Page 1 of 2
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Filter Sidebar */}
        {filter.isOpen && (
          <div className="hidden sm:block w-80 bg-white border border-gray-200 rounded-lg h-fit">
            <FilterContent />
          </div>
        )}
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg max-h-[80vh] overflow-y-auto">
            <FilterContent isMobile />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          Powered by <span className="font-medium">subgraph</span>
        </p>
      </footer>
    </div>
  );
}

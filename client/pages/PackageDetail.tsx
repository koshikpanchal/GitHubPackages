import { useParams } from "react-router-dom";
import { ArrowUp, ArrowDown, Download, ArrowUpDown, Bookmark, Share, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";
import Header from "../components/Header";

interface PackageData {
  name: string;
  version: string;
  description: string;
  hits: number;
  bandwidth: number;
  hitsChange: number;
  bandwidthChange: number;
  tags: Array<{
    version: string;
    downloads: string;
    tag: string;
  }>;
  versions: Array<{
    version: string;
    downloads: string;
    published: string;
  }>;
}

// Mock data - in real app this would come from API
const packageData: Record<string, PackageData> = {
  react: {
    name: "react",
    version: "v1.2.3",
    description: "Download description for downloading React",
    hits: 3.59,
    bandwidth: 46.77,
    hitsChange: 29.88,
    bandwidthChange: -9.83,
    tags: [
      { version: "0.0.4", downloads: "71,208", tag: "Latest" },
      { version: "0.0.0 - beta0.9b4f01c", downloads: "39", tag: "beta" },
    ],
    versions: [
      { version: "0.0.4", downloads: "71,208", published: "2 years ago" },
      { version: "0.0.0 - beta0.9b4f01c", downloads: "39", published: "2 years ago" },
      { version: "0.0.0 - beta.7bf3ee4", downloads: "0", published: "2 years ago" },
      { version: "0.0.0 - beta.fec42fe", downloads: "0", published: "2 years ago" },
      { version: "0.0.3", downloads: "19", published: "2 years ago" },
      { version: "0.0.0 - beta.2b7444d", downloads: "0", published: "2 years ago" },
      { version: "0.0.0 - beta.f068b42", downloads: "0", published: "2 years ago" },
      { version: "0.0.0 - beta.b02af45", downloads: "0", published: "2 years ago" },
      { version: "0.0.2", downloads: "4", published: "2 years ago" },
    ],
  },
  webpack: {
    name: "webpack",
    version: "v5.2.1",
    description: "Module bundler for modern JavaScript applications",
    hits: 2.29,
    bandwidth: 34.05,
    hitsChange: 29.00,
    bandwidthChange: 17.13,
    tags: [
      { version: "5.2.1", downloads: "125,432", tag: "Latest" },
      { version: "5.2.0", downloads: "98,234", tag: "stable" },
    ],
    versions: [
      { version: "5.2.1", downloads: "125,432", published: "1 month ago" },
      { version: "5.2.0", downloads: "98,234", published: "2 months ago" },
      { version: "5.1.9", downloads: "87,654", published: "3 months ago" },
    ],
  },
  express: {
    name: "express",
    version: "v4.18.2",
    description: "Fast, unopinionated web framework for Node.js",
    hits: 9.56,
    bandwidth: 44.60,
    hitsChange: 27.89,
    bandwidthChange: 23.75,
    tags: [
      { version: "4.18.2", downloads: "2,345,678", tag: "Latest" },
      { version: "4.18.1", downloads: "1,987,543", tag: "stable" },
    ],
    versions: [
      { version: "4.18.2", downloads: "2,345,678", published: "2 weeks ago" },
      { version: "4.18.1", downloads: "1,987,543", published: "1 month ago" },
      { version: "4.18.0", downloads: "1,654,321", published: "2 months ago" },
    ],
  },
};

const StatCard = ({ 
  icon, 
  label, 
  value, 
  change, 
  isPositive 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  change?: number; 
  isPositive?: boolean; 
}) => (
  <div className="flex max-h-40 p-6 items-start gap-5 flex-1 rounded-2xl border border-gray-300 bg-white">
    <div className="text-blue-600 flex-shrink-0">
      {icon}
    </div>
    <div className="flex flex-col items-start gap-3">
      <div className="text-gray-400 text-lg font-normal uppercase tracking-wide">
        {label}
      </div>
      <div className="text-blue-900 text-2xl font-bold leading-7">
        {value}
      </div>
      {change !== undefined && (
        <div className={`flex items-center gap-1 text-sm font-bold ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          {isPositive ? '+' : ''}{change.toFixed(2)}%
        </div>
      )}
    </div>
  </div>
);

const ChartComponent = () => (
  <div className="flex flex-col items-start gap-4 self-stretch bg-white">
    <div className="flex flex-col justify-center items-end gap-6 self-stretch">
      <div className="flex items-center gap-6">
        <div className="flex items-start gap-1">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-gray-600 text-xs font-normal">Bandwidth</span>
        </div>
        <div className="flex items-start gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-500 border border-blue-500"></div>
          <span className="text-gray-600 text-xs font-normal">HIT</span>
        </div>
      </div>
    </div>
    
    {/* Chart placeholder - would use a real chart library like recharts */}
    <div className="w-full h-64 bg-gray-50 rounded-lg flex items-center justify-center border">
      <div className="text-gray-500 text-center">
        <div className="text-lg font-semibold">Downloads Chart</div>
        <div className="text-sm">Chart visualization would go here</div>
        <div className="text-xs mt-2">Use a library like Recharts for actual implementation</div>
      </div>
    </div>
    
    <div className="flex justify-between items-center self-stretch">
      <span className="text-gray-400 text-xs">1st Jan</span>
      <span className="text-gray-400 text-xs">6th Jan</span>
      <span className="text-gray-400 text-xs">10th Jan</span>
    </div>
  </div>
);

export default function PackageDetail() {
  const { packageName } = useParams<{ packageName: string }>();
  const pkg = packageName ? packageData[packageName] : null;

  if (!pkg) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Package Not Found</h1>
            <p className="text-gray-600">The package "{packageName}" could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-12">
          
          {/* Header Container */}
          <div className="flex flex-col gap-8 p-12 rounded-2xl bg-white shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-start gap-5">
                {/* Package Icon */}
                <div className="flex pt-2 items-center gap-2">
                  <div className="flex h-14 min-h-14 p-3 justify-center items-center gap-2 rounded bg-blue-300">
                    <svg width="32" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.90833 11.6147C5.43899 12.5787 3.16699 14.1827 3.16699 16.0001C3.16699 18.9467 9.13633 21.3334 16.5003 21.3334C17.531 21.3334 18.535 21.2867 19.4977 21.1974M24.0897 20.3854C27.5603 19.4227 29.8337 17.8174 29.8337 16.0001C29.8337 13.0534 23.8643 10.6667 16.5003 10.6667C15.4697 10.6667 14.4657 10.7134 13.5003 10.8027M8.90698 20.3827C8.00564 23.8694 8.26031 26.6401 9.83364 27.5467C12.3843 29.0201 17.4376 25.0441 21.119 18.6667C21.635 17.7734 22.0963 16.8814 22.5003 16.0001M24.0924 11.6214C24.995 8.1334 24.7417 5.36006 23.167 4.4534C20.6164 2.98006 15.563 6.95606 11.8817 13.3334C11.3657 14.2267 10.9044 15.1201 10.499 16.0001M16.5003 7.23209C13.9336 4.70942 11.407 3.54409 9.83364 4.45342C7.28297 5.92542 8.19897 12.2894 11.8816 18.6668C12.3963 19.5601 12.939 20.4054 13.4976 21.1948M16.5003 24.7654C19.0683 27.2894 21.595 28.4561 23.167 27.5467C25.7177 26.0747 24.8017 19.7107 21.119 13.3334C20.619 12.4667 20.079 11.6227 19.503 10.8041M15.8337 17.1548C15.9853 17.2437 16.1531 17.3017 16.3274 17.3256C16.5016 17.3494 16.6788 17.3385 16.8488 17.2936C17.0188 17.2486 17.1782 17.1705 17.3179 17.0637C17.4576 16.9569 17.5747 16.8235 17.6627 16.6712C17.7506 16.5189 17.8075 16.3508 17.8302 16.1764C17.8529 16.002 17.8408 15.8249 17.7947 15.6552C17.7487 15.4855 17.6695 15.3266 17.5617 15.1876C17.454 15.0486 17.3198 14.9323 17.167 14.8454C16.8609 14.6714 16.4984 14.6255 16.1586 14.7178C15.8188 14.81 15.5293 15.0329 15.3533 15.3378C15.1772 15.6428 15.1289 16.0049 15.2189 16.3453C15.3089 16.6857 15.5299 16.9767 15.8337 17.1548Z" stroke="#191919" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                {/* Title and Description */}
                <div className="flex flex-col justify-center items-start gap-2">
                  <h1 className="text-black text-3xl font-bold leading-8 tracking-wide">
                    {pkg.name}
                  </h1>
                  <div className="flex items-start gap-3">
                    <div className="flex px-2 py-1 justify-center items-center gap-2 rounded-full bg-black">
                      <span className="text-white text-xs font-bold leading-5 tracking-wide">npm</span>
                    </div>
                    <span className="text-black text-sm font-normal leading-5 tracking-wide">{pkg.version}</span>
                    <span className="text-black text-sm font-normal leading-5 tracking-wide">MT</span>
                  </div>
                  <p className="text-black text-sm font-normal leading-5 tracking-wide">
                    {pkg.description}
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-start gap-3">
                <Button variant="secondary" size="lg" className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  Favourite
                </Button>
                <Button variant="secondary" size="lg" className="flex items-center gap-2">
                  <Share className="w-4 h-4" />
                  Share
                </Button>
                <Button size="lg" className="flex items-center gap-2 bg-blue-600">
                  <ExternalLink className="w-4 h-4" />
                  Repository
                </Button>
              </div>
            </div>
            
            {/* Stats Container */}
            <div className="flex items-start gap-8 flex-wrap">
              <StatCard
                icon={<Download className="w-10 h-10" strokeWidth={1} />}
                label="HITS"
                value={`${pkg.hits}B`}
              />
              <StatCard
                icon={<ArrowsUpDown className="w-10 h-10" strokeWidth={1} />}
                label="BANDWIDTH"
                value={`${pkg.bandwidth}GB`}
              />
              <StatCard
                icon={<ArrowUp className="w-10 h-10 text-green-500" strokeWidth={1} />}
                label="HITS CHANGE"
                value={`+${pkg.hitsChange}%`}
                change={pkg.hitsChange}
                isPositive={pkg.hitsChange > 0}
              />
              <StatCard
                icon={<ArrowsUpDown className="w-10 h-10" strokeWidth={1} />}
                label="BANDWIDTH CHANGE"
                value={`${pkg.bandwidthChange}%`}
                change={pkg.bandwidthChange}
                isPositive={pkg.bandwidthChange > 0}
              />
            </div>
          </div>
          
          {/* Content Container */}
          <div className="flex items-start gap-12">
            
            {/* Left Panel - Tables */}
            <div className="flex w-full max-w-3xl flex-col gap-8 p-12 rounded-2xl bg-white shadow-sm">
              
              {/* Current Tags */}
              <div className="flex flex-col gap-3">
                <h2 className="text-black text-3xl font-bold leading-8 tracking-wide">Current tags</h2>
                <div className="flex items-start self-stretch rounded-lg border border-gray-300">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-purple-50">
                        <th className="flex h-11 px-6 py-3 items-center gap-1 border-b border-purple-200 text-left">
                          <span className="text-black text-sm font-bold leading-5 tracking-wide">Version</span>
                        </th>
                        <th className="px-6 py-3 border-b border-purple-200 text-left">
                          <span className="text-black text-sm font-bold leading-5 tracking-wide">Downloads (Last 7 days)</span>
                        </th>
                        <th className="px-6 py-3 border-b border-purple-200 text-left">
                          <span className="text-black text-sm font-bold leading-5 tracking-wide">Tag</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pkg.tags.map((tag, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="px-6 py-4 text-gray-500 text-lg font-normal leading-5 tracking-wide">
                            {tag.version}
                          </td>
                          <td className="px-6 py-4 text-gray-500 text-lg font-normal leading-5 tracking-wide">
                            {tag.downloads}
                          </td>
                          <td className="px-6 py-4 text-gray-500 text-lg font-normal leading-5 tracking-wide">
                            {tag.tag}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Version History */}
              <div className="flex flex-col gap-3">
                <h2 className="text-black text-3xl font-bold leading-8 tracking-wide">Version history</h2>
                <div className="flex items-start self-stretch rounded-lg border border-gray-300">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-purple-50">
                        <th className="flex h-11 px-6 py-3 items-center gap-1 border-b border-purple-200 text-left">
                          <span className="text-black text-sm font-bold leading-5 tracking-wide">Version</span>
                        </th>
                        <th className="px-6 py-3 border-b border-purple-200 text-left">
                          <span className="text-black text-sm font-bold leading-5 tracking-wide">Downloads (Last 7 days)</span>
                        </th>
                        <th className="px-6 py-3 border-b border-purple-200 text-left">
                          <span className="text-black text-sm font-bold leading-5 tracking-wide">Published</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pkg.versions.map((version, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="px-6 py-4 text-gray-500 text-lg font-normal leading-5 tracking-wide">
                            {version.version}
                          </td>
                          <td className="px-6 py-4 text-gray-500 text-lg font-normal leading-5 tracking-wide">
                            {version.downloads}
                          </td>
                          <td className="px-6 py-4 text-gray-500 text-lg font-normal leading-5 tracking-wide">
                            {version.published}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Right Panel - Chart */}
            <div className="flex flex-col gap-8 p-12 flex-1 rounded-2xl bg-white shadow-sm">
              <div className="flex justify-between items-end self-stretch">
                <div className="flex flex-col justify-center items-start gap-2">
                  <h2 className="text-black text-3xl font-bold leading-8 tracking-wide">Package Downloads</h2>
                  <p className="text-black text-sm font-normal leading-5 tracking-wide">Last 10 days</p>
                </div>
                <div className="flex px-2 py-0.5 justify-center items-center gap-1 rounded-full bg-green-300">
                  <ArrowUp className="w-4 h-4 text-green-700" />
                  <span className="text-green-700 text-xs font-bold leading-5 tracking-wide">58.33%</span>
                </div>
              </div>
              <ChartComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

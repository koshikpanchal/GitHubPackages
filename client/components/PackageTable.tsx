import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

export const formatChange = (change: number) => {
  const isPositive = change > 0;
  return (
    <span
      className={`flex items-center gap-1 ${isPositive ? "text-green-600" : "text-red-600"}`}
    >
      {isPositive ? "+" : ""}
      {change}%
      {isPositive ? (
        <ChevronUp className="w-3 h-3" />
      ) : (
        <ChevronDown className="w-3 h-3" />
      )}
    </span>
  );
};

const PackageTable = ({ packages }) => {
  return (
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
          {packages.map((pkg, index) => (
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
                {pkg.hits}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                {pkg.bandwidth}
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
  );
};

export default PackageTable;

import { Link } from "react-router-dom";
import { formatChange } from "./PackageTable";

const PackageCard = ({ packages }) => {
  return (
    <div className="lg:hidden space-y-4">
      {packages.map((pkg) => (
        <div
          key={pkg.name}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <h3 className="font-semibold text-lg text-gray-900 mb-3">
            <Link
              to={`/package/${pkg.name}`}
              className="hover:text-blue-600 hover:underline cursor-pointer"
            >
              {pkg.name}
            </Link>
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Hits (Billions):</span>
              <span className="font-medium">{pkg.hits}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bandwidth (GBs):</span>
              <span className="font-medium">{pkg.bandwidth}</span>
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
  );
};

export default PackageCard;

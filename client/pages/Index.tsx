import Header from "../components/Header";
import PackagesList from "../components/PackagesList";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PackagesList />
    </div>
  );
}

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="h-[100dvh] flex max-w-4xl bg-gray-100 mx-auto md:my-7 md:rounded-2xl md:h-[90vh] md:gap-7 ">
      <Sidebar />

      <div className="flex-1 flex flex-col md:rounded-2xl md:overflow-hidden md:shadow-lg">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

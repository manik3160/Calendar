import WallCalendar from "../components/WallCalendar";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-transparent pointer-events-none" aria-hidden="true" />
      <WallCalendar />
    </main>
  );
}

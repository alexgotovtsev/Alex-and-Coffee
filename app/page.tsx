import Btn from './components/Btn';

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-12">
      <h1 className="text-2xl font-bold">Alex & Coffee</h1>
      <Btn />
    </main>
  );
}

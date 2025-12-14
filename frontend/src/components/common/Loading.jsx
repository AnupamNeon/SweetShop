import { Candy } from 'lucide-react';

export default function Loading({ fullScreen = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <Candy className="w-12 h-12 text-teal-500 animate-bounce" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-teal-100 border-t-teal-500 rounded-full animate-spin" />
        </div>
      </div>
      <p className="text-sm font-medium text-slate-500 animate-pulse">
        Loading sweet treats...
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      {content}
    </div>
  );
}
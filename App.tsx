import React, { useState } from 'react';
import HDDScene from './components/HDDScene';
import { HDD_PARTS } from './data';
import { PartId } from './types';

function App() {
  const [selectedPartId, setSelectedPartId] = useState<PartId | null>(null);

  const selectedPart = selectedPartId ? HDD_PARTS[selectedPartId] : null;

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col md:flex-row overflow-hidden relative" dir="rtl">
      
      {/* 3D Scene Container */}
      <div className="w-full h-full md:w-2/3 lg:w-3/4 relative z-0">
        <HDDScene 
          onPartSelect={setSelectedPartId} 
          selectedPartId={selectedPartId} 
        />
        
        {/* Instruction Overlay */}
        <div className="absolute top-4 right-4 pointer-events-none z-10">
          <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl text-white max-w-sm pointer-events-auto">
            <h1 className="text-2xl font-bold mb-2 text-blue-400">محرك الأقراص الصلبة 3D</h1>
            <p className="text-sm text-slate-300 mb-4">
              حرك الفأرة فوق الأجزاء لتظليلها، واضغط عليها لعرض التفاصيل.
              <span className="block text-xs mt-1 opacity-70 ltr text-right font-mono">(Interactive 3D HDD Model)</span>
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedPartId(null)}
                className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded transition-colors"
              >
                إعادة ضبط
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Panel (Sidebar) */}
      <div className="w-full md:w-1/3 lg:w-1/4 h-1/3 md:h-full bg-slate-800/95 border-r border-slate-700 shadow-2xl z-20 flex flex-col transition-all duration-300 ease-in-out">
        
        {selectedPart ? (
          <div className="p-6 flex flex-col h-full overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-4 h-12 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]" 
                style={{ backgroundColor: selectedPart.color }}
              />
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">{selectedPart.nameAr}</h2>
                <h3 className="text-xl text-blue-400 font-serif italic">{selectedPart.nameEn}</h3>
              </div>
            </div>
            
            <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600 mb-6">
              <h4 className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">الوظيفة (AR)</h4>
              <p className="text-lg text-slate-100 leading-relaxed">
                {selectedPart.descriptionAr}
              </p>
            </div>

            <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-700/50" dir="ltr">
               <h4 className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Function (EN)</h4>
              <p className="text-md text-slate-300 leading-relaxed">
                {selectedPart.descriptionEn}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <p className="text-xl font-medium">اختر قطعة لعرض التفاصيل</p>
            <p className="text-sm mt-2 opacity-70">Select a component to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
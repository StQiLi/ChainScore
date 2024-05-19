import React from 'react';

export function View () {
    return (
        <div>
            <div className="flex flex-col items-center"></div>
            <div className="flex flex-col gap-4">
                
                <a href="maxvolume" className="mx-auto block max-w-xs space-y-3 rounded-lg
                bg-white p-6 shadow-lg ring-1 ring-slate-900/5 hover:bg-black hover:ring-slate-gray-200/5">
                    <div className="flex items-center space-x-3">
                        <h3 className="text-sm font-semibold text-slate-900">MaxVolume</h3>
                    </div>
                </a>
            </div>
        </div>
    )
}
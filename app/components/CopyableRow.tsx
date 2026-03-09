"use client";
import { useState } from "react";
import CallModal from "./CallModal";
import { markAsCalledWithNote } from "@/prismaActions/customerActions";

export default function CopyableRow({ user, index }: { user: any; index: number }) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(user.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = async (note: string) => {
    await markAsCalledWithNote(user.id, note);
  };

  return (
    <>
      <tr
        onClick={() => setShowModal(true)}
        className="group cursor-pointer hover:bg-blue-50/50 transition-colors border-b border-gray-50"
      >
        <td className="px-6 py-4 text-sm text-gray-400 font-mono">#{index + 1}</td>
        <td className="px-6 py-4">
          <div className="font-bold text-gray-900">{user.name}</div>
          <div className="text-[10px] text-gray-400">ID: {user.id}</div>
        </td>
        <td className="px-6 py-4">
          <button
            onClick={handleCopy}
            className={`px-3 py-1 rounded-lg text-sm font-mono transition-all border ${
              copied ? "bg-green-500 text-white border-green-500" : "bg-white text-blue-600 border-gray-200 group-hover:border-blue-300"
            }`}
          >
            {user.phone} {copied ? "✓" : "📋"}
          </button>
        </td>
        <td className="px-6 py-4 text-right font-bold text-green-600">
          ${Number(user.amount).toLocaleString("tr-TR").includes(',') ?Number(user.amount).toLocaleString("tr-TR") : Number(user.amount).toLocaleString("tr-TR") +',00'}
        </td>
        <td className="px-6 py-4 text-center">
          <span className="text-blue-500 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            NOT EKLE / KAPAT →
          </span>
        </td>
      </tr>

      {showModal && (
        <CallModal 
          user={user} 
          onClose={() => setShowModal(false)} 
          onConfirm={handleConfirm} 
        />
      )}
    </>
  );
}
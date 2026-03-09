"use client";
import { useState } from "react";

interface CallModalProps {
  user: any;
  onClose: () => void;
  onConfirm: (note: string) => Promise<void>;
}

export default function CallModal({
  user,
  onClose,
  onConfirm,
}: CallModalProps) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const quickNotes = ["Açmadı", "Olumsuz", "Yeni Kullanıcı"];

  const handleSave = async () => {
    setLoading(true);
    await onConfirm(note);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h3>
          <p className="text-sm text-gray-500 mb-4">{user.phone}</p>

          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
            Hızlı Notlar
          </label>
          <div className="flex gap-2 mb-4">
            {quickNotes.map((qn) => (
              <button
                key={qn}
                onClick={() => setNote(qn)}
                className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors font-medium text-gray-600"
              >
                {qn}
              </button>
            ))}
          </div>

          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
            Görüşme Notu
          </label>
          <textarea
            autoFocus
            className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-25"
            placeholder="İsteğe bağlı notunuzu yazın..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className="flex border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-4 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Vazgeç
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 px-6 py-4 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
          >
            {loading ? "Kaydediliyor..." : "ARANDI OLARAK KAYDET"}
          </button>
        </div>
      </div>
    </div>
  );
}

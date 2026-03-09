// app/customers/page.tsx
import { getTopUncalledUsers } from "@/prismaActions/customerActions";
import CopyableRow from "./components/CopyableRow";

export default async function TopCustomersPage() {
  const { highestUsers, average, threshold } = await getTopUncalledUsers();

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
            📞 Arama Listesi
          </h1>
          <div className="flex gap-4">
            <div className="bg-white p-3 rounded-lg shadow-sm border-b-4 border-blue-500">
              <p className="text-[10px] uppercase text-gray-400 font-bold">
                Ortalama
              </p>
              <p className="text-lg font-bold">${average.toFixed(2)}</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border-b-4 border-orange-500">
              <p className="text-[10px] uppercase text-gray-400 font-bold">
                Eşik (+%10)
              </p>
              <p className="text-lg font-bold text-orange-600">
                ${threshold.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">
                  Sıra
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">
                  Müşteri
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase">
                  Telefon (Tıkla)
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase">
                  Tutar
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase">
                  Durum
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {highestUsers.map((user, index) => (
                <CopyableRow key={user.id} user={user} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

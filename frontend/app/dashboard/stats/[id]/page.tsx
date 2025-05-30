'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/lib/context';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/dashboard-header';

interface QRCodeStats {
  id: string;
  url: string;
  name: string;
  open_count: number;
  scans: Array<{
    timestamp: string;
    ip_address: string;
    user_agent: string;
    device_type: string;
  }>;
  created_at: string;
  last_scanned: string | null;
}

export default function QRCodeStatsPage({ params }: { params: { id: string } }) {
  const { user } = useUser();
  const router = useRouter();
  const [stats, setStats] = useState<QRCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/qr/stats/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch QR code stats');
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching QR code stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, router, params.id]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        title="QR Code Statistics"
        description="Detailed tracking information for your QR code"
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          ) : !stats ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">QR code not found or you don't have access to it.</p>
              <button
                onClick={() => router.push('/dashboard')}
                className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* QR Code Info */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">QR Code Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-gray-900">{stats.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">URL</p>
                    <a href={stats.url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">
                      {stats.url}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="text-gray-900">{new Date(stats.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Scans</p>
                    <p className="text-gray-900">{stats.open_count}</p>
                  </div>
                </div>
              </div>

              {/* Scan History */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Scan History</h2>
                {stats.scans.length === 0 ? (
                  <p className="text-gray-500">No scans recorded yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Device Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            IP Address
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User Agent
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {stats.scans.map((scan, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(scan.timestamp).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {scan.device_type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {scan.ip_address}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {scan.user_agent}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Back Button */}
              <div className="pt-6">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 
'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/lib/context';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/dashboard-header';

interface QRCodeData {
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

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Wait for user context to initialize
    if (!initialized) {
      setInitialized(true);
      return;
    }

    // Only redirect if we're sure there's no user
    if (initialized && !user) {
      router.push('/login');
      return;
    }

    const fetchQRData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/qr/stats/all/${user?.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch QR codes');
        }

        const data = await response.json();
        setQrCodes(data);
      } catch (error) {
        console.error('Error fetching QR codes:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchQRData();
    }
  }, [user, router, initialized]);

  // Show loading state while initializing
  if (!initialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // Don't render anything if not logged in
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        title="Dashboard"
        description="Track and manage your QR codes"
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Your QR Codes</h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          ) : qrCodes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">You haven't created any QR codes yet.</p>
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
              >
                Create Your First QR Code
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Scans
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Scanned
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {qrCodes.map((qr) => (
                    <tr key={qr.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {qr.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a href={qr.url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700">
                          {qr.url}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {qr.open_count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(qr.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {qr.last_scanned ? new Date(qr.last_scanned).toLocaleDateString() : 'Never'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => router.push(`/dashboard/stats/${qr.id}`)}
                          className="text-emerald-600 hover:text-emerald-700"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 
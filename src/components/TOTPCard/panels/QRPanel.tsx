import { QRCodeSVG } from 'qrcode.react';

export function QRPanel({ uri }: { uri: string }) {
    return (
        <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300 w-full h-full">
            <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-xl mb-6">
                <QRCodeSVG value={uri} size={160} level="M" />
            </div>
            <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                Scan QR Code
            </p>
        </div>
    );
}
import { AlertCircle } from 'lucide-react';
import clsx from 'clsx';

interface Props {
    secret: string;
    setSecret: (s: string) => void;
    isError: boolean;
}

export function InputSection({ secret, setSecret, isError }: Props) {
    return (
        <div className="pt-8 px-8 pb-2">
            <div className="relative group">
                <input
                    type="text"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    placeholder="Setup Key"
                    className={clsx(
                        "w-full pl-4 pr-12 py-4 border-2 rounded-2xl font-mono text-lg transition-all duration-200 outline-none placeholder:text-gray-400 placeholder:font-sans placeholder:font-medium",
                        isError
                            ? "bg-red-50/50 border-red-200 text-red-600 focus:border-red-300 focus:ring-4 focus:ring-red-100"
                            : "bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-100"
                    )}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    {isError && (
                        <div className="text-red-500 animate-in fade-in zoom-in duration-200">
                            <AlertCircle size={20} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
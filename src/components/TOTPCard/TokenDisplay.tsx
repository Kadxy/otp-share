import { useState } from 'react';
import { Check, KeyRound } from 'lucide-react';
import clsx from 'clsx';

interface Props {
    token: string;
    progress: number;
    timeLeft: number;
    isValid: boolean;
}

export function TokenDisplay({ token, progress, timeLeft, isValid }: Props) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!isValid) return;
        navigator.clipboard.writeText(token);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    const isUrgent = timeLeft < 5;
    const activeColorClass = isUrgent ? "text-amber-600" : "text-gray-900";
    const activeBgClass = isUrgent ? "bg-amber-500" : "bg-gray-900";

    return (
        <div className="relative p-8 pt-4 min-h-[180px]">
            <div
                onClick={handleCopy}
                className={clsx(
                    "relative w-full p-8 rounded-2xl border-2 transition-all duration-200 cursor-pointer overflow-hidden group select-none h-40 flex flex-col justify-center",
                    "active:scale-[0.98] active:brightness-95",
                    isValid
                        ? "bg-white border-gray-100 hover:border-gray-300 hover:shadow-sm" // 有效时：白底 + 细边框
                        : "bg-gray-50 border-transparent" // 无效时：灰底 + 无边框 (与 Input 默认状态一致)
                )}
            >
                {isValid ? (
                    <>
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100/50 z-10">
                            <div
                                className={clsx("h-full transition-all duration-1000 ease-linear", activeBgClass)}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center relative z-0">
                            <div className={clsx("text-5xl font-mono font-bold tracking-[0.15em] tabular-nums transition-colors duration-300", activeColorClass)}>
                                {token.slice(0, Math.ceil(token.length / 2))}
                                <span className="text-transparent text-lg"> </span>
                                {token.slice(Math.ceil(token.length / 2))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-300 space-y-3">
                        <KeyRound size={32} strokeWidth={1.5} className="opacity-30" />
                        <div className="text-sm font-medium text-gray-400">Enter Setup Key</div>
                    </div>
                )}

                {/* Copied Overlay */}
                <div className={clsx(
                    "absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/40 backdrop-blur-xl transition-all duration-200 rounded-2xl",
                    copied ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                )}>
                    <div className="flex flex-col items-center gap-3 animate-in zoom-in-50 duration-300">
                        <Check size={48} className="text-gray-900 drop-shadow-sm" strokeWidth={3} />
                        <span className="text-sm font-black tracking-[0.25em] text-gray-900 uppercase drop-shadow-sm">Copied</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
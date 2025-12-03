// src/hooks/useTOTP.ts
import { useState, useEffect } from 'react';
import { authenticator } from 'otplib';

interface TOTPOptions {
    period: number;
    digits: number;
    algorithm: string;
}

export function useTOTP(secret: string, options: TOTPOptions = { period: 30, digits: 6, algorithm: 'SHA1' }) {
    const [token, setToken] = useState<string>('------');
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        // 1. 预处理：去空格、转大写
        const cleanSecret = secret.replace(/\s/g, '').toUpperCase();

        // 2. 基础校验 - 如果没有密钥，设置无效状态
        if (!cleanSecret) {
            // 使用单次 batch 更新避免多次渲染
            const resetState = () => {
                setIsValid(false);
                setToken('------');
                setProgress(0);
                setTimeLeft(0);
            };
            resetState();
            return;
        }

        try {
            // 🔥 核心修复：直接获取 authenticator 的构造函数
            // 并把 authenticator.options (里面包含了 keyDecoder 和 createDigest) 全部继承过来
            const GeneratorClass = Object.getPrototypeOf(authenticator).constructor;

            const generator = new GeneratorClass({
                ...authenticator.options, // <--- 这里是关键！继承所有解码能力
                step: options.period,
                digits: options.digits,
                // otplib 内部通常预期小写算法名，虽然部分版本兼容，但转小写最稳
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                algorithm: options.algorithm.toLowerCase() as any
            });

            const update = () => {
                try {
                    // 生成 Token
                    const newToken = generator.generate(cleanSecret);
                    setToken(newToken);
                    setIsValid(true);

                    // 计算倒计时
                    const epoch = Math.floor(Date.now() / 1000);
                    const step = options.period;
                    const remaining = step - (epoch % step);

                    setTimeLeft(remaining);
                    setProgress((remaining / step) * 100);
                } catch {
                    // 只有真正无法解码时才报错
                    setIsValid(false);
                }
            };

            update();
            const interval = setInterval(update, 100); // Update every 100ms for better sync
            return () => clearInterval(interval);

        } catch (e) {
            console.error("TOTP Init Error:", e);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsValid(false);
        }
    }, [secret, options.period, options.digits, options.algorithm]);

    return { token, timeLeft, progress, isValid };
}
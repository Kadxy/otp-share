// src/app/api/share/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { customAlphabet } from 'nanoid';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { codes, period, startTime, expiresIn, burnAfterReading } = body;

        // 基础校验
        if (!codes || !Array.isArray(codes) || codes.length === 0) {
            return NextResponse.json({ error: 'Invalid codes' }, { status: 400 });
        }

        // 计算物理过期时间
        const now = new Date();
        const expiresAt = new Date(now);

        // 简单映射过期时间
        switch (expiresIn) {
            case '1h': expiresAt.setHours(now.getHours() + 1); break;
            case '12h': expiresAt.setHours(now.getHours() + 12); break;
            case '3d': expiresAt.setDate(now.getDate() + 3); break;
            case '24h':
            default:
                expiresAt.setHours(now.getHours() + 24);
        }

        // 生成短ID (7个字符, 仅字母数字)
        const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 7);
        const id = nanoid();

        // 存入数据库
        const link = await prisma.secureLink.create({
            data: {
                id,
                codes: JSON.stringify(codes), // SQLite 存 JSON 字符串
                period: period || 30,
                startTime: BigInt(startTime), // 对应 schema 中的 BigInt
                firstCodeTimestamp: BigInt(startTime), // 第一个验证码的时间戳
                burnAfterReading: burnAfterReading ?? true, // 默认开启
                expiresAt: expiresAt,
            },
        });

        return NextResponse.json({ id: link.id });

    } catch (error) {
        console.error('Create link error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
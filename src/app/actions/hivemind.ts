'use server';
import { pusherServer } from '@/lib/pusher-server';

export async function broadcastMove(x: number, y: number, senderId: string) {
  await pusherServer.trigger('bunny-hivemind', 'move-event', {
    x,
    y,
    senderId // So the sender doesn't "warp" to themselves
  });
}
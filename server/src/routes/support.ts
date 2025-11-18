import { Router } from 'express';
import { prisma } from '../index';
import { authenticate } from '../middlewares/auth';

const router = Router();

// 티켓 생성
router.post('/tickets', authenticate, async (req: any, res) => {
  try {
    const { subject, message, category, priority = 'MEDIUM' } = req.body;

    const ticket = await prisma.supportTicket.create({
      data: {
        userId: req.user.id,
        subject,
        message,
        category,
        priority,
      },
    });

    res.status(201).json({ ticket });
  } catch (error) {
    console.error('Create ticket error:', error);
    res.status(500).json({ error: { message: 'Failed to create ticket' } });
  }
});

// 내 티켓 조회
router.get('/tickets', authenticate, async (req: any, res) => {
  try {
    const tickets = await prisma.supportTicket.findMany({
      where: { userId: req.user.id },
      include: {
        replies: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ tickets });
  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ error: { message: 'Failed to fetch tickets' } });
  }
});

// 뉴스레터 구독
router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    const newsletter = await prisma.newsletter.create({
      data: { email },
    });

    res.status(201).json({ newsletter });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: { message: 'Email already subscribed' } });
    }
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: { message: 'Failed to subscribe' } });
  }
});

export default router;

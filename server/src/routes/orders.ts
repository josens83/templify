import { Router } from 'express';
import { prisma } from '../index';
import { authenticate } from '../middlewares/auth';

const router = Router();

// 주문 생성
router.post('/', authenticate, async (req: any, res) => {
  try {
    const { items, total, paymentMethod } = req.body;

    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        total: Number(total),
        status: 'COMPLETED', // 실제로는 결제 검증 후 설정
        paymentMethod,
        items: {
          create: items.map((item: any) => ({
            templateId: item.templateId,
            price: Number(item.price),
          })),
        },
      },
      include: {
        items: {
          include: {
            template: true,
          },
        },
      },
    });

    // 템플릿 다운로드 수 증가
    for (const item of items) {
      await prisma.template.update({
        where: { id: item.templateId },
        data: { downloads: { increment: 1 } },
      });
    }

    res.status(201).json({ order });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: { message: 'Failed to create order' } });
  }
});

// 내 주문 조회
router.get('/my-orders', authenticate, async (req: any, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: {
        items: {
          include: {
            template: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: { message: 'Failed to fetch orders' } });
  }
});

// 특정 주문 조회
router.get('/:id', authenticate, async (req: any, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
      include: {
        items: {
          include: {
            template: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: { message: 'Order not found' } });
    }

    res.json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: { message: 'Failed to fetch order' } });
  }
});

export default router;

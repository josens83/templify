import { Router } from 'express';
import { prisma } from '../index';
import { authenticate } from '../middlewares/auth';

const router = Router();

// 템플릿의 리뷰 조회
router.get('/template/:templateId', async (req, res) => {
  try {
    const { templateId } = req.params;

    const reviews = await prisma.review.findMany({
      where: { templateId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ reviews });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: { message: 'Failed to fetch reviews' } });
  }
});

// 리뷰 작성
router.post('/', authenticate, async (req: any, res) => {
  try {
    const { templateId, rating, comment } = req.body;

    // 구매 여부 확인
    const hasPurchased = await prisma.orderItem.findFirst({
      where: {
        templateId,
        order: {
          userId: req.user.id,
          status: 'COMPLETED',
        },
      },
    });

    if (!hasPurchased) {
      return res.status(403).json({ error: { message: 'You must purchase this template to review' } });
    }

    const review = await prisma.review.create({
      data: {
        templateId,
        userId: req.user.id,
        rating: Number(rating),
        comment,
      },
    });

    // 템플릿 평점 업데이트
    const allReviews = await prisma.review.findMany({
      where: { templateId },
    });

    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await prisma.template.update({
      where: { id: templateId },
      data: {
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: allReviews.length,
      },
    });

    res.status(201).json({ review });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: { message: 'Failed to create review' } });
  }
});

export default router;

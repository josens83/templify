import { Router } from 'express';
import { prisma } from '../index';
import { authenticate } from '../middlewares/auth';

const router = Router();

// 찜하기 목록 조회
router.get('/wishlist', authenticate, async (req: any, res) => {
  try {
    const wishlist = await prisma.wishlist.findMany({
      where: { userId: req.user.id },
      include: {
        template: true,
      },
    });

    res.json({ wishlist });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ error: { message: 'Failed to fetch wishlist' } });
  }
});

// 찜하기 추가
router.post('/wishlist/:templateId', authenticate, async (req: any, res) => {
  try {
    const { templateId } = req.params;

    const wishlist = await prisma.wishlist.create({
      data: {
        userId: req.user.id,
        templateId,
      },
    });

    res.status(201).json({ wishlist });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ error: { message: 'Failed to add to wishlist' } });
  }
});

// 찜하기 제거
router.delete('/wishlist/:templateId', authenticate, async (req: any, res) => {
  try {
    const { templateId } = req.params;

    await prisma.wishlist.deleteMany({
      where: {
        userId: req.user.id,
        templateId,
      },
    });

    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ error: { message: 'Failed to remove from wishlist' } });
  }
});

export default router;

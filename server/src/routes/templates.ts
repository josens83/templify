import { Router } from 'express';
import { prisma } from '../index';
import { authenticate, authorize } from '../middlewares/auth';

const router = Router();

// 모든 템플릿 조회 (필터링, 정렬, 페이지네이션)
router.get('/', async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      search,
      sortBy = 'createdAt',
      order = 'desc',
      page = '1',
      limit = '12',
    } = req.query;

    const where: any = { isActive: true };

    // 카테고리 필터
    if (category) {
      where.category = category;
    }

    // 가격 필터
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    // 검색
    if (search) {
      where.OR = [
        { name: { contains: search as string } },
        { description: { contains: search as string } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const [templates, total] = await Promise.all([
      prisma.template.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy as string]: order },
        select: {
          id: true,
          name: true,
          description: true,
          category: true,
          price: true,
          image: true,
          demoUrl: true,
          downloads: true,
          rating: true,
          reviewCount: true,
          tags: true,
          author: true,
          lastUpdated: true,
        },
      }),
      prisma.template.count({ where }),
    ]);

    // Parse JSON strings
    const parsedTemplates = templates.map((t) => ({
      ...t,
      tags: JSON.parse(t.tags),
    }));

    res.json({
      templates: parsedTemplates,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({ error: { message: 'Failed to fetch templates' } });
  }
});

// 특정 템플릿 조회
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const template = await prisma.template.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    if (!template) {
      return res.status(404).json({ error: { message: 'Template not found' } });
    }

    // Parse JSON strings
    const parsedTemplate = {
      ...template,
      tags: JSON.parse(template.tags),
      features: JSON.parse(template.features),
      files: JSON.parse(template.files),
    };

    res.json({ template: parsedTemplate });
  } catch (error) {
    console.error('Get template error:', error);
    res.status(500).json({ error: { message: 'Failed to fetch template' } });
  }
});

// 템플릿 생성 (판매자 전용)
router.post('/', authenticate, authorize('SELLER', 'ADMIN'), async (req: any, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      image,
      demoUrl,
      tags,
      features,
      files,
    } = req.body;

    const template = await prisma.template.create({
      data: {
        name,
        description,
        category,
        price: Number(price),
        image,
        demoUrl,
        tags: JSON.stringify(tags || []),
        features: JSON.stringify(features || []),
        files: JSON.stringify(files || []),
        author: req.user.name,
        authorId: req.user.id,
        lastUpdated: new Date().toISOString().split('T')[0],
      },
    });

    res.status(201).json({ template });
  } catch (error) {
    console.error('Create template error:', error);
    res.status(500).json({ error: { message: 'Failed to create template' } });
  }
});

// 템플릿 수정 (판매자/관리자 전용)
router.put('/:id', authenticate, authorize('SELLER', 'ADMIN'), async (req: any, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // JSON 필드 처리
    if (updateData.tags) updateData.tags = JSON.stringify(updateData.tags);
    if (updateData.features) updateData.features = JSON.stringify(updateData.features);
    if (updateData.files) updateData.files = JSON.stringify(updateData.files);
    if (updateData.price) updateData.price = Number(updateData.price);

    updateData.lastUpdated = new Date().toISOString().split('T')[0];

    const template = await prisma.template.update({
      where: { id },
      data: updateData,
    });

    res.json({ template });
  } catch (error) {
    console.error('Update template error:', error);
    res.status(500).json({ error: { message: 'Failed to update template' } });
  }
});

// 템플릿 삭제 (비활성화)
router.delete('/:id', authenticate, authorize('SELLER', 'ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.template.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Delete template error:', error);
    res.status(500).json({ error: { message: 'Failed to delete template' } });
  }
});

export default router;

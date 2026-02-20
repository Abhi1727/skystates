// Simple in-memory data store for demo purposes
let memoryStore = {
  users: [],
  courses: [],
  jobs: [],
  enrollments: [],
  applications: [],
  coupons: []
};

// Mock Sequelize-like interface
const createMockModel = (name, data) => {
  return {
    findAll: async () => data[name] || [],
    findByPk: async (id) => (data[name] || []).find(item => item.id === id),
    create: async (item) => {
      const newItem = { id: Date.now().toString(), ...item };
      if (!data[name]) data[name] = [];
      data[name].push(newItem);
      return newItem;
    },
    update: async (updates, { where }) => {
      if (!data[name]) return [0];
      let count = 0;
      data[name] = data[name].map(item => {
        if (where.id && item.id === where.id) {
          count++;
          return { ...item, ...updates };
        }
        return item;
      });
      return [count];
    },
    destroy: async ({ where }) => {
      if (!data[name]) return 0;
      const initialLength = data[name].length;
      data[name] = data[name].filter(item => {
        if (where.id && item.id === where.id) return false;
        return true;
      });
      return initialLength - data[name].length;
    }
  };
};

const sequelize = {
  authenticate: async () => Promise.resolve(),
  sync: async () => Promise.resolve(),
  define: (name) => createMockModel(name, memoryStore),
  Sequelize: {
    Op: {
      like: 'like',
      gt: '>',
      gte: '>=',
      lt: '<',
      lte: '<=',
      in: 'in'
    }
  }
};

const connectDB = async () => {
  console.log('Using in-memory data store for demo');
  
  // Add some demo data
  memoryStore.users = [
    {
      id: 'demo-user-1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'student',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'demo-instructor',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      password: 'password123',
      role: 'instructor',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'demo-employer',
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  memoryStore.courses = [
    {
      id: '1',
      title: 'Introduction to Web Development',
      slug: 'intro-web-dev',
      description: 'Learn the basics of HTML, CSS, and JavaScript',
      category: 'web-development',
      level: 'beginner',
      duration: 40,
      price: 99.99,
      instructor: 'demo-instructor',
      rating: 4.5,
      enrollmentCount: 1250,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Advanced React Development',
      slug: 'advanced-react',
      description: 'Master React with hooks, context, and advanced patterns',
      category: 'web-development',
      level: 'advanced',
      duration: 60,
      price: 199.99,
      instructor: 'demo-instructor',
      rating: 4.8,
      enrollmentCount: 850,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  memoryStore.jobs = [
    {
      id: '1',
      title: 'Frontend Developer',
      slug: 'frontend-dev',
      company: 'Tech Company',
      description: 'Looking for an experienced frontend developer',
      location: 'Remote',
      salary: 80000,
      currency: 'USD',
      ratingAverage: 4.2,
      ratingCount: 15,
      views: 245,
      postedBy: 'demo-employer',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      slug: 'fullstack-engineer',
      company: 'Startup Inc',
      description: 'Join our team as a full stack engineer',
      location: 'San Francisco',
      salary: 120000,
      currency: 'USD',
      ratingAverage: 4.6,
      ratingCount: 8,
      views: 189,
      postedBy: 'demo-employer',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  memoryStore.coupons = [
    {
      id: 'demo-coupon-1',
      code: 'WELCOME50',
      discountType: 'fixed',
      discountValue: 50,
      isActive: true,
      createdDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'demo-coupon-2',
      code: 'SUMMER100',
      discountType: 'fixed',
      discountValue: 100,
      isActive: true,
      createdDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
};

module.exports = { sequelize, connectDB };

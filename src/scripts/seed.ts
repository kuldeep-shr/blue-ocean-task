import mongoose, { Schema, Document } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = String(process.env.MONGO_URI);

if (!MONGO_URI) {
  console.error('❌ MONGO_URI missing in .env');
  process.exit(1);
}

interface ICategory extends Document {
  name: string;
  description: string;
  isDeleted: boolean;
}

interface ISubCategory extends Document {
  name: string;
  description: string;
  categoryId: string;
  isDeleted: boolean;
}

interface ICourse extends Document {
  title: string;
  description: string;
  categoryIds: string[];
  subCategoryIds: string[];
  isDeleted: boolean;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    description: String,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const SubCategorySchema = new Schema<ISubCategory>(
  {
    name: { type: String, required: true },
    description: String,
    categoryId: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: String,
    categoryIds: [{ type: String }],
    subCategoryIds: [{ type: String }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Category = mongoose.model<ICategory>('Category', CategorySchema);
const SubCategory = mongoose.model<ISubCategory>(
  'SubCategory',
  SubCategorySchema,
);
const Course = mongoose.model<ICourse>('Course', CourseSchema);

const categoriesSeed = [
  { name: 'Programming', description: 'Programming fundamentals' },
  { name: 'Web Development', description: 'Frontend & Backend Engineering' },
  { name: 'Data Science', description: 'Machine Learning & Deep Learning' },
  { name: 'UI/UX Design', description: 'Design thinking & UX' },
  { name: 'Cloud & DevOps', description: 'AWS, Docker, Kubernetes' },
];

const subcategoriesSeed: Record<
  string,
  { name: string; description: string }[]
> = {
  Programming: [{ name: 'Python', description: 'Python basics' }],

  'Web Development': [
    { name: 'React.js', description: 'React frontend library' },
    { name: 'Node.js', description: 'Node backend runtime' },
  ],

  'Data Science': [
    { name: 'Machine Learning', description: 'ML fundamentals' },
    { name: 'Deep Learning', description: 'Neural network models' },
  ],

  'UI/UX Design': [
    { name: 'UI Design', description: 'UI principles' },
    { name: 'UX Research', description: 'Research methodologies' },
  ],

  'Cloud & DevOps': [
    { name: 'DevOps Tools', description: 'CI/CD, Docker, K8s' },
  ],
};

async function runSeed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('🌱 Connected to MongoDB Atlas');

    console.log('🗑 Clearing existing data...');
    await Category.deleteMany({});
    await SubCategory.deleteMany({});
    await Course.deleteMany({});

    console.log('🌱 Creating categories...');
    const createdCategories = await Category.insertMany(categoriesSeed);

    const subCategoryPayload: ISubCategory[] = [];

    createdCategories.forEach((cat) => {
      const list = subcategoriesSeed[cat.name] || [];
      list.forEach((sc) =>
        subCategoryPayload.push({
          ...sc,
          categoryId: cat._id.toString(),
          isDeleted: false,
        } as ISubCategory),
      );
    });

    console.log('🌱 Creating subcategories...');
    const createdSubCategories =
      await SubCategory.insertMany(subCategoryPayload);

    console.log('🌱 Creating courses...');

    const getCatId = (name: string) =>
      createdCategories.find((c) => c.name === name)!._id.toString();

    const getSubIds = (...names: string[]) =>
      createdSubCategories
        .filter((sc) => names.includes(sc.name))
        .map((sc) => sc._id.toString());

    const courseSeed: any[] = [
      {
        title: 'Full Stack Web Development',
        description: 'React + Node complete course',
        categoryIds: [getCatId('Web Development')],
        subCategoryIds: getSubIds('React.js', 'Node.js'),
        isDeleted: false,
      },

      {
        title: 'Data Science Masterclass',
        description: 'ML + DL specialization',
        categoryIds: [getCatId('Data Science')],
        subCategoryIds: getSubIds('Machine Learning', 'Deep Learning'),
        isDeleted: false,
      },

      {
        title: 'DevOps Engineer Bootcamp',
        description: 'AWS, CI/CD, Docker, K8s',
        categoryIds: [getCatId('Cloud & DevOps')],
        subCategoryIds: getSubIds('DevOps Tools'),
        isDeleted: false,
      },
    ];

    await Course.insertMany(courseSeed);

    console.log('🎉 Seed completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

runSeed();

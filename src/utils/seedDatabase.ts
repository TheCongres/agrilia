
import { supabase } from '@/integrations/supabase/client';

// Sample categories
const categories = [
  { 
    name: 'Fruits', 
    slug: 'fruits',
    description: 'Fresh, organic fruits from local farms',
    image_url: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800'
  },
  { 
    name: 'Vegetables', 
    slug: 'vegetables',
    description: 'Seasonal vegetables grown with sustainable practices',
    image_url: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800'
  },
  { 
    name: 'Dairy & Eggs', 
    slug: 'dairy-eggs',
    description: 'Farm-fresh milk, cheese, and eggs',
    image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800'
  },
  { 
    name: 'Bakery', 
    slug: 'bakery',
    description: 'Artisanal breads and pastries',
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800'
  },
  { 
    name: 'Honey & Preserves', 
    slug: 'honey-preserves',
    description: 'Natural honey and homemade preserves',
    image_url: 'https://images.unsplash.com/photo-1582128718891-0d599d3fad08?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800'
  }
];

// Sample producers
const producers = [
  {
    name: "Ferme Verte d'Alger",
    slug: "ferme-verte-alger",
    location: "Alger, Algeria",
    image_url: "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    description: "Family-owned organic farm specializing in heirloom vegetables and fruits. Ferme Verte d'Alger has been practicing sustainable farming for over 20 years.",
    is_verified: true
  },
  {
    name: "Coopérative Laitière de Médéa",
    slug: "cooperative-laitiere-medea",
    location: "Médéa, Algeria",
    image_url: "https://images.unsplash.com/photo-1594761946718-9442f3ebc349?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500", 
    description: "A cooperative of small dairy farms committed to ethical treatment of animals and organic practices. Producing milk, cheese, and traditional Algerian yogurt.",
    is_verified: true
  },
  {
    name: "Ruches de l'Atlas",
    slug: "ruches-atlas",
    location: "Blida, Algeria",
    image_url: "https://images.unsplash.com/photo-1589923188651-268a961fad0d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    description: "Sustainable beekeeping operation producing raw honey, beeswax products, and pollination services for other organic farms in the Atlas Mountains.",
    is_verified: false
  },
  {
    name: "Verger du Sahel",
    slug: "verger-sahel",
    location: "Bouira, Algeria",
    image_url: "https://images.unsplash.com/photo-1613428792678-087afc9d2e0f?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    description: "Specializing in organic apples, pears, and stone fruits. Verger du Sahel maintains over 40 varieties of fruit trees adapted to Algeria's climate.",
    is_verified: false
  },
  {
    name: "Prairies de Kabylie",
    slug: "prairies-kabylie",
    location: "Tizi Ouzou, Algeria",
    image_url: "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    description: "Pasture-raised chicken, eggs, and lamb from a family farm in the beautiful Kabylie region committed to regenerative agriculture.",
    is_verified: true
  }
];

// Sample products
const generateProducts = (categoryIds: string[], producerIds: string[]) => {
  return [
    {
      name: 'Organic Deglet Nour Dates',
      slug: 'organic-deglet-nour-dates',
      description: 'Premium Deglet Nour dates grown in the Algerian desert oasis. Known for their sweet taste and caramel-like texture, these organic dates are rich in nutrients and natural sweetness.',
      price: 450,
      unit: 'box',
      category_id: categoryIds[0], // fruits
      producer_id: producerIds[0], // Ferme Verte
      is_organic: true,
      is_in_stock: true,
      stock_quantity: 24,
      images: ['https://images.unsplash.com/photo-1601039641847-7857b994d704?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800']
    },
    {
      name: 'Fresh Spinach Bunch',
      slug: 'fresh-spinach-bunch',
      description: 'Locally grown organic spinach, freshly harvested and full of nutrients. Perfect for salads, sautés, or smoothies.',
      price: 220,
      unit: 'bunch',
      category_id: categoryIds[1], // vegetables
      producer_id: producerIds[0], // Ferme Verte
      is_organic: true,
      is_in_stock: true,
      stock_quantity: 30,
      images: ['https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800']
    },
    {
      name: 'Atlas Mountain Honey',
      slug: 'atlas-mountain-honey',
      description: 'Raw, unfiltered honey from the Atlas Mountains. Collected from wildflower meadows at high altitudes, this honey has a complex, rich flavor profile.',
      price: 850,
      unit: 'jar',
      category_id: categoryIds[4], // honey
      producer_id: producerIds[2], // Ruches de l'Atlas
      is_organic: true,
      is_in_stock: true,
      stock_quantity: 15,
      images: ['https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800']
    },
    {
      name: 'Algerian Strawberries',
      slug: 'algerian-strawberries',
      description: 'Sweet, juicy strawberries grown in the fertile soils of northern Algeria. Perfect for desserts or eating fresh.',
      price: 380,
      unit: 'basket',
      category_id: categoryIds[0], // fruits
      producer_id: producerIds[3], // Verger du Sahel
      is_organic: true,
      is_in_stock: true,
      stock_quantity: 20,
      images: ['https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800']
    },
    {
      name: 'Fresh Farm Milk',
      slug: 'fresh-farm-milk',
      description: 'Creamy, pasteurized whole milk from grass-fed cows. No hormones or antibiotics used.',
      price: 280,
      unit: 'bottle',
      category_id: categoryIds[2], // dairy
      producer_id: producerIds[1], // Coopérative Laitière
      is_organic: true,
      is_in_stock: true,
      stock_quantity: 40,
      images: ['https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800']
    },
    {
      name: 'Organic Bell Peppers',
      slug: 'organic-bell-peppers',
      description: 'Colorful organic bell peppers grown without pesticides. Sweet, crunchy, and perfect for salads or roasting.',
      price: 190,
      unit: 'each',
      category_id: categoryIds[1], // vegetables
      producer_id: producerIds[0], // Ferme Verte
      is_organic: true,
      is_in_stock: true,
      stock_quantity: 35,
      images: ['https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800']
    },
    {
      name: 'Fresh Mint',
      slug: 'fresh-mint',
      description: 'Aromatic fresh mint, essential for Algerian tea and many traditional dishes.',
      price: 160,
      unit: 'bunch',
      category_id: categoryIds[1], // vegetables
      producer_id: producerIds[4], // Prairies de Kabylie
      is_organic: true,
      is_in_stock: true,
      stock_quantity: 50,
      images: ['https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800']
    },
    {
      name: 'Artisanal Couscous',
      slug: 'artisanal-couscous',
      description: 'Traditional hand-rolled couscous made from organic semolina wheat. The authentic taste of Algeria.',
      price: 320,
      unit: 'pack',
      category_id: categoryIds[3], // bakery
      producer_id: producerIds[4], // Prairies de Kabylie
      is_organic: true,
      is_in_stock: true,
      stock_quantity: 25,
      images: ['https://images.unsplash.com/photo-1612258272175-91b8e70a8529?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800']
    }
  ];
};

// Function to seed the database
export const seedDatabase = async () => {
  try {
    console.log('Seeding database...');

    // Insert categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .insert(categories)
      .select();

    if (categoriesError) {
      console.error('Error inserting categories:', categoriesError);
      return;
    }
    console.log(`Inserted ${categoriesData.length} categories`);

    // Insert producers
    const { data: producersData, error: producersError } = await supabase
      .from('producers')
      .insert(producers)
      .select();

    if (producersError) {
      console.error('Error inserting producers:', producersError);
      return;
    }
    console.log(`Inserted ${producersData.length} producers`);

    // Generate and insert products
    const categoryIds = categoriesData.map(c => c.id);
    const producerIds = producersData.map(p => p.id);
    const products = generateProducts(categoryIds, producerIds);

    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .insert(products)
      .select();

    if (productsError) {
      console.error('Error inserting products:', productsError);
      return;
    }
    console.log(`Inserted ${productsData.length} products`);

    console.log('Database seeding completed successfully!');
    return { categoriesData, producersData, productsData };
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Export a function to check if database has content already
export const checkDatabaseContent = async () => {
  const { count: categoriesCount } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true });
    
  const { count: productsCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });
  
  return {
    isEmpty: (categoriesCount === 0 || productsCount === 0),
    categoriesCount,
    productsCount
  };
};

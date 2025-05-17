
export interface BlogPostType {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  publishedDate: string;
  readTime: number;
}

export const blogPosts: BlogPostType[] = [
  {
    id: 1,
    slug: 'benefits-of-organic-farming',
    title: 'The Benefits of Organic Farming for Biodiversity and Soil Health',
    excerpt: 'Discover how organic farming practices promote biodiversity and improve soil health compared to conventional farming methods.',
    content: `
      <p>Organic farming stands as a beacon of sustainable agriculture, offering numerous benefits for biodiversity and soil health compared to conventional farming practices. By eliminating synthetic pesticides and fertilizers, organic farmers create environments where wildlife can thrive.</p>
      
      <h2>Biodiversity Benefits</h2>
      <p>Studies consistently show that organic farms support 30% more species and 50% more abundance of organisms than conventional farms. This includes:</p>
      <ul>
        <li>Greater variety of birds and beneficial insects</li>
        <li>More diverse plant species in and around fields</li>
        <li>Higher populations of pollinators like bees and butterflies</li>
        <li>Increased presence of natural predators that control pest populations</li>
      </ul>
      
      <h2>Soil Health Improvements</h2>
      <p>Organic farming practices focus on building soil health through techniques that add organic matter and minimize disturbance:</p>
      <ul>
        <li>Cover cropping to prevent erosion and add nutrients</li>
        <li>Crop rotation that breaks pest cycles and balances nutrient demands</li>
        <li>Composting to recycle nutrients and build soil structure</li>
        <li>Minimal tillage to preserve soil biology and prevent erosion</li>
      </ul>
      
      <p>The result is soil with higher organic carbon, better structure, improved water retention, and more biological activity. Research has shown that organically managed soils can contain up to 3.5 times more organic matter than conventionally farmed soils.</p>
      
      <h2>Climate Resilience</h2>
      <p>These soil improvements translate directly to climate resilience. Healthy, organic soils:</p>
      <ul>
        <li>Sequester more carbon, helping mitigate climate change</li>
        <li>Hold more water during droughts</li>
        <li>Drain better during floods</li>
        <li>Reduce erosion during extreme weather events</li>
      </ul>
      
      <p>By supporting organic farming through your purchasing choices, you're not just getting food free from synthetic chemicals—you're supporting farming systems that protect biodiversity, build soil health, and help create a more resilient food system for future generations.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
    author: {
      name: 'Emma Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    category: 'Sustainable Farming',
    tags: ['Organic', 'Biodiversity', 'Soil Health', 'Sustainability'],
    publishedDate: 'May 12, 2025',
    readTime: 5
  },
  {
    id: 2,
    slug: 'seasonal-eating-guide',
    title: 'Your Complete Guide to Seasonal Eating: Why Local is Better',
    excerpt: 'Learn why eating seasonally and locally grown produce is better for your health, the environment, and your local community.',
    content: `
      <p>Eating seasonally and locally isn't just a culinary trend—it's a return to how humans have eaten throughout history, with significant benefits for health, flavor, and environmental sustainability.</p>
      
      <h2>Superior Taste and Nutrition</h2>
      <p>Produce that's harvested at peak ripeness and consumed quickly offers:</p>
      <ul>
        <li>Maximum flavor development due to natural ripening processes</li>
        <li>Higher nutrient content, as vitamins and antioxidants haven't degraded during long transport</li>
        <li>Better texture and eating quality</li>
      </ul>
      
      <h2>Environmental Benefits</h2>
      <p>The environmental footprint of seasonal, local eating is substantially smaller:</p>
      <ul>
        <li>Reduced transportation emissions (food miles)</li>
        <li>Less energy used for artificial growing conditions (heated greenhouses, etc.)</li>
        <li>Lower storage requirements and associated energy costs</li>
        <li>Reduced packaging needs for local distribution</li>
      </ul>
      
      <h2>Supporting Local Economy</h2>
      <p>When you buy local, seasonal produce:</p>
      <ul>
        <li>More of your food dollar stays in the local community</li>
        <li>Small-scale farmers receive fair prices for their crops</li>
        <li>Regional food security improves</li>
        <li>Food traditions and agricultural diversity are preserved</li>
      </ul>
      
      <h2>Seasonal Eating Calendar</h2>
      <p>While specific availability varies by region, here's a general guide to seasonal eating:</p>
      
      <h3>Spring</h3>
      <p>Asparagus, artichokes, peas, spring greens, radishes, strawberries, rhubarb</p>
      
      <h3>Summer</h3>
      <p>Tomatoes, zucchini, peppers, berries, stone fruits, cucumbers, corn, melons</p>
      
      <h3>Fall</h3>
      <p>Apples, pears, pumpkins, winter squash, beets, Brussels sprouts, grapes</p>
      
      <h3>Winter</h3>
      <p>Root vegetables, hardy greens (kale, collards), citrus fruits, stored apples, winter squash</p>
      
      <p>By attuning your eating habits to nature's cycles, you'll enjoy more flavorful meals while supporting both environmental sustainability and local farmers. Start small by committing to one seasonal meal per week, or visit your local farmers market to discover what's currently at its peak in your area.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    author: {
      name: 'Miguel Santos',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    category: 'Nutrition',
    tags: ['Seasonal Eating', 'Local Food', 'Sustainability', 'Nutrition'],
    publishedDate: 'May 8, 2025',
    readTime: 6
  },
  {
    id: 3,
    slug: 'organic-certification-explained',
    title: 'Organic Certification Explained: What Those Labels Really Mean',
    excerpt: 'Understand what organic certification entails and how to decode various organic labels when shopping for groceries.',
    content: `
      <p>With the growing interest in organic foods, the marketplace has become filled with various labels and certifications that can confuse even the most dedicated organic shopper. Understanding what these labels actually mean is crucial for making informed food choices.</p>
      
      <h2>What Makes Food "Organic"?</h2>
      <p>At its core, organic production is an ecological production management system that promotes biodiversity, biological cycles, and soil health. Organic production:</p>
      <ul>
        <li>Prohibits the use of synthetic pesticides and fertilizers</li>
        <li>Bans genetically modified organisms (GMOs)</li>
        <li>Forbids the use of sewage sludge as fertilizer</li>
        <li>Requires sustainable farming practices that maintain or improve soil fertility</li>
        <li>Mandates humane treatment of animals with access to outdoors</li>
        <li>Restricts the use of antibiotics and hormones in livestock</li>
      </ul>
      
      <h2>Major Organic Certifications</h2>
      
      <h3>USDA Organic (United States)</h3>
      <p>This is the federal standard for organic products in the US, with several levels:</p>
      <ul>
        <li><strong>100% Organic:</strong> Contains only organic ingredients</li>
        <li><strong>Organic:</strong> Contains at least 95% organic ingredients</li>
        <li><strong>Made with Organic Ingredients:</strong> Contains at least 70% organic ingredients</li>
      </ul>
      
      <h3>EU Organic Logo (European Union)</h3>
      <p>Products with this logo must have at least 95% of their agricultural ingredients produced organically, with stricter standards than many other certifications.</p>
      
      <h3>Soil Association (UK)</h3>
      <p>The UK's leading organic certification body, with standards that exceed the minimum requirements of EU regulations in some areas.</p>
      
      <h2>Beyond Organic: Other Certifications</h2>
      
      <p>Several other certifications may appear alongside or instead of organic labels:</p>
      
      <h3>Regenerative Organic Certified</h3>
      <p>A newer certification that builds on USDA Organic with additional requirements for soil health, animal welfare, and social fairness.</p>
      
      <h3>Certified Naturally Grown</h3>
      <p>A peer-review certification program following organic standards, designed for small-scale farmers who find USDA certification prohibitively expensive.</p>
      
      <h2>Tips for Organic Shoppers</h2>
      <ul>
        <li>Prioritize organic for items on the "Dirty Dozen" list (strawberries, spinach, kale, etc.)</li>
        <li>Know that "natural" is not the same as "organic" and has no regulated definition</li>
        <li>Look for certification logos, not just the word "organic" in branding</li>
        <li>Consider talking directly to producers at farmers markets about their growing practices</li>
      </ul>
      
      <p>By understanding organic certifications, you can make more informed choices about the food you purchase and the agricultural practices you support with your consumer dollars.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    author: {
      name: 'Priya Patel',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    category: 'Consumer Education',
    tags: ['Organic', 'Certification', 'Food Labels', 'Shopping Guide'],
    publishedDate: 'May 3, 2025',
    readTime: 7
  }
];

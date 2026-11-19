// SpiceRoute Restaurant & Bistro — A Culinary Journey of Flavors.
// ALL content here is MOCK data for design review. Real menu, prices and
// contact details replace this file only after the client approves the design.
export const site = {
	name: 'SpiceRoute Restaurant & Bistro',
	shortName: 'SpiceRoute',
	tagline: 'A Culinary Journey of Flavors',
	phoneDisplay: '+91 98200 12345',
	phoneHref: 'tel:+919820012345',
	whatsappHref: 'https://wa.me/919820012345',
	email: 'hello@spiceroute.in',
	url: 'https://spiceroute-bistro.pages.dev',
	address: 'SpiceRoute Restaurant & Bistro, 2nd Floor, Linking Road, Bandra West, Mumbai 400050, India',
	addressShort: 'Linking Road, Bandra West, Mumbai',
	hours: '11:30 AM – 11:00 PM, all days',
	hoursShort: '11:30 AM – 11 PM · Open all days',
	established: 2016,
	fssai: 'FSSAI Lic. No. 11516001000456',
	mapEmbed:
		'https://maps.google.com/maps?q=Linking%20Road%2C%20Bandra%20West%2C%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed',
	areas: ['Bandra West', 'Bandra East', 'Khar', 'Santacruz', 'Juhu', 'Andheri West', 'Mahim']
};

export const navLinks = [
	{ label: 'Home', href: '/' },
	{ label: 'Menu', href: '/menu' },
	{ label: 'About Us', href: '/about' },
	{ label: 'Gallery', href: '/gallery' },
	{ label: 'Contact', href: '/contact' }
];

export type Category = 'Indian Classics' | 'Continental' | 'Asian' | 'Desserts' | 'Beverages' | 'Breads & Rice';

export type Dish = {
	id: string;
	name: string;
	price: number;
	mrp?: number;
	rating: number;
	reviews: number;
	desc: string;
	image: string;
	alt: string;
	veg: boolean;
	spice: 0 | 1 | 2 | 3;
	serves: string;
	category: Category;
	tag?: string;
	ingredients: string[];
	allergens: string[];
	nutrition: string;
};

export const dishes: Dish[] = [
	{
		id: 'hyderabadi-chicken-biryani',
		name: 'Hyderabadi Chicken Biryani',
		price: 349,
		mrp: 399,
		rating: 4.9,
		reviews: 1284,
		desc: 'Our signature dum biryani — aged basmati layered with saffron, fried onions and tender chicken, sealed and slow-cooked on dum. Served with mirchi ka salan and raita.',
		image: 'hero-biryani',
		alt: 'Hyderabadi chicken biryani in a hammered copper handi with raita, steam rising',
		veg: false,
		spice: 3,
		serves: 'Serves 1–2',
		category: 'Indian Classics',
		tag: 'Signature',
		ingredients: ['Aged basmati rice', 'Chicken', 'Saffron', 'Fried onions', 'Mint', 'Whole garam masala', 'Curd', 'Ghee'],
		allergens: ['Milk', 'Gluten (salan)'],
		nutrition: 'Approx. 640 kcal · 38 g protein · 24 g fat per serving.'
	},
	{
		id: 'butter-chicken',
		name: 'Old Delhi Butter Chicken',
		price: 329,
		rating: 4.8,
		reviews: 976,
		desc: 'Tandoor-roasted chicken folded into a silky tomato-butter gravy with kasuri methi and a touch of cream — the dish that made our kitchen famous.',
		image: 'butter-chicken',
		alt: 'Butter chicken in a copper bowl with cream swirl and coriander',
		veg: false,
		spice: 2,
		serves: 'Serves 1–2',
		category: 'Indian Classics',
		tag: "Chef's Pick",
		ingredients: ['Tandoori chicken', 'Tomato', 'Butter', 'Cream', 'Kasuri methi', 'Ginger', 'Garlic', 'Garam masala'],
		allergens: ['Milk', 'Nuts (cashew)'],
		nutrition: 'Approx. 520 kcal · 34 g protein · 30 g fat per serving.'
	},
	{
		id: 'paneer-butter-masala',
		name: 'Paneer Butter Masala',
		price: 279,
		rating: 4.8,
		reviews: 842,
		desc: 'Soft paneer cubes simmered in a rich tomato-cashew gravy finished with butter and cream. Best scooped up with garlic naan.',
		image: 'paneer-butter-masala',
		alt: 'Creamy paneer butter masala in a black bowl with naan',
		veg: true,
		spice: 2,
		serves: 'Serves 1–2',
		category: 'Indian Classics',
		ingredients: ['Paneer', 'Tomato', 'Cashew', 'Butter', 'Cream', 'Kasuri methi', 'Ginger'],
		allergens: ['Milk', 'Nuts (cashew)'],
		nutrition: 'Approx. 480 kcal · 18 g protein · 32 g fat per serving.'
	},
	{
		id: 'paneer-tikka',
		name: 'Paneer Tikka Angara',
		price: 299,
		rating: 4.7,
		reviews: 641,
		desc: 'Char-grilled paneer, capsicum and onions marinated overnight in hung curd and smoked chilli, served sizzling with mint chutney.',
		image: 'paneer-tikka',
		alt: 'Char-grilled paneer tikka skewers with capsicum on a sizzling plate',
		veg: true,
		spice: 3,
		serves: 'Serves 2',
		category: 'Indian Classics',
		tag: 'Smoky',
		ingredients: ['Paneer', 'Hung curd', 'Capsicum', 'Onion', 'Smoked chilli', 'Mint', 'Mustard oil'],
		allergens: ['Milk', 'Mustard'],
		nutrition: 'Approx. 390 kcal · 22 g protein · 24 g fat per serving.'
	},
	{
		id: 'dal-makhani',
		name: 'Dal Makhani — Slow Cooked 12 Hours',
		price: 249,
		rating: 4.9,
		reviews: 733,
		desc: 'Black urad simmered overnight on a slow flame with butter and cream, the way our grandmother made it. Comfort in a bowl.',
		image: 'dal-makhani',
		alt: 'Creamy black dal makhani in a black bowl with melting butter',
		veg: true,
		spice: 1,
		serves: 'Serves 1–2',
		category: 'Indian Classics',
		ingredients: ['Black urad dal', 'Butter', 'Cream', 'Tomato', 'Ginger', 'Garlic', 'Garam masala'],
		allergens: ['Milk'],
		nutrition: 'Approx. 340 kcal · 14 g protein · 18 g fat per serving.'
	},
	{
		id: 'veg-biryani',
		name: 'Subz Dum Biryani',
		price: 269,
		rating: 4.7,
		reviews: 518,
		desc: 'Garden vegetables and saffron basmati layered and sealed on dum, with fried onions and mint. Served with burhani raita.',
		image: 'veg-biryani',
		alt: 'Vegetable biryani in a copper handi with saffron rice and raita',
		veg: true,
		spice: 2,
		serves: 'Serves 1–2',
		category: 'Breads & Rice',
		ingredients: ['Basmati rice', 'Carrot', 'Beans', 'Cauliflower', 'Saffron', 'Fried onions', 'Mint', 'Curd'],
		allergens: ['Milk'],
		nutrition: 'Approx. 560 kcal · 12 g protein · 18 g fat per serving.'
	},
	{
		id: 'tandoori-platter',
		name: 'SpiceRoute Tandoori Platter',
		price: 499,
		mrp: 549,
		rating: 4.8,
		reviews: 429,
		desc: 'A feast from the clay oven — chicken tikka, seekh kebab, tandoori wings and paneer tikka on a sizzling plate with onions and mint chutney.',
		image: 'tandoori-platter',
		alt: 'Mixed tandoori grill platter with chicken tikka and kebabs on a sizzling plate',
		veg: false,
		spice: 3,
		serves: 'Serves 2–3',
		category: 'Indian Classics',
		tag: 'Sharing',
		ingredients: ['Chicken tikka', 'Seekh kebab', 'Tandoori wings', 'Paneer tikka', 'Hung curd', 'Mint chutney'],
		allergens: ['Milk', 'Egg (kebab)'],
		nutrition: 'Approx. 720 kcal · 52 g protein · 38 g fat per platter.'
	},
	{
		id: 'pasta-alfredo',
		name: 'Alfredo Pasta, Basil & Cherry Tomato',
		price: 319,
		rating: 4.7,
		reviews: 586,
		desc: 'Silky parmesan Alfredo with roasted cherry tomatoes, fresh basil and cracked pepper. Our Continental kitchen’s most-ordered plate.',
		image: 'pasta-alfredo',
		alt: 'Creamy Alfredo pasta with cherry tomatoes and basil in a white plate',
		veg: true,
		spice: 1,
		serves: 'Serves 1',
		category: 'Continental',
		tag: 'Most Loved',
		ingredients: ['Pasta', 'Parmesan', 'Cream', 'Cherry tomato', 'Basil', 'Garlic', 'Black pepper'],
		allergens: ['Milk', 'Gluten (wheat)'],
		nutrition: 'Approx. 610 kcal · 18 g protein · 34 g fat per serving.'
	},
	{
		id: 'hakka-noodles',
		name: 'Hakka Noodles, Wok-Tossed',
		price: 259,
		rating: 4.8,
		reviews: 912,
		desc: 'Smoky wok-tossed noodles with peppers, spring onion and our house Schezwan — the Indo-Chinese classic, done the SpiceRoute way.',
		image: 'hakka-noodles',
		alt: 'Steaming Hakka noodles lifted with chopsticks from a black bowl',
		veg: true,
		spice: 2,
		serves: 'Serves 1',
		category: 'Asian',
		tag: 'Wok Favourite',
		ingredients: ['Noodles', 'Peppers', 'Spring onion', 'Cabbage', 'Soy', 'Schezwan chilli', 'Sesame'],
		allergens: ['Gluten (wheat)', 'Soy', 'Sesame'],
		nutrition: 'Approx. 480 kcal · 12 g protein · 16 g fat per serving.'
	},
	{
		id: 'schezwan-fried-rice',
		name: 'Schezwan Fried Rice',
		price: 279,
		rating: 4.6,
		reviews: 447,
		desc: 'Fiery Schezwan fried rice with crunchy vegetables and a fried egg on top — or paneer, if you prefer it veg.',
		image: 'fried-rice',
		alt: 'Schezwan fried rice in a black bowl with spring onions and chilli',
		veg: true,
		spice: 3,
		serves: 'Serves 1',
		category: 'Asian',
		ingredients: ['Basmati rice', 'Schezwan chilli', 'Peppers', 'Spring onion', 'Egg', 'Soy', 'Sesame'],
		allergens: ['Egg', 'Soy', 'Sesame'],
		nutrition: 'Approx. 520 kcal · 14 g protein · 18 g fat per serving.'
	},
	{
		id: 'chocolate-lava-cake',
		name: 'Chocolate Lava Cake',
		price: 199,
		rating: 4.9,
		reviews: 1103,
		desc: 'Warm dark-chocolate fondant with a molten centre, served with fresh strawberries and a sprig of mint. Order it first — it takes 12 minutes.',
		image: 'lava-cake',
		alt: 'Chocolate lava cake with molten centre oozing, strawberries and mint',
		veg: true,
		spice: 0,
		serves: 'Serves 1',
		category: 'Desserts',
		tag: 'Signature',
		ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Flour', 'Sugar', 'Strawberries', 'Mint'],
		allergens: ['Milk', 'Egg', 'Gluten (wheat)'],
		nutrition: 'Approx. 420 kcal · 6 g protein · 26 g fat per serving.'
	},
	{
		id: 'tiramisu',
		name: 'Classic Tiramisu',
		price: 229,
		rating: 4.8,
		reviews: 564,
		desc: 'Espresso-soaked savoiardi, mascarpone clouds and a snowfall of cocoa — our Italian nod, made fresh every morning.',
		image: 'tiramisu',
		alt: 'Classic tiramisu slice on a white plate with cocoa dust',
		veg: true,
		spice: 0,
		serves: 'Serves 1',
		category: 'Desserts',
		ingredients: ['Mascarpone', 'Espresso', 'Savoiardi', 'Cocoa', 'Eggs', 'Sugar'],
		allergens: ['Milk', 'Egg', 'Gluten (wheat)'],
		nutrition: 'Approx. 380 kcal · 7 g protein · 22 g fat per serving.'
	},
	{
		id: 'gulab-jamun-ice-cream',
		name: 'Gulab Jamun with Vanilla Ice Cream',
		price: 149,
		rating: 4.8,
		reviews: 689,
		desc: 'Warm syrup-soaked gulab jamun over vanilla ice cream, finished with rose petals and pistachio dust. Hot meets cold, perfectly.',
		image: 'gulab-jamun',
		alt: 'Warm gulab jamun with vanilla ice cream, rose petals and pistachio',
		veg: true,
		spice: 0,
		serves: 'Serves 1',
		category: 'Desserts',
		ingredients: ['Khoya', 'Sugar syrup', 'Rose water', 'Vanilla ice cream', 'Pistachio'],
		allergens: ['Milk', 'Nuts (pistachio)'],
		nutrition: 'Approx. 340 kcal · 5 g protein · 16 g fat per serving.'
	},
	{
		id: 'berry-mojito',
		name: 'Berry Mint Mojito',
		price: 179,
		rating: 4.7,
		reviews: 392,
		desc: 'Muddled berries, fresh mint, lime and soda over crushed ice — our most-photographed cooler.',
		image: 'berry-mojito',
		alt: 'Berry mojito in a tall glass with mint and berries',
		veg: true,
		spice: 0,
		serves: 'Serves 1',
		category: 'Beverages',
		ingredients: ['Mixed berries', 'Mint', 'Lime', 'Soda', 'Sugar'],
		allergens: [],
		nutrition: 'Approx. 120 kcal per glass.'
	},
	{
		id: 'mango-lassi',
		name: 'Alphonso Mango Lassi',
		price: 149,
		rating: 4.9,
		reviews: 815,
		desc: 'Thick Alphonso mango lassi with a hint of cardamom, topped with mango cubes and pistachios. Summer, in a glass.',
		image: 'mango-lassi',
		alt: 'Creamy mango lassi in a tall glass topped with mango cubes and pistachios',
		veg: true,
		spice: 0,
		serves: 'Serves 1',
		category: 'Beverages',
		tag: 'Seasonal',
		ingredients: ['Alphonso mango', 'Curd', 'Cardamom', 'Pistachio', 'Saffron'],
		allergens: ['Milk', 'Nuts (pistachio)'],
		nutrition: 'Approx. 210 kcal per glass.'
	},
	{
		id: 'garlic-butter-naan',
		name: 'Garlic Butter Naan Basket',
		price: 119,
		rating: 4.7,
		reviews: 508,
		desc: 'Tandoor-blistered naan brushed with garlic butter and coriander — two pieces, served hot in a basket.',
		image: 'paneer-butter-masala',
		alt: 'Garlic butter naan served beside paneer butter masala',
		veg: true,
		spice: 1,
		serves: 'Serves 1–2',
		category: 'Breads & Rice',
		ingredients: ['Refined flour', 'Garlic', 'Butter', 'Coriander', 'Yogurt'],
		allergens: ['Milk', 'Gluten (wheat)'],
		nutrition: 'Approx. 280 kcal · 7 g protein · 9 g fat per basket.'
	},
	{
		id: 'jeera-rice',
		name: 'Jeera Rice & Tadka Dal',
		price: 199,
		rating: 4.6,
		reviews: 301,
		desc: 'Ghee-tempered jeera rice with a comforting bowl of tadka dal — simple, honest, and always on the table.',
		image: 'veg-biryani',
		alt: 'Jeera rice with saffron and fried onions in a copper handi',
		veg: true,
		spice: 1,
		serves: 'Serves 1',
		category: 'Breads & Rice',
		ingredients: ['Basmati rice', 'Cumin', 'Ghee', 'Toor dal', 'Garlic', 'Red chilli'],
		allergens: ['Milk'],
		nutrition: 'Approx. 430 kcal · 11 g protein · 12 g fat per serving.'
	}
];

export const heroDish = dishes[0];

export const categories: Category[] = [
	'Indian Classics',
	'Continental',
	'Asian',
	'Desserts',
	'Beverages',
	'Breads & Rice'
];

export const signatureSelections = [
	{ title: 'Indian Classics', desc: 'Biryani, butter chicken & tandoor favourites', image: 'paneer-butter-masala', alt: 'Paneer butter masala — Indian classics', href: '/menu?category=Indian%20Classics' },
	{ title: 'Continental Favorites', desc: 'Pastas, grills & European comfort', image: 'pasta-alfredo', alt: 'Alfredo pasta — continental favourites', href: '/menu?category=Continental' },
	{ title: 'Asian Delights', desc: 'Hakka noodles, fried rice & wok dishes', image: 'hakka-noodles', alt: 'Hakka noodles — Asian delights', href: '/menu?category=Asian' },
	{ title: 'Desserts & More', desc: 'Lava cake, tiramisu & gulab jamun', image: 'lava-cake', alt: 'Chocolate lava cake — desserts', href: '/menu?category=Desserts' }
];

export const features: { title: string; desc: string; icon: 'cloche' | 'leaf' | 'chef' | 'users' }[] = [
	{ title: 'Diverse Menu', desc: 'Indian, Continental & Asian under one roof', icon: 'cloche' },
	{ title: 'Fresh & Quality Ingredients', desc: 'Farm vegetables & Alphonso mangoes, daily', icon: 'leaf' },
	{ title: 'Expert Chefs', desc: 'A decade of tandoor, wok & patisserie craft', icon: 'chef' },
	{ title: 'Warm Ambience', desc: 'Candle-lit tables, brass & warm wood', icon: 'users' }
];

export const todaysSpecials = [
	{ dishId: 'hyderabadi-chicken-biryani', note: 'Dum-sealed at 7 PM — limited handis' },
	{ dishId: 'tandoori-platter', note: 'Weekend sharing platter, ₹50 off' },
	{ dishId: 'chocolate-lava-cake', note: 'Baked to order, 12 minutes' },
	{ dishId: 'mango-lassi', note: 'Alphonso season — while it lasts' }
];

export const testimonials = [
	{ name: 'Aarav Mehta', role: 'Food blogger, Bandra', rating: 5, text: 'The Hyderabadi biryani here is the real deal — saffron, smoke, and a handi that arrives still sealed. My Saturday ritual now.', dish: 'Hyderabadi Chicken Biryani' },
	{ name: 'Priya Nair', role: 'Regular since 2018', rating: 5, text: 'We booked the private dining room for my parents’ anniversary. The staff remembered our names, the food, the candles — flawless.', dish: 'Private Dining' },
	{ name: 'Rohan & Sneha Kapoor', role: 'Weekend regulars', rating: 5, text: 'Butter chicken, lava cake, and a table by the window. SpiceRoute is our default answer to “where should we eat tonight?”', dish: 'Butter Chicken' },
	{ name: 'Zoya Sheikh', role: 'First-time visitor', rating: 4, text: 'Hakka noodles with real wok hei and a mango lassi to finish — generous portions, warm service, and prices that make sense.', dish: 'Hakka Noodles' }
];

export const galleryItems = [
	{ image: 'hero-biryani', alt: 'Hyderabadi chicken biryani in a copper handi', tag: 'Signature', caption: 'Dum biryani, sealed & slow-cooked' },
	{ image: 'dining-room', alt: 'Warm dining room with pendant lights', tag: 'Ambience', caption: 'Candle-lit evenings at SpiceRoute' },
	{ image: 'tandoori-platter', alt: 'Tandoori grill platter', tag: 'Tandoor', caption: 'Straight off the clay oven' },
	{ image: 'lava-cake', alt: 'Chocolate lava cake', tag: 'Desserts', caption: 'Molten centre, 12 minutes to order' },
	{ image: 'chef-portrait', alt: 'Chef plating a dish', tag: 'Kitchen', caption: 'Our kitchen, our craft' },
	{ image: 'pasta-alfredo', alt: 'Alfredo pasta', tag: 'Continental', caption: 'Silky Alfredo, fresh basil' },
	{ image: 'berry-mojito', alt: 'Berry mojito', tag: 'Beverages', caption: 'The most-photographed cooler' },
	{ image: 'private-dining', alt: 'Private dining room', tag: 'Private Dining', caption: 'Twelve seats, one long table' }
];

export const offers = [
	{ title: 'Weekday Lunch Thali — ₹299', desc: 'Dal makhani, paneer butter masala, jeera rice, naan, salad & gulab jamun. Monday–Friday, 12–3:30 PM.', code: 'LUNCH299', valid: 'Valid till 31 Dec 2026' },
	{ title: 'Family Feast — 20% Off', desc: 'Tandoori platter + any two biryanis + two lassis. Dine-in only, weekends.', code: 'FEAST20', valid: 'Valid till 31 Dec 2026' },
	{ title: 'Dessert on Us', desc: 'A complimentary gulab jamun with every order above ₹999, dine-in or delivery.', code: 'SWEET999', valid: 'Valid till 31 Dec 2026' },
	{ title: 'Birthday Special', desc: 'A free lava cake and a decorated table when you book a birthday table for 6 or more.', code: 'BDAYCAKE', valid: 'Ongoing — book 48 hrs ahead' }
];

export const cateringPackages = [
	{ name: 'Silver', price: 499, unit: 'per person', desc: 'Perfect for office lunches & small gatherings', features: ['2 veg + 1 non-veg main', 'Biryani or jeera rice', 'Naan & salad', 'Gulab jamun', 'Disposable serveware included'], min: 'Min. 20 guests' },
	{ name: 'Gold', price: 799, unit: 'per person', desc: 'Our most-booked package for celebrations', features: ['Live tandoor counter', '3 veg + 2 non-veg mains', 'Biryani + breads', 'Hakka noodles station', 'Dessert duo & mocktails', 'Uniformed service staff'], min: 'Min. 30 guests', popular: true },
	{ name: 'Platinum', price: 1199, unit: 'per person', desc: 'Weddings & large-format events', features: ['Everything in Gold', 'Live chaat & dessert counters', 'Continental & Asian stations', 'Dedicated event manager', 'Premium crockery & decor', 'Tasting session included'], min: 'Min. 50 guests' }
];

export const faqs = [
	{ q: 'Do I need a reservation?', a: 'Walk-ins are welcome, but weekends fill up fast. We recommend booking a table online or by phone, especially for parties of 6 or more.' },
	{ q: 'Do you deliver?', a: 'Yes — we deliver across Bandra, Khar, Santacruz, Juhu and Andheri West. Delivery is free on orders of ₹499 and above; a ₹40 fee applies below that. GST of 5% applies on food.' },
	{ q: 'Is there a veg-only or Jain option?', a: 'Absolutely. Most of our Indian and Asian dishes have a veg version, and Jain preparations (no onion, garlic or root vegetables) are available on request — mention it in your order notes.' },
	{ q: 'Can you cater a private event?', a: 'Yes — our Gold and Platinum catering packages cover 20 to 500 guests, with live counters and a dedicated event manager. Use the catering enquiry form and we will call you within 24 hours.' },
	{ q: 'Do you have a private dining room?', a: 'Yes, our private dining room seats 12 around one long table, with a set menu and a dedicated server. Book it from the Private Dining page or call us.' },
	{ q: 'What payment methods do you accept?', a: 'UPI (GPay, PhonePe, Paytm), all major credit and debit cards, and cash on delivery for orders. At the restaurant we also accept net banking and meal coupons.' }
];

export const reservationSlots = ['12:00 PM', '1:00 PM', '2:00 PM', '4:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'];
export const partySizes = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12];

export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

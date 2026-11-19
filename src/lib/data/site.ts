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
	// Split service windows — the kitchen pauses 3:30–7 PM between lunch and dinner.
	lunchHours: '11:30 AM – 3:30 PM',
	dinnerHours: '7:00 PM – 11:00 PM',
	rating: 4.8,
	reviewCount: 3200,
	established: 2016,
	fssai: 'FSSAI Lic. No. 11516001000456',
	directionsUrl: 'https://www.google.com/maps/search/SpiceRoute+Restaurant+Bandra+West+Mumbai',
	socials: {
		instagram: 'https://www.instagram.com/spiceroute.mumbai',
		facebook: 'https://www.facebook.com/spiceroutemumbai',
		x: 'https://x.com/spiceroute_in'
	},
	mapEmbed:
		'https://maps.google.com/maps?q=Linking%20Road%2C%20Bandra%20West%2C%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed',
	areas: ['Bandra West', 'Bandra East', 'Khar', 'Santacruz', 'Juhu', 'Andheri West', 'Mahim']
};

export const navLinks = [
	{ label: 'Home', href: '/' },
	{ label: 'Menu', href: '/menu' },
	{ label: 'Reservations', href: '/reservations' },
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
		image: 'garlic-butter-naan',
		alt: 'Garlic butter naan, blistered from the tandoor, brushed with butter and coriander',
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
		image: 'jeera-rice',
		alt: 'Jeera rice tempered with cumin and ghee, served with tadka dal in a copper bowl',
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
	{ image: 'private-dining', alt: 'Private dining room', tag: 'Private Dining', caption: 'Twelve seats, one long table' },
	{ image: 'live-music', alt: 'Live acoustic music in the restaurant', tag: 'Events', caption: 'Acoustic Fridays, 8 PM onwards' },
	{ image: 'tasting-menu', alt: 'Fine-dining tasting course', tag: 'Tasting Menu', caption: 'Five courses, one journey' },
	{ image: 'chef-portrait-armaan', alt: 'Executive chef Armaan Kapoor', tag: 'Our Chefs', caption: 'Chef Armaan Kapoor, our founder' },
	{ image: 'sourcing-farm', alt: 'Fresh farm vegetables and spices', tag: 'Sourcing', caption: 'Farm vegetables, every morning' }
];

export const offers = [
	{ title: 'Weekday Lunch — ₹100 Off', desc: 'Flat ₹100 off lunch orders above ₹499 with code LUNCH299, Monday–Friday, 12–3:30 PM. Pair it with our lunch thali — dal makhani, paneer butter masala, jeera rice, naan & gulab jamun for ₹299, dine-in.', code: 'LUNCH299', valid: 'Valid till 31 Dec 2026' },
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

// Lunch 11:30 AM–3:00 PM, dinner 7:00–10:30 PM — no slots in the 3:30–7 PM
// kitchen break. Party sizes run 1–12 with nothing skipped.
export const reservationSlots = [
	'11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM',
	'7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM'
];
export const partySizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const seatingPreferences = ['No preference', 'Window seat', 'Outdoor seating', 'Private dining room', 'High chair for a child', 'Wheelchair-accessible table'];

export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

// "Pairs well with" — dish id + why, shown on every dish page.
export const pairsWith: Record<string, { id: string; why: string }[]> = {
	'hyderabadi-chicken-biryani': [
		{ id: 'garlic-butter-naan', why: 'Scoop up the masala with hot garlic naan' },
		{ id: 'mango-lassi', why: 'Cool Alphonso lassi tames the dum heat' },
		{ id: 'gulab-jamun-ice-cream', why: 'Warm jamun, cold ice cream — the classic finish' }
	],
	'butter-chicken': [
		{ id: 'garlic-butter-naan', why: 'Made for mopping up the gravy' },
		{ id: 'jeera-rice', why: 'Ghee-tempered rice, mild and comforting' },
		{ id: 'berry-mojito', why: 'Bright berries cut through the butter' }
	],
	'paneer-butter-masala': [
		{ id: 'garlic-butter-naan', why: 'The pairing our regulars swear by' },
		{ id: 'jeera-rice', why: 'Simple rice, rich gravy — balanced' }
	],
	'paneer-tikka': [
		{ id: 'berry-mojito', why: 'Cool mint and berries with smoky tikka' },
		{ id: 'mango-lassi', why: 'Creamy lassi cools the angara chilli' }
	],
	'dal-makhani': [
		{ id: 'garlic-butter-naan', why: 'Naan and slow-cooked dal, the old way' },
		{ id: 'jeera-rice', why: 'The comfort pairing, every time' }
	],
	'veg-biryani': [
		{ id: 'mango-lassi', why: 'Burhani raita’s cooler cousin' },
		{ id: 'gulab-jamun-ice-cream', why: 'Sweet finish to a saffron meal' }
	],
	'tandoori-platter': [
		{ id: 'mango-lassi', why: 'Cool lassi between smoky bites' },
		{ id: 'berry-mojito', why: 'A cooler that keeps up with the grill' },
		{ id: 'garlic-butter-naan', why: 'Extra naan for the kebabs' }
	],
	'pasta-alfredo': [
		{ id: 'tiramisu', why: 'Stay Italian — espresso and mascarpone' },
		{ id: 'berry-mojito', why: 'Berries and mint lighten the cream' }
	],
	'hakka-noodles': [
		{ id: 'schezwan-fried-rice', why: 'Double down on the wok, sharing style' },
		{ id: 'mango-lassi', why: 'Sweet Alphonso cools the Schezwan' }
	],
	'schezwan-fried-rice': [
		{ id: 'hakka-noodles', why: 'Two wok classics, one table' },
		{ id: 'berry-mojito', why: 'Cold, minty, made for fiery rice' }
	],
	'chocolate-lava-cake': [
		{ id: 'mango-lassi', why: 'Mango and chocolate — surprisingly perfect' },
		{ id: 'tiramisu', why: 'Two desserts, one very good decision' }
	],
	'tiramisu': [
		{ id: 'chocolate-lava-cake', why: 'For the table that can’t choose' },
		{ id: 'berry-mojito', why: 'Light berries after espresso cream' }
	],
	'gulab-jamun-ice-cream': [
		{ id: 'hyderabadi-chicken-biryani', why: 'The biryani-to-jamun arc, start to finish' },
		{ id: 'mango-lassi', why: 'Double mango, double joy' }
	],
	'berry-mojito': [
		{ id: 'paneer-tikka', why: 'Cool berries meet smoky tikka' },
		{ id: 'pasta-alfredo', why: 'A bright cooler for a rich pasta' }
	],
	'mango-lassi': [
		{ id: 'hyderabadi-chicken-biryani', why: 'The classic biryani companion' },
		{ id: 'chocolate-lava-cake', why: 'Alphonso meets dark chocolate' }
	],
	'garlic-butter-naan': [
		{ id: 'butter-chicken', why: 'The reason naan was invented' },
		{ id: 'dal-makhani', why: 'Slow dal, hot naan — comfort, defined' }
	],
	'jeera-rice': [
		{ id: 'dal-makhani', why: 'Dal-rice, the way home tastes' },
		{ id: 'paneer-butter-masala', why: 'Mild rice, rich gravy' }
	]
};

// Dishes that can be prepared Jain (no onion, garlic or root vegetables) on request.
export const jainFriendlyIds = [
	'paneer-butter-masala', 'paneer-tikka', 'dal-makhani', 'veg-biryani',
	'garlic-butter-naan', 'jeera-rice', 'chocolate-lava-cake',
	'gulab-jamun-ice-cream', 'mango-lassi', 'berry-mojito'
];

// Promo codes redeemable at checkout (see /order). type: flat ₹ off, or % off.
export type PromoCode = { code: string; type: 'flat' | 'percent'; value: number; minOrder: number; cap?: number; desc: string };
export const promoCodes: PromoCode[] = [
	{ code: 'LUNCH299', type: 'flat', value: 100, minOrder: 499, desc: 'Flat ₹100 off weekday lunch orders' },
	{ code: 'FEAST20', type: 'percent', value: 20, minOrder: 800, cap: 400, desc: '20% off family feasts, up to ₹400' },
	{ code: 'SWEET999', type: 'flat', value: 149, minOrder: 999, desc: 'A dessert on us — ₹149 off orders above ₹999' },
	{ code: 'BDAYCAKE', type: 'flat', value: 199, minOrder: 999, desc: 'Free lava cake for birthday tables' }
];

export const chefs = [
	{
		name: 'Armaan Kapoor', role: 'Executive Chef & Founder', image: 'chef-portrait-armaan',
		alt: 'Executive chef Armaan Kapoor in a black chef coat in the SpiceRoute kitchen',
		years: '18 years at the pass', signature: 'hyderabadi-chicken-biryani',
		bio: 'Armaan trained in Hyderabad and Delhi before cooking his way along the old spice route — Kochi, Lucknow, Istanbul. He opened SpiceRoute in 2016 with one copper handi and a stubborn belief: dum biryani should arrive sealed, or not at all.',
		quote: 'A handi that arrives unsealed is just rice. We seal it, or we don’t serve it.'
	},
	{
		name: 'Meera Nair', role: 'Head of Patisserie', image: 'chef-portrait-meera',
		alt: 'Pastry chef Meera Nair holding a chocolate dessert in the bakery kitchen',
		years: '12 years in patisserie', signature: 'chocolate-lava-cake',
		bio: 'Meera ran the dessert pass at a five-star in Kochi before joining SpiceRoute. Her lava cake — dark chocolate, twelve minutes, no shortcuts — is the most-photographed plate in Bandra, and the one most often ordered twice.',
		quote: 'Dessert is not an afterthought. It is the last thing a guest remembers.'
	},
	{
		name: 'Rohit Shetty', role: 'Head Tandoor Chef', image: 'chef-portrait',
		alt: 'Head tandoor chef Rohit Shetty plating a dish in the kitchen',
		years: '15 years at the clay oven', signature: 'tandoori-platter',
		bio: 'Rohit has fired the same clay oven every morning since 2016. He reads the coals the way other chefs read recipes — and his tandoori platter is why half of Bandra West plans its weekends around our grill.',
		quote: 'The tandoor decides the menu. I just listen to it.'
	}
];

export const events = [
	{ title: 'Acoustic Fridays', date: 'Every Friday', time: '8:00 – 10:00 PM', price: 'No cover charge', desc: 'Unplugged sets from Mumbai’s indie artists in the main dining room. Book a window table — they go first.', image: 'live-music', tag: 'Live Music' },
	{ title: 'Dum Biryani Masterclass', date: 'Sat, 29 Nov 2026', time: '11:00 AM – 1:00 PM', price: '₹1,499 per person', desc: 'Chef Armaan teaches the seal, the dum and the saffron — then you eat what you sealed. Aprons and lunch included, 12 seats only.', image: 'hero-biryani', tag: 'Masterclass' },
	{ title: 'The Tasting Table — Winter Edition', date: 'Fri, 12 Dec 2026', time: '7:30 PM', price: '₹2,499 per person', desc: 'Five courses from three kitchens, one long table, wines and stories in between. Our set-menu evening, twice a season.', image: 'tasting-menu', tag: 'Tasting Menu' },
	{ title: 'Christmas Eve Feast', date: 'Thu, 24 Dec 2026', time: '7:00 – 11:00 PM', price: '₹1,999 per person', desc: 'Roast turkey with a SpiceRoute twist, plum cake, live carols and a midnight toast. Family seating, book early.', image: 'dining-room', tag: 'Festive' },
	{ title: 'New Year’s Eve at SpiceRoute', date: 'Thu, 31 Dec 2026', time: '8:00 PM – 12:30 AM', price: '₹2,999 per person', desc: 'A seven-course countdown menu, live music till midnight, and biryani at 12:05 AM — because that is how we start a year.', image: 'private-dining', tag: 'Festive' }
];

export const giftCardDenominations = [500, 1000, 2500, 5000];

export const loyaltyTiers = [
	{ name: 'Regular', threshold: 'Join free', perk: 'Earn 5% back in SpicePoints on every bill', color: 'bg-cream-deep' },
	{ name: 'Foodie', threshold: '₹10,000 spent', perk: 'Earn 7% back + a free dessert on your birthday', color: 'bg-gold-pale' },
	{ name: 'Connoisseur', threshold: '₹25,000 spent', perk: 'Earn 10% back + priority tables + chef’s tasting invites', color: 'bg-gold' }
];

export const setMenus = [
	{
		name: 'The SpiceRoute Tasting', price: 2499, serves: 'Five courses · 2 hours',
		desc: 'Our signature journey — tandoor, wok and patisserie in five plates, guided by the chef.',
		courses: ['Paneer tikka angara, smoked chilli & mint', 'Old Delhi butter chicken, garlic naan', 'Hakka noodles, wok hei & Schezwan', 'Alphonso mango lassi, cardamom', 'Chocolate lava cake, strawberries & mint'],
		veg: false
	},
	{
		name: 'The Garden Tasting (Veg)', price: 1999, serves: 'Five courses · 2 hours',
		desc: 'The same journey, entirely vegetarian — from the tandoor to the patisserie.',
		courses: ['Paneer tikka angara, smoked chilli & mint', 'Dal makhani, slow-cooked 12 hours, jeera rice', 'Hakka noodles, wok hei & Schezwan', 'Alphonso mango lassi, cardamom', 'Gulab jamun with vanilla ice cream'],
		veg: true
	},
	{
		name: 'Weekday Lunch Thali', price: 299, serves: 'Dine-in · Mon–Fri, 12–3:30 PM',
		desc: 'The quick, generous lunch — everything on one plate, out in fifteen minutes.',
		courses: ['Dal makhani', 'Paneer butter masala', 'Jeera rice', 'Garlic butter naan', 'Salad & pickle', 'Gulab jamun'],
		veg: true
	},
	{
		name: 'Sunday Family Set Menu', price: 899, serves: 'Per person · Min. 4 guests',
		desc: 'One long table, one big spread — the way Sundays are supposed to taste.',
		courses: ['SpiceRoute tandoori platter to share', 'Hyderabadi chicken biryani, sealed on dum', 'Subz dum biryani & dal makhani', 'Garlic naan basket & jeera rice', 'Chocolate lava cake & gulab jamun'],
		veg: false
	}
];

export const jobs = [
	{ title: 'Sous Chef — Indian Kitchen', dept: 'Kitchen', type: 'Full-time', desc: 'Run the tandoor and curry sections with Chef Armaan. 3+ years in a busy Indian kitchen, calm under a full pass.' },
	{ title: 'Pastry Commis', dept: 'Patisserie', type: 'Full-time', desc: 'Learn the lava cake, tiramisu and gulab jamun from Chef Meera. Freshers with a pastry diploma welcome.' },
	{ title: 'Server — Dining Room', dept: 'Service', type: 'Full-time', desc: 'Look after 6–8 tables a shift, know the menu by heart, and remember a regular’s usual. Evening shifts.' },
	{ title: 'Bartender — Mocktails & Coolers', dept: 'Bar', type: 'Part-time', desc: 'Our berry mojitos and mango coolers need a steady hand and a smile. Weekend evenings.' },
	{ title: 'Delivery Captain', dept: 'Delivery', type: 'Full-time', desc: 'Keep Bandra’s biryani hot and on time. Two-wheeler + licence required; fuel allowance included.' }
];

export const pressQuotes = [
	{ quote: 'The biryani arrives sealed, the room glows amber, and Bandra finally has a multi-cuisine table worth dressing up for.', source: 'The Mumbai Food Guide', date: 'October 2026' },
	{ quote: 'A lava cake that justifies the twelve-minute wait — and a dining room that understands what candlelight is for.', source: 'City Eats Weekly', date: 'August 2026' },
	{ quote: 'SpiceRoute does the rare thing: Indian, Continental and Asian kitchens that are each, on their own, worth the visit.', source: 'The Bandra Chronicle', date: 'June 2026' }
];

export const awards = [
	{ title: 'Best Multi-Cuisine Restaurant — Bandra', org: 'Mumbai Food Awards', year: '2026' },
	{ title: 'Travellers’ Choice', org: 'Dining Guide India', year: '2025' },
	{ title: 'Best Biryani in the Suburbs', org: 'The Mumbai Food Guide', year: '2025' }
];

export const deliveryZones = [
	{ area: 'Bandra West', fee: 0, min: 0, eta: '30–40 min' },
	{ area: 'Bandra East', fee: 0, min: 0, eta: '30–40 min' },
	{ area: 'Khar', fee: 40, min: 299, eta: '35–45 min' },
	{ area: 'Santacruz', fee: 40, min: 299, eta: '35–45 min' },
	{ area: 'Juhu', fee: 40, min: 499, eta: '40–50 min' },
	{ area: 'Andheri West', fee: 60, min: 499, eta: '45–55 min' },
	{ area: 'Mahim', fee: 40, min: 299, eta: '35–45 min' }
];

export const sourcingPartners = [
	{ name: 'Vasai Green Farms', what: 'Vegetables, every morning', detail: 'Our greens arrive before 7 AM, picked the same day.' },
	{ name: 'Ratnagiri Alphonso Orchards', what: 'Mangoes in season', detail: 'GI-tagged Alphonso, May to July, for lassi and desserts.' },
	{ name: 'Kochi Spice Traders', what: 'Whole spices, ground in-house', detail: 'Cardamom, saffron and garam masala, milled weekly.' }
];

// Allergen groups used by the allergen filter + guide page.
export const allergenGroups = ['Milk', 'Nuts', 'Gluten', 'Egg', 'Soy', 'Sesame', 'Mustard'];

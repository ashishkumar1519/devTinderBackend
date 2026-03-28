const { UserModel } = require('./Models/user.model');
const { connectDB } = require('./config/database');
const bcrypt = require('bcrypt');


const userData = [
  {
    "firstname": "Ethan",
    "lastname": "Hunt",
    "email": "ethan.h@example.com",
    "password": "password123",
    "age": 32,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    "about": "Tech enthusiast and adrenaline junkie. If I'm not coding, I'm likely skydiving.",
    "skills": ["Cybersecurity", "Skydiving", "Python"]
  },
  {
    "firstname": "Maya",
    "lastname": "Patel",
    "email": "maya.p@example.com",
    "password": "password123",
    "age": 27,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    "about": "Digital nomad currently based in Bali. Obsessed with sunset yoga and smoothie bowls.",
    "skills": ["Content Writing", "SEO", "Yoga"]
  },
  {
    "firstname": "Lucas",
    "lastname": "Gomez",
    "email": "lucas.g@example.com",
    "password": "password123",
    "age": 29,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    "about": "Former pro athlete turned software engineer. I still treat every sprint like a race.",
    "skills": ["JavaScript", "Leadership", "Fitness"]
  },
  {
    "firstname": "Sophie",
    "lastname": "Bennett",
    "email": "sophie.b@example.com",
    "password": "password123",
    "age": 24,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    "about": "Aspiring pastry chef. I can bake a croissant from scratch, but don't ask me to cook dinner.",
    "skills": ["Baking", "Design", "Patience"]
  },
  {
    "firstname": "James",
    "lastname": "Moriarty",
    "email": "james.m@example.com",
    "password": "password123",
    "age": 35,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    "about": "Logic is my forte. I enjoy complex puzzles, dark chocolate, and classical violin.",
    "skills": ["Data Analysis", "Chess", "Violin"]
  },
  {
    "firstname": "Chloe",
    "lastname": "Zhao",
    "email": "chloe.z@example.com",
    "password": "password123",
    "age": 26,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1554151228-14d9def656e4",
    "about": "Indie filmmaker. I see the world through a 35mm lens. Coffee is my fuel.",
    "skills": ["Directing", "Editing", "Storytelling"]
  },
  {
    "firstname": "Vikram",
    "lastname": "Singh",
    "email": "vikram.s@example.com",
    "password": "password123",
    "age": 31,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    "about": "Financial analyst by day, woodworker by weekend. I love building things with my hands.",
    "skills": ["Finance", "Woodworking", "Excel"]
  },
  {
    "firstname": "Emma",
    "lastname": "Watson",
    "email": "emma.w@example.com",
    "password": "password123",
    "age": 28,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    "about": "Avid reader and environmental activist. Let's make the world a greener place.",
    "skills": ["Public Speaking", "Writing", "Sustainability"]
  },
  {
    "firstname": "Daniel",
    "lastname": "Lee",
    "email": "daniel.l@example.com",
    "password": "password123",
    "age": 23,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
    "about": "UX designer who believes that less is more. Minimalist at heart.",
    "skills": ["Figma", "UI/UX", "Prototyping"]
  },
  {
    "firstname": "Fatima",
    "lastname": "Zahra",
    "email": "fatima.z@example.com",
    "password": "password123",
    "age": 25,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
    "about": "Architecture student. I spend too much time thinking about skylines and shadows.",
    "skills": ["AutoCAD", "Sketching", "Design"]
  },
  {
    "firstname": "Ryan",
    "lastname": "Reynolds",
    "email": "ryan.r@example.com",
    "password": "password123",
    "age": 29,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    "about": "Sarcastic humor and a love for high-intensity training. Looking for a gym buddy.",
    "skills": ["Boxing", "Sales", "Comedy"]
  },
  {
    "firstname": "Olivia",
    "lastname": "Taylor",
    "email": "olivia.t@example.com",
    "password": "password123",
    "age": 22,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    "about": "Social media manager. I know what's trending before it's actually trending.",
    "skills": ["Marketing", "Photography", "Branding"]
  },
  {
    "firstname": "Aaron",
    "lastname": "Paul",
    "email": "aaron.p@example.com",
    "password": "password123",
    "age": 30,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
    "about": "Craft beer lover and dog father. Life is better with a Golden Retriever by your side.",
    "skills": ["Brewing", "Hiking", "Management"]
  },
  {
    "firstname": "Isabella",
    "lastname": "Rossi",
    "email": "isabella.r@example.com",
    "password": "password123",
    "age": 27,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df",
    "about": "Italian soul living in the city. I make the best lasagna you'll ever taste.",
    "skills": ["Cooking", "Fashion", "Italian"]
  },
  {
    "firstname": "Kevin",
    "lastname": "Hart",
    "email": "kevin.h@example.com",
    "password": "password123",
    "age": 34,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4",
    "about": "Short guy, big dreams. I believe laughter is the best medicine.",
    "skills": ["Improv", "Public Relations", "Jogging"]
  },
  {
    "firstname": "Zara",
    "lastname": "Khan",
    "email": "zara.k@example.com",
    "password": "password123",
    "age": 24,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    "about": "Medical resident. When I'm not at the hospital, I'm catching up on sleep or Netflix.",
    "skills": ["Medicine", "Time Management", "Painting"]
  },
  {
    "firstname": "Leo",
    "lastname": "Messi",
    "email": "leo.m@example.com",
    "password": "password123",
    "age": 33,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1504257432389-52343af06ae3",
    "about": "Football is life. Looking for someone to watch the Champions League with.",
    "skills": ["Football", "Teamwork", "Coaching"]
  },
  {
    "firstname": "Nina",
    "lastname": "Simone",
    "email": "nina.s@example.com",
    "password": "password123",
    "age": 26,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    "about": "Jazz singer performing in local bars. I have a soul from the 1920s.",
    "skills": ["Singing", "Piano", "History"]
  },
  {
    "firstname": "Chris",
    "lastname": "Evans",
    "email": "chris.e@example.com",
    "password": "password123",
    "age": 32,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    "about": "Patriotic and outdoorsy. I love national parks and vintage motorcycles.",
    "skills": ["Motorcycling", "First Aid", "Camping"]
  },
  {
    "firstname": "Lily",
    "lastname": "Collins",
    "email": "lily.c@example.com",
    "password": "password123",
    "age": 25,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604",
    "about": "English literature major. I live in a world of metaphors and poetry.",
    "skills": ["Poetry", "French", "Editing"]
  },
  {
    "firstname": "Marcus",
    "lastname": "Aurelius",
    "email": "marcus.a@example.com",
    "password": "password123",
    "age": 40,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    "about": "Stoic philosopher at heart. Just trying to maintain inner peace in a chaotic world.",
    "skills": ["Philosophy", "Journaling", "Meditation"]
  },
  {
    "firstname": "Aria",
    "lastname": "Stark",
    "email": "aria.s@example.com",
    "password": "password123",
    "age": 21,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
    "about": "Not your average girl. I prefer sword fighting (fencing) over tea parties.",
    "skills": ["Fencing", "Strategy", "Survival"]
  },
  {
    "firstname": "Noah",
    "lastname": "Centineo",
    "email": "noah.c@example.com",
    "password": "password123",
    "age": 26,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    "about": "Rom-com lover and amateur poet. I'm a sucker for a good sunset.",
    "skills": ["Acting", "Surfing", "Guitar"]
  },
  {
    "firstname": "Grace",
    "lastname": "Hopper",
    "email": "grace.h@example.com",
    "password": "password123",
    "age": 29,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    "about": "Breaking bugs and glass ceilings. Backend engineering is my playground.",
    "skills": ["COBOL", "C++", "Debugging"]
  },
  {
    "firstname": "Peter",
    "lastname": "Parker",
    "email": "peter.p@example.com",
    "password": "password123",
    "age": 22,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
    "about": "Friendly neighborhood freelancer. Science geek and photography enthusiast.",
    "skills": ["Physics", "Photography", "Web Design"]
  },
  {
    "firstname": "Diana",
    "lastname": "Prince",
    "email": "diana.p@example.com",
    "password": "password123",
    "age": 30,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    "about": "Anthropologist and history buff. I believe in truth and justice.",
    "skills": ["History", "Martial Arts", "Research"]
  },
  {
    "firstname": "Bruce",
    "lastname": "Wayne",
    "email": "bruce.w@example.com",
    "password": "password123",
    "age": 35,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    "about": "Night owl. Business by day, philanthropy by night. I like dark suits.",
    "skills": ["Business", "Strategy", "Detective Work"]
  },
  {
    "firstname": "Selina",
    "lastname": "Kyle",
    "email": "selina.k@example.com",
    "password": "password123",
    "age": 27,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1554151228-14d9def656e4",
    "about": "Independent and agile. I have a soft spot for stray cats and expensive jewelry.",
    "skills": ["Gymnastics", "Stealth", "Negotiation"]
  },
  {
    "firstname": "Clark",
    "lastname": "Kent",
    "email": "clark.k@example.com",
    "password": "password123",
    "age": 32,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    "about": "Small town boy living in the big city. Investigative journalist at the Daily Planet.",
    "skills": ["Journalism", "Flying", "Strength"]
  },
  {
    "firstname": "Lois",
    "lastname": "Lane",
    "email": "lois.l@example.com",
    "password": "password123",
    "age": 31,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    "about": "Pulitzer prize winner. I'll do anything for a good story.",
    "skills": ["Writing", "Debating", "Networking"]
  },
  {
    "firstname": "Tony",
    "lastname": "Stark",
    "email": "tony.s@example.com",
    "password": "password123",
    "age": 38,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    "about": "Genius, billionaire, playboy, philanthropist. I also build robots.",
    "skills": ["Engineering", "AI", "Physics"]
  },
  {
    "firstname": "Natasha",
    "lastname": "Romanoff",
    "email": "natasha.r@example.com",
    "password": "password123",
    "age": 30,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df",
    "about": "Multi-lingual and highly trained. I'm good at keeping secrets.",
    "skills": ["Espionage", "Jiu-Jitsu", "Russian"]
  },
  {
    "firstname": "Steve",
    "lastname": "Rogers",
    "email": "steve.r@example.com",
    "password": "password123",
    "age": 100,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
    "about": "I can do this all day. Love traditional values and vintage sketches.",
    "skills": ["Leadership", "Drawing", "Boxing"]
  },
  {
    "firstname": "Wanda",
    "lastname": "Maximoff",
    "email": "wanda.m@example.com",
    "password": "password123",
    "age": 28,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    "about": "Reality is what I make of it. I enjoy sitcoms and long walks in the woods.",
    "skills": ["Magic", "Cooking", "Mindfulness"]
  },
  {
    "firstname": "Barry",
    "lastname": "Allen",
    "email": "barry.a@example.com",
    "password": "password123",
    "age": 25,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    "about": "Always running late despite being the fastest man alive. Forensic scientist.",
    "skills": ["Science", "Running", "Math"]
  },
  {
    "firstname": "Iris",
    "lastname": "West",
    "email": "iris.w@example.com",
    "password": "password123",
    "age": 26,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
    "about": "Journalist with a passion for justice. Coffee addict.",
    "skills": ["Reporting", "Social Media", "Podcasting"]
  },
  {
    "firstname": "Arthur",
    "lastname": "Curry",
    "email": "arthur.c@example.com",
    "password": "password123",
    "age": 33,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4",
    "about": "King of the Seven Seas (or just the local beach). I talk to fish.",
    "skills": ["Swimming", "Fishing", "Environmentalism"]
  },
  {
    "firstname": "Mera",
    "lastname": "Xebel",
    "email": "mera.x@example.com",
    "password": "password123",
    "age": 29,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604",
    "about": "Strong-willed and fiercely protective. I love the ocean and ancient history.",
    "skills": ["Hydrokinesis", "History", "Navigation"]
  },
  {
    "firstname": "Victor",
    "lastname": "Stone",
    "email": "victor.s@example.com",
    "password": "password123",
    "age": 24,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
    "about": "Part man, part machine. All about high-speed internet and cyber security.",
    "skills": ["Hacking", "Basketball", "Physics"]
  },
  {
    "firstname": "Harley",
    "lastname": "Quinn",
    "email": "harley.q@example.com",
    "password": "password123",
    "age": 28,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    "about": "Psychologist gone rogue. I like gymnastics, glitter, and chaos.",
    "skills": ["Psychology", "Gymnastics", "Roller Skating"]
  },
  {
    "firstname": "Hal",
    "lastname": "Jordan",
    "email": "hal.j@example.com",
    "password": "password123",
    "age": 31,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1504257432389-52343af06ae3",
    "about": "Test pilot with no fear. I believe in the power of will.",
    "skills": ["Flying", "Astronomy", "Public Speaking"]
  },
  {
    "firstname": "Carol",
    "lastname": "Danvers",
    "email": "carol.d@example.com",
    "password": "password123",
    "age": 35,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    "about": "Higher, further, faster. I've spent more time in space than on Earth.",
    "skills": ["Piloting", "Tactics", "Navigation"]
  },
  {
    "firstname": "Scott",
    "lastname": "Lang",
    "email": "scott.l@example.com",
    "password": "password123",
    "age": 36,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    "about": "World's greatest grandma (according to my trophy). I like heist movies.",
    "skills": ["Engineering", "Magic Tricks", "Lockpicking"]
  },
  {
    "firstname": "Hope",
    "lastname": "Van Dyne",
    "email": "hope.v@example.com",
    "password": "password123",
    "age": 34,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1554151228-14d9def656e4",
    "about": "Strategic and focused. I run a tech empire and look good doing it.",
    "skills": ["Management", "Biology", "Martial Arts"]
  },
  {
    "firstname": "T'Challa",
    "lastname": "Udaku",
    "email": "tchalla.u@example.com",
    "password": "password123",
    "age": 33,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    "about": "Wakanda forever. I enjoy tradition, technology, and cat videos.",
    "skills": ["Diplomacy", "Martial Arts", "Politics"]
  },
  {
    "firstname": "Shuri",
    "lastname": "Udaku",
    "email": "shuri.u@example.com",
    "password": "password123",
    "age": 20,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    "about": "Smarter than my brother. If it's broken, I can fix it. If it's not, I'll make it better.",
    "skills": ["Robotics", "Software", "Innovation"]
  },
  {
    "firstname": "Stephen",
    "lastname": "Strange",
    "email": "stephen.s@example.com",
    "password": "password123",
    "age": 42,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
    "about": "Ex-surgeon. Now I deal with things that don't make sense. Tea?",
    "skills": ["Surgery", "History", "Meditation"]
  },
  {
    "firstname": "Kate",
    "lastname": "Bishop",
    "email": "kate.b@example.com",
    "password": "password123",
    "age": 22,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    "about": "World's greatest archer (self-proclaimed). I'm a bit of a disaster but I mean well.",
    "skills": ["Archery", "Fencing", "Socializing"]
  },
  {
    "firstname": "Matt",
    "lastname": "Murdock",
    "email": "matt.m@example.com",
    "password": "password123",
    "age": 32,
    "gender": "male",
    "photoUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    "about": "Blind lawyer by day. I have very good hearing. Passionate about my neighborhood.",
    "skills": ["Law", "Boxing", "Public Speaking"]
  },
  {
    "firstname": "Jessica",
    "lastname": "Jones",
    "email": "jessica.j@example.com",
    "password": "password123",
    "age": 29,
    "gender": "female",
    "photoUrl": "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df",
    "about": "Private investigator. Leave a message after the beep. Better yet, don't.",
    "skills": ["Investigation", "Strength", "Photography"]
  }
];

connectDB()
    .then(async() => {
        console.log("Database connected successfully");
        const hashedUsers = await Promise.all(
            userData.map(async (user) => ({
                ...user,
                password: await bcrypt.hash(user.password, 10),
            }))
        );
        await UserModel.insertMany(hashedUsers);
        console.log("User data seeded successfully");
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    })
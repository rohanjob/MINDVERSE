# MongoDB sample init script for MindVerse

use mindverse_db

# Create collections
db.createCollection("stories")
db.createCollection("temples")
db.createCollection("stotrams")
db.createCollection("users")

# Insert sample stories
db.stories.insertMany([
    {
        title: "Shiva in Meditation",
        description: "On the snow-clad peaks of Mount Kailash, Lord Shiva sits in eternal meditation...",
        verse: "योगी योगेश्वरो योगः | The Supreme Lord of Yoga in Perfect Union",
        category: "meditation",
        deity: "shiva",
        created_at: new Date()
    },
    {
        title: "The Halahala Sacrifice",
        description: "During the churning of the cosmic ocean, when the deadly halahala poison emerged...",
        verse: "नीलकण्ठाय नमः | Salutations to the Blue-Throated Lord",
        category: "sacrifice",
        deity: "shiva",
        created_at: new Date()
    }
])

# Insert sample temples
db.temples.insertMany([
    {
        name: "Kedarnath",
        location: "Uttarakhand, Himalayas",
        description: "Nestled in the snow-clad Himalayas at 3,583 meters...",
        significance: "One of the Chardham pilgrimage sites",
        deity: "shiva",
        coordinates: {
            latitude: 30.7346,
            longitude: 79.0669
        },
        created_at: new Date()
    },
    {
        name: "Kashi Vishwanath",
        location: "Varanasi, Uttar Pradesh",
        description: "The golden spire of Kashi Vishwanath temple rises majestically...",
        significance: "The most sacred Jyotirlinga",
        deity: "shiva",
        coordinates: {
            latitude: 25.3109,
            longitude: 83.0107
        },
        created_at: new Date()
    }
])

# Insert sample stotrams
db.stotrams.insertMany([
    {
        type: "tandava",
        title: "Shiva Tandava Stotram",
        verses: [
            {
                sanskrit: "जटाटवीगलज्जलप्रवाहपावितस्थले",
                translation: "With the celestial river cascading from the crown of matted hair",
                verse_number: 1
            }
        ],
        deity: "shiva",
        author: "Ravana",
        created_at: new Date()
    },
    {
        type: "bhairava",
        title: "Bhairava Ashtakam",
        verses: [
            {
                sanskrit: "ॐ काल भैरवाय नमः",
                translation: "Om, Salutations to the Fierce Lord of Time",
                verse_number: 1
            }
        ],
        deity: "bhairava",
        created_at: new Date()
    },
    {
        type: "vishnu",
        title: "Maha Vishnu Stotram",
        verses: [
            {
                sanskrit: "ॐ नमो नारायणाय",
                translation: "Om, Salutations to Lord Narayana",
                verse_number: 1
            }
        ],
        deity: "vishnu",
        created_at: new Date()
    }
])

# Create indexes for better performance
db.stories.createIndex({ "deity": 1, "category": 1 })
db.temples.createIndex({ "deity": 1, "location": 1 })
db.temples.createIndex({ "coordinates": "2dsphere" })
db.stotrams.createIndex({ "type": 1, "deity": 1 })
db.users.createIndex({ "email": 1 }, { unique: true })

print("✅ MindVerse MongoDB initialized successfully!")

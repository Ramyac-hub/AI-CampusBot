import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const knowledgeBase = {
  intents: {
    greeting: {
      keywords: ["hi", "hello", "hey", "start", "morning"],
      responses: [
        { type: "text", content: "Hello! I'm your CampusBot AI Assistant. How can I help you today? You can ask me about timetables, syllabus, events, or campus navigation." }
      ]
    },
    timetable: {
      keywords: ["timetable", "schedule", "classes", "routine", "when is"],
      responses: [
        { type: "text", content: "Which year and branch are you in? (e.g., 1st Year CSE, 2nd Year AIML)" },
        { 
          type: "options", 
          content: ["1st Year CSE-A", "2nd Year AIML", "3rd Year DS", "4th Year CSE"] 
        }
      ],
      details: {
        "1st Year CSE-A": {
          weekly: [
            { day: "Monday", classes: [{ time: "09:00", subject: "Math I", room: "101", faculty: "Dr. Smith" }, { time: "11:00", subject: "Physics", room: "102", faculty: "Prof. Jones" }] },
            { day: "Tuesday", classes: [{ time: "09:00", subject: "C Programming", room: "Lab 1", faculty: "Mr. Brown" }] }
          ]
        },
        "2nd Year AIML": {
          weekly: [
            { day: "Monday", classes: [{ time: "09:00", subject: "AI Fundamentals", room: "201", faculty: "Dr. Alice" }, { time: "11:00", subject: "Statistics", room: "202", faculty: "Dr. Bob" }] }
          ]
        }
      }
    },
    syllabus: {
      keywords: ["syllabus", "curriculum", "topics", "learn", "course structure"],
      responses: [
        { type: "text", content: "Which subject do you want?" },
        {
          type: "options",
          content: ["AI", "ML", "DBMS", "Operating Systems", "Web Technology", "R Programming", "Data Structures", "Computer Networks", "Python", "Java"]
        }
      ],
      details: {
        "AI": {
          overview: "Introduction to Artificial Intelligence and its applications.",
          units: [
            { title: "Unit 1: Intro", topics: ["History", "Intelligent Agents"], concepts: ["Search Algorithms", "Logic"] },
            { title: "Unit 2: Machine Learning", topics: ["Supervised", "Unsupervised"], concepts: ["Linear Regression", "Clustering"] }
          ],
          resources: ["Introduction to AI - Russell & Norvig", "Andrew Ng's AI Course"],
          pdf: "/syllabi/ai.pdf"
        },
        "ML": {
          overview: "Deep dive into Machine Learning algorithms and model building.",
          units: [
            { title: "Unit 1: Basics", topics: ["Data Preprocessing", "Feature Scaling"], concepts: ["Overfitting", "Bias-Variance Tradeoff"] }
          ],
          resources: ["Hands-On ML with Scikit-Learn", "Fast.ai Course"]
        }
      }
    },
    events: {
      keywords: ["events", "hackathon", "fest", "club", "upcoming", "activities"],
      responses: [
        { type: "text", content: "There's a lot happening on campus! Filter by category:" },
        {
          type: "options",
          content: ["Technical", "Cultural", "Sports", "Academic"]
        }
      ],
      details: [
        { id: 1, name: "Campus Hackathon 2026", category: "Technical", date: "2026-05-15T09:00:00", venue: "Auditorium", desc: "48-hour coding marathon." },
        { id: 2, name: "Robotics Workshop", category: "Technical", date: "2026-05-10T14:00:00", venue: "Lab 4", desc: "Intro to ROS." },
        { id: 3, name: "Annual Sports Meet", category: "Sports", date: "2026-06-01T08:00:00", venue: "Main Ground", desc: "Track and field events." }
      ]
    },
    navigation: {
      keywords: ["map", "where is", "navigate", "library", "auditorium", "canteen", "location"],
      responses: [
        { type: "text", content: "The main library is located in the North Wing. Here is the campus map:" },
        { type: "image", content: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
      ]
    },
    default: {
      keywords: [],
      responses: [
        { type: "text", content: "I'm not quite sure about that. Try asking about the timetable, syllabus, or upcoming events!" }
      ]
    }
  }
};

app.post('/api/chat', (req, res) => {
  const { query, context } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  const lowerQuery = query.toLowerCase();
  let matchedResponses = knowledgeBase.intents.default.responses;
  let detectedIntent = 'default';

  // Check context-based matching first (e.g. if we just asked for subject)
  if (context === 'awaiting_syllabus_subject') {
    const subject = knowledgeBase.intents.syllabus.content.find(s => lowerQuery.includes(s.toLowerCase()));
    if (subject) {
      matchedResponses = [
        { type: "text", content: `Showing syllabus for ${subject}` },
        { type: "syllabus_detail", content: knowledgeBase.intents.syllabus.details[subject] }
      ];
    }
  }

  for (const [intentName, intentData] of Object.entries(knowledgeBase.intents)) {
    if (intentName === 'default') continue;
    
    const match = intentData.keywords.some(keyword => lowerQuery.includes(keyword));
    if (match) {
      matchedResponses = intentData.responses;
      detectedIntent = intentName;
      break;
    }
  }

  setTimeout(() => {
    res.json({ responses: matchedResponses, intent: detectedIntent });
  }, 400 + Math.random() * 300);
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});

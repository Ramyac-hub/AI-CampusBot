export const knowledgeBase = {
  intents: {
    greeting: {
      keywords: ["hi", "hello", "hey", "start", "morning"],
      responses: [
        { type: "text", content: "Hello! I'm your Nexus College AI Assistant. How can I help you today? You can ask me about timetables, syllabus, events, or campus navigation." }
      ]
    },
    timetable: {
      keywords: ["timetable", "schedule", "classes", "routine", "when is"],
      responses: [
        { type: "text", content: "Here is the standard timetable for the Computer Science department (Semester 4)." },
        { 
          type: "table", 
          content: {
            headers: ["Time", "Monday", "Tuesday", "Wednesday"],
            rows: [
              ["09:00 AM", "Data Structures", "Computer Networks", "DBMS"],
              ["11:00 AM", "Math III", "Data Structures Lab", "OS"],
              ["02:00 PM", "OS Lab", "Math III", "Elective I"]
            ]
          }
        }
      ]
    },
    syllabus: {
      keywords: ["syllabus", "curriculum", "topics", "learn", "course structure"],
      responses: [
        { type: "text", content: "The CS syllabus was recently updated. Here's a quick overview of core subjects:" },
        {
          type: "list",
          content: [
            "CS201: Data Structures and Algorithms",
            "CS202: Database Management Systems",
            "CS203: Operating Systems",
            "CS204: Computer Networks"
          ]
        },
        { type: "text", content: "You can download the full PDF from the student portal." }
      ]
    },
    events: {
      keywords: ["events", "hackathon", "fest", "club", "upcoming", "activities"],
      responses: [
        { type: "text", content: "There's a lot happening on campus! Here are the highlighted events:" },
        {
          type: "cards",
          content: [
            { title: "Nexus Hackathon 2026", date: "May 15", desc: "48-hour coding marathon in the main auditorium." },
            { title: "Robotics Club Meetup", date: "May 10", desc: "Intro to ROS and autonomous navigation." }
          ]
        }
      ]
    },
    navigation: {
      keywords: ["map", "where is", "navigate", "library", "auditorium", "canteen", "location"],
      responses: [
        { type: "text", content: "The main library is located in the North Wing, past the Science Block. Here is a campus map to help you navigate:" },
        { type: "image", content: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
      ]
    },
    default: {
      keywords: [],
      responses: [
        { type: "text", content: "I'm not quite sure about that. Could you try asking about the timetable, syllabus, campus events, or navigating the campus?" }
      ]
    }
  }
};



const resumeData = `
{
    "name": "Vismay Walde",
    "email": "vismaywalde@gmail.com",
    "phone": "+91-7020313689",
    "location": "India",
    "education": [
      {
        "degree": "Bachelor of Technology in Mathematics and Computing",
        "institution": "Indian Institute of Technology (IIT), Ropar",
        "cgpa": "7.15",
        "year": "2022 – Present"
      },
      {
        "degree": "Higher Secondary",
        "institution": "Naik College (Maharashtra Board)",
        "percentage": "80%",
        "year": "2022"
      },
      {
        "degree": "Secondary",
        "institution": "Saint Xaviers School (Maharashtra Board)",
        "percentage": "94.40%",
        "year": "2020"
      }
    ],
    "skills": [
      "Python", "SQL", "JavaScript", "React.js", "Flask", 
      "Node.js", "PostgreSQL", "GitHub", "Bootstrap", "MySQL Workbench"
    ],
    "projects": [
      {
        "title": "File Upload/Download App",
        "description": "Web app to upload/download files to GitHub using HTML, CSS, JavaScript, Node.js, Express.js"
      },
      {
        "title": "Instagram User Analytics",
        "description": "Analyzed user engagement using SQL and MySQL Workbench; extracted insights for marketing and product teams"
      },
      {
        "title": "News Conspiracy Detection System",
        "description": "Full-stack ML web app using Flask, React.js, PostgreSQL; predicted conspiracy scores using NLP & SVM"
      },
      {
        "title": "Operation Analytics & Metric Spike Investigation",
        "description": "Used SQL to analyze job data, detect anomalies and spikes in user engagement and retention"
      },
      {
        "title": "B+ Tree Visualization",
        "description": "Implemented B+ tree in C for insertion, deletion, and search with performance analysis"
      }
    ],
    "experience": [
      {
        "role": "Backend Developer Intern",
        "company": "Dimensionless Technologies",
        "description": "Worked on backend APIs and MongoDB integration"
      },
      {
        "role": "Data Analytics Intern",
        "company": "Trainity",
        "duration": "Sept 2024 – Nov 2024",
        "description": "Worked on real-world data cleaning, pipeline simulation, and analytics using Python, SQL, and Excel"
      },
      {
        "role": "Software Engineering Virtual Intern",
        "company": "J.P. Morgan (Forage)",
        "duration": "Aug 2024",
        "description": "Set up local dev environment, fixed broken files, and visualized data using Perspective library"
      }
    ],
    "certifications": [
      "8 Weeks Data Analytics Specialization Training – Trainity",
      "J.P. Morgan Software Engineering Virtual Experience (Forage)",
      "The Complete Web Development Bootcamp – Dr. Angela Yu (Udemy)",
      "Mastering Data Structures & Algorithms – Abdul Bari (Udemy)"
    ],
    "links": {
      "github": "https://github.com/vismaywalde",
      "linkedin": "https://www.linkedin.com/in/vismay-walde/",
      "portfolio": "https://vismaywalde.github.io/Personal-Website/"
    }
  }
`;
  


  window.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const chatBox = document.getElementById('chatbot-box');

    toggleBtn.addEventListener('click', () => {
      chatBox.classList.toggle('hidden');
    });
  });




  document.getElementById("close-chatbot").addEventListener("click", function () {
    window.location.href = "index.html";
  });



  // Handle chat form submit
  document.getElementById("chat-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const userInput = document.getElementById("user-input").value;
    const chatLog = document.getElementById("chat-log");

    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.textContent = userInput;
    chatLog.appendChild(userMessage);

    const botMessage = document.createElement("div");
    botMessage.className = "bot-message";
    botMessage.textContent = "Thinking...";
    chatLog.appendChild(botMessage);

    document.getElementById("user-input").value = "";

    const botResponse = await generateResponse(userInput);
    botMessage.textContent = botResponse;
  });


async function generateResponse(userInput) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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" // Replace with your Groq key
    },
    body: JSON.stringify({
      model: "gemma2-9b-it", // or try "llama2-70b-4096"
      messages: [
        {
          role: "system",
          content: `You are a helpful chatbot for Vismay Walde’s portfolio. Use only the information from the resumeData below. If the answer isn't directly available, use your best guess based on the data.\n\nResume:\n${resumeData}`
        },
        {
          role: "user",
          content: userInput
        }
      ],
      temperature: 1,
      max_tokens: 1024,
      top_p: 1
    })
  });

  const data = await response.json();
  if (!data.choices || !data.choices[0].message) {
    return "Something went wrong. Please try again.";
  }
  return data.choices[0].message.content.trim();
}

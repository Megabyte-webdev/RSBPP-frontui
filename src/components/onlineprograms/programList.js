const programList = [
  {
    id: 1,
    heading: "Online Management & Communication Programmes",
    items:[{
        title: "Understanding Digital Customer Effectiveness Landscape",
      },
      {
        title: "Big Data and Business Decisions",
      },
      {
        title: "Dealing with Difficult Personalities and Difficult Situations",
      },
      {
        title:
          "Building Personal Credibility: Understanding Different Communication Styles",
      },
      {
        title: "Motivating People for Change",
      },
      {
        title: "Running Effective Meetings",
      },
      {
        title: "Building Confidence",
      },
      {
        title: "Team Building and Partnerships Across Departments",
      },
      {
        title: "Communication Skills for Mediators",
      },
      {
        title: "Crisis Management",
      },
      {
        title: "Presentation Skills",
      },
      {
        title: "Crisis Communication: Managing Complex Issues/Critical Situations",
      },
      {
        title: "Agile Working For Digital Transformation",
      },
      {
        title: "Press Releases, Briefs and Press Conferences",
      },
      {
        title: "B2B Marketing- The Future",
      },
      {
        title: "Basic Principles of Good Procurement",
      },
      {
        title: "Impact Of Digitisation On The Competitive Landscape",
      },
      {
        title: "Managing Across Cultures",
      },
      {
        title: "Lean Start Up",
      },
      {
        title: "Logistics Management",
      },
      {
        title: "Understanding Gender Perspectives In Business",
      }]
  },{
    id: 2,
    heading: "Online Finance Programmes",
    items:[{
        title: "Understanding Digital Customer Effectiveness Landscape",
      },
      {
        title: "Big Data and Business Decisions",
      },
      {
        title: "Dealing with Difficult Personalities and Difficult Situations",
      },
      {
        title:
          "Building Personal Credibility: Understanding Different Communication Styles",
      },
      {
        title: "Motivating People for Change",
      },
      {
        title: "Running Effective Meetings",
      },
      {
        title: "Building Confidence",
      },
      {
        title: "Team Building and Partnerships Across Departments",
      },
      {
        title: "Communication Skills for Mediators",
      },
      {
        title: "Crisis Management",
      },
      {
        title: "Presentation Skills",
      },
      {
        title: "Crisis Communication: Managing Complex Issues/Critical Situations",
      },
      {
        title: "Agile Working For Digital Transformation",
      },
      {
        title: "Press Releases, Briefs and Press Conferences",
      },
      {
        title: "B2B Marketing- The Future",
      },
      {
        title: "Basic Principles of Good Procurement",
      },
      {
        title: "Impact Of Digitisation On The Competitive Landscape",
      },
      {
        title: "Managing Across Cultures",
      },
      {
        title: "Lean Start Up",
      },
      {
        title: "Logistics Management",
      },
      {
        title: "Understanding Gender Perspectives In Business",
      }]
  }
];
programList.map(program=> {
    program.items.map(item=>{
item.href = item.title
  .replace(/[^a-zA-Z0-9\s:]/g, "")
  .replace(/:/g, "")
  .replace(/\s+/g, "-")
  .toLowerCase();
        return item
    })
    return program
    
})
export default programList;

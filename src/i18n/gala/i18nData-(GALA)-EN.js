// en, de, fr, pt
import { PATH_NAMES } from '@/assets/data/alex';
export default {
  myPath: "My Path",
  myPathDesc: "MyPath brings you an exciting new way to learn & grow",
  myLibrary: "My Library",
  competencyReportModalTitle: "Competency Report",
  startLibraryCourse: "Launch Course",
  startLibraryTest: "Launch Test",
  mySuggestions: "My Suggestions",
  mySuggestionsDesc: `Got something interesting to share with everyone? Add it to the {orgName} box of knowledge`,
  mySuggestionsSubmit: "Submit a Training Item",
  pathNames: {
    [PATH_NAMES.PROFILE]: {
      heading: "My Profile",
      shortDescription: `My {orgName} Character Sheet`,
      longDescription: "Share your qualifications, career history and interest."
    },
    [PATH_NAMES.ASSESSMENT]: {
      heading: "My Mirror",
      shortDescription: "Manage Self Assessment",
      longDescription: "to update my skills as how I see myself."
    },
    [PATH_NAMES.FEEDBACK]: {
      heading: "My Feedback",
      shortDescription: "Manage my advisor list",
      longDescription: "to know how other people see me."
    },
    [PATH_NAMES.COMPETENCIES]: {
      heading: "My Competencies",
      shortDescription: "View Strength Profile",
      longDescription: "Skill report to view clear strengths and possible blind spots.",
    },
    [PATH_NAMES.PREFERENCES]: {
      heading: "My Preferences",
      shortDescription: "ALEX is your Adaptive Learning EXperience Manager",
      longDescription: `That understands and optimizes your learning needs
            and keeps curating your learning calendar. Many people at {orgName} have started their development journey, update your
            profile including your self-assessment, to activate ALEX
            Bot`
    },
    [PATH_NAMES.SITUATIONS]: {
      heading: "My Situations",
      shortDescription: "Compare to a career challenge",
      longDescription: "Solve hurdles on the way and manage career situations."
    },
    [PATH_NAMES.JOURNEY]: {
      heading: "My Plan",
      shortDescription: "Get development advice",
      longDescription: "choose directions to readjust yourself on your journey to re-evaluate your plans"
    }
  }
}

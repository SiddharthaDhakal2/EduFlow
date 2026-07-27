export type LessonType = "Text" | "Video" | "Text and Video";

export type CourseLesson = {
  title: string;
  type: LessonType;
  textContent?: string;
  videoTitle?: string;
};

export type Course = {
  slug: string;
  title: string;
  category: string;
  instructor: string;
  difficulty: string;
  duration: string;
  lessons: number;
  access: "Free" | "Paid";
  image: string;
  description: string;
  lessonItems: CourseLesson[];
};

export const courses: Course[] = [
  {
    slug: "complete-web-development-bootcamp-2026",
    title: "Complete Web Development Bootcamp 2026",
    category: "Web Development",
    instructor: "Sarah Johnson",
    difficulty: "Beginner",
    duration: "12 hours",
    lessons: 5,
    access: "Free",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    description:
      "Master modern web development with HTML, CSS, JavaScript, React, Node.js, and projects.",
    lessonItems: [
      {
        title: "Welcome and Setup",
        type: "Text and Video",
        videoTitle: "Course introduction video",
        textContent: "Set up your editor, browser tools, and project folder before starting the lessons.",
      },
      {
        title: "HTML and Page Structure",
        type: "Text",
        textContent: "Learn semantic HTML, page sections, links, images, and reusable content structure.",
      },
      {
        title: "CSS Layout Basics",
        type: "Video",
        videoTitle: "Flexbox and grid walkthrough",
      },
      {
        title: "JavaScript Fundamentals",
        type: "Text and Video",
        videoTitle: "Variables, functions, and events",
        textContent: "Practice DOM selection, events, functions, and simple interactive behavior.",
      },
      {
        title: "Final Portfolio Project",
        type: "Text",
        textContent: "Build a responsive portfolio page using the skills from the full course.",
      },
    ],
  },
  {
    slug: "react-native-build-mobile-apps",
    title: "React Native - Build Mobile Apps",
    category: "App Development",
    instructor: "Michael Chen",
    difficulty: "Intermediate",
    duration: "10 hours",
    lessons: 4,
    access: "Free",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    description:
      "Build cross-platform mobile applications using React Native for iOS and Android.",
    lessonItems: [
      {
        title: "React Native Project Setup",
        type: "Text and Video",
        videoTitle: "Installing tooling and running the app",
        textContent: "Prepare the emulator, install dependencies, and understand the project structure.",
      },
      {
        title: "Screens and Navigation",
        type: "Video",
        videoTitle: "Stack and tab navigation demo",
      },
      {
        title: "Reusable Mobile Components",
        type: "Text",
        textContent: "Create buttons, cards, forms, and lists that work across screen sizes.",
      },
      {
        title: "Build and Test the App",
        type: "Text and Video",
        videoTitle: "Final app testing flow",
        textContent: "Review app behavior, fix layout issues, and prepare a release-ready build.",
      },
    ],
  },
  {
    slug: "python-for-data-science-machine-learning",
    title: "Python for Data Science & Machine Learning",
    category: "Python",
    instructor: "Dr. Emily Watson",
    difficulty: "Intermediate",
    duration: "14 hours",
    lessons: 4,
    access: "Paid",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
    description:
      "Learn Python for data analysis, visualization, notebooks, and machine learning practice.",
    lessonItems: [
      {
        title: "Python Data Workflow",
        type: "Text",
        textContent: "Understand notebooks, data files, packages, and project organization.",
      },
      {
        title: "Data Cleaning with Pandas",
        type: "Text and Video",
        videoTitle: "Cleaning real CSV data",
        textContent: "Handle missing data, data types, filtering, sorting, and grouped summaries.",
      },
      {
        title: "Charts and Visual Analysis",
        type: "Video",
        videoTitle: "Visualizing trends with Python",
      },
      {
        title: "Machine Learning Practice",
        type: "Text",
        textContent: "Train a basic model, evaluate results, and understand prediction workflow.",
      },
    ],
  },
  {
    slug: "java-programming-masterclass",
    title: "Java Programming Masterclass",
    category: "Java",
    instructor: "David Kumar",
    difficulty: "Beginner",
    duration: "11 hours",
    lessons: 4,
    access: "Paid",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
    description:
      "Learn Java fundamentals, OOP, collections, and application development.",
    lessonItems: [
      {
        title: "Java Setup and Syntax",
        type: "Text and Video",
        videoTitle: "Installing JDK and running your first program",
        textContent: "Learn class structure, main methods, variables, and basic output.",
      },
      {
        title: "Object-Oriented Programming",
        type: "Text",
        textContent: "Understand classes, objects, inheritance, methods, and encapsulation.",
      },
      {
        title: "Collections and Data Handling",
        type: "Video",
        videoTitle: "Lists, maps, and common collection patterns",
      },
      {
        title: "Build a Java Console App",
        type: "Text",
        textContent: "Create a small application that uses OOP and collections together.",
      },
    ],
  },
  {
    slug: "advanced-javascript-typescript",
    title: "Advanced JavaScript & TypeScript",
    category: "Web Development",
    instructor: "Alex Martinez",
    difficulty: "Advanced",
    duration: "8 hours",
    lessons: 3,
    access: "Paid",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80",
    description:
      "Deep dive into TypeScript, design patterns, and production JavaScript tooling.",
    lessonItems: [
      {
        title: "Advanced JavaScript Patterns",
        type: "Text and Video",
        videoTitle: "Closures, modules, and async flow",
        textContent: "Review production patterns used in large JavaScript applications.",
      },
      {
        title: "TypeScript Types in Practice",
        type: "Text",
        textContent: "Use interfaces, unions, generics, and narrowing to write safer code.",
      },
      {
        title: "Production Tooling",
        type: "Video",
        videoTitle: "Linting, formatting, bundling, and project checks",
      },
    ],
  },
  {
    slug: "flutter-app-development",
    title: "Flutter App Development",
    category: "App Development",
    instructor: "Lisa Park",
    difficulty: "Beginner",
    duration: "9 hours",
    lessons: 3,
    access: "Paid",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80",
    description:
      "Build native mobile apps with Flutter and Dart from a single codebase.",
    lessonItems: [
      {
        title: "Flutter and Dart Setup",
        type: "Text",
        textContent: "Install Flutter, create your first app, and understand widgets.",
      },
      {
        title: "Layouts and Navigation",
        type: "Text and Video",
        videoTitle: "Building screens with Flutter widgets",
        textContent: "Use rows, columns, stacks, routing, and responsive layout patterns.",
      },
      {
        title: "Final Mobile App",
        type: "Video",
        videoTitle: "Building and previewing the final app",
      },
    ],
  },
];

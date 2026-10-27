export const initialCourses = [
  { id: "dbms", name: "Database Management Systems", code: "DBMS", semester: 3, progress: 72, color: "purple", materials: 3 },
  { id: "dsa", name: "Data Structures", code: "DSA", semester: 3, progress: 45, color: "green", materials: 2 },
  { id: "pps", name: "Programming for Problem Solving", code: "PPS", semester: 3, progress: 60, color: "blue", materials: 4 },
  { id: "math", name: "Discrete Mathematics", code: "MATH", semester: 3, progress: 30, color: "orange", materials: 1 }
];

export const initialTasks = [
  { id: "t1", title: "Review DBMS normalization notes", description: "Revise 1NF, 2NF, 3NF and BCNF", completed: true, courseId: "dbms" },
  { id: "t2", title: "Finish linked-list practice", description: "Solve five practice questions", completed: false, courseId: "dsa" },
  { id: "t3", title: "Revise C pointers", description: "Pointers, arrays and memory", completed: false, courseId: "pps" },
  { id: "t4", title: "Read graph theory chapter", description: "Discrete Mathematics", completed: false, courseId: "math" }
];

export const initialMaterials = [
  { id: "m1", name: "DBMS_Unit_1_Notes.pdf", subject: "DBMS", size: 2457600, type: "PDF", addedAt: "Sample material" },
  { id: "m2", name: "Linked_Lists_Revision.pdf", subject: "DSA", size: 1126400, type: "PDF", addedAt: "Sample material" }
];

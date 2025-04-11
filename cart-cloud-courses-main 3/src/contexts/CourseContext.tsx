
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  image: string;
  category: string;
  duration: string;
}

export interface UserCourse extends Course {
  enrolled: string;
  progress: number;
  notes?: string;
}

interface CourseContextType {
  availableCourses: Course[];
  myCourses: UserCourse[];
  addCourse: (courseId: string) => void;
  removeCourse: (courseId: string) => void;
  updateCourse: (courseId: string, updates: Partial<UserCourse>) => void;
  isEnrolled: (courseId: string) => boolean;
  getCourse: (courseId: string) => Course | undefined;
  createCourse: (courseData: Omit<Course, "id">) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

// Mock course data
const INITIAL_COURSES: Course[] = [
  {
    id: "1",
    title: "Introduction to JavaScript",
    description: "Learn the basics of JavaScript programming language.",
    instructor: "John Doe",
    price: 2499,
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500&auto=format&fit=crop",
    category: "Programming",
    duration: "8 weeks",
  },
  {
    id: "2",
    title: "React for Beginners",
    description: "Get started with React library and build your first web app.",
    instructor: "Jane Smith",
    price: 3999,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop",
    category: "Web Development",
    duration: "10 weeks",
  },
  {
    id: "3",
    title: "Advanced Python Programming",
    description: "Take your Python skills to the next level with advanced concepts.",
    instructor: "David Wilson",
    price: 2999,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500&auto=format&fit=crop",
    category: "Programming",
    duration: "12 weeks",
  },
  {
    id: "4",
    title: "Data Science Fundamentals",
    description: "Learn the basics of data science and analytics.",
    instructor: "Sarah Johnson",
    price: 4999,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop",
    category: "Data Science",
    duration: "14 weeks",
  },
  {
    id: "5",
    title: "UI/UX Design Principles",
    description: "Master the art of designing beautiful and functional user interfaces.",
    instructor: "Michael Brown",
    price: 3499,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&auto=format&fit=crop",
    category: "Design",
    duration: "8 weeks",
  },
  {
    id: "6",
    title: "Cloud Computing with AWS",
    description: "Learn to deploy and manage applications on Amazon Web Services.",
    instructor: "Robert Martinez",
    price: 4499,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&auto=format&fit=crop",
    category: "Cloud Computing",
    duration: "10 weeks",
  },
];

export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const [availableCourses, setAvailableCourses] = useState<Course[]>(INITIAL_COURSES);
  const [myCourses, setMyCourses] = useState<UserCourse[]>([]);

  // Load user courses from localStorage on mount or when auth state changes
  useEffect(() => {
    if (isAuthenticated) {
      const storedCourses = localStorage.getItem("myCourses");
      if (storedCourses) {
        setMyCourses(JSON.parse(storedCourses));
      }
    } else {
      setMyCourses([]);
    }
    
    // Load available courses from localStorage
    const storedAvailableCourses = localStorage.getItem("availableCourses");
    if (storedAvailableCourses) {
      setAvailableCourses(JSON.parse(storedAvailableCourses));
    } else {
      // Initialize localStorage with default courses if not present
      localStorage.setItem("availableCourses", JSON.stringify(INITIAL_COURSES));
    }
  }, [isAuthenticated]);

  // Save courses to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && myCourses.length > 0) {
      localStorage.setItem("myCourses", JSON.stringify(myCourses));
    }
  }, [myCourses, isAuthenticated]);

  // Save available courses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("availableCourses", JSON.stringify(availableCourses));
  }, [availableCourses]);

  const getCourse = (courseId: string): Course | undefined => {
    return availableCourses.find((course) => course.id === courseId);
  };

  const isEnrolled = (courseId: string): boolean => {
    return myCourses.some((course) => course.id === courseId);
  };

  const addCourse = (courseId: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to enroll in courses");
      return;
    }

    if (isEnrolled(courseId)) {
      toast.info("You are already enrolled in this course");
      return;
    }

    const course = getCourse(courseId);
    if (!course) {
      toast.error("Course not found");
      return;
    }

    const userCourse: UserCourse = {
      ...course,
      enrolled: new Date().toISOString(),
      progress: 0,
    };

    setMyCourses((prev) => [...prev, userCourse]);
    toast.success(`Enrolled in ${course.title}`);
  };

  const removeCourse = (courseId: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to manage your courses");
      return;
    }

    if (!isEnrolled(courseId)) {
      toast.error("You are not enrolled in this course");
      return;
    }

    setMyCourses((prev) => prev.filter((course) => course.id !== courseId));
    toast.success("Course removed from your list");
  };

  const updateCourse = (courseId: string, updates: Partial<UserCourse>) => {
    if (!isAuthenticated) {
      toast.error("Please log in to update course details");
      return;
    }

    if (!isEnrolled(courseId)) {
      toast.error("You are not enrolled in this course");
      return;
    }

    setMyCourses((prev) =>
      prev.map((course) =>
        course.id === courseId ? { ...course, ...updates } : course
      )
    );
    toast.success("Course updated successfully");
  };

  const createCourse = (courseData: Omit<Course, "id">) => {
    const newCourse: Course = {
      ...courseData,
      id: Math.random().toString(36).substring(2, 11),
    };
    
    setAvailableCourses((prev) => [...prev, newCourse]);
    toast.success(`Course "${courseData.title}" added successfully`);
  };

  const value = {
    availableCourses,
    myCourses,
    addCourse,
    removeCourse,
    updateCourse,
    isEnrolled,
    getCourse,
    createCourse,
  };

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
};

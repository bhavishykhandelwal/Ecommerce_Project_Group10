
import CourseCard from "./CourseCard";
import { useCourses } from "@/contexts/CourseContext";
import { Course, UserCourse } from "@/contexts/CourseContext";

interface CourseGridProps {
  courses: Course[] | UserCourse[];
  showEnrolled?: boolean;
}

const CourseGrid = ({ courses, showEnrolled = false }: CourseGridProps) => {
  const { isEnrolled } = useCourses();

  return (
    <div className="course-grid">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          isEnrolled={showEnrolled ? true : isEnrolled(course.id)}
        />
      ))}
    </div>
  );
};

export default CourseGrid;

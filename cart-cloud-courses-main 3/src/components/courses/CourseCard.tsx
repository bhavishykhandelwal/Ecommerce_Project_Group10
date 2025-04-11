
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Course } from "@/contexts/CourseContext";
import { Check, Clock } from "lucide-react";
import { useCourses } from "@/contexts/CourseContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
}

const CourseCard = ({ course, isEnrolled = false }: CourseCardProps) => {
  const { addCourse } = useCourses();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to enroll in courses");
      navigate("/login");
      return;
    }
    addCourse(course.id);
  };

  const handleViewCourse = () => {
    navigate(`/my-courses/${course.id}`);
  };

  return (
    <Card className="overflow-hidden card-hover-effect h-full flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <div className="absolute top-2 right-2 bg-white/90 text-xs font-medium py-1 px-2 rounded-full">
          {course.category}
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{course.title}</CardTitle>
        <CardDescription className="flex items-center text-sm">
          <Clock className="h-3.5 w-3.5 mr-1" /> {course.duration}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-slate-700 mb-2">{course.description}</p>
        <p className="text-sm font-medium">Instructor: {course.instructor}</p>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-primary font-semibold">₹{course.price}</div>
        {isEnrolled ? (
          <Button onClick={handleViewCourse}>
            <Check className="h-4 w-4 mr-2" /> View Course
          </Button>
        ) : (
          <Button onClick={handleEnroll}>Enroll Now</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;

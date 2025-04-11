
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourses, UserCourse } from "@/contexts/CourseContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Calendar, Clock, Edit, Save, Trash, UserCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { myCourses, removeCourse, updateCourse } = useCourses();
  const navigate = useNavigate();
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  if (!courseId) {
    navigate("/my-courses");
    return null;
  }

  const course = myCourses.find((c) => c.id === courseId);

  if (!course) {
    navigate("/my-courses");
    return null;
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const startEditingNotes = () => {
    setNotes(course.notes || "");
    setIsEditingNotes(true);
  };

  const saveNotes = () => {
    updateCourse(courseId, { notes });
    setIsEditingNotes(false);
    toast.success("Notes saved successfully");
  };

  const handleRemoveCourse = () => {
    removeCourse(courseId);
    navigate("/my-courses");
    toast.success("Course removed from your list");
  };

  const updateProgress = (newProgress: number) => {
    updateCourse(courseId, { progress: newProgress });
    toast.success(`Progress updated to ${newProgress}%`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/my-courses")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to My Courses
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{course.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {course.category}
                  </CardDescription>
                </div>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash className="h-4 w-4 mr-2" /> Remove
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Remove Course</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to remove this course from your list? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpenDialog(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleRemoveCourse}>
                        Remove
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700">{course.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <UserCircle className="h-5 w-5 text-slate-500 mr-2" />
                  <span className="text-sm">
                    Instructor: <span className="font-medium">{course.instructor}</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-slate-500 mr-2" />
                  <span className="text-sm">
                    Duration: <span className="font-medium">{course.duration}</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-slate-500 mr-2" />
                  <span className="text-sm">
                    Enrolled: <span className="font-medium">{formatDate(course.enrolled)}</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm">
                    Price: <span className="font-medium">₹{course.price}</span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">My Notes</CardTitle>
                {!isEditingNotes ? (
                  <Button variant="outline" size="sm" onClick={startEditingNotes}>
                    <Edit className="h-4 w-4 mr-2" /> Edit Notes
                  </Button>
                ) : (
                  <Button size="sm" onClick={saveNotes}>
                    <Save className="h-4 w-4 mr-2" /> Save
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isEditingNotes ? (
                <Textarea
                  value={notes}
                  onChange={handleNotesChange}
                  placeholder="Add your notes about this course..."
                  className="min-h-[150px]"
                />
              ) : (
                <div className="min-h-[150px] p-3 border rounded-md bg-slate-50">
                  {course.notes ? (
                    <p className="text-slate-700 whitespace-pre-wrap">{course.notes}</p>
                  ) : (
                    <p className="text-slate-500 italic">No notes yet. Click 'Edit Notes' to add some.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <div className="text-center font-medium">
                {course.progress}% Complete
              </div>

              <div className="space-y-3 pt-4">
                <p className="text-sm text-slate-700">Update progress:</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateProgress(25)}
                    disabled={course.progress >= 25}
                  >
                    25%
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateProgress(50)}
                    disabled={course.progress >= 50}
                  >
                    50%
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateProgress(75)}
                    disabled={course.progress >= 75}
                  >
                    75%
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateProgress(100)}
                    disabled={course.progress >= 100}
                  >
                    100%
                  </Button>
                </div>

                <div className="pt-2">
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    value={course.progress}
                    onChange={(e) => updateProgress(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;


import { useState } from "react";
import { useCourses } from "@/contexts/CourseContext";
import CourseGrid from "@/components/courses/CourseGrid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const MyCoursesPage = () => {
  const { myCourses } = useCourses();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter courses based on search term
  const filteredCourses = myCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort courses by progress
  const inProgressCourses = filteredCourses.filter((course) => course.progress > 0 && course.progress < 100);
  const notStartedCourses = filteredCourses.filter((course) => course.progress === 0);
  const completedCourses = filteredCourses.filter((course) => course.progress === 100);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-slate-600">
          Manage and track your enrolled courses here.
        </p>
      </div>

      <div className="max-w-md">
        <Label htmlFor="search" className="mb-1.5 block">Search My Courses</Label>
        <div className="relative">
          <Input
            id="search"
            type="text"
            placeholder="Search by title, description, or instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        </div>
      </div>

      {myCourses.length > 0 ? (
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All ({filteredCourses.length})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress ({inProgressCourses.length})</TabsTrigger>
            <TabsTrigger value="not-started">Not Started ({notStartedCourses.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedCourses.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            {filteredCourses.length > 0 ? (
              <CourseGrid courses={filteredCourses} showEnrolled />
            ) : (
              <div className="text-center py-12 border rounded-lg bg-slate-50">
                <p className="text-lg text-slate-600">No courses match your search.</p>
                <p className="text-slate-500">Try adjusting your search criteria.</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="in-progress" className="mt-6">
            {inProgressCourses.length > 0 ? (
              <CourseGrid courses={inProgressCourses} showEnrolled />
            ) : (
              <div className="text-center py-12 border rounded-lg bg-slate-50">
                <p className="text-lg text-slate-600">No courses in progress.</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="not-started" className="mt-6">
            {notStartedCourses.length > 0 ? (
              <CourseGrid courses={notStartedCourses} showEnrolled />
            ) : (
              <div className="text-center py-12 border rounded-lg bg-slate-50">
                <p className="text-lg text-slate-600">No courses not started.</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            {completedCourses.length > 0 ? (
              <CourseGrid courses={completedCourses} showEnrolled />
            ) : (
              <div className="text-center py-12 border rounded-lg bg-slate-50">
                <p className="text-lg text-slate-600">No completed courses yet.</p>
                <p className="text-slate-500">Keep learning to complete your courses!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-slate-50">
          <p className="text-lg font-medium mb-2">You haven't enrolled in any courses yet</p>
          <p className="text-slate-600 mb-6">Browse our catalog and enroll in courses to get started.</p>
          <a href="/courses" className="text-primary font-medium hover:underline">
            Browse Available Courses
          </a>
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;

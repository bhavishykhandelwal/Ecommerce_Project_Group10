
import { useState } from "react";
import { useCourses } from "@/contexts/CourseContext";
import CourseGrid from "@/components/courses/CourseGrid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const CoursesPage = () => {
  const { availableCourses } = useCourses();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Extract unique categories
  const categories = ["all", ...new Set(availableCourses.map((course) => course.category))];

  // Filter courses based on search term and category
  const filteredCourses = availableCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Available Courses</h1>
        <p className="text-slate-600">
          Browse our full catalog of courses and enroll in the ones that interest you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 order-2 md:order-1">
          {filteredCourses.length > 0 ? (
            <CourseGrid courses={filteredCourses} />
          ) : (
            <div className="text-center py-12 border rounded-lg bg-slate-50">
              <p className="text-lg text-slate-600">No courses match your filters.</p>
              <p className="text-slate-500">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg border shadow-sm order-1 md:order-2">
          <h2 className="font-semibold mb-4">Filter Courses</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="search" className="mb-1.5 block">Search</Label>
              <div className="relative">
                <Input
                  id="search"
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>
            <div>
              <Label htmlFor="category" className="mb-1.5 block">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;

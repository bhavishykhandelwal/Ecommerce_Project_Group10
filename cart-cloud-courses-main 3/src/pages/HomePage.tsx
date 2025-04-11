
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, GraduationCap, Layers, Users } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-24 bg-gradient-to-r from-brand-600 to-brand-500 text-white rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=2070')] bg-cover opacity-10"></div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Expand Your Knowledge with CourseCloud
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Access a wide range of courses to enhance your skills and advance your career.
              Learn at your own pace and track your progress.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-white text-brand-600 hover:bg-white/90"
                onClick={() => navigate("/courses")}
              >
                Browse Courses
              </Button>
              {!isAuthenticated && (
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white/10"
                  onClick={() => navigate("/signup")}
                >
                  Create Account
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose CourseCloud</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-slate-600">
                Learn from industry professionals with real-world experience.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Layers className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Diverse Courses</h3>
              <p className="text-slate-600">
                From programming to design, find courses that match your interests.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Self-Paced Learning</h3>
              <p className="text-slate-600">
                Learn on your own schedule, tracking progress as you go.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-slate-600">
                Connect with fellow learners and share your knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-100 py-16 rounded-xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already enhancing their skills and knowledge with CourseCloud.
          </p>
          <Button
            size="lg"
            onClick={() => navigate(isAuthenticated ? "/courses" : "/signup")}
          >
            {isAuthenticated ? "Browse Courses" : "Get Started for Free"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

import { CourseData, decodeCourse } from "./decodeCourse";

export type CoursesData = {
  courses: CourseData[];
};

export function decodeCourses(data: any): CoursesData {
  const courseItems = data ? data.courses.data : [];
  const courses = courseItems.map((course: any) => decodeCourse(course));

  return {
    courses,
  };
}

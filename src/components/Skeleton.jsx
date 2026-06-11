import React from 'react';

// Reusable basic box shimmer helper
export const Skeleton = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded ${className}`} />
  );
};

// Course Card Shimmer Placeholder
export const CourseCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-brand-darkGray border border-gray-200/50 dark:border-gray-800/50 rounded-3xl overflow-hidden p-6 space-y-4">
      <Skeleton className="h-40 w-full rounded-2xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  );
};

// Blog Card Shimmer Placeholder
export const BlogCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-brand-darkGray border border-gray-200/50 dark:border-gray-800/80 rounded-3xl overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-5 w-5/6" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
};

// Stat Tile Shimmer Placeholder
export const StatCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-brand-darkGray p-6 rounded-2xl border border-gray-150/50 dark:border-gray-800/80 flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
      <div className="space-y-2 flex-grow">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    </div>
  );
};

// Teacher/Instructor Card Shimmer Placeholder
export const TeacherCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-brand-darkGray border border-gray-200/50 dark:border-gray-800/50 p-6 rounded-3xl flex flex-col items-center text-center space-y-4">
      <Skeleton className="h-28 w-28 rounded-full" />
      <div className="space-y-2 w-full flex flex-col items-center">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-3.5 w-1/3" />
      </div>
      <Skeleton className="h-12 w-5/6" />
      <div className="flex gap-2 justify-center w-full">
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-20 rounded-md" />
      </div>
    </div>
  );
};

// Testimonial Card Shimmer Placeholder
export const TestimonialCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-brand-darkGray border border-gray-200/50 dark:border-gray-800/50 p-8 rounded-3xl space-y-4 flex flex-col justify-between h-48">
      <div className="space-y-3">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-5/6" />
      </div>
      <div className="flex items-center space-x-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1.5 flex-grow">
          <Skeleton className="h-3.5 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
    </div>
  );
};

// Table Shimmer Placeholder
export const TableSkeleton = () => {
  return (
    <div className="bg-white dark:bg-brand-darkGray rounded-3xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden p-6 space-y-4">
      <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex justify-between items-center py-2.5">
            <div className="space-y-1.5 flex-grow">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/5" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

// Profile / Settings / Form Panel Shimmer
export const ProfileSkeleton = () => {
  return (
    <div className="bg-white dark:bg-brand-darkGray p-8 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 space-y-6">
      <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-gray-100 dark:border-gray-800">
        <Skeleton className="h-20 w-20 rounded-2xl" />
        <div className="space-y-2 flex-grow w-full md:w-auto">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-3.5 w-1/4" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-4">
        <Skeleton className="h-10 w-28 rounded-full" />
      </div>
    </div>
  );
};

// Course Viewer Split Layout Shimmer
export const CourseViewerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Video Content Panel */}
      <div className="lg:col-span-8 space-y-6">
        <Skeleton className="w-full aspect-video rounded-3xl" />
        <div className="space-y-3">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      {/* Sidebar Lesson list */}
      <div className="lg:col-span-4 bg-white dark:bg-brand-darkGray p-6 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 space-y-4">
        <Skeleton className="h-6 w-1/2" />
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
};

// Hero Block Shimmer (For Home Page)
export const HeroSkeleton = () => {
  return (
    <div className="space-y-12 py-16">
      <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
        <Skeleton className="h-6 w-40 rounded-full" />
        <Skeleton className="h-14 w-3/4 rounded-xl" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-12 w-32 rounded-full" />
          <Skeleton className="h-12 w-32 rounded-full animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-3xl" />
        ))}
      </div>
    </div>
  );
};

// Generic Document Text blocks (About, Contact, Spoken, Policy pages)
export const GenericPageSkeleton = () => {
  return (
    <div className="space-y-10 py-8">
      <div className="space-y-3 max-w-2xl mx-auto text-center">
        <Skeleton className="h-8 w-2/3 mx-auto" />
        <Skeleton className="h-4 w-5/6 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-8">
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-56 w-full rounded-3xl" />
      </div>
    </div>
  );
};

export default Skeleton;

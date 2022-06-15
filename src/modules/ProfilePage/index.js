import React from 'react';
import { getUserProfile } from 'src/utils/clientCache';

import StudentProfile from './StudentProfile';
import TeacherProfile from './TeacherProfile';

const ProfilePage = () => {
  const user = getUserProfile();
  const isTeacher = user?.profile?.role === 'TEACHER';

  return isTeacher ? <TeacherProfile /> : <StudentProfile />;
};

export default ProfilePage;

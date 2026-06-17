import { Navigate } from 'react-router-dom';

/** 이전 /curriculum URL 호환 */
export default function CurriculumPage() {
  return <Navigate to="/workshop/curriculum" replace />;
}

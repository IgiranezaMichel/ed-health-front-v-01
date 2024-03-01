import { useParams } from 'react-router-dom'
import { Navigation } from '../../../components/default/Navigation';
import { HospitalMenu } from '../../../MenuBarItems/HospitalMenu';

export const TrainingApplicant=()=>{
 const {trainingId}=useParams();
  return (
    <Navigation items={HospitalMenu}>
      <div>
        {trainingId}
      </div>
    </Navigation>
  )
}

import Hero from './Hero'
import ProgramPreview from './ProgramPreview'
import {useParams} from 'react-router-dom' 
const Programme = ()=>{
    const {program} = useParams();
    return (
<Hero programme={true} title={program} />
<ProgramPreview />

)

}
export default Programme
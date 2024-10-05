import Hero from './Hero'
import {useParams} from 'react-router-dom' 
const Programme = ()=>{
    const {program} = useParams();
    return (
<Hero programme={true} title={program} />

)

}
export default Programme
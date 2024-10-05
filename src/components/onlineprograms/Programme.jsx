import Hero from './Hero'
import {useParams} from 'react-router-dom' 
const Programme = ()=>{
    const {programme} = useParams()
    return (
<Hero programme={true} title={programme} />

)

}
export default Programme
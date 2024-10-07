import { useEffect, useState } from 'react';
import Hero from './Hero'
import ProgramPreview from './ProgramPreview'
import {useParams} from 'react-router-dom' 
import programList from './programList';
const Programme = ()=>{
    const {program} = useParams();
    const [programInfo, setProgramInfo]= useState({});
    useEffect(() => {
    if(program){
    let {items}=programList.find(el=>el.items.find(item=> item.href === program));
    setProgramInfo(items.find(item=> item.href === program))
}
}, [program]);
console.log(programInfo)
    
    window.scrollTo(0,0);
    return (
<>
<Hero programme={true} title={programInfo.title} />
<ProgramPreview />
</>
)

}
export default Programme
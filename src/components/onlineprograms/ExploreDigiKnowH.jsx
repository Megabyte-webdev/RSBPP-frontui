import DigiImg from '../../assets/digiknow.jpg'

const ExploreDigiKnowH =()=>{

return(
<div className='flex flex-col md:flex-row md: justify-between items-center gap-4 p-[5%]'>
{/* Left side*/}
<div className=''>
<div>
<p className='text-xl md:text-2xl font-medium'>“ Specially designed for those who are willing to undertake a journey into the digital space.”</p>
<p className='text-sm md:text-xl text-gray-700 my-2' >This programme is tailored for people who are curious and open to learning about digital technologies, tools, and practices.</p>
<p className='text-sm md:text-xl text-gray-700 my-2'>It welcomes beginners, enthusiasts, and anyone eager to enhance their digital literacy.</p>
<p className='text-sm md:text-xl text-gray-700 my-2'>This journey involves discovering various aspects of the digital world, such as online platforms, software, and digital communication.</p>
</div>
<div className='p-4 bg-gray-200 text-gray-600'>
<p className='text-xl md:text-2xl font-medium text-black'> Exploration and Learning:
</p>
<p>Participants will explore topics like coding, data analytics, digital marketing, cyber security, and more.<br />

They’ll gain practical skills and theoretical knowledge to navigate the digital landscape effectively, and prepares them for the future in-demand skills relevant as technology evolves.
<br />
Participants in any of our digital learning courses can expect to develop competencies related to digital literacy, problem solving, adaptability, and collaboration.
<br />
These skills are essential for success in various industries, from business to creative fields.
<br />
Overall, the DigiKnowH programme promises an engaging and enriching experience for those eager to embrace the digital age.</p>
</div>
</div>
{/* Right side*/}
<div>
<img src={DigiImg} alt=""/>
<h3 className='my-3 text-2xl md:text-3xl font-medium'>Digital Skills Programme ( DigiknowH)</h3>

</div>

</div>

)
}

export default ExploreDigiKnowH;
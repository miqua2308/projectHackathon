import Member1 from '/public/TeamMember1.png';
import Member2 from '/public/TeamMember2.jpg';
import Member3 from '/public/TeamMember3.jpg';
import Member4 from '/public/TeamMember4.jpg';
import Member5 from '/public/TeamMember5.jpg';

const teamMembers = [
  {
    name: 'Gia Huy',
    role: 'Backend Developer',
    image: Member1,
    bio: "Gia Huy is a skilled backend developer with a passion for building robust and scalable applications. With expertise in Node.js and database management, he ensures that the server-side logic runs smoothly and efficiently."
  },
  {
    name: 'Minh Quan',
    role: 'Backend Developer & Database Administrator',
    image: Member2,
    bio: "Minh Quan is a versatile backend developer and database administrator. He specializes in optimizing database performance and ensuring data integrity, making him a key player in the team's success."
  },
  {
    name: 'Anh Khoa',
    role: 'PO & Frontend Developer',
    image: Member3,
    bio: "Anh Khoa is the Product Owner and a frontend developer. He bridges the gap between the technical team and stakeholders, ensuring that the product meets user needs while also contributing to the frontend development with his design skills."
  },
  {
    name: 'Cong Vinh',
    role: 'Frontend Developer',
    image: Member4,
    bio: "Cong Vinh is a frontend developer with a keen eye for design and user experience. He focuses on creating intuitive and visually appealing interfaces that enhance user engagement."   
  },
  {
    name: 'Duc Minh',
    role: 'Bussiness Analyst',
    image: Member5,
    bio: "Duc Minh is a business analyst who plays a crucial role in understanding client requirements and translating them into actionable tasks for the development team. His analytical skills help ensure that the project aligns with business goals."
  },
];

const TeamCardContainer = () => {
  return (
    <div className="background-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-lg shadow-lg">
        <div className="flex w-full h-screen">  
        {teamMembers.map((member, index) => (
        <div
          key={index}
          className="flex-1 relative overflow-hidden group transition-all duration-300 relative"
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            
          />
          {/* Overlay on hover */}
          <div className=" absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white text-center px-4">
            <h2 className="text-lg font-bold font-size-5xL text-black-900">{member.name}</h2> 
            <h3 className="text-sm">{member.role}</h3>
            <p className='text-sm'>{member.bio}</p>
          </div>
        </div>
        ))}
    </div>
    </div>
    
  );
};

export default TeamCardContainer;
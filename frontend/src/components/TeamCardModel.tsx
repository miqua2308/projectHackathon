import React from "react";


interface TeamMember{
    name: string;
    role: string;
    image: string;
}

interface TeamCardProps{
    member: TeamMember;
}
const TeamCardModel: React.FC<TeamCardProps> = ({ member }) => {
    return (
        <div className="team-card">
            <img src={member.image} alt={member.name} className="team-member-image" />
            <div className="member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
            </div>
        </div>
    );
}
export default TeamCardModel;
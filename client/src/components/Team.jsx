export default function Team() {
    const team = [
        {
            name: "Abdou El Boursoumi",
            linkedin: "https://www.linkedin.com/in/abdouallah-el-boursoumi-8b0a42175/",
            function: "Developer",
            image: "/assets/team/Abdou.jpg"
        },
        {
            name: "Emily Dias",
            linkedin: "https://www.linkedin.com/in/emillydias13/",
            function: "Project Manager",
            image: "/assets/team/Emi.png"
        },
        {
            name: "Miro Lima",
            linkedin: "https://www.linkedin.com/in/omirolima/",
            function: "Advisor",
            image: "/assets/team/Miro.png"
        },
        {
            name: "Marc Lebreton",
            linkedin: "https://www.linkedin.com/in/marclebreton/",
            function: "Founder/Growth",
            image: "/assets/team/Marc.png"
        },
        {
            name: "Rafael Chiarinelli",
            linkedin: "https://www.linkedin.com/in/rafael-chiarinelli-1b8169142/",
            function: "Developer",
            image: "/assets/team/Rafa.png"
        },
        {
            name: "Theodore Gentil",
            linkedin: "https://www.linkedin.com/in/th%C3%A9odore-gentil/",
            function: "Accuracy",
            image: "/assets/team/Theo.png"
        },
        {
            name: "Mathis Moreira",
            linkedin: "https://www.linkedin.com/in/mathis-moreira-840171225/",
            function: "Copywriter",
            image: "/assets/team/Mathis.png"
        },
    ]

    return <>
        <h1 className="team-title-h1">You're in good company</h1>
        <h2 className="team-title-h2">Check out the team behind this project</h2>
        <div className="team-container">

            {team.map(member => 
                <div className="member">
                    <img className="team-main-img" src={member.image} alt="" />
                    <div className="team-details">
                        <h3 className="team-name">{member.name}</h3>
                        <a className="linkedin-icon" href={member.linkedin} target="_blank">
                            <img src="/assets/linkedin-icon.png" alt="" />
                        </a>
                    </div>
                    <h3 className="team-function">{member.function}</h3>
                </div>
            )}
            
        </div>
    </>
}
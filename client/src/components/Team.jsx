export default function Team() {
    const team = [
        {
            name: "Emily Dias",
            linkedin: "https://www.linkedin.com/in/emillydias13/",
            function: "Project Manager",
            image: "/assets/team/Emi.png"
        },
        {
            name: "Miro Lima",
            linkedin: "https://www.linkedin.com/in/omirolima/",
            function: "Tech",
            image: "/assets/team/Miro.png"
        },
        {
            name: "Marc Lebreton",
            linkedin: "https://www.linkedin.com/in/marclebreton/",
            function: "Growth",
            image: "/assets/team/Marc.png"
        },
        {
            name: "Rafael Chiarinelli",
            linkedin: "https://www.linkedin.com/in/rafael-chiarinelli-1b8169142/",
            function: "Developer",
            image: "/assets/team/Rafa.png"
        },
        {
            name: "Abdou El Boursoumi",
            linkedin: "https://www.linkedin.com/in/abdouallah-el-boursoumi-8b0a42175/",
            function: "Developer",
            image: "/assets/team/Abdou.jpg"
        },
        {
            name: "Theodore Gentil",
            linkedin: "https://www.linkedin.com/in/th%C3%A9odore-gentil/",
            function: "Finance/Data",
            image: "/assets/team/Theo.png"
        },
        {
            name: "Mathis Moreira",
            linkedin: "https://www.linkedin.com/in/mathis-moreira-840171225/",
            function: "Strategy",
            image: "/assets/team/Mathis.png"
        },
        {
            name: "Orilo Blandini",
            linkedin: "https://www.linkedin.com/in/mathis-moreira-840171225/",
            function: "Creative",
            image: "/assets/team/Orilo.png"
        },
    ]

    return <>
        <h1 className="team-title-h1">You're in good company</h1>
        <h2 className="team-title-h2">Check out the team behind this project</h2>
        <div className="team-container">

            {team.map((member, key) => 
                <div key={key} className="member">
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
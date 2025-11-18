export const leadershipData = {
  seniorPastor: {
    name: "Rev. Joseph Alodjiso",
    title: "Senior Pastor",
    photo: "/images/senior-pastor-placeholder.jpg",
    bio: "Our Senior Pastor provides spiritual oversight and vision for Believers Temple AG, guiding the congregation in prayer, teaching, and leadership.",
  },
  associatePastors: [
    { name: "Ps. [Associate Pastor 1]", title: "Associate Pastor", photo: "/images/associate-pastor-1-placeholder.jpg", bio: "Departmental coordination and pastoral care." },
    { name: "Rev. [Associate Pastor 2]", title: "Associate Pastor", photo: "/images/associate-pastor-2-placeholder.jpg", bio: "Teaching and discipleship." },
    { name: "Rev. [Associate Pastor 3]", title: "Associate Pastor", photo: "/images/associate-pastor-3-placeholder.jpg", bio: "Outreach and evangelism." }
  ],
  board: [
    { name: "Mr Dadzie Noah", title: "Deacon", photo: "/images/board-member-1-placeholder.jpg" },
    { name: "[Board Member 2]", title: "Deacon", photo: "/images/board-member-2-placeholder.jpg" },
    { name: "[Board Member 3]", title: "Deaconnes", photo: "/images/board-member-3-placeholder.jpg" }
  ],
  departmentalLeaders: [
    { dept: "Youth Ministry", name: "[Leader Name]", photo: "/images/leader-1-placeholder.jpg" },
    { dept: "Women’s Fellowship", name: "[Leader Name]", photo: "/images/leader-2-placeholder.jpg" },
    { dept: "Men’s Ministry", name: "[Leader Name]", photo: "/images/leader-3-placeholder.jpg" },
    { dept: "Choir & Worship", name: "[Leader Name]", photo: "/images/leader-4-placeholder.jpg" },
    { dept: "Outreach", name: "[Leader Name]", photo: "/images/leader-5-placeholder.jpg" },
    { dept: "Media Team", name: "[Leader Name]", photo: "/images/leader-6-placeholder.jpg" }
  ]
} as const;

export type Associate = typeof leadershipData.associatePastors[number];
export type Board = typeof leadershipData.board[number];
export type DeptLeader = typeof leadershipData.departmentalLeaders[number];

export type Ministry = {
  id: string;
  name: string;
  short?: string;
  description: string;
  image: string; // /public/images/ministries/*.jpg
};

export const ministries: Ministry[] = [
  {
    id: "women",
    name: "Women’s Ministry",
    short: "Women growing together.",
    description:
      "Women gathering for prayer, Bible study, mentorship, family support, and community impact. Opportunities to serve across hospitality, intercession, care, and outreach to women.",
    image: "/images/ministries/women.jpg",
  },
  {
    id: "men",
    name: "Men’s Ministry",
    short: "Men of faith and character.",
    description:
      "Discipleship for men through small groups, accountability, skill-sharing, and practical service that strengthens homes, church, and community.",
    image: "/images/ministries/men.jpg",
  },
  {
    id: "youth",
    name: "Youth Ministry",
    short: "Raising the next generation.",
    description:
      "Teens and young adults equipped through the Word, worship, leadership training, and missions. Weekly meetups, camps, and creative arts.",
    image: "/images/ministries/youth.jpg",
  },
  {
    id: "children",
    name: "Children’s Ministry",
    short: "Loving Jesus from the start.",
    description:
      "Safe, fun, Bible-centered classes for kids with songs, stories, crafts, and memory verses. Parents are partners in discipleship.",
    image: "/images/ministries/children.jpg",
  },
  {
    id: "sundayschool",
    name: "Sunday School",
    short: "Foundations for all ages.",
    description:
      "Systematic Bible teaching for children, youth, and adults. Build strong doctrine, fruitful devotion, and practical Christian living.",
    image: "/images/ministries/sundayschool.jpg",
  },
  {
    id: "worship",
    name: "Choir & Worship Team",
    short: "Leading God’s people in praise.",
    description:
      "Vocals, band, and tech serving together—preparing hearts to encounter Jesus in corporate worship.",
    image: "/images/ministries/worship.jpg",
  },
  {
    id: "media",
    name: "Media Team",
    short: "Serving through creativity.",
    description:
      "Projection, sound, photo/video, graphics, and social media—communicating the gospel clearly on-site and online.",
    image: "/images/ministries/media.jpg",
  },
];
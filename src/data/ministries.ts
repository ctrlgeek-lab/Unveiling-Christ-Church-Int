export type MinistryImage = {
  src: string;
  alt: string;
  position?: string;
};

export type MinistryGalleryImage = MinistryImage & {
  caption: string;
};

export type Ministry = {
  slug: string;
  name: string;
  shortName: string;
  kicker: string;
  tagline: string;
  summary: string;
  intro: string;
  audience: string;
  centre: string;
  image: MinistryImage;
  about: string[];
  focus: {
    title: string;
    body: string;
  }[];
  verse: {
    text: string;
    reference: string;
  };
  involvement: string[];
  gallery: MinistryGalleryImage[];
};

export const ministries: Ministry[] = [
  {
    slug: "worship",
    name: "Worship & Creative Arts",
    shortName: "Worship",
    kicker: "A ministry of song and surrender",
    tagline: "Sound, song, and surrender.",
    summary:
      "Singers, musicians, and creatives leading our church in worship and serving every gathering with excellence.",
    intro:
      "Worship is the glad response of a people who have seen Christ. Our worship and creative arts ministry gathers singers, musicians, and creatives to lead the church in that response, with reverence, joy, and a clear focus on Jesus.",
    audience: "Singers, instrumentalists, and creatives who love the local church.",
    centre: "Christ-centred worship",
    image: {
      src: "/ministries/worship/worship-1.webp",
      alt: "Members of the Unveiling Christ Church worship team gathered together.",
      position: "center 35%",
    },
    about: [
      "We believe worship begins with revelation. Before we lead others in song, we are learning to respond to the grace of God in our own lives. Our teams serve from a place of devotion, not performance.",
      "Preparation matters to us. We rehearse, pray, and work together so that every song, transition, and creative detail helps the congregation sing with understanding. We value humility, unity, and a standard of excellence that points beyond the platform.",
    ],
    focus: [
      {
        title: "A life of worship",
        body: "Private devotion shapes public leading. We encourage every member to cultivate a daily life of prayer and surrender.",
      },
      {
        title: "Excellence with humility",
        body: "We bring our best to God while remaining teachable, servant-hearted, and rooted in grace.",
      },
      {
        title: "One voice",
        body: "We serve as one team, honouring one another and making room for the gifts God has placed in our church.",
      },
    ],
    verse: {
      text: "O worship the LORD in the beauty of holiness: fear before him, all the earth.",
      reference: "Psalm 96:9",
    },
    involvement: [
      "Worship with us on a Sunday and see the team in action.",
      "Share your musical or creative gift with a ministry leader.",
      "Join us for Praise & Worship Practice on Saturdays at 2:00 PM.",
    ],
    gallery: [
      {
        src: "/ministries/worship/worship-2.webp",
        alt: "Worship singers leading the congregation with microphones.",
        caption: "Leading the church in a shared response of praise.",
        position: "center 30%",
      },
      {
        src: "/ministries/worship/worship-3.webp",
        alt: "The worship team standing together after a service.",
        caption: "One team, many gifts, one focus: Jesus.",
        position: "center 32%",
      },
    ],
  },
  {
    slug: "preaching",
    name: "Preaching & Teaching",
    shortName: "Preaching",
    kicker: "A ministry of the Word",
    tagline: "Christ opened in the Scriptures.",
    summary:
      "A team given to study, teach, and faithfully proclaim the finished work of Jesus.",
    intro:
      "Every gathering is built on the Word. Our preaching and teaching ministry exists to open the Scriptures clearly, exalt Christ, and help believers understand and live in the grace they have received.",
    audience: "Teachers and students of the Word who serve the church with care.",
    centre: "The Word, faithfully taught",
    image: {
      src: "/ministries/preaching/preaching-1.webp",
      alt: "Pastor Maurice Adero ministering with a microphone at Unveiling Christ Church.",
      position: "center 28%",
    },
    about: [
      "We are committed to handling Scripture with care. Our aim is not to entertain or to add to the Gospel, but to make Christ clear and help people understand what God has already accomplished through Him.",
      "Teaching is a work of the whole church. We pray for those who study and preach, encourage thoughtful preparation, and create room for believers to grow in discernment as they follow Jesus.",
    ],
    focus: [
      {
        title: "Biblical clarity",
        body: "We teach Scripture in context so that its meaning can be understood and its message trusted.",
      },
      {
        title: "Grace-centred application",
        body: "The Gospel is not only the doorway into the Christian life; it is the ground on which we stand every day.",
      },
      {
        title: "Teachability",
        body: "We stay accountable to Scripture, to one another, and to the pastoral leadership of the church.",
      },
    ],
    verse: {
      text: "Preach the word; be instant in season, out of season; reprove, rebuke, exhort with all longsuffering and doctrine.",
      reference: "2 Timothy 4:2",
    },
    involvement: [
      "Grow in a Bible-teaching community on Sundays.",
      "Share a sense of calling with the pastoral team.",
      "Serve in teaching, discipleship, or study where appropriate.",
    ],
    gallery: [
      {
        src: "/ministries/preaching/preaching-2.webp",
        alt: "Pastor Maurice Adero teaching from the pulpit.",
        caption: "Making the Scriptures clear, week by week.",
        position: "center 24%",
      },
      {
        src: "/ministries/preaching/preaching-3.webp",
        alt: "Pastor Maurice Adero preaching with a raised hand.",
        caption: "Pointing the church back to the finished work of Christ.",
        position: "center 24%",
      },
    ],
  },
  {
    slug: "kids",
    name: "Kids Ministry",
    shortName: "Kids",
    kicker: "A ministry for the next generation",
    tagline: "Little hearts. Big grace.",
    summary:
      "A safe, joyful place where children ages 1–12 discover the love of Jesus for themselves.",
    intro:
      "Children are not the church of tomorrow; they are part of the family today. Our kids ministry creates a safe, joyful space where children can learn about Jesus, ask honest questions, and grow in the knowledge of God's love.",
    audience: "Children ages 1–12 and the families who love them.",
    centre: "Grace, made simple",
    image: {
      src: "/ministries/kids/kids-1.webp",
      alt: "Children from the Unveiling Christ Church kids ministry gathered together.",
      position: "center 30%",
    },
    about: [
      "We want children to know that they are welcome, valued, and deeply loved by God. Every part of our time together is shaped around that conviction.",
      "We also want to come alongside parents and carers. Faith grows best in the everyday rhythms of home and church, and we are grateful to partner with families in that journey.",
    ],
    focus: [
      {
        title: "Safe and caring",
        body: "We create a warm, attentive environment where children can be themselves and feel at home.",
      },
      {
        title: "The Bible made clear",
        body: "Bible truth is shared in ways that children can understand, remember, and live.",
      },
      {
        title: "Partnership with parents",
        body: "We support families with prayer, encouragement, and honest conversation.",
      },
    ],
    verse: {
      text: "Lo, children are an heritage of the LORD: and the fruit of the womb is his reward.",
      reference: "Psalm 127:3",
    },
    involvement: [
      "Bring your children along on a Sunday.",
      "Speak with a kids team member about your child's needs.",
      "Serve with the next generation after speaking with our leaders.",
    ],
    gallery: [
      {
        src: "/ministries/kids/kids-2.webp",
        alt: "Children singing and participating in the kids ministry.",
        caption: "Children learning that they belong in the family of God.",
        position: "center 30%",
      },
      {
        src: "/ministries/kids/kids-3.webp",
        alt: "A child holding a microphone with other children behind him.",
        caption: "Making room for young voices and growing faith.",
        position: "center 30%",
      },
    ],
  },
  {
    slug: "youth",
    name: "Youth Ministry",
    shortName: "Youth",
    kicker: "A ministry for young people",
    tagline: "Rooted early. Living boldly.",
    summary:
      "A generation ages 13 and above growing in identity, purpose, and friendship in Christ.",
    intro:
      "Youth is a season of questions, growth, and discovery. We want young people to know that their identity is not in the noise around them, but in Christ, and to find a community where they can grow, belong, and serve.",
    audience: "Young people ages 13 and above.",
    centre: "Identity and purpose in Christ",
    image: {
      src: "/ministries/youth/youth-1.webp",
      alt: "A young person playing drums during a church gathering.",
      position: "center 30%",
    },
    about: [
      "This is a place for real conversation and honest faith. We do not expect young people to have everything figured out. We make room for questions, growth, and the slow work of discipleship.",
      "We also want youth to take their place in the life of the church. Their gifts matter now, not someday. Whether through service, creativity, prayer, or friendship, there is a way for them to contribute.",
    ],
    focus: [
      {
        title: "Honest conversation",
        body: "We create room to ask real questions and explore faith without pressure or performance.",
      },
      {
        title: "Friendship and belonging",
        body: "No one should have to navigate this season alone. We grow better together.",
      },
      {
        title: "Faith for everyday life",
        body: "We want the Gospel to shape how young people think, choose, relate, and dream.",
      },
    ],
    verse: {
      text: "Let no man despise thy youth; but be thou an example of the believers, in word, in conversation, in charity, in spirit, in faith, in purity.",
      reference: "1 Timothy 4:12",
    },
    involvement: [
      "Join us on a Sunday and meet the youth team.",
      "Invite a friend to come with you.",
      "Serve together in church life and discover your gifts.",
    ],
    gallery: [
      {
        src: "/ministries/youth/youth-2.webp",
        alt: "Two young men from the youth ministry sitting together outdoors.",
        caption: "Friendship and belonging are part of the journey.",
        position: "center 35%",
      },
      {
        src: "/ministries/youth/youth-3.webp",
        alt: "A young woman smiling during a church gathering.",
        caption: "Young people taking their place in the life of the church.",
        position: "center 32%",
      },
    ],
  },
  {
    slug: "crusades-evangelism",
    name: "Crusades & Evangelism",
    shortName: "Crusades",
    kicker: "A ministry beyond the walls",
    tagline: "Beyond the walls. Into the harvest.",
    summary:
      "Taking the Gospel to communities through crusades, outreach, and personal witness.",
    intro:
      "The Gospel is good news for the world, not only the gathering. Our crusades and evangelism ministry carries the message of Jesus beyond our walls, into homes, streets, communities, and the nations.",
    audience: "Every believer ready to pray, go, and share the hope of Christ.",
    centre: "The Gospel, proclaimed",
    image: {
      src: "/ministries/crusades/crusades-1.webp",
      alt: "The church family gathered outdoors for worship and ministry.",
      position: "center 10%",
    },
    about: [
      "We believe the church is sent. Prayerful outreach, open-air ministry, and personal witness are ways we participate in the mission of God and make His love known beyond our walls.",
      "We pray for open doors and prepare to speak the Gospel clearly. We also care about what happens after someone responds, walking with people as they begin to understand the grace and purpose of God for their lives.",
    ],
    focus: [
      {
        title: "Prayerful preparation",
        body: "We seek God's direction before we go, asking Him to prepare hearts and guide our steps.",
      },
      {
        title: "Clear proclamation",
        body: "We keep the message simple and Christ-centred, trusting the Gospel to do what only it can do.",
      },
      {
        title: "Follow-up and discipleship",
        body: "We want new believers to find a home where they can grow in grace and faith.",
      },
    ],
    verse: {
      text: "And he said unto them, Go ye into all the world, and preach the gospel to every creature.",
      reference: "Mark 16:15",
    },
    involvement: [
      "Join a prayer gathering for the harvest.",
      "Serve in an upcoming outreach or crusade.",
      "Invite one person to hear the good news of Jesus.",
    ],
    gallery: [
      {
        src: "/ministries/crusades/crusades-2.webp",
        alt: "A singer leading worship at an outdoor church gathering.",
        caption: "Worship and the Word taken beyond the walls.",
        position: "center 28%",
      },
      {
        src: "/ministries/crusades/crusades-3.webp",
        alt: "A church musician serving during an outdoor service.",
        caption: "Serving together in the mission of making Christ known.",
        position: "center 30%",
      },
    ],
  },
  {
    slug: "women",
    name: "Women's Ministry",
    shortName: "Women",
    kicker: "A ministry for women",
    tagline: "Grounded in grace. Growing together.",
    summary:
      "A sisterhood where women are strengthened in Christ, honest in community, and equipped to serve.",
    intro:
      "Women carry unique callings across homes, workplaces, church, and community. Our women's ministry gathers women around the grace of God, creating room for friendship, prayer, honest conversation, and growth in Christ.",
    audience: "Women of every season and story.",
    centre: "Grace for every season",
    image: {
      src: "/ministries/women/women-1.webp",
      alt: "Two women sharing a joyful moment at an Unveiling Christ Church gathering.",
      position: "center 35%",
    },
    about: [
      "Every woman has a story, and every story matters. We want this ministry to be a place where women can be seen, heard, and strengthened without pretence.",
      "We value the wisdom that comes with age, the energy of younger women, and the gift of walking together. Our prayer is that women would know the grace of God more deeply and then share that grace with everyone around them.",
    ],
    focus: [
      {
        title: "Friendship and prayer",
        body: "We make room for honest connection and for carrying one another before the Lord.",
      },
      {
        title: "Growing in the Word",
        body: "We want Scripture to shape our identity, our homes, and our everyday choices.",
      },
      {
        title: "Serving with purpose",
        body: "Every woman has gifts to offer the church, her family, and her community.",
      },
    ],
    verse: {
      text: "Strength and honour are her clothing; and she shall rejoice in time to come.",
      reference: "Proverbs 31:25",
    },
    involvement: [
      "Meet other women at a church gathering.",
      "Share a prayer request with the ministry team.",
      "Serve alongside women in the life of the church.",
    ],
    gallery: [
      {
        src: "/ministries/women/women-2.webp",
        alt: "Women gathered together during a church service.",
        caption: "A sisterhood shaped by grace and strengthened by prayer.",
        position: "center 35%",
      },
      {
        src: "/ministries/women/women-3.webp",
        alt: "A woman taking notes during a church gathering.",
        caption: "Growing in the knowledge of Christ, one conversation at a time.",
        position: "center 30%",
      },
    ],
  },
  {
    slug: "charity-outreach",
    name: "Charity & Community Outreach",
    shortName: "Outreach",
    kicker: "A ministry of practical love",
    tagline: "Love that shows up.",
    summary:
      "Demonstrating the love of Christ through practical care, service, and presence in our community.",
    intro:
      "The love of Christ is not only spoken; it is shown. Our charity and community outreach ministry puts faith into action through practical support, acts of kindness, and a steady presence in the lives of people around us.",
    audience: "Anyone who wants to serve neighbours with practical compassion.",
    centre: "Faith expressed through love",
    image: {
      src: "/ministries/charity/charity-1.webp",
      alt: "The church family gathered outside the church in Oyugis.",
      position: "center 14%",
    },
    about: [
      "We want to see the Gospel make a difference in ordinary life. That means stepping toward people with dignity, listening to real needs, and offering help that is useful, thoughtful, and rooted in love.",
      "This ministry is built on presence. Some moments call for practical provision; others call for a listening ear, a prayer, or simply showing up. We serve because Christ has first served us, and we want His kindness to be visible in our community.",
    ],
    focus: [
      {
        title: "Practical compassion",
        body: "We respond to needs with generosity, wisdom, and a desire to be genuinely helpful.",
      },
      {
        title: "Dignity and respect",
        body: "Every person carries the image of God. We serve without judgement and with deep respect.",
      },
      {
        title: "Long-term presence",
        body: "We want to build trust and stay present, not disappear after a single moment of need.",
      },
    ],
    verse: {
      text: "My little children, let us not love in word, neither in tongue; but in deed and in truth.",
      reference: "1 John 3:18",
    },
    involvement: [
      "Pray for our community and the needs around us.",
      "Join a service or outreach project.",
      "Offer your time, skills, or resources with a cheerful heart.",
    ],
    gallery: [
      {
        src: "/ministries/charity/charity-2.webp",
        alt: "A woman holding a bag of provisions provided through community outreach.",
        caption: "Practical love, offered with dignity and care.",
        position: "center 30%",
      },
      {
        src: "/ministries/charity/charity-3.webp",
        alt: "Bags of provisions prepared for distribution to families in the community.",
        caption: "Preparing to serve families in our community.",
        position: "center 45%",
      },
    ],
  },
];

export function getMinistry(slug: string) {
  return ministries.find((ministry) => ministry.slug === slug);
}

export function getMinistryIndex(slug: string) {
  return ministries.findIndex((ministry) => ministry.slug === slug);
}

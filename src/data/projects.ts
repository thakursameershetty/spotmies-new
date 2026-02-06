// src/data/projects.ts
import { Project } from "@/types/types";

export const PROJECT_DATA: Project[] = [
    {
        id: 1,
        title: "Workewhere",
        category: "Web App, ReactJS",
        description: "Empowering businesses with AI chatbots trained on their own website data.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_124.png",
        link: "",
        client: "Workewhere",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        introduction: "A platform enabling companies to deploy AI-driven chatbots to enhance customer engagement using their own website data.",
        challenge: "Companies needed a way to create interactive AI chatbots trained specifically on their own diverse website content without manual data entry.",
        approach: "1. Built a web scraping tool to extract product details and FAQs. 2. Implemented RAG (Retrieval-Augmented Generation) to combine database retrieval with generative AI.",
        result: "Successfully automated customer support interactions, reducing response times and providing accurate, data-backed answers to user queries.",
        testimonial: {
            text: "The AI chatbot integration completely transformed our customer support. The RAG implementation is incredibly accurate. Highly recommended for their technical expertise.",
            author: "Sarah Jenkins",
            position: "CTO, Workewhere"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_127.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_128.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_129.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_130.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_131.png"
        ]
    },
    {
        id: 2,
        title: "Credit Report",
        category: "Web App, ReactJS",
        description: "Your all-in-one financial dashboard for credit insights and seamless loan approvals.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_122.png",
        link: "",
        client: "Credit Report",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        introduction: "A financial insights platform offering detailed credit reports and streamlining loan applications for users seeking home, personal, or vehicle loans.",
        challenge: "Users struggled to access transparent, detailed financial information required for securing various types of loans in one place.",
        approach: "1. Developed detailed credit history summaries covering accounts, payments, and inquiries. 2. Created tools to highlight specific areas for credit score improvement.",
        result: "Empowered users with financial transparency, significantly simplifying the loan application process and improving approval odds.",
        testimonial: {
            text: "A transparent and easy-to-use platform that made understanding credit scores simple for our users. The UI is clean and the insights are invaluable.",
            author: "David Ross",
            position: "Product Manager, Credit Report"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_96.png"
        ]
    },
    {
        id: 3,
        title: "Zit (Zin in Thuiswerken)",
        category: "Web App, ReactJS",
        description: "Optimizing hybrid work to boost employee well-being and maximize employer benefits.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_121.png",
        link: "",
        client: "Zit (Zin in Thuiswerken)",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        introduction: "A hybrid working solutions platform focused on employee well-being and trust, designed to reduce burnout and boost productivity.",
        challenge: "Employers needed a way to optimize tax benefits for hybrid work while ensuring employee well-being and preventing burnout.",
        approach: "1. Implemented a hybrid work model tracking system. 2. Optimized tax-benefit calculations for employers. 3. Integrated burnout reduction tools for employees.",
        result: "Delivered a comprehensive solution that increased employee satisfaction and maximized fiscal benefits for participating companies.",
        testimonial: {
            text: "Impressed by expertise and adaptability; AI solution development went smoothly. Highly recommend for innovative solutions.",
            author: "Marco Turk",
            position: "Founder at Zin In Thuiswerken"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_91.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_92.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_93.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_94.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_95.png"
        ]
    },
    {
        id: 4,
        title: "Decentrialz",
        category: "Web App, ReactJS",
        description: "Accelerating clinical trial recruitment through smart automation and empathetic AI.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_120.png",
        link: "",
        client: "Decentrialz",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        introduction: "A platform revolutionizing clinical trial recruitment by locating and qualifying patients at scale using automation and AI.",
        challenge: "The clinical trial recruitment process was traditionally manual, slow, and inefficient at targeting the right patient demographics.",
        approach: "1. Automated recruitment tasks to replace manual processes. 2. Used digital marketing targeting to reach patients. 3. Integrated on-demand virtual nurses.",
        result: "Maintains a human touch via empathetic virtual nurse interactions while drastically speeding up the recruitment and qualification timeline.",
        testimonial: {
            text: "Highly dedicated & efficient; commendable responsiveness. Looking forward to continue working with them.",
            author: "Swaroop",
            position: "Founder at Advait Labs & Decentrialz"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_87.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_88.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_89.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_90.png"
        ]
    },
    {
        id: 5,
        title: "A Square Go Karting",
        category: "Mobile App, Flutter",
        description: "The ultimate companion app for booking and safety at India's longest go-kart track.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_125.png",
        link: "",
        client: "A Square Go Karting",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        introduction: "A theme park application for India's longest go-kart track located in Visakhapatnam, covering bookings, safety info, and entertainment options.",
        challenge: "The park required a digital solution to manage bookings for a flexible track design and ensure safety compliance for night racing.",
        approach: "1. Designed a flexible track management system. 2. Integrated night track visuals for premium experiences. 3. Implemented strict digital safety briefings.",
        result: "Streamlined booking operations and enhanced the visitor experience, creating a seamless connection between the app and the physical track.",
        testimonial: {
            text: "The team provided a responsive and trustworthy delivery. They truly understood our needs for a premium theme park experience.",
            author: "Anand Boddeti",
            position: "Client Representative"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_73.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_74.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_75.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_76.png"
        ]
    },
    {
        id: 6,
        title: "Boom Boom Talk",
        category: "Mobile App, Figma",
        description: "A Web3 dating platform where genuine conversations matter more than superficial swipes.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_116.png",
        link: "",
        client: "Boom Boom Talk",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        introduction: "A pioneering Web3 dating platform built around genuine conversation-focused matching, moving beyond superficial swiping.",
        challenge: "Users were tired of superficial swiping; the challenge was to foster genuine connections through a digital interface.",
        approach: "1. Created interactive profiles with multimedia challenges. 2. Hosted virtual events to facilitate connections. 3. Prioritized chat-centric features over image swipes.",
        result: "Successfully created a community focused on meaningful interaction, resulting in higher user retention and deeper engagement metrics.",
        testimonial: {
            text: "The interactive profiles are a game-changer. Finally, a dating app that feels genuine and engaging. The Web3 integration is seamless.",
            author: "Elena Gomez",
            position: "Founder, Boom Boom Talk"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_69.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_70.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_71.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_72.png"
        ]
    },
    {
        id: 7,
        title: "Cypher-B",
        category: "Web App, NextJS",
        description: "Securing academic verification on the blockchain with hassle-free, gasless transactions.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_115.png",
        link: "",
        client: "Cypher-B",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        introduction: "A blockchain-based recruitment and verification platform that authenticates candidate academic details and identities on-chain.",
        challenge: "Verifying academic credentials was prone to fraud and slow manual checks. Users were also hesitant to pay crypto gas fees.",
        approach: "1. Implemented blockchain-based verification for immutable records. 2. Used Biconomy for gasless transactions to remove entry barriers.",
        result: "A secure, fraud-proof verification system that is accessible to non-crypto natives thanks to the gasless transaction feature.",
        testimonial: {
            text: "Gasless transactions and blockchain verification were implemented perfectly. A secure and innovative solution that solves a real industry problem.",
            author: "James Chen",
            position: "CTO, Cypher-B"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_62.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_63.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_64.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_65.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_66.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_67.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_68.png"
        ]
    },
    {
        id: 8,
        title: "Nandikrushi",
        category: "Mobile App, Figma",
        description: "Bridging the gap between farmers and families with 100% traceable organic food.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_113.png",
        link: "",
        client: "Nandikrushi",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        introduction: "An organic food delivery platform bridging farmers and consumers in Vizag, ensuring traceability from farm to table.",
        challenge: "The project needed to unify multiple user roles (Farmer, Admin, User, Store) into one cohesive system while ensuring product transparency.",
        approach: "1. Built a multi-app ecosystem for Consumers, Farmers, and Stores. 2. Developed a 'Track and Trace' feature to show the exact origin of food items.",
        result: "Established a transparent supply chain that built consumer trust and simplified logistics for local farmers and stores.",
        testimonial: {
            text: "Connecting farmers directly to consumers has never been smoother. The Track and Trace feature gives our customers 100% confidence in our products.",
            author: "Ravi Kumar",
            position: "Director, Nandikrushi"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_54.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_55.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_56.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_57.png"
        ]
    },
    {
        id: 9,
        title: "CGRUM",
        category: "Mobile App, Figma",
        description: "Gamifying TV ads with instant QR rewards to turn viewers into engaged winners.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_117.png",
        link: "",
        client: "CGRUM",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        introduction: "A QR scanning application with a reward and cashback system designed to gamify traditional television and theater advertising engagement.",
        challenge: "Advertisers struggled with low engagement; the app needed to process high-volume QR scans instantly during short ad spots.",
        approach: "1. Engineered rapid QR code generation and processing. 2. Built a real-time instant reward and cashback distribution system.",
        result: "increased ad engagement and viewer watch time significantly, providing advertisers with measurable interaction data.",
        testimonial: {
            text: "The QR system handled our high traffic volumes effortlessly. The gamification strategy has significantly boosted ad engagement.",
            author: "Priya Sharma",
            position: "Marketing Head, CGRUM"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_40.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_41.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_42.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_43.png"
        ]
    },
    {
        id: 10,
        title: "Vihaan Electrix",
        category: "Mobile App, AdobeXD",
        description: "A complete EV ecosystem for booking rides, finding chargers, and powering green travel.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_110.png",
        link: "",
        client: "Vihaan Electrix",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        introduction: "An electric vehicle ecosystem platform for booking electric bikes, locating service stations, and finding charging points.",
        challenge: "Creating a scalable database to handle a growing user base while maintaining fluid animations and real-time map data.",
        approach: "1. Built an EV booking system. 2. Integrated maps for service and charging stations. 3. Added test drive scheduling. 4. Focused on responsive animations.",
        result: "A robust full-service EV ecosystem that simplifies ownership and rental for users, supporting the transition to green energy.",
        testimonial: {
            text: "The EV booking and station locator features are seamless. A top-tier user experience that makes riding electric convenient and fun.",
            author: "Kartik Reddy",
            position: "Operations Lead, Vihaan Electrix"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_35.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_36.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_37.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_38.png"
        ]
    },
    {
        id: 11,
        title: "Indie Skull Syndicate",
        category: "NFT Project, NextJS",
        description: "A viral collection of 2,500 generative NFTs blending phantom vibes with human aesthetics.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_108.png",
        link: "",
        client: "Indie Skull Syndicate",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        introduction: "An NFT collection of 2500 unique digital art pieces blending human and phantom aesthetics, featuring on OpenSea.",
        challenge: "Standing out in a crowded NFT market required a unique aesthetic and a highly performant generative art algorithm.",
        approach: "1. Used generative art techniques to merge human and phantom designs. 2. Deployed secure smart contracts on Ethereum. 3. Integrated MetaMask.",
        result: "Achieved viral success, ranking in the Top 3 on OpenSea in a single day and building a community of over 2500 members.",
        testimonial: {
            text: "The generative art quality is outstanding. Reaching Top 3 on OpenSea was a dream come true thanks to this team's design and dev skills.",
            author: "Alex Rivera",
            position: "Creator, Indie Skull Syndicate"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_27.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_28.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_29.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_30.png"
        ]
    },
    {
        id: 12,
        title: "Mad Angles",
        category: "NFT Project, NextJS",
        description: "Expressive geometric art meets blockchain technology in a unique, triangular NFT collection.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_107.png",
        link: "",
        client: "Mad Angles",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        introduction: "An NFT collection featuring triangular geometric art with expressive emotional facial features.",
        challenge: "The market lacked geometric character design; the challenge was to combine mathematical precision with emotional storytelling.",
        approach: "1. Developed a unique style using triangular shapes as a base. 2. Built a full UI and smart contract system on Ethereum. 3. Integrated MetaMask.",
        result: "A visually captivating and secure NFT experience that offers collectors a distinct and emotive art style.",
        testimonial: {
            text: "The geometric art concept was brought to life beautifully. The smart contract deployment was secure, efficient, and ready for launch.",
            author: "Jordan Lee",
            position: "Project Lead, Mad Angles"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_23.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_24.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_25.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_26.png"
        ]
    },
    {
        id: 13,
        title: "Chalo Ride",
        category: "Web App, ReactJS",
        description: "Visakhapatnam's most trusted and transparent two-wheeler rental service.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_102.png",
        link: "",
        client: "Chalo Ride",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        introduction: "Visakhapatnam's premier two-wheeler rental service, an initiative by Spotmies offering affordable and transparent bike rentals.",
        challenge: "Tourists and locals struggled to find affordable, reliable, and transparent two-wheeler rentals in Visakhapatnam.",
        approach: "1. Built a transparent booking website with ReactJS. 2. Established clear pricing with no hidden charges. 3. Streamlined the rental process.",
        result: "Provided cost-effective mobility to the city with a reliable service that users trust for their daily commute or travel needs.",
        testimonial: {
            text: "The platform makes renting bikes in Vizag incredibly easy. The transparent pricing and user-friendly interface are exactly what we needed.",
            author: "Spotmies Team",
            position: "Co-founders, Chalo Ride"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_5.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_6.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_7.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_8.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_9.png"
        ]
    },
    {
        id: 14,
        title: "Mr Bikes",
        category: "Web App, ReactJS",
        description: "Andhra Pradesh's top bike rental platform offering flexible rides with safety gear included.",
        image: "https://spotmiesstorage.blob.core.windows.net/media/image_126.png",
        link: "",
        client: "Mr Bikes",
        timeline: "Ongoing",
        role: "Design & Development",
        rating: 5,
        introduction: "No. 1 bike rental service provider in Andhra Pradesh offering flexible hourly and daily rental options with safety gear included.",
        challenge: "Customers found it difficult to find flexible rental options (hourly vs daily) that also prioritized safety.",
        approach: "1. Implemented flexible hourly and daily rental plans. 2. Highlighted safety gear inclusion. 3. Showcased a wide range of fleet options online.",
        result: "Became the hassle-free, dependable transportation choice for the region, improving fleet utilization and customer safety.",
        testimonial: {
            text: "Our rental operations have become so much more efficient with this web app. Excellent support and design that our customers love.",
            author: "Rajesh V.",
            position: "Owner, Mr Bikes"
        },
        gallery: [
            "https://spotmiesstorage.blob.core.windows.net/media/image_1.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_2.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_3.png",
            "https://spotmiesstorage.blob.core.windows.net/media/image_4.png"
        ]
    }
];